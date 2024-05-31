"use client";
import clsx from "clsx";
import { plex_mono } from "../_utils/fonts";

type Props = {
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  name: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bottomLabel?: string;
  autoComplete?: string;
  disabled?: boolean;
};
export default function IconTextInput({
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  bottomLabel,
  autoComplete,
  disabled = false,
}: Props) {
  return (
    <>
      <label
        className="input input-bordered flex items-center gap-2 rounded-none focus-within:outline-primary"
        htmlFor={name}
      >
        {icon}
        <input
          type={type}
          className={clsx(plex_mono.className, "grow border-0 focus:ring-0")}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
        />
      </label>
      <label className="form-control mb-5 h-3 w-full max-w-xs">
        <div className="label">
          <span className="label-text-alt text-nowrap text-red-700">
            {bottomLabel}
          </span>
        </div>
      </label>
    </>
  );
}
