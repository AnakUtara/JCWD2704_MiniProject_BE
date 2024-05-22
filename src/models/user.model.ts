import { Gender, Role } from "@prisma/client";

export type TUser = {
	id?: string;
	username: string;
	fullname: String;
	gender: Gender;
	email: String;
	password: String;
	role: Role;
	phone_no: string;
	id_card: String;
	address?: String;
	date_of_birth?: Date;
	avatar?: Buffer;
	referral_code?: String;
	reference_code?: String;
	points?: number;
	points_expiry_date?: Date;
	bank_acc_no?: number;
	is_verified?: Boolean;
	created_at?: Date;
	updated_at?: Date;
};
