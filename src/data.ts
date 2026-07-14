import { Attraction, CinemaSession, ScheduleItem, Exhibitor, FaqItem, TicketPlan } from './types';

export const EVENT_INFO = {
  name: "BRASIL MOSTRA JAPÃO 2026",
  edition: "BMJ 2026",
  dates: "17, 18 e 19 de Julho de 2026",
  hours: "11:00 às 22:00",
  venue: "Museu Nacional da República",
  address: "Setor Cultural Sul, Lote 2, próximo à Rodoviária do Plano Piloto, Brasília-DF, 70070-150",
  organizer: "Gs Produções | Brasília 2026 🇧🇷🎌🇯🇵",
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
    description: "Prepare-se para reviver a era de ouro dos heróis de metal e os cavaleiros mascarados in alta definição. Uma descarga eletrizante de nostalgia dos anos 80 e 90!",
    image: "/cinema/cine-fri-1.jpg",
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
    image: "/cinema/cine-fri-2.jpg",
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
    image: "/cinema/cine-fri-3.jpg",
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
    image: "/cinema/cine-sat-1.jpg",
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
    image: "/cinema/cine-sat-2.png",
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
    image: "/cinema/cine-sat-3.jpg",
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
    image: "/cinema/cine-sun-1.jpg",
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
    image: "/cinema/cine-sun-2.png",
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
    image: "/cinema/cine-sun-3.jpg",
    priceFull: 60,
    priceHalf: 30
  }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  // Sexta-feira
  {
    id: "sch-fri-1",
    day: "sexta",
    time: "10:00",
    title: "Abertura Oficial dos Portões",
    description: "Venha aproveitar o início do evento e explorar todas as atrações!",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-fri-2",
    day: "sexta",
    time: "12:00",
    title: "Taiko",
    description: "Apresentação emocionante de tambores tradicionais japoneses.",
    category: "Cultura",
    icon: "🥁",
    isHighlight: true
  },
  {
    id: "sch-fri-3",
    day: "sexta",
    time: "13:00",
    title: "Palestra de Judô e Kendô",
    description: "Demonstração e painel sobre artes marciais tradicionais do Japão.",
    category: "Palestras",
    icon: "🥋"
  },
  {
    id: "sch-fri-4",
    day: "sexta",
    time: "14:00",
    title: "Shamissen",
    description: "Concerto de música tradicional japonesa com o icônico instrumento de cordas.",
    category: "Cultura",
    icon: "🪕"
  },
  {
    id: "sch-fri-5",
    day: "sexta",
    time: "14:30",
    title: "Matsuri Dance",
    description: "Dança interativa tradicional japonesa. Junte-se a nós!",
    category: "Cultura",
    icon: "💃",
    instagram: "@honookami.matsuri",
    isHighlight: true
  },
  {
    id: "sch-fri-6",
    day: "sexta",
    time: "16:00",
    title: "Hirata Sayuri",
    description: "Show imperdível com grandes sucessos da música pop e tradicional japonesa.",
    category: "Shows",
    icon: "🎤",
    instagram: "@sayuri_0531",
    isHighlight: true
  },
  {
    id: "sch-fri-7",
    day: "sexta",
    time: "18:30",
    title: "RepliForce",
    description: "Show de anime song e clássicos do rock japonês.",
    category: "Shows",
    icon: "🎸",
    instagram: "@repliforce_oficial",
    isHighlight: true
  },
  {
    id: "sch-fri-8",
    day: "sexta",
    time: "21:00",
    title: "Maverick Hunters",
    description: "O melhor das trilhas sonoras de jogos clássicos e rock de anime.",
    category: "Shows",
    icon: "🎸",
    instagram: "@maverickhunters_",
    isHighlight: true
  },

  // Sábado
  {
    id: "sch-sat-1",
    day: "sabado",
    time: "10:00",
    title: "Abertura Oficial dos Portões",
    description: "Abertura dos portões para o segundo dia de atrações!",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-sat-2",
    day: "sabado",
    time: "11:00",
    title: "Palestra de Judô e Kendô",
    description: "Painel especial sobre a história e técnicas das artes marciais japonesas.",
    category: "Palestras",
    icon: "🥋"
  },
  {
    id: "sch-sat-3",
    day: "sabado",
    time: "11:30",
    title: "Taiko",
    description: "Apresentação eletrizante dos tambores tradicionais japoneses.",
    category: "Cultura",
    icon: "🥁",
    isHighlight: true
  },
  {
    id: "sch-sat-4",
    day: "sabado",
    time: "12:00",
    title: "Matsuri Dance",
    description: "Junte-se à dança japonesa e celebre conosco!",
    category: "Cultura",
    icon: "💃",
    instagram: "@honookami.matsuri",
    isHighlight: true
  },
  {
    id: "sch-sat-5",
    day: "sabado",
    time: "13:00",
    title: "Marcelo Robocop",
    description: "Encontro especial e bate-papo com o público do evento.",
    category: "Shows",
    icon: "🤖",
    instagram: "@marcelorobocopferreira",
    isHighlight: true
  },
  {
    id: "sch-sat-6",
    day: "sabado",
    time: "14:00",
    title: "Hirata Sayuri",
    description: "A melhor seleção de canções clássicas e modernas orientais.",
    category: "Shows",
    icon: "🎤",
    instagram: "@sayuri_0531",
    isHighlight: true
  },
  {
    id: "sch-sat-7",
    day: "sabado",
    time: "15:00",
    title: "Maverick Hunters",
    description: "Muito rock e energia com os temas mais marcantes dos animes e jogos.",
    category: "Shows",
    icon: "🎸",
    instagram: "@maverickhunters_",
    isHighlight: true
  },
  {
    id: "sch-sat-8",
    day: "sabado",
    time: "16:00",
    title: "Concurso Cosplay",
    description: "O grande momento de ver os cosplayers mais criativos do evento subirem ao palco!",
    category: "Cosplay",
    icon: "🎭",
    isHighlight: true
  },
  {
    id: "sch-sat-9",
    day: "sabado",
    time: "17:30",
    title: "Resultado Cosplay",
    description: "Premiação das melhores performances e figurinos do dia.",
    category: "Cosplay",
    icon: "🏆"
  },
  {
    id: "sch-sat-10",
    day: "sabado",
    time: "18:00",
    title: "RepliForce",
    description: "O melhor do J-rock e trilhas sonoras clássicas.",
    category: "Shows",
    icon: "🎸",
    instagram: "@repliforce_oficial",
    isHighlight: true
  },
  {
    id: "sch-sat-11",
    day: "sabado",
    time: "20:00",
    title: "Otaku Orquestra",
    description: "Concerto inesquecível com trilhas sonoras orquestradas de animes de sucesso.",
    category: "Shows",
    icon: "🎻",
    instagram: "@thiagofranciss",
    isHighlight: true
  },

  // Domingo
  {
    id: "sch-sun-1",
    day: "domingo",
    time: "10:00",
    title: "Abertura Oficial dos Portões",
    description: "Abertura dos portões para o último dia de atividades e emoções!",
    category: "Geral",
    icon: "🚪"
  },
  {
    id: "sch-sun-2",
    day: "domingo",
    time: "11:00",
    title: "Matsuri Dance",
    description: "Última oportunidade para participar da dança festiva oriental!",
    category: "Cultura",
    icon: "💃",
    instagram: "@honookami.matsuri",
    isHighlight: true
  },
  {
    id: "sch-sun-3",
    day: "domingo",
    time: "12:00",
    title: "Taiko",
    description: "A batida forte do Taiko abrindo as apresentações de domingo.",
    category: "Cultura",
    icon: "🥁",
    isHighlight: true
  },
  {
    id: "sch-sun-4",
    day: "domingo",
    time: "12:30",
    title: "Palestra de Judô e Kendô",
    description: "Demonstração de técnicas e reflexões sobre a filosofia das artes marciais.",
    category: "Palestras",
    icon: "🥋"
  },
  {
    id: "sch-sun-5",
    day: "domingo",
    time: "13:00",
    title: "Marcelo Robocop",
    description: "Bate-papo divertido e interação com o público no palco principal.",
    category: "Shows",
    icon: "🤖",
    instagram: "@marcelorobocopferreira",
    isHighlight: true
  },
  {
    id: "sch-sun-6",
    day: "domingo",
    time: "14:00",
    title: "Hirata Sayuri",
    description: "Show emocionante de encerramento da cantora.",
    category: "Shows",
    icon: "🎤",
    instagram: "@sayuri_0531",
    isHighlight: true
  },
  {
    id: "sch-sun-7",
    day: "domingo",
    time: "15:00",
    title: "Kerberos",
    description: "Apresentação da banda trazendo o melhor do rock japonês e animes.",
    category: "Shows",
    icon: "🎸",
    instagram: "@kerberosbr",
    isHighlight: true
  },
  {
    id: "sch-sun-8",
    day: "domingo",
    time: "16:00",
    title: "Concurso Cosplay (Voto Popular)",
    description: "Desfile dos competidores com avaliação direta do público local!",
    category: "Cosplay",
    icon: "🎭",
    isHighlight: true
  },
  {
    id: "sch-sun-9",
    day: "domingo",
    time: "17:30",
    title: "Resultado do Concurso Cosplay",
    description: "A divulgação dos vencedores escolhidos pelo voto popular.",
    category: "Cosplay",
    icon: "🏆"
  },
  {
    id: "sch-sun-10",
    day: "domingo",
    time: "17:30",
    title: "Maverick Hunters",
    description: "Show explosivo de J-rock e trilhas de videogames no encerramento.",
    category: "Shows",
    icon: "🎸",
    instagram: "@maverickhunters_",
    isHighlight: true
  },
  {
    id: "sch-sun-11",
    day: "domingo",
    time: "20:00",
    title: "Otaku Orquestra",
    description: "Grande concerto de encerramento do evento com clássicos orquestrados.",
    category: "Shows",
    icon: "🎻",
    instagram: "@thiagofranciss",
    isHighlight: true
  }
];

export const ATRACOES_ESPECIAIS: Attraction[] = [
  {
    id: "att-shows",
    title: "Shows e Palestras Oficiais",
    category: "shows",
    description: "Dubladores, cantores clássicos, workshops de caligrafia Shodo e painéis exclusivos de debate sobre mangás e literatura japonesa.",
    icon: "🔥",
    image: "/lineup/att-shows.jpg",
    isHighlight: true
  },
  {
    id: "att-orchestra",
    title: "Otaku Orchestra (Orquestra Filarmônica)",
    category: "shows",
    description: "A aclamada Filarmônica interpretará ao vivo as divinas trilhas sonoras autorais do Studio Ghibli e grandes clássicos de animes como Saint Seiya e Evangelion.",
    icon: "🎵",
    image: "/lineup/att-orchestra.jpg",
    isHighlight: true
  },
  {
    id: "att-tokusatsu",
    title: "Expo e Cine Tokusatsu",
    category: "cinema",
    description: "Réplicas oficiais de monstros, espadas sagradas, painel com speed lines e pôsteres retrô cobrindo os eternos Jaspion, Jiraiya, Jiban e os Kamen Riders.",
    icon: "🎬",
    image: "/lineup/att-tokusatsu.png",
    isHighlight: true
  },
  {
    id: "att-ghibli",
    title: "Cine Ghibli",
    category: "cinema",
    description: "Um espaço de projeção especial para curtir as aventuras mais sensíveis e poéticas de Hayao Miyazaki.",
    icon: "🎨",
    image: "/lineup/att-ghibli.jpg"
  },
  {
    id: "att-games",
    title: "Expo Games Arena",
    category: "manga-anime",
    description: "Estações de jogos retrô de Tokusatsu e Lançamentos de desenvolvedores nacionais. Desafie seus amigos em campeonatos emocionantes de luta.",
    icon: "🎮",
    image: "/lineup/att-games.jpg"
  },
  {
    id: "att-gastronomia",
    title: "Gastronomia Imperial e Comida de Rua",
    category: "food",
    description: "Sashimi fatiado na hora, Yakisoba perfumado, Takoyaki quentinho e doces Wagashi. Opções deliciosas criadas pelos melhores chefs locais.",
    icon: "🍱",
    image: "/lineup/att-gastronomia.jpg",
    isHighlight: true
  },
  {
    id: "att-feirinha",
    title: "Feira de Produtos Geeks & Tradicionais",
    category: "shops",
    description: "Adquira mangás importados, action figures colecionáveis, luminárias orientais de sakura e roupas temáticas em estandes certificados.",
    icon: "🛍️",
    image: "/lineup/att-feirinha.jpg"
  },
  {
    id: "att-cenarios",
    title: "Cenários Instagramáveis Interativos",
    category: "cosplay",
    description: "Caminhe sob um Torii de 4 metros, fique ao lado do Totoro na floresta cenográfica e tire fotos simulando speed lines de quadrinhos com sombras duras.",
    icon: "📸",
    image: "/lineup/att-cenarios.jpg"
  }
];

export const EXPOSITORES: Exhibitor[] = [];

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
    answer: "O ingresso dá livre trânsito pelas dependências comuns do festival: feirinha geek, praça de gastronomia, arenas de games, área de painéis e palcos de shows abertos (como Taikô e desfiles). Não dá acesso às sessões fechadas de Cinema do Cine BMJ, as quais necessitam de bilhete individual de cinema ou do pacote Combo Cinema + Evento."
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
