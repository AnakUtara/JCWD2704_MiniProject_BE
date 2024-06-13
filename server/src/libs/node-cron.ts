import cron from "node-cron";
import { changeStatus } from "../utils/scheduler";

export function updateStatusEvent() {
	return cron.schedule("*/3 * * * * *", async () => {
		// console.log("test");
		await changeStatus();
	});
}
