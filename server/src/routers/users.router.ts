import usersController from "../controllers/users.controller";
import { maxAvatarSize, uploader } from "../libs/multer";
import {
	authenticate,
	verifyAccessToken,
	verifyRefreshToken,
	verifyResetToken,
	verifyVerifToken,
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
			"/validation/refresh",
			verifyRefreshToken,
			usersController.validateRefreshToken.bind(usersController)
		);
		this.router.get(
			"/validation/reset",
			verifyResetToken,
			usersController.validateResetToken.bind(usersController)
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
		this.router.get(
			"/v3",
			verifyVerifToken,
			usersController.verifyUser.bind(usersController)
		);
		this.router.post(
			"/v3",
			usersController.emailVerification.bind(usersController)
		);
		this.router.post(
			"/v4",
			usersController.forgotPassword.bind(usersController)
		);
		this.router.patch(
			"/v4",
			verifyResetToken,
			usersController.updatePassword.bind(usersController)
		);
		this.router.get(
			"/profile/:id_username",
			usersController.getByIdOrUsername.bind(usersController)
		);
		this.router.patch(
			"/",
			verifyAccessToken,
			checkUserExistById,
			uploader(`AVTR`, maxAvatarSize, "avatars").single("avatar"),
			checkUpdateUserForm,
			usersController.update.bind(usersController)
		);
	}
}

export default new UsersRouter();
