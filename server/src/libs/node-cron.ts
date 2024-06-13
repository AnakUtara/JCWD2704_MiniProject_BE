import cron from "node-cron";
import { deleteUnpaidTransaction } from "../utils/scheduler";

export function deleteUnpaidScheduler() {
	return cron.schedule("*/1 * * * *", async () => {
		await deleteUnpaidTransaction();
	});
}
