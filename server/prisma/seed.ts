import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../src/libs/prisma";
import { users } from "./user";
import { DefaultArgs } from "@prisma/client/runtime/library";
type TPrisma = Omit<
	PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
	"$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
async function createUsers(prisma: TPrisma) {
	await prisma.user.createMany({
		data: users,
	});
}

async function main() {
	await prisma.$transaction(async (prisma) => {
		try {
			await createUsers(prisma);
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	});
}

main();
