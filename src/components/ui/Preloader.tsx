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
          {/* Ambient Soft Radial Gradient: Halus, Murni & Bersih */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,125,254,0.05)_0%,_rgba(255,255,255,0.95)_60%,_#ffffff_100%)] pointer-events-none" />

          {/* Konten Utama: Bulatan Ikon Kompak, Modern & Bersih */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Bulatan Utama: Ukuran Lebih Kompak & Ramping (Rasio Presisi 1:1) */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 aspect-square shrink-0 flex items-center justify-center">
              {/* Wadah Transparan Biru Tema Web DickyWeb (#007DFE) di Dalam Lingkaran */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-b from-[#007DFE]/15 via-[#007DFE]/8 to-[#00B4D8]/12 border border-[#007DFE]/25 shadow-[inset_0_0_12px_rgba(0,125,254,0.16)] pointer-events-none backdrop-blur-[1px]" />

              {/* Animasi Tambahan Clean 1: Aura Radial Berdenyut Halus di Dalam Lingkaran */}
              <motion.div
                animate={{
                  scale: [0.92, 1.05, 0.92],
                  opacity: [0.55, 0.95, 0.55],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeInOut",
                }}
                className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,125,254,0.22)_0%,_rgba(0,180,216,0.08)_65%,_transparent_100%)] pointer-events-none"
              />

              {/* Animasi Tambahan Clean 2: Riak Halus (Soft Clean Ripple) yang Mengembang Lembut */}
              <motion.div
                animate={{
                  scale: [0.65, 1.02],
                  opacity: [0.45, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeOut",
                }}
                className="absolute inset-1 rounded-full border border-[#007DFE]/35 pointer-events-none"
              />

              {/* Circular SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10 overflow-visible"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="preloader-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007DFE" />
                    <stop offset="50%" stopColor="#00B4D8" />
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

                {/* Active Circular Progress Stroke (Halus, Presisi, Anti-Garis Kaku) */}
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
                  className="transition-[stroke-dashoffset] duration-75 ease-out"
                />
              </svg>

              {/* Ikon Emblem Logo DickyWeb (Murni Mengapung Halus & Proporsional Ramping) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: progress >= 100 ? [1, 1.05, 1.02] : [1, 1.03, 1],
                  y: [0, -2, 0],
                  opacity: 1,
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                  opacity: { duration: 0.4 },
                }}
                className="relative z-20 flex items-center justify-center pointer-events-none"
              >
                {/* Gambar Logo Beresolusi Tinggi Murni Tanpa Bingkai Persegi */}
                <Image
                  src="/images/logo/dickyweb-icon.png"
                  alt="DickyWeb Icon"
                  width={44}
                  height={44}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain select-none"
                  priority
                />
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
