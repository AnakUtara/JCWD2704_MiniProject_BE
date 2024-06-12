import { axiosInstance } from "../_libs/axios.config";

export async function fetchSearchData(
  url: string,
  searchParams: any,
  token: string,
) {
  const res = await axiosInstance().get(url, {
    params: {
      ...searchParams,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
