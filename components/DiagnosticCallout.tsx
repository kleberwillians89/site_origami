"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOrigamiWhatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";

export default function DiagnosticCallout() {
  const root = useRef<HTMLElement>(null);
  const whatsappLink = getOrigamiWhatsappLink(
    "Olá! Gostaria de conversar com a Origami sobre meu patrimônio."
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".callout__inner",
          { clipPath: "inset(0 0 18% 0)", y: 18 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 86%", once: true },
          }
        );
      });
    }, root);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="callout section-shell" id="diagnostico" ref={root}>
      <div className="callout__inner">
        <h2>Algumas decisões começam antes do investimento.</h2>
        <p>
          Entender como patrimônio, objetivos e tempo se conectam é um bom
          lugar para começar.
        </p>
        <Link
          href="/diagnostico"
          className="button button--blue"
          onClick={() => trackEvent("home_diagnostic_click", { placement: "closing" })}
        >
          Entender meu patrimônio <span aria-hidden="true">↗</span>
        </Link>
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="callout__alternative"
            onClick={() => trackEvent("home_whatsapp_click")}
          >
            Conversar com a Origami <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
