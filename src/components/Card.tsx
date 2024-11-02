import React, { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col justify-between rounded-lg border-4 border-dashed border-orange-950 border-opacity-50 px-4 py-2 sm:min-h-96 sm:p-4 ${onClick ? "cursor-pointer" : ""}`}
  >
    {children}
  </div>
);
