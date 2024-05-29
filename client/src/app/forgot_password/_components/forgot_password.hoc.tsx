import { major_mono, plex_mono } from "@/app/_utils/fonts";
import clsx from "clsx";
import { title } from "process";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  paragraph: string;
};
export default function ForgotPasswordHoc({
  children,
  title,
  subtitle,
  paragraph,
}: Props) {
  return (
    <div
      className={clsx(
        plex_mono.className,
        "prose grid min-h-dvh max-w-full place-items-center p-5",
      )}
    >
      <div className="max-w-[640px]">
        <h1 className={clsx(major_mono.className)}>{title}</h1>
        <h4>{subtitle}</h4>
        <p>{paragraph}</p>
        {children}
      </div>
    </div>
  );
}
