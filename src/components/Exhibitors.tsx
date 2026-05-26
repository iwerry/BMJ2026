import React, { useState } from 'react';
import { Search, Store, ArrowUpRight, HelpCircle, X, Check, ShieldCheck, Mail, Phone, User, Landmark } from 'lucide-react';
import { EXPOSITORES, EVENT_INFO } from '../data';

export default function Exhibitors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorCompany, setVendorCompany] = useState('');
  const [vendorCategory, setVendorCategory] = useState('geek-shop');
  const [appStage, setAppStage] = useState<'idle' | 'success'>('idle');
  const [modalError, setModalError] = useState<string | null>(null);

  const filteredExhibitors = EXPOSITORES.filter((exp) => {
    return exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           exp.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = () => {
    setVendorName('');
    setVendorEmail('');
    setVendorCompany('');
    setAppStage('idle');
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim() || !vendorEmail.trim() || !vendorCompany.trim()) {
      setModalError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setModalError(null);
    setAppStage('success');
  };

  return (
    <section id="expositores" className="relative py-20 px-4 md:px-8 bg-slate-50 border-b-4 border-slate-900 overflow-hidden">
      
      {/* Absolute Decorative Circles */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-japan-red/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block">
            Quem Faz o Evento
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-900 mt-4 tracking-tight uppercase text-stroke-black">
            EXPOSITORES CONFIRMADOS
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg max-w-2xl mx-auto">
            Conheça as marcas que estarão presentes trazendo o melhor da comida de rua, Action Figures, vestuário, livros e souvenirs exclusivos.
          </p>
          <div className="w-24 h-2.5 bg-brasil-green mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {/* Search Bar filter */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Pesquisar loja, estande ou categoria..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-900 rounded-xl bg-white text-sm font-sans focus:outline-none focus:border-japan-red transition-all"
            />
          </div>
        </div>

        {/* Real Exhibitors Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredExhibitors.map((exp) => (
            <div 
              key={exp.id}
              className={`bg-white p-6 rounded-2xl border-2 border-slate-900 transition-all duration-200 comic-shadow-sm flex flex-col justify-between items-center text-center group ${
                exp.isFeatured ? 'bg-gradient-to-b from-[#FFE94F]/10 to-white hover:border-japan-red' : 'hover:border-brasil-green'
              }`}
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform select-none">
                {exp.isFeatured ? '👑' : '🛍️'}
              </div>

              <div>
                <h4 className="font-heading font-black text-slate-900 text-sm md:text-base leading-tight">
                  {exp.name}
                </h4>
                <p className="text-slate-500 font-mono text-[10px] uppercase mt-1 leading-normal">
                  {exp.category}
                </p>
              </div>

              {exp.isFeatured && (
                <span className="mt-3 bg-japan-red text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded border border-slate-900 uppercase">
                  VIP BRAND
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Suggestive Application Form with action */}
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto comic-shadow">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-display text-slate-900 uppercase">QUER EXPÔR DENTRO DA FEIRA?</h3>
            <p className="text-sm text-slate-650 max-w-2xl leading-relaxed">
              Temos espaços limitados adaptados para stands geeks, fast-food, food trucks orientais, artigos de artesanato tradicional de sakura e palestras institucionais. Entre em contato por formulário oficial e garanta a visibilidade da sua marca para mais de 10 mil espectadores!
            </p>
          </div>
          
          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={handleOpenModal}
              className="px-6 py-4 bg-[#111111] hover:bg-slate-800 text-[#FFE94F] font-display text-lg tracking-wider rounded-xl border border-slate-950 uppercase cursor-pointer text-center"
            >
              Simular Estande
            </button>
            <a
              href={EVENT_INFO.exhibitorFormUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-center font-heading font-black text-japan-red flex items-center justify-center gap-1 hover:underline"
            >
              Formulário Google <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Simulated Exhibitor Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          
          <div className="bg-white text-slate-950 max-w-lg w-full rounded-3xl border-4 border-slate-950 p-6 relative overflow-hidden comic-shadow flex flex-col gap-4">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-100 rounded-lg"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {appStage === 'idle' ? (
              <form onSubmit={handleSimulateSubmit} className="space-y-4">
                
                <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                  <span className="bg-brasil-green text-white text-xs font-bold px-2 py-0.5 rounded">EXPOSITOR CADASTRO</span>
                  <p className="font-heading font-black text-slate-800 text-sm">Inscreva seu Estande no BMJ 2026</p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="company-name" className="block text-xs font-mono text-slate-500 uppercase">Nome Comercial / Loja</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="company-name"
                      type="text"
                      required
                      placeholder="Ex: Artes Gallery Jr..."
                      value={vendorCompany}
                      onChange={(e) => setVendorCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-slate-900 rounded-xl font-heading focus:outline-none focus:border-japan-red text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="rep-name" className="block text-xs font-mono text-slate-500 uppercase">Nome do Representante</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="rep-name"
                      type="text"
                      required
                      placeholder="Ex: Edgilson dos Santos..."
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-slate-900 rounded-xl font-heading focus:outline-none focus:border-japan-red text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="vendor-email" className="block text-xs font-mono text-slate-500 uppercase">E-mail para Contato</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="vendor-email"
                      type="email"
                      required
                      placeholder="Ex: contato@saci.com..."
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-slate-900 rounded-xl font-heading focus:outline-none focus:border-japan-red text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="vendor-cat" className="block text-xs font-mono text-slate-500 uppercase">Segmento de Venda</label>
                  <select
                    id="vendor-cat"
                    value={vendorCategory}
                    onChange={(e) => setVendorCategory(e.target.value)}
                    className="w-full p-2.5 border-2 border-slate-900 rounded-xl font-heading focus:outline-none bg-white text-sm"
                  >
                    <option value="geek-shop">🛍️ Livraria / Mangás / Shirts Geeks</option>
                    <option value="oriental-food">🍱 Alimentação Oriental / Bento Boxes</option>
                    <option value="traditional-art">🎨 Arte Sakura Tradicional / Shodo</option>
                    <option value="games">🎮 Games Retro / Boardgames e RPG</option>
                  </select>
                </div>

                {modalError && (
                  <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-heading font-black">
                    ⚠️ {modalError}
                  </div>
                )}

                <div className="p-3 bg-red-50 rounded-xl text-xs text-red-700">
                  ⚠️ Preencher esta simulação cadastra temporariamente seu nome no simulador do site. Registre-se também no Google Forms oficial para fins contratuais de Brasília!
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#111111] hover:bg-slate-800 text-white py-3 border-2 border-slate-950 font-display text-lg uppercase rounded-2xl comic-shadow-sm transition-all cursor-pointer"
                >
                  Registrar Estande Simulado
                </button>

              </form>
            ) : (
              /* Success Stage */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-[#009B3A] text-white rounded-full flex items-center justify-center mx-auto border-2 border-slate-950 shadow-md animate-bounce">
                  <ShieldCheck className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-3xl uppercase text-slate-900">FORMULÁRIO SALVO!</h3>
                  <p className="text-slate-650 font-heading text-sm px-4">
                    Olá, <strong>{vendorName}</strong>. Recebemos seu interesse na marca <strong>{vendorCompany}</strong> para as frentes de {vendorCategory}. Entraremos em contato!
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs lines-normal">
                  <p className="font-bold text-slate-700 mb-1">Apenas um passo restante:</p>
                  Preencha os dados oficiais no formulário oficial do Google Forms de Expositores do produtor <strong>Edgilson Ferreira dos Santos</strong> clicando no botão abaixo.
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-3 bg-slate-100 font-mono text-xs uppercase font-extrabold rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    Fechar
                  </button>
                  <a
                    href={EVENT_INFO.exhibitorFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 bg-[#BC002D] text-white font-display text-sm tracking-wide uppercase rounded-xl border-2 border-slate-950 comic-shadow-sm text-center flex items-center justify-center"
                  >
                    Google Forms Ofic.
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
