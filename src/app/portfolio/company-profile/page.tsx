import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { PortfolioDetailView } from "@/components/portfolio/PortfolioDetailView";

const companyProfileItem =
  portfolioData.find((p) => p.id === "company-profile") || portfolioData[0];

export const metadata: Metadata = {
  title: "Website Company Profile | Detail Hasil Karya DickyWeb",
  description:
    companyProfileItem.excerpt ||
    "Studi kasus rancangan website profil perusahaan korporasi modern oleh DickyWeb.",
  openGraph: {
    title: "Website Company Profile | Detail Hasil Karya DickyWeb",
    description: companyProfileItem.excerpt || companyProfileItem.description,
    images: [
      {
        url: companyProfileItem.image,
        alt: companyProfileItem.title,
      },
    ],
  },
};

export default function CompanyProfileDetailPage() {
  return <PortfolioDetailView item={companyProfileItem} isCompanyProfile={true} />;
}
