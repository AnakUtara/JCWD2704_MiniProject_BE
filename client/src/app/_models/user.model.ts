import { TVoucher } from "./voucher.model";

export enum Gender {
  male = "male",
  female = "female",
}

export enum Role {
  customer = "customer",
  promotor = "promotor",
}

export type TUser = {
  id?: string;
  username: string;
  fullname: string;
  gender?: Gender | null;
  email: string;
  password?: string;
  role?: Role;
  phone_no: string;
  id_card: string;
  address?: string | null;
  date_of_birth?: string | null;
  avatar?: string | null;
  referral_code?: string;
  reference_code?: string | null | undefined;
  points?: number | null;
  points_expiry_date?: string | null;
  bank_acc_no?: string | null | undefined;
  is_verified?: Boolean;
  reset_token?: string | null;
  created_at?: string;
  updated_at?: string;
  voucher?: TVoucher | null;
};

export const initUser: TUser = {
  id: "",
  username: "",
  fullname: "",
  gender: Gender.male,
  email: "",
  password: "",
  role: Role.customer,
  phone_no: "",
  id_card: "",
  address: "",
  date_of_birth: "",
  avatar: "",
  referral_code: "",
  reference_code: "",
  points: 0,
  points_expiry_date: "",
  bank_acc_no: "",
  is_verified: false,
  reset_token: "",
  created_at: "",
  updated_at: "",
};

export const initRegister: TUser = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  phone_no: "",
  id_card: "",
  reference_code: "",
  bank_acc_no: "",
};
