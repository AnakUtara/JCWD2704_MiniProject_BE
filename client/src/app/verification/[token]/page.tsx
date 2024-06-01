import { major_mono, plex_mono } from "@/app/_utils/fonts";
import clsx from "clsx";
import { axiosInstance } from "@/app/_libs/axios.config";
import { redirect } from "next/navigation";

type Props = { params: { token: string } };
export default async function VerifyUser({ params }: Props) {
  const { token } = params;
  try {
    await axiosInstance().get(`users/v3`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
  return (
    <div className="grid min-h-screen place-items-center">
      <div className={clsx(plex_mono.className, "prose w-full p-5")}>
        <h1 className={clsx(major_mono.className)}>
          Thank you for verifying your account!
        </h1>
        <h2>
          Verification in progress...
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </h2>
        <p>You'll be redirected automatically once this process is done.</p>
      </div>
    </div>
  );
}
