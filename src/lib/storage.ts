import { BrochurePromoData } from "@/types/promo.types";
import { PortfolioItem } from "@/types/portfolio.types";
import { HeroCollageSlot } from "@/types/hero.types";
import { portfolioData } from "@/data/portfolio";
import { getIdbItem, setIdbItem } from "./indexedDB";
import { uploadMediaToCloud, saveCloudData, fetchCloudData } from "./supabase";

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

/**
 * Mengambil data promo aktif langsung dari Supabase Cloud CDN.
 * Jika cloud belum memiliki data atau offline, fallback ke localStorage / DEFAULT_PROMO.
 */
export async function getActivePromoFromCloud(): Promise<BrochurePromoData> {
  if (typeof window === "undefined") {
    return DEFAULT_PROMO;
  }
  try {
    const cloudPromo = await fetchCloudData<BrochurePromoData>("promo");
    if (cloudPromo && (cloudPromo.id || cloudPromo.title)) {
      try {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(cloudPromo));
      } catch {
        // Ignore
      }
      return cloudPromo;
    }
  } catch (err) {
    console.warn("Gagal mengambil promo dari Supabase cloud:", err);
  }
  return getActivePromo();
}

/**
 * Menyimpan data promo secara asynchronous ke Supabase Cloud (Storage & Site-Data)
 * serta mengamankan ke localStorage.
 */
export async function saveActivePromoAsync(data: BrochurePromoData): Promise<boolean> {
  if (typeof window === "undefined") return false;

  let finalData = { ...data };

  // 1. Jika flyer promo berupa base64, unggah ke Supabase bucket dickyweb-media/brochures
  if (finalData.brochureImageUrl && finalData.brochureImageUrl.startsWith("data:")) {
    try {
      const publicUrl = await uploadMediaToCloud(
        finalData.brochureImageUrl,
        "brochures",
        `promo-brochure-${Date.now()}.jpg`
      );
      if (publicUrl) {
        finalData.brochureImageUrl = publicUrl;
      }
    } catch (err) {
      console.error("Gagal mengunggah brosur ke Supabase:", err);
    }
  }

  // 2. Simpan JSON ke Supabase Cloud Site-Data
  try {
    await saveCloudData("promo", finalData);
  } catch (err) {
    console.warn("Gagal sinkronisasi promo ke cloud:", err);
  }

  // 3. Simpan ke localStorage sebagai cache lokal
  try {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(finalData));
    window.dispatchEvent(new Event("promo_updated"));
    return true;
  } catch (e) {
    console.warn("Promo storage quota exceeded, attempting fallback...", e);
    try {
      const fallback = {
        ...finalData,
        brochureImageUrl:
          finalData.brochureImageUrl && finalData.brochureImageUrl.length > 300000
            ? DEFAULT_PROMO.brochureImageUrl
            : finalData.brochureImageUrl,
      };
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(fallback));
      window.dispatchEvent(new Event("promo_updated"));
      return true;
    } catch {
      return false;
    }
  }
}

export function saveActivePromo(data: BrochurePromoData): boolean {
  if (typeof window === "undefined") return false;
  // Trigger background async cloud sync
  saveActivePromoAsync(data).catch((err) => {
    console.warn("Background promo save error:", err);
  });

  try {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("promo_updated"));
    return true;
  } catch {
    return false;
  }
}

/* ------------------- PORTFOLIO CRUD STORAGE ------------------- */

/**
 * Membersihkan dan memastikan konsistensi data portofolio dari LocalStorage / Cloud
 * Menjaga tampilan judul & gambar yang diinput admin tetap 100% utuh tanpa ditimpa paksa,
 * serta melengkapi data pendukung studi kasus (galeri, durasi, tahun, tantangan, solusi).
 */
export function sanitizePortfolioItems(list: PortfolioItem[]): PortfolioItem[] {
  // Singkirkan duplikasi agar tidak ada card ganda antara kitchen-set-ruangruma dan company-profile
  const seenIds = new Set<string>();
  const dedupedList: PortfolioItem[] = [];

  for (const item of list) {
    let normalizedId = item.id;
    if (normalizedId === "kitchen-set-ruangruma") {
      normalizedId = "company-profile";
    }
    if (seenIds.has(normalizedId)) {
      continue;
    }
    seenIds.add(normalizedId);
    dedupedList.push({
      ...item,
      id: normalizedId,
    });
  }

  return dedupedList.map((item: PortfolioItem) => {
    let updatedItem = { ...item };

    // 1. Bersihkan link mati atau domain dummy lama
    if (
      updatedItem.liveUrl &&
      (updatedItem.liveUrl.includes("rcsdigitalmandiri.id") ||
        updatedItem.liveUrl.includes("ruangruma.vercel.app"))
    ) {
      updatedItem.liveUrl = "";
    }

    // 2. Tentukan slug / detail URL untuk halaman studi kasus
    const matchingDefault = portfolioData.find(
      (d) =>
        d.id === updatedItem.id ||
        (d.slug && updatedItem.slug === d.slug) ||
        (d.title && updatedItem.title && d.title.toLowerCase() === updatedItem.title.toLowerCase())
    );

    if (matchingDefault) {
      // Lengkapi data studi kasus jika belum ada, tanpa menimpa inputan judul/kategori admin
      if (!updatedItem.slug) {
        updatedItem.slug = matchingDefault.slug;
      }
      if (!updatedItem.gallery || updatedItem.gallery.length === 0) {
        updatedItem.gallery = matchingDefault.gallery;
      }
      if (!updatedItem.duration) {
        updatedItem.duration = matchingDefault.duration;
      }
      if (!updatedItem.year) {
        updatedItem.year = matchingDefault.year;
      }
      if (!updatedItem.challenge) {
        updatedItem.challenge = matchingDefault.challenge;
      }
      if (!updatedItem.solutions || updatedItem.solutions.length === 0) {
        updatedItem.solutions = matchingDefault.solutions;
      }
      if (!updatedItem.results) {
        updatedItem.results = matchingDefault.results;
      }
      if (!updatedItem.aboutProject) {
        updatedItem.aboutProject = matchingDefault.aboutProject;
      }
      if (!updatedItem.excerpt) {
        updatedItem.excerpt = matchingDefault.excerpt;
      }
      if (!updatedItem.image || updatedItem.image.includes("images.unsplash.com")) {
        updatedItem.image = matchingDefault.image;
      }
    }

    // 3. Pastikan detailUrl mengarah ke halaman studi kasus produk/proyek tersebut
    updatedItem.detailUrl = `/portfolio/${updatedItem.slug || updatedItem.id}`;

    return updatedItem;
  });
}

export function getPortfolioList(): PortfolioItem[] {
  if (typeof window === "undefined") {
    return portfolioData;
  }
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioData));
      return portfolioData;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const sanitizedList = sanitizePortfolioItems(parsed);
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitizedList));
      return sanitizedList;
    }
    return portfolioData;
  } catch (e) {
    console.error("Failed to read portfolio from storage", e);
    return portfolioData;
  }
}

/**
 * Mengambil daftar portofolio langsung dari Supabase Cloud CDN.
 * Jika ada data di cloud, otomatis sinkronkan ke cache localStorage.
 */
export async function getPortfolioListFromCloud(): Promise<PortfolioItem[]> {
  if (typeof window === "undefined") {
    return portfolioData;
  }
  try {
    const cloudItems = await fetchCloudData<PortfolioItem[]>("portfolio");
    if (Array.isArray(cloudItems) && cloudItems.length > 0) {
      const sanitizedCloudItems = sanitizePortfolioItems(cloudItems);
      try {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitizedCloudItems));
      } catch {
        // Ignore quota error for localStorage
      }
      return sanitizedCloudItems;
    }
  } catch (err) {
    console.warn("Gagal mengambil portofolio dari cloud:", err);
  }
  return getPortfolioList();
}

/**
 * Menyimpan seluruh daftar portofolio ke Supabase Cloud (Storage & Site-Data)
 * Mengunggah setiap foto base64 ke Supabase Storage secara otomatis.
 */
export async function savePortfolioListAsync(items: PortfolioItem[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const updatedItems: PortfolioItem[] = [];

  // 1. Loop dan upload gambar baru yang masih berupa base64 ke Supabase Storage
  for (const item of items) {
    let finalItem = { ...item };
    if (finalItem.image && finalItem.image.startsWith("data:")) {
      try {
        const publicUrl = await uploadMediaToCloud(
          finalItem.image,
          "portfolio",
          `portfolio-${finalItem.id}-${Date.now()}.jpg`
        );
        if (publicUrl) {
          finalItem.image = publicUrl;
        }
      } catch (err) {
        console.error(`Gagal upload foto portofolio ${finalItem.id}:`, err);
      }
    }

    // Upload galeri cuplikan jika masih berupa base64
    if (Array.isArray(finalItem.gallery) && finalItem.gallery.length > 0) {
      const uploadedGallery: string[] = [];
      for (let i = 0; i < finalItem.gallery.length; i++) {
        const galleryImg = finalItem.gallery[i];
        if (galleryImg && galleryImg.startsWith("data:")) {
          try {
            const publicUrl = await uploadMediaToCloud(
              galleryImg,
              "portfolio",
              `portfolio-${finalItem.id}-gallery-${i}-${Date.now()}.jpg`
            );
            uploadedGallery.push(publicUrl || galleryImg);
          } catch (err) {
            console.error(`Gagal upload foto galeri ${finalItem.id} index ${i}:`, err);
            uploadedGallery.push(galleryImg);
          }
        } else {
          uploadedGallery.push(galleryImg);
        }
      }
      finalItem.gallery = uploadedGallery;
    }

    updatedItems.push(finalItem);
  }

  // 2. Simpan array JSON portofolio ke Supabase Site-Data
  try {
    await saveCloudData("portfolio", updatedItems);
  } catch (err) {
    console.warn("Gagal simpan portofolio ke cloud:", err);
  }

  // 3. Simpan ke localStorage
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("portfolio_updated"));
    return true;
  } catch (e) {
    console.warn("LocalStorage penuh, membersihkan gambar besar...", e);
    try {
      const sanitized = updatedItems.map((item) => {
        if (item.image && item.image.startsWith("data:") && item.image.length > 250000) {
          return {
            ...item,
            image: "/images/portfolio/portfolio-1.jpg",
          };
        }
        return item;
      });
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new Event("portfolio_updated"));
      return true;
    } catch {
      return false;
    }
  }
}

export function savePortfolioList(items: PortfolioItem[]): boolean {
  if (typeof window === "undefined") return false;
  // Trigger background async upload & sync
  savePortfolioListAsync(items).catch((err) => {
    console.warn("Background portfolio save error:", err);
  });

  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("portfolio_updated"));
    return true;
  } catch {
    return false;
  }
}

export async function addPortfolioItemAsync(
  item: Omit<PortfolioItem, "id"> & { id?: string }
): Promise<boolean> {
  try {
    let current = await getPortfolioListFromCloud();
    if (!Array.isArray(current) || current.length === 0) {
      current = getPortfolioList();
    }
    const newItem: PortfolioItem = {
      ...item,
      id: item.id || `proyek-${Date.now()}`,
    };
    const updated = [newItem, ...current];
    return await savePortfolioListAsync(updated);
  } catch (e) {
    console.error("Failed to add portfolio item async", e);
    try {
      const local = getPortfolioList();
      const newItem: PortfolioItem = {
        ...item,
        id: item.id || `proyek-${Date.now()}`,
      };
      const updated = [newItem, ...local];
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("portfolio_updated"));
      return true;
    } catch {
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

export async function updatePortfolioItemAsync(updatedItem: PortfolioItem): Promise<boolean> {
  try {
    let current = await getPortfolioListFromCloud();
    if (!Array.isArray(current) || current.length === 0) {
      current = getPortfolioList();
    }

    // 1. Cari berdasarkan ID yang sama persis
    let index = current.findIndex((p) => p.id === updatedItem.id);

    // 2. Jika tidak ditemukan berdasarkan ID (misal sinkronisasi ID berubah), cari kemiripan judul
    if (index === -1) {
      index = current.findIndex(
        (p) =>
          p.title && p.title.trim().toLowerCase() === updatedItem.title.trim().toLowerCase()
      );
    }

    // 3. Jika masih tidak ada di cloud, cek data lokal browser
    if (index === -1) {
      const localList = getPortfolioList();
      const localIndex = localList.findIndex((p) => p.id === updatedItem.id);
      if (localIndex !== -1) {
        current = localList;
        index = localIndex;
      }
    }

    // 4. Update data jika ditemukan, atau sisipkan di paling atas jika baru
    if (index !== -1) {
      current[index] = { ...current[index], ...updatedItem };
    } else {
      current.unshift(updatedItem);
    }

    return await savePortfolioListAsync([...current]);
  } catch (e) {
    console.error("Failed to update portfolio item async", e);
    // Fallback simpan lokal bila terjadi kendala jaringan cloud
    try {
      const local = getPortfolioList();
      const idx = local.findIndex((p) => p.id === updatedItem.id);
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...updatedItem };
      } else {
        local.unshift(updatedItem);
      }
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(local));
      window.dispatchEvent(new Event("portfolio_updated"));
      return true;
    } catch {
      return false;
    }
  }
}

export function updatePortfolioItem(updatedItem: PortfolioItem): boolean {
  try {
    const current = getPortfolioList();
    let index = current.findIndex((p) => p.id === updatedItem.id);
    if (index === -1) {
      index = current.findIndex(
        (p) => p.title && p.title.trim().toLowerCase() === updatedItem.title.trim().toLowerCase()
      );
    }
    if (index !== -1) {
      current[index] = { ...current[index], ...updatedItem };
    } else {
      current.unshift(updatedItem);
    }
    return savePortfolioList([...current]);
  } catch (e) {
    console.error("Failed to update portfolio item", e);
    return false;
  }
}

export async function deletePortfolioItemAsync(id: string): Promise<boolean> {
  try {
    let current = await getPortfolioListFromCloud();
    if (!Array.isArray(current) || current.length === 0) {
      current = getPortfolioList();
    }
    const filtered = current.filter((p) => p.id !== id);
    return await savePortfolioListAsync(filtered);
  } catch (e) {
    console.error("Failed to delete portfolio item async", e);
    try {
      const local = getPortfolioList().filter((p) => p.id !== id);
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(local));
      window.dispatchEvent(new Event("portfolio_updated"));
      return true;
    } catch {
      return false;
    }
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
 * Membaca data Hero Collage:
 * 1. Coba ambil dari Supabase Cloud (Site-Data). Ini memastikan device baru (misal HP) langsung dapat gambar terbaru.
 * 2. Jika offline / belum ada di cloud, fallback ke IndexedDB (>500MB).
 * 3. Fallback ke localStorage dan default.
 */
export async function getHeroCollageFromDB(): Promise<HeroCollageSlot[]> {
  if (typeof window === "undefined") {
    return DEFAULT_HERO_COLLAGE;
  }

  // 1. Coba ambil data dari Supabase Cloud
  try {
    const cloudData = await fetchCloudData<HeroCollageSlot[]>("hero-collage");
    if (Array.isArray(cloudData) && cloudData.length === 4) {
      const sanitized = cloudData.map((slot: HeroCollageSlot, idx: number) => {
        if (!slot.imageUrl || slot.imageUrl.includes("images.unsplash.com")) {
          return {
            ...slot,
            imageUrl: DEFAULT_HERO_COLLAGE[idx]?.imageUrl || `/images/hero/hero-${idx + 1}.jpg`,
          };
        }
        return slot;
      });
      memoryHeroCollageCache = sanitized;
      // Sinkronkan ke IndexedDB dan localStorage
      setIdbItem(HERO_COLLAGE_STORAGE_KEY, sanitized).catch(() => {});
      try {
        localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(sanitized));
      } catch {}
      return sanitized;
    }
  } catch (cloudErr) {
    console.warn("Gagal mengambil hero collage dari cloud:", cloudErr);
  }

  // 2. Fallback ke IndexedDB lokal jika cloud belum ada data / offline
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
      try {
        localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(sanitized));
      } catch {}
      return sanitized;
    }
  } catch (e) {
    console.warn("Gagal membaca hero collage dari IndexedDB:", e);
  }

  return getHeroCollage();
}

/**
 * Menyimpan data kolase foto:
 * 1. Mengunggah gambar base64 ke Supabase Storage (Public CDN).
 * 2. Menyimpan konfigurasi slot ke Supabase Site-Data (JSON Cloud).
 * 3. Menyimpan cache ke IndexedDB dan localStorage.
 */
export async function saveHeroCollageAsync(slots: HeroCollageSlot[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // 1. Loop dan upload gambar baru yang masih berupa data: URL ke Supabase Storage
  const updatedSlots: HeroCollageSlot[] = [];
  for (const slot of slots) {
    let finalSlot = { ...slot };
    if (finalSlot.imageUrl && finalSlot.imageUrl.startsWith("data:")) {
      try {
        const publicUrl = await uploadMediaToCloud(
          finalSlot.imageUrl,
          "hero",
          `hero-slot-${finalSlot.id}-${Date.now()}.jpg`
        );
        if (publicUrl) {
          finalSlot.imageUrl = publicUrl;
        }
      } catch (err) {
        console.error(`Gagal upload hero slot ${finalSlot.id} ke cloud:`, err);
      }
    }
    updatedSlots.push(finalSlot);
  }

  memoryHeroCollageCache = updatedSlots;

  // 2. Simpan konfigurasi ke Supabase Cloud
  try {
    await saveCloudData("hero-collage", updatedSlots);
  } catch (err) {
    console.warn("Gagal simpan hero-collage ke cloud:", err);
  }

  // 3. Simpan ke IndexedDB lokal
  let idbSuccess = false;
  try {
    idbSuccess = await setIdbItem(HERO_COLLAGE_STORAGE_KEY, updatedSlots);
  } catch (e) {
    console.warn("IndexedDB save error:", e);
  }

  // 4. Simpan ke localStorage
  try {
    localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(updatedSlots));
  } catch (quotaError) {
    console.warn("LocalStorage penuh, data aman di IndexedDB dan Supabase Cloud.", quotaError);
  }

  // Siarkan event pembaruan
  window.dispatchEvent(new Event("hero_images_updated"));

  return idbSuccess || true;
}

export function saveHeroCollage(slots: HeroCollageSlot[]): boolean {
  if (typeof window === "undefined") return false;

  memoryHeroCollageCache = slots;

  // Trigger background cloud sync
  saveHeroCollageAsync(slots).catch((err) => {
    console.warn("Background hero collage save error:", err);
  });

  try {
    localStorage.setItem(HERO_COLLAGE_STORAGE_KEY, JSON.stringify(slots));
    window.dispatchEvent(new Event("hero_images_updated"));
    return true;
  } catch {
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

/* ------------------- MASTER CLOUD MIGRATION / SYNC ------------------- */

export interface MasterSyncResult {
  success: boolean;
  heroCount: number;
  portfolioCount: number;
  promoSynced: boolean;
  message: string;
}

/**
 * Memindai seluruh data yang saat ini tersimpan di browser laptop (IndexedDB & LocalStorage),
 * kemudian mengunggah semua foto & JSON ke Supabase Cloud Storage.
 * Fungsi ini memastikan data yang sebelumnya diupload di laptop langsung tampil di HP dan semua device!
 */
export async function syncAllLocalDataToCloud(): Promise<MasterSyncResult> {
  if (typeof window === "undefined") {
    return {
      success: false,
      heroCount: 0,
      portfolioCount: 0,
      promoSynced: false,
      message: "Window undefined",
    };
  }

  try {
    let heroCount = 0;
    let portfolioCount = 0;
    let promoSynced = false;

    // 1. Sinkronkan Hero Collage
    let localHero = await getIdbItem<HeroCollageSlot[]>(HERO_COLLAGE_STORAGE_KEY);
    if (!localHero || !Array.isArray(localHero)) {
      localHero = getHeroCollage();
    }
    if (localHero && localHero.length === 4) {
      await saveHeroCollageAsync(localHero);
      heroCount = localHero.length;
    }

    // 2. Sinkronkan Portfolio
    const localPort = getPortfolioList();
    if (Array.isArray(localPort) && localPort.length > 0) {
      await savePortfolioListAsync(localPort);
      portfolioCount = localPort.length;
    }

    // 3. Sinkronkan Promo
    const localPromo = getActivePromo();
    if (localPromo) {
      await saveActivePromoAsync(localPromo);
      promoSynced = true;
    }

    return {
      success: true,
      heroCount,
      portfolioCount,
      promoSynced,
      message: "Semua data lokal dari laptop berhasil disinkronkan ke Supabase Cloud!",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal sinkronisasi ke cloud";
    console.error("Master cloud sync failed:", err);
    return {
      success: false,
      heroCount: 0,
      portfolioCount: 0,
      promoSynced: false,
      message: msg,
    };
  }
}
