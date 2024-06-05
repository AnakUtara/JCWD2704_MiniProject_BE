// "use client";
import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = { eventId: TEvent };
export default async function EventDetails({ eventId }: Props) {
  // const [data, setData] = useState<any[]>([]);

  const fetchData = async (eventId: any) => {
    try {
      const res = await axiosInstance().get(`/events/${eventId}`);
      console.log("res data fetched:", res);
      const eventData = res.data.data;
    } catch (error) {
      console.error(`Error in fetching data`, error);
    }
  };
  fetchData(eventId);
  return (
    <div>
      <div>Event Details!</div>
    </div>
  );
}
