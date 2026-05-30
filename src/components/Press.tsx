import React, { useState } from 'react';
import { Mail, FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';

export default function Press() {
  const [emailInput, setEmailInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setError('Por favor, insira um e-mail de imprensa válido.');
      return;
    }
    setError(null);
    setSuccess(true);
  };

  return (
    <section id="imprensa" className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b-4 border-slate-950 overflow-hidden">
      {/* Decorative Traditional Japanese Pattern Overlay */}
      <div className="absolute inset-0 bg-halftone opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-white/20 shadow-sm text-sm uppercase tracking-wider inline-block">
            Área de Imprensa
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-white mt-4 tracking-tight uppercase">
            CREDENCIAMENTO & IMPRENSA
          </h2>
          <p className="text-slate-350 mt-2 font-heading font-semibold text-base md:text-lg max-w-2xl mx-auto">
            Seja bem-vindo ao canal oficial de comunicação do Brasil Mostra Japão 2026. Aqui você encontra nosso Press Kit e solicita credenciamento de imprensa.
          </p>
          <div className="w-24 h-2.5 bg-brasil-yellow mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left Column: Info & Download Press Kit */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-display text-brasil-yellow uppercase">Press Kit Oficial 2026</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Acesse releases oficiais, fotos em alta resolução do Museu Nacional da República, logomarcas oficiais do festival (em vetor e PNG) e o edital comemorativo dos 130 anos de amizade Brasil-Japão.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                <li className="flex items-center gap-2">✔ Release Oficial de Abertura (.pdf)</li>
                <li className="flex items-center gap-2">✔ Fotos Autorizadas para Divulgação (.zip)</li>
                <li className="flex items-center gap-2 flex-wrap">
                  <span>✔ Logos Oficiais:</span>
                  <a href="/logos/logoBMJ.png" download="logoBMJ.png" className="text-brasil-yellow hover:underline inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                    BMJ2026 (.png) <Download className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Press Kit em preparação. Estará disponível em breve!'); }}
              className="inline-flex items-center justify-center gap-2 w-full bg-brasil-yellow hover:bg-[#FFE94F]/85 text-slate-950 font-display text-base py-3 px-5 border-2 border-black cursor-pointer -skew-x-6 hover:skew-x-0 transition-all uppercase tracking-wider font-extrabold shadow-[4px_4px_0px_#000000]"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Baixar Press Kit Completo</span>
            </a>
          </div>

          {/* Right Column: Accreditation Form */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-display text-white uppercase">Solicitação de Credencial</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Jornalistas, criadores de conteúdo (mínimo 10k seguidores), fotógrafos e assessores de veículos de imprensa podem solicitar credenciamento para cobertura do evento de 17 a 19 de Julho de 2026.
              </p>
              <p className="text-xs text-brasil-yellow font-mono">
                📅 Período de solicitações: 01 de Junho até 30 de Junho de 2026.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <input
                  type="email"
                  disabled
                  placeholder="E-mail profissional / do canal..."
                  className="w-full p-3 bg-slate-950/40 border border-slate-800 rounded-xl font-heading text-sm text-center text-gray-500 cursor-not-allowed select-none opacity-50"
                />
              </div>

              <button
                disabled
                className="w-full bg-gray-750 text-gray-450 font-display text-base py-3 rounded-xl border border-gray-800 uppercase cursor-not-allowed text-center font-extrabold opacity-50"
              >
                Registrar Interesse
              </button>
              
              <p className="text-xs text-center text-gray-400 font-sans italic mt-2 animate-pulse">
                ⚠️ Formulário disponível em breve!
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
