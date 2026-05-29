import { MapPin, Bus, Car, Navigation, ShieldAlert, Accessibility, Calendar } from 'lucide-react';
import { EVENT_INFO } from '../data';

export default function Venue() {
  return (
    <section id="local" className="relative py-20 px-4 md:px-8 bg-white border-b-4 border-slate-900 overflow-hidden">
      
      {/* Absolute Decorative Layer */}
      <div className="absolute inset-0 bg-halftone opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-brasil-yellow text-brasil-blue font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Coração de Brasília
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            ONDE VAI ACONTECER?
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg max-w-xl mx-auto">
            O icônico Museu Nacional da República sediará este encontro de cores, sabores e nostalgias nipônicas.
          </p>
          <div className="w-24 h-2.5 bg-japan-red mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Double Column Map and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Map and Address Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Embedded Google Maps Container */}
            <div className="bg-white rounded-3xl border-3 border-slate-900 overflow-hidden comic-shadow h-96 relative">
              <iframe 
                title="Mapa do Museu Nacional da República de Brasília"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0689947834785!2d-47.8799898!3d-15.797274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b21665a39cb%3A0x6e9f54868de9ff43!2sMuseu%20Nacional%20da%20Rep%C3%BAblica!5e0!3m2!1spt-BR!2sbr!4v1700000000001" 
                className="w-full h-full border-none"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-slate-950 flex gap-4 items-center">
              <div className="w-12 h-12 bg-japan-red text-white flex items-center justify-center shrink-0 rounded-xl border border-slate-700 shadow-md">
                <MapPin className="w-6 h-6 text-brasil-yellow" />
              </div>
              <div className="space-y-1">
                <p className="font-heading font-black text-sm uppercase tracking-wider text-[#FFE94F]">Endereço Completo Ofic.</p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                  {EVENT_INFO.address}
                </p>
              </div>
            </div>

          </div>

          {/* Access Logistics Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-900 shadow-sm space-y-6">
              <h3 className="text-2xl font-heading font-black text-slate-800 border-b border-slate-200 pb-2">
                Como Chegar ao BMJ?
              </h3>

              {/* Metro / Bus */}
              <div className="flex gap-4 items-start">
                <div className="bg-brasil-blue p-2.5 text-white rounded-xl border border-slate-900 shrink-0">
                  <Bus className="w-5 h-5 text-brasil-yellow" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-slate-800 text-sm uppercase">Transporte Público (Recomendado)</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A apenas <strong>300 metros da Rodoviária do Plano Piloto</strong>. Você pode vir de metrô (Estação Central) ou por qualquer linha de ônibus central de Brasília. É prático e rápido!
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex gap-4 items-start">
                <div className="bg-brasil-green p-2.5 text-white rounded-xl border border-slate-900 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-slate-800 text-sm uppercase">Estacionamento</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Vagas públicas rotativas disponíveis no entorno do Museu e Setor Cultural Sul. Recomendamos chegar cedo nos dias de sábado e domingo.
                  </p>
                </div>
              </div>

              {/* Accessibility */}
              <div className="flex gap-4 items-start">
                <div className="bg-japan-red p-2.5 text-white rounded-xl border border-slate-900 shrink-0">
                  <Accessibility className="w-5 h-5 text-brasil-yellow" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-slate-800 text-sm uppercase">Acessibilidade Completa</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Complexo totalmente adaptado com rampas externas de acesso, banheiros públicos exclusivos amplos para cadeirantes e áreas dianteiras de visualização nos palcos.
                  </p>
                </div>
              </div>

            </div>

            {/* Structured specs block */}
            <div className="bg-[#FFE94F]/10 p-6 rounded-3xl border-2 border-brasil-yellow shadow-sm space-y-4">
              <h4 className="font-heading font-black text-slate-950 text-base flex items-center gap-2">
                ⛺ INFRAESTRUTURA MONUMENTAL DO FESTIVAL
              </h4>
              <ul className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 font-mono font-bold uppercase tracking-tight">
                <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                  <span>🎪 2 Tendas Arco (50m x 30m)</span>
                </li>
                <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                  <span>📺 Painéis LED 60m²</span>
                </li>
                <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                  <span>🍱 Praça Alimentação</span>
                </li>
                <li className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                  <span>🚻 Banheiros Químicos</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
