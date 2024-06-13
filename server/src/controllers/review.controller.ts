import { NextFunction, Request, Response } from "express";
import { IService } from "../models/service.model";
import { EntityController } from "./entity.controller";
import reviewService from "../services/review.service";

class ReviewController extends EntityController {
	constructor(service: IService) {
		super(service);
	}

	async getByEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await reviewService.getByEvent(req);
			res.send({ message: "data fetched successfully", data });
		} catch (error) {
			next(error);
		}
	}
}

export default new ReviewController(reviewService);
