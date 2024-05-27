import Link from "next/link";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import clsx from "clsx";
import { major_mono, plex_mono } from "../_utils/fonts";
import LoginForm from "./_components/LoginForm";
//TODO: Implement Formik & Yup
type Props = {};
export default function SignIn({}: Props) {
  return (
    <AuthFormWrapper title="Login">
      <LoginForm />
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
