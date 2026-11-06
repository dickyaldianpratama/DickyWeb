import React from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";
import { Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50/70 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
            Testimoni Klien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Dipercaya oleh Bisnis & Profesional
          </h2>
          <p className="text-sm text-slate-600">
            Dengarkan langsung pengalaman pemilik bisnis yang telah mempercayakan pembuatan
            website mereka kepada DickyWeb.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200" style={{ position: "relative" }}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-poppins">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
