"use client";

import IconTextInput from "@/app/_components/icon.text.input";
import { sort_order, sort_via } from "@/app/_models/sort.model";
import { trans_status } from "@/app/_models/transaction.model";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = { placeholder: string };
export default function Search({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback(
    ({
      search,
      sort = sort_order.desc,
      sort_by = sort_via.created_at,
      status,
      page = "1",
    }: {
      search?: string;
      sort?: sort_order;
      sort_by?: sort_via;
      status?: trans_status | undefined | string;
      page?: string;
    }) => {
      const inputs = { search, sort, sort_by, status, page };
      const entries = Object.entries(inputs);
      const params = new URLSearchParams(searchParams);
      entries.forEach(([key, value]) => {
        value ? params.set(key, value) : params.delete(key);
      });
      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );
  return (
    <div className="flex flex-wrap gap-2">
      <select
        name="sort_by"
        id="sort_by"
        className="select select-bordered max-w-xs rounded-none"
        defaultValue={searchParams.get("sort_by")?.toString()}
        onChange={(e) => {
          handleChange({ sort_by: e.target.value as sort_via });
        }}
      >
        <option value={sort_via.created_at}>Date</option>
        <option value={sort_via.ticket_bought}>Tickets</option>
        <option value={sort_via.total_price}>Total Price</option>
      </select>
      <select
        name="sort"
        id="sort"
        className="select select-bordered max-w-xs rounded-none"
        defaultValue={searchParams.get("sort")?.toString()}
        onChange={(e) => {
          handleChange({ sort: e.target.value as sort_order });
        }}
      >
        <option value={sort_order.asc}>Ascending</option>
        <option value={sort_order.desc}>Descending</option>
      </select>
      <IconTextInput
        icon={<FaMagnifyingGlass />}
        placeholder={placeholder}
        name="search"
        onChange={(e) => {
          handleChange({ search: e.target.value });
        }}
        autoComplete="search"
        full={true}
      />
      <select
        name="status"
        id="status"
        className="select select-bordered max-w-xs rounded-none"
        defaultValue={undefined}
        onChange={(e) => {
          handleChange({
            status:
              e.target.value !== "All Status" ? e.target.value : undefined,
          });
        }}
      >
        <option value={undefined}>All Status</option>
        <option value={trans_status.unpaid}>Unpaid</option>
        <option value={trans_status.pending}>Pending</option>
        <option value={trans_status.success}>Success</option>
      </select>
    </div>
  );
}
