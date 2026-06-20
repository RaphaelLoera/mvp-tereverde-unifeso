const asset = (fileName: string) => `/assets/${encodeURI(fileName)}`;

export type HeroSlide = {
  title: string;
  description: string;
  image: string;
  link: string;
  cta: string;
  badge: string;
};

export type TrailHighlight = {
  title: string;
  park: string;
  level: string;
  distance: string;
  image: string;
  description: string;
};

export type ParkCard = {
  icon: string;
  title: string;
  text: string;
};

export type ParkContent = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  biodiversityTitle: string;
  biodiversity: string[];
  cards: ParkCard[];
  facts: {
    activities: string;
    trails: string;
    contacts: string;
    hours: string;
    bestTime: string;
  };
  mapUrl: string;
};

export const heroSlides: HeroSlide[] = [
  {
    title: "Parque Montanhas de Teresópolis",
    description:
      "Uma vitrine da Mata Atlântica serrana com trilhas, mirantes e áreas de contemplação para quem quer sentir a cidade pela natureza.",
    image: asset("inicio - parque montanhas.jpg"),
    link: "/parque-montanhas",
    cta: "Ver parque",
    badge: "Conservação e aventura",
  },
  {
    title: "Parque Nacional da Serra dos Órgãos",
    description:
      "O cenário clássico de montanhas, cachoeiras e trilhas longas que virou referência de ecoturismo na serra fluminense.",
    image: asset("inicio - Serra dos órgãos.jpeg"),
    link: "/parnaso",
    cta: "Conhecer PARNASO",
    badge: "Clássico da serra",
  },
  {
    title: "Parque Estadual dos Três Picos",
    description:
      "A maior unidade de conservação do Rio de Janeiro reúne paredões, trilhas exigentes e biodiversidade de altitude.",
    image: asset("inicio - Três picos.jpeg"),
    link: "/tres-picos",
    cta: "Explorar Três Picos",
    badge: "Altitude e biodiversidade",
  },
  {
    title: "Circuito Terê Verde",
    description:
      "Um ponto de encontro para parques, trilhas e eventos com curadoria de conteúdo e administração integrada ao backend do projeto.",
    image: asset("inicio - circuito verde.webp"),
    link: "/login",
    cta: "Entrar na área segura",
    badge: "Experiência integrada",
  },
];

export const trailHighlights: TrailHighlight[] = [
  {
    title: "Cartão Postal",
    park: "PARNASO",
    level: "Fácil",
    distance: "2,8 km",
    image: asset("trilhas - cartao postal.jfif"),
    description:
      "Uma trilha de contato direto com o verde da serra, ideal para quem quer começar com uma experiência leve.",
  },
  {
    title: "Castelo do Açu",
    park: "PARNASO",
    level: "Difícil",
    distance: "22 km",
    image: asset("trilhas - castelo do acu.jfif"),
    description:
      "Clássica entre montanhistas, combina altitude, esforço físico e visuais abertos da serra.",
  },
  {
    title: "Mirante da Agulha",
    park: "PARNASO",
    level: "Médio",
    distance: "7 km",
    image: asset("trilhas - mirante da agulha.jfif"),
    description:
      "Uma rota de paisagens marcantes que entrega uma das vistas mais procuradas da região.",
  },
  {
    title: "Vale dos Deuses",
    park: "Três Picos",
    level: "Médio",
    distance: "10 km",
    image: asset("trilhas - vale dos deuses.jpg"),
    description:
      "Camping e natureza exuberante em uma área que virou referência para quem busca imersão completa.",
  },
  {
    title: "Pedra da Tartaruga",
    park: "Montanhas",
    level: "Fácil",
    distance: "4 km",
    image: asset("trilhas - parque montanhas.jpg"),
    description:
      "Uma trilha muito procurada por sua acessibilidade e pela vista ampla da serra de Teresópolis.",
  },
  {
    title: "Cabeça do Dragão",
    park: "Três Picos",
    level: "Difícil",
    distance: "12 km",
    image: asset("trilhas - tres picos.jpg"),
    description:
      "Indicada para visitantes experientes que querem encarar subidas técnicas e paisagens intensas.",
  },
];

export const parkPages: Record<string, ParkContent> = {
  parnaso: {
    slug: "parnaso",
    title: "Parque Nacional da Serra dos Órgãos",
    subtitle:
      "Conservação, montanhismo e biodiversidade em um dos parques mais emblemáticos do Brasil.",
    heroImage: asset("serra dos orgaos - topo.jpg"),
    intro:
      "Criado em 1939, o parque protege as cabeceiras dos rios da região e um conjunto de montanhas que se tornaram símbolo da serra fluminense.",
    biodiversityTitle: "Biodiversidade e ecossistemas",
    biodiversity: [
      "O PARNASO abriga Mata Atlântica de altitude, com florestas, bromélias, orquídeas e grande concentração de espécies endêmicas.",
      "Entre os animais registrados estão aves raras, mamíferos de médio porte e espécies ameaçadas que dependem da preservação contínua da área.",
      "A combinação de relevo, umidade e altitude cria um mosaico ecológico que sustenta trilhas, cachoeiras e formações rochosas únicas.",
    ],
    cards: [
      {
        icon: asset("Logo1.png"),
        title: "Conservação ativa",
        text: "A visitação consciente ajuda a preservar o ambiente e permite que o parque mantenha suas áreas naturais protegidas para as próximas gerações.",
      },
      {
        icon: asset("logo2.png"),
        title: "Camping e aventura",
        text: "Atividades como camping, caminhada e escalada fazem parte da identidade do parque e exigem preparo, respeito e planejamento.",
      },
      {
        icon: asset("logo3.png"),
        title: "Escalada e montanha",
        text: "A Serra dos Órgãos é referência em escalada e trilhas mais longas, atraindo praticantes experientes de todo o país.",
      },
    ],
    facts: {
      activities:
        "Escalada, caminhada, rapel, observação da natureza e visita às cachoeiras.",
      trails:
        "Rede extensa de trilhas com opções para iniciantes e trechos de alta exigência técnica.",
      contacts: "(61) 2028-9913 | (21) 9.7896-2463 | parnaso@icmbio.gov.br",
      hours: "Todos os dias, das 8h às 17h.",
      bestTime:
        "No inverno as chuvas diminuem e as trilhas ficam mais favoráveis; no verão, cachoeiras e poços são muito procurados.",
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46620.33348613835!2d-43.08082049632025!3d-22.481054204535564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sparque%20serra%20dos%20%C3%B3rg%C3%A3os!5e1!3m2!1spt-BR!2sbr!4v1749848867479!5m2!1spt-BR!2sbr",
  },
  "tres-picos": {
    slug: "tres-picos",
    title: "Parque Estadual dos Três Picos",
    subtitle:
      "A maior unidade de conservação do Rio de Janeiro, com montanhas, trechos técnicos e biodiversidade de altitude.",
    heroImage: asset("tres-picos-hero.jpg"),
    intro:
      "Criado em 2002, o parque conecta municípios da serra fluminense e protege um grande bloco de Mata Atlântica com paisagens ímpares.",
    biodiversityTitle: "Biodiversidade e ecossistemas",
    biodiversity: [
      "Com diferentes faixas de altitude, o parque abriga florestas montanas, campos de altitude e espécies emblemáticas da fauna da serra.",
      "A presença de onça-parda, bugio-ruivo, jacutinga e outras espécies reforça sua relevância para conservação e pesquisa.",
      "As trilhas e paredões rochosos fazem do parque um território muito procurado por quem busca aventura e preservação ambiental.",
    ],
    cards: [
      {
        icon: asset("Logo1.png"),
        title: "Natureza preservada",
        text: "A experiência no parque depende de uma visitação responsável, porque o equilíbrio ecológico é parte central da proposta de conservação.",
      },
      {
        icon: asset("logo2.png"),
        title: "Camping e refúgio",
        text: "Áreas como o Vale dos Deuses permitem vivência direta com a mata, com estrutura simples e atmosfera de montanha.",
      },
      {
        icon: asset("logo3.png"),
        title: "Trilhas de altitude",
        text: "Cabeça do Dragão, Caixa de Fósforo e Pico Menor aparecem entre os percursos que mais atraem aventureiros experientes.",
      },
    ],
    facts: {
      activities:
        "Caminhadas, escaladas, observação de aves e camping em meio à Mata Atlântica.",
      trails:
        "Opções para diferentes níveis, incluindo rotas mais técnicas e travessias longas.",
      contacts:
        "petp@inea.rj.gov.br | (21) 2649-6847 | @parqueestadualdostrespicos",
      hours: "Terça a domingo, das 8h às 17h.",
      bestTime:
        "Entre maio e setembro o clima costuma ser mais seco, com maior estabilidade para trilhas e camping.",
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d24812.542798654737!2d-42.61933767768225!3d-22.41371880855892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps%20parque%20estadual%20dos%20tres%20picos!5e0!3m2!1spt-BR!2sbr!4v1750779861992!5m2!1spt-BR!2sbr",
  },
  "parque-montanhas": {
    slug: "parque-montanhas",
    title: "Parque Natural Municipal Montanhas de Teresópolis",
    subtitle:
      "O cartão de boas-vindas da serra com áreas de camping, trilhas acessíveis e muita biodiversidade.",
    heroImage: asset("pedra-tartaruga-hero.jpg"),
    intro:
      "Criado em 2009, o parque municipal reúne núcleos de visitação, pesquisa e convivência com a natureza, sendo uma das áreas mais importantes de proteção local.",
    biodiversityTitle: "Biodiversidade e ecossistemas",
    biodiversity: [
      "O parque protege fragmentos da Mata Atlântica e funciona como corredor ecológico entre outras áreas conservadas da região serrana.",
      "A fauna inclui mamíferos, aves e anfíbios associados a uma vegetação rica em espécies nativas e ameaçadas.",
      "Além da função ecológica, o parque tem papel educativo e turístico, com trilhas e áreas de contemplação muito visitadas.",
    ],
    cards: [
      {
        icon: asset("Logo1.png"),
        title: "Regras de camping",
        text: "A área de camping tem uso controlado, com restrições de fogueiras, som alto e circulação fora das áreas demarcadas.",
      },
      {
        icon: asset("logo2.png"),
        title: "Pedra da Tartaruga",
        text: "Um dos pontos mais conhecidos do parque, com vista marcante, trilha procurada e área associada ao lazer ao ar livre.",
      },
      {
        icon: asset("logo3.png"),
        title: "Pesquisa e educação",
        text: "A sede Iconha e os núcleos de apoio mostram como o parque combina proteção, estudo e turismo sustentável.",
      },
    ],
    facts: {
      activities:
        "Caminhadas ecológicas, observação de aves, rapel, escalada e piqueniques.",
      trails:
        "Trilhas como Tartaruga, Camelo e Alpina conectam mirantes, mata nativa e áreas de visitação.",
      contacts:
        "(21) 2741-2234 | Rua Francisco Acquarone, 573 – Teresópolis, RJ",
      hours: "Terça a domingo, das 8h às 17h.",
      bestTime:
        "De abril a setembro o clima tende a ficar mais seco e favorável para trilhas e atividades externas.",
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d41741.913017970925!2d-42.98122838003577!3d-22.372549010193538!3m2!1i1024!2i768!4f13.1!2m1!1sparque%20montanhas%20teres%C3%B3polis%20pass%C3%A1ros!5e0!3m2!1spt-BR!2sbr!4v1750788907125!5m2!1spt-BR!2sbr",
  },
};

export const socialLinks = [
  {
    label: "WhatsApp",
    icon: asset("icons8-whatsapp-50 (1).png"),
    href: "https://wa.me/552127412234",
  },
  {
    label: "Instagram",
    icon: asset("icons8-instagram-50 (1).png"),
    href: "https://instagram.com",
  },
  {
    label: "Telegram",
    icon: asset("icons8-telegrama-25.png"),
    href: "https://telegram.org",
  },
];

export const contactCards: { title: string; text: string }[] = [];
