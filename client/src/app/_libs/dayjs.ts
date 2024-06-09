import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(utc);
dayjs.extend(localizedFormat);

// const tz = "Asia/Jakarta";
export const dayDateMonthYear = "L";
export const monthDateYear = "LL";
export const hourOnly = "LT";

export function dateFormat(date: string, format: string) {
  return dayjs(date).format(format);
}
