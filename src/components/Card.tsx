import React, { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className={`flex sm:min-h-96 flex-col justify-between rounded-lg border-4 border-dashed border-orange-950 border-opacity-50 py-2 px-4 sm:p-4 ${onClick ? "cursor-pointer" : ""}`}
  >
    {children}
  </div>
);
