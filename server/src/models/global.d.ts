import { TEvent } from "./event.model";
import { TUser } from "./user.model";

declare global {
	namespace Express {
		interface Request {
			user: TUser;
			event: TEvent;
			discountCalculation?: number;
			chart_query: {
				type: string;
				month: number;
				year: number;
				day: Date;
			};
		}
	}
}
