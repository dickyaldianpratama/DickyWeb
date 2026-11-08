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
          {/* Ambient Radial Gradient Background (Persis seperti commit 5d2f364) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />

          {/* Soft Ambient Glow di Belakang Ikon (Sebaran Biru / Spread Keren) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-blue-500/12 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 bg-cyan-400/12 rounded-full blur-2xl pointer-events-none" />

          {/* Konten Utama: Bulatan Ikon Kompak, Modern & Bersih */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Bulatan: Ukuran Presisi dengan Circular SVG Progress Ring & Orbit Halus */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square shrink-0 flex items-center justify-center">
              {/* Micro-Orbit Ring Berputar Pelan di Luar Lingkaran (High-Tech Feel) */}
              <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed border-blue-400/25 pointer-events-none animate-[spin_24s_linear_infinite]" />

              {/* Halo Glow Ring Halus */}
              <div className="absolute inset-0 rounded-full bg-blue-500/8 blur-sm pointer-events-none" />

              {/* Circular SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10 overflow-visible"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="preloader-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007DFE" />
                    <stop offset="60%" stopColor="#00B4D8" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>

                {/* Track Lingkaran Latar Belakang (Transparan Biru Lembut) */}
                <circle
                  cx="50"
                  cy="50"
                  r={strokeRadius}
                  fill="none"
                  stroke="rgba(0, 125, 254, 0.12)"
                  strokeWidth="3"
                />

                {/* Active Circular Progress Stroke (Gradien Biru Terang & Bercahaya) */}
                <circle
                  cx="50"
                  cy="50"
                  r={strokeRadius}
                  fill="none"
                  stroke="url(#preloader-blue-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-75 ease-out drop-shadow-[0_0_8px_rgba(0,125,254,0.45)]"
                />
              </svg>

              {/* Ikon Emblem Logo DickyWeb dengan Sebaran Biru Hidup & 100% Bebas Elemen Kotak */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex items-center justify-center pointer-events-none"
              >
                {/* Sebaran Biru Murni Bulat Sempurna (Pure Radial Glow, Tanpa Kotak/Garis Kaku) */}
                <motion.div
                  animate={{
                    scale: [0.88, 1.2, 0.88],
                    opacity: [0.35, 0.75, 0.35],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,125,254,0.36)_0%,_rgba(0,180,216,0.2)_45%,_transparent_75%)] pointer-events-none"
                />

                {/* Gelombang Echo Halus Memancar Keluar dari Logo (Murni Bulat Melingkar) */}
                <motion.div
                  animate={{
                    scale: [0.75, 1.4],
                    opacity: [0.45, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full border border-blue-400/40 pointer-events-none"
                />

                {/* Wadah Floating & Breathing Emblem Logo (Murni Bulat, Bebas Elemen Kotak/Persegi) */}
                <motion.div
                  animate={{
                    y: [0, -2.5, 0],
                    scale: progress >= 100 ? [1, 1.07, 1.03] : [1, 1.03, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full"
                >
                  {/* Gambar Logo Beresolusi Tinggi Murni Tanpa Bingkai Persegi */}
                  <Image
                    src="/images/logo/dickyweb-icon.png"
                    alt="DickyWeb Icon"
                    width={48}
                    height={48}
                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain relative z-10 select-none drop-shadow-[0_2px_8px_rgba(0,125,254,0.3)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bagian Status & Progress Bar Ramping */}
            <div className="mt-5 w-44 sm:w-48 flex flex-col items-center">
              {/* Baris Status & Persentase */}
              <div className="w-full flex items-center justify-between text-xs px-0.5 mb-1.5">
                <span className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium tracking-tight truncate max-w-[75%]">
                  {progress < 35
                    ? "Menyiapkan sistem..."
                    : progress < 75
                    ? "Memuat komponen..."
                    : progress < 100
                    ? "Hampir siap..."
                    : "Selesai!"}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#007DFE] font-poppins tabular-nums shrink-0">
                  {progress}%
                </span>
              </div>

              {/* Progress Track: Ramping (h-1), Modern, & Minimalis */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden p-0 relative shadow-2xs">
                <div
                  className="h-full bg-gradient-to-r from-[#007DFE] via-[#00B4D8] to-[#007DFE] rounded-full transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(0,125,254,0.4)] relative overflow-hidden"
                  style={{ width: `${Math.max(progress, 3)}%` }}
                />
              </div>

              {/* Teks Logo DickyWeb dengan Kilauan Cahaya (Light Shimmer) yang Mengikuti Bentuk Huruf */}
              <div className="mt-4 flex flex-col items-center select-none">
                <div className="relative inline-flex items-center justify-center">
                  {/* Base Text: Dicky (Dark Slate) + Web (Brand Blue) persis seperti di Logo Page User */}
                  <span className="font-extrabold tracking-tight font-poppins text-base sm:text-lg text-slate-900">
                    Dicky<span className="text-[#007DFE]">Web</span>
                  </span>

                  {/* Kilauan Light Murni Berjalan dari Sudut Kiri ke Sudut Kanan Mengikuti Bentuk Huruf */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 font-extrabold tracking-tight font-poppins text-base sm:text-lg pointer-events-none select-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(115deg, transparent 0%, transparent 25%, rgba(255, 255, 255, 0.35) 38%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.35) 62%, transparent 75%, transparent 100%)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "130px 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    animate={{
                      backgroundPosition: ["-140px 0", "220px 0"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                      repeatDelay: 0.8,
                    }}
                  >
                    DickyWeb
                  </motion.span>
                </div>

                {/* Tagline Resmi DickyWeb */}
                <span className="text-[8.5px] sm:text-[9px] font-semibold text-slate-400 tracking-[0.24em] uppercase font-poppins mt-0.5">
                  Build • Innovate • Grow
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
