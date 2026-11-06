"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableFloating?: boolean;
  floatDelay?: number;
  isPopular?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  enableTilt = true,
  enableFloating = true,
  floatDelay = 0,
  isPopular = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high-end feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={
        enableFloating && !isHovered
          ? {
              y: [0, -10, 0],
              transition: {
                duration: 4.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: floatDelay,
              },
            }
          : undefined
      }
      style={{
        rotateX: enableTilt && isHovered ? rotateX : 0,
        rotateY: enableTilt && isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl transition-shadow duration-500 overflow-hidden",
        isPopular
          ? "ring-2 ring-[#007DFE] shadow-2xl shadow-blue-500/15"
          : "shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
