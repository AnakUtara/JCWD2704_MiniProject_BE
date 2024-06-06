import { TransactionController } from "../controllers/transaction.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkEventStatus } from "../middlewares/event.middleware";
import {
	checkEventOwner,
	checkTicketAmount,
} from "../middlewares/transaction.middleware";
import { EntityRouter } from "./entity.router";

class TransactionsRouter extends EntityRouter {
	private transactionController: TransactionController;
	constructor() {
		super();
		this.transactionController = new TransactionController();
		this.initRouter();
	}
	private initRouter() {
		this.router.post(
			"/",
			verifyAccessToken,
			checkEventOwner,
			checkTicketAmount,
			checkEventStatus,
			this.transactionController.create
		);
	}
}

export default new TransactionsRouter();
