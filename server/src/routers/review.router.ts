import reviewController from "../controllers/review.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import {
	checkEventStatus,
	checkReview,
} from "../middlewares/review.middleware";
import { EntityRouter } from "./entity.router";

class ReviewRoute extends EntityRouter {
	constructor() {
		super();
		this.initializedRoutes();
	}
	private initializedRoutes() {
		this.router.get("/", reviewController.getAll.bind(reviewController));
		this.router.get("/:id", reviewController.getByEvent.bind(reviewController));
		this.router.post(
			"/:id",
			verifyAccessToken,
			checkEventStatus,
			checkReview,
			reviewController.create.bind(reviewController)
		);
		this.router.delete(
			"/:id",
			verifyAccessToken,
			reviewController.delete.bind(reviewController)
		);
	}
}

export default new ReviewRoute();
