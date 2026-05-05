import { ProductModel } from "@/models/product/product-model";

export interface ProductRepository {
  getAll(): Promise<ProductModel[]>;
  getById(id: number): Promise<ProductModel>;
  create(product: ProductModel): Promise<ProductModel>;
  update(product: ProductModel): Promise<ProductModel>;
  delete(id: number): Promise<void>;
}
