import { PortfolioItem } from "@/types/portfolio.types";

export const portfolioData: PortfolioItem[] = [
  {
    id: "company-profile",
    slug: "website-company-profile",
    title: "Website Company Profile",
    client: "Corporate Enterprise Client",
    category: "WEBSITE",
    duration: "2 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus rancangan website profil korporasi modern berarsitektur glass skyline oleh DickyWeb: 8 halaman terstruktur, kapabilitas cloud & AI, artikel wawasan teknologi, dan portal kemitraan enterprise.",
    description:
      "Website company profile modern berarsitektur glass skyline dengan showcase layanan komputasi awan, artikel thought leadership, dan portal kemitraan multi-halaman interaktif.",
    aboutProject:
      "Website Company Profile ini dirancang khusus untuk memproyeksikan citra korporasi berstandar global. Memadukan arsitektur visual modern 'Tech Glass Skyline' dengan tata letak multi-halaman terstruktur yang menyajikan profil perusahaan, katalog solusi digital, artikel wawasan teknologi, hingga portal kemitraan enterprise.",
    challenge:
      "Menyajikan arsitektur informasi yang luas dan kompleks ke dalam tata letak yang bersih, elegan, dan intuitif bagi para eksekutif dan calon mitra bisnis, serta menyediakan mode preview lintas perangkat (Desktop & Mobile) yang responsif dan interaktif.",
    solutions: [
      "Arsitektur visual 'Corporate Tech Glass Skyline' dengan estetika modern, profesional, dan mewah",
      "Struktur 8 halaman lengkap: Beranda, Tentang Kami, Layanan Solusi, Berita & Wawasan, Detail Artikel, Arsip Kategori, Kontak Resmi, dan Konsultasi Kemitraan",
      "Kotak simulasi interaktif multi-device dengan pilihan dropdown Mode Desktop (1440px) dan Mode App/Mobile (390px) yang dapat di-scroll horizontal",
      "Portal penjadwalan konsultasi teknologi 30 menit terintegrasi dengan opsi persetujuan kerahasiaan NDA",
      "Optimasi SEO arsitektur konten dan integrasi saluran korespondensi WhatsApp prioritas 24/7",
    ],
    techDescription:
      "Dikembangkan menggunakan Next.js App Router, Tailwind CSS, TypeScript, dan Framer Motion dengan rancangan sistem desain yang konsisten, berkecepatan tinggi, dan skalabel.",
    techStack: ["Next.js", "React 19", "Tailwind CSS 4", "TypeScript", "Framer Motion", "WhatsApp API"],
    metrics: "Kredibilitas Korporat & Kemitraan Naik 240%",
    results:
      "Meningkatkan kepercayaan pemangku kepentingan korporat secara signifikan dengan kenaikan permintaan kemitraan B2B mencapai 240% serta apresiasi tinggi dari calon investor terhadap kemewahan desain antarmuka.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-kitchen-set-ruangruma-1793977471022.jpg",
    gallery: [
      "/images/portfolio/company-profile/yourcompany_home_page/screen.png",
      "/images/portfolio/company-profile/yourcompany_tentang_kami_about_us/screen.png",
      "/images/portfolio/company-profile/yourcompany_layanan_solusi_digital/screen.png",
      "/images/portfolio/company-profile/yourcompany_kabar_wawasan_terkini_news_insights/screen.png",
      "/images/portfolio/company-profile/yourcompany_detail_artikel_mengakselerasi_adopsi_generative_ai_di_perbankan/screen.png",
      "/images/portfolio/company-profile/yourcompany_arsip_kategori_teknologi_artificial_intelligence/screen.png",
      "/images/portfolio/company-profile/yourcompany_hubungi_kami_contact_us/screen.png",
      "/images/portfolio/company-profile/yourcompany_get_in_touch_konsultasi_kemitraan_enterprise/screen.png",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/company-profile",
    imageFit: "cover",
    imagePosition: "top",
  },
  {
    id: "kopi-senja",
    slug: "web-app-klinik-utama-indonesia",
    title: "Klinik Utama Indonesia",
    client: "Klinik Pratama & Utama Indonesia",
    category: "Web App",
    duration: "2 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus sistem web app manajemen klinik terpadu oleh DickyWeb: pendaftaran antrean digital real-time, rekam medis elektronik terintegrasi SATUSEHAT, dan reservasi dokter online.",
    description:
      "Sistem web app klinik terintegrasi untuk pendaftaran pasien online, antrean digital real-time, dan rekam medis elektronik yang aman dan cepat.",
    aboutProject:
      "Klinik Utama Indonesia adalah fasilitas pelayanan kesehatan yang melayani rawat jalan dan poli spesialis. Klien membutuhkan transformasi sistem digital untuk memangkas waktu tunggu antrean fisik di lokasi dan mendokumentasikan data pasien secara efisien sesuai standar Kemenkes.",
    challenge:
      "Mengurangi penumpukan antrean loket pendaftaran di pagi hari, mengamankan data riwayat rekam medis pasien dengan enkripsi tinggi, serta menghadirkan antarmuka registrasi pasien yang ramah lansia di layar smartphone.",
    solutions: [
      "Sistem nomor antrean digital berbasis QR Code yang dapat dipantau langsung dari WhatsApp pasien",
      "Modul Rekam Medis Elektronik (RME) standar SATUSEHAT dengan pencarian riwayat medis instan",
      "Jadwal praktek dokter interaktif dengan filter spesialisasi dan kuota harian otomatis",
      "Integrasi notifikasi pengingat jadwal konsultasi via WhatsApp otomatis",
      "Dashboard analitik kunjungan pasien harian dan laporan farmasi bagi manajemen klinik",
    ],
    techDescription:
      "Dikembangkan menggunakan Next.js App Router, Tailwind CSS, TypeScript, dan PostgreSQL dengan enkripsi data medis tingkat tinggi.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "WhatsApp API"],
    metrics: "Waktu tunggu antrean terpangkas 65%",
    results:
      "Mengurangi antrean fisik hingga 65% dan mendongkrak kepuasan pasien terhadap kecepatan layanan klinik hingga 95%.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-kopi-senja-1793977701298.jpg",
    gallery: [
      "/images/portfolio/medika-klinik.jpg",
      "/images/portfolio/hero/hero-3.jpg",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/web-app-klinik-utama-indonesia",
    imageFit: "cover",
    imagePosition: "top",
  },
  {
    id: "pt-cakrawala-logistik",
    slug: "web-app-pupuk-indonesia-jaya",
    title: "Web App Pupuk Indonesia Jaya",
    client: "PT Pupuk Indonesia Jaya",
    category: "Web App",
    duration: "3 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus sistem web app logistik dan monitoring distribusi pupuk oleh DickyWeb: pelacakan stok multi-gudang real-time dan otomasi alokasi kuota petani binaan.",
    description:
      "Aplikasi manajemen logistik & distribusi rantai pasok pupuk dengan pemantauan stok multi-gudang dan pelaporan analitik otomatis.",
    aboutProject:
      "PT Pupuk Indonesia Jaya mengelola distribusi ribuan ton pupuk per bulan ke ratusan distributor dan kios resmi. Klien membutuhkan sistem manajemen rantai pasok terpusat untuk mencegah keterlambatan suplai ke petani pada musim tanam.",
    challenge:
      "Menyinkronkan data inventori fisik dari puluhan gudang di berbagai daerah secara real-time dengan konektivitas internet yang fluktuatif, serta mencegah selisih data surat jalan (delivery order).",
    solutions: [
      "Dashboard stok multi-warehouse dengan update inventori otomatis saat barang keluar-masuk",
      "Fitur pelacakan armada truk distribusi dan validasi digital tanda terima pengiriman barang",
      "Sistem alokasi kuota pupuk otomatis berdasarkan verifikasi kelompok tani binaan",
      "Ekspor laporan mutasi barang dan analitik operasional otomatis format Excel & PDF",
    ],
    techDescription:
      "Dibangun dengan Next.js dan Tailwind CSS, ditunjang arsitektur REST API berkecepatan tinggi serta sinkronisasi data terdistribusi.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "PostgreSQL"],
    metrics: "Akurasi distribusi pupuk naik 99.2%",
    results:
      "Meniadakan selisih stok gudang hingga 99.2% dan mempercepat waktu penerbitan surat jalan dari 4 jam menjadi hanya 5 menit.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-pt-cakrawala-logistik-1793977515322.jpg",
    gallery: [
      "/images/portfolio/prospektif-saas.jpg",
      "/images/portfolio/hero/hero-1.jpg",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/web-app-pupuk-indonesia-jaya",
    imageFit: "contain",
    imagePosition: "top",
  },
  {
    id: "luxe-glow-clinic",
    slug: "website-drive-max-sewa-mobil",
    title: "Drive Max Sewa Mobil",
    client: "Drive Max Rental Fleet",
    category: "WEBSITE",
    duration: "1 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus website rental armada mobil profesional oleh DickyWeb: katalog kendaraan lengkap, kalkulator tarif sewa transparan, dan booking instan via WhatsApp.",
    description:
      "Website rental & sewa mobil premium dengan katalog unit lengkap, kalender ketersediaan armada, dan pemesanan cepat via WhatsApp.",
    aboutProject:
      "Drive Max adalah penyedia layanan rental mobil premium untuk keperluan bisnis, pariwisata, dan sewa harian/bulanan. Mereka membutuhkan website profil armada yang meyakinkan untuk memenangkan pasar korporat dan wisatawan.",
    challenge:
      "Menampilkan pilihan kendaraan (MPV, SUV, Luxury) dengan spesifikasi dan paket harga yang jelas, serta mengonversi pengunjung menjadi pemesanan instan tanpa formulir rumit.",
    solutions: [
      "Katalog armada interaktif dengan filter transmisi, kapasitas penumpang, dan paket lepas kunci/dengan sopir",
      "Kalkulator estimasi biaya sewa berdasarkan durasi hari dan opsi tambahan asuransi",
      "Tombol 'Booking Cepat' yang menyusun format pesan WhatsApp terstruktur ke admin customer service",
      "Optimasi SEO lokal untuk kata kunci pencarian rental mobil terpercaya",
    ],
    techDescription:
      "Next.js App Router dengan Tailwind CSS dan Framer Motion untuk showcase armada yang interaktif dan memikat calon penyewa.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "WhatsApp API"],
    metrics: "Reservasi armada meningkat 210%",
    results:
      "Meningkatkan konversi pemesanan armada rental sebesar 210% dan memangkas waktu tanya-jawab spesifikasi mobil hingga 70%.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-luxe-glow-clinic-1793977738354.jpg",
    gallery: [
      "/images/portfolio/hero/hero-2.jpg",
      "/images/portfolio/hero/hero-4.jpg",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/website-drive-max-sewa-mobil",
    imageFit: "cover",
    imagePosition: "top",
  },
  {
    id: "arjuna-property",
    slug: "toko-online-fresh-mart-organik",
    title: "Fresh Mart Toko Online",
    client: "Fresh Mart Organik Indonesia",
    category: "Toko Online",
    duration: "2 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus toko online bahan pangan segar & organik oleh DickyWeb: keranjang belanja instan, pilihan jadwal antar harian, dan pembayaran multi-channel.",
    description:
      "Platform e-commerce groceries belanja kebutuhan dapur harian, sayur buah segar dengan pengiriman terjadwal dan integrasi payment gateway.",
    aboutProject:
      "Fresh Mart adalah supermarket modern penyedia bahan makanan organik langsung dari petani lokal. Klien membutuhkan platform belanja online agar pelanggan perumahan dapat berbelanja sayur dan buah segar dari rumah setiap pagi.",
    challenge:
      "Memastikan proses checkout sesederhana mungkin bagi ibu rumah tangga, menyediakan slot waktu pengiriman same-day (pagi & sore), dan mengelola update stok produk segar harian.",
    solutions: [
      "Antarmuka katalog produk segar yang bersih dan visual segar dengan kategori terorganisir",
      "Keranjang belanja mengambang (sticky cart) dengan rekap total harga instan",
      "Pilihan slot jadwal pengiriman (Pagi: 06.00-09.00 / Sore: 16.00-19.00)",
      "Integrasi QRIS instan dan transfer bank otomatis tanpa perlu kirim bukti transfer manual",
    ],
    techDescription:
      "Dibangun dengan React, Next.js, dan Tailwind CSS, dipadukan dengan gateway pembayaran instan dan sistem notifikasi pesanan.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Payment Gateway"],
    metrics: "Pesanan harian melonjak 340%",
    results:
      "Berhasil memproses lebih dari 400 pesanan bahan pangan setiap minggunya dengan tingkat repeat-order mencapai 78%.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-arjuna-property-1793977647031.jpg",
    gallery: [
      "/images/portfolio/aurora-law.jpg",
      "/images/portfolio/hero/hero-4.jpg",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/toko-online-fresh-mart-organik",
    imageFit: "contain",
    imagePosition: "top",
  },
  {
    id: "sistem-hr-solusindo",
    slug: "web-app-top-up-game-terpercaya",
    title: "Top Up Game Termurah Dan Terpercaya",
    client: "GameZone Top Up Indonesia",
    category: "Web App",
    duration: "2 Minggu",
    year: "2026",
    excerpt:
      "Studi kasus web app top-up voucher game otomatis 24 jam oleh DickyWeb: verifikasi User ID game instan, checkout QRIS otomatis, dan transaksi sukses di bawah 10 detik.",
    description:
      "Web app top up game kilat hitungan detik untuk Mobile Legends, Free Fire, Valorant, dan PUBG dengan gerbang pembayaran QRIS otomatis.",
    aboutProject:
      "GameZone adalah portal top up voucher game populer bagi komunitas gamer Indonesia. Klien membutuhkan platform transaksi otomatis yang beroperasi 24/7 tanpa henti dengan kecepatan delivery diamond/kredit dalam hitungan detik.",
    challenge:
      "Menangani lonjakan ribuan transaksi saat event turnamen/diskon game, validasi User ID & Server ID game secara real-time agar tidak salah kirim, serta proses pembayaran otomatis tanpa admin manual.",
    solutions: [
      "Katalog game populer lengkap (Mobile Legends, Free Fire, Genshin Impact, Valorant, PUBG)",
      "Pengecekan username in-game otomatis secara real-time sebelum pembayaran dilakukan",
      "Penyelesaian pembayaran otomatis menggunakan QRIS Dinamis dan E-Wallet",
      "Pengiriman voucher / diamond game otomatis langsung masuk ke akun player dalam 5-10 detik",
    ],
    techDescription:
      "Next.js App Router performa tinggi dengan caching teroptimasi, REST API payment gateway berkecepatan tinggi, dan arsitektur anti-delay.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Payment Gateway API"],
    metrics: "Waktu transaksi otomatis < 10 detik",
    results:
      "Tingkat keberhasilan transaksi otomatis mencapai 99.8% dengan rata-rata waktu proses hanya 7 detik, melayani lebih dari 10.000 transaksi per bulan.",
    image:
      "https://rqvmxgrdreesbbqscbzr.supabase.co/storage/v1/object/public/dickyweb-media/portfolio/portfolio-sistem-hr-solusindo-1793977778538.jpg",
    gallery: [
      "/images/portfolio/prospektif-saas.jpg",
      "/images/portfolio/hero/hero-3.jpg",
    ],
    liveUrl: "",
    detailUrl: "/portfolio/web-app-top-up-game-terpercaya",
    imageFit: "cover",
    imagePosition: "top",
  },
];
