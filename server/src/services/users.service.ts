import { Request } from "express";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../libs/bcrypt";
import { Prisma, User } from "@prisma/client";
import { catchError, throwErrorMessageIf } from "../utils/error";
import sharp from "sharp";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { TUser } from "../models/user.model";
import { createToken } from "../libs/jwt";
import { TVoucher } from "../models/voucher.model";
import { sendEmail } from "../libs/nodemailer";
import { SECRET_KEY, pass } from "../config/config";
import { verify } from "jsonwebtoken";
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
					const currentPoints = existingReferencedUser?.points || 0;
					const currentExpDate =
						dayjs(existingReferencedUser?.points_expiry_date) || dayjs();
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
							amount: 0.1,
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
				const ver_token = createToken(newUser.id, "1hr");
				sendEmail({
					email_to: req.user.email,
					template_dir: "../templates/verification.html",
					href: `${process.env.BASE_URL}${process.env.FE_PORT}/verification/${ver_token}`,
					subject:
						"Thank you for your registration! Please, verify your email.",
				});
			} catch (error: unknown) {
				catchError(error);
			}
		});
	}
	async emailVerification(req: Request) {
		const { token } = req.params;
		const { id } = verify(token, SECRET_KEY) as TUser;
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				is_verified: true,
			},
		});
	}
	async forgotPassword(req: Request) {
		const emailSchema = Joi.string()
			.trim()
			.lowercase()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.required();
		const { email } = req.body;
		const validEmail = await emailSchema.validateAsync(email);
		await prisma.$transaction(async (prisma) => {
			try {
				const findExist = await prisma.user.findUnique({
					where: {
						email: validEmail,
					},
				});
				const reset_token = createToken(findExist?.id, "1hr");
				throwErrorMessageIf(!findExist, "This email doesn't exist.");
				sendEmail({
					email_to: req.user.email,
					template_dir: "../templates/verification.html",
					href: `${process.env.BASE_URL}${process.env.FE_PORT}/forgot-password/${reset_token}`,
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
		const { token } = req.params;
		const { password } = req.body;
		const { id } = verify(token, SECRET_KEY) as TUser;
		const passSchema = Joi.object({
			password: Joi.string()
				.trim()
				.min(8)
				.max(20)
				.pattern(new RegExp("^(?:(?=.*d)(?=.*[a-z])(?=.*[A-Z]).*)$"))
				.required(),
		});
		const validPassword = await passSchema.validateAsync({ password });
		await prisma.user.update({
			where: { id },
			data: {
				password: validPassword,
			},
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		return await prisma.user.delete({ where: { id } });
	}
	async update(req: Request) {
		const { id } = req.params;
		const { file } = req;
		const inputEntries = Object.entries(req.body).reduce(
			(arr: any[], [key, value]) => {
				if (
					key !== "id" &&
					key !== "role" &&
					key !== "referral_code" &&
					key !== "reference_code" &&
					key !== "points" &&
					key !== "points_expiry_date" &&
					key !== "created_at" &&
					key !== "updated_at"
				) {
					value && arr.push([key, value]);
				}
				return arr;
			},
			[]
		);
		const inputs = Object.fromEntries(inputEntries) as User;
		const buffer = await sharp(req.file?.buffer).png().toBuffer();
		if (file) inputs.avatar = buffer;
		throwErrorMessageIf(!file, "No image uploaded");
		return await prisma.$transaction(async (prisma) => {
			try {
				return await prisma.user.update({
					where: { id },
					data: {
						...inputs,
					},
				});
			} catch (error) {
				catchError(error);
			}
		});
	}
	async login(req: Request) {
		const { email_username } = req.body;
		const data = (await prisma.user.findFirst({
			where: {
				OR: [{ username: email_username }, { email: email_username }],
			},
		})) as TUser;
		req.user = data;
		delete data?.password;
		const accessToken = createToken(data, "1hr");
		const refreshToken = createToken({ id: data.id }, "20hr");
		return { accessToken, refreshToken };
	}
}

export default new UsersService();