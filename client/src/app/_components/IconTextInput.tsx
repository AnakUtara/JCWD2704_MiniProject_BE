import clsx from "clsx";
import { plex_mono } from "../_utils/fonts";

type Props = {
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bottomLabel?: string;
};
export default function IconTextInput({
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  bottomLabel,
}: Props) {
  return (
    <>
      <label className="input input-bordered focus-within:outline-primary flex items-center gap-2 rounded-none">
        {icon}
        <input
          type={type}
          className={clsx(plex_mono.className, "grow")}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text-alt">tesst</span>
        </div>
      </label>
    </>
  );
}
