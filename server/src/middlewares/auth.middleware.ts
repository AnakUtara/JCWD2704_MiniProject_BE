import { NextFunction, Response, Request } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { TUser } from "../models/user.model";
import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import {
	ACC_SECRET_KEY,
	FP_SECRET_KEY,
	REFR_SECRET_KEY,
	VERIF_SECRET_KEY,
} from "../config/config";

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
			include: {
				voucher: { select: { id: true, is_valid: true, amount: true } },
			},
		});
		throwErrorMessageIf(!isUserExist, "Invalid Username/Emai!");
		const comparePassword: boolean | null =
			isUserExist && (await compare(password, isUserExist.password));
		throwErrorMessageIf(!comparePassword, "Invalid Password!");
		req.user = isUserExist as TUser;
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.split(" ")[1] || "";
		const verifiedUser = verify(token, ACC_SECRET_KEY);
		throwErrorMessageIf(!token || !verifiedUser, "Unauthorized access");
		req.user = verifiedUser as TUser;
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyRefreshToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(" ")[1] || "";
		const verifiedUserID = verify(token, REFR_SECRET_KEY);
		throwErrorMessageIf(!token || !verifiedUserID, "Unauthorized access");
		req.user = verifiedUserID as TUser;
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
		const verifiedToken = verify(token, FP_SECRET_KEY);
		const findToken = await prisma.user.findFirst({
			where: {
				reset_token: token,
			},
		});
		throwErrorMessageIf(
			!token || !verifiedToken || !findToken,
			"Unauthorized access"
		);
		req.user = verifiedToken as TUser;
		next();
	} catch (error) {
		next(error);
	}
}

export async function verifyVerifToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.split(" ")[1] || "";
		const verifiedUserID = verify(token, VERIF_SECRET_KEY);
		throwErrorMessageIf(!token || !verifiedUserID, "Unauthorized access");
		req.user = verifiedUserID as TUser;
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
