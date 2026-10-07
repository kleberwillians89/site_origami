"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteImage from "@/components/SiteImage";
import { monthlyLetters } from "@/data/monthlyLetters";
import { trackEvent } from "@/lib/tracking";

export default function MonthlyLetterScene() {
  const root = useRef<HTMLElement>(null);
  const feature = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLetter = monthlyLetters[activeIndex];

  const positionIndicator = useCallback((index: number, immediate = false) => {
    const button = buttons.current[index];
    if (!button || !indicator.current) return;
    gsap.to(indicator.current, {
      x: button.offsetLeft,
      width: button.offsetWidth,
      duration: immediate ? 0 : 0.55,
      ease: "power3.inOut",
    });
  }, []);

  function selectLetter(index: number) {
    if (index === activeIndex || !feature.current) return;
    activeIndexRef.current = index;
    positionIndicator(index);
    trackEvent("monthly_letter_select", {
      slug: monthlyLetters[index].slug,
      month: monthlyLetters[index].shortMonth,
      year: monthlyLetters[index].year,
    });

    gsap.to(feature.current, {
      clipPath: "inset(0 0 100% 0)",
      y: -12,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index);
        requestAnimationFrame(() => {
          if (!feature.current) return;
          gsap.fromTo(
            feature.current,
            { clipPath: "inset(100% 0 0 0)", y: 12 },
            { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.55, ease: "power3.out" }
          );
        });
      },
    });
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      positionIndicator(0, true);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 65%",
        once: true,
        onEnter: () => trackEvent("monthly_letter_view"),
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".letter-scene__feature",
          { clipPath: "inset(0 22% 0 0)", y: 12 },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          }
        );
      });
    }, root);

    const handleResize = () => positionIndicator(activeIndexRef.current, true);
    window.addEventListener("resize", handleResize);
    return () => {
      context.revert();
      media.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [positionIndicator]);

  return (
    <section className="letter-scene section-shell" id="carta-mensal" ref={root}>
      <h2>Carta Mensal</h2>

      <div className="letter-scene__body">
        <div className="letter-scene__feature" ref={feature}>
          <div className="letter-scene__date">
            <span>{activeLetter.month}</span>
            <span>{activeLetter.year}</span>
          </div>
          <div className="letter-scene__content">
            <h3>{activeLetter.title}</h3>
            <p>{activeLetter.excerpt}</p>
            <div className="letter-scene__links">
              <Link
                href={`/carta/${activeLetter.slug}`}
                className="text-link"
                onClick={() => trackEvent("monthly_letter_click", { slug: activeLetter.slug })}
              >
                Ler a carta <span aria-hidden="true">→</span>
              </Link>
              <Link href="/insights" className="letter-scene__all">
                Ver todos os insights
              </Link>
            </div>
          </div>
          <div className="letter-scene__cover">
            <SiteImage media={activeLetter.cover} sizes="(max-width: 768px) 100vw, 48vw" />
          </div>
        </div>

        <div className="letter-scene__index" aria-label="Selecionar edição da Carta Mensal">
          <span className="letter-scene__indicator" ref={indicator} aria-hidden="true" />
          {monthlyLetters.map((letter, index) => (
            <button
              type="button"
              ref={(node) => { buttons.current[index] = node; }}
              className={index === activeIndex ? "is-active" : ""}
              aria-pressed={index === activeIndex}
              onClick={() => selectLetter(index)}
              key={letter.slug}
            >
              {letter.shortMonth}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
