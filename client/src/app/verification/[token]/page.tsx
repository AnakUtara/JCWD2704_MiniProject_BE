import { major_mono, plex_mono } from "@/app/_utils/fonts";
import clsx from "clsx";
import VerifyButton from "../_components/VerifyButton";

type Props = { params: { token: string } };
export default function VerifyUser({ params }: Props) {
  const { token } = params;
  return (
    <div className="grid min-h-screen place-items-center">
      <div className={clsx(plex_mono.className, "prose w-full p-5")}>
        <h1 className={clsx(major_mono.className)}>
          Thank you for registration!
        </h1>
        <p>Please verify your account with via this link:</p>
        <VerifyButton
          link_url={`${process.env.NEXT_PUBLIC_API_URL}/verify`}
          token={token}
        />
      </div>
    </div>
  );
}
