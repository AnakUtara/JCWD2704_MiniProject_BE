import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "Asia/Jakarta";
export const dayDateMonthYear = "dddd DD/MM/YYYY";
export const monthDateYear = "MMMM D, YYYY";

export function dateFormat(date: string, format: string) {
  return dayjs.tz(date, tz).format(format);
}
