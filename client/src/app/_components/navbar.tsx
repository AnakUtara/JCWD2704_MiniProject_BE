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
import { useEffect } from "react";
import NavbarDropdown from "./navbar.dropdown";

export default function Navigation() {
  const activeUser = useAppSelector((s) => s.auth) as TUser;
  const { email } = activeUser;
  const pathname = usePathname();
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
          <NavbarDropdown
            activeUser={activeUser}
            email={email}
            refresh_token={refresh_token}
          />
        ) : (
          <div className="flex size-6 bg-black p-5 md:order-2" />
        )}
      </Navbar>
    </Flowbite>
  );
}
