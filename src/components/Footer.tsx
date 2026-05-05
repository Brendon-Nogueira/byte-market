import { Container } from './Container';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tight">
              Byte<span className="text-secondary">Market</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Sua loja de tecnologia definitiva. Qualidade, inovação e o melhor suporte para sua jornada digital.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Loja</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/produtos" className="hover:text-white transition-colors">Todos os Produtos</Link></li>
              <li><Link href="/categorias" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link href="/ofertas" className="hover:text-white transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Suporte</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/ajuda" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link href="/envio" className="hover:text-white transition-colors">Política de Envio</Link></li>
              <li><Link href="/devolucao" className="hover:text-white transition-colors">Devoluções</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Receba as últimas novidades e ofertas exclusivas.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-slate-800 border-none rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-secondary outline-none"
              />
              <button className="bg-secondary hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                Ok
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} ByteMarket. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
};
