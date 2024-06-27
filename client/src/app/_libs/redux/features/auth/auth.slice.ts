import { TUser, initUser } from "@/app/_models/user.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

export const authSlice = createSlice({
  name: "auth",
  initialState: initUser,
  reducers: {
    login: (state: TUser, action: PayloadAction<TUser>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    logout: (state) => {
      deleteCookie("access_token", {
        path: "/",
        domain: "riady.pw",
        secure: true,
      });
      deleteCookie("refresh_token", {
        path: "/", 
        domain: "riady.pw",
        secure: true,
      });
      state = initUser;
      return state;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
