import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { formatPrice } from "@/app/_utils/formatter";
import clsx from "clsx";
import { cookies } from "next/headers";
import Image from "next/image";
import TransactionForm from "../_components/transaction.form";
import { major_mono } from "@/app/_utils/fonts";

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
  return (
    <div className="flex justify-center">
      <div className="prose">
        <h2 className={clsx(major_mono.className, "text-2xl sm:text-5xl")}>
          Transaction Details:
        </h2>
        <div className="flex items-start gap-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/events/${event.image_url}`}
            width={320}
            height={240}
            alt={`${event.title} image`}
            className="my-0 aspect-square w-28 object-cover md:aspect-video md:w-40"
          />
          <div>
            <h3 className="m-0">{event.title}</h3>
            <p className="m-0 text-xs">An event by: {event.user.username}</p>
            <h5 className={clsx(!event.discount_amount && "hidden", "m-0")}>
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
              {formatPrice(event.ticket_price!)}
            </p>
          </div>
        </div>
        <TransactionForm data={event} />
      </div>
    </div>
  );
}
