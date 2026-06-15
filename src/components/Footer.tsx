import React from 'react';
import { EVENT_INFO } from '../data';
import { Mail, Phone, ExternalLink, ShieldAlert, Sparkles, Landmark, Heart } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Programação', href: '#programacao' },
    { label: 'Cinema', href: '#cinema' },
    { label: 'LineUp', href: '#lineup' },
    { label: 'Expositores', href: '#expositores' },
    { label: 'Cosplay', href: '#cosplay' },
    { label: 'Imprensa', href: '#imprensa' },
    { label: 'Meu Cronograma', href: '#meu-cronograma' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // Update browser URL history for SPA permalinks
      window.history.pushState(null, '', `/${id}`);
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-32 px-4 md:px-8 border-t-4 border-slate-900 relative overflow-hidden">
      
      {/* Decorative Traditional Japanese Sun Emblem at Background */}
      <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 bg-[#BC002D]/5 rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column (md:col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          <a href="/" className="flex items-center gap-3 group focus:outline-none">
            <img 
              src="/logos/logo-emblem.svg" 
              alt="BMJ Emblem" 
              className="w-20 h-20 shrink-0 transform group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="font-display text-2xl md:text-3xl text-white tracking-wider leading-none text-stroke-black">
              BRASIL MOSTRA JAPÃO
            </span>
          </a>

          <p className="text-slate-450 text-sm leading-relaxed max-w-sm text-justify">
            O <strong>Brasil Mostra Japão (BMJ) 2026</strong> celebra os 130 anos de amizade diplomática entre dois países admiráveis, trazendo cinema, nostalgia retro anos 80/90, Studio Ghibli e delícias gastronômicas para o Museu Nacional da República de Brasília.
          </p>

          <div className="text-xs text-slate-500 font-mono space-y-1">
            <p>Organizador Real: <span className="text-white font-bold">{EVENT_INFO.organizer}</span></p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> contato@brasilmostrajapao.com</p>
          </div>
        </div>

        {/* Quick Links Column (md:col-span-3) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-heading font-black text-xs uppercase tracking-widest text-[#FFE94F]">Acesso Rápido</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
            {links.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="hover:text-white transition duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* External Links Column (md:col-span-4) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-heading font-black text-xs uppercase tracking-widest text-japan-red">Canais Oficiais</h4>
          
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a 
                href={EVENT_INFO.symplaUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1.5"
              >
                Bilheteria Oficial Sympla <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </li>
            <li>
              <a 
                href={EVENT_INFO.beaconsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1.5"
              >
                Central de Links Beacons <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </li>
            <li>
              {EVENT_INFO.cadastroFormUrl ? (
                <a 
                  href={EVENT_INFO.cadastroFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  Grupo / Caravana Google Forms <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                </a>
              ) : (
                <span className="text-slate-650 flex items-center gap-1.5 cursor-not-allowed select-none font-medium italic" title="Formulário indisponível no momento">
                  Grupo / Caravana (Em Breve)
                </span>
              )}
            </li>
            <li>
              <a 
                href={EVENT_INFO.exhibitorFormUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1.5"
              >
                Forms Expositores & Alimentação <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </li>
            <li>
              <a 
                href={EVENT_INFO.artesFormUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1.5"
              >
                Forms Artes Gallery <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <span className="font-mono text-[10px] text-slate-500 block uppercase tracking-wide">Página de suporte a vendas</span>
            <p className="text-xs text-[#FFE94F] mt-1 italic">
              Adquira seus voucheres no ponto de conveniência certificado.
            </p>
          </div>
        </div>

      </div>

      {/* Under copyright bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <p className="text-xs text-slate-500 font-mono">
          © 2026 Brasil Mostra Japão • Todos os direitos reservados - Desenvolvido por{' '}
          <a
            href="https://www.instagram.com/draftcreativestudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brasil-yellow underline transition-colors"
          >
            Draft Creative Studio Ltda
          </a>
        </p>
        
        <p className="text-xs text-slate-400 font-sans flex items-center gap-1.5 justify-center">
          <span>Celebrando 130 anos de amizade Brasil-Japão</span>
          <Heart className="w-3.5 h-3.5 text-japan-red fill-japan-red animate-pulse" />
        </p>
      </div>

    </footer>
  );
}
