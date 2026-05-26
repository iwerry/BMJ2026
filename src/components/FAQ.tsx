import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const handleToggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq" className="relative py-20 px-4 md:px-8 bg-slate-50 border-b-4 border-slate-900 overflow-hidden">
      
      {/* Absolute Decorative Layer */}
      <div className="absolute inset-0 bg-halftone opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-[#FFE94F] text-slate-950 font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Central de Dúvidas
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-900 mt-4 tracking-tight uppercase text-stroke-black">
            DÚVIDAS FREQUENTES
          </h2>
          <p className="text-slate-650 mt-2 font-heading font-semibold text-base md:text-lg max-w-xl mx-auto">
            Tem alguma pergunta sobre ingressos, camarim cosplay ou credenciamento? Confira as respostas oficiais abaixo:
          </p>
          <div className="w-24 h-2.5 bg-japan-red mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border-2 border-slate-900 overflow-hidden transition-all duration-300 shadow-sm"
              >
                
                {/* Expand Trigger Bar */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className="w-full text-left p-5 md:p-6 font-heading font-extrabold text-slate-800 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base md:text-lg leading-tight flex items-center gap-2">
                    <span className="text-japan-red font-mono text-xs block shrink-0 bg-slate-100 p-1 px-2 rounded">FAQ</span>
                    {item.question}
                  </span>
                  
                  <span className={`p-1.5 rounded-lg border border-slate-200 bg-white shadow-sm transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FFE94F]' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </span>
                </button>

                {/* Question Answer Content */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 border-t-2 border-slate-100 p-5 md:p-6 bg-slate-50/50' : 'max-h-0'
                  }`}
                >
                  <p className="text-slate-650 leading-relaxed font-sans text-sm md:text-base text-justify">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Help Line */}
        <div className="mt-12 text-center p-6 bg-white rounded-3xl border-3 border-slate-950 comic-shadow-sm max-w-xl mx-auto">
          <p className="text-xs font-mono text-slate-400 uppercase font-black tracking-widest mb-1">Ainda possui dúvidas?</p>
          <p className="font-heading font-black text-slate-800 text-sm md:text-base">
            Entre em contato oficial através de nosso Instagram ou canais do Sympla!
          </p>
          <div className="pt-3 flex gap-4 justify-center">
            <a 
              href="https://beacons.ai/brasilmostrajapao"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-japan-red hover:underline"
            >
              Falar pelo Beacons 🔗
            </a>
            <span className="text-slate-300">|</span>
            <a 
              href="https://www.instagram.com/brasilmostrajapao/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-brasil-green-dark hover:underline"
            >
              Direct no Instagram 📸
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
