import { prisma } from "../libs/prisma";

export async function changeStatus() {
	await prisma.event.updateMany({
		where: { scheduled_at: { lte: new Date() } },
		data: { status: "finished" },
	});
}
