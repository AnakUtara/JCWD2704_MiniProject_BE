"use client";
import { dateFormat, stdDate } from "@/app/_libs/dayjs";
import { major_mono } from "@/app/_utils/fonts";
import clsx from "clsx";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {};
export default function ChartSettings({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleChange({
    type = "month",
    month = dayjs().get("month") + 1,
    year = dayjs().get("year"),
  }: {
    type: string;
    month?: number;
    year?: number;
  }) {
    const params = new URLSearchParams(searchParams);
    if (type) params.set("type", type);
    if (type === "month") params.set("month", month.toString());
    if (type === "year") params.set("year", year.toString());
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <>
      <h2
        className={clsx(
          major_mono.className,
          "mb-5 text-xl sm:text-2xl md:text-3xl",
        )}
      >
        Favorite Categories
      </h2>
      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
        <label htmlFor="type" className="text-xs sm:text-sm">
          Data By:{" "}
        </label>
        <select
          name="type"
          id="type"
          className="select select-bordered w-[100px] rounded-none"
          defaultValue={searchParams.get("type")?.toString()}
          onChange={(e) => {
            handleChange({ type: e.target.value });
          }}
        >
          <option value={"day"}>Day</option>
          <option value={"month"}>Month</option>
          <option value={"year"}>Year</option>
        </select>
      </div>
    </>
  );
}
