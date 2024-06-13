import { NextFunction, Request, Response, response } from "express";

import { validator } from "../utils/validator";
import { FilterType } from "../models/event.model";
import { Venue_type } from "@prisma/client";
import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";
import eventService from "../services/event.service";
import { eventSchema, updateEventSchema } from "../libs/joi";
// import calculateDiscount from "../libs/discount-calculation";

export async function checkFilter(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { filterType, filterValue } = req.query as {
			filterType: FilterType;
			filterValue: string;
		};
		if (!filterType || !filterValue) {
			return next();
		}
		const validFilter: Record<string, string> = {
			venue_type: "venue_type",
			status: "status",
			city: "city",
			title: "title",
		};

		let filterByParam = {};
		if (filterType === "venue_type") {
			if (Object.values(Venue_type).includes(filterValue as Venue_type)) {
				filterByParam = { venue_type: filterValue as Venue_type };
			} else {
				throw new Error("invalid venue type!");
			}
		} else if (validFilter[filterType]) {
			filterByParam = { [validFilter[filterType]]: { contains: filterValue } };
		}

		const selectFilter = validFilter[filterType]
			? { [validFilter[filterType]]: true }
			: {};

		const isExist = await prisma.event.findFirst({
			where: filterByParam,
			select: selectFilter,
		});

		validator(
			!isExist,
			`No value ${filterValue} found when filtered by ${filterType}`
		);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkPromotor(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username } = req.user;
		const findUser = (await prisma.user.findFirst({
			where: { username: username, role: "promotor" },
		})) as TUser;
		// console.log(findUser);

		validator(
			findUser.role !== "promotor" && !findUser.bank_acc_no,
			`Account ${username} is not a promotor, unable to post/create event.`
		);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkCreateEvent(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const {
			title,
			location,
			city,
			zip_code,
			venue_type,
			details,
			roster,
			scheduled_at,
			start_time,
			end_time,
			ticket_price,
			ticket_amount,
			category,
		} = req.body;
		validator(
			!title ||
				!location ||
				!city ||
				!zip_code ||
				!venue_type ||
				!roster ||
				!scheduled_at ||
				!start_time ||
				!end_time ||
				!ticket_price ||
				!ticket_amount ||
				!category,
			"All necessary fields except discount, and PIC Info must be filled"
		);

		req.event = await eventSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkDiscount(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { discount_amount, ticket_price } = req.body;
	let discountCalculation: number = 0;
	if (discount_amount && ticket_price) {
		discountCalculation = (discount_amount / 100) * ticket_price;
	}
	req.discountCalculation = discountCalculation;
	try {
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkEventIsExist(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isExist = await prisma.event.findFirst({
			where: { id },
		});
		validator(!isExist, "Event does not exist.");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkUpdateEventForm(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		req.event = await updateEventSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error);
	}
}
