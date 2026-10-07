import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialFooter, EditorialHeader } from "@/components/EditorialChrome";
import { insights } from "@/data/insights";
import { getMonthlyLetter, monthlyLetters } from "@/data/monthlyLetters";

export const dynamicParams = false;

export function generateStaticParams() {
  return monthlyLetters.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/carta/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const letter = getMonthlyLetter(slug);
  if (!letter) return {};

  return {
    title: `${letter.title} | Carta Mensal Origami`,
    description: letter.excerpt,
    openGraph: {
      title: letter.title,
      description: letter.excerpt,
      type: "article",
      publishedTime: letter.publishedAt,
      authors: [letter.author],
      images: [],
    },
    twitter: {
      card: "summary",
      title: letter.title,
      description: letter.excerpt,
      images: [],
    },
  };
}

export default async function LetterPage({ params }: PageProps<"/carta/[slug]">) {
  const { slug } = await params;
  const letter = getMonthlyLetter(slug);
  if (!letter) notFound();

  const related = insights.filter((insight) => insight.slug !== letter.slug).slice(0, 3);

  return (
    <div className="editorial-page">
      <EditorialHeader />
      <main className="letter-reading">
        <header className="letter-reading__hero section-shell">
          <div className="letter-reading__intro">
            <Link href="/insights" className="letter-reading__back">← Voltar para Insights</Link>
            <div className="insight-meta insight-meta--letter">
              <span>Carta Mensal</span>
              <span>{letter.month} {letter.year}</span>
            </div>
            <h1>{letter.title}</h1>
            <p>{letter.excerpt}</p>
            <dl className="letter-reading__metadata">
              <div>
                <dt>Autoria</dt>
                <dd>{letter.author}</dd>
              </div>
              <div>
                <dt>Tempo de leitura</dt>
                <dd>{letter.readingTime}</dd>
              </div>
            </dl>
          </div>
          <figure className="letter-reading__cover">
            <Image src={letter.coverImage} alt={`Capa da Carta Mensal de ${letter.month} de ${letter.year}`} fill sizes="(max-width: 768px) 100vw, 42vw" preload />
          </figure>
        </header>

        <div className="letter-reading__body section-shell">
          <aside className="letter-reading__aside" aria-label="Informações da edição">
            <span>{letter.shortMonth} / {letter.year}</span>
            <p>Perspectivas mensais da Origami para decisões patrimoniais de longo prazo.</p>
          </aside>
          <article className="letter-reading__article">
            {letter.content.map((section, sectionIndex) => (
              <section key={`${letter.id}-${sectionIndex}`}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.pullQuote && <blockquote>{section.pullQuote}</blockquote>}
              </section>
            ))}
            <footer className="letter-reading__signature">
              <span>Origami Investimentos</span>
              <span>{letter.month} de {letter.year}</span>
            </footer>
          </article>
        </div>

        <section className="letter-related section-shell" aria-labelledby="related-title">
          <div className="letter-related__heading">
            <span>Continuar lendo</span>
            <h2 id="related-title">Outras perspectivas.</h2>
          </div>
          <div className="letter-related__grid">
            {related.map((insight) => (
              <article key={insight.id}>
                <Link href={insight.href} className="letter-related__image" aria-label={`Ler ${insight.title}`}>
                  <Image src={insight.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
                </Link>
                <div className="insight-meta">
                  <span>{insight.category}</span>
                  <span>{insight.month} {insight.year}</span>
                </div>
                <h3><Link href={insight.href}>{insight.title}</Link></h3>
              </article>
            ))}
          </div>
        </section>

        <section className="letter-conversation section-shell">
          <div>
            <span>Uma conversa pode organizar o próximo passo.</span>
            <h2>Como essas ideias encontram o seu patrimônio?</h2>
          </div>
          <Link href="/diagnostico" className="button button--blue">
            Conversar com a Origami <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
