import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { PortfolioDetailView } from "@/components/portfolio/PortfolioDetailView";

const companyProfileItem =
  portfolioData.find((p) => p.id === "company-profile") || portfolioData[1] || portfolioData[0];

export const metadata: Metadata = {
  title: `${companyProfileItem.title} | Portofolio DickyWeb`,
  description:
    companyProfileItem.excerpt ||
    "Studi kasus website profil perusahaan modern enterprise oleh DickyWeb.",
  openGraph: {
    title: `${companyProfileItem.title} | Portofolio DickyWeb`,
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
  return <PortfolioDetailView item={companyProfileItem} />;
}
