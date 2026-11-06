"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "../ui/Button";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sembunyikan floating CTA saat mobile drawer terbuka
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("mobile_menu_state", {
        detail: { open: mobileMenuOpen },
      })
    );
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-xs border-b border-slate-200/80"
            : "bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80"
        }`}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Top Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex items-center justify-between">
            {/* Brand Logo DickyWeb */}
            <Link
              href="#home"
              className="flex items-center gap-2 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative h-10 w-36 sm:h-12 sm:w-44 flex items-center">
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.brandName}
                  width={180}
                  height={55}
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#007DFE] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#007DFE] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" className="gap-2 shadow-md">
                  Contact Us
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors cursor-pointer select-none [-webkit-tap-highlight-color:transparent]"
                aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[2.2]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[2.2]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Floating Glassmorphism Card */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Dimmed backdrop tanpa blur berat untuk cegah GPU compositor flash */}
          <div
            className="absolute inset-0 bg-slate-900/25 transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Floating Glassmorphism Card right below the fixed top header */}
          <div className="relative pt-[62px] sm:pt-[70px] px-3.5 pb-6">
            {/* Outer Glass Shell: Menjaga bentuk rounded-3xl, border, dan glassmorphism tetap statis tanpa seam glitch */}
            <div
              className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl shadow-slate-900/10 overflow-hidden isolate"
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
              }}
            >
              {/* Inner Scroll Container: Scroll mulus bebas scrollbar & garis hitam vertikal */}
              <div
                className="max-h-[calc(100vh-90px)] overflow-y-auto overscroll-contain no-scrollbar p-5 sm:p-6 outline-none focus:outline-none [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <nav className="flex flex-col gap-3 text-base font-semibold text-slate-800">
                  {siteConfig.navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 px-2 rounded-xl hover:text-[#007DFE] hover:bg-white/40 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-slate-200/50 flex flex-col gap-3">
                    <a
                      href={createWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full justify-center shadow-lg shadow-blue-500/25 py-3 font-semibold rounded-2xl"
                      >
                        Konsultasi WhatsApp
                      </Button>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
