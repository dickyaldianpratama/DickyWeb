"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "../ui/Button";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { ArrowUpRight, MessageCircle, ImageIcon } from "lucide-react";
import {
  getActivePromo,
  DEFAULT_PROMO,
  getHeroCollage,
  getHeroCollageFromDB,
  DEFAULT_HERO_COLLAGE,
} from "@/lib/storage";
import { HeroCollageSlot } from "@/types/hero.types";
import { Modal } from "../ui/Modal";

const getSlotImageStyle = (slot?: HeroCollageSlot): React.CSSProperties => {
  const fit = slot?.imageFit || "cover";
  const posX = slot?.positionX ?? 50;
  const posY = slot?.positionY ?? 50;
  const scale = slot?.scale ?? 1;
  const rot = slot?.rotation ?? 0;
  const flip = slot?.flipHorizontal ? -1 : 1;

  return {
    objectFit: fit,
    objectPosition: `${posX}% ${posY}%`,
    transform: `scale(${scale * flip}, ${scale}) rotate(${rot}deg)`,
    transformOrigin: `${posX}% ${posY}%`,
  };
};

export const HeroSection: React.FC = () => {
  const [isBrosurModalOpen, setIsBrosurModalOpen] = useState(false);
  const [activePromo, setActivePromo] = useState(DEFAULT_PROMO);
  const [heroCollage, setHeroCollage] = useState<HeroCollageSlot[]>(DEFAULT_HERO_COLLAGE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const loadImages = () => {
      setIsMounted(true);
      const cached = getHeroCollage();
      if (cached && cached.some((s) => s.imageUrl)) {
        setHeroCollage(cached);
      }
      getHeroCollageFromDB().then((dbData) => {
        if (dbData && dbData.length === 4 && dbData.some((s) => s.imageUrl)) {
          setHeroCollage(dbData);
        }
      });
    };

    // Muat data storage secara asynchronous setelah hidrasi SSR selesai
    const timer = setTimeout(loadImages, 0);

    const handleUpdate = () => {
      setActivePromo(getActivePromo());
    };
    const handleHeroImagesUpdate = () => {
      getHeroCollageFromDB().then((dbData) => {
        if (dbData && dbData.length === 4) {
          setHeroCollage(dbData);
        } else {
          setHeroCollage(getHeroCollage());
        }
      });
    };

    window.addEventListener("promo_updated", handleUpdate);
    window.addEventListener("hero_images_updated", handleHeroImagesUpdate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("promo_updated", handleUpdate);
      window.removeEventListener("hero_images_updated", handleHeroImagesUpdate);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-16 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-28 right-1/4 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Kolom Kiri: Copywriting & Value Proposition (Sesuai Referensi Gambar) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tagline / Promo Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#007DFE] text-xs font-semibold tracking-wide border border-blue-200/50">
              <span>Jasa Pembuatan Website Modern #1 di Indonesia</span>
            </div>

            {/* Headline Utama */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-poppins">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007DFE] to-[#00b4d8]">
                Digital Solutions
              </span>{" "}
              for a Better Tomorrow
            </h1>

            {/* Deskripsi Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Kami membantu mentransformasikan bisnis Anda dengan website berkecepatan tinggi,
              estetika modern, dan arsitektur berkonversi tinggi untuk melejitkan penjualan serta
              kredibilitas brand Anda.
            </p>

            {/* Baris Statistik Responsif & Clean (Mobile-Optimized) */}
            <div className="max-w-lg">
              <div className="grid grid-cols-3 divide-x divide-slate-200/70 bg-white/80 sm:bg-slate-50/60 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/70 shadow-xs">
                {siteConfig.stats.slice(0, 3).map((item, idx) => {
                  const parts = item.value.split(" ");
                  const mainVal = parts[0];
                  const unitVal = parts.slice(1).join(" ");

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col justify-between ${
                        idx === 0
                          ? "pr-2 sm:pr-3"
                          : idx === 1
                          ? "px-2 sm:px-3"
                          : "pl-2 sm:pl-3"
                      }`}
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-poppins tracking-tight whitespace-nowrap">
                          {mainVal}
                        </span>
                        {unitVal && (
                          <span className="text-[11px] sm:text-xs font-bold text-[#007DFE] tracking-tight whitespace-nowrap">
                            {unitVal}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-1">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tombol Aksi Ganda (Contact Us Pill + Explore More ↗ + Brosur Promo) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="shadow-lg shadow-blue-500/25 gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </Button>
              </a>

              <a href="#services">
                <Button variant="outline" size="lg" className="gap-2">
                  Explore More
                  <ArrowUpRight className="w-4 h-4 text-[#007DFE]" />
                </Button>
              </a>

              {/* Tombol Lihat Brosur Promo (Eye-Catching) */}
              <button
                type="button"
                onClick={() => setIsBrosurModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 hover:from-amber-200 hover:to-orange-200 border border-amber-300 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Lihat Brosur Promo</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                  Baru
                </span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Kolase Gambar Asimetris (Sesuai Referensi Gambar Cognisys) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative max-w-md w-full">
              {/* Grid Kolase Asimetris */}
              <div className="grid grid-cols-2 gap-4" style={{ position: "relative" }}>
                {/* Gambar 1: Diskusi Tim (Kiri Besar) */}
                <div
                  className={`rounded-3xl overflow-hidden shadow-xl border-4 border-white group h-64 sm:h-72 transition-transform duration-300 hover:scale-[1.02] ${
                    heroCollage[0]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                  }`}
                  style={{ position: "relative" }}
                >
                  {!isMounted ? (
                    <div className="w-full h-full bg-slate-100" />
                  ) : heroCollage[0]?.imageUrl ? (
                    <Image
                      src={heroCollage[0].imageUrl}
                      alt={heroCollage[0].alt || "Foto 1"}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 180px, 220px"
                      style={getSlotImageStyle(heroCollage[0])}
                      className="transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                      <ImageIcon className="w-8 h-8 text-slate-300 stroke-1 mb-1" />
                      <span className="text-[11px] font-medium text-slate-400">Foto 1 (Kiri Atas)</span>
                    </div>
                  )}
                </div>

                {/* Gambar 2: Eksekutif/Profesional (Kanan Atas) */}
                <div
                  className={`rounded-3xl overflow-hidden shadow-xl border-4 border-white group h-32 sm:h-36 transition-transform duration-300 hover:scale-[1.02] ${
                    heroCollage[1]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                  }`}
                  style={{ position: "relative" }}
                >
                  {!isMounted ? (
                    <div className="w-full h-full bg-slate-100" />
                  ) : heroCollage[1]?.imageUrl ? (
                    <Image
                      src={heroCollage[1].imageUrl}
                      alt={heroCollage[1].alt || "Foto 2"}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 180px, 220px"
                      style={getSlotImageStyle(heroCollage[1])}
                      className="transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                      <ImageIcon className="w-6 h-6 text-slate-300 stroke-1 mb-0.5" />
                      <span className="text-[10px] font-medium text-slate-400">Foto 2 (Kanan Atas)</span>
                    </div>
                  )}
                </div>

                {/* Gambar 3: Konsultan/Tech Lead (Kiri Bawah) */}
                <div
                  className={`rounded-3xl overflow-hidden shadow-xl border-4 border-white group h-44 sm:h-52 -mt-6 transition-transform duration-300 hover:scale-[1.02] ${
                    heroCollage[2]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                  }`}
                  style={{ position: "relative" }}
                >
                  {!isMounted ? (
                    <div className="w-full h-full bg-slate-100" />
                  ) : heroCollage[2]?.imageUrl ? (
                    <Image
                      src={heroCollage[2].imageUrl}
                      alt={heroCollage[2].alt || "Foto 3"}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 180px, 220px"
                      style={getSlotImageStyle(heroCollage[2])}
                      className="transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                      <ImageIcon className="w-7 h-7 text-slate-300 stroke-1 mb-1" />
                      <span className="text-[10px] font-medium text-slate-400">Foto 3 (Kiri Bawah)</span>
                    </div>
                  )}
                </div>

                {/* Gambar 4: Pengembang Kode (Kanan Bawah) */}
                <div
                  className={`rounded-3xl overflow-hidden shadow-xl border-4 border-white group h-56 sm:h-64 -mt-20 transition-transform duration-300 hover:scale-[1.02] ${
                    heroCollage[3]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                  }`}
                  style={{ position: "relative" }}
                >
                  {!isMounted ? (
                    <div className="w-full h-full bg-slate-100" />
                  ) : heroCollage[3]?.imageUrl ? (
                    <Image
                      src={heroCollage[3].imageUrl}
                      alt={heroCollage[3].alt || "Foto 4"}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 180px, 220px"
                      style={getSlotImageStyle(heroCollage[3])}
                      className="transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                      <ImageIcon className="w-7 h-7 text-slate-300 stroke-1 mb-1" />
                      <span className="text-[10px] font-medium text-slate-400">Foto 4 (Kanan Bawah)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Badge Kecepatan di atas kolase (Terkunci stabil di pojok kanan bawah kolase) */}
              <div className="absolute -bottom-4 right-0 sm:-right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 shrink-0">
                {/* Bulatan Hijau Presisi: 99 Pas Ditengah, Petir di Sudut Kiri Atas */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-100/90 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-xs">
                  <span className="absolute top-1.5 left-2 text-[9px] sm:text-[10px] text-amber-500 font-bold leading-none select-none">
                    ⚡
                  </span>
                  <span className="text-sm sm:text-base font-black text-emerald-700 font-poppins leading-none text-center select-none pt-0.5">
                    99
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">PageSpeed Skor 99+</div>
                  <div className="text-[10px] text-slate-500 leading-tight">Performa Kilat & SEO Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Brosur Promo Popup */}
      <Modal
        isOpen={isBrosurModalOpen}
        onClose={() => setIsBrosurModalOpen(false)}
        title={activePromo.title}
        tagline={activePromo.tagline}
        badge={activePromo.discountBadge}
        imageUrl={activePromo.brochureImageUrl}
      />
    </section>
  );
};
