import eventController from "../controllers/event.controller";
import { checkPromotor } from "../middlewares/event.middleware";
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

		this.router.put("/:username", eventController.update.bind(eventController));
		this.router.post(
			"/:username/createevent",
			checkPromotor,
			eventController.create.bind(eventController)
		);
		this.router.delete(
			"/:username/deleteevent",
			eventController.delete.bind(eventController)
		);
	}
}

export default new EventRoute();
