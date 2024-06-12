import { axiosInstance } from "@/app/_libs/axios.config";
import { dateFormat, hourOnly, monthDateYear } from "@/app/_libs/dayjs";
import { TEvent } from "@/app/_models/event.model";
import { imageUrl } from "@/app/_utils/config";
import { formatPrice } from "@/app/_utils/formatter";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type Props = { params: { event_id: string } };
export default async function EventDetails({ params }: Props) {
  const { event_id } = params;
  const res = await axiosInstance().get(`/events/${event_id}`, {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });
  const { data }: { data: TEvent } = await res.data;

  return (
    <div className=" w-full">
      <div className="gap-6 md:flex md:flex-row">
        <div className="relative h-[130px] w-full md:h-[89vh] md:w-[70%]">
          <Image
            src={imageUrl + "/events/" + data.image_url}
            alt="1"
            fill={true}
            priority
            className=" rounded-md object-cover"
          />
          <div className="absolute left-5 top-5 bg-slate-600 bg-opacity-50 text-4xl text-white">
            {data.title}
          </div>
        </div>
        {/* detail content */}
        <div className=" mt-4 flex flex-col gap-4 md:mt-0 md:w-[60%] md:gap-6">
          <div className="relative w-full rounded-md border-[1px] border-slate-500 p-2 ">
            <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-2xl">
              Event Description :
            </p>
            {data.details}
            <div className="flex justify-end ">
              <Link href={`/event/update/${data.id}`}>
                <button className="btn btn-accent mt-6  rounded-none text-white hover:bg-zinc-800">
                  Edit event
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className=" flex w-full flex-col gap-2 rounded-md border-[1px] border-slate-500 p-2 md:gap-4">
              <div className="md:mb-10">
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Guest Performer :
                </p>
                {data.roster}
              </div>
              <div>
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Event Category :
                </p>
                {data.category},{data.venue_type}
              </div>
              <div>
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Event Location :
                </p>
                {data.city}, {data.location}
                <p>zip-code : {data.zip_code}</p>
              </div>
              <div>
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Event PIC Info :
                </p>
                {data.assigned_pic ? data.assigned_pic : "no contact available"}
                <p>
                  {data.assigned_pic && data.pic_phone_no
                    ? data.pic_phone_no
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-md border-[1px] border-slate-500 p-2">
              <div className="">
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Entry price :
                </p>
                <div className="mt-2 flex items-center">
                  <p className="font-semibold">
                    {typeof data.ticket_price === "number" &&
                    data.ticket_price !== 0
                      ? data.discountCalculation
                        ? formatPrice(data.discountCalculation)
                        : formatPrice(data.ticket_price)
                      : "Free event!"}
                  </p>{" "}
                  {data.discountCalculation ? (
                    <div className="ml-6  bg-black p-[2px]">
                      <p className="text-white">{data.discount_amount}% OFF!</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>{" "}
                {data.discountCalculation ? (
                  <p className="text-slate-400 line-through">
                    {typeof data.ticket_price === "number"
                      ? formatPrice(data.ticket_price)
                      : ""}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Event Schedule :
                </p>{" "}
                {dateFormat(data.scheduled_at.toString(), monthDateYear)}
                <p>
                  ({dateFormat(data.start_time.toString(), hourOnly)} -{" "}
                  {dateFormat(data.end_time.toString(), hourOnly)})
                </p>
              </div>
              <div>
                <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-lg">
                  Seats capacity :
                </p>{" "}
                {data.ticket_amount}
              </div>
              {data.status === "published" ? (
                <Link href={`/`}>
                  <button
                    type="button"
                    className="btn btn-accent btn-block mb-2 rounded-none text-white hover:bg-zinc-800"
                  >
                    Order Ticket
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-accent mb-2 rounded-none text-white hover:bg-zinc-800"
                  disabled
                >
                  Not available
                </button>
              )}
            </div>
          </div>
          <div className="h-full w-full rounded-md border-[1px] border-slate-500 p-2">
            <p className="border-b-[1px] border-slate-500 bg-slate-500 text-lg font-normal text-white md:text-2xl">
              {" "}
              Event Reviews :
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
