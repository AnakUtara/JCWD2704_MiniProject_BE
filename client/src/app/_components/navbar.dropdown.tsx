import { Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { Role, TUser } from "../_models/user.model";
import { capitalize, formatCompactNumber } from "../_utils/formatter";
import { logout } from "../_libs/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../_libs/redux/hooks";
import { dateFormat, dayDateMonthYear } from "../_libs/dayjs";
import UserAvatar from "./ui/user.avatar";
import VerifiedBadge from "./ui/verified.badge";
import { toast } from "sonner";

type Props = { activeUser: TUser; email: string; refresh_token: string };
export default function NavbarDropdown() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((s) => s.auth) as TUser;

  return (
    <div className={`flex md:order-2 ${!activeUser.id && "hidden"}`}>
      <Dropdown
        arrowIcon={false}
        inline
        label={<UserAvatar user={activeUser} />}
      >
        <Dropdown.Header className="flex flex-col gap-1">
          <span className="block text-sm font-bold">
            {capitalize(activeUser.username)}
          </span>
          <VerifiedBadge user={activeUser} email={activeUser.email} />
          <span className="badge badge-accent block truncate text-xs font-medium text-white">
            {activeUser.role}
          </span>
          <span className="block truncate text-xs font-medium">
            {activeUser.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Header>
          <div>
            <span className="block truncate">Points:</span>
            <span className="block truncate font-bold">
              {formatCompactNumber(activeUser.points || 0)}
              {" pts."}
            </span>
            {activeUser.points ? (
              <>
                <span className="block truncate text-xs">Valid until:</span>
                <span className="block truncate text-xs font-bold">
                  {`${activeUser.points_expiry_date ? dateFormat(activeUser.points_expiry_date, dayDateMonthYear) : ""}`}
                </span>
              </>
            ) : null}
          </div>
        </Dropdown.Header>
        <Dropdown.Header>
          <span className="block truncate">
            <p>Referral Code:</p>
            <h2 className="mt-1 bg-black p-2 text-center font-bold text-white">
              {activeUser.referral_code}
            </h2>
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
          </span>
        </Dropdown.Header>
        {activeUser.role === Role.promotor && (
          <Dropdown.Item as={Link} href="/dashboard">
            Promotor Dashboard
          </Dropdown.Item>
        )}
        <Dropdown.Item
          as={Link}
          href="/profile?sort=desc&sort_by=created_at&page=1"
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            dispatch(logout());
            toast.success("Signed Out.");
            window.location.reload();
          }}
        >
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
}
