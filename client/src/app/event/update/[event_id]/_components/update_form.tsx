"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { editEventSchema } from "@/app/_libs/yup";
import { TEvent, Venue_type } from "@/app/_models/event.model";
import dayjs from "dayjs";
import { Datepicker, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useRef } from "react";
import { getCookie } from "cookies-next";
import { imageUrl } from "@/app/_utils/config";
import Image from "next/image";
import { categoryData, discountOption } from "@/app/_utils/event.data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEventSeat, MdOutlineDescription, MdTitle } from "react-icons/md";
import { FaLocationDot, FaPerson, FaPersonDress } from "react-icons/fa6";
import { FaCity, FaDollarSign, FaPhone } from "react-icons/fa";

dayjs.extend(localizedFormat);

type Props = { result: TEvent };
export default function UpdateForm({ result }: Props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      image: null,
      title: result.title,
      location: result.location,
      city: result.city,
      zip_code: result.zip_code,
      venue_type: result.venue_type,
      details: result.details,
      roster: result.roster,
      scheduled_at: dateFormat(String(result.scheduled_at), monthDateYear),
      start_time: dayjs(result.start_time),
      end_time: dayjs(result.end_time),
      ticket_price: result.ticket_price,
      ticket_amount: result.ticket_amount,
      assigned_pic: result.assigned_pic,
      pic_phone_no: result.pic_phone_no,
      category: result.category,
      discount_amount: String(result.discount_amount),
    },
    validationSchema: editEventSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance().patch(
          `/events/${result.id}`,
          {
            ...values,
            scheduled_at: dayjs(values.scheduled_at).toDate(),
            start_time: dayjs(values.start_time).toDate(),
            end_time: dayjs(values.end_time).toDate(),
            zip_code: Number(values.zip_code),
            discount_amount: Number(values.discount_amount),
            ticket_amount: Number(values.ticket_amount),
            ticket_price: Number(values.ticket_price),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
              "content-type": "multipart/form-data",
            },
          },
        );
        console.log(values.scheduled_at);
        toast.success("Event data updated!");
        router.push(`/event/${result.id}`);
      } catch (error) {
        if (error instanceof Error) console.error;
        toast.error("failed in updating event data");
      }
    },
  });

  const eventRef = useRef<HTMLInputElement>(null);
  function handleOpenFileinput() {
    if (eventRef.current) {
      eventRef.current.click();
    }
  }

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const formData = [
    {
      label: "Event title :",
      name: "title",
      icon: <MdTitle />,
      placeholder: formik.initialValues.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
    {
      label: "Event Location/ Venue :",
      name: "location",
      icon: <FaLocationDot />,
      placeholder: formik.initialValues.location,
      value: formik.values.location,
      bl: formik.errors.location,
    },
    {
      label: "City :",
      name: "city",
      icon: <FaCity />,
      placeholder: formik.initialValues.city,
      value: formik.values.city,
      bl: formik.errors.city,
    },
    {
      label: "Zip-code :",
      name: "zip_code",
      icon: <IoMail />,
      placeholder: formik.initialValues.zip_code,
      value: formik.values.zip_code,
      bl: formik.errors.zip_code,
    },
    {
      label: "Event Description :",
      name: "details",
      icon: <MdOutlineDescription />,
      placeholder: formik.initialValues.details,
      value: formik.values.details,
      bl: formik.errors.details,
    },
    {
      label: "Event Performer :",
      name: "roster",
      icon: <FaPersonDress />,
      placeholder: formik.initialValues.roster,
      value: formik.values.roster,
      bl: formik.errors.roster,
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="bg-slate-900 text-5xl font-bold text-white">
          Update event .
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className=" w-full flex-1">
              <div className="relative m-4 mr-10 h-[80%]">
                <Image
                  src={
                    formik.values.image
                      ? window.URL.createObjectURL(formik.values.image)
                      : imageUrl + "/events/" + result.image_url
                  }
                  alt="1"
                  fill={true}
                  sizes="100%"
                  className="rounded-md object-cover"
                />
              </div>

              <input
                ref={eventRef}
                type="file"
                name="image_url"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue(
                    "image",
                    e.target.files && e.target.files[0],
                    true,
                  )
                }
              />
            </div>
            <div className="w-full flex-1">
              {formData.map((e: any) => (
                <label htmlFor={e.name}>
                  <p className="font-semibold"> {e.label}</p>
                  <IconTextInput
                    icon={e.icon}
                    type="text"
                    placeholder={e.placeholder}
                    name={e.name}
                    value={e.value}
                    onChange={formik.handleChange}
                    bottomLabel={e.bl}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col justify-center gap-2 bg-slate-200  md:flex-row md:items-center md:pb-4">
            <label htmlFor="scheduled_at" className="flex-[2] font-semibold">
              Event schedule :
              <Datepicker
                className="w-full "
                id="scheduled_at"
                value={formik.values.scheduled_at}
                minDate={new Date()}
                onSelectedDateChanged={(date) =>
                  formik.setFieldValue(
                    "scheduled_at",
                    dateFormat(date.toDateString(), monthDateYear),
                    true,
                  )
                }
              />
            </label>
            <label
              htmlFor="start_time"
              className="flex flex-1 flex-col gap-2 font-semibold"
            >
              {" "}
              Event starts at :
              <TimePicker
                className="w-full"
                name="start_time"
                defaultValue={dayjs(formik.values.start_time)}
                onChange={(value: any) => {
                  formik.setFieldValue("start_time", dayjs(value.toString()));
                }}
              />
            </label>
            <label
              htmlFor="end_time"
              className="flex  flex-1 flex-col gap-2 font-semibold"
            >
              {" "}
              Event closes at :
              <TimePicker
                className="w-full"
                defaultValue={dayjs(formik.values.end_time)}
                minTime={formik.values.start_time}
                onChange={(value: any) => {
                  formik.setFieldValue("end_time", dayjs(value.toString()));
                }}
              />
            </label>
          </div>
          <div className="mt-10 flex flex-col   bg-slate-200 md:flex-row md:gap-10">
            <div className="w-full flex-1 font-semibold">
              Event ticket price (IDR) :
              <IconTextInput
                icon={<FaDollarSign />}
                placeholder={String(result.ticket_price)}
                name="ticket_price"
                value={formik.values.ticket_price}
                onChange={formik.handleChange}
                bottomLabel={formik.errors.ticket_price}
              />
            </div>
            <div className="w-full flex-1 font-semibold">
              Event Capacity :
              <IconTextInput
                icon={<MdEventSeat />}
                placeholder={String(result.ticket_amount)}
                name="ticket_amount"
                value={formik.values.ticket_amount}
                onChange={formik.handleChange}
                bottomLabel={formik.errors.ticket_amount}
              />
            </div>
            <div className="w-full flex-[0.5] font-semibold">
              Add discount?
              <select
                className="select select-bordered flex w-full flex-col rounded-none font-normal"
                name="discount_amount"
                id="discount_amount"
                defaultValue={formik.values.discount_amount}
                disabled={formik.values.ticket_price == 0}
                onChange={(e) =>
                  formik.setFieldValue("discount_amount", e.target.value, true)
                }
              >
                {discountOption.map((o) => (
                  <option key={o.name} value={o.value}>
                    {o.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex-1 font-semibold">
              <p className="text-slate-500">
                Your final ticket price (before voucher) :
              </p>
              <input
                name="discountCalculation"
                type="text"
                placeholder={(
                  formik.values.ticket_price! -
                  (Number(formik.values.discount_amount) / 100) *
                    formik.values.ticket_price!
                ).toString()}
                disabled
                className="w-[90%]"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-row gap-3 md:gap-10">
            <label htmlFor="venue_type" className="flex-1 font-semibold">
              Venue type :
              <select
                className="select select-bordered flex w-full flex-col rounded-none font-normal"
                name="venue_type"
                id="venue_type"
                defaultValue={formik.values.venue_type}
                onChange={(e) =>
                  formik.setFieldValue("venue_type", e.target.value, true)
                }
              >
                <option value={Venue_type.indoor}>Indoor</option>
                <option value={Venue_type.outdoor}>Outdoor</option>
              </select>
            </label>
            <label htmlFor="category" className="flex-1 font-semibold">
              Gig Genre :
              <select
                className="select select-bordered flex w-full flex-col rounded-none font-normal"
                name="category"
                id="category"
                defaultValue={formik.values.category}
                onChange={(e) =>
                  formik.setFieldValue("category", e.target.value, true)
                }
              >
                {categoryData.map((c) => (
                  <option key={c.name} value={c.value}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-10 flex flex-col   bg-slate-200 md:flex-row md:gap-10">
            <label htmlFor="assigned_pic" className="w-full flex-1 ">
              <p className="font-semibold">Event PIC :</p>
              <IconTextInput
                icon={<FaPerson />}
                name="assigned_pic"
                placeholder={
                  formik.values.assigned_pic
                    ? formik.values.assigned_pic
                    : "Add PIC name"
                }
                onChange={formik.handleChange}
                bottomLabel={formik.errors.assigned_pic}
              />
            </label>
            <label htmlFor="pic_phone_no" className="w-full flex-1 ">
              <p className="font-semibold">PIC Contacts :</p>
              <IconTextInput
                icon={<FaPhone />}
                name="pic_phone_no"
                placeholder={
                  formik.values.pic_phone_no
                    ? formik.values.pic_phone_no
                    : "Add PIC Number"
                }
                onChange={formik.handleChange}
                bottomLabel={formik.errors.pic_phone_no}
              />
            </label>
          </div>
          <div className="flex flex-row gap-4">
            <button
              type="submit"
              className="btn btn-accent mt-6 rounded-none text-white hover:bg-zinc-800"
              disabled={formik.isSubmitting ? true : false}
            >
              {formik.isSubmitting ? <Spinner></Spinner> : "Update Event"}
            </button>
            <Link href={`/event/${result.id}`}>
              <button
                type="button"
                className="btn btn-accent mt-6 rounded-none text-white hover:bg-zinc-800"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
}
