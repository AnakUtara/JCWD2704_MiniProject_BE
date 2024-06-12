import dynamic from "next/dynamic";
import TransactionList from "./_components/transaction.list";
import Search from "../_components/search";
import { sort_order, sort_via } from "../_models/sort.model";
import { TTransaction, trans_status } from "../_models/transaction.model";
import { cookies } from "next/headers";
import { fetchSearchData } from "../_utils/fetch";

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
  const token = cookies().get("access_token");
  const { data }: { data: TTransaction[] } = await fetchSearchData(
    "/transactions/v1",
    searchParams,
    token?.value || "",
  );

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
      <Search placeholder="Search purchases..." />
      <TransactionList data={data} />
    </ProfileTabs>
  );
}
