export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  metrics?: string;
  liveUrl?: string;
  detailUrl?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
}
