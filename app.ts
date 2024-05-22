import express, { application } from "express";

export default class GigApp {
	private app = application;

	constructor() {
		this.app = express();
	}
}
