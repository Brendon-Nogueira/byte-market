import { ProductModel } from "@/models/product/product-model";
import { ProductFilterOptions } from "@/models/product/product-filter-model";
import { ProductRepository } from "./product-repository";
import { db } from "@/db";
import { products } from "@/db/drizzle/schemas/schema";
import { eq, and, gte, lte, asc, desc, ilike, or } from "drizzle-orm";

export class DrizzleProductRepository implements ProductRepository {
  private mapProduct(dbProduct: typeof products.$inferSelect): ProductModel {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      brand: dbProduct.brand,
      description: dbProduct.description,
      price: Number(dbProduct.price),
      image: dbProduct.image,
      category: dbProduct.category,
      slug: dbProduct.slug,
      color: dbProduct.color || "",
      storage: dbProduct.storage || "",
      stock: dbProduct.stock,
      created_at: dbProduct.createdAt,
      updated_at: dbProduct.updatedAt,
      isAvailable: dbProduct.isAvailable,
      releaseDate: dbProduct.releaseDate ? new Date(dbProduct.releaseDate) : new Date(),
      rating: dbProduct.rating,
      reviewCount: dbProduct.reviewCount,
    };
  }

  async getAll(options?: ProductFilterOptions): Promise<ProductModel[]> {
    const conditions = [];

    if (options?.brand) {
      conditions.push(ilike(products.brand, options.brand));
    }

    if (options?.category) {
      conditions.push(ilike(products.category, options.category));
    }

    if (options?.minPrice !== undefined) {
      conditions.push(gte(products.price, String(options.minPrice)));
    }

    if (options?.maxPrice !== undefined) {
      conditions.push(lte(products.price, String(options.maxPrice)));
    }

    let query = db.select().from(products);

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    if (options?.sort) {
      switch (options.sort) {
        case "price_asc":
          query = query.orderBy(asc(products.price)) as any;
          break;
        case "price_desc":
          query = query.orderBy(desc(products.price)) as any;
          break;
        case "name_asc":
          query = query.orderBy(asc(products.name)) as any;
          break;
        case "name_desc":
          query = query.orderBy(desc(products.name)) as any;
          break;
      }
    }

    const results = await query;
    return results.map((p) => this.mapProduct(p));
  }

  async getById(id: number | string): Promise<ProductModel | null> {
    const numericId = typeof id === "string" ? parseInt(id) : id;
    if (isNaN(numericId)) return null;

    const results = await db.select().from(products).where(eq(products.id, numericId)).limit(1);
    if (results.length === 0) return null;

    return this.mapProduct(results[0]);
  }

  async getBySlug(slug: string): Promise<ProductModel | null> {
    const results = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (results.length === 0) return null;

    return this.mapProduct(results[0]);
  }

  async getByCategory(
    category: string,
    options?: ProductFilterOptions,
  ): Promise<ProductModel[]> {
    return this.getAll({
      ...options,
      category,
    });
  }

  async getCategories(): Promise<string[]> {
    const results = await db.selectDistinct({ category: products.category }).from(products);
    return results.map((r) => r.category);
  }

  async getBrands(): Promise<string[]> {
    const results = await db.selectDistinct({ brand: products.brand }).from(products);
    return results.map((r) => r.brand);
  }

  async getOffers(): Promise<ProductModel[]> {
    // Busca produtos com preço menor que 1500
    const results = await db.select().from(products).where(lte(products.price, "1500"));
    return results.map((p) => this.mapProduct(p));
  }

  async search(query: string): Promise<ProductModel[]> {
    const searchTerm = `%${query}%`;
    const results = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, searchTerm),
          ilike(products.description, searchTerm),
          ilike(products.brand, searchTerm),
        ),
      );
    return results.map((p) => this.mapProduct(p));
  }

  async create(product: ProductModel): Promise<ProductModel> {
    const [inserted] = await db
      .insert(products)
      .values({
        name: product.name,
        brand: product.brand,
        price: String(product.price),
        description: product.description,
        image: product.image,
        category: product.category,
        slug: product.slug,
        color: product.color,
        storage: product.storage,
        stock: product.stock,
        isAvailable: product.isAvailable,
        releaseDate: product.releaseDate ? product.releaseDate.toISOString().split("T")[0] : null,
        rating: product.rating,
        reviewCount: product.reviewCount,
      })
      .returning();

    return this.mapProduct(inserted);
  }

  async update(product: ProductModel): Promise<ProductModel> {
    const [updated] = await db
      .update(products)
      .set({
        name: product.name,
        brand: product.brand,
        price: String(product.price),
        description: product.description,
        image: product.image,
        category: product.category,
        slug: product.slug,
        color: product.color,
        storage: product.storage,
        stock: product.stock,
        isAvailable: product.isAvailable,
        releaseDate: product.releaseDate ? product.releaseDate.toISOString().split("T")[0] : null,
        rating: product.rating,
        reviewCount: product.reviewCount,
        updatedAt: new Date(),
      })
      .where(eq(products.id, product.id))
      .returning();

    if (!updated) {
      throw new Error("Produto não encontrado para atualização");
    }

    return this.mapProduct(updated);
  }

  async delete(id: number | string): Promise<void> {
    const numericId = typeof id === "string" ? parseInt(id) : id;
    if (isNaN(numericId)) return;

    await db.delete(products).where(eq(products.id, numericId));
  }
}
