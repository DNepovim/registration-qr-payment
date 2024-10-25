import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends UseFormRegisterReturn {
  label?: string;
  description?: string;
}

export const Toggler = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => (
    <label className="inline-flex cursor-pointer items-center gap-4">
      {label}:
      <input className="peer sr-only" type="checkbox" ref={ref} {...props} />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
    </label>
  ),
);
