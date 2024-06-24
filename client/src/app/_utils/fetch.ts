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

export async function patchMultipartFormData(
  url: string,
  body: any,
  token: string,
) {
  await axiosInstance().patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
}