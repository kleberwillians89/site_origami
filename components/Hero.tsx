"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteAssets } from "@/lib/siteAssets";
import { trackEvent } from "@/lib/tracking";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    let rotation: number | undefined;

    const startRotation = () => {
      if (rotation !== undefined) return;
      rotation = window.setInterval(() => {
        setActiveMedia((current) => (current + 1) % siteAssets.heroMedia.length);
      }, 5_000);
    };

    const introIsActive = document.querySelector(".intro");

    if (introIsActive) {
      window.addEventListener("origami:intro-complete", startRotation, { once: true });
    } else {
      startRotation();
    }

    return () => {
      window.removeEventListener("origami:intro-complete", startRotation);
      if (rotation !== undefined) window.clearInterval(rotation);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "bottom 48%",
              end: "bottom top",
              scrub: 0.65,
            },
          });

          timeline
            .to(".hero__copy", { yPercent: -7, opacity: 0.72, ease: "none", duration: 1 }, 0)
            .to(
              ".hero__media",
              {
                scale: 0.96,
                clipPath: "polygon(3% 3%, 97% 3%, 97% 96%, 13% 96%, 3% 85%)",
                ease: "none",
                duration: 1,
              },
              0
            );
        }
      );
    }, root);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="hero section-shell" id="top" ref={root}>
      <div className="hero__copy">
        <h1>
          Para quem já construiu patrimônio,
          <span>o próximo passo é decidir melhor.</span>
        </h1>
        <p className="hero__description">
          Estratégia patrimonial para pessoas e famílias que buscam clareza,
          tempo e decisões conectadas à vida que desejam construir.
        </p>
        <div className="hero__actions">
          <Link
            href="/diagnostico"
            className="button button--blue"
            onClick={() => trackEvent("home_diagnostic_click", { placement: "hero" })}
          >
            Entender meu patrimônio <span aria-hidden="true">↗</span>
          </Link>
          <a
            href="#origami"
            className="text-link"
            onClick={() => trackEvent("hero_about_click")}
          >
            Conhecer a Origami <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="hero__media">
        <div className="hero__mediaViewport">
          {siteAssets.heroMedia.map((item, index) => {
            const isActive = index === activeMedia;

            return (
              <div
                className={`hero__mediaItem${isActive ? " hero__mediaItem--active" : ""}`}
                aria-hidden={!isActive}
                key={item.src}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={isActive ? item.alt : ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    preload={index === 0}
                    loading={index === 0 ? undefined : "eager"}
                    style={{ objectPosition: item.position }}
                  />
                ) : (
                  <video
                    autoPlay={isActive}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster={item.poster}
                    aria-label={item.alt}
                    style={{ objectPosition: item.position }}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
            );
          })}
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__mediaIndicator" aria-hidden="true">
          {siteAssets.heroMedia.map((item, index) => (
            <span
              className={index === activeMedia ? "is-active" : ""}
              key={item.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
