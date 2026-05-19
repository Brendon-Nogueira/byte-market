import { ProductModel } from "@/models/product/product-model";
import { ProductRepository } from "./product-repository";
import { ProductFilterOptions } from "@/models/product/product-filter-model";
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

  async getAll(options?: ProductFilterOptions): Promise<ProductModel[]> {
    const products = await this.readFromDisk();
    return this.applyFilters(products, options);
  }

  async getById(id: number | string): Promise<ProductModel | null> {
    const products = await this.readFromDisk();
    const numericId = typeof id === "string" ? parseInt(id) : id;
    const product = products.find((p) => p.id === numericId);
    return product || null;
  }

  async getBySlug(slug: string): Promise<ProductModel | null> {
    const products = await this.readFromDisk();
    const product = products.find((p) => p.slug === slug);
    return product || null;
  }

  async getByCategory(
    category: string,
    options?: ProductFilterOptions,
  ): Promise<ProductModel[]> {
    const products = await this.readFromDisk();
    const filteredByCategory = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
    return this.applyFilters(filteredByCategory, options);
  }

  async getCategories(): Promise<string[]> {
    const products = await this.readFromDisk();
    const categories = products.map((p) => p.category);
    return Array.from(new Set(categories)); // Remove duplicatas
  }

  async getBrands(): Promise<string[]> {
    const products = await this.readFromDisk();
    const brands = products.map((p) => p.brand);
    return Array.from(new Set(brands)); // Remove duplicatas
  }

  async getOffers(): Promise<ProductModel[]> {
    const products = await this.readFromDisk();

    return products.filter((p) => p.price < 1500);
  }

  async search(query: string): Promise<ProductModel[]> {
    const products = await this.readFromDisk();
    const searchLower = query.toLowerCase();

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower),
    );
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

  async delete(id: number | string): Promise<void> {
    const products = await this.readFromDisk();
    const numericId = typeof id === "string" ? parseInt(id) : id;
    const filteredProducts = products.filter((p) => p.id !== numericId);
    await this.writeToDisk(filteredProducts);
  }

  private applyFilters(
    products: ProductModel[],
    options?: ProductFilterOptions,
  ): ProductModel[] {
    let filtered = [...products];

    if (!options) return filtered;

    if (options.brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === options.brand?.toLowerCase(),
      );
    }

    if (options.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= (options.minPrice ?? 0));
    }

    if (options.maxPrice !== undefined) {
      filtered = filtered.filter(
        (p) => p.price <= (options.maxPrice ?? Infinity),
      );
    }

    if (options.sort) {
      switch (options.sort) {
        case "price_asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name_asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    return filtered;
  }
}

export const productRepository: ProductRepository = new JsonProductRepository();
