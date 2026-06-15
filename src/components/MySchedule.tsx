import { Calendar, Trash2, ShieldCheck, Download, Sparkles, Smile, User, Mail, Phone, Lock } from 'lucide-react';
import { ScheduleItem, Attraction } from '../types';
import { SCHEDULE_ITEMS, ATRACOES_ESPECIAIS, EVENT_INFO } from '../data';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MyScheduleProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onOpenTickets: () => void;
}

export default function MySchedule({ favoriteIds, onToggleFavorite, onOpenTickets }: MyScheduleProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // We look through SCHEDULE_ITEMS and ATRACOES_ESPECIAIS
  const bookmarkedSchedules = SCHEDULE_ITEMS.filter((item) => favoriteIds.includes(item.id));
  const bookmarkedAttractions = ATRACOES_ESPECIAIS.filter((item) => favoriteIds.includes(item.id));

  const totalFavorites = bookmarkedSchedules.length + bookmarkedAttractions.length;

  const handleSimulateDownload = async () => {
    if (!nome || !telefone || !email || !senha) {
      alert("Por favor, preencha todos os campos do formulário para gerar o cronograma.");
      return;
    }

    setDownloadSuccess(true);
    
    // Gerar JSON local (Preferências do usuário)
    const preferencesData = {
      nome,
      telefone,
      email,
      senha,
      timestamp: new Date().toISOString(),
      atracoesSelecionadas: bookmarkedAttractions.map(a => a.title),
      programacaoSelecionada: bookmarkedSchedules.map(s => `${s.day} ${s.time} - ${s.title}`)
    };
    const blob = new Blob([JSON.stringify(preferencesData, null, 2)], { type: "application/json" });
    const jsonUrl = URL.createObjectURL(blob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = 'preferenciausuario.json';
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);

    // Gerar PDF do Cronograma com html2canvas e jsPDF
    if (printRef.current) {
      try {
        const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cronograma-${nome.replace(/\\s+/g, '-').toLowerCase()}.pdf`);
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
      }
    }

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <section id="meu-cronograma" className="relative py-20 px-4 md:px-8 bg-sky-blue/10 overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-japan-red text-white font-heading font-extrabold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm text-sm uppercase tracking-wider inline-block animate-pulse">
            Sua Experiência Customizada
          </span>
          <h2 className="text-5xl md:text-6xl font-display text-slate-400 mt-4 tracking-tight uppercase text-stroke-black">
            MEU CRONOGRAMA BMJ
          </h2>
          <p className="text-slate-600 mt-2 font-heading font-semibold text-lg">
            Guarde suas atrações preferidas clicando no ícone de estrela ⭐ e crie seu cronograma perfeito para os 3 dias!
          </p>
          <div className="w-24 h-2.5 bg-brasil-green mx-auto mt-4 rounded-full border border-slate-900" />
        </div>

        {totalFavorites === 0 ? (
          /* Empty State */
          <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl border-3 border-slate-900 comic-shadow text-center space-y-6">
            <div className="w-20 h-20 bg-brasil-yellow rounded-full border-2 border-slate-900 flex items-center justify-center mx-auto animate-bounce">
              <Calendar className="w-10 h-10 text-brasil-blue" />
            </div>
            <h3 className="text-2xl font-heading font-black text-slate-800">
              NENHUMA ATRAÇÃO SALVA
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Explore a seção de <strong>Programação Completa</strong> e <strong>Atrações Especiais</strong>, e clique na estrela do lado direito de cada cartão para salvá-los aqui no seu cronograma!
            </p>
            <div className="inline-flex gap-3 text-sm text-japan-red font-mono font-bold uppercase bg-japan-red/10 px-4 py-2 rounded-xl">
              <span>🔥 Shows</span>
              <span>•</span>
              <span>🎬 Cinema Ghibli</span>
              <span>•</span>
              <span>🎭 Cosplay</span>
            </div>
          </div>
        ) : (
          /* Populated State with Pass & Scheduler Card */
          <div ref={printRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-sky-blue/10 p-2 md:p-6 rounded-3xl">
            
            {/* Passenger Pass Credential Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border-3 border-slate-900 comic-shadow overflow-hidden flex flex-col justify-between">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-japan-red to-pop-orange p-5 text-white border-b-3 border-slate-900 relative">
                <div className="absolute top-2 right-2 font-display text-xl text-brasil-yellow tracking-widest opacity-80 rotate-12">
                  VIP CREW
                </div>
                <h3 className="font-display text-3xl tracking-wide uppercase text-stroke-black">
                  MEU CRONOGRAMA
                </h3>
                <p className="text-xs font-mono tracking-widest text-white/90">
                  ESTRELA GUIA VISITANTE
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6 flex-1 bg-comic-strip">
                <div className="text-center space-y-2">
                  <div className="w-24 h-24 bg-gradient-to-tr from-brasil-green to-brasil-yellow rounded-full mx-auto border-2 border-slate-900 flex items-center justify-center text-4xl select-none shadow-md">
                    🦊
                  </div>
                  <h4 className="font-heading font-black text-slate-800 text-lg uppercase mt-2 break-words">
                    {nome || 'Visitante Oficial'}
                  </h4>
                  <div className="inline-block px-3 py-1 bg-black text-brasil-yellow font-mono text-xs rounded-md">
                    RESERVADO: {totalFavorites} ATRAÇÕES
                  </div>
                </div>

                {/* Registration Form / User Details */}
                <div className="p-4 bg-slate-100 rounded-2xl border-2 border-slate-900 space-y-3 relative overflow-hidden">
                  <span className="absolute top-1 right-2 font-mono text-[9px] text-slate-400">DADOS DO CRONOGRAMA</span>
                  
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Nome Completo" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-heading text-slate-800 focus:outline-none focus:border-japan-red"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <input 
                        type="tel" 
                        placeholder="Telefone" 
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-heading text-slate-800 focus:outline-none focus:border-japan-red"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-heading text-slate-800 focus:outline-none focus:border-japan-red"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <input 
                        type="password" 
                        placeholder="Sua Senha" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-heading text-slate-800 focus:outline-none focus:border-japan-red"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-center font-mono text-slate-500 mt-2">
                    Preencha os dados para baixar seu PDF e salvar as preferências locais.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>STATUS ACESSO:</span>
                    <span className="text-brasil-green font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> PRONTO PARA COMPRAR
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>DATAS SELECIONADAS:</span>
                    <span className="font-bold text-slate-700">17-19 JULHO 2026</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 bg-slate-50 border-t-2 border-slate-900 space-y-3">
                <button 
                  onClick={handleSimulateDownload}
                  className="w-full flex items-center justify-center gap-2 bg-brasil-yellow text-slate-900 font-display text-lg py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
                >
                  <Download className="w-5 h-5" />
                  {downloadSuccess ? "DOWNLOAD CONCLUÍDO! 📥" : "GERAR CRONOGRAMA (PDF E JSON)"}
                </button>
                
                {downloadSuccess && (
                  <p className="text-xs text-center text-brasil-green-dark font-heading font-extrabold animate-bounce">
                    🎉 PDF gerado com sucesso! Salve suas fotos e confira no Sympla!
                  </p>
                )}

                <a 
                  href={EVENT_INFO.symplaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-japan-red text-white font-display text-lg py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
                >
                  <Sparkles className="w-5 h-5" />
                  Compra pelo Sympla Ofic
                </a>
              </div>

            </div>

            {/* Custom Agenda Schedule List */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              
              <div className="bg-white p-6 md:p-8 rounded-3xl border-3 border-slate-900 comic-shadow flex-1">
                <h3 className="text-3xl font-display text-slate-900 border-b-2 border-slate-200 pb-3 mb-6 flex items-center gap-3">
                  💡 SUAS ATRAÇÕES MUGEN PERFEITAS
                </h3>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  
                  {/* Favorited Attractions Group */}
                  {bookmarkedAttractions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        Exposições e Tendas Favoritadas ({bookmarkedAttractions.length})
                      </h4>
                      {bookmarkedAttractions.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border-2 border-slate-900 relative group"
                        >
                          <div className="text-2xl select-none bg-slate-200 w-10 h-10 flex items-center justify-center rounded-lg border border-slate-900">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-heading font-black text-slate-800 text-sm md:text-base leading-tight">
                              {item.title}
                            </h5>
                            <p className="text-xs text-slate-500 font-medium">
                              Atração Especial do Festival • {item.category.toUpperCase()}
                            </p>
                          </div>
                          <button 
                            onClick={() => onToggleFavorite(item.id)}
                            className="p-1 px-2.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 font-mono"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4 inline" /> Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Favorited Schedules Hourly group */}
                  {bookmarkedSchedules.length > 0 && (
                    <div className="space-y-3 pt-4">
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        Linha do Tempo de Shows & Cinema ({bookmarkedSchedules.length})
                      </h4>
                      {bookmarkedSchedules.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border-2 border-slate-900 relative group"
                        >
                          <div className="text-xs text-center p-1 bg-japan-red text-white rounded font-mono font-bold min-w-[55px]">
                            {item.day.toUpperCase()} {item.time}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-heading font-black text-slate-800 text-sm md:text-base leading-tight">
                              {item.title}
                            </h5>
                            <p className="text-xs text-slate-500">
                              🕒 {item.time} • Categoria: {item.category}
                            </p>
                          </div>
                          <button 
                            onClick={() => onToggleFavorite(item.id)}
                            className="p-1 px-2.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 font-mono"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4 inline" /> Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                <div className="mt-8 p-4 bg-brasil-green/10 rounded-2xl border-2 border-brasil-green/40 flex items-center gap-3">
                  <div className="text-xl">🦊</div>
                  <p className="text-xs text-brasil-green-dark font-heading font-bold">
                    Ao chegar no Museu Nacional da República, apresente seu voucher do Sympla. Este cronograma personalizado serve para orientar seu acesso às ativações preferidas!
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
