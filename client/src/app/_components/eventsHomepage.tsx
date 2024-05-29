"use client";
import { useState } from "react";
import Image from "next/image";
import { axiosInstance } from "../_libs/axios.config";
import { post_url } from "../_utils/config";

const EventHomepage = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (queryParams: any) => {
    // console.log("from fetchdata", queryParams);
    try {
      const res = await axiosInstance().get("/events/orders", {
        params: queryParams,
      });
      console.log(res.data.data[0]);
      return setData(res.data.data);
    } catch (error) {
      console.error(`Error in fetching data`, error);
    }
  };

  const handleFormFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
    const { orderType, order, filterValue } = e.currentTarget.elements as any;
    const queryParams = {
      orderType: orderType.value,
      order: order.value,
      filterValue: filterValue.value,
    };
    const result = await fetchData(queryParams);
  };

  const orderTypes = [
    { value: "title", name: "By Title" },
    { value: "scheduled_at", name: "By Date" },
    { value: "ticket_amount", name: "By Capacity" },
    { value: "ticket_price", name: "By Price" },
  ];
  // const filterTypes = [
  //   { value: "title", name: "Event Title" },
  //   { value: "roster", name: "Guest star or Band" },
  //   { value: "city", name: "City" },
  // ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dates: string) => {
    const date = new Date(dates);
    return date.toLocaleDateString();
  };

  return (
    <div className="container">
      <div className="my-[4vh] w-full rounded-lg bg-slate-700 p-4">
        <form onSubmit={handleFormFilter} className="flex justify-center gap-8">
          <div>
            <p className="pb-2 font-semibold">Order :</p>
            <select
              name="orderType"
              className="rounded-md border bg-slate-500 p-2"
            >
              {orderTypes.map((o) => (
                <option key={o.value} value={o.value} className="">
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="pb-2 font-semibold">From :</p>
            <select name="order" className="rounded-md border bg-slate-500 p-2">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <p className="pb-2 font-semibold">Search your Event :</p>
            <input
              name="filterValue"
              type="text"
              placeholder="Type your criteria!"
              className="w-[90vh] rounded-md border bg-slate-200 p-[6px] text-black"
            />
          </div>
          <button type="submit" className="rounded-md border bg-slate-500 p-2">
            Apply filter!
          </button>
        </form>
      </div>
      <div className="my-[4vh] flex w-full gap-6 rounded-lg bg-slate-700 p-4">
        {data.map((event: any) => {
          return (
            <div key={event.id} className=" w-full rounded-lg bg-slate-600 ">
              <div className=" relative h-[130px] w-full">
                <Image
                  src={post_url + event.event_image[0]}
                  alt="1"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <p className="">title: {event.title}</p>
                <p>price: {formatPrice(event.price)}</p>
                <p>City: {event.city}</p>
                <p>Capacity: {event.capacity}</p>
                <p>Date: {formatDate(event.scheduled_at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventHomepage;
