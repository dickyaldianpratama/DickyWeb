"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Tag } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { getActivePromo, getActivePromoFromCloud, DEFAULT_PROMO } from "@/lib/storage";
import { BrochurePromoData } from "@/types/promo.types";
import { Modal } from "../ui/Modal";

const WA_ICON_SRC =
  "https://png.pngtree.com/png-clipart/20181003/ourmid/pngtree-whatsapp-social-media-icon-design-template-vector-whatsapp-logo-png-image_3654780.png";

export const FloatingCTA: React.FC = () => {
  const [promo, setPromo] = useState<BrochurePromoData>(DEFAULT_PROMO);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(false);

  useEffect(() => {
    // Load active promo
    const loadPromo = () => {
      setPromo(getActivePromo());
      getActivePromoFromCloud().then((cloudPromo) => {
        if (cloudPromo) setPromo(cloudPromo);
      });
    };
    loadPromo();

    // Listen for admin changes
    window.addEventListener("promo_updated", loadPromo);

    // Deteksi scroll: saat di atas (<= 200px), tombol promo masuk ke WA secara halus
    const handleScroll = () => {
      setIsPromoVisible(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("promo_updated", loadPromo);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Promo Brochure Pill: Masuk ke dalam WA saat scroll mencapai atas */}
        {promo.isActive && (
          <div
            className={`origin-bottom-right transition-all duration-500 ease-in-out ${
              isPromoVisible
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-8 sm:translate-y-10 scale-0 pointer-events-none"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer max-w-[200px] sm:max-w-xs"
              aria-label="Lihat Brosur Promo"
            >
              <div className="text-left text-xs">
                <span className="font-bold block line-clamp-1 text-[11px] sm:text-xs">
                  {promo.discountBadge || "Promo Spesial"}
                </span>
                <span className="text-[10px] text-amber-100 flex items-center gap-1 font-medium">
                  <Tag className="w-2.5 h-2.5 shrink-0" />
                  <span>Lihat Brosur</span>
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Floating WhatsApp CTA: Ukuran ringkas, tanpa titik bulat hijau, berdenyut pelan & mulus */}
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Chat WhatsApp dengan DickyWeb"
        >
          {/* Animasi Gelombang Berdenyut Pelan dan Mulus */}
          <span
            className="absolute inset-0 rounded-full bg-emerald-400/35 animate-ping pointer-events-none"
            style={{ animationDuration: "2.8s" }}
          />
          <span
            className="absolute -inset-1 rounded-full bg-emerald-500/15 animate-pulse pointer-events-none"
            style={{ animationDuration: "2.4s" }}
          />

          {/* Icon WA Bulat Baru dari URL Pengguna */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#25D366] shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WA_ICON_SRC}
              alt="WhatsApp DickyWeb"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(".wa-fallback");
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <MessageCircle className="wa-fallback hidden w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          {/* Hover Tooltip Ringkas */}
          <span className="absolute right-13 sm:right-15 px-2.5 py-1 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
            Konsultasi via WhatsApp
          </span>
        </a>
      </div>

      {/* Modal Brosur Promo Publik */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={promo.title}
        tagline={promo.tagline}
        badge={promo.discountBadge}
        imageUrl={promo.brochureImageUrl}
      />
    </>
  );
};
