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
		const select: Prisma.UserSelect = {
			id: true,
			username: true,
			fullname: true,
			email: true,
			role: true,
			gender: true,
			phone_no: true,
			id_card: true,
			address: true,
			referral_code: true,
			reference_code: true,
		};
		const data = await prisma.user.findFirst({ where: { id }, select });
		return data;
	}
	async getByUsername(req: Request) {
		const { username } = req.params;
		const select: Prisma.UserSelect = {
			id: true,
			username: true,
			fullname: true,
			email: true,
			role: true,
			gender: true,
			phone_no: true,
			id_card: true,
			address: true,
			referral_code: true,
			reference_code: true,
		};
		const data = await prisma.user.findFirst({ where: { username }, select });
		return data;
	}
	async create(req: Request) {
		const referralCode = voucherCodes.generate({
			count: 1,
			length: 8,
			pattern: "##-###-##",
		})[0];
		const hashedPassword = await hashPassword(req?.user.password || "");
		const data: Prisma.UserCreateInput = {
			...(req?.user as User),
			password: hashedPassword,
			referral_code: referralCode,
		};

		return await prisma.$transaction(async (prisma) => {
			try {
				if (req?.user.reference_code) {
					await prisma.user.update({
						where: {
							referral_code: req?.user.reference_code,
						},
						data: {
							points: 10000,
							points_expiry_date: dayjs()
								.add(dayjs.duration({ months: 3 }))
								.toDate(),
						},
					});
				}
				await prisma.user.create({ data });
			} catch (error: unknown) {
				catchError(error);
			}
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
