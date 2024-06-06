import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { imageUrl } from "@/app/_utils/config";
import Image from "next/image";
import Link from "next/link";

type Props = { params: { event_id: string } };
export default async function EventDetails({ params }: Props) {
  const { event_id } = params;
  const res = await axiosInstance().get(`/events/${event_id}`);
  const { data }: { data: TEvent } = await res.data;
  return (
    <div className=" w-full">
      <div className="">
        <div className="relative h-[130px] w-full">
          <Image
            src={imageUrl + "/events/" + data.image_url}
            alt="1"
            fill={true}
            className=" rounded-md object-cover"
          />
        </div>
        <div className="text-4xl">{data.title}</div>
      </div>
      <div>
        <Link href={`/event/update/${data.id}`}>
          <button className="w-[100px] rounded-md border-[1px] border-gray-500 p-2 hover:bg-slate-300">
            Edit event
          </button>
        </Link>
      </div>
    </div>
  );
}
