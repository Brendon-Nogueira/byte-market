import { ProductModel } from "../product/product-model";

export interface CartItemModel extends ProductModel {
  quantity: number;
}
