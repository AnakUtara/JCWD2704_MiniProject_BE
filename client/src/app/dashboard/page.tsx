import { cookies } from "next/headers";
import Search from "../_components/search";
import { axiosInstance } from "../_libs/axios.config";
import { sort_order, sort_via } from "../_models/sort.model";
import { TTransaction, trans_status } from "../_models/transaction.model";
import DashboardTabs from "./_components/dashboard.tabs";
import PromotorTransactionsList from "./_components/promotor.transactions.list";

type Props = {
  searchParams: {
    search?: string;
    sort: sort_order;
    sort_by: sort_via;
    status?: trans_status | undefined | string;
    page: string;
  };
};
export default async function Dashboard({ searchParams }: Props) {
  const res = await axiosInstance().get("/transactions/v2", {
    params: {
      ...searchParams,
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });
  const { data }: { data: TTransaction[] } = await res.data;
  return (
    <DashboardTabs
      tab1={<div>Events</div>}
      tab2={
        <div>
          <Search placeholder="Search transactions..." />
          <PromotorTransactionsList data={data} />
        </div>
      }
      tab3={<div>Attendance</div>}
    />
  );
}
