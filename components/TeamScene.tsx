"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SiteImage from "@/components/SiteImage";
import { siteAssets, type SiteMedia } from "@/lib/siteAssets";
import { trackEvent } from "@/lib/tracking";

type Partner = {
  className: string;
  name: string;
  role: string;
  statement: string;
  media: SiteMedia;
};

const partners: Partner[] = [
  {
    className: "paulo",
    name: "Paulo Sato",
    role: "CEO · CFP®",
    statement: "Visão institucional, cultura e decisões estratégicas.",
    media: siteAssets.paulo,
  },
  {
    className: "lucas",
    name: "Lucas Devito",
    role: "Diretor de Consultoria · CFP®",
    statement: "Planejamento familiar, acompanhamento e proximidade com o cliente.",
    media: siteAssets.lucas,
  },
  {
    className: "andre",
    name: "André Kalim",
    role: "Estrategista Chefe · CFA · CFP®",
    statement: "Estratégia, risco e leitura de mercado.",
    media: siteAssets.andre,
  },
];

export default function TeamScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 65%",
        once: true,
        onEnter: () => trackEvent("team_view"),
      });

      media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.current!.querySelector<HTMLElement>(".team-scene__stage")!;
        const sizeScene = () => {
          const stageHeight = stage.offsetHeight;
          gsap.set(root.current, { height: stageHeight + window.innerHeight * 1.4 });
          gsap.set(stage, { top: Math.min(0, window.innerHeight - stageHeight) });
        };
        sizeScene();
        gsap.set(".team-scene__partners", { autoAlpha: 0 });
        gsap.set(".team-scene__portrait", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".team-scene__portrait figcaption", { autoAlpha: 0, y: 18 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onRefreshInit: sizeScene,
          },
        });
        const clock = { progress: 0 };

        gsap.fromTo(".team-scene__headline", { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
        });

        timeline
          .to(clock, { progress: 1, duration: 1, ease: "none" }, 0)
          .fromTo(".team-scene__main", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.04)
          // Natural-size group photograph remains fully rendered from 20% to 55%.
          .to(".team-scene__main", { autoAlpha: 0, duration: 0.13, ease: "power2.inOut" }, 0.55)
          .to(".team-scene__partners", { autoAlpha: 1, duration: 0.01 }, 0.57)
          .to(".team-scene__portrait", { clipPath: "inset(0 0% 0 0)", duration: 0.09, stagger: 0.02, ease: "power2.out" }, 0.57)
          .to(".team-scene__portrait figcaption", { autoAlpha: 1, y: 0, duration: 0.06, stagger: 0.02, ease: "power2.out" }, 0.6)
          // Portraits and captions hold their completed state from 70% to 95%.
          .to(".team-scene__stage", { y: -14, duration: 0.05, ease: "none" }, 0.95);
      });

      media.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".team-scene__main",
          { clipPath: "inset(0 0 18% 0)", y: 18 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            scrollTrigger: { trigger: ".team-scene__main", start: "top 88%", end: "top 68%", scrub: 0.65 },
          }
        );

        gsap.utils.toArray<HTMLElement>(".team-scene__portrait").forEach((portrait) => {
          gsap.fromTo(
            portrait,
            { clipPath: "inset(0 0 22% 0)", y: 18 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              scrollTrigger: { trigger: portrait, start: "top 90%", end: "top 68%", scrub: 0.65 },
            }
          );
        });
      });
    }, root);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="team-scene" id="pessoas" ref={root}>
      <div className="team-scene__stage">
        <h2 className="team-scene__headline">Patrimônio é uma relação de confiança.</h2>

        <div className="team-scene__showcase">
          <figure className="team-scene__main">
            <Image
              src={siteAssets.teamMain.src}
              alt={siteAssets.teamMain.alt}
              width={4032}
              height={3024}
              sizes="(max-width: 768px) calc(100vw - 24px), 94vw"
              className="team-scene__mainImage"
            />
          </figure>

          <div className="team-scene__partners">
            {partners.map((partner) => (
              <figure
                className={`team-scene__portrait team-scene__portrait--${partner.className}`}
                tabIndex={0}
                key={partner.name}
              >
                <SiteImage
                  media={partner.media}
                  sizes="(max-width: 768px) calc(100vw - 24px), 34vw"
                  className="team-scene__portraitImage"
                />
                <figcaption>
                  <strong>{partner.name}</strong>
                  <span>{partner.role}</span>
                  <p>{partner.statement}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
