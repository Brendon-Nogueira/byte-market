import { Container } from "@/components/Container/Container";
import { productRepository } from "@/repositories/product/json-product-repository";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await productRepository.getCategories();

  return (
    <Container className="py-12">
      <div className="mb-10 space-y-2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
          Categorias
        </h1>
        <p className="text-muted">
          Explore nosso catálogo de produtos por departamento e encontre
          exatamente o que você precisa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            className="group relative flex items-center justify-between p-8 rounded-3xl bg-card border border-white/10 glass hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Layers size={24} />
              </div>
              <span className="text-xl font-bold text-foreground capitalize">
                {category}
              </span>
            </div>
            <ChevronRight className="text-muted group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
