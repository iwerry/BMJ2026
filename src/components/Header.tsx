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
  const [logoTextIndex, setLogoTextIndex] = useState(0);

  const logoSubtitles = [
    '130 ANOS • BRASIL JAPÃO 🎌',
    '130 ANOS • BRASÍLIA 2026 🎌'
  ];

  // Rotate logo subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoTextIndex((prev) => (prev + 1) % logoSubtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  interface SubmenuItem {
    label: string;
    href: string;
    disabled?: boolean;
  }

  interface MenuLink {
    label: string;
    href?: string;
    type: 'link' | 'dropdown';
    submenu?: SubmenuItem[];
  }

  const menuItems: MenuLink[] = [
    {
      label: 'Programação',
      type: 'dropdown',
      submenu: [
        { label: 'Cinema', href: '#cinema' },
        { label: 'LineUp', href: '#lineup' },
      ],
    },
    {
      label: 'Expositores',
      type: 'link',
      href: '#expositores',
    },
    {
      label: 'Cosplay',
      type: 'dropdown',
      submenu: [
        { label: 'Desfile (Sexta)', href: '#desfile' },
        { label: 'Concurso (Sáb/Dom)', href: '#concurso' },
        { label: 'Inscrições / Edital', href: '#inscricoes', disabled: true },
      ],
    },
    {
      label: 'Imprensa',
      type: 'link',
      href: '#imprensa',
    },
    {
      label: 'Passaporte',
      type: 'link',
      href: '#meu-cronograma',
    },
    {
      label: 'FAQ',
      type: 'link',
      href: '#faq',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // Update browser URL history for SPA permalinks
      const path = id === 'inicio' ? '/' : `/${id}`;
      window.history.pushState(null, '', path);
    }
  };

  const handleSubLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleLinkClick(e, href);
    e.currentTarget.closest('details')?.removeAttribute('open');
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
            href="/" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Japan-Brasil Fusion Circle Emblem */}
            <img 
              src="/logos/logo-emblem.svg" 
              alt="BMJ Emblem" 
              className="w-12 h-12 shrink-0 transform group-hover:rotate-12 transition-transform duration-300"
            />
            
            <div className="flex flex-col items-start select-none">
              <span className="font-display text-2xl md:text-3xl tracking-wider leading-none text-stroke-black">
                <span className="text-white">BMJ</span>
                <span className="text-japan-red">2026</span>
              </span>
              <div className="h-4 overflow-hidden relative">
                <span key={logoTextIndex} className="text-[10px] uppercase font-mono tracking-widest text-[#FFE94F] font-extrabold flex items-center gap-1 animate-logo-text-fade-in">
                  {logoSubtitles[logoTextIndex]}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Link List */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              item.type === 'dropdown' ? (
                <details key={item.label} className="relative group">
                  <summary className="cursor-pointer text-white hover:text-brasil-yellow text-xs xl:text-sm font-heading font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-slate-800/60 list-none flex items-center gap-1">
                    {item.label}
                    <span className="text-[10px] opacity-60">▼</span>
                  </summary>
                  <div className="absolute left-0 mt-2 w-48 bg-slate-900 rounded-lg shadow-lg z-20 hidden group-open:block border border-slate-800">
                    {item.submenu?.map((sub) => (
                      sub.disabled ? (
                        <span key={sub.label} className="block px-4 py-2 text-xs text-gray-500 cursor-not-allowed select-none font-heading font-black uppercase tracking-wider">
                          {sub.label} (em breve)
                        </span>
                      ) : (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={(e) => handleSubLinkClick(e, sub.href)}
                          className="block px-4 py-2 text-xs text-white hover:text-brasil-yellow hover:bg-slate-800 font-heading font-black uppercase tracking-wider transition-colors duration-150"
                        >
                          {sub.label}
                        </a>
                      )
                    ))}
                  </div>
                </details>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href!)}
                  className="text-white hover:text-brasil-yellow text-xs xl:text-sm font-heading font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-slate-800/60 relative"
                >
                  {item.label}
                  {item.href === '#meu-cronograma' && favoriteCount > 0 && (
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
        <div className="fixed inset-0 top-[72px] z-40 bg-slate-900/95 backdrop-blur-lg flex flex-col justify-between p-6 lg:hidden border-t border-slate-800 overflow-y-auto">
          
          <div className="space-y-3">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-2 mb-2">BMJ Navegação</p>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                item.type === 'dropdown' ? (
                  <div key={item.label} className="border border-slate-800 rounded-xl p-3 bg-slate-950/40">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest pl-1 mb-1.5 font-black">{item.label}</p>
                    <div className="flex flex-col gap-1 pl-2 border-l border-slate-800">
                      {item.submenu?.map((sub) => (
                        sub.disabled ? (
                          <span key={sub.label} className="text-slate-600 text-xs py-1.5 px-3 rounded-lg font-heading font-black uppercase tracking-wider italic select-none">
                            {sub.label} (em breve)
                          </span>
                        ) : (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleLinkClick(e, sub.href)}
                            className="text-white hover:text-brasil-yellow hover:bg-slate-800 py-2 px-3 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-colors block"
                          >
                            {sub.label}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href!)}
                    className="text-white hover:text-brasil-yellow hover:bg-slate-800 py-3 px-4 rounded-xl text-sm font-heading font-black uppercase tracking-wider transition-colors border border-slate-800 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.href === '#meu-cronograma' && favoriteCount > 0 && (
                      <span className="bg-brasil-yellow text-slate-950 font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                        {favoriteCount}
                      </span>
                    )}
                  </a>
                )
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
