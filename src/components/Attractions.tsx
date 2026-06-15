import { useState } from 'react';
import { Star, Eye, Calendar, MapPin, Grid, Layers, Heart } from 'lucide-react';
import { Attraction } from '../types';
import { ATRACOES_ESPECIAIS, EVENT_INFO } from '../data';

export default function Attractions() {
  const [filter, setFilter] = useState<string>('todos');

  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'shows', label: '🔥 Shows' },
    { value: 'cinema', label: '🎬 Cinema & Expo' },
    { value: 'food', label: '🍱 Gastronomia' },
    { value: 'shops', label: '🛍️ Feira Geek' },
    { value: 'cosplay', label: '🎭 Cosplay & Fotos' }
  ];

  const filteredAttractions = ATRACOES_ESPECIAIS.filter((item) => {
    return filter === 'todos' || item.category === filter;
  });

  return (
    <section id="lineup" className="relative py-20 px-4 md:px-8 bg-white border-b-4 border-slate-900 overflow-hidden">
      
      {/* Decorative Vectors */}
      <div className="absolute top-0 right-[-100px] w-80 h-80 bg-brasil-yellow/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-japan-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="bg-brasil-green text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Experiências Incríveis
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            LINEUP COMPACTO BMJ
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg max-w-2xl mx-auto">
            Explore as principais atividades que preparamos para você e sua família. Sinta o clima épico da CCXP com temática nipo-brasileira!
          </p>
          <div className="w-24 h-2.5 bg-brasil-yellow mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Filter Switch Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-2xl mx-auto bg-slate-50 p-2 rounded-2xl border-2 border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-black border transition-all cursor-pointer uppercase ${
                filter === cat.value 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {filteredAttractions.map((att) => {
            return (
              <div 
                key={att.id}
                className="bg-white rounded-3xl border-3 border-slate-900 overflow-hidden flex flex-col justify-between hover:border-japan-red group transition-all duration-300 comic-shadow"
              >
                
                {/* Att cover */}
                <div className="relative h-44 overflow-hidden border-b-2 border-slate-950">
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white font-mono text-[9px] font-extrabold px-2.5 py-1 rounded-md border border-slate-700 z-10 uppercase tracking-widest">
                    {att.category}
                  </span>

                  {att.isHighlight && (
                    <span className="absolute top-3 right-3 bg-brasil-yellow text-slate-950 font-heading font-black text-xs px-2.5 py-1 rounded-md border border-slate-950 shadow-sm z-10 uppercase tracking-widest flex items-center gap-1 animate-pulse">
                      ⚡ Destaque
                    </span>
                  )}

                  <img 
                    src={att.image} 
                    alt={att.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                </div>

                {/* Att Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-heading font-black text-slate-900 leading-tight group-hover:text-japan-red transition-colors">
                      {att.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed text-justify">
                      {att.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-2xl select-none">{att.icon}</span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Suggestion Caravanas */}
        <div className="mt-16 bg-slate-950 text-white p-8 rounded-3xl border-3 border-slate-950 comic-shadow text-center max-w-3xl mx-auto space-y-4 relative overflow-hidden">
          {/* Halftone dots */}
          <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />
          
          <span className="bg-[#FFE94F] text-slate-950 font-mono text-[9px] font-extrabold px-3 py-1 rounded uppercase tracking-wider inline-block">
            Caravanas & Grupos do DF
          </span>
          <h3 className="text-2xl md:text-3xl font-display text-white">VAI VIR COM GRUPO OU ESCOLA?</h3>
          <p className="text-slate-350 text-sm max-w-xl mx-auto leading-relaxed">
            Organize uma caravana de qualquer cidade-satélite ou município de Goiás e ganhe isenção de taxas exclusivas, posters autografados pela Otaku Orchestra e recepção credenciada prioritária!
          </p>
          <div className="pt-2">
            {/* TODO: Substituir o botão abaixo pelo link real quando disponível:
            <a 
              href={EVENT_INFO.cadastroFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-japan-red hover:bg-[#8B0020] text-white border-2 border-slate-700 px-6 py-3 rounded-xl font-display text-base uppercase tracking-wider cursor-pointer shadow-md transform hover:scale-[1.02]"
            >
              <span>Cadastrar Minha Caravana</span>
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </a>
            */}
            <button 
              disabled
              className="inline-flex items-center gap-2 bg-slate-700 text-slate-400 border-2 border-slate-600 px-6 py-3 rounded-xl font-display text-base uppercase tracking-wider cursor-not-allowed opacity-60 shadow-sm"
            >
              <span>Cadastrar Minha Caravana</span>
              <Heart className="w-4 h-4 fill-slate-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
