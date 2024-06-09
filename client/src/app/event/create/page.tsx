"use client";

import { useFormik } from "formik";

import dayjs from "dayjs";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { eventSchema } from "@/app/_libs/yup";
import { axiosInstance } from "@/app/_libs/axios.config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { imageUrl } from "@/app/_utils/config";
import { useRef } from "react";
import IconTextInput from "@/app/_components/icon.text.input";
import { IoMail } from "react-icons/io5";
import { Datepicker } from "flowbite-react";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { categoryData, discountOption } from "@/app/_utils/event.data";
import { Venue_type } from "@/app/_models/event.model";
import CreateForm from "./_components/create_form";
import dynamic from "next/dynamic";

type Props = {};
export default function CreateEvent() {
  const CreateForm = dynamic(() => import("./_components/create_form"), {
    loading: () => (
      <span className="grid min-h-[80dvh] w-full place-content-center">
        <span className="loading loading-bars"></span>
      </span>
    ),
    ssr: false,
  });
  return <CreateForm />;
}
