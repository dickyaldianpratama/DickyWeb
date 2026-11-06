import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm transition-all duration-300",
        hoverEffect &&
          "hover:border-blue-300/80 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
