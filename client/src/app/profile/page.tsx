import dynamic from "next/dynamic";
import TransactionList from "./_components/transaction.list";
import Search from "./_components/search";
import { sort_order, sort_via } from "../_models/sort.model";
import { TTransaction, trans_status } from "../_models/transaction.model";
import { Suspense } from "react";
import { axiosInstance } from "../_libs/axios.config";
import { cookies } from "next/headers";

type Props = {
  searchParams: {
    search?: string;
    sort: sort_order;
    sort_by: sort_via;
    status?: trans_status | undefined | string;
    page: string;
  };
};
export default async function Profile({ searchParams }: Props) {
  const res = await axiosInstance().get("/transactions/v1", {
    params: {
      ...searchParams,
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });
  const { data }: { data: TTransaction[] } = await res.data;

  const ProfileTabs = dynamic(() => import("./_components/profile.tabs"), {
    loading: () => (
      <span className="grid min-h-[80dvh] w-full place-content-center">
        <span className="loading loading-bars"></span>
      </span>
    ),
    ssr: false,
  });
  return (
    <ProfileTabs>
      <Search />
      <Suspense
        key={searchParams.search + searchParams.page}
        fallback={<span className="loading loading-bars"></span>}
      >
        <TransactionList data={data} />
      </Suspense>
    </ProfileTabs>
  );
}
