import { useState } from "react";
import { axiosInstance } from "../_libs/axios.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { initEvent } from "../_models/event.model";
import { eventSchema } from "../_libs/yup";

export default function PostEvent() {
  const postData = async (user_params: string, body: any) => {
    try {
      const res = await axiosInstance().post("/events", {
        data: body,
      });
      console.log(res.data.data);
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  const formik = useFormik({
    initialValues: initEvent,
    validationSchema: eventSchema,
    onSubmit() {},
  });

  const formData = [
    { name: "Event title :", value: "title" },
    { name: "Event location :", value: "location" },
    { name: "City :", value: "city" },
    { name: "Zip-Code :", value: "zip_code" },
    { name: "Event venue type :", value: "venue_type" },
    { name: "Event details :", value: "details" },
    { name: "Event performer :", value: "roster" },
    { name: "Event date :", value: "scheduled_at" },
    { name: "Starting hour :", value: "start_time" },
    { name: "Closing hour :", value: "end_time" },
    { name: "Ticket price :", value: "ticket_price" },
    { name: "Event capacity :", value: "ticket_amount" },
    { name: "Event PIC :", value: "assigned_pic" },
    { name: "PIC phone.No :", value: "pic_phone_no" },
    { name: "Event Category :", value: "category" },
    { name: "Add discount? :", value: "discount_amount" },
    { name: "Event Image URL:", value: "image_url" },
    { name: "Updated price :", value: "discountCalculation" },
  ];

  return (
    <div className="container">
      <form>
        <div></div>
      </form>
    </div>
  );
}

// user_id: findUser.id,
// 				title: title,
// 				location: location,
// 				city: city,
// 				zip_code: Number(zip_code),
// 				venue_type: Venue_type[venue_type as keyof typeof Venue_type],
// 				details: details,
// 				roster: roster,
// 				scheduled_at: scheduled_at,
// 				start_time: start_time,
// 				end_time: end_time,
// 				ticket_price: Number(ticket_price),
// 				ticket_amount: Number(ticket_amount),
// 				assigned_pic: `${assigned_pic}`,
// 				pic_phone_no: `${pic_phone_no}`,
// 				category: Category[category as keyof typeof Category] || undefined,
// 				discount_amount: Number(discount_amount),
// 				image_url: image_url,
