import clsx from "clsx";
import EventsCarousel from "./_components/events.carousel";
import SearchForm from "./_components/events.search";
import { axiosInstance } from "./_libs/axios.config";
import { TEvent } from "./_models/event.model";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { major_mono } from "./_utils/fonts";
dayjs.extend(localizedFormat);

export default async function Home() {
  const res = await axiosInstance().get("/events/orders", {
    params: {
      order: "asc",
      orderType: "scheduled_at",
      filterValue: "",
      page: "1",
      limit: "7",
      status: "published",
    },
  });
  const { data }: { data: TEvent[] } = res.data;

  return (
    <div className="flex justify-center">
      <div className="container">
        <div>
          <div className="mb-4">
            <span
              className={clsx(
                major_mono.className,
                "self-center border-b-[2px] text-4xl font-semibold dark:text-white",
              )}
            >
              Event in the nearest time!
            </span>
          </div>

          <EventsCarousel data={data} />
        </div>
        <div className="mt-8">
          <span
            className={clsx(
              major_mono.className,
              "self-center border-b-[2px] text-4xl font-semibold dark:text-white",
            )}
          >
            Choose event that u want to visit!
          </span>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
