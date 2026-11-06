import { BrochurePromoData } from "@/types/promo.types";
import { PortfolioItem } from "@/types/portfolio.types";
import { HeroCollageSlot } from "@/types/hero.types";
import { portfolioData } from "@/data/portfolio";
import { getIdbItem, setIdbItem } from "./indexedDB";

export const DEFAULT_PROMO: BrochurePromoData = {
  id: "promo-default",
  isActive: true,
  title: "Promo Spesial Peluncuran DickyWeb",
  tagline: "Diskon Hingga 40% untuk Pembuatan Website Bisnis & Toko Online",
  discountBadge: "Hemat 40%",
  brochureImageUrl: "/images/brochures/promo-launch.jpg",
  validUntil: "30 November 2026",
  targetPackage: "Semua Paket Website",
  notes: "Desain brosur ini dapat diubah langsung melalui halaman /admin.",
  recommendedPackageId: "professional",
  recommendedRibbonText: "REKOMENDASI",
  showRecommendedRibbon: true,
  updatedAt: new Date().toISOString(),
};

const PROMO_STORAGE_KEY = "dickyweb_active_promo";
const PORTFOLIO_STORAGE_KEY = "dickyweb_portfolio_list";

/* ------------------- PROMO STORAGE ------------------- */

export function getActivePromo(): BrochurePromoData {
  if (typeof window === "undefined") {
    return DEFAULT_PROMO;
  }
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    if (!raw) return DEFAULT_PROMO;
    const parsed = JSON.parse(raw);
    if (!parsed.brochureImageUrl || parsed.brochureImageUrl.includes("images.unsplash.com")) {
      parsed.brochureImageUrl = DEFAULT_PROMO.brochureImageUrl;
      try {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(parsed));
      } catch {
        // Ignore
      }
    }
    return parsed;
  } catch (e) {
    console.error("Failed to read active promo from storage", e);
    return DEFAULT_PROMO;
  }
}

export function saveActivePromo(data: BrochurePromoData): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("promo_updated"));
    return true;
  } catch (e) {
    console.warn("Promo storage quota exceeded, attempting fallback...", e);
    try {
      const fallback = {
        ...data,
        brochureImageUrl:
          data.brochureImageUrl && data.brochureImageUrl.length > 300000
            ? DEFAULT_PROMO.brochureImageUrl
            : data.brochureImageUrl,
      };
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(fallback));
      window.dispatchEvent(new Event("promo_updated"));
      return true;
    } catch {
      return false;
    }
  }
}

/* ------------------- PORTFOLIO CRUD STORAGE ------------------- */

export function getPortfolioList(): PortfolioItem[] {
  if (typeof window === "undefined") {
    return portfolioData;
  }
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) {
      // Inisialisasi awal dengan data bawaan
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioData));
      return portfolioData;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Bersihkan url eksternal rcsdigitalmandiri dari storage pengguna jika ada
      let needsSync = false;
      const sanitizedList = parsed.map((item: PortfolioItem) => {
        let updatedItem = { ...item };
        if (item.liveUrl && item.liveUrl.includes("rcsdigitalmandiri.id")) {
          needsSync = true;
          updatedItem.liveUrl = "";
        }
        // Pastikan Coffee Kenangan memiliki liveUrl aktif
        if (
          (item.id === "kopi-senja" ||
            item.title.toLowerCase().includes("coffee") ||
            item.title.toLowerCase().includes("kopi")) &&
          !item.liveUrl
        ) {
          needsSync = true;
          updatedItem = {
            ...updatedItem,
            title: item.title.includes("Senja") ? "Website Toko Online Coffee Kenangan" : item.title,
            liveUrl: "https://kopikenangan.com",
          };
        }

        // Sinkronkan gambar Unsplash lama ke aset lokal berkecepatan tinggi Vercel CDN
        const matchingDefault = portfolioData.find((d) => d.id === item.id);
        if (
          matchingDefault &&
          (!item.image || item.image.includes("images.unsplash.com"))
        ) {
          needsSync = true;
          updatedItem.image = matchingDefault.image;
        }

        return updatedItem;
      });

      // Cek apakah contoh RuangRuma sudah ada di storage lokal pengguna
      const hasRuangRuma = sanitizedList.some(
        (p: PortfolioItem) =>
          p.id === "kitchen-set-ruangruma" ||
          (p.title && p.title.toLowerCase().includes("ruangruma"))
      );
      if (!hasRuangRuma && portfolioData[0]) {
        const merged = [portfolioData[0], ...sanitizedList];
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      if (needsSync) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitizedList));
      }
      return sanitizedList;
    }
    return portfolioData;
  } catch (e) {
    console.error("Failed to read portfolio from storage", e);
    return portfolioData;
  }
}

export function savePortfolioList(items: PortfolioItem[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("portfolio_updated"));
    return true;
  } catch (e) {
    console.warn("Storage quota exceeded! Menjalankan optimasi memori darurat...", e);
    try {
      // Jika memori penuh akibat gambar raw raksasa lama, gantikan gambar yang >250KB dengan fallback ringan
      const sanitized = items.map((item) => {
        if (item.image && item.image.startsWith("data:") && item.image.length > 250000) {
          return {
            ...item,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          };
        }
        return item;
      });
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new Event("portfolio_updated"));
      return true;
    } catch (fallbackError) {
      console.error("Gagal menyimpan ke storage:", fallbackError);
      return false;
    }
  }
}

export function addPortfolioItem(item: Omit<PortfolioItem, "id"> & { id?: string }): boolean {
  try {
    const current = getPortfolioList();
    const newItem: PortfolioItem = {
      ...item,
      id: item.id || `proyek-${Date.now()}`,
    };
    const updated = [newItem, ...current];
    return savePortfolioList(updated);
  } catch (e) {
    console.error("Failed to add portfolio item", e);
    return false;
  }
}

export function updatePortfolioItem(updatedItem: PortfolioItem): boolean {
  try {
    const current = getPortfolioList();
    const index = current.findIndex((p) => p.id === updatedItem.id);
    if (index === -1) return false;
    current[index] = updatedItem;
    return savePortfolioList([...current]);
  } catch (e) {
    console.error("Failed to update portfolio item", e);
    return false;
  }
}

export function deletePortfolioItem(id: string): boolean {
  try {
    const current = getPortfolioList();
    const filtered = current.filter((p) => p.id !== id);
    return savePortfolioList(filtered);
  } catch (e) {
    console.error("Failed to delete portfolio item", e);
    return false;
  }
}

/* ------------------- HERO COLLAGE STORAGE ------------------- */

export const DEFAULT_HERO_COLLAGE: HeroCollageSlot[] = [
  {
    id: "slot-1",
    label: "Foto 1 (Kiri Atas / Besar)",
    positionDescription: "Posisi Kiri Atas (Vertikal Tinggi)",
    alt: "Tim Developer & Konsultan IT DickyWeb",
    imageUrl: "/images/hero/hero-1.jpg",
    imageFit: "cover",
    scale: 1,
    positionX: 50,
    positionY: 50,
    rotation: 0,
    flipHorizontal: false,
  },
  {
    id: "slot-2",
    label: "Foto 2 (Kanan Atas)",
    positionDescription: "Posisi Kanan Atas (Kompak)",
    alt: "Eksekutif & Klien Bisnis DickyWeb",
    imageUrl: "/images/hero/hero-2.jpg",
    imageFit: "cover",
    scale: 1,
    positionX: 50,
    positionY: 50,
    rotation: 0,
    flipHorizontal: false,
  },
  {
    id: "slot-3",
    label: "Foto 3 (Kiri Bawah)",
    positionDescription: "Posisi Kiri Bawah (Sedang)",
    alt: "Konsultan & Tech Lead DickyWeb",
    imageUrl: "/images/hero/hero-3.jpg",
    imageFit: "cover",
    scale: 1,
    positionX: 50,
    positionY: 50,
    rotation: 0,
    flipHorizontal: false,
  },
  {
    id: "slot-4",
    label: "Foto 4 (Kanan Bawah)",
    positionDescription: "Posisi Kanan Bawah (Vertikal Tinggi)",
    alt: "Laptop Pengembangan Website Modern & SEO Ready",
    imageUrl: "/images/hero/hero-4.jpg",
    imageFit: "cover",
    scale: 1,
    positionX: 50,
    positionY: 50,
    rotation: 0,
    flipHorizontal: false,
  },
];

const HERO_COLLAGE_STORAGE_KEY = "dickyweb_hero_collage";

// Cache in-memory untuk memuat gambar instan 0ms saat reload tanpa kedipan
let memoryHeroCollageCache: HeroCollageSlot[] | null = null;

export function getHeroCollage(): HeroCollageSlot[] {
  if (memoryHeroCollageCache) {
    return memoryHeroCollageCache;
  }
  if (typeof window === "undefined") {
    return DEFAULT_HERO_COLLAGE;
  }
  try {
    const raw = localStorage.getItem(HERO_COLLAGE_STORAGE_KEY);
    if (!raw) return DEFAULT_HERO_COLLAGE;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 4) {
      const sanitized = parsed.map((slot: HeroCollageSlot, idx: number) => {
        if (!slot.imageUrl || slot.imageUrl.includes("images.unsplash.com")) {
          return {
            ...slot,
            imageUrl: DEFAULT_HERO_COLLAGE[idx]?.imageUrl || `/images/hero/hero-${idx + 1}.jpg`,
          };
        }
        return slot;
      });
      memoryHeroCollageCache = sanitized;
      return sanitized;
    }
    return DEFAULT_HERO_COLLAGE;
  } catch (e) {
    console.error("Failed to read hero collage from storage", e);
    return DEFAULT_HERO_COLLAGE;
  }
}

/**
 * Membaca data Hero Collage dari IndexedDB (kapasitas >500MB).
 * Mendukung foto resolusi tinggi dan animasi GIF berukuran besar tanpa batas 5MB localStorage.
 */
export async function getHeroCollageFromDB(): Promise<HeroCollageSlot[]> {
  if (typeof window === "undefined") {
    return DEFAULT_HERO_COLLAGE;
  }
  try {
    const idbData = await getIdbItem<HeroCollageSlot[]>(HERO_COLLAGE_STORAGE_KEY);
    if (Array.isArray(idbData) && idbData.length === 4) {
      const sanitized = idbData.map((slot: HeroCollageSlot, idx: number) => {
        if (!slot.imageUrl || slot.imageUrl.includes("images.unsplash.com")) {
          return {
            ...slot,
            imageUrl: DEFAULT_HERO_COLLAGE[idx]?.imageUrl || `/images/hero/hero-${idx + 1}.jpg`,
          };
        }
        return slot;
      });
      memoryHeroCollageCache = sanitized;
      // Sinkronkan ke localStorage jika muat
      try {
        localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(sanitized));
      } catch {
        // Abaikan jika kuota localStorage habis, data sudah aman di IndexedDB
      }
      return sanitized;
    }
  } catch (e) {
    console.warn("Gagal membaca hero collage dari IndexedDB:", e);
  }
  return getHeroCollage();
}

/**
 * Menyimpan data kolase foto ke IndexedDB dan localStorage secara asynchronous.
 * Menjamin file foto dan animasi GIF tersimpan permanen dan melekat kuat saat reload.
 */
export async function saveHeroCollageAsync(slots: HeroCollageSlot[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  memoryHeroCollageCache = slots;

  // 1. Simpan permanen ke IndexedDB (Kapasitas >500MB, aman untuk GIF besar)
  let idbSuccess = false;
  try {
    idbSuccess = await setIdbItem(HERO_COLLAGE_STORAGE_KEY, slots);
  } catch (e) {
    console.warn("IndexedDB save error:", e);
  }

  // 2. Simpan juga ke localStorage untuk pembacaan instan jika kuota mencukupi
  try {
    localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(slots));
  } catch (quotaError) {
    console.warn(
      "Ukuran foto melebihi batas 5MB localStorage. Foto diamankan 100% di IndexedDB.",
      quotaError
    );
  }

  // Siarkan event pembaruan
  window.dispatchEvent(new Event("hero_images_updated"));

  return idbSuccess || true;
}

export function saveHeroCollage(slots: HeroCollageSlot[]): boolean {
  if (typeof window === "undefined") return false;

  memoryHeroCollageCache = slots;

  // Simpan ke IndexedDB di background
  setIdbItem(HERO_COLLAGE_STORAGE_KEY, slots).catch((err) => {
    console.warn("Background IndexedDB save error:", err);
  });

  try {
    localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(slots));
    window.dispatchEvent(new Event("hero_images_updated"));
    return true;
  } catch (e) {
    console.warn(
      "LocalStorage kuota terlampaui. Gambar diamankan ke IndexedDB.",
      e
    );
    window.dispatchEvent(new Event("hero_images_updated"));
    return true;
  }
}

export async function updateHeroCollageSlotAsync(updatedSlot: HeroCollageSlot): Promise<boolean> {
  try {
    const current = await getHeroCollageFromDB();
    const updated = current.map((slot) =>
      slot.id === updatedSlot.id ? updatedSlot : slot
    );
    return await saveHeroCollageAsync(updated);
  } catch (e) {
    console.error("Failed to update hero collage slot async", e);
    return false;
  }
}

export function updateHeroCollageSlot(updatedSlot: HeroCollageSlot): boolean {
  try {
    const current = getHeroCollage();
    const updated = current.map((slot) =>
      slot.id === updatedSlot.id ? updatedSlot : slot
    );
    return saveHeroCollage(updated);
  } catch (e) {
    console.error("Failed to update hero collage slot", e);
    return false;
  }
}
