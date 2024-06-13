"use client";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { TTransaction } from "@/app/_models/transaction.model";
import { Table } from "flowbite-react";
import Link from "next/link";
import ProofModal from "./proof.modal";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/_utils/formatter";
import UserAvatar from "@/app/_components/ui/user.avatar";
import clsx from "clsx";

type Props = { data: TTransaction[] };
export default function TransactionList({ data }: Props) {
  const [tr, setTr] = useState<TTransaction>();

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
          {/* <Table.HeadCell>Event Discount</Table.HeadCell>
          <Table.HeadCell>Points Used</Table.HeadCell> */}
          <Table.HeadCell>Event</Table.HeadCell>
          <Table.HeadCell>Event Creator</Table.HeadCell>
          <Table.HeadCell>Payment Bank Acc No.</Table.HeadCell>
          <Table.HeadCell>Applied Voucher</Table.HeadCell>
          <Table.HeadCell>Transfer Proof</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Transaction Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((trans: TTransaction) => (
            <Table.Row key={trans.id}>
              <Table.Cell>{trans.invoice_code}</Table.Cell>
              <Table.Cell>{trans.ticket_bought}</Table.Cell>
              <Table.Cell>{formatPrice(trans.total_price)}</Table.Cell>
              {/* <Table.Cell>
                {trans.ticket_discount ? trans.ticket_discount : "none"}
              </Table.Cell>
              <Table.Cell>
                {trans.points_used ? trans.points_used : "none"}
              </Table.Cell> */}
              <Table.Cell>
                <Link
                  className="hover:underline"
                  href={`/event/${trans.event_id}`}
                >
                  {trans.event.title}
                </Link>
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
                {trans.status !== "success" || trans.total_price ? (
                  trans.transfer_proof ? (
                    <button
                      className="btn btn-accent rounded-none text-white hover:bg-zinc-800"
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
                {dateFormat(trans.created_at.toString(), monthDateYear)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
