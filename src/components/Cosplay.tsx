import React from 'react';
import { EVENT_INFO } from '../data';
import { Ticket, FileText, ExternalLink } from 'lucide-react';

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
    title: "Cosplay Up",
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
  }
];

const CosplayCard: React.FC<{ category: CosplayCategory }> = ({ category }) => {
  return (
    <article className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.01] hover:border-brasil-yellow/50 transition-all duration-300 flex flex-col h-full">
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
          <p className="text-xs text-white/80 leading-relaxed text-justify">
            {category.summary}
          </p>
          <div className="pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Premiação:</h4>
            <ul className="space-y-1.5">
              {category.prizes.map((prize, idx) => (
                <li key={idx} className="text-xs text-white/70 flex items-start gap-1">
                  <span className="text-brasil-yellow shrink-0 mt-0.5">•</span>
                  <span>{prize}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <a
            href="/edital_BRASIL_MOSTRA_JAPAO_1.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/10 uppercase tracking-wider"
          >
            <FileText className="w-4 h-4" />
            Baixar Edital
          </a>
          <a
            href="https://forms.gle/pjdUZ3mpq7bebe6K7"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-brasil-blue hover:bg-[#1E3A8A] text-white text-[11px] font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-900 shadow-md uppercase tracking-wider"
          >
            <ExternalLink className="w-4 h-4" />
            Formulário de Inscrição
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Cosplay() {
  const isDedicatedPage = typeof window !== 'undefined' && (window.location.pathname === '/cosplay' || window.location.pathname === '/desfile');

  return (
    <section 
      id="cosplay" 
      className={`relative ${isDedicatedPage ? 'pt-40 md:pt-48 pb-20' : 'py-20'} px-4 md:px-8 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden border-b-4 border-slate-950`}
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

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12 text-left">
          {COSPLAY_CATEGORIES.map((category) => (
            <CosplayCard key={category.id} category={category} />
          ))}
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
