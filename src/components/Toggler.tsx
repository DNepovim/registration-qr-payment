import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends UseFormRegisterReturn {
  label?: string;
  description?: string;
}

export const Toggler = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => (
    <div className="flex items-center gap-4">
      {label}:
      <label
        className={`inline-flex cursor-pointer ${props.disabled ? "opacity-50" : ""}`}
      >
        <input className="peer sr-only" type="checkbox" ref={ref} {...props} />
        <div className="peer relative h-6 w-11 rounded-full bg-orange-950 bg-opacity-70 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-lime-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full" />
      </label>
    </div>
  ),
);
