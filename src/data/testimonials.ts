export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Hendrik Prasetyo",
    role: "Managing Director",
    company: "Aurora Legal Group",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content:
      "DickyWeb berhasil mengubah citra firma hukum kami menjadi jauh lebih modern dan dipercaya klien luar negeri. Alur komunikasinya sangat jelas, cepat tanggap, dan hasilnya melebihi ekspektasi kami!",
    projectType: "Company Profile",
  },
  {
    id: "testi-2",
    name: "Clara Wijaya",
    role: "Founder & Brand Owner",
    company: "Senja Roastery",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content:
      "Toko online kami jadi gampang banget dipakai pembeli. Loading-nya super cepat dan pembayaran QRIS langsung masuk tanpa ribet. Omset penjualan online naik signifikan setelah launching!",
    projectType: "Toko Online",
  },
  {
    id: "testi-3",
    name: "Bambang Sudibyo",
    role: "CEO & Co-Founder",
    company: "Prospektif SaaS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content:
      "Desain bento grid dan animasinya sangat halus tapi tetap ringan. Banyak investor yang memuji kebersihan tampilan website kami. Terima kasih tim DickyWeb!",
    projectType: "Landing Page B2B",
  },
];
