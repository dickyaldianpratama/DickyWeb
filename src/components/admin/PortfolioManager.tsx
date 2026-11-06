"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio.types";
import {
  getPortfolioList,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "@/lib/storage";
import { Button } from "../ui/Button";
import { compressImage } from "@/lib/imageCompression";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Upload,
  Link as LinkIcon,
  CheckCircle,
  X,
  Loader2,
  ExternalLink,
  Sliders,
  Maximize2,
  Minimize2,
  ArrowUpRight,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "WEBSITE",
  "Company Profile",
  "Toko Online",
  "Landing Page",
  "Web App",
] as const;

export const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [successToast, setSuccessToast] = useState("");

  // Form State: Judul, Kategori, Direct URL, Gambar, & Tools Pengaturan Tampilan Gambar
  const [formData, setFormData] = useState({
    title: "",
    category: "WEBSITE",
    image: "",
    liveUrl: "",
    imageFit: "cover" as "cover" | "contain",
    imagePosition: "top" as "top" | "center" | "bottom",
  });

  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getPortfolioList());
    };
    queueMicrotask(handleUpdate);

    window.addEventListener("portfolio_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_updated", handleUpdate);
  }, []);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  // Buka modal untuk Tambah Baru
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "WEBSITE",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "",
      imageFit: "cover",
      imagePosition: "top",
    });
    setIsModalOpen(true);
  };

  // Buka modal untuk Edit
  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      liveUrl: item.liveUrl || "",
      imageFit: item.imageFit || "cover",
      imagePosition: item.imagePosition || "top",
    });
    setIsModalOpen(true);
  };

  // Upload file gambar dari komputer dengan kompresi otomatis
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith(".gif")) {
      alert("Harap pilih file gambar yang valid (JPG, PNG, WebP, GIF)!");
      return;
    }

    try {
      setIsCompressing(true);
      // Kompresi resolusi Full HD (1600x1000) dengan kualitas tinggi (0.85)
      const compressedDataUrl = await compressImage(file, 1600, 1000, 0.85);
      setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
    } catch (err) {
      console.error("Gagal kompresi gambar:", err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFormData((prev) => ({ ...prev, image: dataUrl }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  // Submit Simpan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.image.trim()) {
      alert("Judul proyek dan gambar wajib diisi!");
      return;
    }

    const payload: PortfolioItem = {
      id: editingItem ? editingItem.id : `proyek-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category.trim() || "WEBSITE",
      image: formData.image.trim(),
      imageFit: formData.imageFit,
      imagePosition: formData.imagePosition,
      client: editingItem ? editingItem.client : formData.title.trim(),
      description: editingItem ? editingItem.description : "",
      techStack: editingItem ? editingItem.techStack : ["Website"],
      metrics: editingItem ? editingItem.metrics : "",
      liveUrl: formData.liveUrl.trim(),
    };

    if (editingItem) {
      const success = updatePortfolioItem(payload);
      if (success) {
        showNotification(`Proyek "${payload.title}" berhasil diperbarui!`);
        setIsModalOpen(false);
      } else {
        alert(
          "Penyimpanan browser penuh! Harap gunakan file gambar yang lebih kecil atau gunakan URL gambar."
        );
      }
    } else {
      const success = addPortfolioItem(payload);
      if (success) {
        showNotification(`Proyek "${payload.title}" berhasil ditambahkan!`);
        setIsModalOpen(false);
      } else {
        alert(
          "Penyimpanan browser penuh! Harap gunakan file gambar yang lebih kecil atau gunakan URL gambar."
        );
      }
    }
  };

  // Hapus
  const handleDelete = (item: PortfolioItem) => {
    if (confirm(`Yakin ingin menghapus proyek "${item.title}"?`)) {
      const success = deletePortfolioItem(item.id);
      if (success) {
        showNotification(`Proyek "${item.title}" telah dihapus.`);
      }
    }
  };

  // Filter items
  const filtered = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notifikasi Sukses */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast("")}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Manajemen Portofolio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
            Kelola Portofolio Proyek
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Total {items.length} proyek tersimpan. Perubahan langsung tersinkronisasi ke tampilan pengunjung.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            className="gap-2 shadow-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek Baru</span>
          </Button>
        </div>
      </div>

      {/* Bar Pencarian & Filter Kategori */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul atau kategori proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#007DFE] bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["Semua", ...CATEGORY_OPTIONS].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#007DFE] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Kartu Proyek Admin (Clean & Minimalis) */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex items-center justify-between hover:shadow-md transition-shadow gap-3.5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Thumbnail dengan pengaturan imageFit & imagePosition */}
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} ${
                      item.imagePosition === "center"
                        ? "object-center"
                        : item.imagePosition === "bottom"
                        ? "object-bottom"
                        : "object-top"
                    }`}
                  />
                </div>

                {/* Judul & Kategori */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#007DFE] text-[10px] font-bold uppercase tracking-wider">
                      {item.category || "WEBSITE"}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.imageFit === "contain" ? "Contain" : "Cover"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-poppins truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors"
                    title="Buka Direct URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors cursor-pointer"
                  title="Edit Proyek"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                  title="Hapus Proyek"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">
            Tidak ada proyek yang sesuai dengan pencarian atau filter.
          </p>
        </div>
      )}

      {/* Modal CRUD Lengkap dengan Tools Pengaturan Tampilan Gambar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base font-poppins">
                {editingItem ? "Edit Proyek Portofolio" : "Tambah Proyek Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* 1. Judul Proyek */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Contoh: Website Kitchen Set & Interior RuangRuma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                />
              </div>

              {/* 2. Kategori */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="Contoh: WEBSITE"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                  />
                  <select
                    value={CATEGORY_OPTIONS.includes(formData.category as (typeof CATEGORY_OPTIONS)[number]) ? formData.category : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData((prev) => ({ ...prev, category: e.target.value }));
                      }
                    }}
                    className="w-32 px-2.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#007DFE] cursor-pointer"
                  >
                    <option value="">Preset...</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Direct URL Website (Opsional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link Direct URL / Demo Website (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))
                  }
                  placeholder="Contoh: https://kopikenangan.com atau link demo Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Tautan yang akan dibuka saat icon panah (↗) di kartu diklik pengunjung.
                </p>
              </div>

              {/* 4. Import File atau URL Gambar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Gambar Tangkapan Layar Proyek *
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        imageInputMode === "upload"
                          ? "bg-blue-100 text-[#007DFE] font-semibold"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        imageInputMode === "url"
                          ? "bg-blue-100 text-[#007DFE] font-semibold"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Input URL</span>
                    </button>
                  </div>
                </div>

                {imageInputMode === "upload" ? (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*,.gif"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div
                      onClick={() => !isCompressing && fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/30"
                    >
                      {isCompressing ? (
                        <div className="py-2 flex flex-col items-center">
                          <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-1" />
                          <p className="text-xs font-semibold text-slate-700">
                            Memproses gambar...
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-slate-700">
                            Klik untuk memilih gambar atau GIF dari komputer
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Otomatis dikompresi Full HD agar tajam & hemat memori
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, image: e.target.value }))
                    }
                    placeholder="https://images.unsplash.com/... atau /images/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                  />
                )}
              </div>

              {/* 5. TOOLS PENGATURAN TAMPILAN GAMBAR DI LAYAR USER */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#007DFE]" />
                  <h4 className="text-xs font-bold text-slate-900 font-poppins">
                    Tools Tampilan Gambar di Layar Pengunjung
                  </h4>
                </div>

                {/* Pengaturan Mode Fit: Cover vs Contain */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Mode Ukuran Gambar:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imageFit: "cover" }))}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.imageFit === "cover"
                          ? "border-[#007DFE] bg-blue-50/70 text-[#007DFE] ring-1 ring-[#007DFE]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Maximize2 className="w-4 h-4 shrink-0" />
                      <div>
                        <div className="text-xs font-bold leading-none">Penuh (Cover)</div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                          100% penuh kartu tanpa space hitam
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imageFit: "contain" }))}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.imageFit === "contain"
                          ? "border-[#007DFE] bg-blue-50/70 text-[#007DFE] ring-1 ring-[#007DFE]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Minimize2 className="w-4 h-4 shrink-0" />
                      <div>
                        <div className="text-xs font-bold leading-none">Utuh (Contain)</div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                          Tampil utuh pas tengah tanpa terpotong
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Pengaturan Posisi Fokus Gambar */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Posisi Fokus Gambar:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "top", label: "Fokus Atas (Logo & Navbar)" },
                      { id: "center", label: "Fokus Tengah" },
                      { id: "bottom", label: "Fokus Bawah" },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            imagePosition: pos.id as "top" | "center" | "bottom",
                          }))
                        }
                        className={`py-2 px-2 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                          formData.imagePosition === pos.id
                            ? "border-[#007DFE] bg-[#007DFE] text-white shadow-xs"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pratinjau Interaktif Kartu Pengunjung */}
                {formData.image && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                      <span>Pratinjau Hasil di Layar Pengunjung:</span>
                      <span className="text-[#007DFE] font-semibold">
                        Mode: {formData.imageFit === "cover" ? "Penuh (Cover)" : "Utuh (Contain)"} • Posisi:{" "}
                        {formData.imagePosition === "top"
                          ? "Atas"
                          : formData.imagePosition === "center"
                          ? "Tengah"
                          : "Bawah"}
                      </span>
                    </div>

                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-sm group select-none">
                      {/* Gambar dengan pengaturan terpilih */}
                      <div
                        className={`absolute inset-0 w-full h-full overflow-hidden ${
                          formData.imageFit === "contain"
                            ? "p-2 sm:p-3 flex items-center justify-center bg-slate-950"
                            : ""
                        }`}
                      >
                        <Image
                          src={formData.image}
                          alt="Pratinjau Pengunjung"
                          fill
                          className={`${
                            formData.imageFit === "contain" ? "object-contain" : "object-cover"
                          } ${
                            formData.imagePosition === "center"
                              ? "object-center"
                              : formData.imagePosition === "bottom"
                              ? "object-bottom"
                              : "object-top"
                          } transition-transform duration-500 group-hover:scale-105`}
                        />
                      </div>

                      {/* Gradien Gelap Bawah */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-35% to-transparent pointer-events-none" />

                      {/* Teks Pratinjau */}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-end justify-between gap-2 pointer-events-none">
                        <div className="space-y-1 max-w-[82%]">
                          <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-[9px] font-semibold tracking-wider uppercase">
                            {formData.category || "WEBSITE"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white font-poppins leading-tight truncate">
                            {formData.title || "Judul Proyek Portofolio"}
                          </h4>
                        </div>

                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md text-[#007DFE] shrink-0">
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Tombol Simpan & Batal */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <Button type="submit" variant="primary" size="md" className="font-semibold shadow-sm">
                  {editingItem ? "Simpan Perubahan" : "Simpan Proyek"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
