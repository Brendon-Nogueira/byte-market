import { ProductModel } from "@/models/product/product-model";
import { ProductRepository } from "./product-repository";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src", "db", "seed", "products.json");

export class JsonProductRepository implements ProductRepository {
  private async readFromDisk(): Promise<ProductModel[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const json = JSON.parse(data);

      // O JSON tem uma propriedade "products" que é o array
      return json.products.map((p: any) => ({
        ...p,
        created_at: new Date(p.createdAt || p.created_at),
        updated_at: new Date(p.updatedAt || p.updated_at),

        storage: String(p.storage || ""),
        stock: Number(p.stock || 0),
      }));
    } catch (error) {
      console.error("Erro ao ler banco JSON:", error);
      return [];
    }
  }

  private async writeToDisk(products: ProductModel[]): Promise<void> {
    const data = JSON.stringify({ products }, null, 2);
    await fs.writeFile(filePath, data, "utf-8");
  }

  async getAll(): Promise<ProductModel[]> {
    return await this.readFromDisk();
  }

  async getById(id: number): Promise<ProductModel> {
    const products = await this.readFromDisk();
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error("Produto não encontrado");
    return product;
  }

  async create(product: ProductModel): Promise<ProductModel> {
    const products = await this.readFromDisk();
    const newProduct = { ...product, id: products.length + 1 };
    products.push(newProduct);
    await this.writeToDisk(products);
    return newProduct;
  }

  async update(product: ProductModel): Promise<ProductModel> {
    const products = await this.readFromDisk();
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) throw new Error("Produto não encontrado");

    products[index] = { ...product, updated_at: new Date() };
    await this.writeToDisk(products);
    return products[index];
  }

  async delete(id: number): Promise<void> {
    const products = await this.readFromDisk();
    const filteredProducts = products.filter((p) => p.id !== id);
    await this.writeToDisk(filteredProducts);
  }
}

export const productRepository = new JsonProductRepository();
