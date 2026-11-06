"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HeroCollageSlot } from "@/types/hero.types";
import {
  getHeroCollage,
  getHeroCollageFromDB,
  saveHeroCollageAsync,
  DEFAULT_HERO_COLLAGE,
} from "@/lib/storage";
import { compressImage } from "@/lib/imageCompression";
import { Button } from "../ui/Button";
import {
  Upload,
  Link as LinkIcon,
  Pencil,
  CheckCircle,
  X,
  Loader2,
  Eye,
  ImageIcon,
  Save,
  RotateCw,
  FlipHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sliders,
  RotateCcw,
  Trash2,
} from "lucide-react";

export const getSlotImageStyle = (slot?: Partial<HeroCollageSlot>): React.CSSProperties => {
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

export const HeroImagesManager: React.FC = () => {
  const [slots, setSlots] = useState<HeroCollageSlot[]>(DEFAULT_HERO_COLLAGE);
  const [editingSlot, setEditingSlot] = useState<HeroCollageSlot | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parameter Tata Letak / Edit Foto (Android Style)
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover");
  const [scale, setScale] = useState<number>(1);
  const [positionX, setPositionX] = useState<number>(50);
  const [positionY, setPositionY] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [showGridGuide, setShowGridGuide] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const initial = getHeroCollage();
      if (initial && initial.some((s) => s.imageUrl)) {
        setSlots(initial);
      }
      getHeroCollageFromDB().then((dbData) => {
        if (dbData && dbData.length === 4) {
          setSlots(dbData);
        }
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const handleOpenEdit = (slot: HeroCollageSlot) => {
    setEditingSlot(slot);
    setAltInput(slot.alt);
    setPreviewImageUrl(slot.imageUrl);
    setUrlInput(slot.imageUrl.startsWith("data:") ? "" : slot.imageUrl);
    setImageFit(slot.imageFit || "cover");
    setScale(slot.scale ?? 1);
    setPositionX(slot.positionX ?? 50);
    setPositionY(slot.positionY ?? 50);
    setRotation(slot.rotation ?? 0);
    setFlipHorizontal(slot.flipHorizontal ?? false);
    setActiveTab("upload");
  };

  const handleCloseEdit = () => {
    setEditingSlot(null);
    setPreviewImageUrl("");
    setUrlInput("");
    setAltInput("");
    setScale(1);
    setPositionX(50);
    setPositionY(50);
    setRotation(0);
    setFlipHorizontal(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      alert("Harap pilih file gambar yang valid (JPG, PNG, WebP, atau GIF)!");
      return;
    }

    try {
      setIsCompressing(true);
      // Kompresi otomatis (GIF akan dipertahankan animasinya)
      const compressed = await compressImage(file, 1000, 1000, 0.82);
      setPreviewImageUrl(compressed);
    } catch (err) {
      console.error("Gagal kompresi:", err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) setPreviewImageUrl(res);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setPreviewImageUrl(urlInput.trim());
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlip = () => {
    setFlipHorizontal((prev) => !prev);
  };

  const handleResetLayout = () => {
    setImageFit("cover");
    setScale(1);
    setPositionX(50);
    setPositionY(50);
    setRotation(0);
    setFlipHorizontal(false);
  };

  const handleDeleteSlotImage = async (slotId: string, slotLabel: string) => {
    if (confirm(`Yakin ingin menghapus foto dari ${slotLabel}?`)) {
      const updated = slots.map((s) =>
        s.id === slotId
          ? {
              ...s,
              imageUrl: "",
              alt: "",
              imageFit: "cover" as const,
              scale: 1,
              positionX: 50,
              positionY: 50,
              rotation: 0,
              flipHorizontal: false,
            }
          : s
      );
      await saveHeroCollageAsync(updated);
      setSlots(updated);
      showNotification(`Foto dari ${slotLabel} telah dihapus.`);
    }
  };

  const handleClearAllImages = async () => {
    if (confirm("Kosongkan foto dari semua slot kolase hero?")) {
      const updated = slots.map((s) => ({
        ...s,
        imageUrl: "",
        alt: "",
        imageFit: "cover" as const,
        scale: 1,
        positionX: 50,
        positionY: 50,
        rotation: 0,
        flipHorizontal: false,
      }));
      await saveHeroCollageAsync(updated);
      setSlots(updated);
      showNotification("Semua foto kolase hero telah dikosongkan.");
    }
  };

  const handleSaveSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    try {
      setIsSaving(true);
      const finalImage = previewImageUrl.trim() || editingSlot.imageUrl;
      const finalAlt = altInput.trim() || editingSlot.alt;

      const updated = slots.map((s) =>
        s.id === editingSlot.id
          ? {
              ...s,
              imageUrl: finalImage,
              alt: finalAlt,
              imageFit,
              scale,
              positionX,
              positionY,
              rotation,
              flipHorizontal,
            }
          : s
      );

      const success = await saveHeroCollageAsync(updated);
      if (success) {
        setSlots(updated);
        showNotification(`${editingSlot.label} berhasil disimpan permanen! Foto tetap melekat saat reload.`);
        handleCloseEdit();
      } else {
        alert("Gagal menyimpan ke penyimpanan browser. Silakan coba kembali.");
      }
    } catch (err) {
      console.error("Gagal simpan slot:", err);
      alert("Terjadi kesalahan saat menyimpan foto.");
    } finally {
      setIsSaving(false);
    }
  };

  // Mendapatkan rasio aspek frame yang sesuai dengan slot aslinya
  const getSlotFrameClass = (slotId?: string) => {
    switch (slotId) {
      case "slot-1":
        return "aspect-[3/4.1] max-w-[240px]"; // Kiri Atas: Vertikal Tinggi
      case "slot-2":
        return "aspect-[16/10] max-w-[270px]"; // Kanan Atas: Kompak Landscape
      case "slot-3":
        return "aspect-[4/5] max-w-[240px]"; // Kiri Bawah: Sedang
      case "slot-4":
        return "aspect-[3/4] max-w-[240px]"; // Kanan Bawah: Vertikal Tinggi
      default:
        return "aspect-[3/4] max-w-[240px]";
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notifikasi Sukses */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast("")}
            className="text-emerald-600 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Seksi */}
      <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#007DFE] text-xs font-bold border border-blue-200/60 mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Kolase Asimetris Hero Banner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
            Kelola & Edit Posisi 4 Foto Hero
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ganti gambar, atur posisi horizontal/vertikal, zoom, rotasi, serta mode tampilan (Cover / Contain) agar gambar tampil sempurna.
          </p>
        </div>

        {slots.some((s) => s.imageUrl) && (
          <button
            type="button"
            onClick={handleClearAllImages}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors self-start sm:self-auto cursor-pointer"
            title="Kosongkan foto di semua slot"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Kosongkan Semua Foto</span>
          </button>
        )}
      </div>

      {/* Layout 2 Kolom: Kolom Kartu Slot & Kolom Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: 4 Kartu Slot Foto */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {slots.map((slot, index) => (
              <div
                key={slot.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Slot Header */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full font-poppins">
                      Slot #{index + 1}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {slot.positionDescription}
                    </span>
                  </div>

                  {/* Thumbnail Preview atau Box Kosong */}
                  {slot.imageUrl ? (
                    <div
                      className={`relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 mb-3 ${
                        slot.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                      }`}
                    >
                      <Image
                        src={slot.imageUrl}
                        alt={slot.alt || slot.label}
                        fill
                        unoptimized
                        style={getSlotImageStyle(slot)}
                        className="transition-transform duration-300"
                      />

                      {/* Badge Mode */}
                      <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded-md">
                        {slot.imageFit === "contain" ? "Contain (Full)" : "Cover (Penuh)"}
                        {slot.scale && slot.scale > 1 ? ` • ${Math.round(slot.scale * 100)}%` : ""}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-40 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 flex flex-col items-center justify-center p-3 text-slate-400 mb-3">
                      <ImageIcon className="w-8 h-8 text-slate-300 stroke-1 mb-1.5" />
                      <p className="text-xs font-bold text-slate-600">Belum Ada Foto / GIF</p>
                      <p className="text-[10px] text-slate-400 text-center mt-0.5">
                        Foto bawaan telah dihapus
                      </p>
                    </div>
                  )}

                  {/* Label & Alt */}
                  <h4 className="text-xs font-bold text-slate-900 font-poppins line-clamp-1">
                    {slot.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {slot.alt ? `Alt: ${slot.alt}` : "Keterangan foto belum diisi"}
                  </p>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(slot)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-[#007DFE] text-[#007DFE] hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>{slot.imageUrl ? "Ubah & Atur Posisi" : "+ Pasang Foto / GIF"}</span>
                  </button>

                  {slot.imageUrl && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlotImage(slot.id, slot.label)}
                      className="px-2.5 py-2 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Hapus foto dari slot ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Live Mini Pratinjau Kolase */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 p-5 rounded-3xl border border-slate-200 flex flex-col items-center">
          <div className="w-full flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Pratinjau Asli di Pengunjung</span>
            </div>
            <span className="text-[10px] text-slate-400">Real-Time Sync</span>
          </div>

          {/* Mini Asymmetrical Collage Mockup dengan Transform Nyata */}
          <div className="w-full max-w-xs relative bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Gambar 1: Kiri Besar */}
              <div
                className={`rounded-2xl overflow-hidden shadow-md border-2 border-white relative h-40 ${
                  slots[0]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                {slots[0]?.imageUrl ? (
                  <Image
                    src={slots[0].imageUrl}
                    alt={slots[0].alt || ""}
                    fill
                    unoptimized
                    style={getSlotImageStyle(slots[0])}
                    className="transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">#1 Kosong</span>
                  </div>
                )}
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                  #1
                </span>
              </div>

              {/* Gambar 2: Kanan Atas */}
              <div
                className={`rounded-2xl overflow-hidden shadow-md border-2 border-white relative h-20 ${
                  slots[1]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                {slots[1]?.imageUrl ? (
                  <Image
                    src={slots[1].imageUrl}
                    alt={slots[1].alt || ""}
                    fill
                    unoptimized
                    style={getSlotImageStyle(slots[1])}
                    className="transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-1 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                    <span className="text-[9px] font-bold text-slate-400">#2 Kosong</span>
                  </div>
                )}
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                  #2
                </span>
              </div>

              {/* Gambar 3: Kiri Bawah */}
              <div
                className={`rounded-2xl overflow-hidden shadow-md border-2 border-white relative h-28 -mt-4 ${
                  slots[2]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                {slots[2]?.imageUrl ? (
                  <Image
                    src={slots[2].imageUrl}
                    alt={slots[2].alt || ""}
                    fill
                    unoptimized
                    style={getSlotImageStyle(slots[2])}
                    className="transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-1 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                    <span className="text-[9px] font-bold text-slate-400">#3 Kosong</span>
                  </div>
                )}
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                  #3
                </span>
              </div>

              {/* Gambar 4: Kanan Bawah */}
              <div
                className={`rounded-2xl overflow-hidden shadow-md border-2 border-white relative h-36 -mt-12 ${
                  slots[3]?.imageFit === "contain" ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                {slots[3]?.imageUrl ? (
                  <Image
                    src={slots[3].imageUrl}
                    alt={slots[3].alt || ""}
                    fill
                    unoptimized
                    style={getSlotImageStyle(slots[3])}
                    className="transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-slate-300 bg-slate-50 border border-dashed border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">#4 Kosong</span>
                  </div>
                )}
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                  #4
                </span>
              </div>
            </div>

            {/* Floating Mini Badge Presisi: 99 Pas Ditengah Bulatan */}
            <div className="absolute -bottom-3 right-1 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2 shrink-0">
              <div className="relative w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200/80 flex items-center justify-center shrink-0">
                <span className="absolute top-0.5 left-1 text-[8px] leading-none text-amber-500 font-bold select-none">
                  ⚡
                </span>
                <span className="text-[11px] font-black text-emerald-700 font-poppins leading-none text-center select-none pt-0.5">
                  99
                </span>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-800 leading-tight">PageSpeed Skor 99+</div>
                <div className="text-[8px] text-slate-500 leading-tight">Performa Kilat & SEO</div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-4">
            Tampilan persis sesuai penataan grid asimetris di bagian paling atas website pengunjung.
          </p>
        </div>
      </div>

      {/* Modal Edit Foto Slot dengan Fitur Android Style Editor */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            {/* Header Dialog */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#007DFE] flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-poppins">
                    Ubah {editingSlot.label}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingSlot.positionDescription}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseEdit}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-6">
              {/* Tab Sumber Gambar: Upload vs URL */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("upload")}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "upload"
                        ? "bg-[#007DFE] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File Gambar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("url")}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "url"
                        ? "bg-[#007DFE] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Gunakan URL Gambar</span>
                  </button>
                </div>

                {/* Konten Tab Upload */}
                {activeTab === "upload" ? (
                  <div
                    onClick={() => !isCompressing && fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#007DFE] bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 group"
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
                        <Loader2 className="w-6 h-6 text-[#007DFE] animate-spin mb-1.5" />
                        <p className="text-xs text-slate-600 font-medium">
                          Memproses gambar...
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-[#007DFE] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-800">
                            Pilih file foto atau animasi GIF (PNG, JPG, WebP, GIF)
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Format gambar & animasi GIF didukung secara penuh
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Konten Tab URL */
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleApplyUrl}
                      className="text-xs shrink-0"
                    >
                      Terapkan URL
                    </Button>
                  </div>
                )}
              </div>

              {/* EDITOR TATA LETAK FOTO (ANDROID STYLE) & PRATINJAU LANGSUNG */}
              {previewImageUrl && (
                <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#007DFE]" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-poppins">
                        Editor Tata Letak Gambar (Android Style)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowGridGuide((prev) => !prev)}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          showGridGuide
                            ? "bg-blue-100 text-[#007DFE] border-blue-200"
                            : "bg-white text-slate-500 border-slate-200"
                        }`}
                        title="Tampilkan garis bantu komposisi foto"
                      >
                        Garis Bantu: {showGridGuide ? "ON" : "OFF"}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetLayout}
                        className="text-[10px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded border border-rose-200 inline-flex items-center gap-1 transition-colors cursor-pointer"
                        title="Kembalikan zoom, rotasi, dan posisi ke default tengah"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Reset Posisi</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Sisi Kiri: Frame Pratinjau Interaktif Slot Asli */}
                    <div className="md:col-span-5 flex flex-col items-center">
                      <div className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between w-full max-w-[240px]">
                        <span>Pratinjau Frame {editingSlot.id.toUpperCase()}:</span>
                        <span className="text-[10px] text-blue-600 font-mono">
                          {imageFit.toUpperCase()} • {Math.round(scale * 100)}%
                        </span>
                      </div>

                      {/* Frame Crop Aktual Sesuai Rasio Slot */}
                      <div
                        className={`relative w-full ${getSlotFrameClass(
                          editingSlot.id
                        )} rounded-2xl overflow-hidden shadow-lg border-4 border-white select-none ${
                          imageFit === "contain" ? "bg-slate-900" : "bg-slate-200"
                        }`}
                      >
                        <Image
                          src={previewImageUrl}
                          alt="Live Editor Preview"
                          fill
                          unoptimized
                          style={{
                            objectFit: imageFit,
                            objectPosition: `${positionX}% ${positionY}%`,
                            transform: `scale(${scale * (flipHorizontal ? -1 : 1)}, ${scale}) rotate(${rotation}deg)`,
                            transformOrigin: `${positionX}% ${positionY}%`,
                          }}
                          className="transition-transform duration-100"
                        />

                        {/* Garis Panduan Grid Komposisi (Rule of Thirds) */}
                        {showGridGuide && (
                          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/20">
                            <div className="border-r border-b border-white/25" />
                            <div className="border-r border-b border-white/25" />
                            <div className="border-b border-white/25" />
                            <div className="border-r border-b border-white/25" />
                            <div className="border-r border-b border-white/25" />
                            <div className="border-b border-white/25" />
                            <div className="border-r border-b border-white/25" />
                            <div className="border-r border-b border-white/25" />
                            <div />
                          </div>
                        )}

                        {/* Indikator Posisi Tengah Mini */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-md pointer-events-none">
                          X:{positionX}% Y:{positionY}%
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-2 text-center">
                        Rasio frame di atas identik 100% dengan tampilan di layar pengunjung.
                      </p>
                    </div>

                    {/* Sisi Kanan: Kontrol Slider & Alat Android */}
                    <div className="md:col-span-7 space-y-4">
                      {/* 1. Mode Fit (Penuh vs Utuh) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            1. Mode Tampilan Gambar:
                          </label>
                          <span className="text-[10px] text-blue-600 font-medium">
                            {imageFit === "cover" ? "Menempel Penuh ke Tepi" : "Utuh (Ada Celah Background)"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setImageFit("cover")}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              imageFit === "cover"
                                ? "bg-[#007DFE] text-white border-[#007DFE] shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Cover (Menempel Penuh)</span>
                            </div>
                            <span className="text-[9px] font-normal opacity-90 mt-0.5">
                              Melekat rapat tanpa celah background
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setImageFit("contain")}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              imageFit === "contain"
                                ? "bg-[#007DFE] text-white border-[#007DFE] shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Minimize2 className="w-3.5 h-3.5" />
                              <span>Contain (Ukuran Utuh)</span>
                            </div>
                            <span className="text-[9px] font-normal opacity-90 mt-0.5">
                              Gambar utuh (bisa ada celah tepi)
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* 2. Zoom / Ukuran Gambar (Scale) */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span className="flex items-center gap-1.5">
                            <ZoomIn className="w-3.5 h-3.5 text-blue-500" />
                            <span>2. Ukuran / Zoom Gambar:</span>
                          </span>
                          <span className="text-blue-600 font-mono font-bold">
                            {Math.round(scale * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setScale((prev) => Math.max(1, Number((prev - 0.1).toFixed(2))))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                            title="Zoom Out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="range"
                            min="1"
                            max="2.5"
                            step="0.05"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="flex-1 accent-[#007DFE] cursor-pointer"
                          />

                          <button
                            type="button"
                            onClick={() => setScale((prev) => Math.min(2.5, Number((prev + 0.1).toFixed(2))))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                            title="Zoom In"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* 3. Posisi Horizontal (X) */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>3. Posisi Horizontal (Kiri ↔ Kanan):</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {positionX < 40 ? "Kiri" : positionX > 60 ? "Kanan" : "Tengah"} ({positionX}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={positionX}
                            onChange={(e) => setPositionX(parseInt(e.target.value))}
                            className="flex-1 accent-[#007DFE] cursor-pointer"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPositionX(15)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Kiri
                            </button>
                            <button
                              type="button"
                              onClick={() => setPositionX(50)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Tengah
                            </button>
                            <button
                              type="button"
                              onClick={() => setPositionX(85)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Kanan
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 4. Posisi Vertikal (Y) */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>4. Posisi Vertikal (Atas ↕ Bawah):</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {positionY < 40 ? "Atas" : positionY > 60 ? "Bawah" : "Tengah"} ({positionY}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={positionY}
                            onChange={(e) => setPositionY(parseInt(e.target.value))}
                            className="flex-1 accent-[#007DFE] cursor-pointer"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPositionY(15)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Atas
                            </button>
                            <button
                              type="button"
                              onClick={() => setPositionY(50)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Tengah
                            </button>
                            <button
                              type="button"
                              onClick={() => setPositionY(85)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                              Bawah
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 5. Transform Android: Rotasi 90° & Cermin (Flip) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          5. Alat Transformasi Tambahan:
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={handleRotate}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                            title="Putar gambar 90 derajat searah jarum jam"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                            <span>Putar 90° ({rotation}°)</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleFlip}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                              flipHorizontal
                                ? "bg-blue-100 border-blue-300 text-[#007DFE]"
                                : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                            }`}
                            title="Cermin / Balik gambar secara horizontal"
                          >
                            <FlipHorizontal className="w-3.5 h-3.5 text-blue-600" />
                            <span>Cermin Horizontal</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Keterangan / Alt Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keterangan / Alt Text Foto
                </label>
                <input
                  type="text"
                  value={altInput}
                  onChange={(e) => setAltInput(e.target.value)}
                  placeholder="Contoh: Tim Diskusi DickyWeb"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                />
              </div>

              {/* Tombol Aksi Dialog */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseEdit}
                  className="text-slate-500"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSaving}
                  className="gap-2 shadow-sm font-semibold"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan ke Storage...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan Foto</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
