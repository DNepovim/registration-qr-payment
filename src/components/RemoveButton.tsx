import { ButtonHTMLAttributes } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export const RemoveButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    {...props}
    className={`flex items-center gap-1 rounded-md border-2 border-orange-950 border-opacity-50 bg-red-200 bg-opacity-20 px-4 text-orange-950 ${className ?? ""}`}
  >
    <FaRegTrashCan /> Odebrat
  </button>
);
