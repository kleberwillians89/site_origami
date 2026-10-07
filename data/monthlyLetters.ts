import { siteAssets, type SiteMedia } from "@/lib/siteAssets";

export type LetterSection = {
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
};

export type MonthlyLetter = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Carta Mensal";
  month: string;
  shortMonth: string;
  year: number;
  author: string;
  readingTime: string;
  coverImage: string;
  cover: SiteMedia;
  featured: boolean;
  publishedAt: string;
  content: LetterSection[];
};

export const monthlyLetters: MonthlyLetter[] = [
  {
    id: "letter-2026-09",
    slug: "setembro-2026",
    month: "Setembro",
    shortMonth: "SET",
    year: 2026,
    title: "Prever o futuro ou construir uma estratégia resiliente?",
    excerpt: "Por que um patrimônio preparado para diferentes cenários depende menos de previsões e mais de método.",
    category: "Carta Mensal",
    author: "Comitê de Investimentos Origami",
    readingTime: "8 min de leitura",
    coverImage: siteAssets.monthlyLetters.september2026.fallback,
    cover: siteAssets.monthlyLetters.september2026,
    featured: true,
    publishedAt: "2026-09-01",
    content: [
      {
        paragraphs: [
          "Em meses de muitas manchetes, o desafio não é encontrar mais informação. É separar o que altera uma decisão estrutural do que apenas ocupa a atenção por alguns dias.",
          "Eleições, petróleo, juros americanos e ativos digitais parecem assuntos distantes entre si. Para um patrimônio, porém, todos passam pela mesma pergunta: o que mudou de forma relevante no cenário, nos objetivos ou na capacidade de atravessar ciclos?",
        ],
      },
      {
        heading: "O cenário muda. O método permanece.",
        paragraphs: [
          "A volatilidade política e econômica costuma aumentar o impulso de agir. Mas uma carteira não deveria responder a cada nova projeção. Ela deve responder a hipóteses claras, limites de risco e objetivos que foram definidos antes do ruído.",
          "Isso não significa ignorar o presente. Significa observá-lo a partir de uma estrutura: liquidez para o que está próximo, proteção para o que não pode ser comprometido e crescimento para horizontes mais longos.",
        ],
        pullQuote: "Clareza não elimina a incerteza. Ela melhora a qualidade das decisões dentro dela.",
      },
      {
        heading: "O patrimônio como um sistema",
        paragraphs: [
          "Juros globais afetam preços e moedas. Petróleo atravessa inflação e atividade. Eleições influenciam expectativas. Bitcoin testa novas formas de exposição e risco. Nenhum desses temas deve ser analisado isoladamente do restante da vida financeira.",
          "A melhor resposta raramente está em prever cada movimento. Está em construir um patrimônio capaz de absorver diferentes caminhos sem perder coerência com o que precisa realizar.",
        ],
      },
    ],
  },
  {
    id: "letter-2026-08",
    slug: "agosto-2026",
    month: "Agosto",
    shortMonth: "AGO",
    year: 2026,
    title: "Carteira ou estrutura patrimonial?",
    excerpt: "Por que boas decisões começam antes da seleção de produtos e continuam muito depois dela.",
    category: "Carta Mensal",
    author: "Comitê de Investimentos Origami",
    readingTime: "7 min de leitura",
    coverImage: siteAssets.monthlyLetters.august2026.fallback,
    cover: siteAssets.monthlyLetters.august2026,
    featured: false,
    publishedAt: "2026-08-01",
    content: [
      {
        paragraphs: [
          "Uma carteira é uma parte visível do patrimônio. A estrutura é o que conecta investimentos, liquidez, riscos, projetos e responsabilidades familiares.",
          "Quando essa conexão não existe, bons produtos podem acabar servindo a objetivos errados — ou sendo vendidos no momento em que mais deveriam permanecer investidos.",
        ],
      },
      {
        heading: "Antes da alocação",
        paragraphs: [
          "O ponto de partida é entender o que o patrimônio precisa sustentar. Há decisões para os próximos meses, compromissos que atravessam anos e desejos que ainda estão ganhando forma.",
          "Organizar essas camadas permite que cada investimento tenha uma função clara e que a avaliação de risco seja feita no contexto correto.",
        ],
        pullQuote: "Produtos ocupam posições. Objetivos dão sentido a elas.",
      },
      {
        heading: "Acompanhar é tão importante quanto construir",
        paragraphs: [
          "Uma estrutura patrimonial não é estática. Ela muda quando a família muda, quando um projeto amadurece ou quando novas responsabilidades surgem.",
          "Por isso, acompanhamento não é apenas revisar rentabilidade. É verificar se as decisões continuam alinhadas à vida que o patrimônio existe para apoiar.",
        ],
      },
    ],
  },
  {
    id: "letter-2026-07",
    slug: "julho-2026",
    month: "Julho",
    shortMonth: "JUL",
    year: 2026,
    title: "Risco não é apenas volatilidade.",
    excerpt: "Uma reflexão sobre contexto, horizonte e as decisões que um número sozinho não consegue explicar.",
    category: "Carta Mensal",
    author: "Comitê de Investimentos Origami",
    readingTime: "6 min de leitura",
    coverImage: siteAssets.monthlyLetters.july2026.fallback,
    cover: siteAssets.monthlyLetters.july2026,
    featured: false,
    publishedAt: "2026-07-01",
    content: [
      {
        paragraphs: [
          "Volatilidade mede oscilação. Risco, para uma família, mede a possibilidade de um plano não acontecer como deveria.",
          "Confundir os dois conceitos leva a decisões que parecem prudentes no curto prazo, mas podem comprometer objetivos que dependem de crescimento ao longo do tempo.",
        ],
      },
      {
        heading: "Risco depende da pergunta",
        paragraphs: [
          "Um mesmo ativo pode ser inadequado para uma reserva de curto prazo e coerente para um objetivo de décadas. O horizonte, a liquidez necessária e a capacidade de suportar perdas importam tanto quanto o comportamento do preço.",
        ],
        pullQuote: "O número só ganha significado quando encontra o objetivo.",
      },
      {
        heading: "Diagnóstico antes do produto",
        paragraphs: [
          "Uma boa decisão começa pela realidade de quem investe: suas fontes de renda, compromissos, relações e escolhas futuras.",
          "É desse diagnóstico que nasce uma alocação capaz de equilibrar tranquilidade hoje e continuidade amanhã.",
        ],
      },
    ],
  },
  {
    id: "letter-2026-06",
    slug: "junho-2026",
    month: "Junho",
    shortMonth: "JUN",
    year: 2026,
    title: "Antes da carteira, vem a vida.",
    excerpt: "O patrimônio ganha sentido quando parte de objetivos reais, relações e escolhas que atravessam o tempo.",
    category: "Carta Mensal",
    author: "Comitê de Investimentos Origami",
    readingTime: "7 min de leitura",
    coverImage: siteAssets.monthlyLetters.june2026.fallback,
    cover: siteAssets.monthlyLetters.june2026,
    featured: false,
    publishedAt: "2026-06-01",
    content: [
      {
        paragraphs: [
          "Investir não começa com uma lista de produtos. Começa com uma conversa sobre o que precisa ser protegido, construído e compartilhado.",
          "Sem essa conversa, o patrimônio corre o risco de crescer sem direção. Com ela, cada escolha passa a responder a uma intenção real.",
        ],
      },
      {
        heading: "Objetivos não vivem em planilhas",
        paragraphs: [
          "Eles mudam com a família, com o trabalho e com a maneira como cada pessoa deseja usar o próprio tempo. Um planejamento consistente precisa reconhecer esse movimento.",
        ],
        pullQuote: "A carteira é um instrumento. A vida é o plano.",
      },
      {
        heading: "Uma estrutura para o que importa",
        paragraphs: [
          "Quando decisões financeiras e decisões de vida são observadas juntas, o patrimônio deixa de ser uma coleção de ativos e passa a funcionar como uma estrutura de possibilidades.",
        ],
      },
    ],
  },
];

export function getMonthlyLetter(slug: string) {
  return monthlyLetters.find((letter) => letter.slug === slug);
}
