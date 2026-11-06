import { ServiceItem } from "@/types/service.types";

export const servicesData: ServiceItem[] = [
  {
    id: "landing-page",
    title: "High-Converting Landing Page",
    tagline: "Desain Fokus Penjualan & Iklan",
    description:
      "Halaman arahan profesional yang dirancang khusus untuk memikat calon pembeli, meningkatkan conversion rate iklan Meta/Google Ads, dan mempermudah pemesanan via WhatsApp.",
    iconName: "Target",
    badge: "Paling Diminati",
    idealFor: "UMKM, Peluncuran Produk, Event, Kampanye Iklan Berbayar",
    features: [
      "Copywriting Terstruktur & Persuasif",
      "Loading Kilat (< 1.5 detik)",
      "Integrasi Tombol WhatsApp Dinamis",
      "Desain Responsif Smartphone 100%",
      "Setup Google Analytics & Meta Pixel",
    ],
  },
  {
    id: "company-profile",
    title: "Corporate & Company Profile",
    tagline: "Kredibilitas & Otoritas Bisnis",
    description:
      "Website resmi perusahaan berkelas dunia untuk memperkenalkan visi, misi, layanan, legalitas, dan portofolio Anda kepada investor, rekan bisnis, dan calon klien korporat.",
    iconName: "Building2",
    badge: "Favorit Korporat",
    idealFor: "PT, CV, Agensi, Kantor Hukum, Konsultan, Kontraktor",
    features: [
      "Struktur Halaman Lengkap (About, Services, Team, Legalitas)",
      "Email Bisnis Resmi (@namaperusahaan.com)",
      "Optimasi SEO Google Page 1 Ready",
      "Formulir Permintaan Penawaran & Unduh Profil",
      "Keamanan Sertifikat SSL & Backup Otomatis",
    ],
  },
  {
    id: "e-commerce",
    title: "Toko Online & E-Commerce",
    tagline: "Katalog Produk & Pembayaran Otomatis",
    description:
      "Platform belanja online lengkap dengan fitur keranjang belanja, kalkulator ongkir otomatis (JNE/SiCepat/J&T), dan gerbang pembayaran otomatis (QRIS, VA Bank, E-Wallet).",
    iconName: "ShoppingBag",
    badge: "Siap Jualan",
    idealFor: "Brand Fashion, F&B, Skincare, Retail, Distributor Produk",
    features: [
      "Manajemen Produk & Stok Tak Terbatas",
      "Integrasi Payment Gateway Otomatis (QRIS / Midtrans)",
      "Hitung Ongkos Kirim Real-Time",
      "Notifikasi Pembelian Langsung ke WhatsApp / Email",
      "Dashboard Admin Penjualan Sederhana",
    ],
  },
  {
    id: "custom-webapp",
    title: "Custom Web Application & SaaS",
    tagline: "Sistem Informasi & Solusi Digital Unik",
    description:
      "Pengembangan sistem web kustom berkinerja tinggi, portal keanggotaan (membership), dashboard internal kantor, maupun aplikasi web SaaS dengan arsitektur modern.",
    iconName: "Code2",
    badge: "Solusi Kustom",
    idealFor: "Startup, Manajemen Internal Kantor, Komunitas, Layanan Khusus",
    features: [
      "Arsitektur Modern Next.js / React / Node.js",
      "Sistem Hak Akses & Autentikasi Pengguna",
      "Integrasi API & Database Terenkripsi",
      "Dashboard Analitik Interaktif",
      "Skalabilitas Serverless Cloud Ready (Vercel)",
    ],
  },
];
