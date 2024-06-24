import { cookies } from "next/headers";
import Search from "../_components/search";
import { sort_order, sort_via } from "../_models/sort.model";
import { TTransaction, trans_status } from "../_models/transaction.model";
import DashboardTabs from "./_components/dashboard.tabs";
import { fetchSearchData } from "../_utils/fetch";
import ChartSettings from "./_components/chart.settings";
import { Paginate } from "../_components/ui/pagination";
import dynamic from "next/dynamic";

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
  const FavCategoryChart = dynamic(
    () => import("./_components/favorite.category.chart"),
    {
      ssr: false,
      loading: () => (
        <center>
          <span className="loading loading-bars py-5"></span>
        </center>
      ),
    },
  );
  const PromotorTransactionsList = dynamic(
    () => import("./_components/promotor.transactions.list"),
    {
      ssr: false,
      loading: () => (
        <center>
          <span className="loading loading-bars py-10"></span>
        </center>
      ),
    },
  );
  const PromotorEvent = dynamic(() => import("./_components/event.list"), {
    loading: () => (
      <center>
        <span className="loading loading-bars py-10"></span>
      </center>
    ),
  });
  const token = cookies().get("access_token");
  const { search, sort, sort_by, status, page, month, type, year } =
    searchParams;
  const transactionQueries = { search, sort, sort_by, status, page };
  const chartQueries = { month, type, year };
  const { data, total }: { data: TTransaction[]; total: number } =
    await fetchSearchData(
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
          !data.length ? (
            <div className="grid min-h-[400px] place-items-center py-5">
              No transactions happening yet...
            </div>
          ) : (
            <div>
              <Search placeholder="Search transactions..." />
              <PromotorTransactionsList data={data} />
              <Paginate totalPages={total} />
            </div>
          )
        }
        tab2={
          <div>
            <PromotorEvent />
          </div>
        }
      />
    </>
  );
}
