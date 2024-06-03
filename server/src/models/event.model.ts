import { Category, Status_event, Venue_type } from "@prisma/client";

export enum Discount {
	d5 = 5,
	d10 = 10,
	d15 = 15,
	d20 = 20,
	d25 = 25,
	d30 = 30,
	d35 = 35,
	d40 = 40,
	d50 = 50,
	d60 = 60,
	d70 = 70,
	d80 = 80,
}

export type TEvent = {
	id?: string;
	title: string;
	location: string;
	city: string;
	zip_code: number;
	venue_type: Venue_type;
	details: string;
	roster: string;
	scheduled_at: Date;
	start_time: Date;
	end_time: Date;
	status: Status_event;
	image_url: string;
	discount_amount?: number | null;
	ticket_price?: number | undefined;
	ticket_amount: number | undefined;
	discount_price?: number | null;
	assigned_pic?: string | null;
	pic_phone_no?: string | null;
	user_id?: string;
	category?: Category;
	created_at?: Date;
	updated_at?: Date;
};

export type TEventDetails = {
	title: string;
	location: string;
	city: string;
	venue_type: Venue_type;
	details: string;
	scheduled_at: Date;
	start_time: Date;
	end_time: Date;
	ticket_amount: number;
	category?: Category;
};

export type FilterType = "venue_type" | "status" | "city";
export type OrderType = "city" | "title" | "ticket_amount" | "scheduled_at";
export type Order = "asc" | "desc";
