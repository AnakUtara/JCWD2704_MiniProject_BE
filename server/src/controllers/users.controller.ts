import { NextFunction, Request, Response } from "express";
import { IService } from "../models/service.model";
import usersService from "../services/users.service";
import { EntityController } from "./entity.controller";

class UsersController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
	async getByIdOrUsername(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await usersService.getByIdOrUsername(req);
			res.send({ message: "fetch by username", data });
		} catch (error) {
			next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { accessToken, refreshToken } = await usersService.login(req);
			res
				.cookie("access_token", accessToken)
				.cookie("refresh_token", refreshToken)
				.send({ message: "login success" });
		} catch (error) {
			next(error);
		}
	}
	async emailVerification(req: Request, res: Response, next: NextFunction) {
		try {
			await usersService.emailVerification(req);
			res.send({ message: "email sent" });
		} catch (error) {
			next(error);
		}
	}
	async validateRefreshToken(req: Request, res: Response, next: NextFunction) {
		try {
			const { access_token: accessToken, is_verified } =
				await usersService.validateRefreshToken(req);
			res.send({ message: "success", is_verified, accessToken });
		} catch (error) {
			next(error);
		}
	}
	async verifyUser(req: Request, res: Response, next: NextFunction) {
		try {
			await usersService.verifyUser(req);
			res.send({ message: "verification success" });
		} catch (error) {
			next(error);
		}
	}
	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			await usersService.forgotPassword(req);
			res.send({ message: "forgot password email sent" });
		} catch (error) {
			next(error);
		}
	}
	async updatePassword(req: Request, res: Response, next: NextFunction) {
		try {
			await usersService.updatePassword(req);
			res.send({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
	async validateResetToken(req: Request, res: Response, next: NextFunction) {
		try {
			res.send({ message: "valid" });
		} catch (error) {
			next(error);
		}
	}
}

export default new UsersController(usersService);
