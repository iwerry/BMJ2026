import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Cinema from './components/Cinema';
import Tickets from './components/Tickets';
import Attractions from './components/Attractions';
import Exhibitors from './components/Exhibitors';
import Venue from './components/Venue';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import MySchedule from './components/MySchedule';
import Footer from './components/Footer';

import { Sparkles, X, MessageSquare, Flame, Ticket, ShieldCheck } from 'lucide-react';
import { EVENT_INFO } from './data';

export default function App() {
  // Bookmark/Favorites synchronization list with localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bmj_favorites_2026');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('bmj_favorites_2026', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Trigger scroll helper safely to point to dynamic elements
  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Capture pop-up modal setup (shown after 6 seconds or 45% scroll)
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [popupEmailInput, setPopupEmailInput] = useState('');
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [popupError, setPopupError] = useState<string | null>(null);

  useEffect(() => {
    // Show pop-up after a brief warm-up delay of 6 seconds to optimize UX
    const timer = setTimeout(() => {
      const alreadyClosed = sessionStorage.getItem('bmj_promo_popup_dismissed_2026');
      if (!alreadyClosed) {
        setShowPromoPopup(true);
      }
    }, 6000);

    // Also trigger pop-up when scrolling past 50%
    const handleScrollForPopup = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && (scrolled / totalHeight) > 0.5) {
        const alreadyClosed = sessionStorage.getItem('bmj_promo_popup_dismissed_2026');
        if (!alreadyClosed) {
          setShowPromoPopup(true);
          window.removeEventListener('scroll', handleScrollForPopup);
        }
      }
    };

    window.addEventListener('scroll', handleScrollForPopup);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScrollForPopup);
    };
  }, []);

  const handleDismissPopup = () => {
    setShowPromoPopup(false);
    sessionStorage.setItem('bmj_promo_popup_dismissed_2026', 'true');
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupEmailInput.trim() || !popupEmailInput.includes('@')) {
      setPopupError('Por favor, insira um e-mail válido para participar.');
      return;
    }
    setPopupError(null);
    setPopupSuccess(true);
    setTimeout(() => {
      handleDismissPopup();
    }, 3000);
  };

  // WhatsApp Floating FAQs Widget states
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [selectedChatFaqAnswer, setSelectedChatFaqAnswer] = useState<string | null>(null);

  const whatsappFaqs = [
    { q: "Qual a data e onde será?", a: "Será nos dias 17, 18 e 19 de Julho de 2026 no Museu Nacional da República de Brasília, DF das 11:00 às 22:00." },
    { q: "Onde compro ingressos reais?", a: "Os ingressos oficiais são adquiridos pelo Sympla oficial do evento. Caso prefira, pode simular aqui no site e clicar nos links oficiais de compra." },
    { q: "Cosplayer paga meia-entrada?", a: "Sim, os cosplayers possuem direito à meia-entrada solidária levando 1kg de alimento e usufruem do vestiário e do Cosplay Help!" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 scroll-smooth antialiased">
      
      {/* 1. STICKY ACTION HEADER LAYER */}
      <Header 
        favoriteCount={favoriteIds.length} 
        onOpenTickets={() => handleScrollToSection('#ingressos')} 
      />

      {/* 2. DYNAMIC HERO BRAND LAYER WITH COUNTDOWN */}
      <Hero 
        onOpenTickets={() => handleScrollToSection('#ingressos')} 
        onNavigateToSchedule={() => handleScrollToSection('#programacao')}
      />

      {/* 3. HISTORIC CONTEXT ABOUT DIPLOMACY */}
      <About />

      {/* 4. VISITOR PERSONALIZED SCHEDULER & PASSPORT PASSPORT */}
      <MySchedule 
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
        onOpenTickets={() => handleScrollToSection('#ingressos')}
      />

      {/* 5. INTERACTIVE EVENT SCHEDULER GENERAL TIMELINE */}
      <Schedule 
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 6. IMMERSIVE CINE BMJ CAROUSEL & PANEL */}
      <Cinema 
        onOpenTickets={() => handleScrollToSection('#ingressos')}
      />

      {/* 7. DYNAMIC CATEGORIZED ATTRACTIONS GRID */}
      <Attractions 
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 8. COMPARATIVE INGRESSOS COMPARATIVE CARDS & TOTAL SUM CALCULATOR */}
      <Tickets />

      {/* 9. SEARCHABLE EXHIBITORS STANDS */}
      <Exhibitors />

      {/* 10. VENUE LOCATION MAP EMBED DIRECTIONS */}
      <Venue />

      {/* 11. STRATIFIED SPONSOR SHIELD TIERS */}
      <Sponsors />

      {/* 12. INTERACTIVE ACCORDIONS FAQ */}
      <FAQ />

      {/* 13. RICH GRADIENT NEWSLETTER EMAIL CAPTURE */}
      <Newsletter />

      {/* 14. COMPREHENSIVE FOOTER & ORGANIZER NOTIFICATION CREDITS */}
      <Footer />

      {/* 15. STICKY MOBILE AND DESKTOP LOWER DIRECT SYMPLA CTA LINE (CONVERSION BAR) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950 p-3 sm:py-4 px-6 border-t-3 border-black flex items-center justify-between shadow-2xl transition-all">
        <div className="hidden sm:flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-brasil-green animate-ping shrink-0" />
          <p className="text-xs text-slate-300 font-mono">
            <strong>BMJ 2026 • 17-19 JULHO</strong> • Museu Nacional da República
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <p className="text-xs text-brasil-yellow font-sans font-bold block sm:hidden">
            Vendas Sujeitas a Virada de Lote! 🎌
          </p>
          <a
            href={EVENT_INFO.symplaUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-japan-red hover:bg-japan-red-dark text-white font-display text-xs md:text-sm py-2 px-5 rounded-lg border border-black comic-shadow-sm block uppercase tracking-wider font-extrabold select-none hover:scale-105 active:scale-95 transition-all text-center"
          >
            Comprar pelo Sympla Ofic.
          </a>
        </div>
      </div>

      {/* 16. CHAT ASSISTANT WIDGET FLOATING COMPONENT */}
      <div className="fixed bottom-20 right-6 z-50">
        
        {/* Support bubble widget */}
        <button
          onClick={() => {
            setShowChatBubble(!showChatBubble);
            setSelectedChatFaqAnswer(null);
          }}
          className="w-14 h-14 bg-brasil-yellow text-slate-950 hover:bg-brasil-yellow-light rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg cursor-pointer transform hover:rotate-12 transition-all relative group"
          aria-label="Ajuda e Dúvidas"
          id="chat-help-trigger"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          {/* Unread dot notification */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-japan-red rounded-full border border-white" />
        </button>

        {showChatBubble && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl border-3 border-slate-950 p-5 shadow-2xl flex flex-col gap-3 text-slate-900 animate-slide-in font-sans">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1">
                <span className="text-base">🦊</span>
                <p className="font-heading font-black text-xs text-slate-800 uppercase">Suporte Rápido BMJ</p>
              </div>
              <button 
                onClick={() => setShowChatBubble(false)} 
                className="text-slate-400 hover:text-slate-700 font-bold text-xs"
              >
                X
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Olá! Como posso te ajudar hoje sobre os 130 anos do Brasil Mostra Japão? Escolha uma dúvida frequente:
            </p>

            <div className="space-y-1.5 pt-1">
              {whatsappFaqs.map((faq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedChatFaqAnswer(faq.a)}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] font-heading font-extrabold text-slate-700 transition"
                >
                  ❓ {faq.q}
                </button>
              ))}
            </div>

            {selectedChatFaqAnswer && (
              <div className="p-3 bg-[#FFE94F]/20 rounded-xl border border-brasil-yellow text-[11px] text-slate-800 animate-fade-in leading-relaxed">
                <strong>Resposta:</strong> {selectedChatFaqAnswer}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-mono">Brasília • Edição 2026</span>
              <a 
                href={EVENT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-japan-red font-mono font-bold hover:underline"
              >
                Ir ao Instagram 📸
              </a>
            </div>

          </div>
        )}

      </div>

      {/* 17. AUTOMATIC VISUAL CAPTURE BANNER (POP-UP PROMO SELECIONADO) */}
      {showPromoPopup && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-slate-950 max-w-md w-full rounded-3xl border-4 border-slate-950 p-6 relative overflow-hidden comic-shadow flex flex-col gap-4">
            
            <button
              onClick={handleDismissPopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1 bg-slate-100 rounded-lg"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {popupSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-[#009B3A] text-white rounded-full flex items-center justify-center mx-auto border-2 border-slate-950 shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl uppercase text-slate-900">BRINDE RESERVADO!</h3>
                <p className="text-slate-600 font-heading text-xs px-2">
                  Seu código promicional de 5% foi enviado na sua caixa postal simulada.
                </p>
                <p className="text-xs font-mono text-[#BC002D] font-bold">CUPOM: JAPAO130ANOS</p>
              </div>
            ) : (
              <form onSubmit={handlePopupSubmit} className="space-y-4">
                <div className="text-center space-y-2">
                  <span className="bg-japan-red text-white font-mono text-[9px] font-bold py-1 px-3.5 rounded-full border border-slate-950 uppercase tracking-widest">
                    Brinde Exclusivo
                  </span>
                  <h3 className="font-display text-3xl leading-none text-slate-900 uppercase">
                    GANHE 5% DE DESCONTO!
                  </h3>
                  <p className="text-slate-500 font-heading text-xs px-4">
                    Digite seu e-mail abaixo para liberar um cupom exclusivo para sua caravana do festival!
                  </p>
                </div>

                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="Digite seu melhor e-mail..."
                    value={popupEmailInput}
                    onChange={(e) => setPopupEmailInput(e.target.value)}
                    className="w-full p-3 border-2 border-slate-900 rounded-xl font-heading text-sm text-center focus:outline-none focus:border-japan-red"
                  />
                </div>

                {popupError && (
                  <p className="text-xs text-center text-japan-red font-heading font-black">
                    ⚠️ {popupError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#111111] hover:bg-slate-800 text-white font-display text-base py-3 rounded-2xl border border-slate-950 uppercase cursor-pointer text-center font-extrabold shadow-sm"
                >
                  Liberar Desconto
                </button>

                <p className="text-[10px] text-slate-400 text-center font-mono">
                  Ao fechar, esta oferta não reaparecerá nesta sessão temporária.
                </p>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
