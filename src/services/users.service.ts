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
import voucherCodes from "voucher-code-generator";
import { TVoucher } from "../models/voucher.model";
import { transporter } from "../libs/nodemailer";
import { SECRET_KEY } from "../config/config";
import fs from "fs";
import { join } from "path";
import { render } from "mustache";
import { verify } from "jsonwebtoken";
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
		//generate unique referralCode
		const referralCode = voucherCodes.generate({
			prefix: req?.user.username,
			count: 1,
			length: 6,
		})[0];
		//password hashing
		const hashedPassword = await hashPassword(req?.user.password || "");
		//data to be created
		const data: Prisma.UserCreateInput = {
			...(req?.user as User),
			password: hashedPassword,
			referral_code: referralCode,
		};
		return await prisma.$transaction(async (prisma) => {
			try {
				let newUser = {} as TUser;
				//run if req.body has reference_code
				if (req?.user.reference_code) {
					//then create new user
					newUser = await prisma.user.create({ data });
					//find reference user's point data
					const existingReferencedUser = await prisma.user.findFirst({
						where: {
							referral_code: req?.user.reference_code,
						},
						select: {
							points: true,
							points_expiry_date: true,
						},
					});
					//found user current points count
					const currentPoints = existingReferencedUser?.points || 0;
					const currentExpDate =
						dayjs(existingReferencedUser?.points_expiry_date) || dayjs();
					//then update existing user points and set points expiry date to 3 months from now
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
					//after new user created, create voucher
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
				const ver_token = createToken(newUser, "1hr");
				//setup read file to read mustache html template
				const template = fs
					.readFileSync(join(__dirname, "../templates/verification.html"))
					.toString();
				//if template exist render template and send it to registered user email
				if (template) {
					const html = render(template, {
						email: req.user.email,
						verify_url: `${process.env.BASE_URL}${process.env.PORT}/v3/${ver_token}`,
					});
					await transporter.sendMail({
						to: req?.user.email,
						subject:
							"Thank you for your registration! Please, verify your email.",
						html,
					});
				}
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
