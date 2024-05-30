"use client"; // Error components must be Client Components

import clsx from "clsx";
import { useEffect } from "react";
import { major_mono, plex_mono } from "./_utils/fonts";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-dvh max-w-full place-items-center">
      <div className={clsx(plex_mono.className, "prose")}>
        <h2 className={clsx(major_mono.className)}>
          Oops... Something went wrong!
        </h2>
        <button
          className="btn btn-error rounded-none"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
