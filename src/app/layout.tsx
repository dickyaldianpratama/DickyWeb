import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dickyweb.vercel.app"),
  title: `${siteConfig.brandName} - Jasa Pembuatan Website Modern (${siteConfig.tagline})`,
  description:
    "DickyWeb menyediakan jasa pembuatan website profesional, landing page berkonversi tinggi, company profile elegan, dan toko online otomatis dengan performa kilat dan garansi perawatan.",
  keywords: [
    "Jasa Pembuatan Website",
    "Web Development Indonesia",
    "Bikin Landing Page",
    "Company Profile Murah",
    "Toko Online Modern",
    "DickyWeb",
  ],
  authors: [{ name: "DickyWeb" }],
  openGraph: {
    title: `${siteConfig.brandName} | Jasa Pembuatan Website Modern`,
    description: siteConfig.subheadline,
    url: "https://dickyweb.vercel.app",
    siteName: siteConfig.brandName,
    images: [
      {
        url: siteConfig.logoUrl,
        width: 800,
        height: 400,
        alt: siteConfig.brandName,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/images/logo/dickyweb-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-[#007DFE]">
        {children}
      </body>
    </html>
  );
}
