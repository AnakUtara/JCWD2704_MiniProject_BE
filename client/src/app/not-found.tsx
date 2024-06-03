import Link from "next/link";
import { major_mono, plex_mono } from "./_utils/fonts";
import clsx from "clsx";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh max-w-full place-items-center">
      <div className={clsx(plex_mono.className, "prose")}>
        <h2 className={clsx(major_mono.className)}>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link className="btn btn-error rounded-none text-white" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
