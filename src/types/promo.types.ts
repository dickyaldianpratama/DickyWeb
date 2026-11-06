export interface BrochurePromoData {
  id: string;
  isActive: boolean;
  title: string;
  tagline: string;
  discountBadge: string;
  brochureImageUrl: string;
  brochurePdfUrl?: string;
  validUntil?: string;
  targetPackage?: string;
  notes?: string;
  // Pengaturan Stempel Pita Rekomendasi di Kartu Paket
  recommendedPackageId?: string; // "starter" | "professional" | "enterprise" | "none"
  recommendedRibbonText?: string; // default: "REKOMENDASI"
  showRecommendedRibbon?: boolean; // default: true
  updatedAt: string;
}
