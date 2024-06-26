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
import clsx from "clsx";

type Props = { activeUser: TUser; email: string; refresh_token: string };
export default function NavbarDropdown() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((s) => s.auth) as TUser;

  return (
    <div className={`flex md:order-2`}>
      <div className={`${!activeUser.id && "hidden"}`}>
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
          <Dropdown.Header
            className={clsx(
              !activeUser.voucher || !activeUser.voucher.is_valid
                ? "hidden"
                : "block",
            )}
          >
            <span className="block truncate">
              <p>10% Voucher:</p>
              <h2 className="mt-1 bg-black p-2 text-center font-bold text-white">
                {activeUser.voucher?.id}
              </h2>
            </span>
          </Dropdown.Header>
          <Dropdown.Header>
            <span className="block truncate">
              <p>Referral Code:</p>
              <h2 className="mt-1 bg-black p-2 text-center font-bold text-white">
                {activeUser.referral_code}
              </h2>
            </span>
          </Dropdown.Header>
          {activeUser.role === Role.promotor && (
            <>
              <Dropdown.Item as={Link} href="/event/create">
                Create Event
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                href="/dashboard?sort=desc&sort_by=created_at&page=1&type=month&month=6&year=2024"
              >
                Promotor Dashboard
              </Dropdown.Item>
            </>
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
      </div>
      <Navbar.Toggle />
    </div>
  );
}
