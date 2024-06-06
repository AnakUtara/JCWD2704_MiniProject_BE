import { axiosInstance } from "@/app/_libs/axios.config";
import { useAppSelector } from "@/app/_libs/redux/hooks";
import { TEvent } from "@/app/_models/event.model";
import { useFormik } from "formik";
import UpdateForm from "./_components/update_form";

type Props = { params: { event_id: string } };
export default async function UpdateEvent({ params }: Props) {
  const { event_id } = params;

  const res = await axiosInstance().get(`/events/${event_id}`);
  const { data }: { data: TEvent } = await res.data;

  

  return <UpdateForm result={data} />;
}
