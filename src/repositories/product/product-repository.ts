import { ProductModel } from "@/models/product/product-model";
import { ProductFilterOptions } from "@/models/product/product-filter-model";

// Interface granular para Leitura
export interface IReadProductRepository {
  getAll(options?: ProductFilterOptions): Promise<ProductModel[]>;
  getById(id: number | string): Promise<ProductModel | null>;
  getBySlug(slug: string): Promise<ProductModel | null>;
  getByCategory(
    category: string,
    options?: ProductFilterOptions
  ): Promise<ProductModel[]>;
  getCategories(): Promise<string[]>;
  getBrands(): Promise<string[]>;
  getOffers(): Promise<ProductModel[]>;
  search(query: string): Promise<ProductModel[]>;
}

export interface IWriteProductRepository {
  create(product: ProductModel): Promise<ProductModel>;
  update(product: ProductModel): Promise<ProductModel>;
}

export interface IDeleteProductRepository {
  delete(id: number | string): Promise<void>;
}

// Interface Principal (Composta)
export interface ProductRepository
  extends
    IReadProductRepository,
    IWriteProductRepository,
    IDeleteProductRepository {}
