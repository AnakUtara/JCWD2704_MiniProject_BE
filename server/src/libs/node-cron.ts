import cron from "node-cron";
import { deleteUnpaidTransaction } from "../utils/scheduler";

export function deleteUnpaidScheduler() {
	return cron.schedule("*/10 * * * *", async () => {
		await deleteUnpaidTransaction();
	});
}
