import { TEvent } from "../_models/event.model";
import Image from "next/image";
import { imageUrl } from "../_utils/config";
import dayjs from "dayjs";
import { Carousel } from "flowbite-react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
dayjs.extend(localizedFormat);

type Props = { data: TEvent[] };

export default function EventsCarousel({ data }: Props) {
  return (
    <div className="h-[400px]">
      <Carousel slideInterval={5000}>
        {data.map((e: TEvent) => (
          <Link
            href={`/event/${e.id}`}
            className="relative size-full"
            key={e.id}
          >
            <Image
              src={imageUrl + "/events/" + e.image_url}
              alt={`${e.title} image`}
              layout="fill"
              objectFit="cover"
              priority
              className="size-full "
            />
            <div className="absolute left-5 top-5">
              <p className=" bg-gray-600 bg-opacity-70 text-xl text-white md:text-4xl">
                {e.title}
              </p>
              <p className="bg-gray-600 bg-opacity-70 text-xs text-white md:text-base">
                {e.location}
              </p>
            </div>
            <div className="absolute bottom-5 right-5 hidden md:block">
              <p className="bg-gray-600 bg-opacity-70 text-sm text-white md:text-lg">
                {dayjs(e.scheduled_at).format("LL")}
              </p>
              <p className="bg-gray-600 bg-opacity-70 text-xs text-white md:text-sm">
                {dayjs(e.start_time).format("LT")} -
                {dayjs(e.end_time).format("LT")}
              </p>
            </div>
            <div className="absolute bottom-5 left-5">
              <p className="bg-gray-600 bg-opacity-70 text-xs text-white md:text-sm">
                GUEST STAR :
              </p>
              <p className="bg-gray-600 bg-opacity-70 text-sm text-white md:text-xl">
                {e.roster}
              </p>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
