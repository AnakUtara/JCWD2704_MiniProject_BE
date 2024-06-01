import { NextFunction, Request, Response } from "express";
import { IService } from "../models/service.model";
import eventService from "../services/event.service";
import { EntityController } from "./entity.controller";

class EventControllers extends EntityController {
	constructor(service: IService) {
		super(service);
	}

	async getWithOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await eventService.getWithOrder(req);
			res.send({ message: "data fetched successfully", data });
		} catch (error) {
			next(error);
		}
	}

	async getEventsPromotor(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await eventService.getEventsPromotor(req);
			res.send({ message: "data fetched successfully", data });
		} catch (error) {
			next(error);
		}
	}
}

export default new EventControllers(eventService);
