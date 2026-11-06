import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "gold" | "slate" | "green" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "blue",
  size = "md",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center font-medium rounded-full tracking-wide transition-colors";

  const variants = {
    blue: "bg-blue-50 text-[#007DFE] border border-blue-200/60",
    gold: "bg-amber-50 text-amber-700 border border-amber-200/80 font-semibold",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    slate: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "border border-slate-300 text-slate-600 bg-transparent",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5",
    md: "text-xs px-3 py-1",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
