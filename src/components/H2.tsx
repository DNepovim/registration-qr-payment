import { PropsWithChildren } from "react";

interface H2Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export const H2: React.FC<H2Props> = ({ children, className, onClick }) => (
  <h2 className={`mb-2 mt-0 text-orange-950 ${className}`} onClick={onClick}>
    {children}
  </h2>
);
