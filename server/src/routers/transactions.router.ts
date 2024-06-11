import { TransactionController } from "../controllers/transaction.controller";
import { maxAvatarSize, uploader } from "../libs/multer";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkPromotor } from "../middlewares/event.middleware";
import {
	checkEventOwner,
	checkEventStatus,
	checkTicketAmount,
	checkVoucher,
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
		this.router.get(
			"/v1",
			verifyAccessToken,
			this.transactionController.getCustomerTransactions
		);
		this.router.get(
			"/v2",
			verifyAccessToken,
			checkPromotor,
			this.transactionController.getPromotorTransactions
		);
		this.router.post(
			"/",
			verifyAccessToken,
			checkEventOwner,
			checkTicketAmount,
			checkVoucher,
			checkEventStatus,
			this.transactionController.create
		);
		this.router.patch(
			"/:id",
			verifyAccessToken,
			checkPromotor,
			uploader("PROOF", maxAvatarSize, "transfer_proof").single(
				"transfer_proof"
			),
			this.transactionController.update
		);
		this.router.delete(
			"/:id",
			verifyAccessToken,
			checkPromotor,
			this.transactionController.delete
		);
	}
}

export default new TransactionsRouter();
