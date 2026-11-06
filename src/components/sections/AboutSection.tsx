import React from "react";
import { Users, Lightbulb, Award } from "lucide-react";

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Users,
      title: "Experts & Experienced Team",
      description:
        "DickyWeb didukung oleh talenta profesional berpengalaman yang menguasai desain UI/UX modern, penulisan copywriting persuasif, dan coding performa tinggi.",
    },
    {
      icon: Lightbulb,
      title: "Sustainable Innovation",
      description:
        "Kami selalu mengikuti perkembangan tren teknologi terkini (Next.js, Tailwind, SEO modern) untuk menghasilkan website yang relevan, cepat, dan berdaya saing tinggi.",
    },
    {
      icon: Award,
      title: "Commitment to Quality",
      description:
        "Kualitas adalah prioritas mutlak kami. Setiap baris kode dan elemen visual dikerjakan dengan standar tinggi, tepat waktu, dan disertai garansi penuh.",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi (Sesuai Referensi Gambar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 sm:mb-12">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-poppins">
              Connecting Business with the Best Technology
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-6">
            <p className="text-base text-slate-600 leading-relaxed">
              Di <strong>DickyWeb</strong>, kami percaya bahwa setiap bisnis berhak memiliki eksistensi
              digital yang kredibel. Kami memadukan estetika visual elegan dengan arsitektur web modern
              agar website Anda tidak hanya enak dilihat, tetapi juga efektif mengubah pengunjung menjadi
              pelanggan setia.
            </p>
          </div>
        </div>

        {/* 3 Pilar Utama (Sesuai 3 Kolom Referensi Gambar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/60 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#007DFE] flex items-center justify-center group-hover:bg-[#007DFE] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
