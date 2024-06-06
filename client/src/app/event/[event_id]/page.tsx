import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";

type Props = { params: { event_id: string } };
export default async function EventDetails({ params }: Props) {
  const { event_id } = params;
  const res = await axiosInstance().get(`/events/${event_id}`);
  // console.log("res data fetched:", res);
  const { data }: { data: TEvent } = await res.data;
  return (
    <div>
      <div>{data.title}</div>
    </div>
  );
}
