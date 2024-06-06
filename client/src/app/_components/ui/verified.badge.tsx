"use client";
import { TUser } from "@/app/_models/user.model";
import { handleVerification } from "@/app/_utils/handlers";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";

type Props = { user: TUser; email: string };
export default function VerifiedBadge({ user, email }: Props) {
  return (
    <>
      <span className="flex items-center gap-2 text-xs">
        <FaCheckCircle
          className={clsx(
            user.is_verified ? "text-success" : "text-zinc-600",
            "text-xs",
          )}
        />{" "}
        {user.is_verified ? "Verified" : "Unverified"}
      </span>

      <button
        type="button"
        className={clsx(
          "btn btn-outline btn-accent btn-xs rounded-none  text-white",
          user.is_verified && "hidden",
        )}
        onClick={(e) => {
          e.preventDefault();
          handleVerification(email);
        }}
      >
        Verify account
      </button>
    </>
  );
}
