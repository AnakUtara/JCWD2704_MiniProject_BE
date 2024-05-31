"use client";

import { Avatar, Dropdown, Flowbite, Navbar } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../_libs/redux/hooks";
import { getCookie } from "cookies-next";
import { redirect, usePathname } from "next/navigation";
import { logout } from "../_libs/redux/features/auth/auth.slice";
import Link from "next/link";
import { Role, TUser } from "../_models/user.model";
import { date } from "../_libs/dayjs";
import { formatCompactNumber } from "../_utils/formatter";
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import { handleVerification } from "../_utils/handlers";

type Props = {};
export default function NavbarDropdown({}: Props) {
  const activeUser = useAppSelector((s) => s.auth) as TUser;
  const { email } = activeUser;
  const refresh_token = getCookie("refresh_token");
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const navItems: { path: string; label: string }[] = [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore" },
    { path: "/sign-in", label: "Sign In" },
    { path: "/sign-up", label: "Sign Up" },
  ];
  return (
    <>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            !refresh_token ? null : !activeUser?.avatar ? (
              <Avatar rounded />
            ) : (
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            )
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-bold">
              {refresh_token &&
                activeUser.username &&
                activeUser?.username
                  .split(" ")
                  .map((name) => name.replace(name[0], name[0].toUpperCase()))
                  .join(" ")}
            </span>
            <Dropdown.Divider />
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
                className="btn btn-outline btn-accent btn-xs mt-1 rounded-none text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleVerification(email);
                }}
              >
                Verify account
              </button>
            )}
            <Dropdown.Divider />
            <span className="badge badge-primary block truncate text-sm font-medium text-white">
              {activeUser.role}
            </span>
            <span className="block truncate text-xs font-medium">
              {activeUser.email}
            </span>
            <Dropdown.Divider />
            <span className="block truncate text-xs">Points:</span>
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
          </Dropdown.Header>
          {refresh_token && activeUser.role === Role.promotor && (
            <Dropdown.Item as={Link} href="/dashboard">
              Promotor Dashboard
            </Dropdown.Item>
          )}
          <Dropdown.Item>Purchase List</Dropdown.Item>
          <Dropdown.Item>Edit Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => dispatch(logout())}>
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navItems
          .map(({ path, label }) => (
            <Navbar.Link href={path} active={pathname === path ? true : false}>
              {label}
            </Navbar.Link>
          ))
          .slice(0, !refresh_token ? navItems.length : 2)}
      </Navbar.Collapse>
    </>
  );
}
