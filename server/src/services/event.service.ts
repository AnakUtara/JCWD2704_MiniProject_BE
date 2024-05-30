import { Request } from "express";

import { throwError, validator } from "../utils/validator";
import {
	Category,
	Discount_amount,
	Event,
	Prisma,
	Venue_type,
} from "@prisma/client";

import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";
import { Order, OrderType, TEvent } from "../models/event.model";

class EventServices {
	async getAll() {
		const data: TEvent[] = await prisma.event.findMany();
		return data;
	}
	async getById(req: Request) {
		const { id } = req.params;
		const data = (await prisma.event.findFirst({
			where: { id },
		})) as TEvent;
		return data;
	}

	async getWithOrder(req: Request) {
		const { orderType, order, filterValue } = req.body as {
			orderType: OrderType;
			order: Prisma.SortOrder;
			filterValue: string;
		};

		const data = await prisma.event.findMany({
			orderBy: [{ [orderType]: order }],
			where: {
				OR: [
					{ city: { equals: filterValue } },
					{ title: { contains: filterValue } },
					{ roster: { contains: filterValue } },
				],
			},
		});

		return data;
	}

	async getEventsPromotor(req: Request) {
		const { id_username } = req.params;

		const data = await prisma.$transaction(async (prisma: any) => {
			try {
				const findUser = (await prisma.user.findFirst({
					where: {
						OR: [{ id: id_username }, { username: id_username }],
						role: "promotor",
					},
					select: { id: true },
				})) as TUser;
				// console.log(findUser);
				validator(
					!findUser || !findUser.id,
					"User is not found OR the UserID is undefined"
				);

				return await prisma.event.findMany({
					where: { user_id: findUser.id },
				});
			} catch (error) {
				throwError(error);
			}
		});
		return data;
	}

	async getEventsCustomer(req: Request) {}

	async update(req: Request) {
		const { username, id } = req.params;
		// const { id } = req.query as { id: string };

		const inputEntries = Object.entries(req.body).reduce(
			(arr: any[], [key, value]) => {
				if (
					key !== "id" &&
					key !== "role" &&
					key !== "status" &&
					key !== "user_id" &&
					key !== "created_at" &&
					key !== "updated_at"
				) {
					value && arr.push([key, value]);
				}
				return arr;
			},
			[]
		);
		const inputs = Object.fromEntries(inputEntries) as Event;

		const data = await prisma.$transaction(async (prisma: any) => {
			try {
				const findUser = (await prisma.user.findFirst({
					where: { username: username, role: "promotor" },
					select: { id: true },
				})) as TUser;
				// console.log(findUser);

				validator(
					!findUser || !findUser.id,
					"User is not found OR the UserID is undefined"
				);

				return await prisma.event.update({
					where: { id, user_id: findUser.id },
					data: { ...inputs },
				});
			} catch (error) {
				throwError(error);
			}
		});
		return data;
	}

	async create(req: Request) {
		// const { username } = req.params;
		// const {
		// 	title,
		// 	location,
		// 	city,
		// 	zip_code,
		// 	venue_type,
		// 	details,
		// 	roster,
		// 	scheduled_at,
		// 	start_time,
		// 	end_time,
		// 	ticket_price,
		// 	ticket_amount,
		// 	assigned_pic,
		// 	pic_phone_no,
		// 	category,
		// 	discount_amount,
		// } = req.body as TEvent;
		// const findUser = (await prisma.user.findFirst({
		// 	where: { username: username },
		// 	select: { id: true },
		// })) as { id: string };
		// // console.log(findUser);
		// validator(!findUser, "no user found");
		// const data = await prisma.event.create({
		// 	data: {
		// 		user_id: findUser.id,
		// 		title: title,
		// 		location: location,
		// 		city: city,
		// 		zip_code: Number(zip_code),
		// 		venue_type: venue_type,
		// 		details: details,
		// 		roster: roster,
		// 		scheduled_at: scheduled_at,
		// 		start_time: start_time,
		// 		end_time: end_time,
		// 		ticket_price: Number(ticket_price),
		// 		ticket_amount: Number(ticket_amount),
		// 		assigned_pic: `${assigned_pic}`,
		// 		pic_phone_no: `${pic_phone_no}`,
		// 		category: Category[category as unknown as keyof typeof Category] || undefined,
		// 		discount_amount:
		// 			Discount_amount[discount_amount as keyof typeof Discount_amount] ||
		// 			undefined,
		// 	},
		// });
		// console.log(data);
		// return data;
	}

	async delete(req: Request) {
		const { username } = req.params;
		const { title } = req.body as { title: string };

		const findUser = (await prisma.user.findFirst({
			where: { username: username },
			select: { id: true },
		})) as { id: string };
		const findEvent = (await prisma.event.findFirst({
			where: { user_id: findUser.id, title: { contains: `${title}` } },
			select: { id: true },
		})) as { id: string };

		console.log(findUser);
		const data = await prisma.event.delete({
			where: { id: findEvent.id },
		});
		return data;
	}
}

export default new EventServices();
