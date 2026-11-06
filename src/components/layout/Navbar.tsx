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

  // Sembunyikan floating CTA dan kunci scroll background saat mobile drawer terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(
        new CustomEvent("mobile_menu_state", { detail: { open: true } })
      );
    } else {
      document.body.style.overflow = "";
      window.dispatchEvent(
        new CustomEvent("mobile_menu_state", { detail: { open: false } })
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        mobileMenuOpen
          ? "bg-white/85 backdrop-blur-2xl border-b border-slate-200/50 shadow-xs"
          : isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xs border-b border-slate-200/90"
          : "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90"
      }`}
    >
      {/* Top Navbar Bar */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 transition-[padding] duration-200 ${
          mobileMenuOpen ? "border-b border-slate-200/40" : ""
        }`}
      >
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
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors cursor-pointer"
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

      {/* Mobile Drawer Menu: Glassmorphism Card (Frosted Semi-Transparan sesuai gambar referensi) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/75 backdrop-blur-2xl border-b border-slate-200/50 rounded-b-3xl px-6 pt-4 pb-6 shadow-xl shadow-slate-900/5 max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-3.5 text-base font-medium text-slate-800">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#007DFE] transition-colors"
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
                  className="w-full gap-2 shadow-md py-3 font-semibold"
                >
                  Konsultasi WhatsApp
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
