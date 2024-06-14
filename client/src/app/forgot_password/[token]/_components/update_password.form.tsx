"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa6";
import { toast } from "sonner";
import * as Yup from "yup";
import yp from "yup-password";
yp(Yup);

type Props = { token: string | undefined };
export default function UpdatePassword({ token }: Props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .trim()
        .min(8)
        .max(20)
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const password = values.password;
        await axiosInstance().patch(
          `users/v4`,
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Password successfully changed!");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
          toast.error(error.response?.data.message);
        }
        router.push("/");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <IconTextInput
        icon={<FaKey />}
        type="password"
        placeholder="Change Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        bottomLabel={formik.errors.password}
        disabled={formik.isSubmitting ? true : false}
      />
      <button
        type="submit"
        className="btn btn-accent rounded-none hover:bg-neutral-800"
        disabled={!formik.values.password || formik.isSubmitting ? true : false}
      >
        Submit
      </button>
    </form>
  );
}
