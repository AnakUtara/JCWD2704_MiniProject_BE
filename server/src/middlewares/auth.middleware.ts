import { NextFunction, Response, Request } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { TUser } from "../models/user.model";
import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

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
		const token = req.header("Authorization")?.split(" ")[1] || "";
		const verifiedUser = verify(token, SECRET_KEY);
		throwErrorMessageIf(!token || !verifiedUser, "Unauthorized access");
		req.user = verifiedUser as TUser;
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyResetToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.split(" ")[1] || "";
		const verifiedUser = verify(token, SECRET_KEY);
		const findToken = await prisma.user.findFirst({
			where: {
				reset_token: token,
			},
		});
		throwErrorMessageIf(
			!token || !verifiedUser || !findToken,
			"Unauthorized access"
		);
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
