import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { PortfolioDetailView } from "@/components/portfolio/PortfolioDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  if (
    decodedId === "company-profile" ||
    decodedId === "website-company-profile-modern-enterprise"
  ) {
    const item = portfolioData[0];
    return {
      title: `${item.title} | Portofolio DickyWeb`,
      description: item.excerpt,
    };
  }

  const item =
    portfolioData.find(
      (p) =>
        p.id === decodedId ||
        p.slug === decodedId ||
        p.id.toLowerCase() === decodedId.toLowerCase() ||
        (p.slug && p.slug.toLowerCase() === decodedId.toLowerCase())
    ) || portfolioData[0];

  return {
    title: `${item.title} | Portofolio DickyWeb`,
    description:
      item.excerpt ||
      `Studi kasus pembuatan ${item.title} oleh DickyWeb: SEO-friendly, responsif, dan performa tinggi.`,
    openGraph: {
      title: `${item.title} | Portofolio DickyWeb`,
      description: item.excerpt || item.description,
      images: [
        {
          url: item.image,
          alt: item.title,
        },
      ],
    },
  };
}

export default async function PortfolioDynamicPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  if (
    decodedId === "company-profile" ||
    decodedId === "website-company-profile-modern-enterprise"
  ) {
    redirect("/portfolio/website-kitchen-set-interior-custom-ruangruma");
  }

  // Cari item berdasarkan id atau slug
  const matchedItem =
    portfolioData.find(
      (p) =>
        p.id === decodedId ||
        p.slug === decodedId ||
        p.id.toLowerCase() === decodedId.toLowerCase() ||
        (p.slug && p.slug.toLowerCase() === decodedId.toLowerCase()) ||
        decodedId.includes(p.id) ||
        (p.slug && decodedId.includes(p.slug))
    ) || portfolioData[0];

  return <PortfolioDetailView item={matchedItem} />;
}
