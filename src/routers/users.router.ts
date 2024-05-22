import { EntityRouter } from "./entity.router";

class UsersRouter extends EntityRouter {
	constructor() {
		super();
		this.initRouter();
	}
	private initRouter() {}
}

export default new UsersRouter();
