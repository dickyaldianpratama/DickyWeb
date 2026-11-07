import type { Metadata } from "next";
import { CompanyProfileShowcaseView } from "@/components/portfolio/CompanyProfileShowcaseView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Showcase Portofolio ${id} - DickyWeb`,
    description: `Detail arsitektur halaman portofolio ${id} di DickyWeb.`,
  };
}

export default async function PortfolioDynamicPage({ params }: PageProps) {
  const { id } = await params;
  // Jika akses aurora-law, company-profile, atau profil perusahaan
  if (
    id === "company-profile" ||
    id === "aurora-law" ||
    id.includes("company") ||
    id.includes("profile")
  ) {
    return <CompanyProfileShowcaseView />;
  }

  // Fallback ke Company Profile Showcase untuk menampilkan halaman multi-slide
  return <CompanyProfileShowcaseView />;
}
