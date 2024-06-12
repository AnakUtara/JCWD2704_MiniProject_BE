import * as Yup from "yup";
import yp from "yup-password";
import { Gender } from "../_models/user.model";
yp(Yup);

export const loginSchema = Yup.object().shape({
  email_username: Yup.string().lowercase().trim().required(),
  password: Yup.string().trim().required(),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string().lowercase().min(3).max(30).trim().required(),
  fullname: Yup.string().trim().lowercase().required(),
  password: Yup.string()
    .trim()
    .min(8)
    .max(20)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .required(),
  email: Yup.string().trim().lowercase().email().required(),
  phone_no: Yup.string().trim().length(13).required(),
  id_card: Yup.string().trim().length(16).required(),
  reference_code: Yup.string()
    .trim()
    .matches(/^[a-z0-9]+$/i),
  bank_acc_no: Yup.string()
    .trim()
    .matches(/^[a-z0-9]+$/i)
    .min(8)
    .max(12),
});

export const editProfileSchema = Yup.object().shape({
  username: Yup.string().lowercase().min(3).max(30).trim().required(),
  fullname: Yup.string().trim().lowercase().required(),
  email: Yup.string().trim().lowercase().email().required(),
  phone_no: Yup.string().trim().length(13).required(),
  bank_acc_no: Yup.string()
    .trim()
    .matches(/^[a-z0-9]+$/i)
    .min(8)
    .max(12),
  date_of_birth: Yup.string().trim(),
  address: Yup.string().min(3).trim(),
  gender: Yup.string(),
});

export const eventSchema = Yup.object().shape({
  title: Yup.string().lowercase().required(),
  location: Yup.string().lowercase().required(),
  city: Yup.string().lowercase().required(),
  zip_code: Yup.string().required(),
  venue_type: Yup.string().lowercase().required(),
  details: Yup.string().required(),
  roster: Yup.string().required(),
  scheduled_at: Yup.string().required(),
  start_time: Yup.string().required(),
  end_time: Yup.string().required(),
  ticket_price: Yup.string(),
  ticket_amount: Yup.string().required(),
  assigned_pic: Yup.string(),
  pic_phone_no: Yup.string(),
  category: Yup.string().lowercase().required(),
  discount_amount: Yup.string().required(),
  image_url: Yup.string().required(),
});

export const editEventSchema = Yup.object().shape({
  title: Yup.string().trim().min(4).max(200),
  location: Yup.string().trim().min(1).max(500),
  city: Yup.string().trim().min(4).max(50),
  zip_code: Yup.number().min(5),
  venue_type: Yup.string(),
  details: Yup.string().trim().min(1).max(2000),
  roster: Yup.string().trim(),
  scheduled_at: Yup.string().trim(),
  start_time: Yup.string().trim(),
  end_time: Yup.string().trim(),
  ticket_price: Yup.string().trim(),
  ticket_amount: Yup.string().trim(),
  // assigned_pic: Yup.string().trim(),
  // pic_phone_no: Yup.string().trim(),
  category: Yup.string().trim(),
  discount_amount: Yup.string(),
});
