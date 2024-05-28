import { Gender, Role } from "@prisma/client";

export type TUser = {
	id?: string;
	username: string;
	fullname: string;
	gender?: Gender | null;
	email: string;
	password?: string;
	role: Role;
	phone_no: string;
	id_card: string;
	address?: string | null;
	date_of_birth?: Date | null;
	avatar?: Buffer | null;
	referral_code: string;
	reference_code?: string | null;
	points?: number | null;
	points_expiry_date?: Date | null;
	bank_acc_no?: string | null;
	is_verified?: Boolean;
	reset_token?: string | null;
	created_at?: Date;
	updated_at?: Date;
};
