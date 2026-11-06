"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Jalankan timer progres loading dari 0% hingga 100% dengan ritme sinematik dan berkelas
    const startTime = Date.now();
    const duration = 2800; // 2.8 detik untuk durasi progres yang pas, mantap, dan mudah dinikmati

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth cubic easeInOut agar di awal tidak melompat cepat dan ritme terasa natural
      const easedT =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const currentPercent = Math.min(100, Math.round(easedT * 100));
      setProgress(currentPercent);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        // Beri jeda 500ms pada 100% agar user puas melihat animasi selesai & teks "Selamat datang!"
        setTimeout(() => {
          setIsDone(true);
        }, 500);
      }
    }, 30);

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
            scale: 1.04,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Ambient Radial Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />

          {/* Soft Blur Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-blue-400/12 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Konten Utama: Bulatan Ikon DickyWeb & Animasi Loading */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Wadah Bulat Ikon dengan Orbit Tech Rings */}
            <div className="relative flex items-center justify-center">
              {/* Ring Luar Putar Orbital 1 (Dashed Circular Tech Ring) */}
              <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-blue-400/40 pointer-events-none animate-[spin_12s_linear_infinite]" />

              {/* Ring Luar Putar Orbital 2 (Accent Glow Ring Berlawanan Arah) */}
              <div className="absolute -inset-2 sm:-inset-2.5 rounded-full border-2 border-t-[#007DFE] border-r-transparent border-b-[#00B4D8] border-l-transparent pointer-events-none animate-[spin_6s_linear_infinite_reverse]" />

              {/* Bulatan Putih Bersih Khusus Ikon Logo DickyWeb (Tanpa Teks Tambahan) */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_12px_45px_rgba(0,125,254,0.18)] flex items-center justify-center overflow-hidden"
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

                {/* Ikon DickyWeb (Emblem Bersih, Jelas, & Beresolusi Tinggi) */}
                <motion.div
                  animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "easeInOut",
                  }}
                  className="relative w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] flex items-center justify-center z-10"
                >
                  <Image
                    src="/images/logo/dickyweb-icon.png"
                    alt="DickyWeb Icon"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain drop-shadow-sm"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bagian Progress Bar & Status Text (Tinggi Terkunci / Anti-Loncat) */}
            <div className="mt-8 w-64 sm:w-72 flex flex-col items-center">
              {/* Baris Status & Persentase (Fixed Height 20px agar tidak pernah loncat ke atas) */}
              <div className="w-full h-5 flex items-center justify-between text-xs px-0.5 mb-2.5">
                <span className="text-slate-500 font-medium tracking-tight truncate max-w-[75%]">
                  {progress < 30
                    ? "Memuat sistem..."
                    : progress < 70
                    ? "Memuat komponen..."
                    : progress < 100
                    ? "Hampir siap..."
                    : "Selesai!"}
                </span>
                <span className="font-bold text-[#007DFE] font-poppins tabular-nums shrink-0">
                  {progress}%
                </span>
              </div>

              {/* Progress Track: Tebal, Jelas, & Berjalan Horizontal dari 0% ke 100% */}
              <div className="w-full h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner relative">
                <div
                  className="h-full bg-gradient-to-r from-[#007DFE] via-[#00B4D8] to-[#007DFE] rounded-full transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(0,125,254,0.5)] relative overflow-hidden"
                  style={{ width: `${Math.max(progress, 2)}%` }}
                >
                  {/* Kilau Halus Melintas di Atas Warna Biru Loading yang Berjalan */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
