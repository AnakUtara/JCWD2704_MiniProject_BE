import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "Asia/Jakarta";
export const date = (date: string) =>
  dayjs.tz(date, tz).format("dddd DD/MM/YYYY");
