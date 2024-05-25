import Link from "next/link";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import { IoMail } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";

type Props = {};
export default function SignIn({}: Props) {
  return (
    <AuthFormWrapper title="Login">
      <form className="w-[480px] max-w-[325px] rounded-xl border border-zinc-300 p-5">
        <label className="input input-bordered flex items-center gap-2">
          <IoMail />
          <input type="text" className="grow" placeholder="Email/Username" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input type="password" className="grow" value="password" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <button className="btn btn-primary btn-block text-white">
          Sign In
        </button>
      </form>
      <Link href={"/forgot-password"} className="btn btn-link btn-primary">
        Forgot password?
      </Link>
    </AuthFormWrapper>
  );
}
