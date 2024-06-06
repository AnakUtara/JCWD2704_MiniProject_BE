import { Request } from "express";
import { prisma } from "../libs/prisma";
import { Prisma, Status_transaction, Transaction } from "@prisma/client";
import dayjs from "dayjs";
import { throwErrorMessageIf } from "../utils/error";
import { TEvent } from "../models/event.model";
import { discCalc } from "../utils/calc";

class TransactionService {
	async getCustomerTransactions(req: Request) {
		//TODO: Get transactions list made by logged in customer
		//It should have filter by recent, category, location and, status
		//can change order by asc & desc
		//Select transaction, event title, event schedule, event status,
		//include promotor data: username, avatar
	}
	async getPromotorTransactions(req: Request) {
		//TODO: Get transaction list made by customers
		//to events created by logged in Promotor
		const {
			sort_by,
			sort,
			search,
			status,
		}: {
			sort_by: string;
			sort: string;
			search: string;
			status: Status_transaction;
		} = req.body;
		const { id } = req?.user;
		const data = await prisma.transaction.findMany({
			where: {
				user_id: id,
				OR: [
					{ invoice_code: { contains: search } },
					{ status: { equals: status } },
				],
			},
			orderBy: [{ [sort_by]: sort }],
		});
		throwErrorMessageIf(!data, "Transaction not found.");
		return data;
	}
	async create(req: Request) {
		const { id: event_id } = req.event as TEvent;
		const {
			ticket_bought,
			voucher_id,
		}: {
			ticket_bought: number;
			voucher_id?: string;
		} = req.body;
		throwErrorMessageIf(!ticket_bought, "Specify amount of ticket to buy.");
		let total_price = req.event.ticket_price! * Number(ticket_bought);
		console.log(req.body, total_price);
		await prisma.$transaction(async (prisma) => {
			let data: Prisma.TransactionCreateInput = {
				invoice_code: `INV/${dayjs().format("YYYYMMDD/hhmm")}-${
					req.user.username
				}`,
				ticket_bought: Number(ticket_bought),
				total_price,
				user: {
					connect: {
						id: req.user.id,
					},
				},
				event: {
					connect: {
						id: event_id as string,
					},
				},
			};
			if (voucher_id) {
				const voucher = await prisma.voucher.update({
					where: {
						id: voucher_id,
					},
					data: {
						is_valid: false,
					},
					select: {
						amount: true,
					},
				});
				throwErrorMessageIf(!voucher, "Voucher not found.");
				data = { ...data, voucher: { connect: { id: voucher_id } } };
				data.total_price = total_price -= discCalc(total_price, voucher.amount);
			}
			if (req.event.discount_amount) {
				data.ticket_discount = req.event.discount_amount;
				data.total_price = total_price -= discCalc(
					total_price,
					req.event.discount_amount
				);
			}
			throwErrorMessageIf(
				req.event.ticket_amount! < ticket_bought,
				"Limit exceeded."
			);
			await prisma.transaction.create({
				data,
			});
			await prisma.event.update({
				where: {
					id: event_id,
				},
				data: {
					ticket_amount: req.event.ticket_amount! - ticket_bought,
				},
			});
		});
	}
	async update(req: Request) {
		const { id } = req.params;
		const transfer_proof = req.file?.filename;
		await prisma.$transaction(async (prisma) => {
			await prisma.transaction.update({
				where: {
					id,
				},
				data: {
					status: Status_transaction.pending,
					transfer_proof,
				},
			});
		});
	}
	async confirm(req: Request) {
		const { id } = req.params;
		const { status } = req.body;
		await prisma.$transaction(async (prisma) => {
			await prisma.transaction.update({
				where: {
					id,
				},
				data: {
					status,
					paid_at: dayjs().toDate(),
				},
			});
		});
	}
	async delete(req: Request) {
		const { id } = req.params;
		//TODO: if transaction deleted, return ticket_bought + ticket_amount
		//of selected event.
		const payment = await prisma.transaction.findFirst({
			where: { id },
			select: {
				paid_at: true,
				created_at: true,
				event_id: true,
				ticket_bought: true,
			},
		});
		throwErrorMessageIf(!payment, "Transaction not found.");
		throwErrorMessageIf(
			dayjs(payment?.created_at) > dayjs() && payment?.paid_at !== null,
			"Not permitted."
		);
		await prisma.$transaction(async (prisma) => {
			await prisma.transaction.delete({
				where: { id },
			});
			await prisma.event.update({
				where: { id: payment?.event_id },
				data: {},
			});
		});
	}
}

export default new TransactionService();
