import React from "react";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Loading Screen Eksklusif dengan Logo DickyWeb */}
      <Preloader />

      {/* Header Navigasi */}
      <Navbar />

      {/* Bagian-Bagian Landing Page */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <WorkflowSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      {/* Footer Resmi */}
      <Footer />

      {/* Floating Action Buttons: WhatsApp & Brosur Promo */}
      <FloatingCTA />
    </div>
  );
}
