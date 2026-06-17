import React, { useState } from 'react';
import { Search, Store, ArrowUpRight, X, Palette } from 'lucide-react';
import { EXPOSITORES, EVENT_INFO } from '../data';

const FORMS = {
  expositores: EVENT_INFO.exhibitorFormUrl,
  artes: EVENT_INFO.artesFormUrl
};

export default function Exhibitors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'expositores' | 'artes'>('expositores');

  const filteredExhibitors = EXPOSITORES.filter((exp) => {
    return exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           exp.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = (tab: 'expositores' | 'artes' = 'expositores') => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  return (
    <section id="expositores" className="relative py-20 px-4 md:px-8 bg-slate-50 border-b-4 border-slate-900 overflow-hidden">
      
      {/* Absolute Decorative Circles */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-japan-red/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Quem Faz o Evento
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            EXPOSITORES CONFIRMADOS
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg max-w-2xl mx-auto">
            Conheça as marcas que estarão presentes trazendo o melhor da comida de rua, Action Figures, vestuário, livros e souvenirs exclusivos.
          </p>
          <div className="w-24 h-2.5 bg-brasil-green mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Search Bar filter */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Pesquisar loja, estande ou categoria..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-sans focus:outline-none focus:border-japan-red transition-all"
            />
          </div>
        </div>

        {/* Real Exhibitors Cards Grid */}
        {filteredExhibitors.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {filteredExhibitors.map((exp) => (
              <div 
                key={exp.id}
                className={`bg-white p-6 rounded-2xl border-2 border-slate-900 transition-all duration-200 comic-shadow-sm flex flex-col justify-between items-center text-center group ${
                  exp.isFeatured ? 'bg-gradient-to-b from-[#FFE94F]/10 to-white hover:border-japan-red' : 'hover:border-brasil-green'
                }`}
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform select-none">
                  {exp.isFeatured ? '👑' : '🛍️'}
                </div>

                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm md:text-base leading-tight">
                    {exp.name}
                  </h4>
                  <p className="text-slate-500 font-mono text-[10px] uppercase mt-1 leading-normal">
                    {exp.category}
                  </p>
                </div>

                {exp.isFeatured && (
                  <span className="mt-3 bg-japan-red text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded border border-slate-900 uppercase">
                    VIP BRAND
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-3 border-slate-900 p-12 text-center comic-shadow mb-12 flex flex-col items-center justify-center min-h-[300px]">
            <Store className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-4xl font-display text-slate-400 uppercase tracking-widest">Em Breve</h3>
            <p className="text-slate-500 mt-3 font-heading font-medium text-lg max-w-md mx-auto">
              Nossa lista oficial de expositores, lojas e praça de alimentação será anunciada muito em breve.
            </p>
          </div>
        )}

        {/* Suggestive Application Form with action */}
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto comic-shadow">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-display text-slate-900 uppercase">QUER EXPÔR DENTRO DA FEIRA?</h3>
            <p className="text-sm text-slate-650 max-w-2xl leading-relaxed">
              Temos espaços limitados adaptados para stands geeks, fast-food, food trucks orientais, artigos de artesanato tradicional de sakura e palestras institucionais. Entre em contato por formulário oficial e garanta a visibilidade da sua marca para mais de 10 mil espectadores!
            </p>
          </div>
          
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => handleOpenModal('expositores')}
              className="px-6 py-4 bg-[#111111] hover:bg-slate-800 text-[#FFE94F] font-display text-lg tracking-wider rounded-xl border border-slate-950 uppercase cursor-pointer text-center font-extrabold shadow-sm active:translate-y-0.5"
            >
              Simular Estande
            </button>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-center items-center">
              <a
                href={FORMS.expositores}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-heading font-black text-japan-red flex items-center justify-center gap-1 hover:underline"
              >
                Formulário Expositores <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="hidden sm:inline md:hidden text-slate-350">•</span>
              <a
                href={FORMS.artes}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-heading font-black text-brasil-green flex items-center justify-center gap-1 hover:underline"
              >
                Formulário Artes Gallery <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Google Form IFrame Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          
          <div className="bg-white text-slate-950 max-w-3xl w-full rounded-3xl border-4 border-slate-950 p-6 relative overflow-hidden comic-shadow flex flex-col gap-4 max-h-[90vh]">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-100 rounded-lg z-10"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-3 space-y-1">
              <span className="bg-brasil-green text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                Espaço & Credenciamento Oficial
              </span>
              <h3 className="font-display text-2xl text-slate-900 uppercase">Simular & Cadastrar Estande</h3>
            </div>

            {/* Tabs Trigger Switcher */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('expositores')}
                className={`py-3 px-4 rounded-xl text-xs font-heading font-black border transition-all cursor-pointer flex items-center justify-center gap-2 uppercase ${
                  activeTab === 'expositores'
                    ? 'bg-japan-red text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Expositores & Praça</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('artes')}
                className={`py-3 px-4 rounded-xl text-xs font-heading font-black border transition-all cursor-pointer flex items-center justify-center gap-2 uppercase ${
                  activeTab === 'artes'
                    ? 'bg-brasil-green text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Artes Gallery</span>
              </button>
            </div>

            {/* Embedded Iframe Container */}
            <div className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden relative min-h-[380px] md:min-h-[450px]">
              <iframe
                src={`${FORMS[activeTab]}?embedded=true`}
                className="w-full h-full min-h-[380px] md:min-h-[450px] border-0"
                title={`Formulário Google - ${activeTab}`}
              >
                Carregando formulário oficial...
              </iframe>
            </div>

            {/* Modal Footer actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <p className="text-slate-400 font-mono">
                Brasília • Edição 2026 🎌
              </p>
              <a
                href={FORMS[activeTab]}
                target="_blank"
                rel="noreferrer"
                className="text-japan-red font-mono font-bold hover:underline flex items-center gap-1"
              >
                Não carregou? Abrir em nova aba <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
