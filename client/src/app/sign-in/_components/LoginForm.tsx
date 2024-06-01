"use client";
import { useAppDispatch } from "@/app/_libs/redux/hooks";
import { userLogin } from "@/app/_libs/redux/middlewares/auth.middleware";
import { plex_mono } from "@/app/_utils/fonts";
import { useFormik } from "formik";
import { FaKey } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import IconTextInput from "@/app/_components/icon.text.input";
import clsx from "clsx";
import { loginSchema } from "@/app/_libs/yup";

type Props = {};
export default function LoginForm({}: Props) {
  const dispatch = useAppDispatch();
  const initialValues: { email_username: string; password: string } = {
    email_username: "",
    password: "",
  };
  //Formik Login Setup
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          userLogin({
            email_username: values.email_username,
            password: values.password,
          }),
        );
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
      }
    },
  });
  const isFormEmpty: string =
    formik.values.email_username && formik.values.password;
  return (
    <form className="border border-black p-5" onSubmit={formik.handleSubmit}>
      <IconTextInput
        icon={<IoMail />}
        type="text"
        placeholder="Email/Username"
        name="email_username"
        value={formik.values.email_username}
        onChange={formik.handleChange}
        bottomLabel={formik.errors.email_username}
      />
      <IconTextInput
        icon={<FaKey />}
        type="password"
        placeholder="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        bottomLabel={formik.errors.password}
        autoComplete="on"
      />
      <button
        type="submit"
        className={clsx(
          plex_mono.className,
          "btn btn-accent btn-block rounded-none text-white disabled:btn-disabled hover:bg-neutral-800",
        )}
        disabled={isFormEmpty ? false : true}
      >
        Sign In
      </button>
    </form>
  );
}
