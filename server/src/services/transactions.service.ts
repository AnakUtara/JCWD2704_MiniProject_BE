import { Request } from "express";
import { prisma } from "../libs/prisma";
import { Prisma, Status_transaction, Transaction } from "@prisma/client";
import dayjs from "dayjs";
import { throwErrorMessageIf } from "../utils/error";

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
	}
	async create(req: Request) {
		const { event_id } = req.params;
		const {
			ticket_bought,
			total_price,
			voucher_id,
			event_discount,
		}: {
			ticket_bought: number;
			total_price: number;
			voucher_id: string;
			event_discount: number;
		} = req.body;
		await prisma.$transaction(async (prisma) => {
			let data: Prisma.TransactionCreateInput = {
				invoice_code: `INV/${dayjs().format("YYYYMMDD/hhmm")}-${
					req.user.username
				}`,
				ticket_bought,
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
				data.voucher!.connect!.id = voucher_id;
				data.total_price = total_price * (voucher!.amount / 100);
			}
			if (event_discount) {
				data.ticket_discount = event_discount;
				data.total_price = total_price * (event_discount / 100);
			}
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
		//TODO: if selected transaction left unpaid until
		//today is greater than transaction created date
		//enable delete selected transaction.
		const payment = await prisma.transaction.findFirst({
			where: { id },
			select: {
				paid_at: true,
				created_at: true,
			},
		});
		throwErrorMessageIf(
			dayjs(payment?.created_at) > dayjs() && payment?.paid_at !== null,
			"Not permitted."
		);
		await prisma.transaction.delete({
			where: { id },
		});
	}
}

export default new TransactionService();
