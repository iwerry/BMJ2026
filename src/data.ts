import { Attraction, CinemaSession, ScheduleItem, Exhibitor, FaqItem, TicketPlan } from './types';

export const EVENT_INFO = {
  name: "BRASIL MOSTRA JAPÃO 2026",
  edition: "BMJ 2026",
  dates: "17, 18 e 19 de Julho de 2026",
  hours: "11:00 às 22:00",
  venue: "Museu Nacional da República",
  address: "Setor Cultural Sul, Lote 2, próximo à Rodoviária do Plano Piloto, Brasília-DF, 70070-150",
  organizer: "Edgilson Ferreira dos Santos",
  instagramUrl: "https://www.instagram.com/brasilmostrajapao/",
  beaconsUrl: "https://beacons.ai/brasilmostrajapao",
  symplaUrl: "https://www.sympla.com.br/evento/brasil-mostra-japao/3374417",
  cadastroFormUrl: "", // Não definido ainda (Caravana)
  exhibitorFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdV8rxorjX2ncDa2DM1yhXKLrLCraU82qcFJIaONdp2YiYi0w/viewform",
  artesFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScsuhvMwLqyrtwh8C2yfx2gPOAugx0wdBxAYyQx1D7NEQFbRw/viewform",
  targetDate: "2026-07-17T11:00:00Z" // Start date of the event in ISO representation
};

export const TICKET_PLANS: TicketPlan[] = [
  {
    id: "acesso-geral",
    name: "Acesso Geral Diário",
    priceFull: 40.00,
    priceHalf: 20.00,
    taxFull: 4.00,
    taxHalf: 3.99,
    installmentsFull: "Até 10x",
    installmentsHalf: "Até 5x",
    includes: [
      "Acesso completo a toda a área de estandes",
      "Pavilhões de Exposições e Tendas Temáticas",
      "Acesso à Praça de Alimentação Oriental",
      "Acesso livre aos Cosplay Contests",
      "Cenários temáticos para fotos incríveis",
      "Estações de Expo Games (Retro e Lançamentos)"
    ],
    badge: "Mais Vendido"
  },
  {
    id: "combo-cinema",
    name: "Combo Cinema + Evento",
    priceFull: 100.00,
    priceHalf: 50.00,
    taxFull: 10.00,
    taxHalf: 5.00,
    installmentsFull: "Até 12x",
    installmentsHalf: "Até 12x",
    includes: [
      "Acesso Geral Diário completo ao evento",
      "Entrada garantida para as 3 Sessões de Cinema do dia",
      "Cadeira reservada prioritária no Cine BMJ",
      "Sessões exclusivas Ghibli & Tokusatsu",
      "Kit promocional de boas-vindas na entrada",
      "Poster colecionável comemorativo dos 130 anos"
    ],
    isPopular: true,
    badge: "Melhor Custo-Benefício"
  }
];

export const CINEMA_SESSIONS: CinemaSession[] = [
  // Sexta
  {
    id: "cine-fri-1",
    day: "sexta",
    dayLabel: "Sexta-Feira",
    dateLabel: "17 de Julho",
    time: "14:00",
    title: "Jiban e Kamen Rider Zext",
    category: "Tokusatsu",
    description: "Prepare-se para reviver a era de ouro dos heróis de metal e os cavaleiros mascarados em alta definição. Uma descarga eletrizante de nostalgia dos anos 80 e 90!",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-fri-2",
    day: "sexta",
    dayLabel: "Sexta-Feira",
    dateLabel: "17 de Julho",
    time: "16:00",
    title: "Princesa Mononoke",
    category: "Studio Ghibli",
    description: "Um divisor de águas da obra épica de Hayao Miyazaki. Explore os conflitos existenciais entre a tecnologia humana engrenante e os deuses místicos das florestas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-fri-3",
    day: "sexta",
    dayLabel: "Sexta-Feira",
    dateLabel: "17 de Julho",
    time: "19:00",
    title: "O Castelo Animado",
    category: "Studio Ghibli",
    description: "Conheça Howl, Sophie e o hilário demônio de fogo Calcifer nesta fantástica aventura flutuante sobre autoaceitação, beleza e a destruição da guerra.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  // Sabado
  {
    id: "cine-sat-1",
    day: "sabado",
    dayLabel: "Sábado",
    dateLabel: "18 de Julho",
    time: "14:00",
    title: "Jiraiya e Kamen Rider Bui",
    category: "Tokusatsu",
    description: "O lendário Ninja Olimpíada defende o mundo contra a família de feiticeiros e unifica heróis clássicos num espetáculo de saltos, faíscas e espada olímpica.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-sat-2",
    day: "sabado",
    dayLabel: "Sábado",
    dateLabel: "18 de Julho",
    time: "16:00",
    title: "Vidas ao Vento",
    category: "Studio Ghibli",
    description: "A bela e emocionante homenagem histórica de Miyazaki a Jiro Horikoshi, o lendário engenheiro e apaixonado desenhista de aviões de corrida.",
    image: "https://images.unsplash.com/photo-1473116763269-255f74e8e6e5?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-sat-3",
    day: "sabado",
    dayLabel: "Sábado",
    dateLabel: "18 de Julho",
    time: "19:00",
    title: "A Viagem de Chihiro",
    category: "Studio Ghibli",
    description: "Vencedor do Oscar e um dos maiores filmes de todos os tempos. Veja a jornada imersiva da garota perdida na misteriosa casa de banho dos deuses de Yubaba.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  // Domingo
  {
    id: "cine-sun-1",
    day: "domingo",
    dayLabel: "Domingo",
    dateLabel: "19 de Julho",
    time: "14:00",
    title: "Jaspion e Gaan",
    category: "Tokusatsu",
    description: "O eterno campeão da justiça do espaço estrela uma mega sessão cinematográfica. Assista o gigante Daileon enfrentando Satan Goss e o monstro gigante MacGaren!",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-sun-2",
    day: "domingo",
    dayLabel: "Domingo",
    dateLabel: "19 de Julho",
    time: "16:00",
    title: "Ponyo: Uma Amizade que Veio do Mar",
    category: "Studio Ghibli",
    description: "Uma peixinha dourada mágica deseja ardentemente tornar-se humana ao criar uma forte amizade pura e inspiradora com o doce garotinho Sosuke.",
    image: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  },
  {
    id: "cine-sun-3",
    day: "domingo",
    dayLabel: "Domingo",
    dateLabel: "19 de Julho",
    time: "19:00",
    title: "Meu Amigo Totoro",
    category: "Studio Ghibli",
    description: "Duas garotinhas se mudam para o interior japonês e são adotadas pela amizade protetora dos espíritos lendários e acolhedores da grande árvore florestal.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    priceFull: 60,
    priceHalf: 30
  }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  // Sexta-feira
  {
    id: "sch-1",
    day: "sexta",
    time: "11:00",
    title: "Abertura Oficial dos Portões",
    description: "Seja um dos primeiros a cruzar o portal Torii e pisar no pavilhão de integração nipo-brasileiro. Começam as atividades dos estandes.",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-2",
    day: "sexta",
    time: "12:00",
    title: "Praça de Alimentação Bento Box",
    description: "Abertura dos Food Trucks e Barracas de Yakisoba, Gyoza, Onigiri, Tempura e as paletas da Viva Paleteria.",
    category: "Gastronomia",
    icon: "🍱"
  },
  {
    id: "sch-3",
    day: "sexta",
    time: "14:00",
    title: "Cine Tokusatsu Jiban e Kamen Rider Zext",
    description: "Sessão pioneira do Cine BMJ com monstros gigantes e o autêntico clima policial de metal clássico.",
    category: "Cinema",
    icon: "🎬",
    isHighlight: true
  },
  {
    id: "sch-4",
    day: "sexta",
    time: "16:00",
    title: "Otaku Orchestra - Ensaios Gerais Aberto",
    description: "Venha ouvir a orquestra filarmônica fazendo os últimos testes acústicos e arranjos ao vivo no palco sob a tenda gigante.",
    category: "Shows",
    icon: "🎻"
  },
  {
    id: "sch-5",
    day: "sexta",
    time: "18:00",
    title: "Painel Oficial: 130 Anos de Relações Diplomáticas",
    description: "Palestra com historiadores e imigrantes da rota histórica do do Kasato Maru de 1908.",
    category: "Palestras",
    icon: "🌱"
  },
  {
    id: "sch-6",
    day: "sexta",
    time: "20:00",
    title: "Sessão Cine Ghibli: O Castelo Animado",
    description: "Assista o castelo flutuante de Howl em alta definição no painel LED monumental de 60m².",
    category: "Cinema",
    icon: "🎨",
    isHighlight: true
  },
  {
    id: "sch-7",
    day: "sexta",
    time: "22:00",
    title: "Encerramento das Atividades do Primeiro Dia",
    description: "Fechamento dos galpões e agradecimentos. Prepare-se para o fim de semana!",
    category: "Geral",
    icon: "🌙"
  },

  // Sábado
  {
    id: "sch-8",
    day: "sabado",
    time: "11:00",
    title: "Abertura dos Portões de Sábado",
    description: "Abertura de todos os estandes de vendas de quadrinhos, colecionáveis Piticas e Artes Gallery.",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-9",
    day: "sabado",
    time: "13:00",
    title: "Artes Marciais Tradicionais",
    description: "Exibições deslumbrantes de Kendo, Iaidô (a arte de desembainhar a espada japonesa), artes samurais e Aikido.",
    category: "Cultura",
    icon: "⚔️"
  },
  {
    id: "sch-10",
    day: "sabado",
    time: "14:00",
    title: "Cine Tokusatsu: Jiraiya e Kamen Rider Bui",
    description: "As lutas e magias ninjas acendem o auditório em um espetáculo cinematográfico nostálgico.",
    category: "Cinema",
    icon: "🎬"
  },
  {
    id: "sch-11",
    day: "sabado",
    time: "15:30",
    title: "Desfile Preliminar Cosplay (Infantil & Juvenil)",
    description: "A garotada entra em cena para desfilar réplicas incríveis de Naruto, Pokémon e guerreiros em traços infantis.",
    category: "Cosplay",
    icon: "🎭"
  },
  {
    id: "sch-12",
    day: "sabado",
    time: "17:00",
    title: "Otaku Orchestra: Grand Concert Studio Ghibli Ao Vivo",
    description: "Concerto de tirar o fôlego interpretando temas de Chihiro, Mononoke e Totoro com 60 instrumentistas.",
    category: "Shows",
    icon: "🎻",
    isHighlight: true
  },
  {
    id: "sch-13",
    day: "sabado",
    time: "19:00",
    title: "Sessão Monumental: A Viagem de Chihiro",
    description: "Assista uma obra-prima oscarizada no maior espetáculo visual noturno do festival.",
    category: "Cinema",
    icon: "🎨",
    isHighlight: true
  },
  {
    id: "sch-14",
    day: "sabado",
    time: "22:00",
    title: "Encerramento das Atividades de Sábado",
    description: "Fechamento seguro da segunda noite sob a luz da réplica do sol nascente.",
    category: "Geral",
    icon: "🌙"
  },

  // Domingo
  {
    id: "sch-15",
    day: "domingo",
    time: "11:00",
    title: "Abertura dos Portões do Domingo",
    description: "Dia final de corrida pela feirinha de produtos, camisetas geeks exclusivas e o tradicional RPG.",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-16",
    day: "domingo",
    time: "12:30",
    title: "Apresentação de Taikô (Tambores de Guerra)",
    description: "As batidas rítmicas profundas dos tambores gigantes que ecoarão a força espiritual do sol nascente.",
    category: "Cultura",
    icon: "🥁",
    isHighlight: true
  },
  {
    id: "sch-17",
    day: "domingo",
    time: "14:00",
    title: "Cine Tokusatsu: Jaspion e Gaan (Nostalgia Suprema)",
    description: "Assista as relíquias de ficção científica japonesa com a dublagem clássica brasileira.",
    category: "Cinema",
    icon: "🎬"
  },
  {
    id: "sch-18",
    day: "domingo",
    time: "16:00",
    title: "Cosplay Contest - Grande Final Nacional 🎭",
    description: "Desfiles, encenações com efeitos especiais e o grande julgamento do melhor cosplayer do país. Premiações incríveis!",
    category: "Cosplay",
    icon: "🎭",
    isHighlight: true
  },
  {
    id: "sch-19",
    day: "domingo",
    time: "18:00",
    title: "Gran Finale: Otaku Orchestra & Anime Classics",
    description: "Músicas temas de Evangelion, Dragon Ball Z, Saint Seiya, Naruto e Ghibli encerrando o festival de forma sinfônica.",
    category: "Shows",
    icon: "🎻"
  },
  {
    id: "sch-20",
    day: "domingo",
    time: "19:00",
    title: "Sessão Encerramento Ghibli: Meu Amigo Totoro",
    description: "Projeção aconchegante para aquecer as famílias no final da noite cultural.",
    category: "Cinema",
    icon: "🎨"
  },
  {
    id: "sch-21",
    day: "domingo",
    time: "21:30",
    title: "Cerimônia de Despedida e Lançamento BMJ 2027",
    description: "Discursos de Edgilson Santos, sorteios de brindes e fogos luminosos comemorativos no Museu Nacional.",
    category: "Geral",
    icon: "🎌",
    isHighlight: true
  },
  {
    id: "sch-22",
    day: "domingo",
    time: "22:00",
    title: "Fechamento Oficial dos Portões",
    description: "Obrigado a todos por participarem dos 130 anos de amizade Brasil-Japão! Até 2027!",
    category: "Geral",
    icon: "🚪"
  }
];

export const ATRACOES_ESPECIAIS: Attraction[] = [
  {
    id: "att-shows",
    title: "Shows e Palestras Oficiais",
    category: "shows",
    description: "Dubladores, cantores clássicos, workshops de caligrafia Shodo e painéis exclusivos de debate sobre mangás e literatura japonesa.",
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
    isHighlight: true
  },
  {
    id: "att-orchestra",
    title: "Otaku Orchestra (Orquestra Filarmônica)",
    category: "shows",
    description: "A aclamada Filarmônica interpretará ao vivo as divinas trilhas sonoras autorais do Studio Ghibli e grandes clássicos de animes como Saint Seiya e Evangelion.",
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    isHighlight: true
  },
  {
    id: "att-tokusatsu",
    title: "Expo e Cine Tokusatsu",
    category: "cinema",
    description: "Réplicas oficiais de monstros, espadas sagradas, painel com speed lines e pôsteres retrô cobrindo os eternos Jaspion, Jiraiya, Jiban e os Kamen Riders.",
    icon: "🎬",
    image: "https://images.unsplash.com/photo-1608889174639-509f7a7eb443?q=80&w=800&auto=format&fit=crop",
    isHighlight: true
  },
  {
    id: "att-ghibli",
    title: "Cine Ghibli",
    category: "cinema",
    description: "Um espaço de projeção especial sob a tenda bolha imersiva para curtir as aventuras mais sensíveis e poéticas de Hayao Miyazaki.",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "att-cosplay",
    title: "Cosplay Contest & Vestiários",
    category: "cosplay",
    description: "Premiações nacionais de melhor fabricação, performance e desfiles. Inclui o 'Cosplay Help' com ferramentas, cola quente e costura rápida.",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    isHighlight: true
  },
  {
    id: "att-games",
    title: "Expo Games Arena",
    category: "manga-anime",
    description: "Estações de jogos retrô de Tokusatsu e Lançamentos de desenvolvedores nacionais. Desafie seus amigos em campeonatos emocionantes de luta.",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "att-gastronomia",
    title: "Gastronomia Imperial e Comida de Rua",
    category: "food",
    description: "Sashimi fatiado na hora, Yakisoba perfumado, Takoyaki quentinho e doces Wagashi. Opções deliciosas criadas pelos melhores chefs locais.",
    icon: "🍱",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    isHighlight: true
  },
  {
    id: "att-feirinha",
    title: "Feira de Produtos Geeks & Tradicionais",
    category: "shops",
    description: "Adquira mangás importados, action figures colecionáveis, luminárias orientais de sakura e roupas temáticas em estandes certificados.",
    icon: "🛍️",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "att-cenarios",
    title: "Cenários Instagramáveis Interativos",
    category: "cosplay",
    description: "Caminhe sob um Torii de 4 metros, fique ao lado do Totoro na floresta cenográfica e tire fotos simulando speed lines de quadrinhos com sombras duras.",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "att-bolha",
    title: "Tenda Bolha Monumental (30m Diâmetro)",
    category: "manga-anime",
    description: "Uma imponente redoma de aclimação para workshops e exibições estéticas tradicionais como Cerimônia do Chá e arranjos florais Ikebana.",
    icon: "🎪",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
  }
];

export const EXPOSITORES: Exhibitor[] = [
  { id: "exp-1", name: "Sato Company", category: "Distribuidora de Tokusatsu", isFeatured: true },
  { id: "exp-2", name: "Artes Gallery", category: "Artesanatos e Quadros Temáticos", isFeatured: true },
  { id: "exp-3", name: "K07 Geek Store", category: "Livraria & Mangás Especiais", isFeatured: true },
  { id: "exp-4", name: "G3D - Galeria Geek do Gabbs", category: "Action Figures 3D Personalizados", isFeatured: true },
  { id: "exp-5", name: "Megulicias", category: "Doces Importados & Confeitaria Temática" },
  { id: "exp-6", name: "Kannibal", category: "Tudo Sobre Rock & Roupas Alternativas" },
  { id: "exp-7", name: "Piticas Quiosque", category: "Roupas Licenciadas Geek & Anime" },
  { id: "exp-8", name: "Viva Paleteria", category: "Gelatos, Paletas Tropicais e Sobremesas" },
  { id: "exp-9", name: "Onigiri Delícias", category: "Comidas Rápidas e Tradicionais Onigiris" },
  { id: "exp-10", name: "Mundo Cute Estampas", category: "Papelaria Criativa e Kawaii" },
  { id: "exp-11", name: "Candango RPG", category: "Associação e Mesas Livres de Aventura" }
];

export const PATROCINADORES = {
  ouro: [
    { name: "Andorinhas Logística", logoText: "Andorinhas" },
    { name: "Sato Company Distribuição", logoText: "SATO COMPANY" }
  ],
  prata: [
    { name: "Cenografia Eventos Brasília", logoText: "CENOGRAFIA BRASÍLIA" },
    { name: "Dallas Alimentos", logoText: "Dallas" }
  ],
  bronze: [
    { name: "Pantanal Importadora", logoText: "Pantanal" }
  ],
  apoio: [
    { name: "GDF - Governo de Distrito Federal", logoText: "GDF Apoio Oficial" },
    { name: "Museu Nacional da República", logoText: "Museu de Brasília" }
  ]
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "O que está incluso no ingresso de acesso geral?",
    answer: "O ingresso dá livre trânsito pelas dependências comuns do festival: feirinha geek, praça de gastronomia, Tenda Bolha, arenas de games, área de painéis e palcos de shows abertos (como Taikô e desfiles). Não dá acesso às sessões fechadas de Cinema do Cine BMJ, as quais necessitam de bilhete individual de cinema ou do pacote Combo Cinema + Evento."
  },
  {
    id: "faq-2",
    question: "Posso comprar ingresso na porta no dia do evento?",
    answer: "Sim! A bilheteria física oficial funcionará na entrada do Museu Nacional da República ao longo de sexta-feira, sábado e domingo. Contudo, os ingressos na porta estarão sujeitos à disponibilidade física e possíveis reajustes de lote. Recomendamos garantir o quanto antes pelo Sympla online para usufruir de preços promocionais e acesso imediato sem filas."
  },
  {
    id: "faq-3",
    question: "O evento possui acessibilidade para cadeirantes?",
    answer: "Absolutamente! O complexo do Museu Nacional da República conta com total acessibilidade arquitetônica. Planejamos rampas, banheiros químicos grandes adaptados, área reservada próxima à grade de palco principal para Pessoas com Deficiência (PcD), sinalização acessível e staff preparado para auxílio."
  },
  {
    id: "faq-4",
    question: "Posso levar comida e bebida de fora?",
    answer: "Será permitida a entrada de água em garrafa plástica transparente lacrada e pequenos mantimentos de consumo individual devidamente embalados de fábrica (como barras de cereal, biscoitos lacrados artesanais ou frutas picadas em pote transparente). Proíbe-se a entrada de latas de refrigerante/cerveja, bebidas alcoólicas, recipientes de vidro ou caixas térmicas rígidas."
  },
  {
    id: "faq-5",
    question: "Existe estacionamento próximo ao local?",
    answer: "Há vagas de estacionamento gratuitas e públicas no entorno do Museu Nacional da República e no Setor Cultural Sul. No entanto, por se situar bem ao lado do maior terminal de transportes do Distrito Federal (Rodoviária do Plano Piloto), recomendamos fortemente o uso do metrô, linhas de ônibus ou carros de aplicativos."
  },
  {
    id: "faq-6",
    question: "Como funciona a meia-entrada e a meia-entrada solidária?",
    answer: "A meia-entrada está garantida para estudantes munidos de Carteira de Identificação Estudantil (CIE), idosos com idade igual ou superior a 60 anos, professores das escolas públicas do Distrito Federal, doadores frequentes de sangue e pessoas de baixa renda cadastradas em programas governamentais (CadÚnico). Além disso, oferecemos a Meia-Entrada Solidária: qualquer indivíduo que doar 1kg de alimento não perecível (exceto sal) no credenciamento receberá o desconto de 50%."
  },
  {
    id: "faq-7",
    question: "Posso ir fantasiado (caracterização Cosplay)? Há suporte local?",
    answer: "Sim! Cosplays de qualquer universo clássico ou pop oriental/ocidental são incentivos centrais do Brasil Mostra Japão. Para dar total conforto, disponibilizaremos um camarim gratuito de suporte chamado 'Cosplay Help', munido de cabides, espelhos, tomadas de energia, agulhas, linhas e cola quente para reparos rápidos, além de guarda-volumes acessível rotativo."
  },
  {
    id: "faq-8",
    question: "Qual a política de cancelamento ou devolução?",
    answer: "Conforme o Código de Defesa do Consumidor, reembolsos sobre desistência de compra online podem ser solicitados em até 7 dias corridos após a transação financeira, desde que a solicitação tramite no Sympla em até 48 horas de antecedência do horário de abertura dos portões do evento."
  }
];
