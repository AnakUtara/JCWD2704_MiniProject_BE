import { TEvent } from "./event.model";
import { TUser } from "./user.model";

export enum trans_status {
  unpaid = "unpaid",
  pending = "pending",
  success = "success",
  cancelled = "cancelled",
}

export type TTransaction = {
  id: string;
  invoice_code: string;
  ticket_bought: number;
  points_used?: number | null;
  total_price: number;
  ticket_discount?: number | null;
  transfer_proof?: string | null;
  status: trans_status;
  user_id: string;
  event_id: string;
  voucher_id?: string | null;
  created_at: string;
  paid_at: string;
  event: TEvent;
  user: TUser;
};
