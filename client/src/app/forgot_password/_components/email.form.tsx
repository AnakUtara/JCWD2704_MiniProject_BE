"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoMail } from "react-icons/io5";
import * as Yup from "yup";

type Props = {};
export default function EmailForm({}: Props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().trim().lowercase().email().required(),
    }),

    onSubmit: async (values) => {
      try {
        const email = values.email;
        await axiosInstance().post("users/v4", {
          email,
        });
        alert("Your change password email has been sent!");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        alert("Oops... We can't find you.");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <IconTextInput
        icon={<IoMail />}
        type="text"
        placeholder="E-mail"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        bottomLabel={formik.errors.email}
        disabled={formik.isSubmitting ? true : false}
      />
      <button
        type="submit"
        className="btn btn-primary rounded-none"
        disabled={!formik.values.email ? true : false}
      >
        Submit
      </button>
      <button
        className="btn btn-outline btn-primary ml-2 rounded-none"
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        Cancel
      </button>
    </form>
  );
}
