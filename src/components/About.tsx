import { Globe, Lightbulb, Pizza, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 bg-white z-0 pointer-events-none" />
      
      {/* Decorative Sakura/Comic Background Details */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-japan-red/5 rounded-full blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-brasil-green/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-brasil-yellow text-brasil-blue font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Estreitando Laços Culturais
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight drop-shadow-sm uppercase text-stroke-black">
            O QUE É O BRASIL MOSTRA JAPÃO?
          </h2>
          <div className="w-24 h-2.5 bg-japan-red mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Narrative & Image / Splinters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-800 flex items-center gap-3">
              <span className="text-3xl">🎌</span> 130 Anos de Amizade e Integração
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg text-justify">
              O evento <strong>Brasil Mostra Japão (BMJ)</strong> celebra um marco monumental: os <strong>130 anos de relações diplomáticas</strong> e amizade profunda entre o Brasil e o Japão. Desde a chegada pioneira do navio <em>Kasato Maru em 1908</em>, nossos países traçaram um caminho inestimável de intercâmbio econômico, respeito mútuo e fusão social de riquezas incomparáveis.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg text-justify">
              Este festival condecora e une o melhor de dois mundos vibrantes. De um lado, a disciplina secular, os templos calmos e a explosiva <strong>cultura pop oriental</strong> (animes consagrados, mangás tocantes, heróis de Tokusatsu nostálgicos e as sublimes sinfonias do Studio Ghibli). Do outro, a energia contagiante, a acolhida calorosa e a criatividade pulsante do povo brasileiro.
            </p>
            <div className="p-5 bg-gradient-to-r from-brasil-yellow/10 to-japan-red/10 rounded-2xl border-2 border-slate-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 text-6xl opacity-10 font-display select-none">BMJ</div>
              <p className="text-slate-800 font-medium italic relative z-10 leading-relaxed">
                "Uma jornada mágica de Brasília ao coração de Tóquio, idealizado para emocionar os nostálgicos dos anos 80/90 e deslumbrar a nova geração otaku!"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Comic Box Style Collage */}
            <div className="relative z-10 bg-gradient-to-tr from-brasil-blue to-japan-red p-3 rounded-3xl border-3 border-slate-900 shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
              <img 
                src="/about/about.jpg" 
                alt="Liberdade São Paulo & Japan Aesthetics" 
                className="rounded-2xl w-full h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-5 left-5 bg-slate-900 text-white rounded-xl py-2 px-4 shadow-md font-heading font-bold text-sm border border-slate-700">
                🎌 Liberdade-SP / Intercâmbio Cultural
              </div>
            </div>

            {/* Decorative background shapes mimicking comic speech speedlines */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brasil-yellow/20 rounded-xl rotate-12 -z-0 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-japan-red/20 rounded-full rotate-45 -z-0 pointer-events-none" />
          </div>

        </div>

        {/* Core Value Cards / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-900 shadow-sm comic-shadow-hover hover:border-japan-red transition-all group">
            <div className="w-14 h-14 bg-japan-red text-white flex items-center justify-center rounded-xl border-2 border-slate-900 mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-heading font-extrabold text-slate-800 mb-3 group-hover:text-japan-red transition-colors">
              Maior Comunidade Nipo-Brasileira
            </h4>
            <p className="text-slate-600 leading-relaxed">
              O Brasil abriga a maior população de descendentes de japoneses fora do Japão, somando mais de <strong>2 milhões de pessoas</strong>. Uma história viva que moldou nossa culinária, artes e agricultura.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-400">
              KASATO MARU Desde 1908
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-900 shadow-sm comic-shadow-hover hover:border-brasil-green transition-all group">
            <div className="w-14 h-14 bg-brasil-green text-white flex items-center justify-center rounded-xl border-2 border-slate-900 mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-heading font-extrabold text-slate-800 mb-3 group-hover:text-brasil-green transition-colors">
              Cultura Pop + Tradição
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Equilíbrio harmônico entre o respeito às tradições ancestrais — como Odori, Taikô e Ikebana — e o fascínio contemporâneo pelos Animes, Mangás, Cosplays e Lutas Retro.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-400">
              TRADIÇÃO & GERAÇÃO GEEK
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-900 shadow-sm comic-shadow-hover hover:border-brasil-blue transition-all group">
            <div className="w-14 h-14 bg-brasil-blue text-white flex items-center justify-center rounded-xl border-2 border-slate-900 mb-6 group-hover:scale-110 transition-transform">
              <Pizza className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-heading font-extrabold text-slate-800 mb-3 group-hover:text-brasil-blue transition-colors">
              Arte, Cinema & Sabores
            </h4>
            <p className="text-slate-600 leading-relaxed">
              O festival conta com mostras culinárias regadas a sushis frescos, guiozas quentes, exposições de colecionadores autorizados de metal heroes e projeções em telão monumental do Cine BMJ.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-400">
              EXPERIÊNCIAS IMERSIVAS
            </div>
          </div>

        </div>

        {/* Historical highlight sticker */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 font-mono text-sm uppercase tracking-wider">
            Idealização Oficial: <span className="font-bold text-slate-800">{`Edgilson Ferreira dos Santos`}</span> | Brasília - 2026 🇧🇷🎌🇯🇵
          </p>
        </div>

      </div>
    </section>
  );
}
