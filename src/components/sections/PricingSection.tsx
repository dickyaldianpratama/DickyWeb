"use client";

import React, { useState, useEffect } from "react";
import { pricingPlans } from "@/data/pricing";
import { TiltCard } from "../ui/TiltCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { formatRupiah } from "@/lib/utils";
import { createPackageWhatsAppLink } from "@/lib/whatsapp";
import { Check, Clock, MessageCircle, Download } from "lucide-react";
import { getActivePromo, getActivePromoFromCloud, DEFAULT_PROMO } from "@/lib/storage";
import { Modal } from "../ui/Modal";

export const PricingSection: React.FC = () => {
  const [isBrosurOpen, setIsBrosurOpen] = useState(false);
  const [promo, setPromo] = useState(DEFAULT_PROMO);

  useEffect(() => {
    const handleUpdate = () => {
      setPromo(getActivePromo());
    };
    queueMicrotask(handleUpdate);

    // Ambil promo terbaru dari Supabase Cloud
    getActivePromoFromCloud().then((cloudPromo) => {
      if (cloudPromo) setPromo(cloudPromo);
    });

    window.addEventListener("promo_updated", handleUpdate);
    return () => window.removeEventListener("promo_updated", handleUpdate);
  }, []);

  return (
    <section
      id="pricing"
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Seksi */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 sm:space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
            <span>Promo Terbatas & Diskon Spesial</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-poppins">
            Paket Investasi & Penawaran Spesial
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Transparan, tanpa biaya tersembunyi. Dapatkan website berkualitas premium dengan diskon
            eksklusif dan garansi perawatan penuh.
          </p>

          {/* Tombol Download Brosur Promo */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setIsBrosurOpen(true)}
              className="relative group inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs sm:text-sm font-bold font-poppins shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/35 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-300/40"
            >
              {/* Kilau Cahaya Shimmer Mengalir */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform ease-out pointer-events-none" />

              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Brosur</span>
            </button>
          </div>
        </div>

        {/* Grid Kartu Paket dengan Animasi Clean Floating & 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-2">
          {pricingPlans.map((plan, idx) => {
            const isRecommended =
              (promo.showRecommendedRibbon ?? true) &&
              (promo.recommendedPackageId || "professional") === plan.id;
            const ribbonText = promo.recommendedRibbonText || "REKOMENDASI";

            const waOrderUrl = createPackageWhatsAppLink(
              plan.name,
              formatRupiah(plan.discountedPrice)
            );

            // Staggered float delays for natural organic floating motion
            const floatDelays = [0, 0.6, 1.2];

            return (
              <TiltCard
                key={plan.id}
                enableTilt={true}
                enableFloating={true}
                floatDelay={floatDelays[idx % 3]}
                isPopular={plan.isPopular || isRecommended}
                className={`bg-white border flex flex-col justify-between p-5 sm:p-6 relative overflow-hidden rounded-2xl sm:rounded-3xl ${
                  isRecommended
                    ? "border-2 border-[#0e3b8c] bg-gradient-to-b from-blue-50/40 via-white to-white lg:-translate-y-2 ring-2 ring-blue-500/20 shadow-xl"
                    : plan.isPopular
                    ? "border-[#007DFE] bg-gradient-to-b from-blue-50/40 via-white to-white lg:-translate-y-2"
                    : "border-slate-200"
                }`}
              >
                {/* Stempel Pita Diagonal Rekomendasi di Pojok Kanan Atas */}
                {isRecommended && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-20">
                    <div className="absolute transform rotate-45 bg-[#0e3b8c] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-center py-1 w-44 -right-11 top-6 shadow-md border-y border-white/20 select-none">
                      {ribbonText}
                    </div>
                  </div>
                )}
                <div>
                  {/* Top Badges */}
                  <div className={`flex items-center justify-between gap-2 mb-3 ${isRecommended ? "pr-14" : ""}`}>
                    {plan.badge && (
                      <Badge
                        variant={plan.isPopular ? "gold" : "blue"}
                        size="sm"
                        className="font-bold tracking-wide"
                      >
                        {plan.badge}
                      </Badge>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3 text-blue-500" />
                      <span>{plan.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins mb-1.5">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-normal mb-3.5">
                    {plan.description}
                  </p>

                  {/* Price Block: Original Crossed-Out + Discounted Promo Price */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-100 mb-4 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 line-through">
                        {formatRupiah(plan.originalPrice)}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                        Hemat {plan.discountPercent}%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#007DFE] font-poppins">
                        {formatRupiah(plan.discountedPrice)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        / satu kali bayar
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-5">
                    <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider font-poppins mb-1.5">
                      Fasilitas Termasuk:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={waOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant={plan.isPopular ? "primary" : "outline"}
                      size="md"
                      className="w-full gap-2 text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {plan.buttonText}
                    </Button>
                  </a>
                  <p className="text-[10px] text-center text-slate-400 mt-1.5">
                    Konsultasi & konfirmasi slot via WhatsApp
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Modal Brosur Promo */}
      <Modal
        isOpen={isBrosurOpen}
        onClose={() => setIsBrosurOpen(false)}
        title={promo.title}
        tagline={promo.tagline}
        badge={promo.discountBadge}
        imageUrl={promo.brochureImageUrl}
      />
    </section>
  );
};
