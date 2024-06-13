import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { validator } from "../utils/validator";

export async function checkReview(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const reviewIsExist = await prisma.review.findFirst({
			where: { event_id: id, user_id: req.user.id },
		});
		validator(!!reviewIsExist, "you already reviewed this event");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkEventStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const eventStatus = await prisma.event.findFirst({
			where: { id },
			select: { status: true },
		});

		validator(
			eventStatus!.status === "published",
			"unable to add review on the ongoing event"
		);
		next();
	} catch (error) {
		next(error);
	}
}
