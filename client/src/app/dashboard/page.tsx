import Link from "next/link";

// type Props = {};
// export default function Dashboard({}: Props) {
//   return (
//     <div>
//       Dashboard
//       <Link href={`/event/create`}>
//         <button className="w-[200px] rounded-md border-[1px] border-gray-500 p-2 hover:bg-slate-300">
//           Create new event
//         </button>
//       </Link>
//     </div>
//   );
// }

import { cookies } from "next/headers";

import { axiosInstance } from "../_libs/axios.config";

import { TTransaction, trans_status } from "../_models/transaction.model";
import DashboardTabs from "./_components/dashboard.tabs";

import Search from "../_components/search";
import { sort_order, sort_via } from "../_models/sort.model";
import PromotorTransactionsList from "./_components/promotor.transaction.list";
import PromotorEvent from "./_components/promotor.event";

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
      tab1={
        <div>
          <PromotorEvent />
        </div>
      }
      tab2={
        <div>
          <Search placeholder="Search transactions..." />
          <PromotorTransactionsList data={data} />
        </div>
      }
      tab3={<div>event attended</div>}
    />
  );
}
