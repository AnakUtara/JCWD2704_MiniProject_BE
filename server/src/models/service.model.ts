import { Request } from "express";
import { TUser } from "./user.model";
import { TEvent, TEventDetails } from "./event.model";

export interface IService extends ICustomService {
	getAll: (req: Request) => Promise<TUser[] | TEvent[]>;
	getById: (req: Request) => Promise<TUser | TEvent | null>;
	create: (req: Request) => Promise<void | TUser | TEvent>;
	delete: (req: Request) => Promise<TUser | TEvent>;
	update: (req: Request) => Promise<TUser | undefined | TEvent>;
}

interface ICustomService {
	getByIdOrUsername?: (req: Request) => Promise<TUser | null>;
	emailVerification?: (req: Request) => Promise<void>;
	forgotPassword?: (req: Request) => Promise<void>;
	updatePassword?: (req: Request) => Promise<void>;
	getWithOrder?: (
		req: Request
	) => Promise<{ data: TEvent[]; totalCount: number }>;
	getEventsPromotor?: (req: Request) => Promise<TEvent[]>;
	verifyUser?: (req: Request) => Promise<void>;
	confirm?: (req: Request) => Promise<void>;
}
