import { EVENT_INFO } from '../data';
import { Ticket, Check } from 'lucide-react';

export default function Tickets() {
  return (
    <section id="ingressos" className="relative py-20 px-4 md:px-8 bg-sky-light/5 border-b-4 border-slate-900 overflow-hidden">
      
      {/* Absolute Decorative BG Grid & Splashes */}
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" />
      <div className="absolute top-10 left-[-100px] w-96 h-96 bg-brasil-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-100px] w-96 h-96 bg-japan-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Vendas Abertas Oficiais • Sympla
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            ESCOLHA SEU INGRESSO
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg max-w-2xl mx-auto">
            Garanta sua entrada no maior festival cultural do ano! Lote promocional limitado sujeito a encerramento de lote sem pré-aviso.
          </p>
          <div className="w-24 h-2.5 bg-brasil-yellow mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Comparatives Pricing Cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-4xl mx-auto">
          
          {/* Card 1: ACESSO GERAL */}
          <div className="bg-white rounded-3xl border-3 border-slate-900 p-8 flex flex-col justify-between comic-shadow relative">
            {/* Urgency sticker */}
            <div className="absolute top-4 right-4 bg-brasil-green text-white font-mono text-[9px] font-bold py-1 px-3.5 rounded-full border border-slate-900 uppercase tracking-widest animate-pulse">
              Lote de Lançamento
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-slate-400 block uppercase font-bold">PLANO UNITÁRIO DIÁRIO</span>
                <h3 className="font-display text-4xl text-slate-900 tracking-tight mt-1 uppercase">
                  Acesso Geral Evento
                </h3>
                <p className="text-slate-500 text-sm font-heading mt-1">
                  Dá livre trânsito pelas dependências gerais, stands e palestras comuns.
                </p>
              </div>

              {/* Price list */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">MEIA-ENTRADA</span>
                  <span className="text-4xl font-display text-slate-900">R$ 20,00</span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">+ R$ 3,99 Taxa • Parc. até 5x</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">INTEIRA COMPLETA</span>
                  <span className="text-4xl font-display text-slate-900">R$ 40,00</span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">+ R$ 4,00 Taxa • Parc. até 10x</span>
                </div>
              </div>

              {/* Bullet list */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">O que está incluído:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4.5 h-4.5 text-brasil-green shrink-0 mt-0.5" />
                    <span>Livre circulação pela praça de alimentação bento box do dia</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4.5 h-4.5 text-brasil-green shrink-0 mt-0.5" />
                    <span>Acesso às apresentações de Taikô, artes samurais e shows de música</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4.5 h-4.5 text-brasil-green shrink-0 mt-0.5" />
                    <span>Acesso à Tenda Bolha (exposições de Shodo e workshops)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4.5 h-4.5 text-brasil-green shrink-0 mt-0.5" />
                    <span>Visita a todos os cenários Instagramáveis para fotos</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 text-center space-y-3">
              <a 
                href={`${EVENT_INFO.symplaUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#111111] hover:bg-slate-800 shadow-sm text-[#FFE94F] font-display text-lg py-4 rounded-xl cursor-pointer block text-center uppercase tracking-wider"
              >
                Compra pelo Sympla Ofic
              </a>
              <span className="text-[11px] font-mono text-slate-400 block bg-slate-100 p-2 rounded-lg">
                ⚠️ Ingresso não dá direito às sessões privadas de Cinema BMJ
              </span>
            </div>

          </div>

          {/* Card 2: COMBO CINEMA + EVENTO */}
          <div className="bg-slate-900 text-white rounded-3xl border-3 border-slate-950 p-8 flex flex-col justify-between comic-shadow relative">
            
            {/* Pop badge */}
            <div className="absolute -top-4 right-10 bg-japan-red border-2 border-white text-white font-heading font-black text-xs py-1.5 px-4 rounded-full uppercase tracking-wider shadow-md animate-pulse">
              🔥 Recomendado
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-[#FFE94F] block uppercase font-bold">VOUCHER TURÍSTICO COMPLETO</span>
                <h3 className="font-display text-4xl text-white tracking-tight mt-1 uppercase">
                  Combo Cinema + Evento
                </h3>
                <p className="text-slate-300 text-sm font-heading mt-1">
                  Trânsito livre pelo festival + Entrada garantida para as 3 Sessões de Cinema do dia correspondente.
                </p>
              </div>

              {/* Price list */}
              <div className="grid grid-cols-2 gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <div>
                  <span className="text-[10px] font-mono text-[#FFE94F] block uppercase">MEIA-ENTRADA</span>
                  <span className="text-4xl font-display text-white">R$ 50,00</span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">+ R$ 5,00 Taxa • Parc. até 12x</span>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-[10px] font-mono text-[#FFE94F] block uppercase">INTEIRA COMPLETA</span>
                  <span className="text-4xl font-display text-white">R$ 100,00</span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">+ R$ 10,00 Taxa • Parc. até 12x</span>
                </div>
              </div>

              {/* Bullet list */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono text-slate-300 uppercase tracking-wider">O que está incluído:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4.5 h-4.5 text-[#FFE94F] shrink-0 mt-0.5" />
                    <span>Livre circulação completa por todas as ativações e stands do dia</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4.5 h-4.5 text-[#FFE94F] shrink-0 mt-0.5" />
                    <span>Acesso reservado garantido para as 3 Sessões de Cinema do dia correspondente</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4.5 h-4.5 text-[#FFE94F] shrink-0 mt-0.5" />
                    <span>Poster colecionável comemorativo dos 130 anos de diplomacia</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4.5 h-4.5 text-[#FFE94F] shrink-0 mt-0.5" />
                    <span>Cadeira reservada prioritária no Cine BMJ climatizado</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 text-center space-y-3">
              <a 
                href={`${EVENT_INFO.symplaUrl}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-japan-red hover:bg-[#8B0020] text-white font-display text-lg py-4 rounded-xl cursor-pointer block text-center uppercase tracking-wider border border-slate-950 shadow-md"
              >
                Compra pelo Sympla Ofic
              </a>
              <span className="text-[11px] font-mono text-slate-400 block bg-slate-800 p-2 rounded-lg">
                🎉 Melhor custo-benefício para cinéfilos de Ghibli e Tokusatsu!
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
