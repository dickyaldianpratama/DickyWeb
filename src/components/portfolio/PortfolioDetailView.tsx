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
  MessageSquare,
  Maximize2,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  ArrowUpRight,
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

  // Siapkan daftar gambar galeri cuplikan halaman (SS-an) yang diinput admin
  const galleryImages: string[] =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : isCompanyProfile
      ? companyProfileSlides.map((s) => s.image)
      : [item.image || "/images/portfolio/company-profile/yourcompany_home_page/screen.png"];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];
  const currentSlideInfo: ShowcaseSlideInfo | null =
    isCompanyProfile && (!item.gallery || item.gallery.length === 0)
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
          {/* Breadcrumb Navigation: Beranda > Hasil Karya > Detail Company Profile */}
          <nav aria-label="Breadcrumb" className="mb-4 min-w-0">
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

          {/* Judul Halaman (Clean Bold Sesuai Referensi, Tidak Terlalu Bold) */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-poppins leading-snug">
              {item.title}
            </h1>
          </div>

          {/* 2-Column Grid Layout (Clean Sesuai Referensi rcsdigitalmandiri.id) */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* ========================================================
                KOLOM KIRI: PREVIEW SS-AN CUPLIKAN, EXCERPT, STUDI KASUS
                ======================================================== */}
            <div className="min-w-0 space-y-6 sm:space-y-8">
              {/* Wadah Cuplikan Halaman (Clean SS-an Image Viewer) */}
              <div className="space-y-3">
                {/* Main Preview Container Clean Berisi Cuplikan Halaman (SS-an) */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm group">
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={currentImage}
                      alt={currentSlideInfo ? currentSlideInfo.title : `${item.title} cuplikan ${activeImageIndex + 1}`}
                      fill
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    {/* Tombol Zoom Layar Penuh (Muncul saat Hover) */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-xl backdrop-blur-md shadow-md cursor-pointer">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Navigasi Panah Geser Slide Kiri / Kanan */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev > 0 ? prev - 1 : galleryImages.length - 1
                          );
                        }}
                        aria-label="Cuplikan sebelumnya"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev < galleryImages.length - 1 ? prev + 1 : 0
                          );
                        }}
                        aria-label="Cuplikan selanjutnya"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Badge Indikator Nomor Slide Sesuai Referensi (Contoh: 1/8) */}
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-900/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5">
                    <span>
                      {activeImageIndex + 1}/{galleryImages.length}
                    </span>
                    {currentSlideInfo && (
                      <span className="hidden sm:inline border-l border-white/30 pl-1.5 text-[11px] text-slate-200 truncate max-w-[220px]">
                        {currentSlideInfo.title.replace(/\(.*\)/, "").trim()}
                      </span>
                    )}
                  </div>

                  {/* Icon WhatsApp Kecil di Pojok Kanan Bawah Sesuai Referensi Gambar */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                    title="Konsultasi cepat via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </a>
                </div>

                {/* Strip Thumbnail Cuplikan Halaman (Clean SS-an Strip) */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-300">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`Cuplikan ${idx + 1}`}
                        className={`relative shrink-0 overflow-hidden rounded-xl border bg-slate-100 transition-all cursor-pointer w-20 sm:w-24 aspect-[16/10] ${
                          activeImageIndex === idx
                            ? "border-[#007DFE] ring-2 ring-[#007DFE]/30 scale-[1.02] shadow-sm"
                            : "border-slate-200/90 hover:border-slate-400 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${item.title} thumb ${idx + 1}`}
                          fill
                          sizes="96px"
                          className="object-cover object-top"
                        />
                        <span className="absolute bottom-1 right-1 z-[1] rounded bg-slate-900/85 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Teks Excerpt / Ringkasan Proyek */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 border-l-2 border-[#007DFE] pl-4 py-1">
                {item.excerpt || item.description}
              </p>

              {/* Konten Studi Kasus (Struktur Sesuai Referensi rcsdigitalmandiri.id) */}
              <article className="prose prose-slate max-w-none space-y-8 pt-2">
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
                KOLOM KANAN: SIDEBAR INFORMASI PROYEK (CLEAN SESUAI REFERENSI)
                ======================================================== */}
            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-poppins">
                    Informasi proyek
                  </h2>
                </div>

                {/* Metadata List */}
                <div className="space-y-4 text-sm">
                  {/* Klien */}
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Klien</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block truncate">
                      {item.client || item.title}
                    </span>
                  </div>

                  {/* Durasi Pengerjaan */}
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Durasi</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {item.duration || "2 Minggu"}
                    </span>
                  </div>

                  {/* Kategori */}
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Kategori</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {item.category || "Website"}
                    </span>
                  </div>

                  {/* Tahun */}
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Tahun</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {item.year || "2026"}
                    </span>
                  </div>

                  {/* Stack (Pills Sesuai Referensi) */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="pt-2">
                      <span className="block text-xs text-slate-500 font-medium mb-2">Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#007DFE] border border-blue-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol CTA Bersih Sesuai Referensi */}
                <div className="pt-3">
                  <a
                    href={item.liveUrl || whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#007DFE] hover:bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
                  >
                    <span>{item.liveUrl ? "Lihat hasil" : "Konsultasi Proyek"}</span>
                    <ArrowUpRight className="w-4 h-4" />
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
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
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
