import React, { useState } from 'react';
import { Ticket, Tag, Film, Tv, Sparkles, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { CinemaSession } from '../types';
import { CINEMA_SESSIONS, EVENT_INFO } from '../data';

interface CinemaProps {
  onOpenTickets: () => void;
}

export default function Cinema({ onOpenTickets }: CinemaProps) {
  const [selectedDay, setSelectedDay] = useState<'todos' | 'sexta' | 'sabado' | 'domingo'>('todos');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'Tokusatsu' | 'Studio Ghibli'>('todos');
  
  // Simulation Modal States
  const [selectedSession, setSelectedSession] = useState<CinemaSession | null>(null);
  const [ticketType, setTicketType] = useState<'inteira' | 'meia'>('meia');
  const [visitorName, setVisitorName] = useState('');
  const [purchaseStage, setPurchaseStage] = useState<'idle' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const filteredSessions = CINEMA_SESSIONS.filter((session) => {
    const matchesDay = selectedDay === 'todos' || session.day === selectedDay;
    const matchesCat = activeCategory === 'todos' || session.category === activeCategory;
    return matchesDay && matchesCat;
  });

  const handleOpenSimulateModal = (session: CinemaSession) => {
    setSelectedSession(session);
    setVisitorName('');
    setTicketType('meia');
    setPurchaseStage('idle');
    setFormError(null);
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  const handleSimulatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      setFormError("Por favor, digite seu nome de portador do ingresso.");
      return;
    }
    setFormError(null);
    setPurchaseStage('success');
  };

  return (
    <section id="cinema" className="relative py-20 px-4 md:px-8 bg-slate-900 text-white border-b-4 border-slate-950 overflow-hidden">
      
      {/* Absolute Stylized Space Halftones */}
      <div className="absolute inset-0 bg-halftone opacity-[0.03] pointer-events-none" />
      <div className="absolute top-[-5%] right-0 w-[400px] h-[400px] bg-pop-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-0 w-[400px] h-[400px] bg-brasil-blue/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-950 shadow-md text-sm uppercase tracking-wider inline-block">
            CINE BMJ - CLÁSSICOS INESQUECÍVEIS
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-white mt-4 tracking-tight uppercase text-stroke-black">
            Studio Ghibli & Tokusatsu
          </h2>
          <p className="text-slate-300 mt-2 font-heading font-semibold text-lg max-w-3xl mx-auto">
            Viva a emoção lendária de assistir Jiraiya, Jaspion e as maiores obras-primas da animação de Hayao Miyazaki em uma projeção monumental!
          </p>
          <div className="w-24 h-2.5 bg-brasil-yellow mx-auto mt-4 rounded-full border border-slate-700" />
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-800/80 p-5 rounded-2xl border-2 border-slate-700 mb-12">
          
          {/* Day selection tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-400 block w-full mb-1">PROGRAMAÇÃO POR DIAS</span>
            {['todos', 'sexta', 'sabado', 'domingo'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day as any)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDay === day 
                    ? 'bg-[#FFE94F] text-slate-950 font-black border border-slate-950' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {day === 'todos' ? 'Todos os Dias' : day}
              </button>
            ))}
          </div>

          {/* Category toggler */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto md:justify-end">
            <span className="text-xs font-mono text-slate-400 block w-full mb-1">CATEGORIAS DE CINEMA</span>
            {['todos', 'Tokusatsu', 'Studio Ghibli'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-japan-red text-white font-black border border-slate-950' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {cat === 'todos' ? 'Todos os Temas' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {filteredSessions.map((session) => (
            <div 
              key={session.id}
              className="bg-slate-800/60 rounded-3xl border-3 border-slate-950 overflow-hidden flex flex-col justify-between hover:bg-slate-800 hover:border-japan-red transition-all duration-300 group shadow-md"
            >
              
              {/* Cover Image & Metadata badge */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-sm text-[#FFE94F] font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-slate-700 z-10 flex items-center gap-1">
                  <Film className="w-3.5 h-3.5" />
                  <span>{session.category.toUpperCase()}</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-japan-red text-white font-heading font-black text-xs px-2.5 py-1 rounded-md z-10 border border-slate-950 shadow-sm">
                  {session.dayLabel} às {session.time}
                </div>

                <img 
                  src={session.image} 
                  alt={session.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Session Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-black text-white leading-tight mb-2 group-hover:text-brasil-yellow transition-colors">
                    {session.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {session.description}
                  </p>
                </div>

                {/* Pricing indicators */}
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">VALOR DA SESSÃO:</span>
                    <span className="text-sm font-heading font-bold text-white bg-slate-750 px-2.5 py-1 rounded-md border border-slate-700">
                      Inteira R$ 60 | Meia R$ 30
                    </span>
                  </div>

                  {/* Booking Action */}
                  <button
                    onClick={() => handleOpenSimulateModal(session)}
                    className="w-full bg-[#FFE94F] hover:bg-[#FFE000] text-slate-950 font-display text-base py-3 rounded-2xl border-2 border-slate-955 hover:scale-[1.01] transition-transform active:translate-y-px text-center block uppercase"
                  >
                    🛒 COMPRAR INGRESSO CINEMA
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* Suggestive Combo Ticket Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-brasil-blue/90 to-slate-900 border-3 border-slate-950 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 comic-shadow">
          <div className="space-y-2">
            <span className="bg-brasil-yellow text-slate-950 font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Combinação Excelente</span>
            <h3 className="text-2xl md:text-3xl font-display text-white">CONTEÚDO ILIMITADO COM COMBO CINEMA + EVENTO!</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Em vez de pagar R$ 60 por sessão individual, o **Combo Cinema + Evento** dá livre trânsito diário mais entrada garantida para TODAS as 3 sessões do dia por apenas R$ 100 Inteira ou R$ 50 Meia!
            </p>
          </div>
          <button
            onClick={onOpenTickets}
            className="bg-japan-red hover:bg-[#99001D] text-white font-display text-lg py-4.5 px-8 rounded-2xl border-2 border-slate-950 cursor-pointer block uppercase shrink-0 transition-transform hover:scale-105"
          >
            GARANTIR COMBO SEGURO
          </button>
        </div>

      </div>

      {/* Dynamic Interactive Seat Reservation Simulation Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          
          <div className="bg-white text-slate-950 max-w-lg w-full rounded-3xl border-4 border-slate-950 p-6 relative overflow-hidden comic-shadow flex flex-col gap-4">
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-100 rounded-lg"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {purchaseStage === 'idle' ? (
              /* Input Form */
              <form onSubmit={handleSimulatePurchase} className="space-y-4">
                
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <span className="bg-japan-red text-white text-xs font-bold px-2 py-0.5 rounded">CINE REPRODUÇÃO</span>
                  <p className="font-heading font-black text-slate-800 text-sm">Reserva de Meia/Inteira Individual</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-500 uppercase">FILME SELECIONADO</label>
                  <p className="font-display text-3xl text-slate-400 tracking-tight text-stroke-black uppercase leading-tight">
                    {selectedSession.title}
                  </p>
                  <p className="text-xs font-heading font-bold text-japan-red">
                    Sessão no {selectedSession.dayLabel} ({selectedSession.dateLabel}) às {selectedSession.time}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-500 uppercase">Sua Categoria de Ingresso</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketType('meia')}
                      className={`p-3 rounded-xl border-2 font-heading font-bold text-xs uppercase flex flex-col items-center justify-center transition-all cursor-pointer ${
                        ticketType === 'meia' 
                          ? 'bg-brasil-yellow/20 border-brasil-yellow text-slate-900 shadow-sm' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Tag className="w-4 h-4 mb-1" />
                      <span>MEIA-ENTRADA R$ 30,00</span>
                      <span className="text-[9px] font-mono font-medium text-slate-400 mt-0.5">+ R$ 3.99 Taxa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTicketType('inteira')}
                      className={`p-3 rounded-xl border-2 font-heading font-bold text-xs uppercase flex flex-col items-center justify-center transition-all cursor-pointer ${
                        ticketType === 'inteira' 
                          ? 'bg-japan-red/10 border-japan-red text-slate-900 shadow-sm' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Tag className="w-4 h-4 mb-1" />
                      <span>INTEIRA R$ 60,00</span>
                      <span className="text-[9px] font-mono font-medium text-slate-400 mt-0.5">+ R$ 6.00 Taxa</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="name-input" className="block text-xs font-mono text-slate-500 uppercase">NOME DO PORTADOR DO INGRESSO</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Ex: Edgilson Ferreira..."
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full p-3 border-2 border-slate-900 rounded-xl font-heading focus:outline-none focus:border-japan-red"
                  />
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-700 font-heading font-black">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1.5 font-bold text-slate-700">
                    <AlertCircle className="w-4 h-4 text-japan-red" />
                    INFORMAÇÃO SOBRE A COMPRA REAL
                  </p>
                  <p>
                    Esta é uma simulação de passaporte interno para o site. Ao adquirir o ingresso real pelo Sympla, você receberá a credencial oficial do BMJ no seu e-mail.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-japan-red text-white py-3 border-2 border-slate-950 font-display text-lg uppercase rounded-2xl comic-shadow-sm hover:translate-y-px hover:shadow-none transition-all cursor-pointer"
                >
                  Confirmar Reserva no Site
                </button>

              </form>
            ) : (
              /* Success Flow */
              <div className="space-y-6 py-6 text-center">
                <div className="w-16 h-16 bg-brasil-green text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce border-2 border-slate-950">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display text-3xl uppercase text-slate-900 tracking-tight">SESSÃO RESERVADA!</h3>
                  <p className="text-slate-600 font-heading text-sm px-4">
                    Parabéns, <strong>{visitorName}</strong>! Sua participação na sessão de <strong>{selectedSession.title}</strong> ({selectedSession.time}) foi simulada com sucesso!
                  </p>
                </div>

                <div className="p-4 bg-[#FFE94F]/20 rounded-2xl border-2 border-[#FFE94F] text-slate-800 text-xs space-y-2">
                  <p className="font-heading font-extrabold flex items-center justify-center gap-1 text-slate-950">
                    <Sparkles className="w-3.5 h-3.5 text-japan-red animate-spin" /> PASSO FINAL OBRIGATÓRIO (VENDAS REAIS!)
                  </p>
                  <p className="font-sans leading-relaxed">
                    Sua credencial no site está reservada. Agora, compre seu ingresso oficial no Sympla do Brasil Mostra Japão clicando no botão abaixo:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="py-3 bg-slate-100 font-mono text-xs uppercase font-extrabold rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Retornar ao Site
                  </button>
                  <a
                    href={EVENT_INFO.symplaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 bg-japan-red text-white font-display text-sm tracking-wide uppercase rounded-xl border-2 border-slate-950 comic-shadow-sm text-center flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4 fill-brasil-yellow" />
                    Comprar no Sympla
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
