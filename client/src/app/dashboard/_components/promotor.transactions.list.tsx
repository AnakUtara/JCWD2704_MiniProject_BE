"use client";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { TTransaction, trans_status } from "@/app/_models/transaction.model";
import { Table } from "flowbite-react";
import ViewProofModal from "./view.proof.modal";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/_utils/formatter";
import UserAvatar from "@/app/_components/ui/user.avatar";
import Link from "next/link";
import { axiosInstance } from "@/app/_libs/axios.config";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ImCross } from "react-icons/im";
import { Status_event } from "@/app/_models/event.model";

type Props = { data: TTransaction[] };
export default function PromotorTransactionsList({ data }: Props) {
  const [tr, setTr] = useState<TTransaction>();
  const token = getCookie("access_token");
  useEffect(() => {
    if (document && tr) {
      (document.getElementById("view_proof") as HTMLFormElement).showModal();
    }
  }, [tr]);
  return (
    <div className="w-full overflow-x-auto">
      <ViewProofModal trans={tr} />
      <Table className="bg-transparent shadow-none" hoverable>
        <Table.Head>
          <Table.HeadCell>Invoice Code</Table.HeadCell>
          <Table.HeadCell>Purchased Tickets</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Event Discount</Table.HeadCell>
          <Table.HeadCell>Points Used</Table.HeadCell>
          <Table.HeadCell>Event</Table.HeadCell>
          <Table.HeadCell>Event Status</Table.HeadCell>
          <Table.HeadCell>Purchased By</Table.HeadCell>
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
                {trans.ticket_discount ? (
                  <div className="badge badge-accent text-nowrap text-white">
                    {trans.ticket_discount + "% OFF"}
                  </div>
                ) : (
                  "none"
                )}
              </Table.Cell>
              <Table.Cell>
                {trans.points_used ? trans.points_used : "none"}
              </Table.Cell>
              <Table.Cell>
                <Link
                  className="font-bold hover:underline"
                  href={`/event/${trans.event_id}`}
                >
                  {trans.event.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{trans.event.status}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-col items-center gap-2">
                  <UserAvatar user={trans.user} />
                  {trans.user.username}
                </div>
              </Table.Cell>
              <Table.Cell>
                {trans.voucher_id ? trans.voucher_id : "none"}
              </Table.Cell>
              <Table.Cell>
                {trans.transfer_proof ? (
                  <button
                    type="button"
                    className="btn btn-accent rounded-none text-white hover:bg-zinc-800"
                    onClick={() => {
                      setTr(trans);
                    }}
                  >
                    View
                  </button>
                ) : trans.status === trans_status.success ||
                  !trans.total_price ? (
                  "Free"
                ) : (
                  "none"
                )}
              </Table.Cell>
              <Table.Cell>
                {trans.status === "pending" ? (
                  <button
                    type="button"
                    className="btn btn-accent rounded-none text-white hover:bg-zinc-800"
                    disabled={
                      trans.event.status === Status_event.finished
                        ? true
                        : false
                    }
                    onClick={async (e) => {
                      try {
                        await axiosInstance().patch(
                          `/transactions/v4/${trans.id}`,
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        );
                        toast.success("Transaction confirmed.");
                        window.location.reload();
                      } catch (error) {
                        if (error instanceof AxiosError) {
                          console.error(error.response?.data.message);
                          toast.error(error.response?.data.message);
                        }
                      }
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  trans.status
                )}
              </Table.Cell>
              <Table.Cell>
                <button
                  type="button"
                  className="btn btn-square btn-error rounded-none text-white"
                  disabled={
                    (trans.status === trans_status.unpaid &&
                      trans.event.status !== Status_event.finished) ||
                    (trans.status === trans_status.pending &&
                      trans.event.status !== Status_event.finished)
                      ? false
                      : true
                  }
                  onClick={async (e) => {
                    try {
                      await axiosInstance().delete(
                        `/transactions/${trans.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        },
                      );
                      toast.success("Transaction cancelled.");
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
