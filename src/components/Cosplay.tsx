import React from 'react';

// Card component for each cosplay category
function CosplayCard({ title }: { title: string }) {
  return (
    <article className="bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm text-white/80 mb-4">Concurso Cosplay – {title} – Sábado & Domingo</p>
      <button
        disabled
        className="bg-gray-600 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded opacity-60 cursor-not-allowed"
      >
        Inscrições (em breve)
      </button>
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
          {['Kids', 'Start', 'Up', 'Ghibli'].map((cat) => (
            <CosplayCard key={cat} title={cat} />
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
