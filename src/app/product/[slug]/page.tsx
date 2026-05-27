import { productRepository } from "@/repositories/product/json-product-repository";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ShieldCheck, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton/AddToCartButton";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { ProductImage } from "@/components/ProductImage/ProductImage";



import { ProductPageWishlistButton } from "@/components/ProductPageWishlistButton/ProductPageWishlistButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productRepository.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const allRelated = await productRepository.getByCategory(product.category);
  const relatedProducts = allRelated
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <Container className="py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-muted mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-secondary transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link
          href="/products"
          className="hover:text-secondary transition-colors"
        >
          Produtos
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/categories/${product.category.toLowerCase()}`}
          className="hover:text-secondary transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Coluna da Imagem */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-white/10 shadow-2xl glass group">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        </div>

        {/* Coluna de Informações */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-secondary font-bold uppercase tracking-widest text-sm">
                {product.brand}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-5xl font-bold text-foreground">
                {formattedPrice}
              </span>
              <p className="text-sm text-muted">
                Em até 10x de{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price / 10)}{" "}
                sem juros
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          {/* Seção de Compra Reativa */}
          <div className="flex gap-4 items-center">
            <AddToCartButton product={product} />
            <ProductPageWishlistButton product={product} />
          </div>

          {/* Info de Entrega e Garantia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-muted bg-white/5 p-4 rounded-2xl border border-white/5">
              <Truck className="text-secondary" size={20} />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">
                  Entrega Rápida
                </span>
                <span>Frete grátis Brasil</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted bg-white/5 p-4 rounded-2xl border border-white/5">
              <ShieldCheck className="text-accent" size={20} />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">Compra Segura</span>
                <span>Garantia de 12 meses</span>
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full w-fit">
            <div
              className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-accent animate-pulse" : "bg-red-500"}`}
            />
            <span
              className={`text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? "text-accent" : "text-red-500"}`}
            >
              {product.stock > 0
                ? `${product.stock} unidades disponíveis`
                : "Produto esgotado"}
            </span>
          </div>
        </div>
      </div>

      {/* Seção de Detalhes Adicionais */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Descrição do Produto
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Especificações
          </h2>
          <div className="rounded-2xl border border-white/10 glass overflow-hidden">
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-medium text-muted">Marca</td>
                  <td className="px-4 py-3 text-foreground">{product.brand}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-medium text-muted">
                    Categoria
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {product.category}
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-medium text-muted">
                    Armazenamento
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {product.storage || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted">Modelo</td>
                  <td className="px-4 py-3 text-foreground">{product.slug}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="mt-32 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Produtos Relacionados
              </h2>
              <p className="text-muted">
                Pessoas que viram este item também se interessaram por:
              </p>
            </div>
            <Link
              href={`/categories/${product.category.toLowerCase()}`}
              className="text-secondary font-bold hover:underline"
            >
              Ver todos da categoria
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
