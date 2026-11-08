"use client";

import React, { useState, useEffect } from "react";
import { syncAllLocalDataToCloud } from "@/lib/storage";
import { Button } from "../ui/Button";
import {
  Cloud,
  CloudCheck,
  RefreshCw,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
} from "lucide-react";

interface CloudStatus {
  connected: boolean;
  bucket?: string;
  hasHeroCollage?: boolean;
  hasPortfolio?: boolean;
  hasPromo?: boolean;
  files?: string[];
  error?: string;
}

export const CloudSyncBanner: React.FC = () => {
  const [status, setStatus] = useState<CloudStatus | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);

  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const res = await fetch("/api/cloud/sync-status", { cache: "no-store" });
      const data: CloudStatus = await res.json();
      setStatus(data);

      // Jika cloud masih kosong (misal baru pertama kali terhubung), lakukan auto-sync
      if (data.connected && (!data.hasHeroCollage || !data.hasPortfolio)) {
        triggerAutoSync();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengecek status cloud";
      setStatus({ connected: false, error: msg });
    } finally {
      setIsChecking(false);
    }
  };

  const triggerAutoSync = async () => {
    try {
      const res = await syncAllLocalDataToCloud();
      if (res.success) {
        setSyncSuccess(true);
        setSyncMessage("Auto-sync selesai: Foto laptop berhasil diunggah ke Supabase Cloud!");
        // Refresh status
        const freshRes = await fetch("/api/cloud/sync-status", { cache: "no-store" });
        const freshData: CloudStatus = await freshRes.json();
        setStatus(freshData);
      }
    } catch {
      // Ignore background auto-sync failure
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      checkStatus();
    });
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    setSyncSuccess(null);

    try {
      const res = await syncAllLocalDataToCloud();
      setSyncSuccess(res.success);
      if (res.success) {
        setSyncMessage(
          `Sukses! ${res.heroCount} Foto Hero, ${res.portfolioCount} Proyek Portofolio, dan Brosur Promo telah tersimpan di Supabase Cloud. Sekarang semua device & HP menampilkan foto yang sama!`
        );
      } else {
        setSyncMessage(`Gagal sinkronisasi: ${res.message}`);
      }

      // Refresh status file di Supabase
      const checkRes = await fetch("/api/cloud/sync-status", { cache: "no-store" });
      const data: CloudStatus = await checkRes.json();
      setStatus(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setSyncSuccess(false);
      setSyncMessage(msg);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-blue-500/20">
      {/* Background Decorative Rings */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Baris Atas: Status Cloud & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-poppins text-white">
                  Supabase Cloud Database & Storage
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    status?.connected
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                      : isChecking
                      ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-400/40"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status?.connected
                        ? "bg-emerald-400 animate-pulse"
                        : isChecking
                        ? "bg-amber-400 animate-spin"
                        : "bg-rose-400"
                    }`}
                  />
                  {status?.connected
                    ? "Terhubung (Online)"
                    : isChecking
                    ? "Memeriksa..."
                    : "Gagal Terhubung"}
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Sinkronisasi otomatis multi-device: Laptop, Handphone, Tablet, dan Pengunjung Publik.
              </p>
            </div>
          </div>

          {/* Tombol Aksi Manual Sync */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              size="sm"
              variant="primary"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-none shadow-md inline-flex items-center gap-2 text-xs"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Mengunggah ke Supabase...</span>
                </>
              ) : (
                <>
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Sinkronkan Foto Laptop ke Cloud</span>
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={checkStatus}
              title="Periksa Ulang Koneksi"
              disabled={isChecking}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Status Sinkronisasi Tiap Komponen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {/* Item 1: Hero */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-200 font-medium">Foto Kolase Hero:</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                status?.hasHeroCollage
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-slate-500/20 text-slate-300"
              }`}
            >
              {status?.hasHeroCollage ? "Tersimpan di Cloud" : "Standar Lokal"}
            </span>
          </div>

          {/* Item 2: Portofolio */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200 font-medium">Portofolio Klien:</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                status?.hasPortfolio
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-slate-500/20 text-slate-300"
              }`}
            >
              {status?.hasPortfolio ? "Tersimpan di Cloud" : "Standar Lokal"}
            </span>
          </div>

          {/* Item 3: Promo */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <CloudCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-200 font-medium">Brosur Promo:</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                status?.hasPromo
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-slate-500/20 text-slate-300"
              }`}
            >
              {status?.hasPromo ? "Tersimpan di Cloud" : "Standar Lokal"}
            </span>
          </div>
        </div>

        {/* Notifikasi Hasil Sinkronisasi */}
        {syncMessage && (
          <div
            className={`p-3.5 rounded-2xl border text-xs font-medium flex items-start gap-2.5 animate-in fade-in ${
              syncSuccess
                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
                : "bg-rose-950/80 border-rose-500/50 text-rose-200"
            }`}
          >
            {syncSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p>{syncMessage}</p>
              {syncSuccess && (
                <p className="text-[11px] text-emerald-300/80">
                  Tip: Buka website di browser Handphone Anda sekarang lalu refresh (tarik ke bawah). Foto yang Anda ganti di laptop akan langsung tampil!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
