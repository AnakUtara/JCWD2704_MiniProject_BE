import { Router } from "express";

export class EntityRouter {
	private router: Router;
	constructor() {
		this.router = Router();
	}
	getRouter() {
		return this.router;
	}
}
