import { NextFunction, Request, Response } from "express";
import { IService } from "../models/service.model";
import usersService from "../services/users.service";
import { EntityController } from "./entity.controller";

class UsersController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
	async getByUsername(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await usersService.getByUsername(req);
			res.send({ message: "fetch by username", data });
		} catch (error) {
			next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const token = await usersService.login(req);
			res.cookie("auth", token).send({ message: "login success" });
		} catch (error) {
			next(error);
		}
	}
	async validateToken(req: Request, res: Response, next: NextFunction) {
		try {
			res.send({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
}

export default new UsersController(usersService);
