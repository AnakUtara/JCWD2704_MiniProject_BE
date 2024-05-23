import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { registerSchema } from "../libs/joi";
import referralCode from "referral-codes";

export async function checkUserExistById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isExist = (await prisma.user.findFirst({
			where: { id },
			select: { id: true },
		})) as { id: string };
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
		await registerSchema.validateAsync(req.body);
		throwErrorMessageIf(!req.body, "Fill at least one field to update");
		next();
	} catch (error) {
		next(error);
	}
}
