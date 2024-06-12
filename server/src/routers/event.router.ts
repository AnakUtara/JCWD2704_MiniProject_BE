import eventController from "../controllers/event.controller";
import { maxEventSize, uploader } from "../libs/multer";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import {
	checkCreateEvent,
	checkEventIsExist,
	checkPromotor,
	checkUpdateEventForm,
} from "../middlewares/event.middleware";
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
		// ROUTE FOR FETCH EVENT DATA HANDLED BY PROMOTOR
		this.router.get(
			"/promotor",
			verifyAccessToken,
			checkPromotor,
			eventController.getEventsPromotor.bind(eventController)
		);

		this.router.get("/:id", eventController.getById.bind(eventController));

		// ROUTE FOR UPDATE EVENT DATA
		this.router.patch(
			"/:id",
			verifyAccessToken,
			checkPromotor,
			checkEventIsExist,
			uploader("EVNT", maxEventSize, "events").single("image"),
			checkUpdateEventForm,
			eventController.update.bind(eventController)
		);

		// ROUTE FOR CREATE EVENT DATA
		this.router.post(
			"/",
			verifyAccessToken,
			checkPromotor,
			uploader("EVNT", maxEventSize, "events").single("image"),
			checkCreateEvent,
			eventController.create.bind(eventController)
		);

		// ROUTE FOR DELETE EVENT DATA
		this.router.delete(
			"/:id",
			verifyAccessToken,
			checkPromotor,
			eventController.delete.bind(eventController)
		);
	}
}

export default new EventRoute();
