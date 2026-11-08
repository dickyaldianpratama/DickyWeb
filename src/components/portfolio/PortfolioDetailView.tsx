"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio.types";
import { portfolioData } from "@/data/portfolio";
import { getPortfolioList, getPortfolioListFromCloud } from "@/lib/storage";
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
} from "lucide-react";

interface PortfolioDetailViewProps {
  item: PortfolioItem;
}

export const PortfolioDetailView: React.FC<PortfolioDetailViewProps> = ({ item: initialItem }) => {
  const [item, setItem] = useState<PortfolioItem>(initialItem);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [allItems, setAllItems] = useState<PortfolioItem[]>(portfolioData);
  const [previewMode, setPreviewMode] = useState<"desktop" | "app">("desktop");
  const [showInteractiveMockup, setShowInteractiveMockup] = useState(false);

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
  const galleryImages: string[] =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : [item.image || "/images/portfolio/ruangruma-clean.png"];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

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

  const isCompanyProfileShowcase =
    item.id === "company-profile" ||
    item.slug === "website-company-profile-modern-enterprise" ||
    item.category?.toLowerCase() === "company profile";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#007DFE] selection:text-white font-inter">
      {/* Navbar Resmi DickyWeb */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pb-20 pt-28 sm:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
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
                  Portofolio
                </Link>
              </li>
              <li className="flex items-center gap-1.5 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span
                  aria-current="page"
                  className="truncate font-semibold text-slate-900"
                  title={item.title}
                >
                  {item.title}
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
              {/* Wadah Galeri / Carousel Gambar */}
              <div className="space-y-3">
                {/* Gambar Utama Tampilan Aktif */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm group">
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative block aspect-[16/10] min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] w-full cursor-zoom-in overflow-hidden"
                  >
                    <Image
                      src={currentImage}
                      alt={`${item.title} - Tampilan ${activeImageIndex + 1}`}
                      fill
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                    />

                    {/* Tombol Perbesar Zoom */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/80 text-white p-2 rounded-xl backdrop-blur-md shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Navigasi Panah Cepat Gambar Kiri/Kanan */}
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
                        aria-label="Tampilan sebelumnya"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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
                        aria-label="Tampilan selanjutnya"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Badge Indikator Nomor Slide (Contoh: 1 / 9) */}
                  <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </p>
                </div>

                {/* Strip Thumbnail Gambar di Bawah Gambar Utama */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`Tampilan ${idx + 1}`}
                        className={`relative shrink-0 overflow-hidden rounded-xl border bg-slate-100 transition-all cursor-pointer size-16 sm:size-20 ${
                          activeImageIndex === idx
                            ? "border-[#007DFE] ring-2 ring-blue-500/30 scale-105 shadow-sm"
                            : "border-slate-200/90 hover:border-slate-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${item.title} thumb ${idx + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                        <span className="absolute bottom-1 right-1 z-[1] rounded bg-slate-900/80 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fitur Khusus: Toggle Mode Mockup Interaktif (Khusus Company Profile / Multi-View) */}
              {isCompanyProfileShowcase && (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#007DFE] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Interactive Device Showcase
                    </span>
                    <p className="text-xs text-slate-600">
                      Tersedia mode simulasi frame Desktop (1440px) dan Mobile App (390px) dengan scroll horizontal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInteractiveMockup(!showInteractiveMockup)}
                    className="px-4 py-2 rounded-xl bg-[#007DFE] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>{showInteractiveMockup ? "Tutup Simulasi Mockup" : "Buka Simulasi Mockup"}</span>
                  </button>
                </div>
              )}

              {/* Tampilan Mockup Interaktif yang Bisa di-Scroll Horizontal */}
              {isCompanyProfileShowcase && showInteractiveMockup && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-xs text-slate-300 font-mono pl-2">
                        {previewMode === "desktop" ? "Mode Desktop (1440px)" : "Mode App (390px)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={previewMode}
                        onChange={(e) => setPreviewMode(e.target.value as "desktop" | "app")}
                        className="bg-slate-800 text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700 cursor-pointer"
                      >
                        <option value="desktop">🖥️ Mode Desktop</option>
                        <option value="app">📱 Mode App / Mobile</option>
                      </select>
                    </div>
                  </div>

                  {/* Kotak Card Detail dengan Scroll Horizontal */}
                  <div className="overflow-x-auto overflow-y-auto max-h-[550px] p-2 bg-slate-950 rounded-xl border border-slate-800">
                    {previewMode === "desktop" ? (
                      <div className="min-w-[1200px] w-[1300px] bg-white rounded-lg overflow-hidden shadow-2xl">
                        <img
                          src={currentImage}
                          alt="Desktop view"
                          className="w-full h-auto block"
                        />
                      </div>
                    ) : (
                      <div className="w-[360px] mx-auto bg-slate-800 p-2.5 rounded-[40px] shadow-2xl border-2 border-slate-700">
                        <div className="w-full h-[540px] bg-white rounded-[32px] overflow-y-auto overflow-x-hidden">
                          <img
                            src={currentImage}
                            alt="Mobile app view"
                            className="w-full h-auto block object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-xs text-slate-400">
                    💡 Geser horizontal / scroll di dalam kotak untuk melihat seluruh bidang tampilan.
                  </p>
                </div>
              )}

              {/* Teks Excerpt / Lead Studi Kasus */}
              <p className="text-sm sm:text-base italic leading-relaxed text-slate-600 border-l-3 border-[#007DFE] pl-4 bg-slate-50/60 py-3 rounded-r-xl">
                {item.excerpt || item.description}
              </p>

              {/* Artikel Detail Studi Kasus (Struktur Sesuai Referensi) */}
              <article className="prose prose-slate max-w-none space-y-8">
                {/* 1. Tentang Proyek */}
                <section className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                    Tentang Proyek {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {aboutText}
                  </p>
                </section>

                {/* 2. Tantangan */}
                <section className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                    Tantangan
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {challengeText}
                  </p>
                </section>

                {/* 3. Solusi yang Kami Bangun */}
                <section className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                    Solusi Website yang Kami Bangun
                  </h2>
                  <ul className="space-y-2.5 list-none pl-0">
                    {solutionsList.map((solusi, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-[#007DFE] shrink-0 mt-0.5" />
                        <span>{solusi}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                    Setiap halaman dirancang agar pengunjung mudah berpindah dari melihat contoh portofolio proyek, membaca rincian layanan, hingga mengirimkan pesan konsultasi. Struktur ini membantu {item.client || "bisnis klien"} tampil lebih meyakinkan sekaligus memudahkan mesin pencari memahami isi website.
                  </p>
                </section>

                {/* 4. Teknologi */}
                <section className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                    Teknologi
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {techDescriptionText}
                  </p>
                </section>

                {/* 5. Hasil */}
                <section className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">
                    Hasil
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {resultsText}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                    Butuh website seperti ini untuk bisnis Anda?{" "}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#007DFE] hover:underline"
                    >
                      Konsultasikan gratis sekarang bersama tim DickyWeb
                    </a>
                    .
                  </p>
                </section>
              </article>

              {/* Tagar Teknologi (Hashtags) */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {(item.techStack || ["Next.js", "Tailwind CSS"]).map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    #{tech.replace(/[^a-zA-Z0-9]/g, "")}
                  </span>
                ))}
              </div>
            </div>

            {/* ========================================================
                KOLOM KANAN: ASIDE INFORMASI PROYEK (STICKY SIDEBAR)
                ======================================================== */}
            <aside className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm lg:sticky lg:top-28 space-y-5">
              <h2 className="text-base font-bold text-slate-900 font-poppins">
                Informasi proyek
              </h2>

              <dl className="space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs font-medium text-slate-500">Klien</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                    {item.client || "Klien DickyWeb"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-slate-500">Durasi Pengerjaan</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                    {item.duration || "1 Minggu"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-slate-500">Kategori</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                    {item.category || "Website"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-slate-500">Tahun</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                    {item.year || "2026"}
                  </dd>
                </div>

                {item.metrics && (
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Pencapaian</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-emerald-600">
                      {item.metrics}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Stack Teknologi */}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {(item.techStack || ["Next.js", "Tailwind CSS"]).map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#007DFE] border border-blue-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tombol Aksi Utama */}
              <div className="space-y-2.5 pt-2">
                {/* Tombol Lihat Hasil Live (Jika URL tersedia) */}
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#007DFE] text-sm font-bold text-white hover:bg-blue-600 active:scale-95 transition-all shadow-md shadow-blue-500/20"
                  >
                    <span>Lihat hasil website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}

                {/* Tombol Konsultasi WhatsApp DickyWeb */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasi Proyek Serupa</span>
                </a>
              </div>
            </aside>
          </div>

          {/* ========================================================
              BAGIAN BAWAH: PROYEK TERKAIT (3-COLUMN CARDS)
              ======================================================== */}
          {relatedProjects.length > 0 && (
            <section className="mt-20 pt-10 border-t border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
                    Showcase Portofolio
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins tracking-tight">
                    Proyek terkait
                  </h2>
                </div>
                <Link
                  href="/#portfolio"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007DFE] hover:underline"
                >
                  <span>Lihat semua proyek</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relItem) => (
                  <PortfolioCard key={relItem.id} item={relItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Modal Zoom Gambar Resolusi Penuh */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Tutup pratinjau"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
          >
            <img
              src={currentImage}
              alt={item.title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl select-none"
            />
          </div>
        </div>
      )}

      {/* Footer Resmi DickyWeb */}
      <Footer />

      {/* Floating CTA WhatsApp */}
      <FloatingCTA />
    </div>
  );
};
