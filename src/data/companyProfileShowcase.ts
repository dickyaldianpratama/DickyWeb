export interface ShowcaseSlide {
  id: string;
  slideNumber: number;
  name: string;
  menuTitle: string;
  pageTitle: string;
  badge: string;
  urlPath: string;
  summary: string;
  description: string;
  sections: { title: string; desc: string }[];
  uxHighlights: string[];
  desktopScreen: string;
  desktopHtml: string;
  mobileHtml?: string;
}

export const companyProfileShowcaseData: {
  projectTitle: string;
  clientName: string;
  category: string;
  overview: string;
  designSystem: string;
  techStack: string[];
  slides: ShowcaseSlide[];
} = {
  projectTitle: "Website Company Profile Modern Enterprise Tech",
  clientName: "YourCompany Global Technology",
  category: "Company Profile Enterprise",
  overview:
    "Solusi arsitektur website profil perusahaan berkelas korporat global dengan identitas visual 'Corporate Tech Glass Skyline'. Dirancang khusus untuk memproyeksikan kredibilitas enterprise, kapabilitas infrastruktur cloud & AI, serta konversi kemitraan B2B tingkat tinggi.",
  designSystem: "Corporate Tech Glass Skyline (Navy Deep, Royal Blue & Sky Cyan)",
  techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Material Symbols"],
  slides: [
    {
      id: "home",
      slideNumber: 1,
      name: "Beranda (Home)",
      menuTitle: "01. Home Page",
      pageTitle: "Halaman Utama: Beranda (Home Page)",
      badge: "Main Entrypoint & First Impression",
      urlPath: "https://yourcompany.com/home",
      summary:
        "Pusat impresi utama korporasi yang menggabungkan visual arsitektur kaca modern dengan value proposition yang tegas untuk calon investor dan mitra enterprise.",
      description:
        "Halaman Home menjadi etalase utama yang mengkomunikasikan keunggulan teknologi dan skala kapabilitas perusahaan. Dilengkapi dengan atmospheric ambient glow, trust badge regional (ID, SG, JP), statistik 250+ klien enterprise, ikhtisar pilar produk unggulan, dan alur navigasi intuitif menuju portal konsultasi kemitraan.",
      sections: [
        {
          title: "Hero Banner & Atmospheric Glow",
          desc: "Visual gedung pencakar langit beraksen biru futuristik dengan copy 'Innovative Solutions for a Better Tomorrow'.",
        },
        {
          title: "Real-time Micro Metrics",
          desc: "Tampilan pencapaian 250+ klien tier-1 lintas kawasan Asia Pasifik dengan indikator bendera regional.",
        },
        {
          title: "Quick Action Gateway",
          desc: "Tombol ganda 'Explore More' dan 'Kunjungi Website Kami' untuk konversi navigasi cepat.",
        },
        {
          title: "Floating Architectural Spec Card",
          desc: "Komponen glassmorphism mengambang yang menampilkan parameter spesifikasi arsitektur cloud perusahaan.",
        },
      ],
      uxHighlights: [
        "Palet warna Navy Deep (#0B2545) & Royal Blue (#0047AB) membangkitkan rasa aman & kokoh",
        "Header sticky transparan dengan efek blur glassmorphism 20px",
        "Layout bento-grid responsif yang tertata rapi di desktop maupun mobile",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_home_page/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_home_page/code.html",
    },
    {
      id: "about",
      slideNumber: 2,
      name: "Tentang Kami (About Us)",
      menuTitle: "02. Tentang Kami",
      pageTitle: "Profil Korporasi: Tentang Kami (About Us)",
      badge: "Corporate Credibility & Leadership",
      urlPath: "https://yourcompany.com/about",
      summary:
        "Eksplorasi mendalam mengenai rekam jejak, visi strategis, nilai integritas, dan jajaran dewan eksekutif di balik keberhasilan perusahaan.",
      description:
        "Halaman Tentang Kami dirancang untuk membangun keyakinan institusional jangka panjang. Menampilkan garis waktu milestone ekspansi, matriks keunggulan operasional (99.99% Uptime, 15+ tahun kepemimpinan pasar), prinsip kerja ESG & kepatuhan global, serta direktori profil eksekutif C-Level lengkap dengan kredensial profesional.",
      sections: [
        {
          title: "Narasi Visi & Misi Strategis",
          desc: "Penjelasan komprehensif mengenai misi perusahaan dalam mengakselerasi transformasi digital industri bernilai miliaran dolar.",
        },
        {
          title: "Milestone Infografis & Rekam Jejak",
          desc: "Visualisasi garis waktu perkembangan perusahaan dari pelopor solusi lokal hingga menjadi konsorsium teknologi regional.",
        },
        {
          title: "Dewan Kepemimpinan & Eksekutif",
          desc: "Grid interaktif kartu profil pimpinan dengan foto beresolusi tinggi, jabatan strategis, dan keahlian spesifik.",
        },
        {
          title: "Komitmen Kepatuhan & Standar Mutu",
          desc: "Sertifikasi ISO 27001, SOC-2 Type II, dan standar keamanan data perbankan yang dianut institusi.",
        },
      ],
      uxHighlights: [
        "Tipografi Plus Jakarta Sans dengan skala hierarki yang mudah dipindai pembaca eksekutif",
        "Kartu nilai-nilai perusahaan dengan micro-hover interaction yang halus",
        "Layout seimbang antara narasi teks otoritatif dan visualisasi data statistik",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_tentang_kami_about_us/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_tentang_kami_about_us/code.html",
    },
    {
      id: "services",
      slideNumber: 3,
      name: "Layanan & Solusi",
      menuTitle: "03. Layanan & Solusi",
      pageTitle: "Katalog Kapabilitas: Layanan & Solusi Digital",
      badge: "Full-Stack Enterprise Solutions",
      urlPath: "https://yourcompany.com/services",
      summary:
        "Portofolio lengkap layanan rekayasa teknologi mulai dari infrastruktur komputasi awan, tata kelola keamanan siber, hingga AI solution engineering.",
      description:
        "Halaman Layanan membedah penawaran solusi B2B secara terstruktur dan terukur. Calon klien korporat dapat mempelajari spesifikasi arsitektur hybrid cloud, implementasi kecerdasan buatan terapan, integrasi sistem perbankan terdistribusi, serta metodologi empat tahap bergaransi SLA tinggi.",
      sections: [
        {
          title: "Pilar Solusi Utama (Enterprise Grid)",
          desc: "Kategori kapabilitas yang meliputi Cloud Engineering, Cybersecurity Governance, Data Intelligence, dan DevOps Lifecycle.",
        },
        {
          title: "Alur Metodologi 4 Tahap",
          desc: "Tahapan implementasi transparan: Discovery & Audit, Blueprint Arsitektur, Eksekusi Agile, dan 24/7 Managed Operations.",
        },
        {
          title: "Matriks Perbandingan Service Level (SLA)",
          desc: "Tabel transparan garansi respons, availability 99.95% - 99.99%, serta dedicated account engineer.",
        },
        {
          title: "Integrasi Konsultasi Langsung",
          desc: "Direct callout di setiap modul layanan untuk langsung terhubung dengan Principal Architect terkait.",
        },
      ],
      uxHighlights: [
        "Bento-card modern dengan aksen batas halus (slate-border) dan efek pantulan cahaya",
        "Ikonografi Material Symbols berbobot konsisten untuk representasi teknis yang jelas",
        "Navigasi tab kategori layanan yang mempermudah perbandingan spesifikasi",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_layanan_solusi_digital/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_layanan_solusi_digital/code.html",
    },
    {
      id: "news",
      slideNumber: 4,
      name: "Kabar & Wawasan",
      menuTitle: "04. Kabar & Berita",
      pageTitle: "Pusat Opini: Kabar & Wawasan Terkini (News & Insights)",
      badge: "Thought Leadership & Media Hub",
      urlPath: "https://yourcompany.com/news",
      summary:
        "Portal publikasi riset industri, rilis pers korporasi, artikel opini ahli, dan kabar pembaruan ekosistem teknologi perusahaan.",
      description:
        "Halaman Kabar & Wawasan berfungsi sebagai instrumen thought leadership yang menegaskan reputasi perusahaan sebagai acuan industri. Dilengkapi kurasi tajuk utama unggulan, filter topik mutakhir, indikator estimasi waktu membaca, dan integrasi buletin berkala untuk para pemangku kepentingan.",
      sections: [
        {
          title: "Featured Lead Article",
          desc: "Artikel tajuk utama dengan visual dramatis, label topik prioritas, dan ringkasan eksekutif instan.",
        },
        {
          title: "Filter Kategori Dinamis",
          desc: "Pilihan klasifikasi konten: Artificial Intelligence, Cloud Infrastructure, Financial Tech, dan ESG Innovation.",
        },
        {
          title: "Feed Artikel Berita Multi-Grid",
          desc: "Kartu artikel dengan cap waktu publikasi, nama analis penulis, estimasi reading time, dan tombol bookmark.",
        },
        {
          title: "Langganan Buletin Wawasan Eksekutif",
          desc: "Formulir pendaftaran ringkas bagi analis dan mitra untuk menerima intisari riset mingguan.",
        },
      ],
      uxHighlights: [
        "Hierarki tipografi editorial yang nyaman dibaca berjam-jam tanpa melelahkan mata",
        "Pemberian bobot visual kontras antara artikel analisis mendalam dan berita singkat rilis pers",
        "Card layout responsif yang tertata rapi dalam rasio gambar 16:9 yang konsisten",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_kabar_wawasan_terkini_news_insights/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_kabar_wawasan_terkini_news_insights/code.html",
    },
    {
      id: "article-detail",
      slideNumber: 5,
      name: "Detail Artikel Riset",
      menuTitle: "05. Detail Artikel",
      pageTitle: "Halaman Konten: Detail Artikel Riset & Wawasan Mendalam",
      badge: "In-Depth Editorial Experience",
      urlPath: "https://yourcompany.com/news/adopsi-generative-ai-perbankan",
      summary:
        "Tata letak membaca artikel editorial mendalam yang mengulas studi kasus adopsi Generative AI pada sektor perbankan dan industri finansial.",
      description:
        "Halaman Detail Artikel mengoptimalkan kenyamanan membaca analitik berbobot tinggi. Memuat profil penulis spesialis, kutipan analitis (pull quotes) beraksen royal blue, bagan arsitektur data, tombol bagikan ke LinkedIn & platform profesional, serta rekomendasi artikel terkait.",
      sections: [
        {
          title: "Header Editorial & Kredensial Penulis",
          desc: "Judul analisis 'Mengakselerasi Adopsi Generative AI di Perbankan', tanggal rilis, dan profil Chief AI Officer.",
        },
        {
          title: "Body Konten Terstruktur & Pull Quotes",
          desc: "Format teks ramah mata dengan subjudul bertahap, data empiris, dan kutipan kunci yang ditekankan secara visual.",
        },
        {
          title: "Bagan Arsitektur & Ilustrasi Teknis",
          desc: "Visualisasi diagram alur kerja model LLM privat terenkripsi di lingkungan komputasi perbankan berkeamanan tinggi.",
        },
        {
          title: "Bagikan & Rekomendasi Terkait",
          desc: "Tool share satu-klik ke LinkedIn dan kurasi 3 artikel rekomendasi yang relevan dengan topik finansial.",
        },
      ],
      uxHighlights: [
        "Lebar baris pembacaan ergonomis (optimal reading line length 65-75 karakter)",
        "Spasi vertikal lapang dengan ukuran font 18px (Inter) yang jernih dan tajam",
        "Sticky breadcrumb navigasi untuk kembali ke katalog berita dengan mulus",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_detail_artikel_mengakselerasi_adopsi_generative_ai_di_perbankan/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_detail_artikel_mengakselerasi_adopsi_generative_ai_di_perbankan/code.html",
    },
    {
      id: "category-archive",
      slideNumber: 6,
      name: "Arsip Kategori",
      menuTitle: "06. Arsip Kategori",
      pageTitle: "Navigasi Riset: Arsip Kategori Khusus (AI & Cloud)",
      badge: "Faceted Taxonomy & Filter",
      urlPath: "https://yourcompany.com/news/category/artificial-intelligence",
      summary:
        "Pengelompokan arsip riset dan publikasi terstruktur berdasarkan domain keahlian teknologi khusus, dengan indikator jumlah dokumen aktif.",
      description:
        "Halaman Arsip Kategori memudahkan para analis riset dan calon klien menelusuri seluruh pustaka pengetahuan perusahaan dalam satu topik terfokus. Menampilkan deskripsi domain teknologi, counter total artikel, sistem pengurutan relevansi, dan kartu artikel bernomor halaman.",
      sections: [
        {
          title: "Header Taksonomi & Deskripsi Domain",
          desc: "Ringkasan fokus bahasan teknologi Artificial Intelligence dan perannya dalam transformasi industri modern.",
        },
        {
          title: "Filter Chips Aktif & Tag Terkait",
          desc: "Pilihan sub-topik pendukung seperti Machine Learning, NLP, Computer Vision, dan Sovereign AI Governance.",
        },
        {
          title: "Katalog Artikel Berbasis Grid",
          desc: "Daftar publikasi dengan thumbnail beresolusi tajam, nama peneliti utama, dan tanggal terbit.",
        },
        {
          title: "Sistem Pagination Bernomor",
          desc: "Navigasi halaman intuitif yang memungkinkan pembaca berpindah antar halaman arsip tanpa kebingungan.",
        },
      ],
      uxHighlights: [
        "Pill badge kategori aktif dengan warna Royal Blue menyala sebagai orientasi visual instan",
        "Sistem grid 3-kolom yang secara dinamis menyusut menjadi 1-kolom yang nyaman di ponsel pintar",
        "Indikator status pencarian dan breadcrumbs dua lapis",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_arsip_kategori_teknologi_artificial_intelligence/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_arsip_kategori_teknologi_artificial_intelligence/code.html",
    },
    {
      id: "contact",
      slideNumber: 7,
      name: "Hubungi Kami (Contact)",
      menuTitle: "07. Hubungi Kami",
      pageTitle: "Pusat Komunikasi: Hubungi Kami & Kantor Global",
      badge: "Global Headquarters & Direct Reach",
      urlPath: "https://yourcompany.com/contact",
      summary:
        "Pusat saluran resmi korporasi yang merangkum lokasi kantor perwakilan global, jam operasional layanan, dan formulir korespondensi aman.",
      description:
        "Halaman Kontak dirancang untuk menjembatani komunikasi formal antara perusahaan dengan klien internasional, calon vendor, dan media massa. Memuat rincian alamat gedung perkantoran di Jakarta, Singapura, dan Tokyo, hotline siaga 24/7, serta formulir pengiriman berkas yang terenkripsi.",
      sections: [
        {
          title: "Direktori Kantor Regional Asia Pasifik",
          desc: "Kartu lokasi Jakarta HQ, Singapore Financial Center, dan Tokyo Technology Hub lengkap dengan nomor telepon langsung.",
        },
        {
          title: "Peta & Panduan Lokasi Interaktif",
          desc: "Representasi visual titik koordinat perkantoran dengan petunjuk akses transportasi eksekutif.",
        },
        {
          title: "Formulir Pengajuan Pertanyaan Cepat",
          desc: "Bidang input terstruktur untuk nama perusahaan, email institusional, klasifikasi kebutuhan, dan lampiran dokumen.",
        },
        {
          title: "Helpdesk Siaga & Emergency Escalation",
          desc: "Informasi kontak khusus bagi pemegang kontrak SLA Tier-1 untuk penanganan kendala darurat non-stop.",
        },
      ],
      uxHighlights: [
        "Kartu kantor floating glass dengan penanda status waktu operasional lokal secara real-time",
        "Formulir dengan validasi langsung dan proteksi keamanan anti-spam",
        "Desain responsif yang memudahkan panggilan telepon satu-ketuk langsung dari perangkat ponsel",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_hubungi_kami_contact_us/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_hubungi_kami_contact_us/code.html",
    },
    {
      id: "consultation",
      slideNumber: 8,
      name: "Portal Konsultasi",
      menuTitle: "08. Konsultasi Kemitraan",
      pageTitle: "Konversi Kemitraan: Portal Konsultasi Enterprise (Get in Touch)",
      badge: "High-Value Conversion Funnel",
      urlPath: "https://yourcompany.com/consultation",
      summary:
        "Portal interaktif penjadwalan sesi konsultasi arsitektur 30 menit bersama prinsipal teknologi, dilengkapi trust grid dan alur booking mandiri.",
      description:
        "Halaman Konsultasi Kemitraan adalah puncak dari alur konversi website company profile. Di sini, pengambil keputusan perusahaan dapat memesan sesi diskusi arsitektur tanpa komitmen, menentukan target anggaran, serta memilih protokol kerahasiaan NDA. Halaman ini juga memiliki versi mobile app-native yang sangat ergonomis.",
      sections: [
        {
          title: "Trust Grid Komitmen Layanan (2x2)",
          desc: "Poin pembuktian kredibilitas: 350+ proyek enterprise tier-1, 99.8% CSAT score, dan SLA respons di bawah 2 jam.",
        },
        {
          title: "Formulir Booking Konsultasi 30 Menit",
          desc: "Seleksi preferensi topik (Cloud Modernization, Enterprise AI, Cyber Defense) dan pemilihan tanggal kalender.",
        },
        {
          title: "Protokol Kerahasiaan Perusahaan (NDA)",
          desc: "Jaminan perlindungan data komersial dan opsi penandatanganan kesepakatan kerahasiaan digital instan.",
        },
        {
          title: "Tampilan Khusus Mobile First",
          desc: "Layout khusus layar ponsel pintar dengan kontrol sentuh satu tangan dan tombol sticky aksi cepat.",
        },
      ],
      uxHighlights: [
        "Tersedia versi desain khusus aplikasi mobile yang dioptimalkan untuk navigasi smartphone",
        "Komponen trust indicator yang menaikkan rasa percaya diri klien sebesar 210%",
        "Formulir ringkas tanpa gesekan yang memaksimalkan tingkat penyelesaian pendaftaran",
      ],
      desktopScreen:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_get_in_touch_konsultasi_kemitraan_enterprise/screen.png",
      desktopHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_get_in_touch_konsultasi_kemitraan_enterprise/code.html",
      mobileHtml:
        "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_get_in_touch_mobile_konsultasi_kemitraan/code.html",
    },
  ],
};
