import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { TEvent } from "../models/event.model";

export async function checkTicketAmount(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { event_id } = req.params;
		const isTicketReady = (await prisma.event.findFirst({
			where: { id: event_id },
			include: { user: true },
		})) as TEvent;
		throwErrorMessageIf(isTicketReady?.ticket_amount === 0, "Sold out.");
		req.event = isTicketReady;
		delete isTicketReady?.user!.password;
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
		const isEventOwner = await prisma.event.findFirst({
			where: { user_id: id },
		});
		throwErrorMessageIf(isEventOwner !== null, "Forbidden.");
		next();
	} catch (error) {
		next(error);
	}
}
