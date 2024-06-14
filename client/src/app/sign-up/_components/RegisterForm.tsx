"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { accordionCustomTheme } from "@/app/_libs/flowbite.theme";
import { registerSchema } from "@/app/_libs/yup";
import { initRegister } from "@/app/_models/user.model";
import { plex_mono } from "@/app/_utils/fonts";
import { AxiosError } from "axios";
import clsx from "clsx";
import { Accordion, Flowbite } from "flowbite-react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaIdBadge, FaIdCard, FaKey, FaPhone, FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiBankCard2Fill, RiCoupon3Fill } from "react-icons/ri";
import { toast } from "sonner";
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
      if (!Object.values(values) || Object.values(values).length < 6)
        return toast.error("Please fill all required fields.");
      try {
        await axiosInstance().post("/users/v2", {
          ...values,
        });
        toast.success("New user registered.");
        formik.resetForm();
        router.push("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
          toast.error(error.response?.data.message);
        }
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={clsx(plex_mono.className, "border border-black p-5")}
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
      <Flowbite theme={{ theme: accordionCustomTheme }}>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>Upgrade Your Membership!</Accordion.Title>
            <Accordion.Content>
              <h3 className={"self-start text-left text-xs font-normal"}>
                Tell us who refer you to this site & grab your one time use 10%
                off voucher. Applicable for all events.
              </h3>
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
                Start selling your own event tickets immediately! Fill your bank
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
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Flowbite>
      <button
        className={clsx(
          plex_mono.className,
          "btn btn-accent btn-block mt-5 rounded-none text-white hover:bg-neutral-800",
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
