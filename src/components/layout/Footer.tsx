import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { createWhatsAppLink } from "@/lib/whatsapp";
import {
  MessageCircle,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-100/90 text-slate-600 pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/90">
          {/* Kolom 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-12 w-48 bg-white rounded-2xl px-3 py-1 flex items-center shadow-xs border border-slate-200/80">
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.brandName}
                width={170}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Solusi pembuatan website modern, cepat, dan berkonversi tinggi untuk UMKM, korporasi, hingga startup. <span className="text-[#007DFE] font-semibold">Build • Innovate • Grow</span> bersama DickyWeb.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Garansi Maintenance Resmi
              </span>
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-poppins">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#007DFE] transition-colors">
                  Landing Page Iklan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#007DFE] transition-colors">
                  Company Profile Perusahaan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#007DFE] transition-colors">
                  Toko Online E-Commerce
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#007DFE] transition-colors">
                  Custom Web & SaaS
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-poppins">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a href="#about" className="hover:text-[#007DFE] transition-colors">
                  Tentang DickyWeb
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#007DFE] transition-colors">
                  Portofolio Proyek
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#007DFE] transition-colors">
                  Paket & Diskon Promo
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#007DFE] transition-colors">
                  Alur Pengerjaan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#007DFE] transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-xs font-bold tracking-wider uppercase font-poppins">
              Kontak Kami
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-700 hover:text-[#007DFE] transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#007DFE] shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="text-slate-400">
            Professional Web Development & Digital Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};
