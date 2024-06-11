import { Request } from "express";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../libs/bcrypt";
import { Prisma, Role, User } from "@prisma/client";
import { catchError, throwErrorMessageIf } from "../utils/error";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { TUser } from "../models/user.model";
import { createToken } from "../libs/jwt";
import { TVoucher } from "../models/voucher.model";
import { sendEmail } from "../libs/nodemailer";
import {
	ACC_SECRET_KEY,
	FP_SECRET_KEY,
	REFR_SECRET_KEY,
	VERIF_SECRET_KEY,
} from "../config/config";
import { referralCode } from "../libs/voucher-code-generator";
import Joi from "joi";

dayjs.extend(duration);
class UsersService {
	async getAll() {
		const data: TUser[] = await prisma.user.findMany();
		data.forEach((d) => {
			delete d.password;
		});
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = (await prisma.user.findFirst({
			where: { id },
		})) as TUser;
		delete data?.password;
		return data;
	}
	async getByIdOrUsername(req: Request) {
		const { id_username } = req.params;
		const data = (await prisma.user.findFirst({
			where: { OR: [{ username: id_username }, { id: id_username }] },
		})) as TUser;
		delete data?.password;
		return data;
	}
	async create(req: Request) {
		//password hashing
		const hashedPassword = await hashPassword(req?.user.password || "");
		//data to be created

		const data: Prisma.UserCreateInput = {
			...(req?.user as User),
			password: hashedPassword,
			referral_code: referralCode(req),
			role: req?.user.bank_acc_no ? "promotor" : "customer",
		};

		await prisma.$transaction(async (prisma) => {
			try {
				let newUser = {} as TUser;
				//check if req.body has reference_Code
				if (req?.user.reference_code) {
					newUser = await prisma.user.create({ data });
					const existingReferencedUser = await prisma.user.findFirst({
						where: {
							referral_code: req?.user.reference_code,
						},
						select: {
							points: true,
							points_expiry_date: true,
						},
					});
					//extract existing referenced user's current points & points expiry date
					const currentExpDate = existingReferencedUser?.points_expiry_date
						? dayjs(existingReferencedUser?.points_expiry_date)
						: dayjs();
					const currentPoints =
						!existingReferencedUser?.points || currentExpDate < dayjs()
							? 0
							: existingReferencedUser.points;
					//update existing referenced user's points & points expiry date
					await prisma.user.update({
						where: {
							referral_code: req?.user.reference_code,
						},
						data: {
							points: currentPoints + 10000,
							points_expiry_date: currentExpDate
								.add(dayjs.duration({ months: 3 }))
								.toDate(),
						},
					});
					//create voucher for registered user with referral code
					(await prisma.voucher.create({
						data: {
							amount: 10,
							is_valid: true,
							user: {
								connect: {
									id: newUser.id,
								},
							},
						},
					})) as TVoucher;
				} else {
					//run this if there's no reference code
					newUser = await prisma.user.create({ data });
				}
				const ver_token = createToken(
					{ id: newUser.id },
					VERIF_SECRET_KEY,
					"30m"
				);
				sendEmail({
					email_to: req.user.email,
					template_dir: "../templates/verification.html",
					href: `${process.env.FE_URL}/verification/${ver_token}`,
					subject:
						"Thank you for your registration! Please, verify your account.",
				});
			} catch (error: unknown) {
				catchError(error);
			}
		});
	}
	async emailVerification(req: Request) {
		const { email } = req.body;
		const targetUser = (await prisma.user.findFirst({
			where: { email },
		})) as TUser;
		throwErrorMessageIf(!targetUser, "Email not found");
		const ver_token = createToken(
			{ id: targetUser.id },
			VERIF_SECRET_KEY,
			"30m"
		);
		sendEmail({
			email_to: targetUser.email,
			template_dir: "../templates/verification.html",
			href: `${process.env.FE_URL}/verification/${ver_token}`,
			subject: "Verify your account.",
		});
	}
	async verifyUser(req: Request) {
		await prisma.user.update({
			where: {
				id: req?.user.id,
			},
			data: {
				is_verified: true,
			},
		});
	}
	async forgotPassword(req: Request) {
		const emailSchema = Joi.string().trim().lowercase().email().required();
		const { email } = req.body;
		const validEmail = await emailSchema.validateAsync(email);
		await prisma.$transaction(async (prisma) => {
			try {
				const findExist = await prisma.user.findUnique({
					where: {
						email: validEmail,
					},
				});
				throwErrorMessageIf(!findExist, "This email doesn't exist.");
				const reset_token = createToken(
					{ id: findExist?.id },
					FP_SECRET_KEY,
					"20m"
				);
				sendEmail({
					email_to: validEmail,
					template_dir: "../templates/forgot-password.html",
					href: `${process.env.FE_URL}/forgot_password/${reset_token}`,
					subject: "Reset Your Password",
				});
				await prisma.user.update({
					where: {
						email: validEmail,
					},
					data: {
						reset_token,
					},
				});
			} catch (error) {
				catchError(error);
			}
		});
	}
	async updatePassword(req: Request) {
		const { password } = req.body;
		await prisma.$transaction(async (prisma) => {
			try {
				const passSchema = Joi.string().trim().min(8).max(20).required();
				const validPassword = await passSchema.validateAsync(password);
				await prisma.user.update({
					where: { id: req?.user.id },
					data: {
						password: await hashPassword(validPassword),
						reset_token: null,
					},
				});
			} catch (error) {
				catchError(error);
			}
		});
	}
	async login(req: Request) {
		const currentExpDate = req?.user.points_expiry_date;
		if (dayjs(currentExpDate) < dayjs() || req.user.points === 0)
			await prisma.user.update({
				where: {
					id: req?.user.id,
				},
				data: {
					points: 0,
					points_expiry_date: null,
				},
			});
		delete req.user?.password;
		delete req.user?.id_card;
		delete req.user?.reset_token;
		console.log(req?.user);

		const accessToken = createToken(req?.user, ACC_SECRET_KEY, "1h");
		const refreshToken = createToken(
			{ id: req?.user.id },
			REFR_SECRET_KEY,
			"20h"
		);
		return { accessToken, refreshToken };
	}
	async validateRefreshToken(req: Request) {
		const isUserExist: TUser = (await prisma.user.findFirst({
			where: { id: req?.user.id },
			include: {
				voucher: { select: { id: true, is_valid: true, amount: true } },
			},
		})) as TUser;
		delete isUserExist?.password;
		delete isUserExist?.id_card;
		delete isUserExist?.reset_token;
		const access_token = createToken(isUserExist, ACC_SECRET_KEY, "1h");
		return { access_token, is_verified: isUserExist?.is_verified };
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.user.delete({ where: { id } });
	}
	async update(req: Request) {
		const { username } = req?.user;
		const inputEntries = Object.entries(req.body).reduce(
			(arr: any[], [key, value]: [key: string, value: any]) => {
				if (
					key !== "id" &&
					key !== "password" &&
					key !== "role" &&
					key !== "id_card" &&
					key !== "referral_code" &&
					key !== "reference_code" &&
					key !== "points" &&
					key !== "points_expiry_date" &&
					key !== "reset_token" &&
					key !== "is_verified" &&
					key !== "created_at" &&
					key !== "updated_at"
				) {
					value &&
						arr.push([
							key,
							key === "date_of_birth" ? dayjs(value).toDate() : value,
						]);
				}
				return arr;
			},
			[]
		);
		const inputs = Object.fromEntries(inputEntries) as User;
		if (inputs.bank_acc_no) inputs.role = Role.promotor;
		const image = req.file?.filename;
		if (req.file?.fieldname && image) inputs.avatar = image;
		return await prisma.$transaction(async (prisma) => {
			try {
				return await prisma.user.update({
					where: { username },
					data: {
						...inputs,
					},
				});
			} catch (error) {
				catchError(error);
			}
		});
	}
}

export default new UsersService();
