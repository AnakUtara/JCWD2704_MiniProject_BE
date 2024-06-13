import { cookies } from "next/headers";
import Search from "../_components/search";
import { sort_order, sort_via } from "../_models/sort.model";
import { TTransaction, trans_status } from "../_models/transaction.model";
import DashboardTabs from "./_components/dashboard.tabs";
import PromotorTransactionsList from "./_components/promotor.transactions.list";
import { fetchSearchData } from "../_utils/fetch";
import FavCategoryChart from "./_components/favorite.category.chart";
import ChartSettings from "./_components/chart.settings";

type Props = {
  searchParams: {
    search?: string;
    sort: sort_order;
    sort_by: sort_via;
    status?: trans_status | undefined | string;
    page: string;
    month: string;
    year: string;
    type: string;
  };
};
export default async function Dashboard({ searchParams }: Props) {
  const token = cookies().get("access_token");
  const { search, sort, sort_by, status, page, month, type, year } =
    searchParams;
  const transactionQueries = { search, sort, sort_by, status, page };
  const chartQueries = { month, type, year };
  const { data }: { data: TTransaction[] } = await fetchSearchData(
    "/transactions/v2",
    transactionQueries,
    token?.value || "",
  );
  const {
    data: chartData,
  }: { data: { category: string; ticket_sales: string }[] } =
    await fetchSearchData("/transactions/v3", chartQueries, token?.value || "");
  return (
    <>
      <div className="mb-2 flex justify-between gap-5">
        <ChartSettings />
      </div>
      <FavCategoryChart data={chartData} />
      <DashboardTabs
        tab1={
          <div>
            <Search placeholder="Search transactions..." />
            <PromotorTransactionsList data={data} />
          </div>
        }
        tab2={<div>Events</div>}
        tab3={<div>Attendance</div>}
      />
    </>
  );
}
