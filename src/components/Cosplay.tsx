import React from 'react';
import { EVENT_INFO } from '../data';
import { Ticket } from 'lucide-react';

function CosplayCard({ title, image }: { title: string; image: string }) {
  return (
    <article className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-brasil-yellow/50 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Cover Image */}
      <div className="relative h-44 overflow-hidden border-b border-white/15">
        <img 
          src={image} 
          alt={`Concurso Cosplay ${title}`} 
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-brasil-yellow font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
          {title}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Concurso Cosplay – Categoria {title} – Sábado & Domingo. Prepare seu melhor traje para desfilar no palco principal!
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Cosplay() {
  return (
    <section id="cosplay" className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden border-b-4 border-slate-950">
      <div className="max-w-6xl mx-auto text-center">
        <span className="bg-japan-red text-white font-mono text-[10px] font-bold py-1.5 px-4 rounded-full border border-white/20 uppercase tracking-widest inline-block mb-4">
          Concurso Oficial
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-stroke-white uppercase tracking-tight mb-4">
          CONCURSO COSPLAY BMJ
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-white/80 mb-10 leading-relaxed">
          Prepare-se para o maior desfile e concurso cosplay do Planalto Central! As finais acontecerão no palco principal durante o fim de semana, com premiações e jurados especiais.
        </p>

        {/* Categories Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12 text-left">
          {[
            { cat: 'Kids', img: '/cosplay/kids.png' },
            { cat: 'Start', img: '/cosplay/start.png' },
            { cat: 'Up', img: '/cosplay/up.png' },
            { cat: 'Ghibli', img: '/cosplay/ghibli.png' }
          ].map(({ cat, img }) => (
            <CosplayCard key={cat} title={cat} image={img} />
          ))}
        </div>

        {/* CTA to Sympla (Compra de Ingresso) */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl max-w-xl mx-auto">
          <div className="text-left">
            <h4 className="font-heading font-black text-sm uppercase text-brasil-yellow">Adquira seu Ingresso</h4>
            <p className="text-xs text-white/70 mt-1">É necessário ter o ingresso de acesso para participar do concurso cosplay no Museu Nacional.</p>
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
