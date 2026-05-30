import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, Instagram, Youtube, Facebook, Send } from 'lucide-react';
import { EVENT_INFO } from '../data';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError("Por favor, digite um e-mail válido.");
      return;
    }
    setEmailError(null);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 bg-gradient-to-r from-japan-red to-pop-orange text-white overflow-hidden border-b-4 border-slate-950">
      
      {/* Halftone dots overlay */}
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column titles */}
        <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
          <span className="bg-brasil-yellow text-slate-950 font-mono text-[9px] font-bold px-3 py-1 rounded uppercase tracking-wider inline-block">
            Mantenha-se Atualizado
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white tracking-wider leading-none text-stroke-black">
            FIQUE POR DENTRO!
          </h2>
          <p className="text-slate-100 text-sm md:text-base leading-relaxed font-sans max-w-md">
            Cadastre-se e receba novidades exclusivas, cronogramas de cinema Ghibli, lotes Relâmpagos e fotos exclusivas do Brasil Mostra Japão 2026.
          </p>
        </div>

        {/* Right column Form box */}
        <div className="lg:col-span-6 bg-white text-slate-950 p-6 md:p-8 rounded-3xl border-3 border-slate-950 comic-shadow">
          
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-brasil-green text-white rounded-full flex items-center justify-center mx-auto border-2 border-slate-950 shadow-sm animate-bounce">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-slate-900 uppercase">E-MAIL CADASTRADO!</h3>
              <p className="text-xs text-slate-500 font-heading">
                Verifique sua caixa de entrada para receber o cronograma resumido oficial do produtor <strong>Gs Produções</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="newsletter-email" className="block text-xs font-mono text-slate-400 uppercase tracking-widest pl-1">Seu melhor E-mail</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      id="newsletter-email"
                      type="email" 
                      required
                      placeholder="Ex: visitante@amigo.com..." 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border-2 border-slate-900 rounded-xl bg-slate-50 font-heading focus:outline-none focus:border-japan-red text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#111111] hover:bg-slate-800 text-white font-display text-base py-3 px-6 rounded-xl border border-slate-950 uppercase cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CADASTRAR</span>
                    <Send className="w-4 h-4 text-brasil-yellow" />
                  </button>
                </div>
              </div>

              {emailError && (
                <p className="text-xs text-japan-red font-heading font-black">
                  ⚠️ {emailError}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-brasil-green shrink-0" />
                <span>Nós respeitamos sua privacidade. Seus dados estão 100% seguros.</span>
              </div>
            </form>
          )}

          {/* Social Icons inside Footer card */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400 uppercase font-black">Nossas Redes:</span>
            <div className="flex gap-2">
              <a 
                href={EVENT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 hover:bg-japan-red hover:text-white hover:border-japan-red transition-all cursor-pointer text-slate-650"
                title="Siga no Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 hover:bg-brasil-blue hover:text-white hover:border-brasil-blue transition-all cursor-pointer text-slate-650"
                title="Siga no Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
