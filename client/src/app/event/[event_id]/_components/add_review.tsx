"use client";
import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { TReview } from "@/app/_models/review.model";
import { Spinner } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import EventReview from "./event_review";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

type Props = { data: TEvent };
export default function CreateReview({ data }: Props) {
  const [result, setResult] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      review: "",
      rating: 0,
    },
    validationSchema: Yup.object({
      review: Yup.string().required(),
      rating: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        await axiosInstance().post(
          `/review/${data.id}`,
          {
            ...values,
            rating: Number(values.rating),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          },
        );
        fetch();
        toast.success("thank you, your review has been submitted");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error;
          toast.error(error.response?.data.message);
        }
      }
    },
  });
  const fetch = async () => {
    try {
      const res = await axiosInstance().get(`/review/${data.id}`);
      setResult(res.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error;
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4 md:gap-0">
      <div className="overflow-y-scroll">
        <EventReview result={result} />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-row items-center gap-2">
          <input
            name="review"
            type="text"
            placeholder="type your review here!"
            value={formik.values.review}
            onChange={formik.handleChange}
            className="h-[6vh] md:w-[75vh]"
          />

          <div className="flex flex-col items-center">
            <p className="md:text-md text-xs font-semibold">Rate our event!</p>

            <div className="rating rating-md">
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                value={1}
                onChange={formik.handleChange}
              />
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                value={2}
                onChange={formik.handleChange}
              />
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                value={3}
                onChange={formik.handleChange}
              />
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                value={4}
                onChange={formik.handleChange}
              />
              <input
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-black"
                value={5}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            (!formik.values.review && !formik.values.rating) ||
            formik.isSubmitting
              ? true
              : false
          }
          className="btn btn-accent mt-6  rounded-none text-white hover:bg-zinc-800"
        >
          {formik.isSubmitting ? <Spinner></Spinner> : "Add Review!"}
        </button>
      </form>
    </div>
  );
}
