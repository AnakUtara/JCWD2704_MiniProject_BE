import clsx from "clsx";
import Image from "next/image";
import { major_mono } from "../_utils/fonts";

type Props = {};
export default function AboutUs({}: Props) {
  return (
    <div className="mb-5 flex w-full flex-col items-center gap-5">
      <div className="flex h-[240px] w-full items-center justify-center bg-[url('/images/pexels-onismo-muhlanga-3613489-5470113.jpg')] bg-contain bg-fixed md:h-[400px] lg:bg-cover">
        <h2
          className={clsx(
            major_mono.className,
            "text-5xl text-white md:text-7xl",
          )}
        >
          LLAMS
        </h2>
      </div>
      <div className="prose">
        <blockquote>
          <p>
            We know how it feels. The itch to start something big starting from
            the smallest step possible.
          </p>
        </blockquote>
        <p className="text-justify">
          LLAMS stands for "Live Local And Make Music Small". We're a platform
          designed to empower independent musicians and promoters to take charge
          of their creative journeys. Our mission is to provide the tools and
          resources you need to organize intimate, manageable gigs and sell
          tickets directly to your fans. With LLAMS, you can ditch the complex
          event management and focus on what truly matters: sharing your music
          and connecting with your audience.
        </p>
      </div>
    </div>
  );
}
