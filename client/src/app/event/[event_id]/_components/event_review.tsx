"use client";
import { axiosInstance } from "@/app/_libs/axios.config";
import { TReview } from "@/app/_models/review.model";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "sonner";
import StarRating from "./starRating";

type Props = { result: TReview[] };
export default function EventReview({ result }: Props) {
  useEffect(() => {
    console.log("result:", result);
  }, [result]);
  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      {result.length > 0 ? (
        result.map((e: TReview, index: number) => (
          <div className="rounded-md bg-slate-200 p-2">
            <div
              key={index}
              className="flex flex-row justify-between text-sm font-semibold"
            >
              <p>{e.user.username}</p>
              <StarRating
                rating={e.rating}
                size="sm"
                colour="black"
                name={"review-" + index}
              />
            </div>
            <div className="text-md">{e.review}</div>
          </div>
        ))
      ) : (
        <div>no review available</div>
      )}
    </div>
  );
}
