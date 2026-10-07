"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  insightCategories,
  insights,
  latestMonthlyLetter,
  type Insight,
} from "@/data/insights";

type Filter = (typeof insightCategories)[number];

function InsightMeta({ insight }: { insight: Insight }) {
  return (
    <div className="insight-meta">
      <span>{insight.category}</span>
      <span>{insight.month} {insight.year}</span>
    </div>
  );
}

function EditorialLink({ insight, className = "" }: { insight: Insight; className?: string }) {
  return (
    <Link href={insight.href} className={`insight-link ${className}`}>
      <span>Ler insight</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default function InsightsHub() {
  const [activeCategory, setActiveCategory] = useState<Filter>("Todos");

  const filteredInsights = useMemo(() => {
    return insights.filter((insight) => {
      if (insight.id === latestMonthlyLetter.id) return false;
      return activeCategory === "Todos" || insight.category === activeCategory;
    });
  }, [activeCategory]);

  const lead = filteredInsights[0];
  const secondary = filteredInsights.slice(1, 3);
  const archive = filteredInsights.slice(3);

  return (
    <>
      <section className="insights-hero section-shell" aria-labelledby="insights-title">
        <div className="insights-hero__copy">
          <div className="insight-meta insight-meta--hero">
            <span>Carta Mensal</span>
            <span>{latestMonthlyLetter.month} {latestMonthlyLetter.year}</span>
          </div>
          <h1 id="insights-title">{latestMonthlyLetter.title}</h1>
          <p>{latestMonthlyLetter.excerpt}</p>
          <Link href={latestMonthlyLetter.href} className="button button--blue">
            Ler a carta <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link href={latestMonthlyLetter.href} className="insights-hero__cover" aria-label={`Ler ${latestMonthlyLetter.title}`}>
          <Image
            src={latestMonthlyLetter.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 47vw"
            preload
          />
          <span className="insights-hero__edition">Edição {latestMonthlyLetter.month} / {latestMonthlyLetter.year}</span>
        </Link>
      </section>

      <section className="insights-index section-shell" aria-labelledby="insights-index-title">
        <div className="insights-index__heading">
          <div>
            <span className="insights-eyebrow">Origami Insights</span>
            <h2 id="insights-index-title">Ideias para decisões que continuam fazendo sentido.</h2>
          </div>
          <p>Perspectivas sobre patrimônio, comportamento e os caminhos que conectam o presente ao que vem depois.</p>
        </div>

        <div className="insights-filters" role="group" aria-label="Filtrar insights por categoria">
          {insightCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={category === activeCategory ? "is-active" : ""}
              aria-pressed={category === activeCategory}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="insights-results" aria-live="polite">
          <div className="insights-results__label">
            <span>{activeCategory}</span>
            <span>{filteredInsights.length} {filteredInsights.length === 1 ? "leitura" : "leituras"}</span>
          </div>

          {lead ? (
            <>
              <div className="insights-editorial-lead" id={lead.slug}>
                <Link href={lead.href} className="insights-editorial-lead__image" aria-label={`Ler ${lead.title}`}>
                  <Image src={lead.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 58vw" />
                </Link>
                <div className="insights-editorial-lead__copy">
                  <InsightMeta insight={lead} />
                  <h3>{lead.title}</h3>
                  <p>{lead.excerpt}</p>
                  <EditorialLink insight={lead} />
                </div>
              </div>

              {secondary.length > 0 && (
                <div className="insights-secondary">
                  {secondary.map((insight, index) => (
                    <article className={`insights-secondary__item insights-secondary__item--${index + 1}`} id={insight.slug} key={insight.id}>
                      <Link href={insight.href} className="insights-secondary__image" aria-label={`Ler ${insight.title}`}>
                        <Image src={insight.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 32vw" />
                      </Link>
                      <InsightMeta insight={insight} />
                      <h3>{insight.title}</h3>
                      <p>{insight.excerpt}</p>
                      <EditorialLink insight={insight} />
                    </article>
                  ))}
                </div>
              )}

              {archive.length > 0 && (
                <div className="insights-archive" id="arquivo">
                  <div className="insights-archive__heading">
                    <span>Arquivo</span>
                    <span>Perspectivas anteriores</span>
                  </div>
                  {archive.map((insight) => (
                    <article className="insights-archive__item" id={insight.slug} key={insight.id}>
                      <div className="insights-archive__date">
                        <span>{insight.month}</span>
                        <span>{insight.year}</span>
                      </div>
                      <Link href={insight.href} className="insights-archive__image" aria-label={`Ler ${insight.title}`}>
                        <Image src={insight.coverImage} alt="" fill sizes="160px" />
                      </Link>
                      <div className="insights-archive__copy">
                        <span>{insight.category}</span>
                        <h3>{insight.title}</h3>
                        <p>{insight.excerpt}</p>
                      </div>
                      <EditorialLink insight={insight} className="insights-archive__link" />
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="insights-empty">Novas leituras desta categoria serão publicadas em breve.</p>
          )}
        </div>
      </section>
    </>
  );
}
