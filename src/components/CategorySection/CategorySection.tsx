import Link from "next/link";
import { Container } from "../Container/Container";
import { productRepository } from "@/repositories/product";
import {
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Cpu,
  HardDrive,
  Camera,
  Gamepad2,
  Smartphone,
  Printer,
  Package,
  type LucideIcon,
} from "lucide-react";

// Mapeamento de palavras-chave para ícones Lucide
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  teclado: Keyboard,
  mouse: Mouse,
  headset: Headphones,
  headphone: Headphones,
  fone: Headphones,
  audio: Headphones,
  processador: Cpu,
  cpu: Cpu,
  placa: Cpu,
  ssd: HardDrive,
  hd: HardDrive,
  disco: HardDrive,
  armazenamento: HardDrive,
  memoria: HardDrive,
  webcam: Camera,
  camera: Camera,
  gamepad: Gamepad2,
  controle: Gamepad2,
  joystick: Gamepad2,
  smartphone: Smartphone,
  celular: Smartphone,
  impressora: Printer,
};

// Paleta de cores para as categorias
const PALETTE = [
  {
    iconColor: "text-blue-400",
    cardBg: "bg-blue-500/10",
    cardHover: "hover:bg-blue-500/20 hover:border-blue-500/40",
    cardBorder: "border-blue-500/20",
    iconBg: "bg-blue-500/15",
  },
  {
    iconColor: "text-purple-400",
    cardBg: "bg-purple-500/10",
    cardHover: "hover:bg-purple-500/20 hover:border-purple-500/40",
    cardBorder: "border-purple-500/20",
    iconBg: "bg-purple-500/15",
  },
  {
    iconColor: "text-emerald-400",
    cardBg: "bg-emerald-500/10",
    cardHover: "hover:bg-emerald-500/20 hover:border-emerald-500/40",
    cardBorder: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15",
  },
  {
    iconColor: "text-yellow-400",
    cardBg: "bg-yellow-500/10",
    cardHover: "hover:bg-yellow-500/20 hover:border-yellow-500/40",
    cardBorder: "border-yellow-500/20",
    iconBg: "bg-yellow-500/15",
  },
  {
    iconColor: "text-red-400",
    cardBg: "bg-red-500/10",
    cardHover: "hover:bg-red-500/20 hover:border-red-500/40",
    cardBorder: "border-red-500/20",
    iconBg: "bg-red-500/15",
  },
  {
    iconColor: "text-cyan-400",
    cardBg: "bg-cyan-500/10",
    cardHover: "hover:bg-cyan-500/20 hover:border-cyan-500/40",
    cardBorder: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
  },
  {
    iconColor: "text-orange-400",
    cardBg: "bg-orange-500/10",
    cardHover: "hover:bg-orange-500/20 hover:border-orange-500/40",
    cardBorder: "border-orange-500/20",
    iconBg: "bg-orange-500/15",
  },
  {
    iconColor: "text-pink-400",
    cardBg: "bg-pink-500/10",
    cardHover: "hover:bg-pink-500/20 hover:border-pink-500/40",
    cardBorder: "border-pink-500/20",
    iconBg: "bg-pink-500/15",
  },
];

function getCategoryIcon(category: string): LucideIcon {
  const lower = category.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return Package;
}

export async function CategorySection() {
  const categories = await productRepository.getCategories();

  return (
    <section className="py-14">
      <Container>
        {/* Cabeçalho da seção */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Explore por Categoria
          </h2>
          <p className="text-muted mt-1 text-sm">
            Encontre exatamente o que você precisa
          </p>
        </div>

        {/* Grid / scroll horizontal de categorias */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory">
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category);
            const palette = PALETTE[index % PALETTE.length];

            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={`
                  flex-none snap-start flex flex-col items-center gap-3 
                  p-5 w-32 md:w-36 rounded-2xl border transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-lg
                  ${palette.cardBg} ${palette.cardBorder} ${palette.cardHover}
                `}
              >
                <div className={`p-3 rounded-xl ${palette.iconBg}`}>
                  <Icon size={26} className={palette.iconColor} />
                </div>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {category}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
