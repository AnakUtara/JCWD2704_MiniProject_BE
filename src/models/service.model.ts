import { Request } from "express";
import { TUser } from "../models/user.model";

export interface IService extends ICustomService {
	getAll: () => Promise<TUser[]>;
	getById: (req: Request) => Promise<TUser | null>;
	create: (req: Request) => Promise<void | TUser>;
	delete: (req: Request) => Promise<TUser>;
	update: (req: Request) => Promise<TUser>;
}

interface ICustomService {}
