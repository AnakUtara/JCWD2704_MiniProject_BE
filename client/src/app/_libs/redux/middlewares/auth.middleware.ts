import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios.config";
import { login, logout } from "../features/auth/auth.slice";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export function userLogin({
  email_username,
  password,
}: {
  email_username: string;
  password: string;
}) {
  return async function dispatch(dispatch: Dispatch) {
    try {
      await axiosInstance().post("/users/v1", {
        email_username,
        password,
      });
      const access_token = getCookie("access_token");
      if (access_token) {
        dispatch(login(jwtDecode(access_token)));
      }
      toast.success("Signed In");
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
      dispatch(logout());
      toast.error("Invalid Username/Password");
    }
  };
}

export function keepLogin() {
  return async function dispatch(dispatch: Dispatch) {
    try {
      const token = getCookie("access_token");
      if (token) {
        dispatch(login(jwtDecode(token)));
      }
    } catch (error: any) {
      console.log(error.message);
      dispatch(logout());
    }
  };
}
