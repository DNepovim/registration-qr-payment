import { ButtonHTMLAttributes } from "react";

export const RemoveButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    {...props}
    className={`rounded-md border-2 border-red-400 text-red-400 ${className ?? ""}`}
  />
);
