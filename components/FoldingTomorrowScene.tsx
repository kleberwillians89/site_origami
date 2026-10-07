"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteImage from "@/components/SiteImage";
import { siteAssets } from "@/lib/siteAssets";
import { trackEvent } from "@/lib/tracking";

const statements = [
  { title: "Clareza para decidir.", support: "Um patrimônio precisa saber para onde está indo." },
  { title: "Estrutura para acompanhar.", support: "Decisões diferentes acontecem em tempos diferentes." },
  { title: "Espaço para viver.", support: "Planejamento também é poder escolher." },
  { title: "Continuidade para o que vem depois.", support: "Família, projetos e futuro fazem parte da mesma estrutura." },
];

export default function FoldingTomorrowScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 65%",
        once: true,
        onEnter: () => trackEvent("folding_view"),
      });

      media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.set(".folding-scene__moment:not(.folding-scene__moment--1)", { autoAlpha: 0, yPercent: 9 });
          gsap.set(".folding-scene__image--one", { clipPath: "inset(0 100% 0 0)" });
          gsap.set(".folding-scene__image--two", { clipPath: "inset(100% 0 0 0)" });
          gsap.set(".folding-scene__closing", { autoAlpha: 0, yPercent: 8 });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          const clock = { progress: 0 };

          timeline
            .to(clock, { progress: 1, duration: 1, ease: "none" }, 0)
            .fromTo(
              ".folding-scene__moment--1",
              { autoAlpha: 0, yPercent: 8, clipPath: "inset(0 0 100% 0)" },
              { autoAlpha: 1, yPercent: 0, clipPath: "inset(0 0 0% 0)", duration: 0.06, ease: "power2.out" },
              0
            )
            .fromTo(
            ".folding-scene__path",
            { strokeDashoffset: 1600 },
            { strokeDashoffset: 0, ease: "none", duration: 0.26 }, 0.04
          );

          timeline
            .to(".folding-scene__image--one", { clipPath: "inset(0 0% 0 0)", duration: 0.16, ease: "power2.out" }, 0.06)
            .fromTo(".folding-scene__image--one img", { scale: 1.06 }, { scale: 1, duration: 0.24, ease: "none" }, 0.06)
            .to(".folding-scene__moment--1", { autoAlpha: 0, yPercent: -4, duration: 0.04, ease: "power2.inOut" }, 0.16)
            .to(".folding-scene__moment--2", { autoAlpha: 1, yPercent: 0, duration: 0.08, ease: "power2.out" }, 0.2)
            .to(".folding-scene__image--two", { clipPath: "inset(0% 0 0 0)", duration: 0.08, ease: "power2.out" }, 0.2)
            .fromTo(".folding-scene__image--two img", { scale: 1.08 }, { scale: 1, duration: 0.08, ease: "none" }, 0.2)
            .to(".folding-scene__image--two", { "--reading-overlay": 0.28, duration: 0.08 }, 0.2)
            // Structure finishes entering before its reading hold; Space follows its exit.
            .to(".folding-scene__moment--2", { autoAlpha: 0, yPercent: -4, duration: 0.06 }, 0.48)
            .to(".folding-scene__image--two", { "--reading-overlay": 0, duration: 0.06 }, 0.48)
            .to(".folding-scene__moment--3", { autoAlpha: 1, yPercent: 0, duration: 0.08, ease: "power2.out" }, 0.54)
            .to(".folding-scene__image--one", { "--reading-overlay": 0.28, duration: 0.08 }, 0.54)
            .to(".folding-scene__moment--3", { autoAlpha: 0, yPercent: -4, duration: 0.06 }, 0.8)
            .to(".folding-scene__image--one", { "--reading-overlay": 0, clipPath: "inset(0 0 100% 0)", duration: 0.06, ease: "power2.inOut" }, 0.8)
            .to(".folding-scene__moment--4", { autoAlpha: 1, yPercent: 0, duration: 0.04, ease: "power2.out" }, 0.86)
            .to(".folding-scene__closing", { autoAlpha: 1, yPercent: 0, duration: 0.04, ease: "power2.out" }, 0.96)
            .to(".folding-scene__moment--4", { autoAlpha: 0, duration: 0.04 }, 0.96);
      });

      media.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".folding-scene__path", { strokeDashoffset: 1600 }, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 82%", end: "bottom 25%", scrub: .5 },
        });
        gsap.utils.toArray<HTMLElement>(".folding-scene__moment, .folding-scene__image, .folding-scene__closing").forEach((element) => {
          gsap.fromTo(element, { clipPath: "inset(0 0 65% 0)", y: 18 }, {
            clipPath: "inset(0 0 0% 0)", y: 0,
            scrollTrigger: { trigger: element, start: "top 88%", end: "top 68%", scrub: .65 },
          });
        });
      });
    }, root);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="folding-scene" id="folding-tomorrow" ref={root}>
      <div className="folding-scene__stage">
        <svg className="folding-scene__line folding-scene__line--desktop" viewBox="0 0 1440 820" preserveAspectRatio="none" aria-hidden="true">
          <path className="folding-scene__path" pathLength="1" d="M170 450 C 340 430, 490 505, 650 470 S 780 420, 845 330 S 1120 135, 1480 185" />
        </svg>
        <svg className="folding-scene__line folding-scene__line--mobile" viewBox="0 0 390 900" preserveAspectRatio="none" aria-hidden="true">
          <path className="folding-scene__path" pathLength="1" d="M368 -30 C 360 125, 338 255, 304 390 S 345 560, 175 680 S 92 825, 328 940" />
        </svg>

        <div className="folding-scene__image folding-scene__image--one">
          <SiteImage media={siteAssets.folding.first} sizes="(max-width: 768px) 78vw, 40vw" />
        </div>
        <div className="folding-scene__image folding-scene__image--two">
          <SiteImage media={siteAssets.folding.second} sizes="(max-width: 768px) 86vw, 37vw" />
        </div>

        {statements.map((statement, index) => (
          <div className={`folding-scene__moment folding-scene__moment--${index + 1}`} key={statement.title}>
            <p>{index === 0 ? <>Clareza<br />para decidir.</> : statement.title}</p>
            <span>{statement.support}</span>
          </div>
        ))}

        <div className="folding-scene__closing">
          <strong>Folding Tomorrow.</strong>
          <span>Uma forma de conectar patrimônio às decisões que constroem o amanhã.</span>
        </div>
      </div>
    </section>
  );
}
