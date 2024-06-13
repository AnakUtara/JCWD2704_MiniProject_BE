import { Request } from "express";

import { throwError, validator } from "../utils/validator";
import {
	Category,
	Event,
	Prisma,
	Status_event,
	Venue_type,
} from "@prisma/client";

import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";
import { Order, OrderType, TEvent } from "../models/event.model";
import { user } from "../config/config";
import dayjs from "dayjs";

class EventServices {
	private customSelect = {
		title: true,
		location: true,
		city: true,
		venue_type: true,
		details: true,
		roster: true,
		status: true,
		scheduled_at: true,
		start_time: true,
		end_time: true,
		ticket_price: true,
		ticket_amount: true,
		user_id: true,
		category: true,
		image_url: true,
		discount_amount: true,
	};

	async getAll(req: Request) {
		const data: TEvent[] = await prisma.event.findMany();
		return data;
	}

	async getWithOrder(req: Request) {
		const { orderType, order, filterValue, page, limit, status } =
			req.query as {
				orderType: OrderType;
				order: Prisma.SortOrder;
				filterValue: string;
				page: string;
				limit: string;
				status: Status_event;
			};

		const totalCount = await prisma.event.count({
			where: {
				OR: [
					{ city: { equals: filterValue } },
					{ title: { contains: filterValue } },
					{ roster: { contains: filterValue } },
				],
			},
		});
		console.log(totalCount);

		const baseData = (await prisma.event.findMany({
			orderBy: [{ [orderType]: order }],
			skip: Number(limit) * (Number(page) - 1),
			take: Number(limit),
			where: {
				AND: {
					status,
					OR: [
						{ city: { contains: filterValue } },
						{ title: { contains: filterValue } },
						{ roster: { contains: filterValue } },
					],
				},
			},
			include: { review: { select: { rating: true } } },
		})) as TEvent[];

		// const data = {...baseData}

		const data = baseData.map((e) => {
			let discountCalculation: number = 0;
			if (e.discount_amount && e.ticket_price) {
				discountCalculation =
					e.ticket_price - (e.discount_amount / 100) * e.ticket_price;
			}

			let ratingCalculation: number = 0;

			return { ...e, discountCalculation };
		});
		return { data, totalCount };
	}

	async getEventsPromotor(req: Request) {
		const { orderType, order, filterValue, page, limit } = req.query as {
			orderType: OrderType;
			order: Prisma.SortOrder;
			filterValue: string;
			page: string;
			limit: string;
		};
		const totalCount = await prisma.event.count({
			where: {
				OR: [
					{ city: { equals: filterValue } },
					{ title: { contains: filterValue } },
					{ roster: { contains: filterValue } },
				],
			},
		});
		console.log(totalCount);

		const data = (await prisma.event.findMany({
			orderBy: [{ [orderType]: order }],
			skip: Number(limit) * (Number(page) - 1),
			take: Number(limit),
			where: {
				user_id: req.user.id,
				OR: [
					{ city: { equals: filterValue } },
					{ title: { contains: filterValue } },
					{ roster: { contains: filterValue } },
				],
			},
			include: { review: { select: { rating: true } } },
		})) as TEvent[];

		return { data, totalCount };
	}

	async getEventsCustomer(req: Request, customSelect = this.customSelect) {}

	async getById(req: Request) {
		const { id } = req.params;
		validator(!id, "event not found");

		const baseData = (await prisma.event.findFirst({
			where: { id: id },
			include: {
				user: {
					select: {
						username: true,
						avatar: true,
						email: true,
						phone_no: true,
						bank_acc_no: true,
					},
				},
				review: { select: { rating: true } },
			},
		})) as TEvent;
		validator(!baseData, "event not found");

		const ratingCalculation = await prisma.review.aggregate({
			_avg: { rating: true },
			where: { event_id: id },
		});

		const { ["_avg"]: average } = ratingCalculation;
		const { rating: ratingEvent } = average;
		console.log(average);

		let discountCalculation: number = 0;
		if (baseData?.discount_amount && baseData.ticket_price) {
			discountCalculation =
				baseData.ticket_price -
				(baseData.discount_amount / 100) * baseData.ticket_price;
		}

		const data = { ...baseData, discountCalculation, ratingEvent };

		return data;
	}

	async update(req: Request) {
		const { id } = req.params;
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

		const inputs = Object.fromEntries(inputEntries) as TEvent;
		console.log(req.file?.fieldname);
		const image = req.file?.filename as string;

		const start_time = dayjs(req.event.scheduled_at)
			.set("hour", dayjs(req.event.start_time).get("hour"))
			.set("minute", dayjs(req.event.start_time).get("minute"))
			.toDate();

		const end_time = dayjs(req.event.scheduled_at)
			.set("hour", dayjs(req.event.end_time).get("hour"))
			.set("minute", dayjs(req.event.end_time).get("minute"))
			.toDate();

		if (req.file?.fieldname && image) inputs.image_url = image;

		if (typeof inputs.zip_code === "string")
			inputs.zip_code = Number(inputs.zip_code);
		if (typeof inputs.ticket_price === "string")
			inputs.ticket_price = Number(inputs.ticket_price);
		if (typeof inputs.ticket_amount === "string")
			inputs.ticket_amount = Number(inputs.ticket_amount);
		if (typeof inputs.discount_amount === "string")
			inputs.discount_amount = Number(inputs.discount_amount);

		const data = await prisma.$transaction(async (prisma: any) => {
			try {
				return await prisma.event.update({
					where: { id },
					data: {
						...inputs,
						user: { connect: { id: req.user.id } },
						start_time,
						end_time,
					},
				});
			} catch (error) {
				throwError(error);
			}
		});
	}

	async create(req: Request) {
		const image = req.file?.filename as string;
		// console.log(req.user);

		const start_time = dayjs(req.event.scheduled_at)
			.set("hour", dayjs(req.event.start_time).get("hour"))
			.set("minute", dayjs(req.event.start_time).get("minute"))
			.toDate();

		const end_time = dayjs(req.event.scheduled_at)
			.set("hour", dayjs(req.event.end_time).get("hour"))
			.set("minute", dayjs(req.event.end_time).get("minute"))
			.toDate();

		const createNewEvent = await prisma.event.create({
			data: {
				user: {
					connect: { id: req?.user.id },
				},
				title: req.event.title,
				location: req.event.location,
				city: req.event.city,
				zip_code: Number(req.event.zip_code),
				venue_type: req.event.venue_type,
				details: req.event.details,
				roster: req.event.roster,
				scheduled_at: req.event.scheduled_at,
				start_time,
				end_time,
				ticket_price: Number(req.event.ticket_price),
				ticket_amount: Number(req.event.ticket_amount),
				assigned_pic: `${req.event.assigned_pic}`,
				pic_phone_no: `${req.event.pic_phone_no}`,
				category: req?.event.category,
				discount_amount: Number(req.event.discount_amount),
				image_url: image,
			},
		});

		let discountCalculation: number = 0;
		if (createNewEvent.discount_amount) {
			discountCalculation =
				createNewEvent.ticket_price -
				(createNewEvent.discount_amount / 100) * createNewEvent.ticket_price;
		}

		const data = { ...createNewEvent, discountCalculation };
		console.log(data);
		return data;
	}

	async delete(req: Request) {
		const { id } = req.params;

		const data = await prisma.event.delete({
			where: { id },
		});
	}
}

export default new EventServices();
