"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa6";
import * as Yup from "yup";
import yp from "yup-password";
yp(Yup);

type Props = { token: string };
export default function UpdatePassword({ token }: Props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .trim()
        .min(8)
        .max(20)
        .minUppercase(1)
        .minNumbers(1)
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const password = values.password;
        await axiosInstance().patch(`users/v5/${token}`, {
          password,
        });
        alert("Password successfully changed!");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        alert("Unauthorized access.");
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
        className="btn btn-primary rounded-none"
        disabled={!formik.values.password ? true : false}
      >
        Submit
      </button>
      <button
        className="btn btn-outline btn-primary ml-2 rounded-none"
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
        disabled={!formik.values.password ? true : false}
      >
        Cance{" "}
      </button>
    </form>
  );
}
