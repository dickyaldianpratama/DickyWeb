import { PortfolioItem } from "@/types/portfolio.types";

export const portfolioData: PortfolioItem[] = [
  {
    id: "kitchen-set-ruangruma",
    title: "Website Kitchen Set & Interior RuangRuma",
    client: "RuangRuma Custom Interior",
    category: "WEBSITE",
    description:
      "Website showcase portofolio interior custom & kitchen set modern dengan galeri resolusi tinggi, integrasi WhatsApp konsultasi, dan katalog desain.",
    image: "/images/portfolio/ruangruma-clean.png",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    metrics: "Inquiry konsultasi interior meningkat 280%",
    liveUrl: "",
  },
  {
    id: "aurora-law",
    title: "Website Firma Hukum Aurora & Partners",
    client: "Aurora Legal Group",
    category: "Company Profile",
    description:
      "Website profil firma hukum bergaya luxury modern dengan tata letak minimalis, formulir konsultasi terenkripsi, dan katalog rekam jejak kasus.",
    image: "/images/portfolio/aurora-law.jpg",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    metrics: "Meningkatkan permintaan konsultasi hingga 210%",
    liveUrl: "",
  },
  {
    id: "kopi-senja",
    title: "Website Toko Online Coffee Kenangan",
    client: "Coffee Kenangan",
    category: "Toko Online",
    description:
      "Platform e-commerce & aplikasi pemesanan kopi online dengan integrasi checkout instan QRIS dan kurir kilat.",
    image: "/images/portfolio/kopi-senja.jpg",
    techStack: ["Next.js", "Payment Gateway", "Tailwind CSS"],
    metrics: "1,500+ transaksi di bulan pertama rilis",
    liveUrl: "https://kopikenangan.com",
  },
  {
    id: "prospektif-saas",
    title: "Website Landing Page Prospektif Sales CRM",
    client: "Prospektif Tech",
    category: "Landing Page",
    description:
      "Landing page bento-grid berorientasi konversi tinggi untuk startup SaaS B2B, dilengkapi video preview interaktif dan kalkulator estimasi ROI.",
    image: "/images/portfolio/prospektif-saas.jpg",
    techStack: ["React", "Framer Motion", "Tailwind CSS"],
    metrics: "Skor Google PageSpeed 98/100",
    liveUrl: "",
  },
  {
    id: "medika-klinik",
    title: "Website Medika Utama Aesthetic Clinic",
    client: "Medika Group",
    category: "Company Profile",
    description:
      "Website estetika medis modern dengan integrasi kalender reservasi janji temu dokter spesialis dan katalog perawatan kulit.",
    image: "/images/portfolio/medika-klinik.jpg",
    techStack: ["Next.js", "Tailwind CSS", "WhatsApp API"],
    metrics: "Booking janji temu online meningkat 180%",
    liveUrl: "",
  },
];
