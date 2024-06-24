"use client";
import { dateFormat, hourOnly, monthDateYear } from "@/app/_libs/dayjs";
import { useAppSelector } from "@/app/_libs/redux/hooks";
import { TEvent } from "@/app/_models/event.model";
import { formatPrice } from "@/app/_utils/formatter";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = { data: TEvent };
export default function OrderTab({ data }: Props) {
  const activeUser = useAppSelector((s) => s.auth);
  const router = useRouter();
  return (
    <>
      <div className="">
        <p className=" bg-black text-lg font-normal text-white md:text-lg">
          Entry price :
        </p>
        <div className="mt-2 flex items-center">
          <p className="font-semibold">
            {typeof data.ticket_price === "number" && data.ticket_price !== 0
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
        <p className=" bg-black text-lg font-normal text-white md:text-lg">
          Event Schedule :
        </p>{" "}
        {dateFormat(data.scheduled_at.toString(), monthDateYear)}
        <p>
          ({dateFormat(data.start_time.toString(), hourOnly)} -{" "}
          {dateFormat(data.end_time.toString(), hourOnly)})
        </p>
      </div>
      <div>
        <p className=" bg-black text-lg font-normal text-white md:text-lg">
          Seats capacity :
        </p>{" "}
        {data.ticket_amount}
      </div>
      <button
        type="button"
        className="btn btn-accent btn-block mb-2 rounded-none text-white hover:bg-zinc-800"
        disabled={!activeUser.is_verified && data.ticket_price ? true : false}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/transaction/${data.id}`);
        }}
      >
        {data.status === "published" ? "Order Ticket" : "Not available"}
      </button>
    </>
  );
}
