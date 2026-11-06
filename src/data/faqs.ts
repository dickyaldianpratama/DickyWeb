export interface FAQItem {
  question: string;
  answer: string;
  category: "Pemesanan" | "Teknis" | "Biaya" | "Garansi";
}

export const faqsData: FAQItem[] = [
  {
    category: "Pemesanan",
    question: "Bagaimana cara memesan jasa pembuatan website di DickyWeb?",
    answer:
      "Sangat mudah! Cukup klik tombol 'Konsultasi WhatsApp' atau pilih salah satu paket harga yang tersedia. Tim kami akan langsung memandu Anda mulai dari pemilihan nama domain, persiapan materi, hingga website siap tayang.",
  },
  {
    category: "Biaya",
    question: "Apakah biaya sudah termasuk domain dan hosting?",
    answer:
      "Ya, semua paket pembuatan website di DickyWeb sudah termasuk gratis domain resmi (seperti .com / .my.id) dan cloud hosting berkecepatan tinggi selama 1 tahun pertama tanpa biaya tersembunyi.",
  },
  {
    category: "Teknis",
    question: "Berapa lama waktu pengerjaan website sampai selesai?",
    answer:
      "Untuk Landing Page membutuhkan waktu 2 - 4 hari kerja. Untuk Company Profile profesional memakan waktu 5 - 7 hari kerja, dan untuk Toko Online / Custom Web membutuhkan 10 - 14 hari kerja.",
  },
  {
    category: "Teknis",
    question: "Apakah website buatan DickyWeb mudah dibuka di handphone?",
    answer:
      "100% Responsif! Kami menerapkan prinsip Mobile-First Design sehingga website Anda tampil sempurna, proporsional, dan sangat cepat saat dibuka lewat smartphone, tablet, maupun laptop.",
  },
  {
    category: "Garansi",
    question: "Bagaimana jika ada kendala atau eror setelah website selesai?",
    answer:
      "Kami memberikan Garansi Maintenance hingga 60 - 90 hari setelah website online. Jika terjadi kendala teknis atau eror sistem, tim kami siap membantu memperbaikinya tanpa pungutan biaya tambahan.",
  },
  {
    category: "Pemesanan",
    question: "Apakah saya bisa mengelola atau mengedit tulisan di website sendiri?",
    answer:
      "Tentu saja! Kami menyediakan dashboard yang ramah pengguna serta video tutorial khusus agar Anda atau staf Anda dapat memperbarui foto, teks artikel, maupun brosur promo dengan mudah.",
  },
];
