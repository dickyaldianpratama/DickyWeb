export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  description: string;
  deliveryTime: string;
  features: string[];
  notIncluded?: string[];
  buttonText: string;
}
