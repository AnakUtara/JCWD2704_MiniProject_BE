import EventsCarousel from "./_components/events.carousel";
import SearchForm from "./_components/events.search";
import { axiosInstance } from "./_libs/axios.config";
import { TEvent } from "./_models/event.model";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default async function Home() {
  const res = await axiosInstance().get("/events/orders", {
    params: {
      order: "asc",
      orderType: "scheduled_at",
      filterValue: "Bandung",
      page: "1",
      limit: "4",
    },
  });
  const { data}: { data: TEvent[] } = res.data;

  return (
    <div className="flex justify-center">
      <div className="container">
        <EventsCarousel data={data} />
        <SearchForm />
      </div>
    </div>
  );
}
