"use client";

import IconTextInput from "@/app/_components/icon.text.input";
import { axiosInstance } from "@/app/_libs/axios.config";
import { useAppSelector } from "@/app/_libs/redux/hooks";
import { TEvent } from "@/app/_models/event.model";
import { formatPrice } from "@/app/_utils/formatter";
import { AxiosError } from "axios";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FaCoins, FaTicket, FaPlus, FaMinus } from "react-icons/fa6";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = { data: TEvent };
export default function TransactionForm({ data }: Props) {
  const activeUser = useAppSelector((s) => s.auth);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      ticket_bought: 1,
      voucher_id: "",
      points: activeUser.points || 0,
    },
    validationSchema: Yup.object().shape({
      ticket_bought: Yup.number()
        .min(1)
        .max(data?.ticket_amount!, "Ticket amount limit passed!"),
      voucher_id: Yup.string().matches(
        new RegExp("(" + activeUser.voucher?.id + ")"),
        "Invalid voucher code.",
      ),
      points: Yup.number().max(
        activeUser?.points!,
        "You are not holding that much points.",
      ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance().post(
          "/transactions",
          {
            ...values,
            event_id: data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          },
        );
        toast.success(
          !data.ticket_price
            ? "Ticket issue email sent."
            : "Transaction email sent.",
        );
        router.push("/");
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          toast.error(error.response?.data.message);
        }
      }
    },
  });
  const total_price =
    formik.values.ticket_bought *
    (data?.discountCalculation || data?.ticket_price || 0);
  return (
    <form className="mt-2 w-full border p-3" onSubmit={formik.handleSubmit}>
      <label
        htmlFor="ticket_bought"
        className="flex flex-wrap items-center gap-2"
      >
        Amount of tickets to buy:
        <input
          type="text"
          inputMode="numeric"
          placeholder={formik.values.ticket_bought.toString()}
          name="ticket_bought"
          id="ticket_bought"
          className="input input-bordered w-16 rounded-none font-bold focus-within:outline-accent"
          onChange={formik.handleChange}
          value={formik.values.ticket_bought}
        />
        <button
          type="button"
          className="btn btn-square btn-accent rounded-none text-lg text-white hover:bg-neutral-800"
          onClick={(e) => {
            e.preventDefault();
            Number(formik.values.ticket_bought) < data?.ticket_amount! &&
              formik.setFieldValue(
                "ticket_bought",
                ++formik.values.ticket_bought,
                true,
              );
          }}
        >
          <FaPlus />
        </button>
        <button
          type="button"
          className="btn btn-square btn-accent rounded-none text-lg text-white hover:bg-neutral-800"
          onClick={(e) => {
            e.preventDefault();
            Number(formik.values.ticket_bought) !== 0 &&
              formik.setFieldValue(
                "ticket_bought",
                --formik.values.ticket_bought,
                true,
              );
          }}
        >
          <FaMinus />
        </button>
      </label>
      <p className={"text-xs text-red-700"}>{formik.errors.ticket_bought}</p>
      <label
        htmlFor="voucher_id"
        className={clsx(!data.ticket_price && "hidden")}
      >
        Gain extra 10% off by using your voucher code here:
        <IconTextInput
          icon={<FaTicket />}
          name="voucher_id"
          placeholder="Voucher Code"
          value={formik.values.voucher_id}
          onChange={formik.handleChange}
          bottomLabel={formik.errors.voucher_id}
        />
      </label>
      <label
        htmlFor="points"
        className={clsx(
          !data.ticket_price || !activeUser.points ? "hidden" : "block",
        )}
      >
        Use your points:
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-md rounded-none"
            value={formik.values.points?.toString()}
            disabled={!activeUser.points ? true : false}
            onChange={(e) => {
              formik.setFieldValue(
                "points",
                e.target.checked ? activeUser.points : 0,
              );
            }}
          />
          <div className="ml-2 flex items-center gap-3 font-bold">
            <FaCoins /> {activeUser.points}pts.
          </div>
        </div>
      </label>
      <h3 className="m-0 mt-4">Total Price:</h3>
      <h3 className="m-0">
        {formatPrice(
          formik.values.points >= total_price
            ? total_price
            : total_price - formik.values.points,
        )}
      </h3>
      <button
        type="submit"
        className="btn btn-accent btn-block mt-4 rounded-none text-white hover:bg-neutral-800"
      >
        Checkout
      </button>
    </form>
  );
}
