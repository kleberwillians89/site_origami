export default function Hero() {
  return (
    <section
      className="hero"
      id="top"
    >
      <div className="hero__copy">
        <p className="hero__label">
          CONSULTORIA INDEPENDENTE
        </p>

        <h1>
          Para quem já construiu patrimônio,
          <span>
            o próximo passo é decidir melhor.
          </span>
        </h1>

        <p className="hero__description">
          Estratégia patrimonial para pessoas e
          famílias que buscam clareza, tempo e
          decisões conectadas à vida que desejam
          construir.
        </p>

        <div className="hero__actions">
          <a
            href="#diagnostico"
            className="button button--blue"
          >
            Entender meu momento patrimonial
            <span>↗</span>
          </a>

          <a
            href="#origami"
            className="button button--ghost"
          >
            Conhecer a Origami
          </a>
        </div>

        <div className="hero__minimum">
          <span />

          Patrimônios financeiros a partir de
          R$ 1 milhão
        </div>
      </div>

      <div className="hero__media">
        <div className="hero__photo">
          <img
            src="/assets/images/hero/lifestyle-01.jpg"
            alt=""
          />

          <div className="hero__photoFilter" />
        </div>

        <div className="hero__fold" />

        <div className="hero__caption">
          <small>
            FOLDING TOMORROW
          </small>

          <p>
            Patrimônio como instrumento para
            transformar planejamento em
            possibilidades.
          </p>
        </div>
      </div>
    </section>
  );
}