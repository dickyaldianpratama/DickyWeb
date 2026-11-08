"use client";

import React, { useEffect, useState } from "react";
import { X, Download, MessageCircle } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ImageSkeleton } from "./Skeleton";
import { createWhatsAppLink } from "@/lib/whatsapp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tagline?: string;
  badge?: string;
  imageUrl: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tagline,
  badge,
  imageUrl,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setIsImageLoaded(false);
      });
    }
  }, [isOpen, imageUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageUrl) return;

    // Jika berupa base64 DataURL (termasuk GIF / WebP / PNG)
    if (imageUrl.startsWith("data:")) {
      try {
        const parts = imageUrl.split(";base64,");
        const contentType = parts[0].split(":")[1] || "image/png";
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const blobUrl = URL.createObjectURL(blob);

        const ext = contentType.includes("gif")
          ? "gif"
          : contentType.includes("webp")
          ? "webp"
          : "png";

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `Brosur-Promo-DickyWeb.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
        return;
      } catch (err) {
        console.warn("Blob conversion failed, fallback ke direct link", err);
      }
    }

    // Direct image URL
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `Brosur-Promo-DickyWeb.png`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const waPromoUrl = createWhatsAppLink(
    `Halo DickyWeb, saya baru saja melihat Brosur Promo "${title}". Saya tertarik untuk klaim diskon promo ini untuk pembuatan website saya.`
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-slate-50/80 gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate font-poppins">
                {title}
              </h3>
              {badge && (
                <Badge variant="gold" size="sm" className="shrink-0">
                  {badge}
                </Badge>
              )}
            </div>
            {tagline && (
              <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">{tagline}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gambar Brosur */}
        <div className="overflow-y-auto p-3 sm:p-6 flex-1 flex flex-col items-center justify-center bg-slate-100/50 min-h-[300px] sm:min-h-[420px]">
          <div className="relative group max-w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
            {/* Skeleton Loading Shimmer saat gambar brosur di-load */}
            {!isImageLoaded && (
              <div className="w-[280px] sm:w-[380px] h-[360px] sm:h-[460px] max-w-full">
                <ImageSkeleton
                  variant="light"
                  rounded="rounded-2xl"
                  iconSize="lg"
                  text="Memuat Brosur Promo..."
                />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={title}
              onLoad={() => setIsImageLoaded(true)}
              className={`max-h-[50vh] sm:max-h-[58vh] w-auto max-w-full object-contain mx-auto transition-all duration-500 group-hover:scale-[1.01] ${
                isImageLoaded ? "opacity-100 block" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            />
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-2 text-center">
            Brosur penawaran resmi dari DickyWeb. Syarat & ketentuan berlaku.
          </p>
        </div>

        {/* Footer Tombol Aksi (Responsif Mobile & Desktop) */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2 justify-center py-2.5 sm:py-2 text-xs font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Brosur</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-500 py-2.5 sm:py-2 px-3 text-xs cursor-pointer"
            >
              Tutup
            </Button>
            <a
              href={waPromoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial"
            >
              <Button
                variant="primary"
                size="sm"
                className="w-full gap-2 justify-center py-2.5 sm:py-2 text-xs font-semibold shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Klaim Promo di WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
