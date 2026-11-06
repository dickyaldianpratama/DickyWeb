"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  isPill?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isPill = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-95";

    const variants = {
      primary:
        "bg-[#007DFE] hover:bg-[#0066d1] text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 focus:ring-[#007DFE]",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-700",
      outline:
        "border border-slate-300 hover:border-[#007DFE] text-slate-700 hover:text-[#007DFE] bg-white/80 hover:bg-blue-50/50 backdrop-blur-sm focus:ring-[#007DFE]",
      ghost:
        "text-slate-600 hover:text-[#007DFE] hover:bg-blue-50/50 focus:ring-blue-200",
      gold:
        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-orange-500/20 focus:ring-orange-400",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    };

    const radius = isPill ? "rounded-full" : "rounded-xl";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], radius, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
