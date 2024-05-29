import clsx from "clsx";
import { major_mono } from "../_utils/fonts";

type Props = { children: React.ReactNode; title: string };
export default function AuthFormHoc({ children, title = "Login" }: Props) {
  return (
    <div
      className={clsx(
        "prose grid min-h-screen max-w-full place-items-center p-5",
      )}
    >
      <div className="min-w-[240px] max-w-[480px]">
        <h1 className={clsx(major_mono.className, "mb-4 text-center")}>
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
