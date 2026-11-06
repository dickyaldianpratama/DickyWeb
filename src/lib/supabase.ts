import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rqvmxgrdreesbbqscbzr.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export const BUCKET_NAME = "dickyweb-media";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Mengunggah gambar (File, Blob, atau Base64 Data URL) ke Supabase Storage secara publik.
 * Mengembalikan Public URL permanen yang dapat diakses oleh semua device dan semua jaringan di seluruh dunia.
 */
export async function uploadMediaToCloud(
  input: File | Blob | string,
  folder: "hero" | "portfolio" | "brochures" = "hero",
  customFileName?: string
): Promise<string | null> {
  try {
    let base64String = "";

    if (typeof input === "string") {
      if (input.startsWith("http://") || input.startsWith("https://")) {
        // Jika sudah berupa URL online publik, langsung return tanpa perlu re-upload
        return input;
      }
      if (input.startsWith("data:")) {
        base64String = input;
      } else {
        return null;
      }
    } else {
      // Input File / Blob: konversi ke base64 Data URL
      base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(input);
      });
    }

    // Kirim ke endpoint API cloud upload yang diamankan dengan service role di server
    const res = await fetch("/api/cloud/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64String,
        folder,
        customFileName,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.error("Gagal upload media ke cloud:", errJson);
      return null;
    }

    const json = await res.json();
    return json.url || null;
  } catch (err) {
    console.error("Gagal mengunggah media ke Supabase:", err);
    return null;
  }
}

/**
 * Menyimpan data JSON global ke Supabase Storage (Site-Data).
 * Semua perangkat akan mengambil data dari file ini secara real-time.
 */
export async function saveCloudData<T>(fileName: string, data: T): Promise<boolean> {
  try {
    const res = await fetch("/api/cloud/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        data,
      }),
    });

    if (!res.ok) {
      console.warn(`Gagal menyimpan ${fileName} ke cloud: status ${res.status}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Gagal sinkronisasi ${fileName} ke cloud:`, err);
    return false;
  }
}

/**
 * Mengambil data JSON global dari Supabase Storage.
 * Membaca langsung dari Supabase Global CDN dengan cache-busting agar selalu mendapatkan versi termutakhir.
 */
export async function fetchCloudData<T>(fileName: string): Promise<T | null> {
  try {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/site-data/${fileName}.json?t=${Date.now()}`;

    const res = await fetch(publicUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as T;
    return json;
  } catch {
    // Kembalikan null jika offline atau file belum tersedia
    return null;
  }
}
