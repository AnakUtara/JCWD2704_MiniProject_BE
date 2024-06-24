import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { formatPrice } from "@/app/_utils/formatter";
import clsx from "clsx";
import { cookies } from "next/headers";
import Image from "next/image";
import { major_mono } from "@/app/_utils/fonts";
import UserAvatar from "@/app/_components/ui/user.avatar";
import dynamic from "next/dynamic";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { FaCalendar, FaLocationDot, FaMapPin } from "react-icons/fa6";

type Props = { params: { event_id: string } };
export default async function Transaction({ params }: Props) {
  const { event_id } = params;
  const cookie = cookies();
  const token = cookie.get("access_token");
  const res = await axiosInstance().get(`/events/${event_id}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const { data: event }: { data: TEvent } = res.data;
  const TransactionForm = dynamic(
    () => import("../_components/transaction.form"),
    {
      loading: () => (
        <span className="mt-2 grid h-[367px] w-full place-items-center">
          <span className="loading loading-bars"></span>
        </span>
      ),
      ssr: false,
    },
  );
  return (
    <div className="flex justify-center">
      <div className="prose">
        <h2
          className={clsx(
            major_mono.className,
            "my-0 mb-2 text-2xl sm:text-5xl",
          )}
        >
          Transaction Details:
        </h2>
        <div className="flex flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/events/${event.image_url}`}
            width={320}
            height={240}
            alt={`${event.title} image`}
            className="my-0 aspect-video w-full object-cover"
          />
          <h3 className="m-0">{event.title}</h3>
          <div className="flex items-center gap-2">
            <p className="m-0 text-xs">An event by:</p>
            <UserAvatar user={event.user} size="sm" />
            <p className="m-0 text-xs">{event.user.username}</p>
          </div>
          <div className="mb-2 flex items-center">
            <FaLocationDot />
            <p className="m-0 ml-2 text-xs">
              {event.location}, {event.city}, {event.zip_code}
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendar />
            <p className="m-0 ml-2 text-xs">
              {dateFormat(event.scheduled_at.toString(), monthDateYear)}
            </p>
          </div>
          <h5 className={clsx(!event.discount_amount && "hidden", "m-0 mt-3")}>
            {formatPrice(event.discountCalculation!)}{" "}
            <span className="badge badge-accent text-white">
              {event.discount_amount}% OFF!
            </span>
          </h5>
          <p
            className={clsx(
              event.discount_amount && "text-neutral-500 line-through",
              "m-0",
            )}
          >
            {!event.ticket_price ? "Free" : formatPrice(event.ticket_price!)}
          </p>
        </div>
        <TransactionForm data={event} />
      </div>
    </div>
  );
}
