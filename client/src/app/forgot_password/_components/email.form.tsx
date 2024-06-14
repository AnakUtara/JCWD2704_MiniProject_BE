"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";
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
        toast.success("Reset password e-mail sent.");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        toast.error("Oops... We can't find you.");
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
        className="btn btn-accent rounded-none hover:bg-neutral-800"
        disabled={!formik.values.email || formik.isSubmitting ? true : false}
      >
        Submit
      </button>
    </form>
  );
}
