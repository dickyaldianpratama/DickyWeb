"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { PromoSettingForm } from "@/components/admin/PromoSettingForm";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { HeroImagesManager } from "@/components/admin/HeroImagesManager";
import {
  Lock,
  ShieldCheck,
  ExternalLink,
  LogOut,
  LayoutDashboard,
  Briefcase,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"portfolio" | "hero" | "promo">("portfolio");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedAuth = sessionStorage.getItem("dickyweb_admin_auth");
        if (savedAuth === "true") {
          setIsAuthenticated(true);
        }
      } catch {
        // Ignore sessionStorage error in restricted environments
      } finally {
        setIsCheckingAuth(false);
      }
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === siteConfig.adminPin) {
      try {
        sessionStorage.setItem("dickyweb_admin_auth", "true");
      } catch {
        // Fallback if sessionStorage not permitted
      }
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("PIN salah! Gunakan PIN default: 1234");
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("dickyweb_admin_auth");
    } catch {
      // Fallback
    }
    setIsAuthenticated(false);
    setPinInput("");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Sisi Kiri: Logo & Identitas Admin */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center transition-transform hover:opacity-90"
              title="Panel Admin DickyWeb"
            >
              <div className="relative h-9 w-32 sm:w-36 flex items-center">
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.brandName}
                  width={140}
                  height={36}
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#007DFE] text-xs font-semibold border border-blue-200/60">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Control Panel</span>
            </div>
          </div>

          {/* Sisi Kanan: Aksi & Navigasi */}
          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Buka Website Pengunjung di Tab Baru"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs text-slate-700 hover:text-blue-600 border-slate-200 hover:bg-slate-50"
              >
                <span>Lihat Web</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Button>
            </a>

            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5 text-xs text-rose-600 hover:text-rose-700 border-rose-200 hover:bg-rose-50 cursor-pointer"
                title="Keluar dari sesi admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main
        className={`flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col ${
          !isAuthenticated ? "justify-center" : "justify-start"
        }`}
      >
        {!isAuthenticated ? (
          /* Card Login PIN Keamanan */
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#007DFE] flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-poppins pt-2">
                Akses Panel Admin
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan masukkan PIN otorisasi untuk mengelola portofolio hasil karya klien, flyer brosur promo, dan stempel rekomendasi paket.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan PIN"
                  className="w-full text-center text-xl tracking-[0.3em] font-mono px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007DFE] bg-slate-50/50"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-rose-500 mt-2 text-center font-medium">
                    {errorMsg}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full font-medium py-3 shadow-md"
              >
                Buka Panel Admin
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                PIN default demo:{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">
                  1234
                </code>
              </p>
            </div>
          </div>
        ) : (
          /* Dashboard Admin Terbuka */
          <div className="space-y-6">
            {/* Header Status & Tab Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sesi Admin Terverifikasi</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  DickyWeb Control Center
                </h1>
                <p className="text-xs text-slate-500">
                  Kelola konten dinamis website yang langsung tersinkronisasi ke pengunjung.
                </p>
              </div>

              {/* Tab Navigation Menu */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/80 self-start sm:self-auto flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("portfolio")}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "portfolio"
                      ? "bg-white text-[#007DFE] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Portofolio Klien</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("hero")}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "hero"
                      ? "bg-white text-[#007DFE] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Foto Kolase Hero</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("promo")}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "promo"
                      ? "bg-white text-[#007DFE] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Brosur & Promo</span>
                </button>
              </div>
            </div>

            {/* Tab Content Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
              {activeTab === "portfolio" ? (
                <PortfolioManager />
              ) : activeTab === "hero" ? (
                <HeroImagesManager />
              ) : (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-5">
                    <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                      Manajemen Brosur Promo & Rekomendasi
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Unggah file flyer/brosur promo dan atur stempel pita rekomendasi pada kartu paket harga.
                    </p>
                  </div>
                  <PromoSettingForm />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} {siteConfig.brandName} Control Center
      </footer>
    </div>
  );
}
