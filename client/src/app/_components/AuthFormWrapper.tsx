import clsx from "clsx";
import { major_mono } from "../_utils/fonts";

type Props = { children: React.ReactNode; title: string };
export default function AuthFormWrapper({ children, title = "Login" }: Props) {
  return (
    <div
      className={clsx(
        "prose grid min-h-screen max-w-full place-items-center p-5",
      )}
    >
      <center>
        <h1 className={clsx(major_mono.className, "mb-4")}>{title}</h1>
        {children}
      </center>
    </div>
  );
}
