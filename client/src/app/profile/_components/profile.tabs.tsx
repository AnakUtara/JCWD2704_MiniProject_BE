"use client";

import { Datepicker, Flowbite, Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useRef } from "react";
import IconTextInput from "@/app/_components/icon.text.input";
import { FaAddressBook, FaPhone, FaUser } from "react-icons/fa";
import { useAppSelector } from "@/app/_libs/redux/hooks";
import { IoMail } from "react-icons/io5";
import { FaCreditCard, FaIdBadge } from "react-icons/fa6";
import { Gender, Role } from "@/app/_models/user.model";
import ProfileHeader from "./profile.head";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { editProfileSchema } from "@/app/_libs/yup";
import { axiosInstance } from "@/app/_libs/axios.config";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import clsx from "clsx";
import { tabsCustomTheme } from "@/app/_libs/flowbite.theme";
import { AxiosError } from "axios";

type Props = { children: React.ReactNode };
export default function ProfileTabs({ children }: Props) {
  const activeUser = useAppSelector((s) => s.auth);
  const formik = useFormik({
    initialValues: {
      avatar: activeUser.avatar ? activeUser.avatar : "",
      username: activeUser.username,
      fullname: activeUser.fullname,
      email: activeUser.email,
      phone_no: activeUser.phone_no,
      address: activeUser.address ? activeUser.address : "",
      bank_acc_no: activeUser.bank_acc_no ? activeUser.bank_acc_no : "",
      gender: activeUser.gender ? activeUser.gender : Gender.male,
      date_of_birth: activeUser.date_of_birth
        ? dateFormat(activeUser.date_of_birth, monthDateYear)
        : dateFormat(dayjs().subtract(17, "year").toString(), monthDateYear),
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance().patch(
          "/users",
          {
            ...values,
            date_of_birth: dayjs(values.date_of_birth),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
              "Content-type": "multipart/form-data",
            },
          },
        );
        toast.success("Profile edit submitted.");
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
          toast.error(error.response?.data.message);
        }
      }
    },
  });
  const avatarRef = useRef<HTMLInputElement>(null);
  function handleOpenFileInput() {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  }
  return (
    <div>
      <ProfileHeader activeUser={activeUser} onClick={handleOpenFileInput} />
      <Flowbite theme={{ theme: tabsCustomTheme }}>
        <Tabs aria-label="Tabs with underline" style="underline">
          <Tabs.Item active title="Profile" icon={HiUserCircle}>
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <input
                ref={avatarRef}
                type="file"
                name="avatar"
                hidden
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue(
                    "avatar",
                    e.target.files && e.target.files[0],
                    true,
                  )
                }
              />
              <label htmlFor="gender">
                Gender:
                <div>
                  <select
                    className="select select-bordered rounded-none"
                    name="gender"
                    id="gender"
                    defaultValue={formik.values.gender}
                    onChange={(e) =>
                      formik.setFieldValue("gender", e.target.value, true)
                    }
                  >
                    <option value={Gender.male}>Male</option>
                    <option value={Gender.female}>Female</option>
                  </select>
                  <div className="h-4">{formik.errors.gender}</div>
                </div>
              </label>
              <label>
                Date of birth:
                <Datepicker
                  minDate={dayjs().subtract(99, "years").toDate()}
                  maxDate={dayjs().subtract(17, "years").toDate()}
                  defaultDate={dayjs(formik.values.date_of_birth).toDate()}
                  onSelectedDateChanged={(date) =>
                    formik.setFieldValue(
                      "date_of_birth",
                      dateFormat(date.toDateString(), monthDateYear),
                      true,
                    )
                  }
                />
                <div className="h-4">{formik.errors.date_of_birth}</div>
              </label>
              <label>
                Username:
                <IconTextInput
                  icon={<FaUser />}
                  type="text"
                  placeholder={activeUser.username}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.username}
                />
              </label>
              <label>
                Full Name:
                <IconTextInput
                  icon={<FaIdBadge />}
                  type="text"
                  placeholder={activeUser.fullname}
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.fullname}
                />
              </label>
              <label>
                E-mail:
                <IconTextInput
                  icon={<IoMail />}
                  type="text"
                  placeholder={activeUser.email}
                  name="email"
                  inputMode="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.email}
                />
              </label>
              <label>
                Phone No.:
                <IconTextInput
                  icon={<FaPhone />}
                  type="text"
                  placeholder={activeUser.phone_no}
                  name="phone_no"
                  inputMode="tel"
                  value={formik.values.phone_no}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.phone_no}
                />
              </label>
              <label>
                Address:
                <IconTextInput
                  icon={<FaAddressBook />}
                  type="text"
                  placeholder={activeUser.address ? activeUser.address : ""}
                  name="address"
                  inputMode="numeric"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.address}
                />
              </label>
              <label>
                Bank Account No.:{" "}
                <span
                  className={clsx(
                    activeUser.role === Role.promotor && "hidden",
                    "text-xs text-zinc-500",
                  )}
                >
                  (Fill this & be a promotor!)
                </span>
                <IconTextInput
                  icon={<FaCreditCard />}
                  type="text"
                  placeholder={
                    activeUser.bank_acc_no ? activeUser.bank_acc_no : ""
                  }
                  name="bank_acc_no"
                  value={formik.values.bank_acc_no}
                  onChange={formik.handleChange}
                  bottomLabel={formik.errors.bank_acc_no}
                />
              </label>
              <button
                type="submit"
                className="btn btn-accent mt-6 rounded-none text-white hover:bg-zinc-800"
                disabled={formik.isSubmitting ? true : false}
              >
                Submit
              </button>
            </form>
          </Tabs.Item>
          <Tabs.Item title="Purchases" icon={MdDashboard}>
            {children}
          </Tabs.Item>
        </Tabs>
      </Flowbite>
    </div>
  );
}
