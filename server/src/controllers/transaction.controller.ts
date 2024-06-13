import { NextFunction, Request, Response } from "express";
import transactionsService from "../services/transactions.service";

export class TransactionController {
	async getChartData(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await transactionsService.getChartData(req);
			res.send({ message: "fetch favorite category", data });
		} catch (error) {
			next(error);
		}
	}
	async getCustomerTransactions(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { data, total } = await transactionsService.getCustomerTransactions(
				req
			);
			res.send({ message: "fetch customer's transactions.", data, total });
		} catch (error) {
			next(error);
		}
	}
	async getPromotorTransactions(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { data, total } = await transactionsService.getPromotorTransactions(
				req
			);
			res.send({ message: "fetch promotor's transactions.", data, total });
		} catch (error) {
			next(error);
		}
	}
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			await transactionsService.create(req);
			res.status(201).send({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			await transactionsService.update(req);
			res.send({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await transactionsService.delete(req);
			res.send({ message: "deleted" });
		} catch (error) {
			next(error);
		}
	}
	async confirm(req: Request, res: Response, next: NextFunction) {
		try {
			await transactionsService.confirm(req);
			res.send({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
}
