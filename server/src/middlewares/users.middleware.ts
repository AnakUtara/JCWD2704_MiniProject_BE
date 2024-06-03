import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { registerSchema, updateSchema } from "../libs/joi";
import referralCode from "referral-codes";
import { User } from "@prisma/client";
import dayjs from "dayjs";

export async function checkRegistrationInputs(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, email, fullname, password, phone_no, id_card } = req.body;
		throwErrorMessageIf(
			!username || !email || !fullname || !password || !phone_no || !id_card,
			"All necessary fields except reference code & bank_acc_no must be filled."
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

export async function checkIsReferralValid(
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

export async function checkUserExistById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const isExist = await prisma.user.findFirst({
			where: { id: req?.user.id },
		});
		throwErrorMessageIf(!isExist, "User does not exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function isReferralCodeUnique(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const refCode = referralCode.generate({
			length: 8,
			count: 1,
			pattern: "##-###-##",
		})[0];
		console.log(refCode);

		const isReferralExist = await prisma.user.findUnique({
			where: {
				referral_code: refCode,
			},
		});
		throwErrorMessageIf(
			isReferralExist !== null,
			"Failed to generate unique referral code."
		);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkUpdateUserForm(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (req.body.avatar) delete req.body.avatar;

		await updateSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error);
	}
}
