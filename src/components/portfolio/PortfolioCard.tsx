"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { PortfolioItem } from "@/types/portfolio.types";
import { ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  item: PortfolioItem;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Posisi mouse ternormalisasi (-0.5 hingga 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics yang luwes, lentur, dan sangat mulus (tidak kaku & bebas getar)
  const springConfig = { damping: 20, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Animasi 3D tilt yang halus & proporsional (subtle luxury feel)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["3.5deg", "-3.5deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-4.5deg", "4.5deg"]);

  // Glare / Kilau pantulan cahaya mengikuti kursor secara dinamis
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["15%", "85%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["15%", "85%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.16), transparent 70%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Identifikasi link tujuan direct URL
  const isCoffeeItem =
    item.id === "kopi-senja" ||
    item.title.toLowerCase().includes("coffee") ||
    item.title.toLowerCase().includes("coffe") ||
    item.title.toLowerCase().includes("kopi");

  const rawUrl = item.liveUrl || item.detailUrl || "";
  const detailUrl =
    rawUrl && !rawUrl.includes("rcsdigitalmandiri.id")
      ? rawUrl
      : isCoffeeItem
      ? "https://kopikenangan.com"
      : "";

  // Pengaturan tampilan gambar yang dikontrol admin (Fit & Position)
  const imageFit = item.imageFit || "cover";
  const imagePosition = item.imagePosition || "top";
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    imagePosition === "center"
      ? "object-center"
      : imagePosition === "bottom"
      ? "object-bottom"
      : "object-top";

  const handleCardClick = () => {
    if (detailUrl) {
      window.open(detailUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (detailUrl) {
      window.open(detailUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="group relative w-full select-none"
    >
      {/* Curved Ambient Shadow:
          Ditempatkan di luar elemen 3D agar sudut membulat (border-radius) 100% terjaga
          dan TIDAK menimbulkan proyeksi bayangan kotak kaku 90 derajat di browser saat kartu dimiringkan */}
      <div
        className={`absolute inset-1 sm:inset-1.5 rounded-2xl sm:rounded-3xl pointer-events-none transition-all duration-300 -z-10 ${
          isHovered
            ? "bg-slate-900/15 blur-xl opacity-100 scale-[1.015]"
            : "bg-slate-950/5 blur-md opacity-25 scale-100"
        }`}
        aria-hidden="true"
      />

      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleCardClick}
        style={{
          rotateX,
          rotateY,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: "1.25rem",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
          isolation: "isolate",
        }}
        animate={{
          scale: isHovered ? 1.018 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.5,
        }}
        className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/80 hover:border-blue-400/50 transition-colors duration-300"
      >
        {/* WADAH GAMBAR: Mengikuti pengaturan imageFit & imagePosition dari Admin */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl sm:rounded-3xl ${
            imageFit === "contain" ? "p-2 sm:p-3 flex items-center justify-center bg-slate-950" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={95}
            className={`${fitClass} ${positionClass} w-full h-full transition-transform duration-500 ease-out`}
            style={{
              transform: isHovered ? "scale(1.04)" : "scale(1)",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            priority={item.id === "kitchen-set-ruangruma"}
          />
        </div>

        {/* Dynamic Light Sheen / Kilau Pantulan Halus */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Overlay Gradien Gelap Lembut di Bawah (~35% saja) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-35% to-transparent pointer-events-none z-10" />

        {/* KONTEN BAWAH KARTU: Glassmorphism Badge Kategori, Judul, & Tombol Bulat */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end justify-between gap-2.5 z-20">
          {/* Sisi Kiri: Glassmorphism Badge Kategori & Judul Proyek */}
          <div className="space-y-1 max-w-[85%] min-w-0 pointer-events-none">
            {/* Pill Badge Kategori Glassmorphism (efek kaca tembus pandang, background gambar terlihat) */}
            <div className="inline-flex items-center">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                {item.category || "WEBSITE"}
              </span>
            </div>

            {/* Judul Proyek: Clean, proporsional, elegan */}
            <h3 className="text-xs sm:text-sm font-bold text-white font-poppins leading-snug tracking-tight drop-shadow-sm line-clamp-1 sm:line-clamp-2">
              {item.title}
            </h3>
          </div>

          {/* Sisi Kanan: Tanda Bulat Direct URL (Aktif bisa diklik) */}
          <button
            type="button"
            onClick={handleButtonClick}
            aria-label={`Buka website ${item.title}`}
            title={detailUrl ? `Buka direct link ${item.title}` : item.title}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-md text-[#007DFE] hover:bg-slate-50 hover:scale-110 active:scale-90 transition-all duration-200 shrink-0 cursor-pointer pointer-events-auto z-30 ${
              isHovered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-1.5 pointer-events-none"
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4] text-[#007DFE] group-hover:scale-105 transition-transform pointer-events-none" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
