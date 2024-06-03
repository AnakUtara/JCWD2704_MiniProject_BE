import { Discount_amount, Event_image } from "@prisma/client";
import { TEvent } from "../../models/event.model";

export class EventDto {
	title: string = "";
	price: number = 0;
	city: string = "";
	capacity: number = 0;
	event_image: string[] = [];
	scheduled_at?: Date;
	discount?: Discount_amount;

	constructor(Partial: Partial<EventDto>) {
		Object.assign(this, Partial);
	}

	static fromEntity(event: TEvent): EventDto {
		return new EventDto({
			title: event.title,
			price: event.ticket_price,
			city: event.city,
			capacity: event.ticket_amount,
			scheduled_at: event.scheduled_at,
			discount: event.discount_amount,
			event_image: event.event_image?.map((e) => e.image_url),
		});
	}
}
