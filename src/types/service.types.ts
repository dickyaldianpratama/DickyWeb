export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string; // Lucide icon name mapping
  features: string[];
  idealFor: string;
  badge?: string;
}
