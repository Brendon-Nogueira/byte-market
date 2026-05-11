import { productRepository } from "@/repositories/product/json-product-repository";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productRepository.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <Container className="py-12">
      {/* Botão Voltar */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Coluna da Imagem */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-white/10 shadow-2xl glass group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Badge de Categoria */}
          <div className="absolute top-6 left-6">
            <span className="bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        </div>

        {/* Coluna de Informações */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-secondary font-bold uppercase tracking-widest text-sm">
              {product.brand}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold text-foreground">
              {formattedPrice}
            </span>
            <p className="text-sm text-muted">Em até 10x sem juros no cartão</p>
          </div>

          <div className="h-px bg-white/10 w-full" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Descrição do Produto</h3>
            <p className="text-lg text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Opções de Compra */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-secondary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-95 group">
                <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                Adicionar ao Carrinho
              </button>
              <button className="flex-1 bg-foreground text-background font-bold py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95">
                Comprar Agora
              </button>
            </div>

            {/* Info de Entrega e Garantia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-sm text-muted bg-white/5 p-4 rounded-xl border border-white/5">
                <Truck className="text-secondary" size={20} />
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">Entrega Rápida</span>
                  <span>Frete grátis para todo Brasil</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted bg-white/5 p-4 rounded-xl border border-white/5">
                <ShieldCheck className="text-accent" size={20} />
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">Compra Segura</span>
                  <span>Garantia oficial de 12 meses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full w-fit">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-accent animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? 'text-accent' : 'text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Produto esgotado'}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
