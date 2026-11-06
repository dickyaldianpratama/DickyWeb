import React from "react";
import { workflowData } from "@/data/workflow";
import { CheckCircle2 } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Seksi */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase font-poppins">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-poppins">
            4 Langkah Mudah dari Ide ke Website Nyata
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Alur kerja transparan dan terstruktur agar proyek selesai tepat waktu tanpa kendala teknis
            yang memusingkan Anda.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowData.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Number & Duration Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-poppins">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-700/80 text-blue-300 border border-slate-600">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-poppins mb-1.5 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-blue-200/80 font-medium mb-3">
                  {item.tagline}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-400">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Hasil yang Diterima:
                </div>
                {item.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
