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

          {/* Konten Utama: Animasi Logo Memantul di Lantai, Modern & Bersih */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Stage Animasi Logo Memantul di Lantai (3D Bouncing with Floor Shadow Physics) */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-end pb-2 select-none">
              {/* Ikon Logo Memantul dengan Efek Squash & Stretch Elastis */}
              <motion.div
                animate={{
                  y: [-38, 0, -38],
                  scaleX: [0.96, 1.15, 0.96],
                  scaleY: [1.04, 0.85, 1.04],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: ["easeIn", "easeOut"],
                  times: [0, 0.5, 1],
                }}
                className="relative z-20 flex items-center justify-center pointer-events-none"
              >
                <Image
                  src="/images/logo/dickyweb-icon.png"
                  alt="DickyWeb Icon"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain select-none drop-shadow-[0_4px_16px_rgba(0,125,254,0.35)]"
                  priority
                />
              </motion.div>

              {/* Bayangan di Lantai (Membesar & Menajam Saat Logo Menyentuh Lantai) */}
              <motion.div
                animate={{
                  scaleX: [0.55, 1.25, 0.55],
                  scaleY: [0.55, 1.15, 0.55],
                  opacity: [0.18, 0.65, 0.18],
                  filter: ["blur(4px)", "blur(1.5px)", "blur(4px)"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: ["easeIn", "easeOut"],
                  times: [0, 0.5, 1],
                }}
                className="w-12 h-2.5 sm:w-14 sm:h-3 rounded-[100%] bg-gradient-to-r from-[#007DFE]/40 via-slate-800/40 to-[#007DFE]/40 mt-1 pointer-events-none"
              />

              {/* Riak Kontak Lantai (Subtle Floor Impact Ripple Saat Logo Mendarat) */}
              <motion.div
                animate={{
                  scale: [0.7, 1.35, 0.7],
                  opacity: [0, 0.45, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: ["easeIn", "easeOut"],
                  times: [0, 0.5, 1],
                }}
                className="absolute bottom-2.5 w-14 h-3.5 rounded-[100%] border border-[#007DFE]/35 pointer-events-none"
              />
            </div>

            {/* Bagian Status & Progress Bar Ramping */}
            <div className="mt-4 w-48 sm:w-56 flex flex-col items-center">
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
