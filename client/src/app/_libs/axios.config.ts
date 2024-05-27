import axios, { AxiosInstance } from "axios";

export function axiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });
}
