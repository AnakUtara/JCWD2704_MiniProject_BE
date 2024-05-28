"use client";
import IconTextInput from "@/app/_components/IconTextInput";
import { axiosInstance } from "@/app/_libs/axios.config";
import { registerSchema } from "@/app/_libs/yup";
import { initRegister } from "@/app/_models/user.model";
import { plex_mono } from "@/app/_utils/fonts";
import clsx from "clsx";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaIdBadge, FaIdCard, FaKey, FaPhone, FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiBankCard2Fill, RiCoupon3Fill } from "react-icons/ri";
import * as Yup from "yup";
import yp from "yup-password";
yp(Yup);

type Props = {};
export default function RegisterForm({}: Props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: initRegister,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance().post("/users/v2", {
          ...values,
        });
        alert("New user registered.");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
        alert("User might already exist.");
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={clsx(plex_mono.className, "border border-primary p-5")}
    >
      <IconTextInput
        icon={<IoMail />}
        type="text"
        placeholder="E-mail*"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
        bottomLabel={formik.errors.email}
      />
      <IconTextInput
        icon={<FaIdBadge />}
        type="text"
        placeholder="Username*"
        value={formik.values.username}
        onChange={formik.handleChange}
        name="username"
        bottomLabel={formik.errors.username}
      />
      <IconTextInput
        icon={<FaKey />}
        type="password"
        placeholder="Password*"
        value={formik.values.password}
        onChange={formik.handleChange}
        name="password"
        bottomLabel={formik.errors.password}
      />
      <IconTextInput
        icon={<FaUser />}
        type="text"
        placeholder="Full Name*"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        name="fullname"
        bottomLabel={formik.errors.fullname}
      />
      <IconTextInput
        icon={<FaIdCard />}
        type="text"
        placeholder="NIK*"
        value={formik.values.id_card}
        onChange={formik.handleChange}
        name="id_card"
        bottomLabel={formik.errors.id_card}
      />
      <IconTextInput
        icon={<FaPhone />}
        type="text"
        placeholder="Phone Number*"
        value={formik.values.phone_no}
        onChange={formik.handleChange}
        name="phone_no"
        bottomLabel={formik.errors.phone_no}
      />
      <div className="collapse collapse-plus mb-5 rounded-none bg-base-200 text-left">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Upgrade Your Membership!
        </div>
        <div className="collapse-content px-2">
          <IconTextInput
            icon={<RiCoupon3Fill />}
            type="text"
            placeholder="Referral Code"
            value={formik.values.reference_code}
            onChange={formik.handleChange}
            name="reference_code"
            bottomLabel={formik.errors.reference_code}
          />
          <h3 className={"self-start text-left text-xs font-normal"}>
            Immediately start selling tickets as a Promotor! Fill your bank
            account number below. (This field can be set later).
          </h3>
          <IconTextInput
            icon={<RiBankCard2Fill />}
            type="text"
            placeholder="Bank Account No."
            value={formik.values.bank_acc_no}
            onChange={formik.handleChange}
            name="bank_acc_no"
            bottomLabel={formik.errors.bank_acc_no}
          />
        </div>
      </div>
      <button
        className={clsx(
          plex_mono.className,
          "btn btn-primary btn-block rounded-none text-white",
        )}
        disabled={
          formik.values.username &&
          formik.values.email &&
          formik.values.fullname &&
          formik.values.password &&
          formik.values.phone_no &&
          formik.values.id_card
            ? false
            : true
        }
      >
        Register
      </button>
    </form>
  );
}
