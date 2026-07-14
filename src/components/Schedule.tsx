import { useState } from 'react';
import { Sparkles, Calendar, Clock, Star, Search, Flame, Filter, Instagram } from 'lucide-react';
import { ScheduleItem } from '../types';
import { SCHEDULE_ITEMS } from '../data';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<'sexta' | 'sabado' | 'domingo'>('sexta');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // Days list
  const days = [
    { value: 'sexta', label: 'Sexta-Feira', date: '17/07/2026' },
    { value: 'sabado', label: 'Sábado', date: '18/07/2026' },
    { value: 'domingo', label: 'Domingo', date: '19/07/2026' },
  ] as const;

  // Categories present in items for dynamic sub-filtering
  const categories = ['todos', 'Geral', 'Shows', 'Cinema', 'Cultura', 'Cosplay', 'Gastronomia', 'Palestras'];

  // Filter items
  const filteredItems = SCHEDULE_ITEMS.filter((item) => {
    const matchesDay = item.day === activeDay;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || item.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesDay && matchesSearch && matchesCategory;
  });

  return (
    <section id="programacao" className="relative py-20 px-4 md:px-8 bg-slate-50 border-b-4 border-slate-900">
      
      {/* Absolute Decorative Grid */}
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="bg-brasil-yellow text-brasil-blue font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Grade Horária Completa
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            CRONOGRAMA GERAL BMJ
          </h2>
          <p className="text-slate-600 font-heading text-lg max-w-2xl mx-auto">
            Selecione o dia e explore as atividades. Clique na estrela ⭐ para salvar no seu cronograma!
          </p>
          <div className="w-24 h-2.5 bg-japan-red mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white p-6 rounded-3xl border-3 border-slate-900 comic-shadow-sm mb-12 space-y-6">
          
          {/* Day selection tabs with CCXP Comic Border Style */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {days.map((day) => {
              const isActive = activeDay === day.value;
              return (
                <button
                  key={day.value}
                  onClick={() => {
                    setActiveDay(day.value);
                    // Clear secondary sub-filters on day change to keep it intuitive
                    setSearchTerm('');
                    setActiveCategory('todos');
                  }}
                  className={`py-3 md:py-4 px-2 rounded-2xl border-3 border-slate-900 font-display text-lg md:text-2xl uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-japan-red text-white comic-shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="block leading-none">{day.label}</span>
                  <span className={`block text-[11px] font-mono mt-1 ${isActive ? 'text-[#FFE94F]' : 'text-slate-400'}`}>
                    {day.date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Pesquisar atração ou horário..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-900 rounded-xl bg-white text-sm font-sans focus:outline-none focus:border-japan-red transition-all"
              />
            </div>

            {/* Sub Category filtering buttons pills */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 uppercase pr-2">
                <Filter className="w-3 h-3" /> Filtrar:
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-full font-heading font-black border transition-all cursor-pointer uppercase tracking-tight ${
                      isActive 
                        ? 'bg-slate-800 text-white border-slate-800' 
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    {cat === 'todos' ? 'Ver Todos' : cat}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Vertical Timeline Schedule */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8">
            <p className="text-slate-500 font-heading text-lg">Nenhuma atração encontrada correspondente aos filtros.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('todos'); }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold"
            >
              LIMPAR FILTROS
            </button>
          </div>
        ) : (
          <div className="relative border-l-4 border-slate-900 ml-4 md:ml-32 space-y-8 py-4">
            
            {filteredItems.map((item, index) => {
              return (
                <div 
                  key={item.id} 
                  className="relative pl-8 md:pl-12 group transition-all duration-300"
                >
                  {/* Left Side Hour Sticker block (Visible only on Desktop > md) */}
                  <div className="hidden md:flex absolute right-[calc(100%+32px)] top-1 flex-col items-end min-w-[100px]">
                    <span className="font-display text-4xl text-slate-900 leading-none">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">
                      {item.category}
                    </span>
                  </div>

                  {/* Bullet Marker dot on line */}
                  <div className={`absolute left-0 -translate-x-1/2 top-4 w-6 h-6 rounded-full border-3 border-slate-950 flex items-center justify-center transition-all duration-300 ${
                    item.isHighlight 
                      ? 'bg-brasil-yellow scale-125 shadow-md' 
                      : 'bg-white group-hover:bg-japan-red'
                  }`}>
                    {item.isHighlight && <span className="text-xs p-1 select-none">🔥</span>}
                  </div>

                  {/* Timeline Card inside comic panels */}
                  <div className={`bg-white p-6 rounded-2xl border-3 border-slate-900 shadow-sm md:comic-shadow-hover transition-all duration-200 relative overflow-hidden ${
                    item.isHighlight ? 'border-r-8 border-r-japan-red' : ''
                  }`}>
                    
                    {/* Tiny responsive mobile hour tag */}
                    <div className="md:hidden flex items-center gap-2 mb-2 font-mono text-xs text-japan-red font-extrabold bg-slate-100 inline-block px-2 py-0.5 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time} • {item.category.toUpperCase()}</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      
                      <div className="space-y-2 flex-1">
                        
                        {/* Title & Category Indicator */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl md:text-2xl font-heading font-black text-slate-900 leading-tight">
                            {item.title}
                          </h3>
                          
                          {/* Category Badge element */}
                          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded-md tracking-wider border border-slate-200">
                            {item.category}
                          </span>

                          {/* Highlight Fire Icon Badge */}
                          {item.isHighlight && (
                            <span className="bg-slate-900 text-white font-mono text-[9px] px-2 py-1 rounded-md flex items-center gap-1 font-bold">
                              <Flame className="w-3 h-3 text-brasil-yellow fill-brasil-yellow" /> ESPETÁCULO
                            </span>
                          )}

                          {/* Instagram Badge */}
                          {item.instagram && (
                            <a 
                              href={`https://instagram.com/${item.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-heading font-extrabold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-md border border-pink-200 transition-all cursor-pointer"
                            >
                              <Instagram className="w-3 h-3 text-pink-500" />
                              <span>{item.instagram}</span>
                            </a>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>

                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Informative Footer Box */}
        <div className="mt-16 p-6 bg-gradient-to-r from-brasil-green/10 via-brasil-yellow/10 to-japan-red/10 rounded-3xl border-3 border-slate-950 text-center max-w-3xl mx-auto comic-shadow-sm">
          <p className="font-heading font-black text-slate-800 text-lg">💡 QUER ASSISTIR OS CLÁSSICOS NA TELA GRANDE?</p>
          <p className="text-sm text-slate-600 mt-1 lines-normal">
            As exibições de cinema ocorrem em ambiente climatizado de alto desempenho. Garanta o seu <strong>Combo Cinema + Evento</strong> para livre acesso diário.
          </p>
        </div>

      </div>
    </section>
  );
}
