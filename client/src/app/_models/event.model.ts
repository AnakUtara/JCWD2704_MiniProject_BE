import { TUser } from "./user.model";

export const orderType = [
  { value: "title", name: "By Title" },
  { value: "scheduled_at", name: "By Date" },
  { value: "ticket_amount", name: "By Capacity" },
  { value: "ticket_price", name: "By Price" },
];

export const initEvent = {
  title: "",
  location: "",
  city: "",
  zip_code: "",
  venue_type: "",
  details: "",
  roster: "",
  scheduled_at: "",
  start_time: "",
  end_time: "",
  ticket_price: "",
  ticket_amount: "",
  assigned_pic: "",
  pic_phone_no: "",
  category: "",
  discount_amount: "",
  image_url: "",
  discountCalculation: "",
};

export type TEvent = {
  id: string;
  title: string;
  location: string;
  city: string;
  zip_code: number;

  venue_type: string;
  details: string;
  roster: string;
  scheduled_at: Date;
  start_time: Date;
  end_time: Date;
  status: string;
  image_url: string | undefined;

  discount_amount: number | null;
  ticket_price?: number | undefined;
  ticket_amount: number | undefined;
  discountCalculation?: number | null;

  assigned_pic?: string | null;
  pic_phone_no?: string | null;

  user_id?: string;
  category: string;

  created_at?: Date;
  updated_at?: Date;

  user: TUser;
  ratingEvent?: number | null;
};

export enum Category {
  Acoustic = "Acoustic",
  Rock = "Rock",
  Punk = "Punk",
  metal = "Metal",
  Pop = "Pop",
  Electronic = "Electronic",
  Experimental = "Experimental",
}

export enum Venue_type {
  indoor = "indoor",
  outdoor = "outdoor",
}

export enum Status_event {
  published = "published",
  finished = "finished",
}
