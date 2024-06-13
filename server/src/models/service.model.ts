import { Request } from "express";
import { TUser } from "./user.model";
import { TEvent } from "./event.model";
import { TReview } from "./review.model";

export interface IService extends ICustomService {
	getAll: (req: Request) => Promise<TUser[] | TEvent[] | TReview[]>;
	getById?: (req: Request) => Promise<TUser | TEvent | null>;
	create: (req: Request) => Promise<void | TUser | TEvent | TReview>;
	delete: (req: Request) => Promise<TUser | TEvent | void>;
	update: (req: Request) => Promise<TUser | undefined | TEvent | void>;
}

interface ICustomService {
	getByIdOrUsername?: (req: Request) => Promise<TUser | null>;
	emailVerification?: (req: Request) => Promise<void>;
	forgotPassword?: (req: Request) => Promise<void>;
	updatePassword?: (req: Request) => Promise<void>;
	getWithOrder?: (
		req: Request
	) => Promise<{ data: TEvent[]; totalCount: number }>;
	getEventsPromotor?: (
		req: Request
	) => Promise<{ data: TEvent[]; totalCount: number }>;
	verifyUser?: (req: Request) => Promise<void>;
	confirm?: (req: Request) => Promise<void>;
	createEvent?: (req: Request) => Promise<TEvent | null>;
	getByEvent?: (req: Request) => Promise<TReview[]>;
}
