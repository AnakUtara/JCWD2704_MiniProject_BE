import { Router } from "express";

export class EntityRouter {
	router: Router;
	constructor() {
		this.router = Router();
	}
	getRouter() {
		return this.router;
	}
}
