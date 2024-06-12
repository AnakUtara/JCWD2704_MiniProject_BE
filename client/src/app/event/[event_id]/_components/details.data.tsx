"use client";
import { TEvent } from "@/app/_models/event.model";
import { FaUser } from "react-icons/fa";

type Props = { data: TEvent };
export default function DetailTab({ data }: Props) {
  return (
    <div className="flex flex-col gap-6   md:flex-row">
      {/* event description */}
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className=" ">
          <p className="border-b-[1px] border-slate-500 bg-black text-lg font-normal text-white md:text-2xl">
            About {data.title}
          </p>
          <p className="p-4 text-sm">{data.details}</p>
        </div>
        <div className="flex items-center gap-2 bg-black p-2">
          <FaUser fill="white" />
          <p className="text-md  font-normal text-white md:text-sm">
            Organized by : {data.user.username}
          </p>
        </div>
      </div>

      {/* event description */}
      <div className="flex-1">
        <div className="md:mb-10">
          <p className=" bg-black text-lg font-normal text-white md:text-lg">
            Guest Performer :
          </p>
          {data.roster}
        </div>
        <div>
          <p className=" bg-black text-lg font-normal text-white md:text-lg">
            Event Category :
          </p>
          {data.category},{data.venue_type}
        </div>
        <div>
          <p className=" bg-black text-lg font-normal text-white md:text-lg">
            Event Location :
          </p>
          {data.city}, {data.location}
          <p>zip-code : {data.zip_code}</p>
        </div>
        <div>
          <p className=" bg-black text-lg font-normal text-white md:text-lg">
            Event PIC Info :
          </p>
          {data.assigned_pic ? data.assigned_pic : "no contact available"}
          <p>
            {data.assigned_pic && data.pic_phone_no ? data.pic_phone_no : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
