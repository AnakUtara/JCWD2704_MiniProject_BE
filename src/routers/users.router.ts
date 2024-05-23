import usersController from "../controllers/users.controller";
import {
	authenticate,
	checkExistingReferral,
	checkExistingUser,
	checkIsAuthorized,
	checkRegistrationInputs,
	verifyToken,
} from "../middlewares/auth.middleware";
import {
	checkUpdateUserForm,
	checkUserExistById,
} from "../middlewares/users.middleware";
import { EntityRouter } from "./entity.router";

class UsersRouter extends EntityRouter {
	constructor() {
		super();
		this.initRouter();
	}
	private initRouter() {
		this.router.get("/", usersController.getAll.bind(usersController));
		this.router.get(
			"/:username",
			usersController.getByUsername.bind(usersController)
		);
		this.router.post(
			"/v1",
			authenticate,
			usersController.login.bind(usersController)
		);
		this.router.post(
			"/v2",
			checkRegistrationInputs,
			checkExistingReferral,
			checkExistingUser,
			usersController.create.bind(usersController)
		);
		this.router.patch(
			"/:id",
			verifyToken,
			checkIsAuthorized,
			checkUserExistById,
			checkUpdateUserForm,
			usersController.update.bind(usersController)
		);
	}
}

export default new UsersRouter();
