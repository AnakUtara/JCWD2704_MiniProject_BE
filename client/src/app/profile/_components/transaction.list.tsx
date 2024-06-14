"use client";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { TTransaction, trans_status } from "@/app/_models/transaction.model";
import { Table } from "flowbite-react";
import Link from "next/link";
import ProofModal from "./proof.modal";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/_utils/formatter";
import UserAvatar from "@/app/_components/ui/user.avatar";
import { ImCross } from "react-icons/im";
import { axiosInstance } from "@/app/_libs/axios.config";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Status_event } from "@/app/_models/event.model";

type Props = { data: TTransaction[] };
export default function TransactionList({ data }: Props) {
  const [tr, setTr] = useState<TTransaction>();
  const token = getCookie("access_token");
  useEffect(() => {
    if (document && tr) {
      (document.getElementById("proof_modal") as HTMLFormElement).showModal();
    }
  }, [tr]);
  return (
    <div className="w-full overflow-x-auto">
      <Table className="bg-transparent shadow-none" hoverable>
        <Table.Head>
          <Table.HeadCell>Invoice Code</Table.HeadCell>
          <Table.HeadCell>Purchased Tickets</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Event</Table.HeadCell>
          <Table.HeadCell>Event Discount</Table.HeadCell>
          <Table.HeadCell>Event Status</Table.HeadCell>
          <Table.HeadCell>Points Used</Table.HeadCell>
          <Table.HeadCell>Event Creator</Table.HeadCell>
          <Table.HeadCell>Payment Bank Acc No.</Table.HeadCell>
          <Table.HeadCell>Applied Voucher</Table.HeadCell>
          <Table.HeadCell>Transfer Proof</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Cancel</Table.HeadCell>
          <Table.HeadCell>Transaction Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((trans: TTransaction) => (
            <Table.Row key={trans.id}>
              <Table.Cell>{trans.invoice_code}</Table.Cell>
              <Table.Cell>{trans.ticket_bought}</Table.Cell>
              <Table.Cell>{formatPrice(trans.total_price)}</Table.Cell>
              <Table.Cell>
                <Link
                  className="font-bold hover:underline"
                  href={`/event/${trans.event_id}`}
                >
                  {trans.event.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {trans.ticket_discount ? (
                  <div className="badge badge-accent text-nowrap text-white">
                    {trans.ticket_discount + "% OFF"}
                  </div>
                ) : (
                  "none"
                )}
              </Table.Cell>
              <Table.Cell>{trans.event.status}</Table.Cell>
              <Table.Cell>
                {trans.points_used ? trans.points_used : "none"}
              </Table.Cell>
              <Table.Cell>
                <span className="flex flex-col items-center">
                  <UserAvatar user={trans?.event.user} />
                  {trans?.event.user.username}
                </span>
              </Table.Cell>
              <Table.Cell>{trans.event.user.bank_acc_no}</Table.Cell>
              <Table.Cell>
                {trans.voucher_id ? trans.voucher_id : "none"}
              </Table.Cell>
              <Table.Cell>
                {trans.total_price ? (
                  trans.transfer_proof ? (
                    <button
                      className="btn btn-accent rounded-none text-white hover:bg-zinc-800"
                      disabled={
                        trans.status === trans_status.cancelled ? true : false
                      }
                      onClick={() => {
                        setTr(trans);
                      }}
                    >
                      View
                    </button>
                  ) : (
                    <button
                      className="btn btn-accent rounded-none text-white hover:bg-zinc-800"
                      onClick={() => {
                        setTr(trans);
                      }}
                      disabled={
                        trans.status === trans_status.cancelled ||
                        trans.event.status === Status_event.finished
                          ? true
                          : false
                      }
                    >
                      Upload
                    </button>
                  )
                ) : (
                  "Free"
                )}
                <ProofModal trans={tr} />
              </Table.Cell>
              <Table.Cell>{trans.status}</Table.Cell>
              <Table.Cell>
                <button
                  type="button"
                  className="btn btn-square btn-error rounded-none text-white"
                  disabled={
                    trans.status === trans_status.unpaid &&
                    trans.event.status !== Status_event.finished
                      ? false
                      : true
                  }
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await axiosInstance().delete(
                        `/transactions/${trans.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        },
                      );
                      toast.success(`[${trans.invoice_code}] cancelled.`);
                      window.location.reload();
                    } catch (error) {
                      if (error instanceof AxiosError) {
                        console.error(error.message);
                        toast.error(error.response?.data.message);
                      }
                    }
                  }}
                >
                  <ImCross />
                </button>
              </Table.Cell>
              <Table.Cell>
                {dateFormat(trans.created_at.toString(), monthDateYear)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
