import { NextFunction, Request, Response } from "express";
import { IService } from "../models/service.model";
import eventService from "../services/event.service";
import { EntityController } from "./entity.controller";
import { EventDto } from "../dto/response/event.dto";

class EventControllers extends EntityController {
	constructor(service: IService) {
		super(service);
	}

	async getWithOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { data, totalCount } = await eventService.getWithOrder(req);
			// const result = data.map((e: any) => EventDto.fromEntity(e));
			res.send({
				message: "data fetched successfully",
				data,
				total_page: Math.ceil(totalCount / Number(req.query.limit)),
			});
		} catch (error) {
			next(error);
		}
	}

	async getEventsPromotor(req: Request, res: Response, next: NextFunction) {
		try {
			const { data, totalCount } = await eventService.getEventsPromotor(req);
			const result = data.map((e: any) => EventDto.fromEntity(e));
			res.send({
				message: "data fetched successfully",
				result,
				total_page: Math.ceil(totalCount / Number(req.query.limit)),
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new EventControllers(eventService);
