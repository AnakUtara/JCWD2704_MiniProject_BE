import clsx from "clsx";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import { FaUser, FaKey, FaIdCard, FaIdBadge, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { major_mono, plex_mono } from "../_utils/fonts";
import Link from "next/link";
import IconTextInput from "../_components/IconTextInput";
type Props = {};
export default function SignUp({}: Props) {
  return (
    <AuthFormWrapper title="Register">
      <form className="border-primary w-[480px] max-w-[325px] border p-5">
        <IconTextInput
          icon={<IoMail />}
          type="text"
          placeholder="E-mail"
          name="email"
          bottomLabel=" "
        />
        <IconTextInput
          icon={<FaIdBadge />}
          type="text"
          placeholder="Username"
          name="username"
          bottomLabel=" "
        />
        <IconTextInput
          icon={<FaKey />}
          type="password"
          placeholder="Password"
          name="password"
          bottomLabel=" "
        />
        <IconTextInput
          icon={<FaUser />}
          type="text"
          placeholder="Full Name"
          name="fullname"
          bottomLabel=" "
        />
        <IconTextInput
          icon={<FaIdCard />}
          type="text"
          placeholder="NIK"
          name="id_card"
          bottomLabel=" "
        />
        <IconTextInput
          icon={<FaPhone />}
          type="text"
          placeholder="Phone Number"
          name="phone_no"
          bottomLabel=" "
        />
        <button
          className={clsx(
            plex_mono.className,
            "btn btn-primary btn-block rounded-none text-white",
          )}
        >
          Register
        </button>
      </form>
      <div className={clsx(major_mono.className, "divider")}>OR</div>
      <Link href={"/sign-in"} className={clsx(plex_mono.className)}>
        Sign in
      </Link>
    </AuthFormWrapper>
  );
}
