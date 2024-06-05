import eventController from "../controllers/event.controller";
import { maxEventSize, uploader } from "../libs/multer";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkPromotor } from "../middlewares/event.middleware";
import { checkExistingUser } from "../middlewares/users.middleware";
import { EntityRouter } from "./entity.router";

class EventRoute extends EntityRouter {
	constructor() {
		super();
		this.initializedRoutes();
	}
	private initializedRoutes() {
		this.router.get("/", eventController.getAll.bind(eventController));
		this.router.get(
			"/orders",
			eventController.getWithOrder.bind(eventController)
		);
		this.router.get(
			"/:id_username",
			eventController.getEventsPromotor.bind(eventController)
		);

		this.router.post(
			"/",
			verifyAccessToken,
			checkPromotor,
			uploader(`EVENT`, maxEventSize, "events").single("image"),
			eventController.create.bind(eventController)
		);
		this.router.put("/:username", eventController.update.bind(eventController));
		this.router.delete(
			"/:username",
			eventController.delete.bind(eventController)
		);
	}
}

export default new EventRoute();
