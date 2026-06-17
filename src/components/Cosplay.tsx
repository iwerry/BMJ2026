import React, { useRef, useState, useEffect } from 'react';
import { EVENT_INFO } from '../data';
import { Ticket, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

type CosplayCategory = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  prizes: string[];
  image: string;
};

const COSPLAY_CATEGORIES: CosplayCategory[] = [
  {
    id: "Kids",
    title: "Cosplay Kids",
    subtitle: "Sábado (18 de Julho)",
    summary: "Categoria exclusiva para pequenos cosplayers de até 11 anos de idade. É vetada a entrada de crianças com cosplays sexualizados ou de personagens eróticos. Uma fofura de apresentação para derreter os corações do público e dos jurados!",
    prizes: [
      "1º Lugar: Troféu + Voucher de R$ 400,00 da loja de brinquedos patrocinadora.",
      "2º Lugar: Troféu + Voucher de R$ 200,00 para ser utilizado no evento.",
      "3º Lugar: Troféu + 03 Ingressos de cinema Cineflix."
    ],
    image: "/cosplay/kids.png"
  },
  {
    id: "Start",
    title: "Cosplay Start",
    subtitle: "Sábado (18 de Julho)",
    summary: "Destinado a cosplayers a partir de 12 anos de idade que estão dando os seus primeiros passos no palco e que ainda não possuem nenhuma premiação ou experiência anterior em apresentações. O espaço perfeito para estrear o seu talento!",
    prizes: [
      "1º Lugar: Troféu + Smartphone.",
      "2º Lugar: Troféu + Alexa.",
      "3º Lugar: Troféu + Voucher de R$ 200,00 para ser utilizado no evento."
    ],
    image: "/cosplay/start.png"
  },
  {
    id: "Up",
    title: "Cosplay UP",
    subtitle: "Sábado (18 de Julho)",
    summary: "Categoria de nível avançado voltada para cosplayers a partir de 12 anos que já possuem qualquer tipo de premiação anterior. Prepare-se para ver armaduras imponentes, costuras impecáveis e apresentações de altíssimo nível no palco principal!",
    prizes: [
      "1º Lugar: R$ 500,00 + Troféu + Sessão de fotos exclusiva (5 fotos) com o fotógrafo Rainer Faulstich.",
      "2º Lugar: R$ 300,00 + Troféu + Smartphone.",
      "3º Lugar: R$ 100,00 + Troféu + Caixa de som."
    ],
    image: "/cosplay/up.png"
  },
  {
    id: "Comemorativo",
    title: "Cosplay Comemorativo",
    subtitle: "Sábado (18 de Julho)",
    summary: "Uma celebração especial voltada exclusivamente para o universo do Estúdio Ghibli e de Tokusatsu! Válido somente para personagens relacionados a essas vertentes (como Ponyo, Totoro, Ultraman, Jaspion, entre outros).",
    prizes: [
      "1º Lugar: Troféu + Cartão VIP do cinema Cineflix.",
      "2º Lugar: Troféu + Caixa de som.",
      "3º Lugar: Troféu + Voucher de R$ 200,00 para ser utilizado no evento."
    ],
    image: "/cosplay/ghibli.png"
  },
  {
    id: "Voto do Público",
    title: "Cosplay Voto do Público",
    subtitle: "Domingo (19 de Julho)",
    summary: "No domingo quem manda é a galera! Não haverá banca de jurados — o grande vencedor será escolhido diretamente pelo voto e pela aclamação do público. Prepare o seu carisma! Serão abertas 70 vagas exclusivas, com confirmação presencial encerrando-se 1 hora antes do concurso.",
    prizes: [
      "🏆 Campeão MASTER: R$ 300,00 (via PIX) + Troféu Oficial + 01 Quadro A3 à sua escolha no estande Massa Véi + 03 Ingressos Cineflix."
    ],
    image: "/cosplay/voto.png"
  }
];

const CosplayCard: React.FC<{ category: CosplayCategory }> = ({ category }) => {
  return (
    <article className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.01] hover:border-brasil-yellow/50 transition-all duration-300 flex flex-col h-full w-full">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden border-b border-white/15 shrink-0">
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-brasil-yellow font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
          {category.id}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-white leading-tight uppercase">{category.title}</h3>
            <p className="text-xs text-brasil-yellow font-mono mt-1">{category.subtitle}</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {category.summary}
          </p>
        </div>

        <div className="bg-slate-950/40 rounded-xl p-4 border border-white/5">
          <h4 className="font-bold text-brasil-yellow mb-2 text-sm uppercase tracking-wider">Premiação:</h4>
          <ul className="space-y-2">
            {category.prizes.map((prize, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                <span className="text-brasil-yellow mt-0.5">•</span>
                <span className="flex-1 leading-snug">{prize}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-5 pt-0 mt-auto space-y-2">
        <a 
          href="/edital_BRASIL_MOSTRA_JAPAO_1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors border border-white/10"
        >
          <FileText className="w-4 h-4" />
          Baixar Edital
        </a>
        <div className="relative group/btn">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brasil-blue via-japan-red to-brasil-yellow rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-300"></div>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdA5iGxDFkZPCddi7mjPIQNuImDrQIebdJtPkyFxKhKqONUfw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#001A52] hover:bg-brasil-blue text-white rounded-xl text-sm font-bold transition-colors border border-white/10 shadow-lg"
          >
            <ExternalLink className="w-4 h-4" />
            Formulário de Inscrição
          </a>
        </div>
      </div>
    </article>
  );
};

interface CosplayProps {
  isDedicatedPage?: boolean;
}

export default function Cosplay({ isDedicatedPage = false }: CosplayProps) {
  const isActuallyDedicatedPage = typeof window !== 'undefined' && (window.location.pathname === '/cosplay' || window.location.pathname === '/desfile');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationId: number;
    const step = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1; // Animation speed
        
        // Loop back when reaching the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 5) {
          scrollContainer.classList.remove('scroll-smooth');
          scrollContainer.scrollLeft = 0;
          void scrollContainer.offsetWidth; // Force reflow
          scrollContainer.classList.add('scroll-smooth');
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 344; // width (320) + gap (24)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="cosplay" 
      className={`relative ${isDedicatedPage || isActuallyDedicatedPage ? 'pt-40 md:pt-48 pb-20' : 'py-20'} px-4 md:px-8 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden border-b-4 border-slate-950`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto text-center">
        <span className="bg-japan-red text-white font-mono text-[10px] font-bold py-1.5 px-4 rounded-full border border-white/20 uppercase tracking-widest inline-block mb-4">
          Concurso Oficial
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-stroke-white uppercase tracking-tight mb-4">
          CONCURSO COSPLAY BMJ
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-white/80 mb-10 leading-relaxed">
          Prepare-se para o maior desfile e concurso cosplay do Planalto Central! As finais acontecerão no palco principal durante o fim de semana, com premiações e jurados especiais. As inscrições serão apenas online e gratuitas.
        </p>

        {/* Categories Slider with Manual Controls */}
        <div className="relative w-full max-w-7xl mx-auto mb-12 group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 bg-slate-900/80 hover:bg-brasil-yellow text-white hover:text-slate-900 p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 bg-slate-900/80 hover:bg-brasil-yellow text-white hover:text-slate-900 p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex w-full gap-6 overflow-x-auto py-4 px-2 md:px-8 text-left scroll-smooth items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...COSPLAY_CATEGORIES, ...COSPLAY_CATEGORIES, ...COSPLAY_CATEGORIES, ...COSPLAY_CATEGORIES].map((category, index) => (
              <div key={`${category.id}-${index}`} className="w-[85vw] max-w-[320px] shrink-0 flex flex-col">
                <CosplayCard category={category} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Sympla (Compra de Ingresso) */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl max-w-xl mx-auto">
          <div className="text-left">
            <h4 className="font-heading font-black text-sm uppercase text-brasil-yellow">Ingressos para Cosplayers</h4>
            <p className="text-xs text-white/70 mt-1">Cosplayers inscritos no concurso têm entrada gratuita garantida pela lista. Demais cosplayers caracterizados pagam apenas meia-entrada!</p>
          </div>
          <a
            href={EVENT_INFO.symplaUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-japan-red hover:bg-[#A30026] text-white font-display text-xs py-3 px-6 rounded-xl border border-black uppercase transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Ticket className="w-4 h-4 fill-white" />
            Comprar no Sympla
          </a>
        </div>

      </div>
    </section>
  );
}
