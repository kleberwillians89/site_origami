import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/lib/siteAssets";
import { complianceLinks, siteLinks } from "@/lib/siteLinks";

export default function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer__main">
        <Link href="/" className="footer__brand" aria-label="Origami Investimentos — início">
          <Image src={siteAssets.brand.mark} alt="" aria-hidden="true" width={30} height={29} />
          <span>Origami Investimentos</span>
        </Link>
        <nav className="footer__nav" aria-label="Rodapé">
          <Link href="/#origami">A Origami</Link>
          <Link href="/#folding-tomorrow">Folding Tomorrow</Link>
          <Link href="/#carta-mensal">Carta Mensal</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/diagnostico">Diagnóstico</Link>
        </nav>
        <div className="footer__contact">
          <a href={siteLinks.email}>atendimento@origamiinvestimentos.com</a>
          <nav className="footer__social" aria-label="Redes sociais e contato">
            <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </nav>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Origami Investimentos. Todos os direitos reservados.</p>
        <details className="footer__compliance">
          <summary>Compliance</summary>
          <nav aria-label="Documentos de compliance">
            {complianceLinks.map(([label, href]) => (
              <a href={href} key={href} target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
          </nav>
        </details>
      </div>
    </footer>
  );
}
