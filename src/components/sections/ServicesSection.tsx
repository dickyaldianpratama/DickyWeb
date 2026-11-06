import React from "react";
import { servicesData } from "@/data/services";
import { ArrowUpRight, Check, Target, Building2, ShoppingBag, Code2 } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Badge } from "../ui/Badge";

const iconMap: Record<string, React.ElementType> = {
  Target: Target,
  Building2: Building2,
  ShoppingBag: ShoppingBag,
  Code2: Code2,
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi (Sesuai Referensi Gambar) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
            Products & Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-poppins">
            From Idea to Implementation, We Are Ready to Support
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Kami menawarkan rangkaian layanan teknologi website yang disesuaikan secara khusus dengan
            skala dan kebutuhan unik bisnis Anda.
          </p>
        </div>

        {/* Grid Kartu Layanan (Sesuai Desain Kartu dengan Ikon Panah Melingkar ↗) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || Target;
            const waServiceUrl = createWhatsAppLink(
              `Halo DickyWeb, saya tertarik dengan layanan *${service.title}*. Boleh minta info konsultasi dan penawarannya?`
            );

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:border-blue-400/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Arrow Up Right Button */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007DFE] flex items-center justify-center group-hover:bg-[#007DFE] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <a
                      href={waServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200 group-hover:border-[#007DFE] text-slate-400 group-hover:text-[#007DFE] group-hover:bg-blue-50/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
                      aria-label={`Pesan ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Badge & Title */}
                  {service.badge && (
                    <Badge variant="blue" size="sm" className="mb-2">
                      {service.badge}
                    </Badge>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#007DFE] transition-colors font-poppins mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Fitur Utama */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href={waServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#007DFE] group-hover:text-[#0066d1] flex items-center gap-1"
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
