"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Jalankan timer progres loading dari 0% hingga 100% secara dinamis dan mulus
    const startTime = Date.now();
    const duration = 1400; // 1.4 detik: optimal, elegan, tidak terlalu lama

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);

      // Easing melambat di akhir (cubic ease out)
      const easedProgress = Math.round(
        100 * (1 - Math.pow(1 - rawProgress / 100, 2.5))
      );

      setProgress(easedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        // Beri jeda 250ms pada 100% agar user melihat status selesai
        setTimeout(() => {
          setIsDone(true);
        }, 250);
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
            filter: "blur(8px)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Ambient Radial Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />

          {/* Soft Blur Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-blue-400/12 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Konten Utama: Gabungan Logo DickyWeb & Animasi Loading */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Kartu Logo dengan Orbit Tech Rings */}
            <div className="relative flex items-center justify-center">
              {/* Ring Luar Putar Orbital 1 (Dashed Tech Ring) */}
              <div
                className="absolute -inset-5 sm:-inset-6 border border-dashed border-blue-300/40 pointer-events-none animate-[spin_16s_linear_infinite]"
                style={{ borderRadius: "2.5rem" }}
              />

              {/* Ring Luar Putar Orbital 2 (Accent Glow Ring Berlawanan Arah) */}
              <div
                className="absolute -inset-2.5 sm:-inset-3 border border-t-[#007DFE]/60 border-r-transparent border-b-[#00B4D8]/60 border-l-transparent pointer-events-none animate-[spin_8s_linear_infinite_reverse]"
                style={{ borderRadius: "2.25rem" }}
              />

              {/* Kartu Utama Logo DickyWeb */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-100/90 shadow-[0_16px_50px_rgba(0,125,254,0.12)] flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Efek Kilau Cahaya (Light Sheen / Glare Beam) Melintas */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                    repeatDelay: 0.6,
                  }}
                />

                {/* Logo DickyWeb dengan Efek Mengambang Lembut */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="relative w-44 sm:w-52 h-12 sm:h-14 flex items-center justify-center"
                >
                  <Image
                    src={siteConfig.logoUrl}
                    alt={siteConfig.brandName}
                    width={210}
                    height={55}
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Slogan Pill Badge */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007DFE] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 tracking-wider font-poppins">
                    {siteConfig.tagline}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bagian Progress Bar & Status Text */}
            <div className="mt-8 w-60 sm:w-72 flex flex-col items-center space-y-2.5">
              {/* Progress Track */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#007DFE] via-[#00B4D8] to-[#007DFE] rounded-full shadow-[0_0_12px_rgba(0,125,254,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Baris Status: Keterangan & Persentase */}
              <div className="w-full flex items-center justify-between text-xs px-0.5">
                <span className="text-slate-500 font-medium tracking-tight">
                  {progress < 35
                    ? "Menghubungkan layanan..."
                    : progress < 75
                    ? "Memuat komponen DickyWeb..."
                    : progress < 100
                    ? "Menyiapkan pengalaman..."
                    : "Selamat datang!"}
                </span>
                <span className="font-bold text-[#007DFE] font-poppins tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
