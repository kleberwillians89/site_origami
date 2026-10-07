export default function Header() {
  return (
    <header className="header">
      <a
        href="#top"
        className="header__brand"
        aria-label="Origami Investimentos"
      >
        <img
          src="/assets/brand/logo-horizontal.png"
          alt="Origami Investimentos"
        />
      </a>

      <nav className="header__nav">
        <a href="#origami">A Origami</a>

        <a href="#metodo">
          Folding Tomorrow
        </a>

        <a href="#insights">
          Insights
        </a>

        <a href="#cartas">
          Carta Mensal
        </a>

        <a
          href="#diagnostico"
          className="header__cta"
        >
          Vamos conversar
        </a>
      </nav>
    </header>
  );
}