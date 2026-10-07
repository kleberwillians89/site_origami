"use client";

import AnimatedBrand from "@/components/AnimatedBrand";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

export default function Header() {
  return (
    <header className="header">
      <a
        href="#top"
        className="header__brand"
        aria-label="Origami Investimentos — voltar ao início"
      >
        <AnimatedBrand />
      </a>
      <nav className="header__nav" aria-label="Navegação principal">
        <a href="#origami">A Origami</a>
        <a href="#folding-tomorrow">Folding Tomorrow</a>
        <a href="#carta-mensal">Carta Mensal</a>
        <Link
          href="/diagnostico"
          className="header__cta"
          onClick={() => trackEvent("home_diagnostic_click", { placement: "header" })}
        >
          Vamos conversar
        </Link>
      </nav>
    </header>
  );
}
