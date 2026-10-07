import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/lib/siteAssets";
import AnimatedBrand from "@/components/AnimatedBrand";

export function EditorialHeader() {
  return (
    <header className="editorial-header section-shell">
      <Link href="/" className="editorial-header__brand" aria-label="Origami Investimentos — início">
        <AnimatedBrand />
      </Link>
      <nav className="editorial-header__nav" aria-label="Navegação editorial">
        <Link href="/">Início</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/diagnostico" className="editorial-header__cta">Vamos conversar</Link>
      </nav>
    </header>
  );
}

export function EditorialFooter() {
  return (
    <footer className="editorial-footer section-shell">
      <div className="editorial-footer__brand">
        <Image src={siteAssets.brand.mark} alt="" aria-hidden="true" width={28} height={28} />
        <span>Origami Investimentos</span>
      </div>
      <nav aria-label="Navegação de rodapé editorial">
        <Link href="/">Home</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/diagnostico">Diagnóstico</Link>
      </nav>
    </footer>
  );
}
