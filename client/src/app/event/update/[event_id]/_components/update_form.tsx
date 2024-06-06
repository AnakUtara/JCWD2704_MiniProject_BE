"use client";
import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { editEventSchema } from "@/app/_libs/yup";
import { TEvent } from "@/app/_models/event.model";
import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";

type Props = { result: TEvent };
export default function UpdateForm({ result }: Props) {
  const formik = useFormik({
    initialValues: {
      title: result.title,
      location: result.location,
    },
    validationSchema: editEventSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance().patch(`/events/${result.id}`);
        toast.success("New profile data updated!");
        window.location.reload();
      } catch (error) {
        if (error instanceof Error) console.error;
        toast.error("failed in updating event data");
      }
    },
  });

  const formData = [
    {
      name: "title",
      icon: <IoMail />,
      placeholder: result.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
    {
      name: "location",
      icon: <IoMail />,
      placeholder: result.location,
      value: formik.values.location,
      bl: formik.errors.location,
    },
    {
      name: "title",
      icon: <IoMail />,
      placeholder: result.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
    {
      name: "title",
      icon: <IoMail />,
      placeholder: result.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
    {
      name: "title",
      icon: <IoMail />,
      placeholder: result.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
    {
      name: "title",
      icon: <IoMail />,
      placeholder: result.title,
      value: formik.values.title,
      bl: formik.errors.title,
    },
  ];

  return (
    <div>
      <div>Update event: {result.title}</div>
      <form>
        <label htmlFor="title">
          Event title :
          <IconTextInput
            icon={<IoMail />}
            type="text"
            placeholder={result.title}
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            bottomLabel={formik.errors.title}
          />
        </label>
      </form>
    </div>
  );
}
