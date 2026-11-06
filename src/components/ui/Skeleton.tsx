"use client";

import React from "react";
import { ImageIcon } from "lucide-react";

interface SkeletonProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "light",
}) => {
  const bgClass = variant === "dark" ? "bg-slate-800" : "bg-slate-200";
  const shimmerClass =
    variant === "dark"
      ? "from-transparent via-slate-700/40 to-transparent"
      : "from-transparent via-white/50 to-transparent";

  return (
    <div
      className={`relative overflow-hidden ${bgClass} ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-skeleton-shimmer {
          animation: skeleton-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      <div
        className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${shimmerClass} animate-skeleton-shimmer`}
      />
    </div>
  );
};

interface ImageSkeletonProps {
  className?: string;
  variant?: "light" | "dark";
  iconSize?: "sm" | "md" | "lg";
  text?: string;
  rounded?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  className = "",
  variant = "light",
  iconSize = "md",
  text,
  rounded = "rounded-2xl",
}) => {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-slate-900/90 border border-slate-800" : "bg-slate-100/90 border border-slate-200/60";
  const shimmerClass = isDark
    ? "from-transparent via-slate-700/25 to-transparent"
    : "from-transparent via-white/60 to-transparent";
  const iconColor = isDark ? "text-slate-700" : "text-slate-300";
  const textColor = isDark ? "text-slate-500" : "text-slate-400";

  const iconDimension =
    iconSize === "sm" ? "w-5 h-5" : iconSize === "lg" ? "w-10 h-10" : "w-7 h-7";

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center select-none ${bgClass} ${rounded} ${className}`}
      aria-hidden="true"
    >
      {/* Shimmer Light Sweeping Wave */}
      <div
        className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${shimmerClass} animate-skeleton-shimmer pointer-events-none z-0`}
      />

      {/* Subtle Glowing Pulse Icon & Text */}
      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center">
        <div className="relative flex items-center justify-center mb-1.5">
          <span
            className={`absolute -inset-2 rounded-full ${
              isDark ? "bg-blue-500/10" : "bg-blue-500/5"
            } animate-pulse pointer-events-none`}
            style={{ animationDuration: "2s" }}
          />
          <ImageIcon
            className={`${iconDimension} ${iconColor} stroke-[1.4] animate-pulse`}
            style={{ animationDuration: "2s" }}
          />
        </div>
        {text && (
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${textColor}`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};
