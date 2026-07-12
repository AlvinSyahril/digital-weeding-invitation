export interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
  parents?: string;
  instagram?: string;
  photo?: string;
}

export interface Guest {
  id?: string;
  name: string;
  category?: string;
}

export interface EventDate {
  day: string;
  fullDate: string;
  timestamp: string;
}

export interface GalleryData {
  eyebrow?: string;
  title: string;
  description?: string;
  quote?: {
    text: string;
    author?: string;
  };
  featuredImage?: string;
  images: string[];
}
