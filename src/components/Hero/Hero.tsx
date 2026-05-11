import { Container } from "../Container/Container";
import { ArrowRight, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-20 lg:py-32">
      {/* Background com a imagem*/}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-banner.png"
          alt="Tecnologia Futurista"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          {/* Seção de Destaque*/}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            <Zap size={14} />
            <span>Tecnologia de Próxima Geração</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6">
            Eleve seu setup ao{" "}
            <span className="text-secondary">próximo nível</span>
          </h1>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
            Descubra periféricos e hardwares selecionados com a maior curadoria
            tecnológica do mercado. Potência, estética e performance em um só
            lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-secondary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 group active:scale-95">
              Ver Ofertas
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all active:scale-95">
              Novidades
            </button>
          </div>
        </div>
      </Container>

      {/* Visual */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-secondary/20 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />
    </section>
  );
};
