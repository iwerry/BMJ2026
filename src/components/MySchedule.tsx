import { Calendar, Trash2, ShieldCheck, Download, Sparkles, User, Mail, Phone, Lock, LogIn, UserPlus, LogOut, Save } from 'lucide-react';
import { SCHEDULE_ITEMS, ATRACOES_ESPECIAIS, EVENT_INFO } from '../data';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// =============================================
// LOCAL DATABASE (localStorage) — preferenciasusuarios
// =============================================
const USERS_DB_KEY = 'bmj_preferenciasusuarios';
const CURRENT_USER_KEY = 'bmj_current_user';

interface UserRecord {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  favoriteIds: string[];
  createdAt: string;
  updatedAt: string;
}

function getAllUsers(): UserRecord[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAllUsers(users: UserRecord[]) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users, null, 2));
}

function getLoggedInEmail(): string | null {
  try {
    const data = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    return data?.email || null;
  } catch {
    return null;
  }
}

function setLoggedInEmail(email: string | null) {
  if (email) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email }));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// =============================================
// COMPONENT
// =============================================
interface MyScheduleProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onRestoreFavorites: (ids: string[]) => void;
  onOpenTickets: () => void;
}

export default function MySchedule({ favoriteIds, onToggleFavorite, onRestoreFavorites, onOpenTickets }: MyScheduleProps) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState<UserRecord[]>([]);

  // Form fields
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // UI state
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  // Derived data
  const bookmarkedSchedules = SCHEDULE_ITEMS.filter((item) => favoriteIds.includes(item.id));
  const bookmarkedAttractions = ATRACOES_ESPECIAIS.filter((item) => favoriteIds.includes(item.id));
  const totalFavorites = bookmarkedSchedules.length + bookmarkedAttractions.length;

  const loadAdminUsers = async () => {
    try {
      const res = await fetch('/api/admin/users?secret=bmj2026');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.users) {
          setAdminUsers(data.users);
          return;
        }
      }
    } catch (err) {
      console.warn('Erro ao carregar usuários do servidor, usando local:', err);
    }
    setAdminUsers(getAllUsers());
  };

  // Auto-login on mount
  useEffect(() => {
    const savedEmail = getLoggedInEmail();
    if (savedEmail) {
      if (savedEmail === 'admin@brasilmostrajapao.com.br') {
        setIsLoggedIn(true);
        setIsAdmin(true);
        loadAdminUsers();
        return;
      }

      const users = getAllUsers();
      const user = users.find((u) => u.email === savedEmail);
      if (user) {
        setNome(user.nome);
        setTelefone(user.telefone);
        setEmail(user.email);
        setSenha(user.senha);
        setIsLoggedIn(true);
        if (user.favoriteIds && user.favoriteIds.length > 0) {
          onRestoreFavorites(user.favoriteIds);
        }

        // Try to sync with server to fetch latest favorites
        fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, senha: user.senha })
        })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Server offline or invalid credentials');
        })
        .then((data) => {
          if (data.success && data.user) {
            const u = data.user;
            setNome(u.nome);
            setTelefone(u.telefone);
            if (u.favoriteIds) {
              onRestoreFavorites(u.favoriteIds);
            }
            const localUsers = getAllUsers().filter((lu) => lu.email !== u.email);
            localUsers.push(u);
            saveAllUsers(localUsers);
          }
        })
        .catch((err) => console.warn('Falha na sincronização inicial com servidor:', err));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auth Handlers ---
  const handleRegister = async () => {
    setFormError('');
    if (!nome || !telefone || !email || !senha) {
      setFormError('Preencha todos os campos para criar sua conta.');
      return;
    }

    try {
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email, senha, favoriteIds })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          const users = getAllUsers().filter((x) => x.email !== email);
          users.push(u);
          saveAllUsers(users);
          setLoggedInEmail(email);
          setIsLoggedIn(true);
          setFormSuccess('Conta criada com sucesso no servidor! 🎉');
          setTimeout(() => setFormSuccess(''), 4000);
          return;
        }
      }
    } catch (err) {
      console.warn('Erro ao registrar no servidor, tentando localmente:', err);
    }

    // Fallback Local
    const users = getAllUsers();
    if (users.find((u) => u.email === email)) {
      setFormError('Este email já está cadastrado. Use "Já Tenho Conta".');
      return;
    }
    const newUser: UserRecord = {
      nome,
      telefone,
      email,
      senha,
      favoriteIds: [...favoriteIds],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveAllUsers(users);
    setLoggedInEmail(email);
    setIsLoggedIn(true);
    setFormSuccess('Conta criada com sucesso (Modo Local)! 🎉');
    setTimeout(() => setFormSuccess(''), 4000);
  };

  const handleLogin = async () => {
    setFormError('');
    if (!email || !senha) {
      setFormError('Preencha email e senha.');
      return;
    }

    // Check Admin Login
    if (email === 'admin@brasilmostrajapao.com.br') {
      if (senha === 'bmj2026' || senha === 'bmj2026admin') {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setLoggedInEmail(email);
        loadAdminUsers();
        setFormSuccess('Bem-vindo, Administrador! 🎌');
        setTimeout(() => setFormSuccess(''), 4000);
        return;
      } else {
        setFormError('Senha de administrador incorreta.');
        return;
      }
    }

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          setNome(u.nome);
          setTelefone(u.telefone);
          setLoggedInEmail(u.email);
          setIsLoggedIn(true);
          if (u.favoriteIds && u.favoriteIds.length > 0) {
            onRestoreFavorites(u.favoriteIds);
          }
          const localUsers = getAllUsers().filter((x) => x.email !== email);
          localUsers.push(u);
          saveAllUsers(localUsers);

          setFormSuccess('Bem-vindo(a) de volta! 🎌');
          setTimeout(() => setFormSuccess(''), 4000);
          return;
        }
      } else if (res.status === 401) {
        setFormError('Email ou senha incorretos. Tente novamente.');
        return;
      }
    } catch (err) {
      console.warn('Erro ao conectar ao servidor para login, tentando localmente:', err);
    }

    // Fallback Local
    const users = getAllUsers();
    const user = users.find((u) => u.email === email && u.senha === senha);
    if (!user) {
      setFormError('Email ou senha incorretos (ou servidor indisponível). Tente novamente.');
      return;
    }
    setNome(user.nome);
    setTelefone(user.telefone);
    setLoggedInEmail(user.email);
    setIsLoggedIn(true);
    if (user.favoriteIds && user.favoriteIds.length > 0) {
      onRestoreFavorites(user.favoriteIds);
    }
    setFormSuccess('Bem-vindo(a) de volta (Modo Local)! 🎌');
    setTimeout(() => setFormSuccess(''), 4000);
  };

  const handleLogout = () => {
    setLoggedInEmail(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setAdminUsers([]);
    setNome('');
    setTelefone('');
    setEmail('');
    setSenha('');
    setFormError('');
    setFormSuccess('');
  };

  const handleSave = async () => {
    if (isAdmin) return; // Admins don't need to save their own preferences

    try {
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email, senha, favoriteIds })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          const users = getAllUsers().filter((x) => x.email !== email);
          users.push(u);
          saveAllUsers(users);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
          return;
        }
      }
    } catch (err) {
      console.warn('Erro ao salvar no servidor, tentando localmente:', err);
    }

    // Fallback Local
    const users = getAllUsers();
    const idx = users.findIndex((u) => u.email === email);
    if (idx >= 0) {
      users[idx] = {
        ...users[idx],
        nome,
        telefone,
        favoriteIds: [...favoriteIds],
        updatedAt: new Date().toISOString(),
      };
      saveAllUsers(users);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDownloadJSON = async () => {
    try {
      const secret = 'bmj2026';
      const url = `/api/admin/download-db?secret=${secret}`;
      const res = await fetch(url);
      if (res.ok) {
        window.open(url, '_blank');
        return;
      }
    } catch (err) {
      console.warn('Erro ao baixar JSON do servidor, exportando local:', err);
    }

    // Fallback: download client localStorage DB
    const users = getAllUsers();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'preferenciasusuarios.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadPDF = async () => {
    handleSave();
    setDownloadSuccess(true);

    if (pdfTemplateRef.current) {
      try {
        const canvas = await html2canvas(pdfTemplateRef.current, { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cronograma-${nome.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
      }
    }

    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // =============================================
  // RENDER
  // =============================================
  return (
    <section id="meu-cronograma" className="relative py-20 px-4 md:px-8 bg-sky-blue/10 overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
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
        </div>

        {/* Warning Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 bg-japan-red/10 border-3 border-japan-red text-japan-red rounded-3xl comic-shadow-sm flex items-center gap-4">
          <span className="text-4xl shrink-0">⚠️</span>
          <p className="font-heading font-black text-sm md:text-base leading-relaxed uppercase">
            ATENÇÃO: O sistema "Meu Cronograma" é uma ferramenta gratuita de planejamento e NÃO DÁ DIREITO À ENTRADA NO EVENTO. Você precisa adquirir seu ingresso diário ou combo de atrações diretamente no Sympla!
          </p>
        </div>

        {/* ============================================= */}
        {/* STATE 1: NOT LOGGED IN → Login/Register Card  */}
        {/* ============================================= */}
        {!isLoggedIn ? (
          <div className="max-w-lg mx-auto bg-white p-8 md:p-10 rounded-3xl border-3 border-slate-900 comic-shadow">
            {/* Toggle: Criar Conta / Já Tenho Conta */}
            <div className="flex rounded-xl border-2 border-slate-900 overflow-hidden mb-6">
              <button
                onClick={() => { setIsLoginMode(false); setFormError(''); }}
                className={`flex-1 py-3 font-display text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  !isLoginMode
                    ? 'bg-japan-red text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Criar Conta
              </button>
              <button
                onClick={() => { setIsLoginMode(true); setFormError(''); }}
                className={`flex-1 py-3 font-display text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isLoginMode
                    ? 'bg-japan-red text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <LogIn className="w-4 h-4" /> Já Tenho Conta
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {!isLoginMode && (
                <>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Nome Completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-heading text-slate-800 focus:outline-none focus:border-japan-red transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="tel"
                      placeholder="Telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-heading text-slate-800 focus:outline-none focus:border-japan-red transition-colors"
                    />
                  </div>
                </>
              )}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-heading text-slate-800 focus:outline-none focus:border-japan-red transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="password"
                  placeholder="Sua Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-sm font-heading text-slate-800 focus:outline-none focus:border-japan-red transition-colors"
                />
              </div>
            </div>

            {/* Feedback Messages */}
            {formError && (
              <p className="mt-4 text-center text-sm text-japan-red font-heading font-bold">
                ⚠️ {formError}
              </p>
            )}
            {formSuccess && (
              <p className="mt-4 text-center text-sm text-brasil-green font-heading font-bold">
                {formSuccess}
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={isLoginMode ? handleLogin : handleRegister}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-brasil-yellow text-slate-900 font-display text-lg py-3.5 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
            >
              {isLoginMode ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLoginMode ? 'ENTRAR NO MEU CRONOGRAMA' : 'CRIAR MINHA CONTA'}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500 font-mono">
              {isLoginMode
                ? 'Entre com seu email e senha para acessar seu cronograma salvo.'
                : 'Crie sua conta para salvar e baixar seu cronograma personalizado em PDF.'}
            </p>

            {/* Show current favorites count hint */}
            {totalFavorites > 0 && !isLoginMode && (
              <div className="mt-4 p-3 bg-brasil-yellow/20 rounded-xl border border-brasil-yellow text-center">
                <p className="text-xs font-heading font-bold text-slate-700">
                  ⭐ Você já tem <strong>{totalFavorites}</strong> atrações selecionadas! Crie sua conta para salvá-las.
                </p>
              </div>
            )}
          </div>

        ) : isAdmin ? (
          /* ============================================= */
          /* STATE 1.5: ADMIN MODE                         */
          /* ============================================= */
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-3xl border-3 border-slate-900 comic-shadow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-3 border-slate-900 pb-4 gap-4">
              <div>
                <h3 className="font-display text-3xl uppercase tracking-wider text-slate-800">
                  PAINEL ADMINISTRATIVO BMJ 🦊
                </h3>
                <p className="text-xs font-mono text-slate-500">Controle de preferências e banco de dados local</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-japan-red hover:bg-japan-red-dark text-white font-display text-xs py-2 px-4 rounded-lg border-2 border-slate-950 comic-shadow-sm active:scale-95 transition-all cursor-pointer font-bold"
              >
                <LogOut className="w-4 h-4" /> SAIR DO PAINEL
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-sky-blue/20 rounded-2xl border-2 border-slate-900 flex flex-col justify-between">
                <span className="text-xs font-mono text-slate-500">TOTAL CADASTRADOS</span>
                <span className="font-display text-4xl text-slate-950 mt-2">{adminUsers.length}</span>
                <p className="text-[11px] text-slate-500 mt-2">Visitantes que salvaram sua agenda.</p>
              </div>
              
              <div className="md:col-span-2 p-5 bg-slate-50 rounded-2xl border-2 border-slate-900 flex flex-col justify-between">
                <span className="text-xs font-mono text-slate-500">EXPORTAÇÃO BANCO DE DADOS (.JSON)</span>
                <div className="mt-4">
                  <button
                    onClick={handleDownloadJSON}
                    className="w-full flex items-center justify-center gap-2 bg-brasil-yellow text-slate-900 hover:bg-brasil-yellow-light font-display text-sm py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> BAIXAR PREFERENCIASUSUARIOS.JSON
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Baixe o banco de dados local contendo nome, e-mail, telefone, senha e favoritos de cada usuário.
                </p>
              </div>
            </div>

            <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-slate-50">
              <div className="bg-slate-900 text-white p-3 font-display text-xs uppercase tracking-wider">
                Lista de Visitantes Cadastrados
              </div>
              <div className="max-h-96 overflow-y-auto">
                {adminUsers.length === 0 ? (
                  <p className="p-6 text-center text-sm font-heading font-medium text-slate-500">
                    Nenhum visitante cadastrado no momento.
                  </p>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-200 border-b-2 border-slate-900 text-slate-700 font-heading font-black">
                        <th className="p-3">Nome</th>
                        <th className="p-3">Contato</th>
                        <th className="p-3">Favoritos (Qtd)</th>
                        <th className="p-3">Data Cadastro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {adminUsers.map((u, i) => (
                        <tr key={i} className="hover:bg-slate-100 font-heading">
                          <td className="p-3 font-bold text-slate-800">{u.nome}</td>
                          <td className="p-3">
                            <p>{u.email}</p>
                            <p className="text-[10px] text-slate-500">{u.telefone}</p>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-brasil-yellow rounded font-mono font-bold">
                              {u.favoriteIds ? u.favoriteIds.length : 0}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[10px] text-slate-500">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        ) : totalFavorites === 0 ? (
          /* ============================================= */
          /* STATE 2: LOGGED IN, NO FAVORITES              */
          /* ============================================= */
          <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl border-3 border-slate-900 comic-shadow text-center space-y-6">
            {/* Logged-in header bar */}
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-xs font-mono text-slate-400">Logado como:</p>
                <p className="text-sm font-heading font-bold text-slate-700">{nome}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-japan-red hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
              >
                <LogOut className="w-3 h-3" /> Sair
              </button>
            </div>

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

        /* ============================================= */
        /* STATE 3: LOGGED IN + HAS FAVORITES            */
        /* ============================================= */
        ) : (
          <div ref={printRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-sky-blue/10 p-2 md:p-6 rounded-3xl">

            {/* ---- LEFT: User Profile + Actions Card ---- */}
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

                {/* User Info Display */}
                <div className="p-4 bg-slate-100 rounded-2xl border-2 border-slate-900 space-y-2 relative overflow-hidden">
                  <span className="absolute top-1 right-2 font-mono text-[9px] text-slate-400">DADOS DO CRONOGRAMA</span>
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-heading font-semibold">{nome}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="font-heading font-semibold">{telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="font-heading font-semibold">{email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>STATUS ACESSO:</span>
                    <span className="text-brasil-green font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> CONECTADO
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
                {/* Save Cronograma */}
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-brasil-green text-white font-display text-base py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
                >
                  <Save className="w-5 h-5" />
                  {saveSuccess ? 'CRONOGRAMA SALVO! ✅' : 'SALVAR CRONOGRAMA'}
                </button>

                {/* Download PDF only */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 bg-brasil-yellow text-slate-900 font-display text-base py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
                >
                  <Download className="w-5 h-5" />
                  {downloadSuccess ? 'DOWNLOAD CONCLUÍDO! 📥' : 'BAIXAR PDF DO CRONOGRAMA'}
                </button>

                {downloadSuccess && (
                  <p className="text-xs text-center text-brasil-green-dark font-heading font-extrabold animate-bounce">
                    🎉 PDF gerado com sucesso!
                  </p>
                )}

                {/* Sympla CTA */}
                <a
                  href={EVENT_INFO.symplaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-japan-red text-white font-display text-base py-3 rounded-xl border-2 border-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all comic-shadow-sm hover:shadow-none"
                >
                  <Sparkles className="w-5 h-5" />
                  Compra pelo Sympla Ofic
                </a>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-1 text-xs font-mono text-slate-400 hover:text-japan-red py-2 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Sair da conta
                </button>
              </div>
            </div>

            {/* ---- RIGHT: Attractions List ---- */}
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
                        Linha do Tempo de Shows &amp; Cinema ({bookmarkedSchedules.length})
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

      {/* Hidden Print-Optimized Layout (Only used for PDF generation) */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        <div 
          ref={pdfTemplateRef} 
          style={{
            width: '700px',
            padding: '40px',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontFamily: '"Outfit", "Inter", sans-serif',
            border: '8px solid #000000',
            borderRadius: '24px',
            boxShadow: '10px 10px 0px #000000',
            boxSizing: 'border-box',
          }}
        >
          {/* Header banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '4px solid #000000', paddingBottom: '20px', marginBottom: '25px' }}>
            <div>
              <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '36px', textTransform: 'uppercase', margin: 0, letterSpacing: '1px', color: '#BC002D' }}>
                MEU CRONOGRAMA BMJ 2026
              </h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#009B3A', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                17-19 Julho • Museu Nacional da República
              </p>
            </div>
            <img 
              src="/logos/logoBMJ.png" 
              alt="Logo BMJ" 
              style={{ height: '70px', objectFit: 'contain' }} 
            />
          </div>

          {/* User Profile Info Card */}
          <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '3px solid #000000', marginBottom: '30px' }}>
            <div style={{ fontSize: '40px', display: 'flex', alignItems: 'center' }}>🦊</div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {nome || 'Visitante Oficial'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 20px', fontSize: '12px', color: '#334155' }}>
                <p style={{ margin: 0 }}><strong>Telefone:</strong> {telefone || 'Não Informado'}</p>
                <p style={{ margin: 0 }}><strong>E-mail:</strong> {email}</p>
                <p style={{ margin: 0 }}><strong>Atrações Selecionadas:</strong> {totalFavorites}</p>
                <p style={{ margin: 0 }}><strong>Status:</strong> VIP Visitante</p>
              </div>
            </div>
          </div>

          {/* Schedule List */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '2px solid #000000', paddingBottom: '5px', marginBottom: '15px' }}>
              📅 Minha Agenda Personalizada
            </h3>
            
            {/* Exhibitions */}
            {bookmarkedAttractions.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' }}>
                  Exposições e Tendas ({bookmarkedAttractions.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bookmarkedAttractions.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#f8fafc', border: '2px solid #000000', borderRadius: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{item.icon}</span>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '800' }}>{item.title}</h5>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Atração Especial • {item.category.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shows & Cinema */}
            {bookmarkedSchedules.length > 0 && (
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' }}>
                  Cronograma de Shows, Cinema e Eventos ({bookmarkedSchedules.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {bookmarkedSchedules.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', backgroundColor: '#f8fafc', border: '2px solid #000000', borderRadius: '10px' }}>
                      <div style={{ backgroundColor: '#BC002D', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', minWidth: '85px', textAlign: 'center' }}>
                        {item.day.toUpperCase()} {item.time}
                      </div>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '800' }}>{item.title}</h5>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>🕒 {item.time} • Categoria: {item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Notes */}
          <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '15px', marginTop: '20px', textAlign: 'center', fontSize: '10px', color: '#64748b', lineHeight: '1.4' }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#BC002D', textTransform: 'uppercase' }}>
              ⚠️ ATENÇÃO: ESTE CRONOGRAMA NÃO GARANTE ENTRADA NO EVENTO! ⚠️
            </p>
            <p style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: 'bold' }}>
              Você deve comprar o seu ingresso por dia ou combo diretamente no site oficial do Sympla e apresentá-lo na portaria do Museu Nacional da República.
            </p>
            <p style={{ margin: 0, fontSize: '9px', color: '#94a3b8' }}>
              Este roteiro personalizado serve apenas como auxílio para guiar sua visita durante as comemorações dos 130 anos de amizade Brasil-Japão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
