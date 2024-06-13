"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = { data: { category: string; ticket_sales: string }[] };
export default function FavCategoryChart({ data }: Props) {
  const max = Math.max(...data.map(({ ticket_sales }) => Number(ticket_sales)));
  return !data.length ? (
    <div className="flex h-[400px] w-full items-center justify-center">
      Nothing to show for now...
    </div>
  ) : (
    <div className="w-full">
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={data} maxBarSize={100}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" fontSize={11} />
          <YAxis fontSize={11} type="number" domain={[0, max]} />
          <Tooltip />
          <Bar dataKey="ticket_sales" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
