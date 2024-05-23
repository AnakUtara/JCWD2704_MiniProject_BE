import { NextFunction, Response, Request } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { Prisma, User } from "@prisma/client";
import { TUser } from "../models/user.model";
import { registerSchema } from "../libs/joi";
import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

export async function checkRegistrationInputs(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email, fullname, password, phone_no, id_card, gender } =
			req.body;
		throwErrorMessageIf(
			!username ||
				!email ||
				!fullname ||
				!password ||
				!phone_no ||
				!id_card ||
				!gender,
			"All necessary fields except reference code must be filled."
		);
		req.user = await registerSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkExistingUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email, phone_no, id_card } = req.body;
		const isExist = (await prisma.user.findFirst({
			where: { OR: [{ username }, { email }, { phone_no }, { id_card }] },
		})) as User;
		throwErrorMessageIf(isExist !== null, "User/Email already exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkExistingReferral(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { reference_code } = req.body;
		if (reference_code) {
			const isExist = await prisma.user.findFirst({
				where: {
					referral_code: reference_code,
				},
			});
			throwErrorMessageIf(!isExist, "Referral code doesn't exist.");
		}
		next();
	} catch (error) {
		next(error);
	}
}

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email_username, password } = req.body;
		const isUserExist = await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
			},
		});
		throwErrorMessageIf(!isUserExist, "Invalid Username/Emai!");
		const comparePassword: boolean | null =
			isUserExist && (await compare(password, isUserExist.password));
		console.log(isUserExist, comparePassword);
		throwErrorMessageIf(!comparePassword, "Invalid Password!");
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "") || "";
		const verifiedUser = verify(token, SECRET_KEY);
		throwErrorMessageIf(!token || !verifiedUser, "Unauthorized access");
		req.user = verifiedUser as TUser;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkIsAuthorized(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		throwErrorMessageIf(id !== req.user?.id, "Unauthorized");
		next();
	} catch (error) {
		next(error);
	}
}
