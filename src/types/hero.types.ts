export interface HeroCollageSlot {
  id: string; // "slot-1" | "slot-2" | "slot-3" | "slot-4"
  label: string; // "Foto 1 (Kiri Atas / Besar)"
  positionDescription: string; // "Posisi Kiri Atas (Vertikal Tinggi)"
  alt: string;
  imageUrl: string;
  imageFit?: "cover" | "contain"; // default: "cover"
  scale?: number; // default: 1 (100%)
  positionX?: number; // default: 50 (%)
  positionY?: number; // default: 50 (%)
  rotation?: number; // 0, 90, 180, 270 (default: 0)
  flipHorizontal?: boolean; // default: false
}
