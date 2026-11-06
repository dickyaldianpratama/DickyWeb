import { siteConfig } from "@/data/siteConfig";

export function createWhatsAppLink(message?: string): string {
  const phone = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultText =
    message ||
    "Halo DickyWeb, saya tertarik untuk konsultasi pembuatan website modern untuk bisnis saya. Boleh minta info selengkapnya?";
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
}

export function createPackageWhatsAppLink(
  packageName: string,
  pricePromo: string
): string {
  const text = `Halo DickyWeb, saya tertarik untuk memesan *${packageName}* (Promo: ${pricePromo}). Boleh jelaskan langkah pemesanan dan jadwal diskusinya?`;
  return createWhatsAppLink(text);
}
