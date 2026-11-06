"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Timer progres loading sinematik, halus & lebih responsif (2.1 detik)
    const startTime = Date.now();
    const duration = 2100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth cubic easeOut agar loading meluncur halus dan stabil
      const easedT = 1 - Math.pow(1 - t, 3);

      const currentPercent = Math.min(100, Math.round(easedT * 100));
      setProgress(currentPercent);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
        }, 350);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  // Nilai keliling lingkaran SVG untuk animasi circular progress ring
  const strokeRadius = 43;
  const circumference = 2 * Math.PI * strokeRadius; // ~270.17
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(12px)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Ambient Radial Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />

          {/* Soft Ambient Glow di Belakang Ikon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Konten Utama: Bulatan Ikon Kompak, Modern & Bersih */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Bulatan: Ukuran Kompak (w-24 h-24 / 96px) dengan Circular SVG Progress Ring */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Micro-Orbit Ring Berputar Pelan di Luar Lingkaran (High-Tech Feel) */}
              <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed border-blue-400/25 pointer-events-none animate-[spin_24s_linear_infinite]" />

              {/* Halo Glow Ring Halus */}
              <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-sm pointer-events-none" />

              {/* Circular SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="preloader-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007DFE" />
                    <stop offset="60%" stopColor="#00B4D8" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>

                {/* Track Lingkaran Latar Belakang */}
                <circle
                  cx="50"
                  cy="50"
                  r={strokeRadius}
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="3"
                />

                {/* Active Circular Progress Stroke */}
                <circle
                  cx="50"
                  cy="50"
                  r={strokeRadius}
                  fill="none"
                  stroke="url(#preloader-blue-grad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-75 ease-out"
                />
              </svg>

              {/* Bulatan Kartu Tengah Khusus Ikon Logo DickyWeb (Kompak & Bersih) */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgba(0,125,254,0.12)] flex items-center justify-center overflow-hidden z-20"
              >
                {/* Kilau Cahaya (Sheen Beam) Berulang Secara Halus */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                    repeatDelay: 0.8,
                  }}
                />

                {/* Ikon Emblem Logo DickyWeb */}
                <motion.div
                  animate={{ y: [0, -2, 0], scale: [1, 1.02, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.6,
                    ease: "easeInOut",
                  }}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10"
                >
                  <Image
                    src="/images/logo/dickyweb-icon.png"
                    alt="DickyWeb Icon"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain drop-shadow-2xs"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bagian Status & Progress Bar Ramping */}
            <div className="mt-6 w-48 sm:w-56 flex flex-col items-center">
              {/* Baris Status & Persentase */}
              <div className="w-full flex items-center justify-between text-xs px-0.5 mb-2">
                <span className="text-[11px] text-slate-500 font-medium tracking-tight truncate max-w-[75%]">
                  {progress < 35
                    ? "Menyiapkan sistem..."
                    : progress < 75
                    ? "Memuat komponen..."
                    : progress < 100
                    ? "Hampir siap..."
                    : "Selesai!"}
                </span>
                <span className="text-xs font-bold text-[#007DFE] font-poppins tabular-nums shrink-0">
                  {progress}%
                </span>
              </div>

              {/* Progress Track: Ramping (h-1.5), Modern, & Minimalis */}
              <div className="w-full h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden p-0 relative shadow-2xs">
                <div
                  className="h-full bg-gradient-to-r from-[#007DFE] via-[#00B4D8] to-[#007DFE] rounded-full transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(0,125,254,0.4)] relative overflow-hidden"
                  style={{ width: `${Math.max(progress, 3)}%` }}
                />
              </div>

              {/* Studio Pill Badge Eksklusif: Modern, Clean & Berkelas */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-[10.5px] text-slate-500 font-medium tracking-wide shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold text-slate-700">DickyWeb Studio</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">Fast Loading</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
