import { axiosInstance } from "@/app/_libs/axios.config";
import { useAppSelector } from "@/app/_libs/redux/hooks";
import { TEvent } from "@/app/_models/event.model";
import { useFormik } from "formik";
import UpdateForm from "./_components/update_form";
import dynamic from "next/dynamic";
import DeleteEvent from "./_components/delete_event";

type Props = { params: { event_id: string } };
export default async function UpdateEvent({ params }: Props) {
  const UpdateForm = dynamic(() => import("./_components/update_form"), {
    loading: () => (
      <span className="grid min-h-[80dvh] w-full place-content-center">
        <span className="loading loading-bars"></span>
      </span>
    ),
    ssr: false,
  });
  const { event_id } = params;
  const res = await axiosInstance().get(`/events/${event_id}`);
  const { data }: { data: TEvent } = await res.data;

  return (
    <div className="container mx-auto">
      <UpdateForm result={data} />
      <DeleteEvent result={data} />
    </div>
  );
}
