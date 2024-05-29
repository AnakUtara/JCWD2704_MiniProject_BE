import { NextFunction, Request, Response } from "express";

import { validator } from "../utils/validator";
import { FilterType } from "../models/event.model";
import { Venue_type } from "@prisma/client";
import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";

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
		const { username } = req.params;
		const findUser = (await prisma.user.findFirst({
			where: { username: username },
			select: { id: true, role: true, bank_acc_no: true },
		})) as TUser;

		validator(
			findUser.role !== "promotor" && !findUser.bank_acc_no,
			`Account ${username} is not a promotor, unable to post event.`
		);
		next();
	} catch (error) {
		next(error);
	}
}

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
