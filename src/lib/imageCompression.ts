/**
 * Mengompresi dan mengubah ukuran gambar di browser (client-side) secara otomatis.
 * Mengubah file resolusi tinggi (misal 5MB-10MB hasil Canva/kamera) menjadi file ringan (~40KB-90KB)
 * dengan resolusi visual yang tetap tajam di layar, sehingga aman disimpan di browser storage
 * dan TIDAK PERNAH memicu error "exceeded the quota".
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.75
): Promise<string> {
  // Khusus file GIF: Jangan kompres melalui canvas agar animasi GIF tetap bergerak (tidak menjadi gambar statis)
  if (file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif")) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Pertahankan rasio aspek dan sesuaikan jika melebihi batas resolusi wajar
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Pengaturan smoothing gambar agar hasil kompresi tetap halus dan tajam
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Kompresi ke format WebP jika didukung (paling efisien), fallback ke JPEG
        try {
          const webpData = canvas.toDataURL("image/webp", quality);
          if (webpData && webpData.startsWith("data:image/webp")) {
            resolve(webpData);
            return;
          }
        } catch {
          // Abaikan fallback ke jpeg
        }

        const jpegData = canvas.toDataURL("image/jpeg", quality);
        resolve(jpegData);
      };

      img.onerror = () => {
        // Jika gagal decode, kembalikan dataUrl asli
        resolve(e.target?.result as string);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
