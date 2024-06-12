import { Prisma, Transaction } from "@prisma/client";
import { prisma } from "../libs/prisma";
import dayjs from "dayjs";

export async function deleteUnpaidTransaction() {
	const result: string[] =
		await prisma.$queryRaw`select id from transactions where status = "unpaid" and DATE_ADD(created_at, INTERVAL 1 DAY) - now() >=0`;
	if (result.length)
		await prisma.transaction.deleteMany({
			where: {
				id: {
					in: result,
				},
			},
		});
}
