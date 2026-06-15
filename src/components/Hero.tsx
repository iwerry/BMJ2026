import { useState, useEffect } from 'react';
import { Ticket, Calendar, Compass, ArrowRight, Play, Flame } from 'lucide-react';
import { EVENT_INFO } from '../data';

interface HeroProps {
  onOpenTickets: () => void;
  onNavigateToSchedule: () => void;
}

export default function Hero({ onOpenTickets, onNavigateToSchedule }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  // Calculate countdown dynamically
  useEffect(() => {
    const target = new Date("2026-07-17T11:00:00-03:00"); // 11:00 Brasília Time (GMT-3)
    
    const calculateTime = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / (1000 * 60)) % 60);
      const s = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[95vh] pt-40 md:pt-48 pb-20 px-4 md:px-8 overflow-hidden flex items-center justify-center border-b-6 border-slate-900">
      
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#4A90E2] z-0" />

      {/* Sun-burst back drop */}
      <div className="sun-burst z-0" />

      {/* Floating Retro Stamp */}
      <div className="floating-badge hidden md:block z-20">130 ANOS DE AMIZADE! 🎌</div>

      {/* Retro halftone comic dot overlay */}
      <div className="absolute inset-0 bg-halftone pointer-events-none z-0" />

      {/* Styled Japanese traditional clouds (Left + Right vectors modeled in CSS) */}
      <div className="absolute left-[-50px] bottom-10 w-96 h-16 bg-white/20 rounded-full blur-sm pointer-events-none transform -skew-x-12 hidden lg:block z-0" />
      <div className="absolute right-[-80px] top-40 w-[500px] h-20 bg-white/10 rounded-full blur-md pointer-events-none transform skew-x-12 hidden lg:block z-0" />

      {/* Decorative Traditional Japanese Sun Emblem */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#BC002D]/15 rounded-full -z-0 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-20 flex flex-col items-center space-y-8">
        
        {/* Lote Promotional Badge */}
        <div className="animate-bounce inline-flex items-center gap-2 bg-japan-red border-2 border-slate-950 text-white rounded-full py-1.5 px-5 shadow-md comic-shadow-sm">
          <Flame className="w-4 h-4 text-brasil-yellow fill-brasil-yellow animate-pulse" />
          <span className="font-heading font-black text-xs md:text-sm tracking-widest uppercase">
            🎌 LOTE PROMOCIONAL SYMPLA DISPONÍVEL!
          </span>
        </div>

        {/* Large Curated Logo Card & Flags */}
        <div className="p-8 md:p-12 bg-white rounded-3xl border-4 border-slate-950 comic-shadow-lg max-w-4xl w-full relative">
          
          {/* Fusion Flags Small Graphic */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white border-2 border-slate-950 px-6 py-2 rounded-xl text-xs font-mono font-bold tracking-widest flex items-center gap-2 shadow-md">
            <span>🇧🇷 BRASIL</span>
            <span className="text-brasil-yellow">•</span>
            <span>JAPÃO 🇯🇵</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-slate-400 tracking-wider leading-none text-stroke-black-lg transform -rotate-1">
            BRASIL MOSTRA JAPÃO
          </h1>
          <p className="font-display text-3xl sm:text-4xl text-japan-red tracking-wide uppercase mt-3">
            BMJ 2026 — EDICÃO HISTÓRICA
          </p>

          {/* Subtitle - Celebrando 130 anos de amizade Brasil-Japão */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
            <span className="bg-brasil-green text-white font-heading font-extrabold px-4 py-1 rounded-full border border-slate-950 text-xs md:text-sm shadow-sm">
              SCS • MUSEU NACIONAL DA REPÚBLICA
            </span>
            <span className="text-slate-800 font-heading font-black text-sm md:text-base">
              Celebrando 130 anos de amizade Brasil-Japão 🎌
            </span>
          </div>

          {/* Core Event Grid Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-slate-200">
            <div className="text-center">
              <span className="text-xs font-mono text-slate-400 block uppercase font-bold">Data do Encontro</span>
              <span className="text-sm md:text-base font-heading font-black text-slate-800">17, 18 e 19 Julho 2026</span>
            </div>
            <div className="text-center border-l border-slate-200">
              <span className="text-xs font-mono text-slate-400 block uppercase font-bold">Horários Gerais</span>
              <span className="text-sm md:text-base font-heading font-black text-slate-800">11h às 22h</span>
            </div>
            <div className="text-center border-l border-slate-200 col-span-2 md:col-span-2">
              <span className="text-xs font-mono text-slate-400 block uppercase font-bold">Entrada Social</span>
              <span className="text-sm md:text-base font-heading font-black text-brasil-green-dark">A partir de R$ 20,00</span>
            </div>
          </div>

        </div>

        {/* Dynamic Countdown Block */}
        <div className="w-full max-w-2xl bg-black text-white rounded-3xl p-6 border-4 border-brasil-green shadow-xl relative overflow-hidden comic-shadow">
          {/* Halftone BG on countdown */}
          <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

          {timeLeft.isOver ? (
            <div className="text-center py-4">
              <h3 className="font-display text-3xl text-brasil-yellow tracking-widest animate-pulse uppercase">
                O FESTIVAL JÁ ESTÁ ACONTECENDO!
              </h3>
              <p className="text-sm text-slate-300 font-heading mt-2">
                Dirija-se ao Museu Nacional da República e venha celebrar os 130 anos de amizade!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFE94F] font-bold block text-center">
                ⏱️ CONTAGEM REGRESSIVA PARA O MAIOR FESTIVAL NIPO-BRASILEIRO
              </span>
              
              <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
                {/* Days */}
                <div className="bg-[#111111] border-2 border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-3xl md:text-4xl font-display text-brasil-yellow tracking-wider block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-1">DIAS</span>
                </div>
                {/* Hours */}
                <div className="bg-[#111111] border-2 border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-3xl md:text-4xl font-display text-[#eaeaea] tracking-wider block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-1">HORAS</span>
                </div>
                {/* Minutes */}
                <div className="bg-[#111111] border-2 border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-3xl md:text-4xl font-display text-[#eaeaea] tracking-wider block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-1">MINUTOS</span>
                </div>
                {/* Seconds */}
                <div className="bg-[#111111] border-2 border-slate-800 rounded-2xl p-4 text-center">
                  <span className="text-3xl md:text-4xl font-display text-japan-red tracking-wider block animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-1">SEGUNDOS</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons - Premium CCXP Layout Custom Shadows */}
        <div className="flex flex-col sm:flex-row gap-5 items-center w-full max-w-xl">
          
          <a 
            href={EVENT_INFO.symplaUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-japan-red hover:bg-[#8B0020] text-white font-display text-xl px-8 py-5 rounded-3xl border-3 border-slate-950 comic-shadow comic-shadow-hover transition-all cursor-pointer active:translate-y-1 active:shadow-sm"
          >
            <Ticket className="w-5 h-5 text-brasil-yellow shrink-0 fill-brasil-yellow" />
            <span>Compra pelo Sympla Ofic</span>
            <ArrowRight className="w-5 h-5 ml-1 animate-ping" />
          </a>

          <button 
            onClick={onNavigateToSchedule}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-display text-xl px-8 py-5 rounded-3xl border-3 border-slate-950 comic-shadow comic-shadow-hover transition-all cursor-pointer"
          >
            <Compass className="w-5 h-5 text-brasil-green shrink-0" />
            <span>CONHECER A PROGRAMAÇÃO</span>
          </button>

        </div>

        {/* Dynamic Interactive Silhouettes representation badges */}
        <div className="pt-6 flex flex-wrap gap-4 justify-center items-center opacity-90 text-[11px] font-mono font-bold text-slate-900/80">
          <span className="bg-white/40 px-3 py-1.5 rounded-full border border-black/10">🤖 CINE TOKUSATSU (Jaspion & Jiraiya)</span>
          <span className="bg-white/40 px-3 py-1.5 rounded-full border border-black/10">🌳 STUDIO GHIBLI NO TELÃO</span>
          <span className="bg-white/40 px-3 py-1.5 rounded-full border border-black/10">🎻 OTAKU FILARMÔNICA ORCHESTRA</span>
        </div>

      </div>
    </section>
  );
}
