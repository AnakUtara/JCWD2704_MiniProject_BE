import { Flowbite, Navbar, NavbarBrand } from "flowbite-react";
import Image from "next/image";
import NavbarDropdown from "./navbar.dropdown";
import clsx from "clsx";
import { major_mono } from "../_utils/fonts";
import { navItemTheme } from "../_libs/flowbite.theme";

export default function Navigation() {
  return (
    <Flowbite theme={{ theme: navItemTheme }}>
      <Navbar fluid className="bg-black text-white">
        <NavbarBrand href="https://flowbite-react.com">
          {/* <Image
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
          <span
            className={clsx(
              major_mono.className,
              "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
            )}
          >
            LLAMS
          </span>
        </NavbarBrand>
        <NavbarDropdown />
      </Navbar>
    </Flowbite>
  );
}
