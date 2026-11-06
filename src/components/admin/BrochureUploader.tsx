"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import { compressImage } from "@/lib/imageCompression";

interface BrochureUploaderProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
}

export const BrochureUploader: React.FC<BrochureUploaderProps> = ({
  currentImageUrl,
  onImageChange,
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      alert("Harap pilih file gambar (PNG, JPG, WebP, atau GIF)!");
      return;
    }

    try {
      setIsCompressing(true);
      // Kompresi otomatis gambar brosur agar ringan (<150KB) dan tidak melebihi kuota penyimpanan
      const compressedDataUrl = await compressImage(file, 1400, 1800, 0.8);
      onImageChange(compressedDataUrl);
    } catch (err) {
      console.error("Gagal mengompresi gambar:", err);
      // Fallback FileReader standar jika kompresi gagal
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) onImageChange(result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === "upload"
              ? "bg-[#007DFE] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload File Gambar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === "url"
              ? "bg-[#007DFE] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Masukkan URL Gambar</span>
        </button>
      </div>

      {activeTab === "upload" ? (
        <div
          onClick={() => !isCompressing && fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#007DFE] bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={handleFileChange}
          />
          {isCompressing ? (
            <div className="py-2 flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-[#007DFE] animate-spin mb-2" />
              <p className="text-xs font-semibold text-slate-800">
                Memproses gambar...
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#007DFE] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Klik untuk memilih file brosur promo
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Mendukung format PNG, JPG, WebP, atau GIF animasi
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://domain.com/brosur-promo.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-[#007DFE] text-white text-xs font-semibold hover:bg-[#0066d1] transition-colors cursor-pointer"
          >
            Terapkan
          </button>
        </div>
      )}

      {/* Preview Gambar Brosur Saat Ini */}
      {currentImageUrl && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#007DFE]" />
            <span>Preview Brosur Aktif Saat Ini:</span>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-slate-100 max-h-64 bg-slate-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageUrl}
              alt="Preview Brosur"
              className="max-h-64 w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
