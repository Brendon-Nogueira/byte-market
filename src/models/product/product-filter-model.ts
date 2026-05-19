export interface ProductFilterOptions {
  sort?: "price_asc" | "price_desc" | "name_asc" | "name_desc";
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}
