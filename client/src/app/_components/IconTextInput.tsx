"use client";
import clsx from "clsx";
import { plex_mono } from "../_utils/fonts";
import { FormikValues } from "formik";

type Props = {
  icon: React.ReactNode;
  htmlFor: string;
  type?: string;
  placeholder: string;
  name: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bottomLabel?: string;
  autoComplete?: string;
};
export default function IconTextInput({
  icon,
  htmlFor,
  type = "text",
  placeholder,
  name,
  id,
  value,
  onChange,
  bottomLabel,
  autoComplete,
}: Props) {
  return (
    <>
      <label
        className="input input-bordered flex items-center gap-2 rounded-none focus-within:outline-primary"
        htmlFor={htmlFor}
      >
        {icon}
        <input
          type={type}
          className={clsx(plex_mono.className, "grow")}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      </label>
      <label className="form-control mb-5 h-3 w-full max-w-xs">
        <div className="label">
          <span className="label-text-alt text-red-700">{bottomLabel}</span>
        </div>
      </label>
    </>
  );
}
