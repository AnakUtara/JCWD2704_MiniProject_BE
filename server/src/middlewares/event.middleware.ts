import { NextFunction, Request, Response } from "express";

import { validator } from "../utils/validator";
import { FilterType } from "../models/event.model";
import { Role, Venue_type } from "@prisma/client";
import { TUser } from "../models/user.model";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";

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

export async function checkIsUserPromotor(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username } = req.user;
		const findPromotor = (await prisma.user.findUnique({
			where: { username, role: Role.promotor },
		})) as TUser;
		throwErrorMessageIf(!findPromotor, "Promotor not found.");
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
