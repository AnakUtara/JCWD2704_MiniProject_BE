"use client";
import { Avatar, Dropdown, Flowbite, Navbar } from "flowbite-react";
import clsx from "clsx";
import { major_mono } from "../_utils/fonts";
import { navItemTheme } from "../_libs/flowbite.theme";
import { getCookie } from "cookies-next";
import { handleVerification } from "../_utils/handlers";
import { FaCheckCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../_libs/redux/hooks";
import { Role, TUser } from "../_models/user.model";
import { formatCompactNumber } from "../_utils/formatter";
import Link from "next/link";
import { logout } from "../_libs/redux/features/auth/auth.slice";
import { date } from "../_libs/dayjs";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const activeUser = useAppSelector((s) => s.auth) as TUser;
  const { email } = activeUser;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const refresh_token = getCookie("refresh_token");
  const navLinks: { path: string; label: string }[] = [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore" },
    { path: "/sign-in", label: "Sign In" },
    { path: "/sign-up", label: "Sign Up" },
  ];
  navLinks.length = activeUser.username ? 2 : navLinks.length;
  return (
    <Flowbite theme={{ theme: navItemTheme }}>
      <Navbar
        fluid
        className={clsx(
          pathname === "/sign-in" ? "fixed" : "sticky",
          "top-0 w-full bg-black text-white",
        )}
      >
        <Navbar.Brand href="https://flowbite-react.com">
          <span
            className={clsx(
              major_mono.className,
              "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
            )}
          >
            LLAMS
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          {navLinks.map(({ path, label }, key) => (
            <Navbar.Link
              key={key}
              as={Link}
              href={path}
              active={pathname === path && true}
            >
              {label}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
        {refresh_token ? (
          <div className={" flex md:order-2"}>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
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
                      .map((name) =>
                        name.replace(name[0], name[0].toUpperCase()),
                      )
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
                <span className="badge badge-primary block truncate text-xs font-medium text-white">
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
                      <span className="block truncate text-xs">
                        Valid until:
                      </span>
                      <span className="block truncate text-xs font-bold">
                        {`${activeUser.points_expiry_date ? date(activeUser.points_expiry_date) : ""}`}
                      </span>
                    </>
                  ) : null}
                </div>
              </Dropdown.Header>
              {refresh_token && activeUser.role === Role.promotor && (
                <Dropdown.Item as={Link} href="/dashboard">
                  Promotor Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item>Purchase List</Dropdown.Item>
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
        ) : (
          <div className="flex size-6 bg-black p-5 md:order-2" />
        )}
      </Navbar>
    </Flowbite>
  );
}
