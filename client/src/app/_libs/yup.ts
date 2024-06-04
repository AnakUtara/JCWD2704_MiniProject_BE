import * as Yup from "yup";
import yp from "yup-password";
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

export const eventSchema = Yup.object({
  title: Yup.string().required(),
  location: Yup.string().required(),
  city: Yup.string().required(),
  zip_code: Yup.string().required(),
  venue_type: Yup.string().required(),
  details: Yup.string().required(),
  roster: Yup.string().required(),
  scheduled_at: Yup.string().required(),
  start_time: Yup.string().required(),
  end_time: Yup.string().required(),
  ticket_price: Yup.string(),
  ticket_amount: Yup.string().required(),
  assigned_pic: Yup.string(),
  pic_phone_no: Yup.string(),
  category: Yup.string().required(),
  discount_amount: Yup.string().required(),
  image_url: Yup.string().required(),
});
