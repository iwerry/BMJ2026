import React, { useState, useEffect } from 'react';
import { Menu, X, Ticket, CalendarRange, Star } from 'lucide-react';
import { EVENT_INFO } from '../data';

interface HeaderProps {
  favoriteCount: number;
  onOpenTickets: () => void;
}

export default function Header({ favoriteCount, onOpenTickets }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor screen scroll to add beautiful sticky header aesthetics
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Programação', href: '#programacao' },
    { label: 'Cinema', href: '#cinema' },
    { label: 'Atrações', href: '#atracoes' },
    { label: 'Expositores', href: '#expositores' },
    { label: 'Local', href: '#local' },
    { label: 'Passaporte', href: '#meu-cronograma' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Cosplay', href: '#cosplay' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black border-b-4 border-brasil-yellow ${
          scrolled ? 'py-2 shadow-xl' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Fusion Brand Logo Logo */}
          <a 
            href="#inicio" 
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Japan-Brasil Fusion Circle Emblem */}
            <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-md transform group-hover:rotate-12 transition-transform duration-300">
              {/* Brazil background slices on half */}
              <div className="absolute inset-0 bg-gradient-to-r from-brasil-green to-brasil-yellow scale-x-75 -translate-x-[40%]" />
              {/* Japan core Hinomaru Red circle */}
              <div className="w-6 h-6 rounded-full bg-japan-red relative z-10 border border-slate-900" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl text-white tracking-wider leading-none text-stroke-black">
                BRASIL MOSTRA JAPÃO
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFE94F] font-extrabold flex items-center gap-1">
                <span>130 ANOS • BRASÍLIA 2026</span> <span className="animate-pulse">🎌</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link List */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
                link.label === 'Cosplay' ? (
                  <details key={link.label} className="relative group">
                    <summary className="cursor-pointer text-white hover:text-brasil-yellow text-xs xl:text-sm font-heading font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-slate-800/60">
                      {link.label}
                    </summary>
                    <div className="absolute left-0 mt-2 w-48 bg-slate-900 rounded-lg shadow-lg z-20 hidden group-open:block">
                      <a href="#desfile" onClick={(e) => handleLinkClick(e, '#desfile')} className="block px-4 py-2 text-sm text-white hover:bg-slate-800">Desfile (Sexta)</a>
                      <a href="#concurso" onClick={(e) => handleLinkClick(e, '#concurso')} className="block px-4 py-2 text-sm text-white hover:bg-slate-800">Concurso (Sáb./Dom.)</a>
                      <a href="#inscricoes" onClick={(e) => handleLinkClick(e, '#inscricoes')} className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed">Inscrições / Edital (em breve)</a>
                    </div>
                  </details>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white hover:text-brasil-yellow text-xs xl:text-sm font-heading font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-slate-800/60 relative"
                  >
                    {link.label}
                    {link.href === '#meu-cronograma' && favoriteCount > 0 && (
                      <span className="absolute -top-1.5 -right-1 bg-brasil-yellow text-slate-950 font-mono text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-slate-950 animate-bounce">
                        {favoriteCount}
                      </span>
                    )}
                  </a>
                )
            ))}
          </nav>

          {/* Dynamic Action Box */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Bookmark fast view indicator */}
            {favoriteCount > 0 && (
              <a 
                href="#meu-cronograma"
                onClick={(e) => handleLinkClick(e, '#meu-cronograma')}
                className="flex items-center gap-1 text-brasil-yellow bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono scroll-smooth animate-pulse"
              >
                <Star className="w-3.5 h-3.5 fill-brasil-yellow" />
                <span>MEU PASSAPORTE ({favoriteCount})</span>
              </a>
            )}
            
            <button 
              onClick={onOpenTickets}
              className="bg-japan-red hover:bg-[#8B0020] text-white font-display text-lg py-1.5 px-5 border-2 border-black cursor-pointer -skew-x-6 hover:skew-x-0 transition-all duration-150 uppercase tracking-widest inline-flex items-center gap-2 shadow-[4px_4px_0px_#000000]"
            >
              <Ticket className="w-4 h-4 text-brasil-yellow fill-brasil-yellow" />
              <span>COMPRAR INGRESSO</span>
            </button>
          </div>

          {/* Hamburger Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {favoriteCount > 0 && (
              <a 
                href="#meu-cronograma"
                onClick={(e) => handleLinkClick(e, '#meu-cronograma')}
                className="text-brasil-yellow bg-slate-800 p-2 rounded-lg border border-slate-700 text-xs font-mono relative shrink-0"
              >
                <Star className="w-4 h-4 fill-brasil-yellow" />
                <span className="absolute -top-1 -right-1 bg-japan-red text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white bg-slate-800 p-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 transition"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Drawer Menu for Mobile Devices */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-slate-900/95 backdrop-blur-lg flex flex-col justify-between p-6 lg:hidden border-t border-slate-800">
          
          <div className="space-y-3">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-2 mb-2">BMJ Navegação</p>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-white hover:text-brasil-yellow hover:bg-slate-800 py-3 px-4 rounded-xl text-sm font-heading font-black uppercase tracking-wider transition-colors border border-slate-800 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.href === '#meu-cronograma' && favoriteCount > 0 && (
                    <span className="bg-brasil-yellow text-slate-950 font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="text-center text-xs text-slate-400 font-mono">
              <p>Museu Nacional da República</p>
              <p className="text-[#FFE94F]">17 a 19 de Julho de 2026</p>
            </div>
            
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTickets();
              }}
              className="w-full bg-japan-red hover:bg-[#A30026] text-white font-display text-lg tracking-wide py-4.5 rounded-xl border-2 border-black comic-shadow-sm uppercase transition-transform flex items-center justify-center gap-3"
            >
              <Ticket className="w-5 h-5 text-[#FFE94F]" />
              COMPRAR INGRESSO SYMPLA
            </button>
          </div>

        </div>
      )}
    </>
  );
}
