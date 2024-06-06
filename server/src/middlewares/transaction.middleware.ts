import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { TEvent } from "../models/event.model";
import { Role } from "@prisma/client";

export async function checkTicketAmount(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { event_id } = req.body;
		const isTicketReady = (await prisma.event.findFirst({
			where: { id: event_id },
		})) as TEvent;
		throwErrorMessageIf(isTicketReady?.ticket_amount === 0, "Sold out.");
		req.event = isTicketReady;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkEventOwner(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.user;
		const { event_id } = req.body;
		const isEventOwner = await prisma.event.findFirst({
			where: { AND: [{ user_id: id }, { id: event_id }] },
		});
		res.status(401);
		throwErrorMessageIf(!event_id, "Event not found.");
		throwErrorMessageIf(isEventOwner !== null, "Forbidden.");
		next();
	} catch (error) {
		next(error);
	}
}
