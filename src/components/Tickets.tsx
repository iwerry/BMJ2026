import { useState } from 'react';
import { Ticket, Users, Check, Flame, HelpCircle, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';
import { TICKET_PLANS, EVENT_INFO } from '../data';

export default function Tickets() {
  const [selectedDayOption, setSelectedDayOption] = useState<'sexta' | 'sabado' | 'domingo'>('sabado');
  
  // Interactive Ticket Calculator Quantities
  const [qtyGeralFull, setQtyGeralFull] = useState(0);
  const [qtyGeralHalf, setQtyGeralHalf] = useState(0);
  const [qtyComboFull, setQtyComboFull] = useState(0);
  const [qtyComboHalf, setQtyComboHalf] = useState(0);

  // Calculates financial properties in real-time
  const basePriceGeral = qtyGeralFull * 40.00 + qtyGeralHalf * 20.00;
  const feesGeral = qtyGeralFull * 4.00 + qtyGeralHalf * 3.99;
  
  const basePriceCombo = qtyComboFull * 100.00 + qtyComboHalf * 50.00;
  const feesCombo = qtyComboFull * 10.00 + qtyComboHalf * 5.00;

  const totalBase = basePriceGeral + basePriceCombo;
  const totalFees = feesGeral + feesCombo;
  const grandTotal = totalBase + totalFees;
  const totalTickets = qtyGeralFull + qtyGeralHalf + qtyComboFull + qtyComboHalf;

  const handleClearCalculator = () => {
    setQtyGeralFull(0);
    setQtyGeralHalf(0);
    setQtyComboFull(0);
    setQtyComboHalf(0);
  };

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

        {/* Global Day Option Alert Selection */}
        <div className="max-w-md mx-auto mb-12 bg-white p-3.5 rounded-2xl border-2 border-slate-800 flex items-center justify-between gap-2 shadow-sm">
          <span className="text-xs font-mono text-slate-400 pl-2 uppercase font-bold">Dia pretendido:</span>
          <div className="flex gap-1">
            {(['sexta', 'sabado', 'domingo'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDayOption(day)}
                className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs uppercase tracking-tight transition-all cursor-pointer ${
                  selectedDayOption === day 
                    ? 'bg-slate-900 text-white border border-slate-950 shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Comparatives Pricing Cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-16">
          
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

        {/* Real-time Ticket Sum Calculator Section */}
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 md:p-8 comic-shadow max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-slate-100 pb-4 mb-6">
            <h3 className="text-2xl font-display text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-japan-red" />
              CALCULADORA DE VOUCHERS BMJ
            </h3>
            <p className="text-xs font-mono text-slate-400 uppercase">
              Simule a quantidade para sua família e confira o valor total!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            {/* Qty Geral Meia */}
            <div className="space-y-1">
              <label htmlFor="geral-meia" className="block text-xs font-heading font-black text-slate-700 uppercase">Acesso Geral Meia (R$20)</label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setQtyGeralHalf(Math.max(0, qtyGeralHalf - 1))}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >-</button>
                <input 
                  id="geral-meia"
                  type="number" 
                  value={qtyGeralHalf} 
                  onChange={(e) => setQtyGeralHalf(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center text-sm font-bold bg-transparent border-none focus:outline-none" 
                />
                <button 
                  onClick={() => setQtyGeralHalf(qtyGeralHalf + 1)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >+</button>
              </div>
            </div>

            {/* Qty Geral Inteira */}
            <div className="space-y-1">
              <label htmlFor="geral-inteira" className="block text-xs font-heading font-black text-slate-700 uppercase">Acesso Geral Inteira (R$40)</label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setQtyGeralFull(Math.max(0, qtyGeralFull - 1))}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >-</button>
                <input 
                  id="geral-inteira"
                  type="number" 
                  value={qtyGeralFull} 
                  onChange={(e) => setQtyGeralFull(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center text-sm font-bold bg-transparent border-none focus:outline-none" 
                />
                <button 
                  onClick={() => setQtyGeralFull(qtyGeralFull + 1)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >+</button>
              </div>
            </div>

            {/* Qty Combo Meia */}
            <div className="space-y-1">
              <label htmlFor="combo-meia" className="block text-xs font-heading font-black text-slate-700 uppercase">Combo Cinema Meia (R$50)</label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setQtyComboHalf(Math.max(0, qtyComboHalf - 1))}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >-</button>
                <input 
                  id="combo-meia"
                  type="number" 
                  value={qtyComboHalf} 
                  onChange={(e) => setQtyComboHalf(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center text-sm font-bold bg-transparent border-none focus:outline-none" 
                />
                <button 
                  onClick={() => setQtyComboHalf(qtyComboHalf + 1)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >+</button>
              </div>
            </div>

            {/* Qty Combo Inteira */}
            <div className="space-y-1">
              <label htmlFor="combo-inteira" className="block text-xs font-heading font-black text-slate-700 uppercase">Combo Cinema Inteira (R$100)</label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setQtyComboFull(Math.max(0, qtyComboFull - 1))}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >-</button>
                <input 
                  id="combo-inteira"
                  type="number" 
                  value={qtyComboFull} 
                  onChange={(e) => setQtyComboFull(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center text-sm font-bold bg-transparent border-none focus:outline-none" 
                />
                <button 
                  onClick={() => setQtyComboFull(qtyComboFull + 1)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
                  type="button"
                >+</button>
              </div>
            </div>

          </div>

          {/* Calculator results */}
          {totalTickets > 0 ? (
            <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-slate-500 font-mono text-xs">SUMA BASE: R$ {totalBase.toFixed(2)}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-mono text-xs">CANAIS TAXAS SYMPLA: R$ {totalFees.toFixed(2)}</span>
                </div>
                <p className="text-3xl font-display text-slate-900 uppercase">
                  VALOR GLOBAL: <span className="text-japan-red">R$ {grandTotal.toFixed(2)}</span>
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Calculado para {totalTickets} vouchers com conveniência regulada pelo Sympla.
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto shrink-0 justify-center">
                <button 
                  onClick={handleClearCalculator}
                  className="px-4 py-3 bg-slate-100 border border-slate-300 text-slate-600 rounded-xl font-mono text-xs uppercase hover:bg-slate-200 cursor-pointer"
                  type="button"
                >
                  ZERAR
                </button>
                <a
                  href={`${EVENT_INFO.symplaUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-japan-red text-white font-display text-sm tracking-wide rounded-xl border-2 border-slate-950 comic-shadow-sm uppercase text-center flex items-center justify-center gap-2 hover:translate-y-px"
                >
                  <Ticket className="w-4 h-4 fill-brasil-yellow" />
                  Compra pelo Sympla Ofic
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-400 font-mono">
              Use os botões de + ou - acima para simular ingressos para sua caravana!
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
