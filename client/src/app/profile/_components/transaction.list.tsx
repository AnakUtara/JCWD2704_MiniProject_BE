"use client";
import { dateFormat, monthDateYear } from "@/app/_libs/dayjs";
import { TTransaction } from "@/app/_models/transaction.model";
import { Table } from "flowbite-react";

type Props = { data: TTransaction[] };
export default function TransactionList({ data }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="bg-transparent shadow-none" hoverable>
        <Table.Head>
          <Table.HeadCell>Invoice Code</Table.HeadCell>
          <Table.HeadCell>Purchased Tickets</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Event Discount</Table.HeadCell>
          <Table.HeadCell>Points Used</Table.HeadCell>
          <Table.HeadCell>Event</Table.HeadCell>
          <Table.HeadCell>Event Creator</Table.HeadCell>
          <Table.HeadCell>Promotor's Bank Account No.</Table.HeadCell>
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
              <Table.Cell>{trans.total_price}</Table.Cell>
              <Table.Cell>
                {trans.ticket_discount ? trans.ticket_discount : "none"}
              </Table.Cell>
              <Table.Cell>
                {trans.points_used ? trans.points_used : "none"}
              </Table.Cell>
              <Table.Cell>{trans.event.title}</Table.Cell>
              <Table.Cell>{trans.event.user.username}</Table.Cell>
              <Table.Cell>{trans.event.user.bank_acc_no}</Table.Cell>
              <Table.Cell>
                {trans.voucher_id ? trans.voucher_id : "none"}
              </Table.Cell>
              <Table.Cell>
                {trans.transfer_proof ? trans.transfer_proof : "upload"}
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
