import React from 'react';

// Card component for each cosplay category
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
            Concurso Cosplay – {title} – Sábado & Domingo. Prepare seu melhor traje para desfilar no palco principal!
          </p>
        </div>
        
        <button
          disabled
          className="w-full bg-white/10 text-white/50 border border-white/10 font-medium py-2.5 px-4 rounded-xl opacity-60 cursor-not-allowed text-xs transition"
        >
          Inscrições (em breve)
        </button>
      </div>
    </article>
  );
}

export default function Cosplay() {
  return (
    <section id="cosplay" className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Concurso Cosplay</h2>
        <p className="text-center text-white/80 mb-8">
          Sexta‑feira: Desfile Cosplay com votação aberta ao público.<br />
          Sábado & Domingo: Concurso Cosplay nas modalidades Kids, Start, Up, Ghibli.<br />
          Abertura do edital: 17 de junho.
        </p>
        {/* Desfile Section */}
        <div id="desfile" className="mb-12 text-center">
          <button
            disabled
            className="bg-gray-600 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded opacity-60 cursor-not-allowed"
          >
            Votar no Desfile (em breve)
          </button>
        </div>
        {/* Concurso Cards */}
        <div id="concurso" className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { cat: 'Kids', img: '/cosplay/kids.png' },
            { cat: 'Start', img: '/cosplay/start.png' },
            { cat: 'Up', img: '/cosplay/up.png' },
            { cat: 'Ghibli', img: '/cosplay/ghibli.png' }
          ].map(({ cat, img }) => (
            <CosplayCard key={cat} title={cat} image={img} />
          ))}
        </div>
        {/* Inscrições / Edital */}
        <div id="inscricoes" className="mt-12 text-center">
          <button
            disabled
            className="bg-gray-600 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded opacity-60 cursor-not-allowed"
          >
            Edital (disponível em 17/06)
          </button>
        </div>
      </div>
    </section>
  );
}
