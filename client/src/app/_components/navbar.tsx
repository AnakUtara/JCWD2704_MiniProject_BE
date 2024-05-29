"use client";
import clsx from "clsx";
import { IoPersonCircle } from "react-icons/io5";
import { plex_mono } from "../_utils/fonts";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../_libs/redux/hooks";
import { logout } from "../_libs/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { TUser } from "../_models/user.model";

type Props = {};
export default function Navbar({}: Props) {
  const signedUser = useAppSelector((state) => state.auth) as TUser;
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <nav
      className={clsx(
        plex_mono.className,
        "navbar sticky top-0 justify-between bg-primary text-base-100",
      )}
    >
      <div>
        <a className="btn btn-ghost rounded-none text-xl">Logo</a>
      </div>
      <label className="input input-bordered mr-5 flex max-w-[640px] grow items-center gap-2 rounded-none text-black">
        <input type="text" className="grow" placeholder="Search" />
        <FaSearch />
      </label>
      <div className="justify-around gap-5">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {!signedUser?.id ? (
          <>
            <Link href="/sign-in" className="hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-in" className="hover:underline">
              Explore
            </Link>
            <Link href="/sign-up" className="hover:underline">
              About Us
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <IoPersonCircle className="size-10" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-none bg-neutral p-2 text-black shadow"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button
                    className="btn btn-link justify-start px-3 no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout());
                      alert("You've been logged out.");
                      router.push("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
