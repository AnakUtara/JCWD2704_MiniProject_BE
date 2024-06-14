"use client";

import { Flowbite, Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { footerCustomTheme } from "../_libs/flowbite.theme";
import clsx from "clsx";
import { major_mono } from "../_utils/fonts";
import Link from "next/link";

export default function LlamsFooter() {
  return (
    <Flowbite theme={{ theme: footerCustomTheme }}>
      <Footer container className="rounded-none">
        <div className="w-full text-white">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <span
                className={clsx(
                  major_mono.className,
                  "self-center whitespace-nowrap text-4xl font-semibold dark:text-white",
                )}
              >
                LLAMS
              </span>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="Company" />
                <Footer.LinkGroup col>
                  <Footer.Link as={Link} href="/">
                    Home
                  </Footer.Link>
                  <Footer.Link as={Link} href="/about-us">
                    About Us
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div
            className={clsx(
              major_mono.className,
              "w-full sm:flex sm:items-center sm:justify-between",
            )}
          >
            <Footer.Copyright
              href="/"
              by="LLAMS"
              year={new Date().getFullYear()}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </Flowbite>
  );
}
