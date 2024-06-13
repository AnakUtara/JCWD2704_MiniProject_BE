import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { PORT, corsOptions } from "./config/config";
import usersRouter from "./routers/users.router";
import eventRouter from "./routers/event.router";
import transactionsRouter from "./routers/transactions.router";
import reviewRouter from "./routers/review.router";
import { updateStatusEvent } from "./libs/node-cron";

export default class App {
	app: Application;
	constructor() {
		this.app = express();
		this.configure();
		updateStatusEvent();
		this.routes();
		this.errorHandler();
	}
	private configure(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded());
		this.app.use(cors(corsOptions));
		this.app.use(
			"/images/avatars",
			express.static(__dirname + "/public/images/avatars")
		);
		this.app.use(
			"/images/events",
			express.static(__dirname + "/public/images/events")
		);
	}
	private routes(): void {
		this.app.get("/", (req: Request, res: Response) => {
			res.send("Welcome to JCWD2704 Mini Project api.");
		});
		this.app.use("/users", usersRouter.getRouter());
		this.app.use("/events", eventRouter.getRouter());
		this.app.use("/transactions", transactionsRouter.getRouter());
		this.app.use("/review", reviewRouter.getRouter());
	}
	private errorHandler(): void {
		this.app.use("/*", (req: Request, res: Response) => {
			res.status(404).send("Not Found.");
		});
		this.app.use(
			(error: unknown, req: Request, res: Response, next: NextFunction) => {
				if (error instanceof Error)
					res.status(500).send({ message: error.message });
			}
		);
	}
	start(): void {
		this.app.listen(PORT, (): void => {
			console.log("api is running on port", PORT);
		});
	}
}
