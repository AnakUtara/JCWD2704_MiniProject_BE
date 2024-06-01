import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { Role, TUser } from "../_models/user.model";
import clsx from "clsx";
import { handleVerification } from "../_utils/handlers";
import { FaCheckCircle } from "react-icons/fa";
import { formatCompactNumber } from "../_utils/formatter";
import { logout } from "../_libs/redux/features/auth/auth.slice";
import { useAppDispatch } from "../_libs/redux/hooks";
import { date } from "../_libs/dayjs";

type Props = { activeUser: TUser; email: string; refresh_token: string };
export default function NavbarDropdown({
  activeUser,
  email,
  refresh_token,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className={" flex md:order-2"}>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt={`${activeUser.username}'s avatar`}
            img={!activeUser.avatar ? "" : activeUser.avatar}
            rounded
          />
        }
      >
        <Dropdown.Header className="flex flex-col gap-1">
          <span className="block text-sm font-bold">
            {refresh_token &&
              activeUser.username &&
              activeUser?.username
                .split(" ")
                .map((name) => name.replace(name[0], name[0].toUpperCase()))
                .join(" ")}
          </span>
          <span className="flex items-center gap-2 text-xs">
            <FaCheckCircle
              className={clsx(
                activeUser.is_verified ? "text-success" : "text-zinc-600",
              )}
            />{" "}
            {activeUser.is_verified ? "Verified" : "Unverified"}
          </span>
          {!activeUser.is_verified && (
            <button
              type="button"
              className="btn btn-outline btn-accent btn-xs rounded-none  text-white"
              onClick={(e) => {
                e.preventDefault();
                handleVerification(email);
              }}
            >
              Verify account
            </button>
          )}
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
                  {`${activeUser.points_expiry_date ? date(activeUser.points_expiry_date) : ""}`}
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
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} href="/edit/profile">
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => dispatch(logout())}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
}
