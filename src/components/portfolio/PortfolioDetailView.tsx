"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio.types";
import { portfolioData } from "@/data/portfolio";
import { getPortfolioList, getPortfolioListFromCloud } from "@/lib/storage";
import { companyProfileSlides, ShowcaseSlideInfo } from "@/data/companyProfileSlides";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { createWhatsAppLink } from "@/lib/whatsapp";
import {
  Home as HomeIcon,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  MessageSquare,
  Maximize2,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Eye,
} from "lucide-react";

interface PortfolioDetailViewProps {
  item: PortfolioItem;
  isCompanyProfile?: boolean;
}

export const PortfolioDetailView: React.FC<PortfolioDetailViewProps> = ({
  item: initialItem,
  isCompanyProfile: initialIsCompanyProfile = false,
}) => {
  const [item, setItem] = useState<PortfolioItem>(initialItem);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [allItems, setAllItems] = useState<PortfolioItem[]>(portfolioData);
  const [previewMode, setPreviewMode] = useState<"desktop" | "app">("desktop");

  const isCompanyProfile =
    initialIsCompanyProfile ||
    item.id === "company-profile" ||
    item.slug === "website-company-profile" ||
    item.category?.toLowerCase() === "company profile";

  // Ambil data terbaru dari cloud / storage agar sinkron dengan perubahan admin
  useEffect(() => {
    const local = getPortfolioList();
    if (local && local.length > 0) {
      setAllItems(local);
      const found = local.find(
        (p) => p.id === initialItem.id || p.slug === initialItem.slug || p.slug === initialItem.id
      );
      if (found) {
        setItem(found);
      }
    }

    getPortfolioListFromCloud().then((cloudItems) => {
      if (cloudItems && cloudItems.length > 0) {
        setAllItems(cloudItems);
        const found = cloudItems.find(
          (p) => p.id === initialItem.id || p.slug === initialItem.slug || p.slug === initialItem.id
        );
        if (found) {
          setItem(found);
        }
      }
    });
  }, [initialItem]);

  // Siapkan daftar gambar galeri
  const galleryImages: string[] = isCompanyProfile
    ? companyProfileSlides.map((s) => s.image)
    : item.gallery && item.gallery.length > 0
    ? item.gallery
    : [item.image || "/images/portfolio/ruangruma-clean.png"];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];
  const currentSlideInfo: ShowcaseSlideInfo | null = isCompanyProfile
    ? companyProfileSlides[activeImageIndex] || companyProfileSlides[0]
    : null;

  // Proyek terkait (3 proyek selain proyek aktif)
  const relatedProjects = allItems
    .filter((p) => p.id !== item.id && p.slug !== item.slug)
    .slice(0, 3);

  // Fallback solusi & tantangan jika item baru belum mengisinya
  const solutionsList =
    item.solutions && item.solutions.length > 0
      ? item.solutions
      : [
          `Desain antarmuka modern dan responsif yang dioptimasi khusus untuk brand ${item.client || item.title}`,
          "Optimasi struktur halaman dan meta tag SEO untuk mendongkrak visibilitas pencarian Google",
          "Integrasi titik konversi langsung ke WhatsApp concierge untuk mempermudah pemesanan",
          "Kecepatan loading kilat dengan skor performa PageSpeed tinggi di desktop maupun mobile",
          "Manajemen konten terpusat agar memudahkan pembaruan portofolio dan katalog produk",
        ];

  const challengeText =
    item.challenge ||
    `Tantangan utama dari proyek ${item.title} adalah menyajikan portofolio dan kapabilitas bisnis klien secara meyakinkan, elegan, dan berkecepatan tinggi tanpa kompromi performa. Klien membutuhkan website yang tidak hanya berfungsi sebagai etalase digital, namun mampu mengonversi pengunjung menjadi leads atau pelanggan baru secara konsisten.`;

  const aboutText =
    item.aboutProject ||
    item.description ||
    `${item.title} merupakan solusi digital terintegrasi yang dirancang oleh DickyWeb untuk menjawab kebutuhan pertumbuhan bisnis ${item.client || "klien"}. Setiap elemen tata letak diperhitungkan secara cermat agar mencerminkan identitas brand yang kredibel dan memikat audiens sasaran.`;

  const resultsText =
    item.results ||
    item.metrics ||
    `Website ${item.title} kini tampil sangat profesional, meningkatkan citra kredibilitas klien di mata pelanggan dan mitra bisnis. Peningkatan interaksi digital dan konversi konsultasi meningkat secara signifikan sejak website resmi diluncurkan.`;

  const techDescriptionText =
    item.techDescription ||
    `Dibangun menggunakan teknologi web modern Next.js dan Tailwind CSS untuk memastikan performa yang ringan, aman, serta tampilan yang sangat mulus di berbagai perangkat gadget.`;

  const whatsappMessage = `Halo DickyWeb, saya baru saja melihat studi kasus portofolio *${item.title}* di website DickyWeb. Saya tertarik berkonsultasi untuk pembuatan website serupa untuk bisnis saya.`;
  const whatsappUrl = createWhatsAppLink(whatsappMessage);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#007DFE] selection:text-white font-inter">
      {/* Navbar Resmi DickyWeb */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pb-20 pt-28 sm:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation Sesuai Permintaan: Beranda > Hasil Karya > Detail Company Profile */}
          <nav aria-label="Breadcrumb" className="mb-5 min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
              <li className="flex items-center gap-1.5 shrink-0">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-[#007DFE] transition-colors"
                >
                  <HomeIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Beranda</span>
                </Link>
              </li>
              <li className="flex items-center gap-1.5 shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <Link
                  href="/#portfolio"
                  className="text-slate-500 hover:text-[#007DFE] transition-colors"
                >
                  Hasil Karya
                </Link>
              </li>
              <li className="flex items-center gap-1.5 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span
                  aria-current="page"
                  className="truncate font-semibold text-slate-900"
                  title={item.title}
                >
                  {isCompanyProfile ? "Detail Company Profile" : item.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Category Pill with Animated Pulsing Dot */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-[#007DFE] shadow-xs">
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full animate-ping bg-[#007DFE]/60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#007DFE]" />
              </span>
              <span className="truncate uppercase tracking-wider text-[11px] font-bold">
                {item.category || "WEBSITE"}
              </span>
            </span>
          </div>

          {/* Main Title Heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-poppins leading-tight">
              {item.title}
            </h1>
          </div>

          {/* 2-Column Grid Layout (Matching Reference Structure) */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] lg:items-start">
            {/* ========================================================
                KOLOM KIRI: GALERI, EXCERPT, ARTIKEL STUDI KASUS, & HASHTAGS
                ======================================================== */}
            <div className="min-w-0 space-y-8">
              {/* Wadah Galeri / Carousel Cuplikan Halaman */}
              <div className="space-y-4">
                {/* Box Penjelasan Cuplikan Slide Aktif */}
                {currentSlideInfo && (
                  <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-white p-4 sm:p-5 shadow-xs transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#007DFE] bg-white px-3 py-1 rounded-full border border-blue-200 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        {currentSlideInfo.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {activeImageIndex + 1} dari {galleryImages.length} Halaman
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {currentSlideInfo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {currentSlideInfo.description}
                    </p>
                  </div>
                )}

                {/* Simulasi Mockup Interaktif (Desktop 1440px dengan Scroll Horizontal & Mobile App 390px) */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-xs text-slate-300 font-mono pl-2">
                        {previewMode === "desktop" ? "🖥️ Mode Desktop (1440px Grid)" : "📱 Mode App / Mobile (390px)"}
                      </span>
                    </div>

                    {/* Dropdown Toggle Pilihan Mode Desktop atau App */}
                    <div className="flex items-center gap-2">
                      <label htmlFor="device-mode-dropdown" className="text-xs text-slate-400 font-medium hidden sm:inline">
                        Mode Tampilan:
                      </label>
                      <select
                        id="device-mode-dropdown"
                        value={previewMode}
                        onChange={(e) => setPreviewMode(e.target.value as "desktop" | "app")}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2 px-3.5 rounded-xl border border-slate-700 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#007DFE]"
                      >
                        <option value="desktop">🖥️ Mode Desktop (Scroll Horizontal)</option>
                        <option value="app">📱 Mode App / Mobile</option>
                      </select>
                    </div>
                  </div>

                  {/* Kotak Card Detail dengan Scroll Horizontal & Vertikal */}
                  <div className="relative overflow-x-auto overflow-y-auto max-h-[580px] p-3 bg-slate-950 rounded-xl border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
                    {previewMode === "desktop" ? (
                      <div className="min-w-[1240px] w-[1380px] bg-white rounded-lg overflow-hidden shadow-2xl mx-auto">
                        <img
                          src={currentImage}
                          alt={currentSlideInfo ? currentSlideInfo.title : "Desktop preview"}
                          className="w-full h-auto block"
                          loading="eager"
                        />
                      </div>
                    ) : (
                      <div className="w-[360px] mx-auto bg-slate-800 p-2.5 rounded-[44px] shadow-2xl border-4 border-slate-700">
                        <div className="w-full h-[560px] bg-white rounded-[34px] overflow-y-auto overflow-x-hidden scrollbar-none">
                          <img
                            src={currentImage}
                            alt={currentSlideInfo ? currentSlideInfo.title : "Mobile app preview"}
                            className="w-full h-auto block object-cover object-top"
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Keterangan & Navigasi Cepat di Bawah Kotak Preview */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                    <span>
                      💡 {previewMode === "desktop" ? "Geser ke samping (scroll horizontal) di dalam kotak untuk melihat seluruh bidang halaman." : "Scroll ke bawah di dalam bingkai ponsel untuk memeriksa tata letak mobile."}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="text-[#007DFE] hover:text-blue-400 font-semibold underline flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Perbesar Layar Penuh (Zoom)
                    </button>
                  </div>
                </div>

                {/* Strip Thumbnail Cuplikan Halaman Website di Bawahnya */}
                {galleryImages.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Daftar Cuplikan Halaman ({galleryImages.length} Halaman):</span>
                      <span className="text-[#007DFE] font-semibold">Klik untuk mengganti cuplikan slide</span>
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
                      {galleryImages.map((img, idx) => {
                        const slideInfo = isCompanyProfile ? companyProfileSlides[idx] : null;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            className={`relative shrink-0 overflow-hidden rounded-xl border bg-slate-100 transition-all cursor-pointer w-24 sm:w-28 text-left group ${
                              activeImageIndex === idx
                                ? "border-[#007DFE] ring-2 ring-blue-500/30 scale-[1.03] shadow-md"
                                : "border-slate-200/90 hover:border-slate-400 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                              <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover object-top"
                              />
                              <span className="absolute bottom-1 right-1 z-[1] rounded bg-slate-900/85 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                {idx + 1}
                              </span>
                            </div>
                            <div className="p-1.5 bg-white">
                              <p className="text-[10px] font-bold text-slate-900 truncate">
                                {slideInfo ? slideInfo.badge.replace(/^Slide \d+ • /, "") : `Tampilan ${idx + 1}`}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Teks Excerpt / Lead Studi Kasus */}
              <p className="text-sm sm:text-base italic leading-relaxed text-slate-600 border-l-3 border-[#007DFE] pl-4 bg-slate-50/60 py-3 rounded-r-xl">
                {item.excerpt || item.description}
              </p>

              {/* Artikel Detail Studi Kasus (Struktur Sesuai Referensi) */}
              <article className="prose prose-slate max-w-none space-y-8">
                {/* 1. Tentang Proyek */}
                <section className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#007DFE] inline-block" />
                    Tentang Proyek
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {aboutText}
                  </p>
                </section>

                {/* 2. Tantangan */}
                <section className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#007DFE] inline-block" />
                    Tantangan
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {challengeText}
                  </p>
                </section>

                {/* 3. Solusi Website yang Kami Bangun */}
                <section className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#007DFE] inline-block" />
                    Solusi Website yang Kami Bangun
                  </h2>
                  <ul className="space-y-2.5 pt-1">
                    {solutionsList.map((solusi, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#007DFE] shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                          {solusi}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Teknologi */}
                <section className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#007DFE] inline-block" />
                    Teknologi
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {techDescriptionText}
                  </p>
                </section>

                {/* 5. Hasil */}
                <section className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#007DFE] inline-block" />
                    Hasil
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {resultsText}
                  </p>
                </section>
              </article>

              {/* Hashtag Teknologi di Bawah Artikel */}
              {item.techStack && item.techStack.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
                    {item.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1 rounded-md text-slate-700 font-medium"
                      >
                        #{tech.toLowerCase().replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================
                KOLOM KANAN: SIDEBAR INFORMASI PROYEK (STICKY ON DESKTOP)
                ======================================================== */}
            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-poppins">
                    Informasi proyek
                  </h2>
                  <div className="h-0.5 w-10 bg-[#007DFE] mt-1.5 rounded-full" />
                </div>

                {/* Definition List Metadata Proyek */}
                <dl className="divide-y divide-slate-100 text-sm space-y-0">
                  {/* Klien */}
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0 font-medium">Klien</dt>
                    <dd className="font-semibold text-slate-900 text-right truncate">
                      {item.client || item.title}
                    </dd>
                  </div>

                  {/* Durasi Pengerjaan */}
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Durasi
                    </dt>
                    <dd className="font-semibold text-slate-900 text-right">
                      {item.duration || "2 Minggu"}
                    </dd>
                  </div>

                  {/* Kategori */}
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0 font-medium flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      Kategori
                    </dt>
                    <dd className="font-semibold text-slate-900 text-right">
                      {item.category || "Website"}
                    </dd>
                  </div>

                  {/* Tahun */}
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Tahun
                    </dt>
                    <dd className="font-semibold text-slate-900 text-right">
                      {item.year || "2026"}
                    </dd>
                  </div>

                  {/* Pencapaian / Hasil Utama */}
                  {item.metrics && (
                    <div className="py-3 space-y-1">
                      <dt className="text-slate-500 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Hasil Utama
                      </dt>
                      <dd className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg p-2.5 leading-snug">
                        {item.metrics}
                      </dd>
                    </div>
                  )}

                  {/* Teknologi yang Digunakan */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="py-3 space-y-2">
                      <dt className="text-slate-500 font-medium">Teknologi</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-md bg-blue-50/80 px-2 py-0.5 text-xs font-medium text-[#007DFE] border border-blue-200/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Tombol Aksi CTA */}
                <div className="pt-2 space-y-3">
                  {/* Tombol Lihat Hasil Website Jika URL Tersedia */}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                    >
                      <span>Lihat hasil website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {/* Tombol WhatsApp Konsultasi Proyek Serupa */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#007DFE] px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Konsultasi Proyek Serupa</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* ========================================================
              BAGIAN BAWAH: PROYEK TERKAIT
              ======================================================== */}
          {relatedProjects.length > 0 && (
            <section className="mt-20 pt-12 border-t border-slate-200/90">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                    Proyek terkait
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Jelajahi karya dan solusi digital lain yang kami bangun untuk klien DickyWeb
                  </p>
                </div>
                <Link
                  href="/#portfolio"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#007DFE] hover:text-blue-700 transition-colors"
                >
                  <span>Lihat semua karya</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Grid 3 Kolom Proyek Terkait */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relItem) => (
                  <PortfolioCard key={relItem.id} item={relItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer & Floating CTA */}
      <Footer />
      <FloatingCTA />

      {/* ========================================================
          MODAL LIGHTBOX ZOOM LAYAR PENUH
          ======================================================== */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Tombol Tutup Modal */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Tutup zoom"
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Gambar Layar Penuh */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${item.title} zoom`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Keterangan di Bawah Modal */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold text-center border border-white/10">
            {currentSlideInfo ? currentSlideInfo.title : `${item.title} (${activeImageIndex + 1} / ${galleryImages.length})`}
          </div>
        </div>
      )}
    </div>
  );
};
