export interface PortfolioItem {
  id: string;
  slug?: string;
  title: string;
  client: string;
  category: string;
  description: string;
  excerpt?: string;
  image: string;
  gallery?: string[];
  techStack: string[];
  duration?: string;
  year?: string;
  aboutProject?: string;
  challenge?: string;
  solutions?: string[];
  techDescription?: string;
  results?: string;
  metrics?: string;
  liveUrl?: string;
  detailUrl?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
}
