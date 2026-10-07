type Props = {
  onStart: () => void;
};

export default function DiagnosticIntroScreen({ onStart }: Props) {
  return (
    <div className="diagnostic__screen diagnostic__screen--intro">
      <div className="diagnostic__titleMask">
        <h1 className="diagnostic__title diagnostic__revealTitle" tabIndex={-1}>Vamos começar por você.</h1>
      </div>

      <p className="diagnostic__text diagnostic__revealText">
        Algumas decisões patrimoniais começam muito antes de escolher um
        investimento.
      </p>

      <button type="button" className="button button--blue diagnostic__revealAction" onClick={onStart}>
        Começar <span aria-hidden="true">→</span>
      </button>

      <p className="diagnostic__meta diagnostic__revealMeta">5 perguntas · cerca de 2 minutos</p>
    </div>
  );
}
