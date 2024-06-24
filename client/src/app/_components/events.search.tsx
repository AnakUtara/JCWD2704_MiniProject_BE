"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { axiosInstance } from "../_libs/axios.config";
import { imageUrl } from "../_utils/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatDate, formatPrice } from "../_utils/formatter";
import { orderType } from "../_models/event.model";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export default function SearchForm() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pages, setPages] = useState(1);

  const fetchData = async (queryParams: any) => {
    try {
      const res = await axiosInstance().get("/events/orders", {
        params: { ...queryParams, page: currentPage, limit: size },
      });
      setData(res.data.data);
      setPages(res.data.total_page);
    } catch (error) {
      console.error(`Error in fetching data`, error);
      if (error instanceof Error) throw error;
    }
  };

  const debouncedData = useDebouncedCallback((values) => {
    fetchData(values);
  }, 400);

  const formik = useFormik({
    initialValues: { orderType: "title", order: "asc", filterValue: "" },
    validationSchema: Yup.object({
      orderType: Yup.string().required(),
      order: Yup.string().required(),
      filterValue: Yup.string().lowercase(),
    }),
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pages) setCurrentPage(newPage);
    fetchData(formik.values);
  };

  useEffect(() => {
    debouncedData(formik.values);
  }, [currentPage, size, formik.values]);

  return (
    <div className="container">
      <div className=" mb-[4vh] mt-4 w-full rounded-md border-[1px] border-gray-400 p-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-8 md:flex-row"
        >
          <div className="w-full md:w-auto">
            <p className="pb-2 font-semibold">Filter :</p>
            <select
              id="orderType"
              name="orderType"
              className="w-full rounded-md border p-2 hover:bg-slate-300"
              onChange={(e) =>
                formik.setFieldValue("orderType", e.target.value)
              }
              value={formik.values.orderType}
            >
              {orderType.map((o) => (
                <option key={o.value} value={o.value} className="">
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <p className="pb-2 font-semibold">Order :</p>
            <select
              id="order"
              name="order"
              onChange={formik.handleChange}
              value={formik.values.order}
              className="w-full rounded-md border p-2 hover:bg-slate-300"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="w-full flex-1 md:w-auto">
            <p className="pb-2 font-semibold">Search your Event :</p>
            <input
              name="filterValue"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.filterValue}
              placeholder="Type event, city, bands..."
              className="w-full rounded-md border bg-slate-200 p-[6px] text-black"
            />
          </div>
        </form>
      </div>
      <div className="my-[4vh] grid w-full grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {data.map((event: any) => {
          // console.log(event.id);
          return (
            <Link key={event.id} href={`/event/${event.id}`}>
              <div className=" w-full rounded-md border-[1px] border-gray-400 transition-transform duration-200 hover:scale-105">
                <div className={``}>
                  <div className=" relative h-[130px] w-full">
                    <Image
                      src={imageUrl + "/events/" + event.image_url}
                      alt="1"
                      // width={100}
                      // height={100}
                      fill={true}
                      sizes="100%"
                      className="rounded-t-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between px-4 pt-2">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
                      {event.title}
                    </p>
                    <div className="mb-2 text-sm">
                      <div className="flex justify-between">
                        <p
                          className={`${event.discountCalculation !== 0 ? "text-gray-400 line-through" : "font-semibold"}`}
                        >
                          {event.ticket_price !== 0
                            ? formatPrice(event.ticket_price)
                            : "Free Event"}
                        </p>
                        {event.discountCalculation !== 0 ? (
                          <div className=" flex items-center justify-between gap-3 rounded-md bg-[#80d1a8] px-2">
                            <p className="text-[10px] font-semibold text-[#4f6853]">
                              Disc. {event.discount_amount}%
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex min-h-[20px] items-center">
                        <p className=" font-semibold">
                          {event.discountCalculation
                            ? formatPrice(event.discountCalculation)
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2 text-sm">
                        <div className="flex">
                          <p className="whitespace-nowrap text-xs">
                            Available seats:
                          </p>
                          {event.ticket_amount == 0 ? (
                            <p className="ml-2 whitespace-nowrap text-xs font-semibold text-blue-800">
                              Fully booked.
                            </p>
                          ) : (
                            <p className="ml-2 font-medium">
                              {event.ticket_amount}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-xs">
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap">{`${event.city}, ${event.location}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-row justify-center gap-10">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-[100px] rounded-md border-[1px] border-gray-500 p-2 hover:bg-slate-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          page {currentPage} of {pages}
        </p>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-[100px] rounded-md border-[1px] border-gray-500 p-2 hover:bg-slate-300"
          disabled={currentPage === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
