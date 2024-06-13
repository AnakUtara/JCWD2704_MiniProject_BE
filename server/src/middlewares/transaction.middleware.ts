import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { throwErrorMessageIf } from "../utils/error";
import { TEvent } from "../models/event.model";
import { Status_event, Status_transaction } from "@prisma/client";
import { TVoucher } from "../models/voucher.model";
import { chartQuerySchema } from "../libs/joi";

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
		throwErrorMessageIf(
			isEventOwner !== null,
			"Unable to purchase owned event."
		);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkPaymentStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isUnpaid = await prisma.transaction.findFirst({
			where: {
				id,
			},
			select: {
				status: true,
			},
		});
		throwErrorMessageIf(
			isUnpaid?.status !== Status_transaction.unpaid,
			"Not permitted."
		);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkVoucher(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id: user_id } = req.user;
		const { voucher_id: id } = req.body;
		if (!id) return next();
		const isOwnVoucher = (await prisma.voucher.findFirst({
			where: {
				AND: [{ id }, { user_id }],
			},
			select: {
				is_valid: true,
			},
		})) as TVoucher;
		throwErrorMessageIf(!isOwnVoucher, "Voucher & user not match");
		throwErrorMessageIf(!isOwnVoucher.is_valid, "Voucher invalid");
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkEventStatusFromTransID(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isEventDone = await prisma.transaction.findFirst({
			where: {
				id,
			},
			include: {
				event: true,
			},
		});
		if (isEventDone?.event.status === Status_event.finished) res.send(405);
		throwErrorMessageIf(
			isEventDone?.event.status === Status_event.finished,
			"Not allowed to cancel finished event."
		);
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
		const { event_id: id } = req.body;
		const isEventDone = await prisma.event.findFirst({
			where: { id },
			include: {
				user: true,
			},
		});

		throwErrorMessageIf(
			isEventDone?.status === Status_event.finished || !isEventDone,
			"Event has ended."
		);
		req.event = isEventDone as TEvent;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkChartQuery(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		req.chart_query = await chartQuerySchema.validateAsync(req.query);
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkTransactionStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const isCancelled = await prisma.transaction.findFirst({
			where: {
				id,
				AND: {
					OR: [
						{ status: Status_transaction.cancelled },
						{ status: Status_transaction.success },
					],
				},
			},
		});
		if (isCancelled) res.status(405);
		throwErrorMessageIf(
			isCancelled !== null,
			"Can't modify successful/cancelled transaction."
		);
		next();
	} catch (error) {
		next(error);
	}
}
