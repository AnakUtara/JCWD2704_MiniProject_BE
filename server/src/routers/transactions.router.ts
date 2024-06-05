import { EntityRouter } from "./entity.router";

class TransactionsRouter extends EntityRouter {
	constructor() {
		super();
		this.initRouter();
	}
	private initRouter() {}
}

export default new TransactionsRouter();
