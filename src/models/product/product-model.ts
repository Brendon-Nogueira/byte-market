export type ProductModel = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  color: string;
  storage: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
  isAvailable: boolean;
  releaseDate: Date;
  rating: number;
  reviewCount: number;
};
