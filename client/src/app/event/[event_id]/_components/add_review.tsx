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
        await axiosInstance().post(`/review/${data.id}`, {
          ...values,
          rating: Number(values.rating),
        });
        fetch();
        toast.success("thank you, your review has been submitted");
      } catch (error) {
        if (error instanceof Error) console.error;
        toast.error("failed in adding review data");
      }
    },
  });
  const fetch = async () => {
    try {
      const res = await axiosInstance().get(`/review/${data.id}`);
      setResult(res.data.data);
    } catch (error) {
      if (error instanceof Error) console.error;
      toast.error("failed in adding review data");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <div>
        <EventReview result={result} />
      </div>

      <form onSubmit={formik.handleSubmit} className="flex w-full self-end ">
        <div className="flex flex-col md:flex-row ">
          <input
            name="review"
            type="text"
            placeholder="type your review here!"
            value={formik.values.review}
            onChange={formik.handleChange}
            className="flex-1 "
          />

          <div className="flex flex-col items-center">
            <p className="font-semibold">Rate our event!</p>

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
