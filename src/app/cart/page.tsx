"use client";

import { Container } from "@/components/Container/Container";
import { useCart } from "@/hooks/use-cart";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage/ProductImage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";



export default function CartPage() {
  // const { items, addToCart, decreaseQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { items, addToCart, decreaseQuantity, removeFromCart, clearCart, totalPrice, totalItems, isMounted } = useCart();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  // função de checkout chama a API e em caso de sucesso limpa o carrinho
  const handleCheckout = async () => {
    if (isCheckingOut || items.length === 0) return;
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
      
        if (response.status === 401) {
          router.push('/login?callbackUrl=/cart');
          return;
        }
        toast(data.error || 'Erro ao finalizar a compra. Tente novamente.', 'error');
        return;
      }

    
      clearCart();
      router.push('/orders');
    } catch {
      toast('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

    if (!isMounted) {
    return (
      <Container className="py-12">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
           {[1, 2].map((i) => (
             <div 
                key={i} 
               className="h-36 rounded-3xl bg-card border border-white/10 glass animate-pulse"
              />
           ))}
         </div>
         <div className="h-64 rounded-3xl bg-card border border-white/10 glass animate-pulse" />
        </div>
      </Container>
    );
  }


  if (items.length === 0) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-6 rounded-full bg-muted/20 text-muted">
            <ShoppingBag size={64} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted max-w-md mx-auto">
              Parece que você ainda não adicionou nada ao seu carrinho. Explore nossos produtos e encontre as melhores ofertas!
            </p>
          </div>
          <Link 
            href="/products" 
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all"
          >
            Começar a Comprar
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-heading font-bold mb-10">Meu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-card border border-white/10 glass"
            >
              <ProductImage 
                src={item.image} 
                alt={item.name} 
                category={item.category}
                className="w-24 h-24 object-cover rounded-2xl bg-muted"
              />
              
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted">{item.brand}</p>
                <p className="text-secondary font-bold">{formattedPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-full px-2 py-1 bg-background/50">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-1 hover:text-secondary transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="p-1 hover:text-secondary transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-muted hover:text-red-500 transition-colors"
                  title="Remover item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-card border border-white/10 glass sticky top-24">
            <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({totalItems} itens)</span>
                <span>{formattedPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Frete</span>
                <span className="text-green-500 font-medium">Grátis</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span>{formattedPrice(totalPrice)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                'Finalizar Compra'
              )}
            </button>
            
            <Link 
              href="/products" 
              className="block text-center mt-4 text-sm text-muted hover:text-foreground transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
