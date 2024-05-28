"use client";

import { axiosInstance } from "@/app/_libs/axios.config";
import { useRouter } from "next/navigation";

type Props = { link_url: string; token: string };
export default function VerifyButton({ link_url, token }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        try {
          await axiosInstance().patch(`users/v3/${token}`);
          alert("User has been verified.");
          router.push("/");
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
          alert("Fail to verify user.");
        }
      }}
      className="btn btn-link w-fit rounded-none p-0 text-left"
    >
      {link_url}
    </button>
  );
}
