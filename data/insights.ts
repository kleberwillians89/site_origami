import { siteAssets } from "@/lib/siteAssets";
import { monthlyLetters } from "@/data/monthlyLetters";

export const insightCategories = [
  "Todos",
  "Carta Mensal",
  "Folding Tomorrow",
  "ETF",
  "Goal Based Investing",
  "Vieses Comportamentais",
] as const;

export type InsightCategory = Exclude<(typeof insightCategories)[number], "Todos">;

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  month: string;
  year: number;
  author: string;
  readingTime: string;
  coverImage: string;
  featured: boolean;
  publishedAt: string;
  href: string;
};

const letterInsights: Insight[] = monthlyLetters.map((letter) => ({
  id: letter.id,
  slug: letter.slug,
  title: letter.title,
  excerpt: letter.excerpt,
  category: letter.category,
  month: letter.month,
  year: letter.year,
  author: letter.author,
  readingTime: letter.readingTime,
  coverImage: letter.coverImage,
  featured: letter.featured,
  publishedAt: letter.publishedAt,
  href: `/carta/${letter.slug}`,
}));

const editorialInsights: Insight[] = [
  {
    id: "insight-folding-continuity",
    slug: "patrimonio-que-atravessa-geracoes",
    title: "O que faz um patrimônio atravessar gerações?",
    excerpt: "Continuidade não é repetir decisões. É criar uma estrutura capaz de acomodar novas pessoas, contextos e projetos.",
    category: "Folding Tomorrow",
    month: "Agosto",
    year: 2026,
    author: "Origami Investimentos",
    readingTime: "5 min de leitura",
    coverImage: "/assets/images/hero/lifestyle-01-clean.png",
    featured: true,
    publishedAt: "2026-08-18",
    href: "/insights#patrimonio-que-atravessa-geracoes",
  },
  {
    id: "insight-etf-simplicity",
    slug: "etfs-simplicidade-com-criterio",
    title: "ETFs: simplicidade também exige critério.",
    excerpt: "Custos, liquidez e diversificação importam — mas só fazem sentido quando o veículo ocupa um papel claro na estratégia.",
    category: "ETF",
    month: "Agosto",
    year: 2026,
    author: "Equipe Origami",
    readingTime: "6 min de leitura",
    coverImage: siteAssets.insights.etfs,
    featured: true,
    publishedAt: "2026-08-11",
    href: "/insights#etfs-simplicidade-com-criterio",
  },
  {
    id: "insight-goals-time",
    slug: "cada-objetivo-tem-seu-tempo",
    title: "Cada objetivo tem seu próprio tempo.",
    excerpt: "Separar horizontes transforma uma carteira única em uma arquitetura de decisões mais claras.",
    category: "Goal Based Investing",
    month: "Julho",
    year: 2026,
    author: "Equipe Origami",
    readingTime: "5 min de leitura",
    coverImage: "/assets/images/hero/lifestyle-03.jpg",
    featured: false,
    publishedAt: "2026-07-22",
    href: "/insights#cada-objetivo-tem-seu-tempo",
  },
  {
    id: "insight-bias-information",
    slug: "informacao-nao-e-clareza",
    title: "Mais informação não significa mais clareza.",
    excerpt: "Como o excesso de estímulos aumenta a sensação de urgência e enfraquece decisões de longo prazo.",
    category: "Vieses Comportamentais",
    month: "Julho",
    year: 2026,
    author: "Equipe Origami",
    readingTime: "4 min de leitura",
    coverImage: siteAssets.insights.information,
    featured: false,
    publishedAt: "2026-07-10",
    href: "/insights#informacao-nao-e-clareza",
  },
  {
    id: "insight-folding-decisions",
    slug: "decisoes-que-continuam-fazendo-sentido",
    title: "Decisões que continuam fazendo sentido.",
    excerpt: "Uma estratégia resiliente não tenta acertar todos os cenários. Ela preserva possibilidades entre eles.",
    category: "Folding Tomorrow",
    month: "Junho",
    year: 2026,
    author: "Origami Investimentos",
    readingTime: "6 min de leitura",
    coverImage: "/assets/images/hero/lifestyle-02.jpg",
    featured: false,
    publishedAt: "2026-06-17",
    href: "/insights#decisoes-que-continuam-fazendo-sentido",
  },
];

export const insights = [...letterInsights, ...editorialInsights].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export const latestMonthlyLetter = letterInsights[0];
