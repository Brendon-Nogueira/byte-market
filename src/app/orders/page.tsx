import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-actions';
import { orderRepository } from '@/repositories/order/order-repository';
import { Container } from '@/components/Container/Container';
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const statusConfig = {
  pending: {
    label: 'Aguardando pagamento',
    icon: Clock,
    className: 'text-yellow-500 bg-yellow-500/10',
  },
  paid: {
    label: 'Pago',
    icon: CheckCircle,
    className: 'text-green-500 bg-green-500/10',
  },
  shipped: {
    label: 'Em transporte',
    icon: Truck,
    className: 'text-blue-500 bg-blue-500/10',
  },
  delivered: {
    label: 'Entregue',
    icon: CheckCircle,
    className: 'text-emerald-500 bg-emerald-500/10',
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    className: 'text-red-500 bg-red-500/10',
  },
} as const;


export default async function OrdersPage() {
  // Protege a rota no nível do componente
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?callbackUrl=/orders');
  }

  const orders = await orderRepository.findByUserId(user.id);

  const formattedPrice = (price: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(price));

  return (
    <Container className="py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold">Meus Pedidos</h1>
        <p className="text-muted mt-2">Acompanhe o histórico das suas compras</p>
      </div>

      {orders.length === 0 ? (
        // Estado vazio
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-20">
          <div className="p-6 rounded-full bg-muted/20 text-muted">
            <ShoppingBag size={64} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Nenhum pedido encontrado</h2>
            <p className="text-muted max-w-md mx-auto">
              Você ainda não realizou nenhuma compra. Explore nossos produtos!
            </p>
          </div>
          <Link
            href="/products"
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all"
          >
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig] ?? statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-card border border-white/10 glass overflow-hidden"
              >
                {/* Header do pedido */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Package size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Pedido #{order.id}</p>
                      <p className="text-sm text-muted">
                        {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Badge de status */}
                    <span
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.className}`}
                    >
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {formattedPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Lista de itens do pedido */}
                <div className="divide-y divide-white/5">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 px-6"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {item.product?.name ?? `Produto #${item.productId}`}
                        </p>
                        <p className="text-sm text-muted">{item.product?.brand}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-muted">
                          {item.quantity}x {formattedPrice(item.price)}
                        </p>
                        <p className="font-semibold text-foreground">
                          {formattedPrice(Number(item.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
