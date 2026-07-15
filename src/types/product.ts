export interface ProductType {
  id: string;
  name: string;
  slug: string;

  shortDescription?: string | null;
  description?: string | null;
  featured: boolean;

  category?: {
    name: string;
  } | null;

  images?: {
    imageUrl: string;
  }[];
}