import usersController from "../controllers/users.controller";
import {
	authenticate,
	checkIsAuthorized,
	verifyToken,
} from "../middlewares/auth.middleware";
import {
	checkUpdateUserForm,
	checkUserExistById,
	checkRegistrationInputs,
	checkIsReferralValid,
	checkExistingUser,
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
			"/validate",
			verifyToken,
			usersController.validateToken.bind(usersController)
		);
		this.router.post(
			"/v1",
			authenticate,
			usersController.login.bind(usersController)
		);
		this.router.post(
			"/v2",
			checkRegistrationInputs,
			checkIsReferralValid,
			checkExistingUser,
			usersController.create.bind(usersController)
		);
		this.router.patch(
			"/v3/:token",
			usersController.emailVerification.bind(usersController)
		);
		this.router.post(
			"/v4/:token",
			usersController.forgotPassword.bind(usersController)
		);
		this.router.patch(
			"/v5/:token",
			usersController.updatePassword.bind(usersController)
		);
		this.router.get(
			"/:id_username",
			usersController.getByIdOrUsername.bind(usersController)
		);
		this.router.patch(
			"/:id_username",
			verifyToken,
			checkIsAuthorized,
			checkUserExistById,
			checkUpdateUserForm,
			usersController.update.bind(usersController)
		);
	}
}

export default new UsersRouter();
