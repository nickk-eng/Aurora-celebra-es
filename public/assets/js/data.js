/* =========================================================
   Aurora Celebrações — Dados do site (conteúdo estático)
   Todo o conteúdo abaixo é ilustrativo: substitua pelos
   dados reais da agência (textos, preços, fotos, fornecedores).
   ========================================================= */

/** Monta a URL de uma foto do Unsplash no tamanho desejado. */
const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTOS = {
  hero: "1519741497674-611481863552",
  couple: "1511285560929-80b456fea0bc",
  ceremony: "1519225421980-715cb0215aed",
  table: "1464366400600-7168b8af9bc3",
  tableGold: "1606800052052-a08af7148866",
  lights: "1478146896981-b80fe463b330",
  bride: "1523438885200-e635ba2c371e",
  outdoor: "1465495976277-4387d4b0b4c6",
  rings: "1532712938310-34cb3982ef74",
  dress: "1515934751635-c81c6bc9a2d8",
  couple2: "1522673607200-164d1b6ce486",
  couple3: "1537633552985-df8429e8048b",
  cake: "1535254973040-607b474cb50d",
  cake2: "1460978812857-470ed1c77af0",
  party: "1530103862676-de8c9debad1d",
  event: "1492684223066-81342ee5ff30",
  party2: "1505236858219-8359eb29e329",
  dinner: "1414235077428-338989a2e8c0",
  flowers: "1469371670807-013ccf25f16a",
  beach: "1525258946800-98cfd641d0de",
  music: "1470229722913-7c0e2dbbafd3",
  makeup: "1487412947147-5cebf100ffc2",
  photographer: "1520854221256-17451cc331bf",
  venue: "1519167758481-83f550bb49b3"
};

/* ---------------- Serviços ---------------- */
const SERVICES = [
  {
    id: "assessoria-completa",
    title: "Assessoria completa",
    icon: "bi-journal-richtext",
    photo: PHOTOS.couple,
    short: "Do primeiro briefing ao último convidado: planejamos cada etapa do seu casamento com você.",
    description: "Acompanhamos o casal por todo o processo, de 6 a 18 meses antes da data. Montamos cronograma, controlamos o orçamento, indicamos e negociamos com fornecedores, conduzimos reuniões e visitas técnicas e coordenamos o grande dia para que vocês só precisem viver cada momento.",
    includes: [
      "Planejamento financeiro e planilha de orçamento",
      "Cronograma personalizado com todas as etapas",
      "Curadoria e negociação com fornecedores",
      "Acompanhamento em degustações e provas",
      "Visitas técnicas ao local do evento",
      "Coordenação completa no dia do casamento"
    ],
    packages: [
      { name: "Essencial", price: "a partir de R$ 6.900", items: ["Até 8 reuniões", "Indicação de fornecedores", "Cronograma do grande dia", "Equipe de 3 cerimonialistas"] },
      { name: "Signature", price: "a partir de R$ 11.900", featured: true, items: ["Reuniões ilimitadas", "Negociação de contratos", "Gestão do orçamento", "Ensaio da cerimônia", "Equipe de 5 cerimonialistas"] },
      { name: "Prestige", price: "sob consulta", items: ["Tudo do Signature", "Projeto de decoração exclusivo", "Gestão de hospedagem", "Concierge para convidados", "Equipe dedicada"] }
    ],
    faq: [
      ["Com quanto tempo de antecedência devemos contratar?", "O ideal é de 12 a 18 meses antes, quando ainda há boa disponibilidade de espaços e fornecedores. Também atendemos casamentos com 4 a 6 meses de prazo."],
      ["Vocês trabalham com fornecedores fixos?", "Não. Temos uma rede de parceiros avaliados, mas a escolha é sempre do casal. Também coordenamos fornecedores que vocês já contrataram."],
      ["A assessoria inclui o dia do evento?", "Sim. Nossa equipe chega antes da montagem e só sai depois da desmontagem, cuidando de horários, fornecedores, família e convidados."]
    ],
    gallery: [PHOTOS.ceremony, PHOTOS.table, PHOTOS.couple3]
  },
  {
    id: "cerimonial",
    title: "Cerimonial do grande dia",
    icon: "bi-clock-history",
    photo: PHOTOS.ceremony,
    short: "Para quem já organizou tudo e quer uma equipe experiente conduzindo o dia do evento.",
    description: "Assumimos a organização cerca de 60 dias antes do evento. Revisamos contratos e horários, montamos o roteiro minuto a minuto e conduzimos cerimônia e recepção com discrição e elegância.",
    includes: [
      "Revisão de contratos e alinhamento com fornecedores",
      "Roteiro detalhado da cerimônia e da festa",
      "Ensaio com padrinhos e família",
      "Recepção e direcionamento dos convidados",
      "Kit de emergência para noivos e madrinhas"
    ],
    packages: [
      { name: "Cerimônia", price: "a partir de R$ 2.900", items: ["Coordenação da cerimônia", "2 cerimonialistas", "Roteiro de entrada"] },
      { name: "Completo", price: "a partir de R$ 4.800", featured: true, items: ["Cerimônia e recepção", "4 cerimonialistas", "Reunião de alinhamento", "Ensaio"] },
      { name: "Premium", price: "a partir de R$ 6.500", items: ["Tudo do Completo", "Gestão de lista de convidados", "Recepcionistas bilíngues"] }
    ],
    faq: [
      ["Qual a diferença para a assessoria completa?", "No cerimonial o casal já contratou os fornecedores. Nós entramos na reta final para organizar e executar o dia."],
      ["Quantas pessoas da equipe estarão no evento?", "Depende do número de convidados: em média, uma pessoa a cada 50 convidados."]
    ],
    gallery: [PHOTOS.outdoor, PHOTOS.rings, PHOTOS.bride]
  },
  {
    id: "decoracao",
    title: "Decoração e cenografia",
    icon: "bi-flower1",
    photo: PHOTOS.tableGold,
    short: "Projetos autorais que traduzem a personalidade do casal em flores, luz, texturas e mobiliário.",
    description: "Nosso ateliê desenvolve o conceito visual do evento, com moodboard, projeto 3D, escolha de paleta, mobiliário, iluminação cênica e arranjos florais. Cuidamos também da montagem e da desmontagem.",
    includes: [
      "Moodboard e conceito visual exclusivo",
      "Projeto em 3D do espaço",
      "Arranjos florais e paisagismo",
      "Mobiliário, louças e enxoval de mesa",
      "Iluminação cênica e decorativa",
      "Montagem e desmontagem"
    ],
    packages: [
      { name: "Intimista", price: "a partir de R$ 9.500", items: ["Até 80 convidados", "Cerimônia e mesa principal", "Arranjos de centro"] },
      { name: "Clássico", price: "a partir de R$ 18.000", featured: true, items: ["Até 200 convidados", "Projeto 3D", "Iluminação cênica", "Lounge"] },
      { name: "Grand", price: "sob consulta", items: ["Acima de 200 convidados", "Cenografia completa", "Estruturas especiais"] }
    ],
    faq: [
      ["Vocês usam flores naturais?", "Sim, trabalhamos principalmente com flores naturais da estação, e combinamos com flores permanentes quando faz sentido para o orçamento."],
      ["Posso aproveitar itens que já tenho?", "Claro. Incorporamos objetos de família e peças afetivas ao projeto."]
    ],
    gallery: [PHOTOS.table, PHOTOS.flowers, PHOTOS.lights]
  },
  {
    id: "mini-wedding",
    title: "Mini wedding e elopement",
    icon: "bi-heart",
    photo: PHOTOS.couple2,
    short: "Celebrações íntimas para até 60 convidados, com o mesmo cuidado de um grande casamento.",
    description: "Para casais que preferem uma celebração pequena e cheia de significado. Cuidamos de local, gastronomia, decoração e roteiro em um formato enxuto e acolhedor.",
    includes: ["Curadoria de espaços intimistas", "Menu harmonizado", "Decoração sob medida", "Celebrante e roteiro da cerimônia", "Coordenação no dia"],
    packages: [
      { name: "Elopement", price: "a partir de R$ 4.900", items: ["Só o casal e testemunhas", "Fotografia inclusa", "Cerimônia simbólica"] },
      { name: "Mini wedding", price: "a partir de R$ 8.900", featured: true, items: ["Até 60 convidados", "Assessoria e cerimonial", "Decoração básica"] },
      { name: "Mini Prestige", price: "sob consulta", items: ["Espaço exclusivo", "Jantar assinado por chef", "Decoração autoral"] }
    ],
    faq: [["Mini wedding sai mais barato?", "O custo total é menor, mas o valor por convidado costuma ser maior, porque o casal investe mais na experiência de cada pessoa."]],
    gallery: [PHOTOS.dinner, PHOTOS.couple3, PHOTOS.rings]
  },
  {
    id: "destination-wedding",
    title: "Destination wedding",
    icon: "bi-airplane",
    photo: PHOTOS.beach,
    short: "Casamentos na praia, no campo ou no exterior, com logística completa para casal e convidados.",
    description: "Organizamos casamentos fora da cidade do casal: escolha do destino, visita técnica, bloqueio de hospedagem, transfers, programação de boas-vindas e fornecedores locais.",
    includes: ["Pesquisa e visita técnica ao destino", "Bloqueio de hotéis e tarifas para convidados", "Transfers e logística", "Site e comunicação com convidados", "Festa de boas-vindas e brunch pós-casamento"],
    packages: [
      { name: "Nacional", price: "a partir de R$ 14.900", featured: true, items: ["Destinos no Brasil", "2 visitas técnicas", "Gestão de hospedagem"] },
      { name: "Internacional", price: "sob consulta", items: ["Portugal, Itália, Caribe e outros", "Parceiros locais", "Documentação"] }
    ],
    faq: [["Os convidados pagam a própria hospedagem?", "Normalmente sim. Negociamos tarifas especiais e cuidamos das reservas para facilitar a vida de todos."]],
    gallery: [PHOTOS.outdoor, PHOTOS.couple, PHOTOS.ceremony]
  },
  {
    id: "eventos-sociais",
    title: "Aniversários e 15 anos",
    icon: "bi-stars",
    photo: PHOTOS.party,
    short: "Festas de debutante, bodas e aniversários com conceito, roteiro e produção completos.",
    description: "Criamos festas temáticas ou clássicas para todas as idades, com cenografia, atrações, gastronomia e roteiro de momentos especiais, como valsa, homenagens e surpresas.",
    includes: ["Conceito e tema da festa", "Cenografia e iluminação", "Atrações e entretenimento", "Roteiro de momentos especiais", "Coordenação no dia"],
    packages: [
      { name: "Celebração", price: "a partir de R$ 3.900", items: ["Até 100 convidados", "Cerimonial", "Indicação de fornecedores"] },
      { name: "Festa completa", price: "a partir de R$ 9.900", featured: true, items: ["Assessoria completa", "Decoração", "Roteiro de valsa"] }
    ],
    faq: [["Vocês organizam bodas de prata e ouro?", "Sim, incluindo renovação de votos com cerimônia."]],
    gallery: [PHOTOS.party2, PHOTOS.lights, PHOTOS.cake]
  },
  {
    id: "corporativos",
    title: "Eventos corporativos",
    icon: "bi-briefcase",
    photo: PHOTOS.event,
    short: "Lançamentos, confraternizações, jantares e premiações com a sofisticação da sua marca.",
    description: "Planejamos e produzimos eventos de empresas alinhados ao posicionamento da marca: cenografia, credenciamento, palco, audiovisual, gastronomia e brindes.",
    includes: ["Briefing e conceito alinhados à marca", "Cenografia e ativação", "Credenciamento e recepção", "Som, luz e audiovisual", "Relatório pós-evento"],
    packages: [
      { name: "Confraternização", price: "a partir de R$ 7.500", items: ["Até 150 pessoas", "Produção completa", "Atrações"] },
      { name: "Lançamento", price: "sob consulta", featured: true, items: ["Cenografia de marca", "Imprensa e convidados VIP", "Audiovisual"] }
    ],
    faq: [["Vocês emitem nota fiscal?", "Sim, emitimos nota fiscal de serviços para todos os eventos corporativos."]],
    gallery: [PHOTOS.party2, PHOTOS.dinner, PHOTOS.music]
  },
  {
    id: "gastronomia",
    title: "Curadoria gastronômica",
    icon: "bi-cup-straw",
    photo: PHOTOS.cake2,
    short: "Degustações guiadas, menu harmonizado, bar de drinks e doces finos para surpreender.",
    description: "Ajudamos a escolher buffet, bolo, doces e bar. Organizamos degustações, montamos o menu com o chef e cuidamos de restrições alimentares dos convidados.",
    includes: ["Seleção de buffets e chefs", "Degustações acompanhadas", "Menu adaptado a restrições", "Bar de drinks autorais", "Mesa de doces e bolo"],
    packages: [
      { name: "Curadoria", price: "a partir de R$ 1.900", featured: true, items: ["3 degustações", "Montagem do menu", "Gestão de restrições"] }
    ],
    faq: [["O valor do buffet está incluso?", "Não. A curadoria é o nosso serviço de seleção e acompanhamento. O buffet é contratado diretamente pelo cliente."]],
    gallery: [PHOTOS.cake, PHOTOS.dinner, PHOTOS.tableGold]
  }
];

/* ---------------- Fornecedores parceiros ---------------- */
const SUPPLIER_CATEGORIES = ["Espaços", "Buffet", "Fotografia", "Filmagem", "Música e DJ", "Flores", "Bolos e doces", "Vestidos", "Beleza"];

const SUPPLIERS = [
  { id: 1, name: "Villa Jardim das Hortênsias", category: "Espaços", city: "São Paulo", rating: 4.9, reviews: 128, price: "$$$", photo: PHOTOS.venue, desc: "Casarão com jardim, capela e salão para até 350 convidados." },
  { id: 2, name: "Fazenda Santa Clara Eventos", category: "Espaços", city: "Campinas", rating: 4.8, reviews: 96, price: "$$", photo: PHOTOS.outdoor, desc: "Espaço rústico-chique ao ar livre, com lago e pomar." },
  { id: 3, name: "Sabores de Ouro Buffet", category: "Buffet", city: "São Paulo", rating: 4.9, reviews: 211, price: "$$$", photo: PHOTOS.dinner, desc: "Alta gastronomia com menus autorais e serviço à francesa." },
  { id: 4, name: "Mesa Posta Gastronomia", category: "Buffet", city: "Belo Horizonte", rating: 4.7, reviews: 84, price: "$$", photo: PHOTOS.table, desc: "Cozinha mineira contemporânea e estações de finger food." },
  { id: 5, name: "Luz & Afeto Fotografia", category: "Fotografia", city: "Rio de Janeiro", rating: 5.0, reviews: 167, price: "$$$", photo: PHOTOS.photographer, desc: "Fotografia documental com olhar sensível e natural." },
  { id: 6, name: "Estúdio Instante Raro", category: "Fotografia", city: "Curitiba", rating: 4.8, reviews: 73, price: "$$", photo: PHOTOS.couple3, desc: "Ensaios pré-wedding e cobertura completa do grande dia." },
  { id: 7, name: "Cine Amor Filmes", category: "Filmagem", city: "São Paulo", rating: 4.9, reviews: 102, price: "$$$", photo: PHOTOS.couple2, desc: "Filmes de casamento cinematográficos e teaser em 24h." },
  { id: 8, name: "Harmonia Música para Eventos", category: "Música e DJ", city: "São Paulo", rating: 4.8, reviews: 140, price: "$$", photo: PHOTOS.music, desc: "Quarteto de cordas para cerimônia e DJ para a festa." },
  { id: 9, name: "Ateliê Flor de Linho", category: "Flores", city: "Campinas", rating: 4.9, reviews: 88, price: "$$", photo: PHOTOS.flowers, desc: "Buquês, arranjos e projetos florais com flores da estação." },
  { id: 10, name: "Doce Encanto Confeitaria", category: "Bolos e doces", city: "Rio de Janeiro", rating: 4.9, reviews: 190, price: "$$", photo: PHOTOS.cake, desc: "Bolos esculpidos à mão e doces finos personalizados." },
  { id: 11, name: "Maison Véu Noivas", category: "Vestidos", city: "Belo Horizonte", rating: 4.7, reviews: 65, price: "$$$", photo: PHOTOS.dress, desc: "Vestidos sob medida e aluguel de peças de grife." },
  { id: 12, name: "Studio Blush Beauty", category: "Beleza", city: "São Paulo", rating: 4.8, reviews: 154, price: "$$", photo: PHOTOS.makeup, desc: "Maquiagem e penteado para noivas, madrinhas e mães." }
];

/* ---------------- Portfólio ---------------- */
const PORTFOLIO = [
  { title: "Marina & Rafael", type: "Casamento", place: "Villa das Hortênsias, SP", photo: PHOTOS.ceremony, h: 900 },
  { title: "Jantar de gala", type: "Corporativo", place: "São Paulo", photo: PHOTOS.event, h: 700 },
  { title: "Beatriz & Lucas", type: "Destination", place: "Trancoso, BA", photo: PHOTOS.beach, h: 820 },
  { title: "Mesa posta dourada", type: "Casamento", place: "Campinas, SP", photo: PHOTOS.tableGold, h: 760 },
  { title: "Helena 15 anos", type: "Aniversário", place: "São Paulo", photo: PHOTOS.party, h: 900 },
  { title: "Camila & André", type: "Mini wedding", place: "Serra da Mantiqueira, MG", photo: PHOTOS.couple2, h: 780 },
  { title: "Cerimônia ao ar livre", type: "Casamento", place: "Fazenda Santa Clara, SP", photo: PHOTOS.outdoor, h: 700 },
  { title: "Festa de fim de ano", type: "Corporativo", place: "Rio de Janeiro", photo: PHOTOS.party2, h: 820 },
  { title: "Bodas de prata", type: "Aniversário", place: "Belo Horizonte", photo: PHOTOS.cake2, h: 900 },
  { title: "Luiza & Pedro", type: "Casamento", place: "Curitiba, PR", photo: PHOTOS.couple, h: 760 },
  { title: "Recepção iluminada", type: "Casamento", place: "São Paulo", photo: PHOTOS.lights, h: 700 },
  { title: "Ana & Thiago", type: "Mini wedding", place: "Ilhabela, SP", photo: PHOTOS.couple3, h: 880 }
];

/* ---------------- Depoimentos (exemplos) ---------------- */
const TESTIMONIALS = [
  { name: "Marina & Rafael", event: "Casamento · 220 convidados", rating: 5, text: "Chegamos ao dia do casamento sem nenhuma preocupação. A equipe antecipou cada detalhe e nossa família ainda comenta a decoração." },
  { name: "Beatriz & Lucas", event: "Destination wedding · Trancoso", rating: 5, text: "Organizar um casamento a 1.500 km de casa parecia impossível. Eles cuidaram de hotéis, transfers e fornecedores locais com perfeição." },
  { name: "Fernanda Alves", event: "15 anos da Helena", rating: 5, text: "A festa ficou exatamente como minha filha sonhou. O roteiro da valsa emocionou todo mundo." },
  { name: "Camila & André", event: "Mini wedding · 45 convidados", rating: 5, text: "Queríamos algo íntimo e elegante, e foi isso que recebemos. Cada convidado se sentiu especial." },
  { name: "Grupo Vértice", event: "Evento corporativo", rating: 5, text: "Profissionalismo do briefing ao relatório final. Nosso lançamento teve a cara da marca." },
  { name: "Luiza & Pedro", event: "Casamento · 160 convidados", rating: 5, text: "O controle do orçamento foi o que mais nos ajudou. Fechamos tudo dentro do valor planejado." }
];

/* ---------------- Blog ---------------- */
const POSTS = [
  {
    id: "cronograma-casamento",
    title: "Cronograma do casamento: o que fazer mês a mês",
    category: "Planejamento",
    date: "2026-10-28",
    read: 7,
    photo: PHOTOS.rings,
    excerpt: "Um guia prático para organizar as principais etapas, de 18 meses antes até a semana do grande dia.",
    content: `<p>Planejar um casamento fica bem mais leve quando cada decisão tem a sua hora. Este é o cronograma que usamos como base com nossos clientes.</p>
      <h3>12 a 18 meses antes</h3><ul><li>Defina o orçamento total e o número aproximado de convidados.</li><li>Escolha a data e reserve o espaço.</li><li>Contrate assessoria, buffet, fotografia e filmagem.</li></ul>
      <h3>6 a 12 meses antes</h3><ul><li>Defina o conceito da decoração.</li><li>Escolha o vestido e o traje do noivo.</li><li>Envie o save the date.</li></ul>
      <h3>2 a 6 meses antes</h3><ul><li>Faça as degustações de bolo e doces.</li><li>Envie os convites e monte a lista de presentes.</li><li>Faça as provas de cabelo e maquiagem.</li></ul>
      <h3>Último mês</h3><p>Confirme presenças, revise o roteiro com o cerimonial e reserve um tempo para descansar. Você merece chegar ao altar tranquila.</p>`
  },
  {
    id: "paleta-de-cores",
    title: "Como escolher a paleta de cores do casamento",
    category: "Decoração",
    date: "2026-10-12",
    read: 5,
    photo: PHOTOS.flowers,
    excerpt: "Estação do ano, horário e estilo do espaço: os três pontos que ajudam a escolher as cores certas.",
    content: `<p>A paleta de cores conecta decoração, papelaria, flores e até os trajes dos padrinhos.</p>
      <h3>Comece pelo espaço</h3><p>Um salão clássico pede tons neutros com dourado. Um espaço ao ar livre combina com verdes, terrosos e rosé.</p>
      <h3>Considere a estação</h3><p>Flores da estação são mais bonitas e mais baratas. Na primavera, aposte em tons pastel; no outono, em terracota e vinho.</p>
      <h3>Use a regra 60-30-10</h3><p>Uma cor dominante (60%), uma secundária (30%) e um destaque (10%) garantem harmonia sem exageros.</p>`
  },
  {
    id: "orcamento-casamento",
    title: "Orçamento de casamento: como dividir o investimento",
    category: "Planejamento",
    date: "2026-09-30",
    read: 6,
    photo: PHOTOS.table,
    excerpt: "Uma referência de percentuais para cada categoria e dicas para não estourar o valor planejado.",
    content: `<p>Cada casal tem suas prioridades, mas esta divisão ajuda a começar:</p>
      <ul><li><strong>Espaço e buffet:</strong> 40% a 50%</li><li><strong>Decoração e flores:</strong> 10% a 15%</li><li><strong>Fotografia e filmagem:</strong> 10% a 12%</li><li><strong>Música e entretenimento:</strong> 5% a 8%</li><li><strong>Trajes e beleza:</strong> 8% a 10%</li><li><strong>Assessoria:</strong> 5% a 8%</li><li><strong>Reserva para imprevistos:</strong> 5% a 10%</li></ul>
      <h3>Dica de ouro</h3><p>Decida juntos quais são as três prioridades do casal e invista mais nelas. Nas demais categorias, busque soluções mais simples.</p>`
  },
  {
    id: "mini-wedding-tendencia",
    title: "Mini wedding: por que os casais estão amando o formato",
    category: "Tendências",
    date: "2026-09-14",
    read: 4,
    photo: PHOTOS.couple2,
    excerpt: "Menos convidados, mais experiência. Entenda as vantagens das celebrações intimistas.",
    content: `<p>Com até 60 convidados, o mini wedding permite investir em experiências que seriam inviáveis em um grande casamento.</p>
      <h3>Vantagens</h3><ul><li>Mais tempo com cada convidado.</li><li>Possibilidade de jantar assinado por chef.</li><li>Acesso a espaços exclusivos e menores.</li><li>Planejamento mais rápido.</li></ul>
      <h3>Atenção</h3><p>A lista de convidados exige escolhas difíceis. Defina critérios claros desde o início.</p>`
  },
  {
    id: "destination-wedding-guia",
    title: "Destination wedding: guia para casar longe de casa",
    category: "Destination",
    date: "2026-08-29",
    read: 8,
    photo: PHOTOS.beach,
    excerpt: "Documentação, hospedagem, clima e comunicação com os convidados para um casamento sem sustos.",
    content: `<p>Casar na praia ou em outro país é um sonho para muitos casais. Veja o que considerar.</p>
      <h3>Escolha a época certa</h3><p>Pesquise o clima do destino e evite épocas de chuva ou de alta temporada.</p>
      <h3>Avise com antecedência</h3><p>Envie o save the date com pelo menos 10 meses de antecedência para que os convidados se programem.</p>
      <h3>Pense na experiência</h3><p>Um jantar de boas-vindas e um brunch no dia seguinte transformam o casamento em um fim de semana inesquecível.</p>`
  },
  {
    id: "fotografo-casamento",
    title: "7 perguntas para fazer antes de contratar o fotógrafo",
    category: "Fornecedores",
    date: "2026-08-10",
    read: 5,
    photo: PHOTOS.photographer,
    excerpt: "Estilo, prazo de entrega, equipe e contrato: o que perguntar para fazer a escolha certa.",
    content: `<p>As fotos são uma das poucas coisas que ficam para sempre. Antes de fechar, pergunte:</p>
      <ol><li>Posso ver um casamento completo, e não só os destaques?</li><li>Quantas pessoas estarão na equipe?</li><li>Qual o prazo de entrega das fotos e do álbum?</li><li>Quantas fotos tratadas estão incluídas?</li><li>Há cobrança de hora extra?</li><li>Como as fotos são entregues e armazenadas?</li><li>O que acontece em caso de imprevisto com o fotógrafo?</li></ol>`
  }
];

// Mantém os dados originais disponíveis para os componentes React.
window.AURORA_DATA = { img, SERVICES, SUPPLIER_CATEGORIES, SUPPLIERS, PORTFOLIO, TESTIMONIALS, POSTS };
