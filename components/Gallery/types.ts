import { GalleryData } from '../../types/models';

export interface GalleryProps {
  data: GalleryData;
}

export interface GalleryGridProps {
  data: GalleryData;
}

export interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
