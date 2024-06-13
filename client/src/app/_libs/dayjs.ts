import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);
dayjs.extend(utc);

export const dayDateMonthYear = "L";
export const monthDateYear = "LL";
export const stdDate = "YYYY-MM-DD";
export const hourOnly = "LT";


export function dateFormat(date: string, format: string) {
  return dayjs(date).format(format);
}
