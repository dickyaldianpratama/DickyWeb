"use client";

import React, { useState, useEffect } from "react";
import { getPortfolioList } from "@/lib/storage";
import { portfolioData } from "@/data/portfolio";
import { PortfolioItem } from "@/types/portfolio.types";
import { PortfolioCard } from "../portfolio/PortfolioCard";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 4;

export const PortfolioSection: React.FC = () => {
  // Gunakan data bawaan sebagai state awal agar rendering server (SSR) dan client 100% identik
  const [items, setItems] = useState<PortfolioItem[]>(portfolioData);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setItems(getPortfolioList());
    };
    queueMicrotask(handleUpdate);

    window.addEventListener("portfolio_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_updated", handleUpdate);
  }, []);

  // Kategori dinamis dari data portofolio
  const categories = [
    "Semua",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filtered =
    activeCategory === "Semua"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // Reset ke halaman awal saat kategori diganti
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(0);
    setSlideDirection(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setSlideDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setSlideDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDotClick = (pageIdx: number) => {
    setSlideDirection(pageIdx > currentPage ? 1 : -1);
    setCurrentPage(pageIdx);
  };

  // Hanya ambil maksimal 4 kartu per halaman agar tidak memanjang ke bawah
  const displayedItems = filtered.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
              Selected Works & Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">
              Hasil Karya & Proyek Klien DickyWeb
            </h2>
            <p className="text-sm text-slate-600">
              Arahkan kursor ke kartu untuk melihat detail. Showcase website dan aplikasi bisnis yang kami bangun untuk klien DickyWeb.
            </p>
          </div>

          {/* Filter Pills Kategori */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#007DFE] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid: Maksimal 4 Kartu dengan Fitur Geser Halus */}
        {filtered.length > 0 ? (
          <div>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={`${activeCategory}-${currentPage}`}
                  custom={slideDirection}
                  initial={{
                    opacity: 0,
                    x: slideDirection > 0 ? 30 : slideDirection < 0 ? -30 : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: slideDirection > 0 ? -30 : slideDirection < 0 ? 30 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                >
                  {displayedItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigasi Fitur Geser (Hanya tampil jika proyek lebih dari 4 item) */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">
                  Menampilkan {currentPage * ITEMS_PER_PAGE + 1} -{" "}
                  {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filtered.length)} dari{" "}
                  {filtered.length} portofolio proyek
                </p>

                {/* Tombol Geser & Indicator Dots */}
                <div className="flex items-center gap-3">
                  {/* Tombol Geser Kiri (Sebelumnya) */}
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    aria-label="Slide sebelumnya"
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#007DFE] hover:text-white hover:border-[#007DFE] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Indicator Dots Interaktif */}
                  <div className="flex items-center gap-1.5 px-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Buka slide ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          currentPage === idx
                            ? "w-6 h-2 bg-[#007DFE]"
                            : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Tombol Geser Kanan (Berikutnya) */}
                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    aria-label="Slide berikutnya"
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#007DFE] hover:text-white hover:border-[#007DFE] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80 p-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007DFE] flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 font-poppins">
              Belum ada proyek di kategori ini
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Tambahkan portofolio baru melalui panel admin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
