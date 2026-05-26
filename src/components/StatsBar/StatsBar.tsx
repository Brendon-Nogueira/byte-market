import { Container } from "../Container/Container";
import { ShoppingBag, Truck, Star, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: ShoppingBag,
    value: "+10.000",
    label: "Produtos",
    delay: "0ms",
  },
  {
    icon: Truck,
    value: "Entrega 24h",
    label: "Para todo o Brasil",
    delay: "100ms",
  },
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Avaliação Média",
    delay: "200ms",
  },
  {
    icon: ShieldCheck,
    value: "100% Seguro",
    label: "Compra Garantida",
    delay: "300ms",
  },
];

export const StatsBar = () => {
  return (
    <section className="border-y border-white/10 bg-primary/[0.03] dark:bg-white/[0.02]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map(({ icon: Icon, value, label, delay }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 py-8 px-4 animate-fade-in group"
              style={{ animationDelay: delay }}
            >
              <div className="p-2.5 rounded-xl bg-secondary/10 mb-1 group-hover:bg-secondary/20 transition-colors duration-300">
                <Icon size={22} className="text-secondary" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                {value}
              </span>
              <span className="text-xs text-muted text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
