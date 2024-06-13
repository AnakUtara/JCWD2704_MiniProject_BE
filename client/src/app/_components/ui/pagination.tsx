"use client";

import { Pagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export function Paginate({ totalPages }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={Number(searchParams.get("page"))}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
