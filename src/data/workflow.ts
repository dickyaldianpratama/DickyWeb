export interface WorkflowStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export const workflowData: WorkflowStep[] = [
  {
    step: "01",
    title: "Konsultasi & Strategi Konsep",
    tagline: "Memahami Kebutuhan & Tujuan Bisnis",
    description:
      "Kami mendiskusikan target pasar, referensi visual yang Anda sukai, struktur menu, serta penawaran utama bisnis Anda melalui chat atau meeting online santai.",
    duration: "Hari ke-1",
    deliverables: ["Sitemap Struktur Website", "Konsep Visual & Palet Warna", "Daftar Kebutuhan Konten"],
  },
  {
    step: "02",
    title: "Desain UI/UX & Prototyping",
    tagline: "Visual Eksklusif & Modern",
    description:
      "Kami merancang tata letak visual modern (Poppins, clean bento layout, mobile-first) agar tampilan website langsung mencuri perhatian calon pelanggan Anda.",
    duration: "Hari ke-2 s/d 3",
    deliverables: ["Mockup Tampilan Beresolusi Tinggi", "Review Desain Bersama Anda", "Penyesuaian & Feedback"],
  },
  {
    step: "03",
    title: "Coding, Animasi & Integrasi",
    tagline: "Performa Kilat & Standar Tinggi",
    description:
      "Membangun website dengan teknologi mutakhir (Next.js & Tailwind), mengoptimalkan skor Google PageSpeed, memasang tombol WhatsApp dinamis, serta sistem SEO.",
    duration: "Hari ke-4 s/d 6",
    deliverables: ["Website Fungsional Penuh", "Optimasi Kecepatan Mobile & Desktop", "Integrasi Form & WhatsApp"],
  },
  {
    step: "04",
    title: "Peluncuran & Garansi Perawatan",
    tagline: "Go-Live & Pendampingan Penuh",
    description:
      "Penghubungan domain resmi (.com), instalasi SSL keamanan, penyerahan akses akun, panduan cara pakai, serta garansi maintenance penuh.",
    duration: "Hari ke-7",
    deliverables: ["Website Resmi Online (Go-Live)", "Video Panduan Pengelolaan", "Garansi Maintenance Aktif"],
  },
];
