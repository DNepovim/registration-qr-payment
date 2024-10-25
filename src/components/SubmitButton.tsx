import { ButtonHTMLAttributes } from "react";

export const SubmitButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    {...props}
    className={`rounded-md bg-orange-950 px-4 py-2 text-white ${className ?? ""}`}
  />
);
