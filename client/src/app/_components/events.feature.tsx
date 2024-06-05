"use client";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { axiosInstance } from "../_libs/axios.config";
import { imageUrl } from "../_utils/config";
import Image from "next/image";
import dayjs from "dayjs";
let localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default function EventFeatures() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(5);
  const [pages, setPages] = useState(1);

  const fetchData = async (queryParams: any) => {
    let { order, orderType, filterValue } = queryParams;
    order = "asc";
    orderType = "scheduled_at";
    filterValue = "Bandung";
    try {
      const res = await axiosInstance().get("/events/orders", {
        params: {
          order,
          orderType,
          filterValue,
          page: currentPage,
          limit: size,
        },
      });
      setData(res.data.result);
      setPages(res.data.total_page);
    } catch (error) {
      console.error(`Error in fetching data`, error);
      if (error instanceof Error) throw error;
    }
  };

  useEffect(() => {
    fetchData({});
  }, [currentPage, size]);

  return (
    <div className="container mt-4 w-full">
      <div className="rounded-md border-[1px] border-gray-400 p-4">
        <p className="mb-2 text-lg font-semibold">
          Upcoming events in Bandung!
        </p>
        <Carousel>
          {data.map((e: any) => (
            <div className="h-[35vh] w-full" key={e.id}>
              <Image
                src={imageUrl + "/events/" + e.image_url}
                alt="1"
                layout="fill"
                objectFit="cover"
                className="relative rounded-md"
              />
              <div className="absolute left-5 top-5">
                <p className=" bg-gray-600 bg-opacity-70 text-4xl text-white">
                  {e.title}
                </p>
                <p className="bg-gray-600 bg-opacity-70 text-white">
                  {e.location}
                </p>
              </div>
              <div className="absolute bottom-5 right-5">
                <p className="bg-gray-600 bg-opacity-70 text-lg text-white">
                  {dayjs(e.scheduled_at).format("LL")}
                </p>
                <p className="bg-gray-600 bg-opacity-70 text-sm text-white">
                  {dayjs(e.start_time).format("LT")} -
                  {dayjs(e.end_time).format("LT")}
                </p>
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="bg-gray-600 bg-opacity-70 text-sm text-white">
                  GUEST STAR :
                </p>
                <p className="bg-gray-600 bg-opacity-70 text-xl text-white">
                  {e.roster}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
