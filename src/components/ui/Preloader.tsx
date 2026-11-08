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
          {/* Ambient Soft Radial Gradient: Halus, Murni & Bebas Garis Kotak */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,125,254,0.06)_0%,_rgba(255,255,255,0.9)_55%,_#ffffff_100%)] pointer-events-none" />

          {/* ========================================================
              PERCIKAN & BRUSH WARNA BIRU TRANSPARAN (ARTISTIC BACKGROUND)
              ======================================================== */}
          {/* Sapuan Goresan Kuas Cat Air di Sudut Kiri Atas */}
          <div className="absolute -top-16 -left-16 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none select-none opacity-40">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
              <path
                d="M 20,80 C 70,30 140,25 210,65 C 280,105 295,170 260,230 C 220,290 145,280 85,240 C 25,200 -30,130 20,80 Z"
                fill="url(#cornerGradTop)"
              />
              <defs>
                <radialGradient id="cornerGradTop" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#007DFE" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#00B4D8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Sapuan Goresan Kuas Cat Air di Sudut Kanan Bawah */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none select-none opacity-35">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
              <path
                d="M 60,120 C 35,50 110,20 180,35 C 250,50 290,110 275,180 C 260,250 195,285 125,270 C 55,255 85,190 60,120 Z"
                fill="url(#cornerGradBottom)"
              />
              <defs>
                <radialGradient id="cornerGradBottom" cx="60%" cy="60%" r="70%">
                  <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.18" />
                  <stop offset="55%" stopColor="#007DFE" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#007DFE" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Klaster Kuas Artistik & Percikan Cat Air Biru Transparan di Pusat Loader */}
          <motion.div
            animate={{
              scale: [1, 1.025, 1],
              rotate: [-0.6, 0.6, -0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[430px] sm:h-[430px] pointer-events-none select-none z-0"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full overflow-visible"
              fill="none"
            >
              <defs>
                {/* Gradien Kuas Utama */}
                <linearGradient id="brushGradMain" x1="0%" y1="20%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#007DFE" stopOpacity="0" />
                  <stop offset="18%" stopColor="#007DFE" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#00B4D8" stopOpacity="0.25" />
                  <stop offset="82%" stopColor="#38BDF8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>

                {/* Gradien Kuas Sekunder Dinamis */}
                <linearGradient id="brushGradSecondary" x1="100%" y1="10%" x2="0%" y2="90%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                  <stop offset="25%" stopColor="#00B4D8" stopOpacity="0.16" />
                  <stop offset="65%" stopColor="#007DFE" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#007DFE" stopOpacity="0" />
                </linearGradient>

                {/* Gradien Radial untuk Sapuan Lembut di Belakang Emblem */}
                <radialGradient id="brushAuraRadial" cx="50%" cy="46%" r="55%">
                  <stop offset="0%" stopColor="#007DFE" stopOpacity="0.16" />
                  <stop offset="45%" stopColor="#00B4D8" stopOpacity="0.09" />
                  <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sapuan Cat Air Organik di Belakang Emblem Lingkaran */}
              <path
                d="M 130,170 C 110,130 170,105 215,115 C 265,125 305,150 295,195 C 285,240 240,265 190,255 C 145,245 155,210 130,170 Z"
                fill="url(#brushAuraRadial)"
              />

              {/* Sapuan Brush Utama 1 (Lengkung Horizontal Lebar Bertekstur Organik) */}
              <path
                d="M 45,175 C 85,150 135,155 190,168 C 245,180 305,165 365,145 C 335,172 285,195 230,190 C 175,185 115,205 45,175 Z"
                fill="url(#brushGradMain)"
              />

              {/* Sapuan Brush Sekunder 2 (Goresan Kuas Diagonal Dinamis) */}
              <path
                d="M 85,225 C 125,195 170,185 220,180 C 270,175 315,155 350,128 C 325,160 275,190 225,198 C 175,205 135,232 85,225 Z"
                fill="url(#brushGradSecondary)"
              />

              {/* Sapuan Kuas Halus Tambahan (Filament Whispers) */}
              <path
                d="M 110,145 C 150,135 195,140 240,150 C 285,160 325,152 355,140 C 320,155 280,165 235,158 C 190,150 150,148 110,145 Z"
                fill="#007DFE"
                fillOpacity="0.09"
              />

              {/* ========================================================
                  PERCIKAN CAT AIR (WATERCOLOR SPLATTERS & DROPLETS)
                  ======================================================== */}
              {/* Kelompok Percikan Kanan Atas (Dynamic Spray Outward) */}
              <circle cx="285" cy="118" r="4.5" fill="#007DFE" fillOpacity="0.28" />
              <circle cx="308" cy="102" r="3" fill="#00B4D8" fillOpacity="0.35" />
              <circle cx="326" cy="88" r="2.2" fill="#38BDF8" fillOpacity="0.4" />
              <circle cx="295" cy="140" r="2.2" fill="#007DFE" fillOpacity="0.24" />
              <circle cx="330" cy="115" r="2.8" fill="#00B4D8" fillOpacity="0.3" />
              <circle cx="348" cy="98" r="1.6" fill="#007DFE" fillOpacity="0.32" />

              {/* Kelompok Percikan Kiri Atas (Fine Droplets) */}
              <circle cx="120" cy="125" r="3.6" fill="#007DFE" fillOpacity="0.25" />
              <circle cx="98" cy="140" r="2.4" fill="#00B4D8" fillOpacity="0.32" />
              <circle cx="82" cy="158" r="1.8" fill="#38BDF8" fillOpacity="0.35" />

              {/* Kelompok Percikan Kiri Bawah (Bottom Left Splash) */}
              <circle cx="105" cy="245" r="4.2" fill="#007DFE" fillOpacity="0.28" />
              <circle cx="82" cy="265" r="3" fill="#00B4D8" fillOpacity="0.32" />
              <circle cx="68" cy="280" r="2" fill="#38BDF8" fillOpacity="0.3" />
              <circle cx="128" cy="270" r="2.4" fill="#007DFE" fillOpacity="0.22" />

              {/* Kelompok Percikan Kanan Bawah */}
              <circle cx="292" cy="235" r="3.4" fill="#00B4D8" fillOpacity="0.28" />
              <circle cx="316" cy="252" r="2.2" fill="#007DFE" fillOpacity="0.25" />
              <circle cx="278" cy="260" r="1.8" fill="#38BDF8" fillOpacity="0.3" />

              {/* Butiran Percikan Halus (Micro-droplet Speckles) */}
              <circle cx="160" cy="98" r="1.5" fill="#007DFE" fillOpacity="0.22" />
              <circle cx="245" cy="88" r="1.8" fill="#00B4D8" fillOpacity="0.28" />
              <circle cx="155" cy="275" r="1.6" fill="#38BDF8" fillOpacity="0.24" />
              <circle cx="250" cy="280" r="2" fill="#007DFE" fillOpacity="0.24" />

              {/* Cipratan Teardrop Organik */}
              <path
                d="M 312,128 C 318,124 322,130 318,134 C 314,138 308,132 312,128 Z"
                fill="#007DFE"
                fillOpacity="0.28"
              />
              <path
                d="M 92,238 C 88,244 96,248 98,242 C 100,236 94,232 92,238 Z"
                fill="#00B4D8"
                fillOpacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Konten Utama: Bulatan Ikon Kompak, Modern & Bersih */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Bulatan Utama: Ukuran Lebih Kompak & Ramping (Rasio Presisi 1:1) */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 aspect-square shrink-0 flex items-center justify-center">
              {/* Soft Circular Inner Backdrop (Lembut, Murni Bulat Sempurna Tanpa Kotak/Garis Kaku) */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-b from-blue-50/70 to-blue-50/20 border border-blue-100/40 pointer-events-none shadow-xs" />

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
