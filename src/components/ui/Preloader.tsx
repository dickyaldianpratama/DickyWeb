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

              {/* Ikon Emblem Logo DickyWeb dengan Animasi Modern & Profesional */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, filter: "blur(6px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex items-center justify-center pointer-events-none"
              >
                {/* Aura Glowing Orb di Belakang Logo (Denyut Cahaya Hidup) */}
                <motion.div
                  animate={{
                    scale: [0.85, 1.25, 0.85],
                    opacity: [0.25, 0.65, 0.25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-[#007DFE]/30 to-[#00B4D8]/25 blur-lg pointer-events-none"
                />

                {/* Gelombang Echo Halus Memancar Keluar dari Logo */}
                <motion.div
                  animate={{
                    scale: [0.8, 1.55],
                    opacity: [0.45, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeOut",
                  }}
                  className="absolute w-12 h-12 rounded-full border border-blue-400/35 pointer-events-none"
                />

                {/* Wadah Floating & Breathing Emblem Logo (Murni Bulat, Bebas Elemen Kotak/Persegi) */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    scale: progress >= 100 ? [1, 1.08, 1.04] : [1, 1.03, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full"
                >
                  {/* Gambar Logo Beresolusi Tinggi Murni Tanpa Bingkai Persegi */}
                  <Image
                    src="/images/logo/dickyweb-icon.png"
                    alt="DickyWeb Icon"
                    width={56}
                    height={56}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10"
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

              {/* Teks Logo DickyWeb dengan Kilauan Cahaya (Light Shimmer) yang Mengikuti Bentuk Huruf */}
              <div className="mt-5 flex flex-col items-center select-none">
                <div className="relative inline-flex items-center justify-center">
                  {/* Base Text: Dicky (Dark Slate) + Web (Brand Blue) persis seperti di Logo Page User */}
                  <span className="font-extrabold tracking-tight font-poppins text-lg sm:text-xl text-slate-900">
                    Dicky<span className="text-[#007DFE]">Web</span>
                  </span>

                  {/* Kilauan Light Murni Berjalan dari Sudut Kiri ke Sudut Kanan Mengikuti Bentuk Huruf */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 font-extrabold tracking-tight font-poppins text-lg sm:text-xl pointer-events-none select-none"
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
                <span className="text-[9px] sm:text-[9.5px] font-semibold text-slate-400 tracking-[0.24em] uppercase font-poppins mt-0.5">
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
