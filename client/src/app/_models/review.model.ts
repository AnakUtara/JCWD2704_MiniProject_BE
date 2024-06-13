import { TEvent } from "./event.model";
import { TUser } from "./user.model";

export type TReview = {
  review: string;
  rating: number;
  user_id: string;
  event_id: string;
  created_at: Date;

  user: TUser;
  event: TEvent;
};
