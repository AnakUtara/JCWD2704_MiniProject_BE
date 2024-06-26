"use client";
import { Flowbite, Navbar } from "flowbite-react";
import clsx from "clsx";
import { major_mono } from "../_utils/fonts";
import { navItemTheme } from "../_libs/flowbite.theme";
import { useAppSelector } from "../_libs/redux/hooks";
import { TUser } from "../_models/user.model";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarDropdown from "./navbar.dropdown";

export default function Navigation() {
  const activeUser = useAppSelector((s) => s.auth) as TUser;
  const pathname = usePathname();
  // const refresh_token = getCookie("refresh_token");
  const navLinks: { path: string; label: string }[] = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
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
          "top-0 z-50 w-full bg-black text-white",
        )}
      >
        <Navbar.Brand href="/">
          <span
            className={clsx(
              major_mono.className,
              "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
            )}
          >
            LLAMS
          </span>
        </Navbar.Brand>
        <NavbarDropdown />
        {/* <div
          className={`flex size-6 bg-black p-5 md:order-2 ${activeUser.id && "hidden"}`}
        /> */}
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
      </Navbar>
    </Flowbite>
  );
}
