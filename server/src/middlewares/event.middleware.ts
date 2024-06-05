import { NextFunction, Request, Response, response } from "express";

import { validator } from "../utils/validator";
import { FilterType } from "../models/event.model";
import { Role, Venue_type } from "@prisma/client";
import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";
import eventService from "../services/event.service";
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
			where: { username, role: Role.promotor },
		})) as TUser;
		validator(!findUser, `User not found.`);
		next();
	} catch (error) {
		next(error);
	}
}

// export async function checkDiscount(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	try {
// 		const { discount_amount } = req.query as {
// 			discount_amount: Discount_amount;
// 		};
// 		const { data, totalCount } = await eventService.getWithOrder(req);
// 		if (discount_amount && data) {
// 			const discountPrice = data.map((e) => ({
// 				...event,
// 				discount_price: calculateDiscount(e.ticket_price, discount_amount),
// 			}));
// 			res.json({ data: discountPrice });
// 			console.log(discountPrice);
// 		}
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// }

export async function checkExistEvent(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
	} catch (error) {
		next(error);
	}
}
