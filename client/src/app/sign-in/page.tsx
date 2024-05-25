import Link from "next/link";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import { IoMail } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import clsx from "clsx";
import { major_mono, plex_mono } from "../_utils/fonts";
import IconTextInput from "../_components/IconTextInput";

type Props = {};
export default function SignIn({}: Props) {
  return (
    <AuthFormWrapper title="Login">
      <form className="border-primary w-[480px] max-w-[325px] border p-5">
        <IconTextInput
          icon={<IoMail />}
          type="text"
          placeholder="Email/Username"
          name="email_username"
        />
        <IconTextInput
          icon={<FaKey />}
          type="password"
          placeholder="Password"
          name="password"
        />
        <button
          className={clsx(
            plex_mono.className,
            "btn btn-primary btn-block rounded-none text-white",
          )}
        >
          Sign In
        </button>
      </form>
      <div className={clsx(major_mono.className, "divider")}>OR</div>
      <div className="flex flex-col items-start gap-2">
        <Link href={"/sign-up"} className={clsx(plex_mono.className)}>
          Sign up
        </Link>
        <Link href={"/forgot-password"} className={clsx(plex_mono.className)}>
          Forgot password
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
