"use client";

import React, { useState } from "react";
import { BrochurePromoData } from "@/types/promo.types";
import { getActivePromo, saveActivePromo } from "@/lib/storage";
import { BrochureUploader } from "./BrochureUploader";
import { Button } from "../ui/Button";
import { Save, CheckCircle, Eye } from "lucide-react";
import { Modal } from "../ui/Modal";

export const PromoSettingForm: React.FC = () => {
  const [formData, setFormData] = useState<BrochurePromoData>(() => getActivePromo());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BrochurePromoData = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    const success = saveActivePromo(updated);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Bagian 1: Input Brosur Promo */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800 font-poppins">
          1. File Brosur / Flyer Promo
        </label>
        <p className="text-xs text-slate-500">
          Unggah file brosur promo dalam format JPG, PNG, WebP, atau animasi GIF.
        </p>
        <BrochureUploader
          currentImageUrl={formData.brochureImageUrl}
          onImageChange={(url) =>
            setFormData((prev) => ({ ...prev, brochureImageUrl: url }))
          }
        />
      </div>

      {/* Bagian 2: Stempel Pita Rekomendasi di Kartu Paket */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-bold text-slate-800 font-poppins">
              2. Stempel Pita Rekomendasi (Pojok Kartu Paket)
            </label>
            <p className="text-xs text-slate-500">
              Menampilkan pita diagonal di ujung kanan atas kartu paket seperti stempel rekomendasi resmi.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showRecommendedRibbon !== false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  showRecommendedRibbon: e.target.checked,
                }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007DFE]"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Paket yang Diberi Stempel
              </label>
              <select
                name="recommendedPackageId"
                value={formData.recommendedPackageId || "professional"}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE] bg-white cursor-pointer"
              >
                <option value="professional">Paket Bisnis Pro (Company Profile) - Rekomendasi</option>
                <option value="starter">Paket Starter (Landing Page)</option>
                <option value="enterprise">Paket E-Commerce / Custom Web</option>
                <option value="none">Tidak Ada (Nonaktifkan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teks Tulisan Stempel
              </label>
              <input
                type="text"
                name="recommendedRibbonText"
                value={formData.recommendedRibbonText || "REKOMENDASI"}
                onChange={handleChange}
                placeholder="Contoh: REKOMENDASI atau TERBAIK"
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE] font-bold uppercase tracking-wider"
              />
            </div>
          </div>

          {/* Live Mini Preview Kartu dengan Stempel */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-500 mb-3 self-start">
              Pratinjau Tampilan Ujung Kartu:
            </span>
            <div className="relative w-56 h-32 bg-white rounded-2xl border-2 border-[#0e3b8c] p-4 overflow-hidden shadow-sm">
              <div className="text-sm font-bold text-slate-900 font-poppins">
                {formData.recommendedPackageId === "starter"
                  ? "Paket Starter"
                  : formData.recommendedPackageId === "enterprise"
                  ? "Paket Custom"
                  : "Website Bisnis"}
              </div>
              <div className="text-xs text-slate-500 mt-1">Mulai dari Rp 2,4 jt</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-2">✓ Fitur Terlengkap</div>

              {formData.showRecommendedRibbon !== false && formData.recommendedPackageId !== "none" && (
                <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-10">
                  <div className="absolute transform rotate-45 bg-[#0e3b8c] text-white text-[9px] font-extrabold uppercase tracking-widest text-center py-1 w-40 -right-10 top-5 shadow-sm border-y border-white/20 select-none">
                    {formData.recommendedRibbonText || "REKOMENDASI"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Alert Saat Tersimpan */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan brosur & stempel rekomendasi berhasil disimpan! Website publik kini menampilkan pembaruan ini.</span>
        </div>
      )}

      {/* Tombol Simpan & Pratinjau */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4 text-[#007DFE]" />
          <span>Lihat Pratinjau Popup</span>
        </button>

        <Button type="submit" variant="primary" size="md" className="gap-2 shadow-md">
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </Button>
      </div>

      {/* Modal Preview */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={formData.title}
        tagline={formData.tagline}
        badge={formData.discountBadge}
        imageUrl={formData.brochureImageUrl}
      />
    </form>
  );
};
