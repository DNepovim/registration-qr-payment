import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends UseFormRegisterReturn,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "name" | "onBlur" | "onChange"
    > {
  label?: string;
  description?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, ...props }, ref) => (
    <label>
      {label}
      {description && (
        <>
          &nbsp;<span className="text-xs text-gray-700">({description})</span>
        </>
      )}
      :
      <input
        className={`focus-visible:outline-orange-9504 w-full rounded-md border-2 border-orange-950 border-opacity-70 bg-white bg-opacity-50 px-1 focus-visible:bg-opacity-100 ${error ? "border-red-500" : ""}`}
        {...props}
        ref={ref}
      />
      {error ? (
        <p className="m-0 mt-1 min-h-4 text-sm leading-4 text-red-500">
          {error}
        </p>
      ) : (
        <p className="m-0 mt-1 hidden min-h-4 text-sm leading-4 text-red-500 sm:block">
          &nbsp;
        </p>
      )}
    </label>
  ),
);
