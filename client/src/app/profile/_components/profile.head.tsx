"use client";
import UserAvatar from "@/app/_components/ui/user.avatar";
import VerifiedBadge from "@/app/_components/ui/verified.badge";
import { dateFormat, dayDateMonthYear } from "@/app/_libs/dayjs";
import { TUser } from "@/app/_models/user.model";
import { capitalize, formatCompactNumber } from "@/app/_utils/formatter";
import clsx from "clsx";
import { FaCamera } from "react-icons/fa";

type Props = { activeUser: TUser; onClick: () => void };
export default function ProfileHeader({ activeUser, onClick }: Props) {
  return (
    <>
      <div
        className={clsx(
          "prose mb-5 flex items-center gap-5",
          !activeUser.id && "hidden",
        )}
      >
        <div className="flex w-fit flex-col items-center gap-y-2 self-start">
          <UserAvatar user={activeUser} size={"lg"} bordered={true} />
          <button
            type="button"
            className="btn btn-square btn-accent btn-xs absolute top-36 text-white hover:bg-gray-800"
            onClick={onClick}
          >
            <FaCamera className="text-md" />
          </button>
          <p className="my-0 text-center text-[10px] leading-3">
            Max avatar <br /> size: 1.5MB.
          </p>
        </div>
        <div>
          <h2 className={clsx("m-0", !activeUser.id && "hidden")}>
            {capitalize(activeUser.username)}
          </h2>
          <VerifiedBadge user={activeUser} email={activeUser.email} />
          <p className="badge badge-accent m-0 ml-1 text-white">
            {activeUser.role}
          </p>
        </div>
      </div>
      <div className="prose flex flex-wrap gap-5">
        <div>
          <p className="my-0 text-xs">Referral Code:</p>
          <h4 className="mt-1 bg-black p-2 text-center text-sm font-bold text-white">
            {activeUser.referral_code}
          </h4>
          <div className="mt-2 flex flex-col gap-2 text-[10px] leading-3">
            *Share this code <br /> to gain more points!
            <br />
            <div className="bg-gray-500 p-1 leading-4 text-white">
              10k pts./ea. referral made.
              <br />
              Equivalent to IDR10k,-.
            </div>
            Use collected points
            <br />
            to buy tickets!
            <br />
          </div>
        </div>
        <div>
          <p className="my-0 text-xs">Points:</p>
          <h4 className="my-0 text-sm">
            {formatCompactNumber(activeUser.points || 0)}
            {" pts."}
          </h4>
          <p className="my-0 text-xs">Valid until:</p>
          <p
            className={clsx(
              !activeUser.points_expiry_date && "hidden",
              "my-0 text-xs font-bold",
            )}
          >
            {`${activeUser.points_expiry_date ? dateFormat(activeUser.points_expiry_date, dayDateMonthYear) : ""}`}
          </p>
        </div>
        <div className={clsx(!activeUser.voucher?.is_valid && "hidden")}>
          <p className="my-0 text-xs">10% off referral voucher:</p>
          <h4 className="mt-1 bg-black p-2 text-center text-sm font-bold text-white">
            {activeUser.voucher?.id}
          </h4>
          <p className="my-0 text-xs">
            *Apply this to any event of your choice.
          </p>
        </div>
      </div>
    </>
  );
}
