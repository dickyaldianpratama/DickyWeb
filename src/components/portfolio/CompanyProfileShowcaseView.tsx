"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  companyProfileShowcaseData,
  ShowcaseSlide,
} from "@/data/companyProfileShowcase";
import {
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  ExternalLink,
  Sparkles,
  MoveHorizontal,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  Eye,
  Maximize2,
  Minimize2,
  Globe,
  Building2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

export const CompanyProfileShowcaseView: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"desktop" | "app">("desktop");
  const [renderType, setRenderType] = useState<"image" | "interactive">("image");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeSlide: ShowcaseSlide =
    companyProfileShowcaseData.slides[currentSlideIndex] ||
    companyProfileShowcaseData.slides[0];

  // Cek kemampuan scroll horizontal di dalam kotak preview
  const updateScrollStatus = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateScrollStatus();
    }, 150);
    return () => clearTimeout(timer);
  }, [currentSlideIndex, viewMode, renderType]);

  // Tombol navigasi scroll horizontal di dalam kotak slide
  const handleScrollHorizontally = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const delta = direction === "left" ? -400 : 400;
    scrollContainerRef.current.scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(updateScrollStatus, 300);
  };

  const handleResetScroll = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    setTimeout(updateScrollStatus, 300);
  };

  // Navigasi Slide
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < companyProfileShowcaseData.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      handleResetScroll();
    }
  }, [currentSlideIndex]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      handleResetScroll();
    }
  }, [currentSlideIndex]);

  // Keyboard navigation untuk slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // URL yang aktif ditampilkan sesuai mode
  const currentHtmlUrl =
    viewMode === "app" && activeSlide.mobileHtml
      ? activeSlide.mobileHtml
      : activeSlide.desktopHtml;

  const consultationWhatsappUrl = createWhatsAppLink(
    `Halo DickyWeb, saya baru saja melihat showcase interaktif "Website Company Profile Modern Enterprise" (${activeSlide.name}). Saya tertarik berkonsultasi untuk pembuatan website serupa untuk bisnis saya.`
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-[#007DFE] selection:text-white">
      {/* Top Navigation Bar: Breadcrumb, Back & CTA */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 transition-all border border-slate-700 hover:border-slate-600 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#007DFE]" />
              <span>Kembali ke Portofolio</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span>/</span>
              <span className="text-slate-300 font-medium">Showcase Karya</span>
              <span>/</span>
              <span className="text-[#007DFE] font-semibold">
                Company Profile Detail
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Interactive Showcase
            </span>

            <a
              href={consultationWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#007DFE] hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Konsultasi Web Serupa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Showcase Hero Header */}
      <section className="relative overflow-hidden pt-8 pb-6 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[#007DFE] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showcase Detail Website Company Profile</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-poppins">
                {companyProfileShowcaseData.projectTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {companyProfileShowcaseData.overview}
              </p>
            </div>

            {/* Micro Badge Spec */}
            <div className="flex flex-wrap lg:flex-col gap-2 sm:gap-2.5 shrink-0">
              <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#007DFE]" />
                <span className="text-xs text-slate-400">Klien:</span>
                <span className="text-xs font-bold text-slate-200">
                  {companyProfileShowcaseData.clientName}
                </span>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400">Design System:</span>
                <span className="text-xs font-bold text-slate-200 truncate max-w-[200px]">
                  Glass Skyline
                </span>
              </div>
            </div>
          </div>

          {/* Quick Jump Slide Selector Strip */}
          <div className="mt-8 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#007DFE]" />
                Daftar Slide Halaman Website ({companyProfileShowcaseData.slides.length} Halaman):
              </span>
              <span className="text-xs text-slate-400">
                Pilih halaman di bawah untuk melihat preview & penjelasan detail
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
              {companyProfileShowcaseData.slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    handleResetScroll();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    currentSlideIndex === idx
                      ? "bg-[#007DFE] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                      : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      currentSlideIndex === idx
                        ? "bg-white text-[#007DFE]"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Slide Header: Page Info, Nav Buttons, and Toggle Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          {/* Sisi Kiri: Informasi Slide Aktif */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#007DFE]/20 border border-[#007DFE]/40 text-[#007DFE] text-xs font-bold tracking-wide">
                SLIDE {activeSlide.slideNumber} DARI {companyProfileShowcaseData.slides.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {activeSlide.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins truncate">
              {activeSlide.pageTitle}
            </h2>
          </div>

          {/* Sisi Kanan: Pilihan Dropdown Mode Desktop / App & Navigasi Slide */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 1. DROPDOWN TOGGLE: MODE DESKTOP ATAU APP (Sesuai Permintaan User) */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-700/80 shadow-inner">
              <label
                htmlFor="device-mode-dropdown"
                className="text-xs font-medium text-slate-400 pl-2 hidden sm:inline"
              >
                Pilih Mode:
              </label>

              {/* Native Dropdown Element */}
              <div className="relative">
                <select
                  id="device-mode-dropdown"
                  value={viewMode}
                  onChange={(e) => {
                    setViewMode(e.target.value as "desktop" | "app");
                    handleResetScroll();
                  }}
                  className="appearance-none bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold py-2 pl-8 pr-8 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#007DFE] cursor-pointer transition-colors"
                >
                  <option value="desktop">🖥️ Mode Desktop (1440px)</option>
                  <option value="app">📱 Mode App / Mobile (390px)</option>
                </select>
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                  {viewMode === "desktop" ? (
                    <Monitor className="w-3.5 h-3.5 text-[#007DFE]" />
                  ) : (
                    <Smartphone className="w-3.5 h-3.5 text-[#007DFE]" />
                  )}
                </div>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Quick Segmented Buttons (Alternatif Satu-Klik Cepat) */}
              <div className="hidden md:flex items-center gap-1 border-l border-slate-800 pl-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("desktop");
                    handleResetScroll();
                  }}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "desktop"
                      ? "bg-[#007DFE] text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  title="Tampilan Mode Desktop"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("app");
                    handleResetScroll();
                  }}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "app"
                      ? "bg-[#007DFE] text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  title="Tampilan Mode App / Mobile"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. TOGGLE TIPE RENDER: TANGKAPAN LAYAR HD ATAU LIVE INTERACTIVE WEB */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => setRenderType("image")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  renderType === "image"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#007DFE]" />
                <span className="hidden sm:inline">Gambar HD</span>
              </button>
              <button
                type="button"
                onClick={() => setRenderType("interactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  renderType === "interactive"
                    ? "bg-[#007DFE] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Web Interaktif</span>
              </button>
            </div>

            {/* 3. TOMBOL NAVIGASI SLIDE SEBELUMNYA / SELANJUTNYA */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={currentSlideIndex === 0}
                aria-label="Slide sebelumnya"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                disabled={
                  currentSlideIndex ===
                  companyProfileShowcaseData.slides.length - 1
                }
                aria-label="Slide selanjutnya"
                className="w-9 h-9 rounded-xl bg-[#007DFE] hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            KOTAK CARD DETAIL / SLIDE CONTAINER
            Dukungan SCROLL HORIZONTAL di dalam kotak baik Desktop maupun Mobile
            ========================================================================= */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Header Bar Mockup Browser / Device */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
            {/* Browser Window Controls (Mac Style Dots) */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />

              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                {viewMode === "desktop"
                  ? "Desktop Workspace • 1440 × 900"
                  : "Mobile App Workspace • 390 × 844"}
              </span>
            </div>

            {/* URL Bar Simulator */}
            <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
              <Globe className="w-3.5 h-3.5 text-[#007DFE] shrink-0" />
              <span className="truncate text-slate-300">{activeSlide.urlPath}</span>
              <span className="ml-auto text-[10px] text-emerald-400 font-bold">
                SSL 256-bit
              </span>
            </div>

            {/* Scroll Horizontal Helper Controls & External Link */}
            <div className="flex items-center gap-2">
              {/* Petunjuk Scroll Horizontal */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[#007DFE] text-xs font-medium">
                <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
                <span>Scroll horizontal aktif di dalam kotak</span>
              </div>

              {/* Tombol Geser Kiri Manual */}
              <button
                type="button"
                onClick={() => handleScrollHorizontally("left")}
                aria-label="Geser ke kiri di dalam kotak"
                title="Geser ke kiri di dalam kotak"
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                  canScrollLeft
                    ? "bg-[#007DFE]/20 text-[#007DFE] border-[#007DFE]/50 hover:bg-[#007DFE] hover:text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Tombol Geser Kanan Manual */}
              <button
                type="button"
                onClick={() => handleScrollHorizontally("right")}
                aria-label="Geser ke kanan di dalam kotak"
                title="Geser ke kanan di dalam kotak"
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                  canScrollRight
                    ? "bg-[#007DFE]/20 text-[#007DFE] border-[#007DFE]/50 hover:bg-[#007DFE] hover:text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Tombol Reset Posisi Scroll */}
              <button
                type="button"
                onClick={handleResetScroll}
                aria-label="Kembali ke posisi awal"
                title="Reset posisi scroll"
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Tombol Perbesar / Persempit Tampilan Kotak */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                aria-label={isFullscreen ? "Kecilkan kotak preview" : "Perbesar tinggi kotak preview"}
                title={isFullscreen ? "Perkecil tinggi kotak" : "Perluas tinggi kotak preview"}
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                  isFullscreen
                    ? "bg-[#007DFE] text-white border-[#007DFE]"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                }`}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Buka HTML di Tab Baru */}
              <a
                href={currentHtmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka kode HTML asli di jendela penuh"
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Kotak Card Preview dengan Overflow-X-Auto & Overflow-Y-Auto */}
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollStatus}
            className={`relative w-full overflow-x-auto overflow-y-auto bg-slate-950 p-3 sm:p-6 transition-all duration-300 scroll-smooth ${
              isFullscreen ? "h-[85vh]" : "h-[540px] sm:h-[680px] lg:h-[750px]"
            }`}
            style={{
              scrollbarWidth: "auto",
              scrollbarColor: "#007DFE #0f172a",
            }}
          >
            {/* Animasi Transisi Konten Slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSlide.id}-${viewMode}-${renderType}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col items-center justify-start min-h-full"
              >
                {/* -------------------------------------------------------------
                    KONDISI 1: MODE DESKTOP
                    Tampilan lebar desktop asli (1400px - 1440px)
                    User bisa scroll horizontal & vertikal di dalam kotak
                    ------------------------------------------------------------- */}
                {viewMode === "desktop" && (
                  <div className="w-full flex justify-start lg:justify-center">
                    <div
                      className="min-w-[1280px] w-[1400px] max-w-none bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/60 my-auto"
                      style={{ willChange: "transform" }}
                    >
                      {renderType === "image" ? (
                        /* Tampilan Tangkapan Layar HD Resolusi Asli */
                        <div className="relative w-full">
                          <img
                            src={activeSlide.desktopScreen}
                            alt={`${activeSlide.pageTitle} - Desktop View`}
                            className="w-full h-auto block select-none pointer-events-auto"
                            loading="eager"
                          />
                        </div>
                      ) : (
                        /* Tampilan Web Interaktif Asli (iFrame Tailwind HTML) */
                        <div className="relative w-full h-[850px] bg-white">
                          <iframe
                            src={activeSlide.desktopHtml}
                            title={`${activeSlide.pageTitle} Live Preview`}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    KONDISI 2: MODE APP / MOBILE
                    Tampilan smartphone device frame (390px - 410px)
                    Didalam kotak bisa di-scroll horizontal dan vertikal
                    ------------------------------------------------------------- */}
                {viewMode === "app" && (
                  <div className="w-full flex justify-start sm:justify-center py-2">
                    {/* Wadah frame mobile dengan lebar yang memungkinkan scroll horizontal di layar kecil */}
                    <div className="min-w-[340px] sm:min-w-[390px] w-[390px] max-w-full mx-auto">
                      {/* Device Mockup Shell (iPhone Titanium Style Frame) */}
                      <div className="relative rounded-[48px] p-3 sm:p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700/80">
                        {/* Dynamic Island / Speaker Notch */}
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-between px-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                          <div className="w-3 h-3 rounded-full bg-blue-950/60 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                          </div>
                        </div>

                        {/* Layar Smartphone Internal dengan Overflow Scroll Vertikal */}
                        <div className="relative w-full h-[620px] sm:h-[680px] bg-slate-100 rounded-[38px] overflow-y-auto overflow-x-hidden shadow-inner pt-7">
                          {renderType === "image" ? (
                            <div className="relative w-full">
                              <img
                                src={activeSlide.desktopScreen}
                                alt={`${activeSlide.pageTitle} - App View`}
                                className="w-full h-auto block select-none object-cover object-top"
                                loading="eager"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-white">
                              <iframe
                                src={currentHtmlUrl}
                                title={`${activeSlide.pageTitle} Mobile Preview`}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              />
                            </div>
                          )}
                        </div>

                        {/* Bottom Home Indicator Bar */}
                        <div className="w-32 h-1 rounded-full bg-slate-400/50 mx-auto mt-2" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Bar Kotak: Indikator Scroll & Status Navigasi */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#007DFE]" />
                Mode: {viewMode === "desktop" ? "Desktop (Lebar 1440px)" : "App / Mobile (390px)"}
              </span>
              <span>•</span>
              <span>Tipe: {renderType === "image" ? "Gambar HD Screenshot" : "Live HTML"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 hidden sm:inline">
                Gunakan kursor / trackpad / tombol panah untuk scroll mendatar dan menurun di dalam kotak
              </span>
              <button
                type="button"
                onClick={handleResetScroll}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Ke Atas / Awal
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PANEL PENJELASAN SLIDE LENGKAP & STRUKTUR HALAMAN
            ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          {/* Kolom Kiri (7 Kolom): Penjelasan Halaman & Komponen Utama */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#007DFE] uppercase tracking-wider">
                <span>Penjelasan Halaman ({activeSlide.name})</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                {activeSlide.pageTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                {activeSlide.description}
              </p>
            </div>

            {/* Komponen & Fitur Unggulan di Halaman Ini */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#007DFE]" />
                Komponen & Bagian Utama yang Berada di Halaman Ini:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSlide.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-[#007DFE] text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-white">
                        {sec.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-400 pl-7 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan (5 Kolom): Keunggulan Desain UI/UX & Aksi Buka */}
          <div className="lg:col-span-5 space-y-5 lg:border-l lg:border-slate-800 lg:pl-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Standar Kualitas Desain UI/UX:
              </h4>

              <div className="space-y-2.5">
                {activeSlide.uxHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007DFE] mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* URL Akses Langsung */}
              <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">
                  Direct Live Prototype:
                </span>
                <p className="text-xs font-mono text-slate-300 truncate">
                  {currentHtmlUrl}
                </p>
                <a
                  href={currentHtmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007DFE] hover:underline pt-1"
                >
                  <span>Buka di tab browser baru secara independen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Navigasi Cepat Slide Berikutnya */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Lanjut ke slide berikutnya?
              </div>
              <button
                type="button"
                onClick={goToNextSlide}
                disabled={
                  currentSlideIndex ===
                  companyProfileShowcaseData.slides.length - 1
                }
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#007DFE] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              >
                <span>Halaman Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Thumbnail Slide Visual Strip di Bagian Bawah */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-white font-poppins flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#007DFE]" />
              Semua Slide Halaman Website Company Profile ({companyProfileShowcaseData.slides.length} Halaman)
            </h3>
            <span className="text-xs text-slate-400">
              Klik kartu slide untuk langsung beralih
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {companyProfileShowcaseData.slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  handleResetScroll();
                }}
                className={`group relative rounded-xl overflow-hidden border p-2 flex flex-col text-left transition-all duration-200 cursor-pointer ${
                  currentSlideIndex === idx
                    ? "bg-[#007DFE]/15 border-[#007DFE] ring-2 ring-[#007DFE]/50 shadow-lg"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                {/* Mini Image Preview */}
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2 border border-slate-800/80">
                  <img
                    src={s.desktopScreen}
                    alt={s.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {currentSlideIndex === idx && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-[#007DFE] text-white flex items-center justify-center text-xs font-bold shadow-md">
                        ✓
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#007DFE]">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {s.name}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Call-to-Action Card for DickyWeb Clients */}
        <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#007DFE]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-[#007DFE] uppercase tracking-wider">
                Siap Meluncurkan Website Perusahaan Anda?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">
                Ingin Website Company Profile Berkelas Seperti Ini?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                DickyWeb siap merancang arsitektur website profil perusahaan eksklusif untuk bisnis Anda—lengkap dengan sistem multi-halaman interaktif, performa kilat, SEO teroptimasi, dan tampilan sempurna di seluruh gadget.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={consultationWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#007DFE] hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Konsultasi Sekarang via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href="/#portfolio"
                className="px-5 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center justify-center transition-all"
              >
                <span>Lihat Portofolio Lainnya</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
