import { TEvent } from "../../models/event.model";

export class EventDto {
	id?: string;
	title: string = "";
	ticket_price?: number = 0;
	city: string = "";
	ticket_amount?: number = 0;
	// event_image: string[] = [];
	image_url: string = "";
	scheduled_at?: Date;
	discount?: number | null;
	discountCalculation?: number | null;
	start_time?: Date;
	end_time?: Date;
	location?: string;
	roster?: string;
	rating?: number[];

	constructor(Partial: Partial<EventDto>) {
		Object.assign(this, Partial);
	}

	static fromEntity(event: TEvent): EventDto {
		return new EventDto({
			id: event.id,
			title: event.title,
			ticket_price: event.ticket_price,
			city: event.city,
			ticket_amount: event.ticket_amount,
			scheduled_at: event.scheduled_at,
			discount: event.discount_amount,
			discountCalculation: event.discountCalculation,
			image_url: event.image_url,
			location: event.location,
			start_time: event.start_time,
			end_time: event.end_time,
			roster: event.roster,

			// event_image: event.event_image?.map((e) => e.image_url),
		});
	}
}
