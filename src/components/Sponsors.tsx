import { Award, ShieldCheck, Landmark } from 'lucide-react';
import { PATROCINADORES } from '../data';

export default function Sponsors() {
  return (
    <section className="relative py-16 px-4 md:px-8 bg-white border-b-4 border-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="bg-brasil-yellow text-brasil-blue font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Parceiros de Confiança
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-slate-900 mt-4 tracking-tight uppercase text-stroke-black">
            APOIO E REALIZAÇÃO
          </h2>
          <div className="w-24 h-2 bg-brasil-green mx-auto mt-4 rounded-full border border-slate-950" />
        </div>

        {/* Sponsors Tiers */}
        <div className="space-y-12">
          
          {/* Gold Patrocinador Ouro */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400/10 text-yellow-500 font-heading font-black text-xs uppercase px-3 py-1 rounded-full border border-yellow-400">
              <Award className="w-3.5 h-3.5" /> Patrocinadores Ouro
            </div>
            
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
              {PATROCINADORES.ouro.map((spons, i) => (
                <div 
                  key={i} 
                  className="bg-slate-50 border-2 border-slate-900 p-6 rounded-2xl flex items-center justify-center font-display text-2xl tracking-wide uppercase text-slate-700 hover:border-japan-red hover:-translate-y-1 transition-all comic-shadow-sm h-20"
                >
                  {spons.logoText}
                </div>
              ))}
            </div>
          </div>

          {/* Silver & Bronze / Supporting block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Prata */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-200">
              <span className="font-heading font-black text-xs text-slate-500 uppercase">Patrocinadores Prata</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {PATROCINADORES.prata.map((spons, i) => (
                  <div 
                    key={i} 
                    className="bg-white border-2 border-slate-900 px-4 py-5 rounded-xl font-display text-base text-slate-700 flex items-center justify-center text-center uppercase tracking-tight font-bold h-16 shadow-sm"
                  >
                    {spons.logoText}
                  </div>
                ))}
              </div>
            </div>

            {/* Bronze & Apoio */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-200">
              <span className="font-heading font-black text-xs text-slate-500 uppercase">Bronze & Apoio Especial</span>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {PATROCINADORES.bronze.concat(PATROCINADORES.apoio.slice(0, 1)).map((spons, i) => (
                  <div 
                    key={i}
                    className="bg-white border-2 border-slate-900 px-3 py-5 rounded-xl font-display text-xs text-slate-750 flex items-center justify-center text-center uppercase tracking-normal font-bold h-16 shadow-sm"
                  >
                    {spons.logoText}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Institutional / GDF seal decoration */}
          <div className="pt-6 border-t border-slate-100 max-w-sm mx-auto">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brasil-green shrink-0" />
              Realização: {`Edgilson Ferreira dos Santos`}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
