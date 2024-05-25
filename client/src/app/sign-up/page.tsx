import AuthFormWrapper from "../_components/AuthFormWrapper";
import { FaUser, FaKey, FaIdCard, FaIdBadge, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
type Props = {};
export default function SignUp({}: Props) {
  return (
    <AuthFormWrapper title="Register">
      <form className="w-[480px] max-w-[325px] rounded-xl border border-zinc-300 p-5">
        <label className="input input-bordered flex items-center gap-2">
          <IoMail />
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaIdBadge />
          <input type="text" className="grow" placeholder="Username" />
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
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" className="grow" value="Full Name" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaIdCard />
          <input type="text" className="grow" value="NIK" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaPhone />
          <input type="text" className="grow" value="Phone Number" />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <button className="btn btn-primary btn-block text-white">
          Register
        </button>
      </form>
    </AuthFormWrapper>
  );
}
