import { Request } from "express";
import { prisma } from "../libs/prisma";
import { hashPassword } from "../libs/bcrypt";
import { Prisma, User } from "@prisma/client";
import { catchError, throwErrorMessageIf } from "../utils/validator";
import { TUser } from "../models/user.model";
import sharp from "sharp";

class UsersService {
	async getAll() {
		const data = await prisma.user.findMany();
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = await prisma.user.findFirst({ where: { id } });
		return data;
	}
	async create(req: Request) {
		const { password } = req.body;
		const hashedPassword = await hashPassword(password);
		const data: Prisma.UserCreateInput = {
			...(req?.validUser as User),
			password: hashedPassword,
		};
		return await prisma.$transaction(async (prisma) => {
			try {
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
				if (key !== "id" && key !== "created_at" && key !== "updated_at") {
					value && arr.push([key, value]);
				}
				return arr;
			},
			[]
		);
		const inputs = Object.fromEntries(inputEntries) as User;
		console.log(req.file);

		const buffer = await sharp(req.file?.buffer).png().toBuffer();
		if (file) inputs.avatar = buffer;
		throwErrorMessageIf(id !== req.user.id, "Unauthorized");
		throwErrorMessageIf(!file, "No image uploaded");
		return await prisma.user.update({
			where: { id },
			data: {
				...inputs,
			},
		});
	}
}

export default new UsersService();
