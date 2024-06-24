"use client";

import { TTransaction } from "@/app/_models/transaction.model";
import { patchMultipartFormData } from "@/app/_utils/fetch";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  trans: TTransaction | undefined;
};
export default function ProofModal({ trans }: Props) {
  const formik = useFormik({
    initialValues: {
      transfer_proof: null,
    },
    onSubmit: async (values) => {
      try {
        await patchMultipartFormData(
          `/transactions/${trans?.id}`,
          { ...values },
          getCookie("access_token") as string,
        );
        toast.success("Transfer proof uploaded");
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          toast.error(error.response?.data.message);
        }
      }
    },
  });
  return (
    <dialog id={"proof_modal"} className="modal">
      <div className="modal-box rounded-none">
        {trans?.transfer_proof ? (
          <Image
            width={480}
            height={480}
            src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/transfer-proof/${trans.transfer_proof}`}
            alt={`transaction ${trans.id} proof`}
            className="min-h-96 object-cover"
          />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <label className="font-bold" htmlFor="transfer_proof">
              Upload Transfer Proof:
            </label>
            <input
              className="file-input file-input-bordered file-input-accent mt-2 w-full rounded-none"
              type="file"
              name="transfer_proof"
              id="transfer_proof"
              accept="image/*"
              onChange={(e) => {
                formik.setFieldValue(
                  "transfer_proof",
                  e.target.files && e.target.files[0],
                  true,
                );
              }}
            />
            <button
              type="submit"
              className="btn btn-accent btn-block mt-2 rounded-none text-white hover:bg-zinc-800"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
