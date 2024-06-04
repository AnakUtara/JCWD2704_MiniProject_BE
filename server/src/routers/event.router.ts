import eventController from "../controllers/event.controller";
import { maxEventSize, uploader } from "../libs/multer";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import {
	checkCreateEvent,
	checkPromotor,
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
		this.router.get("/evid/:id", eventController.getById.bind(eventController));

		// ROUTE FOR FETCH EVENT DATA HANDLED BY PROMOTOR
		this.router.get(
			"/",
			verifyAccessToken,
			checkPromotor,
			eventController.getEventsPromotor.bind(eventController)
		);

		// ROUTE FOR UPDATE EVENT DATA
		this.router.put(
			"/",
			verifyAccessToken,
			checkPromotor,
			uploader("EVNT", maxEventSize, "events").single("image_url"),
			eventController.update.bind(eventController)
		);

		// ROUTE FOR CREATE EVENT DATA
		this.router.post(
			"/",
			verifyAccessToken,
			checkPromotor,
			uploader("EVNT", maxEventSize, "events").single("image_url"),
			checkCreateEvent,
			eventController.create.bind(eventController)
		);

		// ROUTE FOR DELETE EVENT DATA
		this.router.delete(
			"/",
			verifyAccessToken,
			checkPromotor,
			eventController.delete.bind(eventController)
		);
	}
}

export default new EventRoute();
