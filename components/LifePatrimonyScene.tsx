"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/tracking";

export default function LifePatrimonyScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 65%",
        once: true,
        onEnter: () => trackEvent("manifesto_view"),
      });

      media.add(
        {
          desktop: "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (match) => {
          const { desktop } = match.conditions as { desktop: boolean };
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: desktop ? "top top" : "top 82%",
              end: desktop ? "bottom bottom" : "bottom 20%",
              scrub: desktop ? 1 : 0.65,
            },
          });

          const clock = { progress: 0 };

          timeline
            .to(clock, { progress: 1, duration: 1, ease: "none" }, 0)
            .fromTo(".life-scene__path--life", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.28, ease: "none" }, 0)
            .fromTo(
              ".life-scene__word",
              { clipPath: "inset(0 0 82% 0)", yPercent: 34 },
              { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 0.2, stagger: 0.01, ease: "power2.out" },
              0.02
            )
            .fromTo(".life-scene__path--wealth", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.26, ease: "none" }, 0.04)
            .fromTo(
              ".life-scene__support",
              { clipPath: "inset(0 100% 0 0)", xPercent: -5 },
              { clipPath: "inset(0 0% 0 0)", xPercent: 0, duration: 0.12, ease: "power2.out" },
              0.18
            )
            .to(".life-scene__drawing", { yPercent: -5, scale: 1.025, duration: 0.3, ease: "none" }, 0.7)
            .to(".life-scene__message", { yPercent: -4, scale: 0.985, duration: 0.3, ease: "none" }, 0.7);
        }
      );
    }, root);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="life-scene" id="origami" ref={root}>
      <div className="life-scene__stage">
        <svg
          className="life-scene__drawing life-scene__drawing--desktop"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            className="life-scene__path life-scene__path--life"
            pathLength="1"
            d="M-120 700 C 185 170, 520 145, 765 465 S 1130 930, 1510 250"
          />
          <path
            className="life-scene__path life-scene__path--wealth"
            pathLength="1"
            d="M1510 175 C 1190 760, 900 730, 790 455 S 335 50, -90 640"
          />
        </svg>
        <svg
          className="life-scene__drawing life-scene__drawing--mobile"
          viewBox="0 0 390 844"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="life-scene__path life-scene__path--life"
            pathLength="1"
            d="M28 -35 C 345 120, 42 302, 210 438 S 350 690, 48 890"
          />
          <path
            className="life-scene__path life-scene__path--wealth"
            pathLength="1"
            d="M360 -20 C 72 168, 346 330, 190 466 S 34 705, 338 900"
          />
        </svg>

        <div className="life-scene__message">
          <div className="life-scene__mask">
            <h2 className="life-scene__headline" aria-label="Patrimônio não existe separado da vida.">
              {"Patrimônio não existe separado da vida.".split(" ").map((word) => (
                <span className="life-scene__word" aria-hidden="true" key={word}>{word}&nbsp;</span>
              ))}
            </h2>
          </div>
          <p className="life-scene__support">
            Tempo, família, escolhas e futuro fazem parte da mesma estratégia.
          </p>
        </div>
      </div>
    </section>
  );
}
