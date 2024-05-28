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
