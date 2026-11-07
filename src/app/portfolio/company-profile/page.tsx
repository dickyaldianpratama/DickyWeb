import type { Metadata } from "next";
import { CompanyProfileShowcaseView } from "@/components/portfolio/CompanyProfileShowcaseView";

export const metadata: Metadata = {
  title: "Showcase Detail Website Company Profile Modern Enterprise - DickyWeb",
  description:
    "Eksplorasi interaktif arsitektur website profil perusahaan berkelas korporat modern dari DickyWeb. Dilengkapi slide berbagai halaman (Home, About, Services, News, Article Detail, Contact, Consultation) dengan mode Desktop & App.",
  openGraph: {
    title: "Showcase Detail Website Company Profile - DickyWeb",
    description:
      "Showcase interaktif halaman-halaman website profil perusahaan dengan mode preview Desktop & Mobile App.",
    images: [
      {
        url: "/showcase/company-profile/stitch_modern_company_design_system/yourcompany_home_page/screen.png",
        width: 1200,
        height: 630,
        alt: "Website Company Profile Showcase",
      },
    ],
  },
};

export default function CompanyProfileDetailPage() {
  return <CompanyProfileShowcaseView />;
}
