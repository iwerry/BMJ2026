import React, { useState, useEffect } from 'react';
import { Menu, X, Ticket, CalendarRange, Star } from 'lucide-react';
import { EVENT_INFO } from '../data';

interface HeaderProps {
  onOpenTickets: () => void;
}

export default function Header({ onOpenTickets }: HeaderProps) {
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
        { label: 'LineUp', href: '#lineup' },
        { label: 'Cinema', href: '#cinema' },
      ],
    },
    {
      label: 'Expositores',
      type: 'link',
      href: '#expositores',
    },
    {
      label: 'Cosplay',
      type: 'link',
      href: '#cosplay',
    },
    {
      label: 'Imprensa',
      type: 'link',
      href: '#imprensa',
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
    const currentPath = window.location.pathname;

    const isCosplayPage = currentPath === '/cosplay' || currentPath === '/desfile';
    
    const homePageTargets = ['inicio', 'cinema', 'expositores', 'imprensa', 'faq'];

    if (id === 'cosplay' || id === 'desfile') {
      if (!isCosplayPage) {
        window.location.href = '/cosplay';
        return;
      }
    } else if (id === 'lineup') {
      if (isCosplayPage) {
        window.location.href = '/#lineup';
        return;
      }
    } else if (homePageTargets.includes(id)) {
      if (isCosplayPage) {
        window.location.href = `/#${id}`;
        return;
      }
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 140;
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
    const detailsElement = e.currentTarget.closest('details');
    if (detailsElement) {
      detailsElement.removeAttribute('open');
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black border-b-4 border-brasil-yellow ${
          scrolled ? 'py-2 shadow-xl' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-3 items-center lg:flex lg:justify-between">
          
          {/* Left spacer for mobile centering */}
          <div className="lg:hidden" />
          
          {/* Fusion Brand Logo Logo */}
          <a 
            href="/" 
            className="flex flex-col items-center justify-center group focus:outline-none select-none justify-self-center"
          >
            {/* Japan-Brasil Fusion Circle Emblem */}
            <img 
              src="/logos/logo-emblem.svg" 
              alt="BMJ Emblem" 
              className="w-24 h-24 md:w-32 md:h-32 shrink-0 transform group-hover:rotate-12 transition-transform duration-300"
            />
            
            <div className="h-4 overflow-hidden relative w-full flex justify-center -mt-2 md:-mt-4">
              <span key={logoTextIndex} className="text-[10px] uppercase font-mono tracking-widest text-[#FFE94F] font-extrabold flex items-center justify-center gap-1 animate-logo-text-fade-in whitespace-nowrap">
                {logoSubtitles[logoTextIndex]}
              </span>
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
                </a>
              )
            ))}
          </nav>

          {/* Dynamic Action Box */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href={EVENT_INFO.symplaUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-japan-red hover:bg-[#8B0020] text-white font-display text-lg py-1.5 px-5 border-2 border-black cursor-pointer -skew-x-6 hover:skew-x-0 transition-all duration-150 uppercase tracking-widest inline-flex items-center gap-2 shadow-[4px_4px_0px_#000000]"
            >
              <Ticket className="w-4 h-4 text-brasil-yellow fill-brasil-yellow" />
              <span>Compra pelo Sympla Ofic</span>
            </a>
          </div>

          {/* Hamburger Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden justify-self-end">
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
        <div className="fixed inset-0 top-[120px] z-40 bg-slate-900/95 backdrop-blur-lg flex flex-col justify-between p-6 lg:hidden border-t border-slate-800 overflow-y-auto">
          
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
            
            <a 
              href={EVENT_INFO.symplaUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-japan-red hover:bg-[#A30026] text-white font-display text-lg tracking-wide py-4.5 rounded-xl border-2 border-black comic-shadow-sm uppercase transition-transform flex items-center justify-center gap-3"
            >
              <Ticket className="w-5 h-5 text-[#FFE94F]" />
              Compra pelo Sympla Ofic
            </a>
          </div>

        </div>
      )}
    </>
  );
}
