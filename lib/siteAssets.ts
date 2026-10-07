export type SiteMedia = {
  src: string;
  fallback: string;
  alt: string;
  futureSrc?: string;
};

export type HeroMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      position?: string;
    }
  | {
      type: "video";
      src: string;
      poster: string;
      alt: string;
      position?: string;
    };

const folding = {
  first: {
    src: "/assets/images/insights/insight-excesso-de-informacao.png",
    fallback: "/assets/images/insights/insight-excesso-de-informacao.png",
    futureSrc: "/assets/site/experience/experience-01.jpg",
    alt: "Tempo para viver com tranquilidade",
  },
  second: {
    src: "/assets/images/events/origami-clinica-sorgi-672.jpg",
    fallback: "/assets/images/events/origami-clinica-sorgi-672.jpg",
    futureSrc: "/assets/site/experience/experience-02.jpg",
    alt: "Decisões que atravessam projetos e relações",
  },
} satisfies Record<string, SiteMedia>;

const teamMain = {
  src: "/assets/images/team/team-main.jpg",
  fallback: "/assets/images/team/team-main.jpg",
  futureSrc: "/assets/site/team/team-main.jpg",
  alt: "Equipe da Origami Investimentos",
} satisfies SiteMedia;

const paulo = {
  src: "/assets/images/team/paulo-sato.jpg",
  fallback: "/assets/images/team/paulo-sato.jpg",
  futureSrc: "/assets/site/team/paulo-sato.jpg",
  alt: "Paulo Sato",
} satisfies SiteMedia;

const lucas = {
  src: "/assets/images/team/lucas-devito.jpg",
  fallback: "/assets/images/team/lucas-devito.jpg",
  futureSrc: "/assets/site/team/lucas-devito.jpg",
  alt: "Lucas Devito",
} satisfies SiteMedia;

const andre = {
  src: "/assets/images/team/andre-kalim.jpg",
  fallback: "/assets/images/team/andre-kalim.jpg",
  futureSrc: "/assets/site/team/andre-kalim.jpg",
  alt: "André Kalim",
} satisfies SiteMedia;

const monthlyLetters = {
  september2026: {
    src: "/assets/images/insights/carta-setembro-2026.png",
    fallback: "/assets/images/insights/carta-setembro-2026.png",
    futureSrc: "/assets/site/letters/september-2026.jpg",
    alt: "Capa da Carta Mensal de setembro de 2026",
  },
  august2026: {
    src: "/assets/images/insights/carta-agosto-2026.png",
    fallback: "/assets/images/insights/carta-agosto-2026.png",
    futureSrc: "/assets/site/letters/august-2026.jpg",
    alt: "Capa da Carta Mensal de agosto de 2026",
  },
  july2026: {
    src: "/assets/images/insights/carta-julho-2026.png",
    fallback: "/assets/images/insights/carta-julho-2026.png",
    futureSrc: "/assets/site/letters/july-2026.jpg",
    alt: "Capa da Carta Mensal de julho de 2026",
  },
  june2026: {
    src: "/assets/images/insights/carta-junho-2026.png",
    fallback: "/assets/images/insights/carta-junho-2026.png",
    futureSrc: "/assets/site/letters/june-2026.jpg",
    alt: "Capa da Carta Mensal de junho de 2026",
  },
} satisfies Record<string, SiteMedia>;

const heroMedia: readonly HeroMedia[] = [
  {
    type: "image",
    src: "/assets/images/hero/hero-01.jpg",
    alt: "Encontro em um ambiente acolhedor, representando decisões que acompanham a vida",
    position: "50% 50%",
  },
  {
    type: "image",
    src: "/assets/images/hero/hero-02.png",
    alt: "Conversa próxima durante um encontro da Origami",
    position: "50% 50%",
  },
  {
    type: "image",
    src: "/assets/images/insights/insight-excesso-de-informacao.png",
    alt: "Detalhe de um encontro que conecta patrimônio e vida",
    position: "50% 0%",
  },
];

export const siteAssets = {
  brand: {
    finalStatic: "/assets/brand/logo-final.png",
    header: "/assets/brand/logo-horizontal.png",
    headerAnimation: "/assets/brand/logo-transparent-horizontal-alpha.webm",
    headerAnimationImage: "/assets/brand/header-animation.webp",
    signature: "/assets/brand/wordmark-dark.png",
    mark: "/assets/brand/mark-blue.png",
  },
  heroMedia,
  insights: {
    etfs: "/assets/images/insights/insight-etfs.png",
    information: "/assets/images/insights/insight-excesso-de-informacao.png",
  },
  events: {
    tennis: "/assets/images/events/origami-clinica-sorgi-657.jpg",
    available: "/assets/images/events/img-6297.jpg",
  },
  videoFeature: {
    src: "/assets/video/content-montage.mp4",
    poster: "/assets/images/hero/video-poster.jpg",
    alt: "Conheça quem faz a Origami Investimentos",
  },
  folding,
  teamMain,
  paulo,
  lucas,
  andre,
  monthlyLetters,
  manifesto: {
    video: "/assets/site/manifesto/manifesto-video-01.mp4",
    fallback: "/assets/images/hero/meeting-02.jpg",
    alt: "Conversa próxima sobre escolhas de vida e patrimônio",
  },
} as const;
