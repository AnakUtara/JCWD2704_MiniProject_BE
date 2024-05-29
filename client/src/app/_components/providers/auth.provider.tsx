"use client";
import { useAppDispatch } from "@/app/_libs/redux/hooks";
import { keepLogin } from "@/app/_libs/redux/middlewares/auth.middleware";
import { useEffect } from "react";

type Props = { children: React.ReactNode };
export default function AuthProvider({ children }: Props) {
  const dispatch = useAppDispatch();
  async function handleKeepLogin() {
    await dispatch(keepLogin());
  }
  useEffect(() => {
    handleKeepLogin();
  }, []);
  return children;
}
