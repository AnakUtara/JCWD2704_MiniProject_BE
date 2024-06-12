"use client";
import { TEvent } from "@/app/_models/event.model";

type Props = { data: TEvent };
export default async function Details({ data }: Props) {
  return (
    <div className="h-full bg-red-400">
      <div>
        <p className="border-b-[1px] border-slate-500 bg-black text-lg font-normal text-white md:text-2xl">
          Event Description :
        </p>
        {data.details}
        <div className="flex justify-end ">
          <div>{data.user.username}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
