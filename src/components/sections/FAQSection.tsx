"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faqs";
import { ChevronDown, MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "../ui/Button";

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold text-[#007DFE] tracking-wider uppercase font-poppins">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm text-slate-600">
            Punya pertanyaan lain? Tim DickyWeb siap menjawab dan berdiskusi kapan saja.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden transition-colors duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-800 font-poppins">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#007DFE]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 py-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Card if still confused */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900 font-poppins">
            Masih Punya Pertanyaan Spesifik?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Hubungi langsung tim konsultan DickyWeb via WhatsApp untuk konsultasi gratis tanpa komitmen.
          </p>
          <div className="pt-2">
            <a
              href={createWhatsAppLink("Halo DickyWeb, saya mau tanya-tanya dulu tentang pembuatan website.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="md" className="gap-2 shadow-md">
                <MessageCircle className="w-4 h-4" />
                Tanya Kami di WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
