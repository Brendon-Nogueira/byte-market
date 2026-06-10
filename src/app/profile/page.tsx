import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-actions';
import { orderRepository } from '@/repositories/order/order-repository';
import { Container } from '@/components/Container/Container';
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle, User } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';

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

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?callbackUrl=/profile');
  }

  const orders = await orderRepository.findByUserId(user.id);

  const formattedPrice = (price: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(price));

  // Calcula estatísticas
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total), 0);

  // Pega as iniciais do usuário
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Container className="py-12">
      {/* ─── Header do Perfil ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12 p-8 rounded-3xl bg-card border border-white/10 glass">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-secondary text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-secondary/20">
            {initials}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-heading font-bold text-foreground">{user.name}</h1>
            <p className="text-muted mb-4">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 rounded-xl bg-background border border-white/5 flex flex-col">
                <span className="text-xs text-muted uppercase font-bold tracking-wider">Pedidos</span>
                <span className="text-lg font-bold text-foreground">{totalOrders}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-background border border-white/5 flex flex-col">
                <span className="text-xs text-muted uppercase font-bold tracking-wider">Total Gasto</span>
                <span className="text-lg font-bold text-foreground">{formattedPrice(totalSpent)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <LogoutButton />
        </div>
      </div>

      {/* ─── Histórico de Pedidos ────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-6 text-foreground flex items-center gap-2">
          <Package size={24} className="text-secondary" />
          Histórico de Compras
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 rounded-3xl border border-white/5 bg-white/5">
            <div className="p-6 rounded-full bg-muted/10 text-muted">
              <ShoppingBag size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Nenhum pedido encontrado</h3>
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
                  className="rounded-3xl bg-card border border-white/10 glass overflow-hidden transition-all hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold text-foreground text-lg">Pedido #{order.id}</p>
                        <p className="text-sm text-muted flex items-center gap-1 mt-1">
                          <Clock size={14} />
                          {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
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

                  <div className="divide-y divide-white/5 p-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
                      >
                        {item.product?.image && (
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded-xl bg-muted"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {item.product?.name ?? `Produto #${item.productId}`}
                          </p>
                          <p className="text-sm text-muted mt-1">{item.product?.brand}</p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <p className="text-sm text-muted">
                            {item.quantity}x {formattedPrice(item.price)}
                          </p>
                          <p className="font-semibold text-foreground mt-1">
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
      </div>
    </Container>
  );
}
