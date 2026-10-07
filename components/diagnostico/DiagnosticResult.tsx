import Link from "next/link";
import { getOrigamiWhatsappLink } from "@/lib/whatsapp";

type Props = {
  answers: Record<string, string[]>;
};

type ThemeRule = {
  label: string;
  terms: string[];
};

const THEME_RULES: ThemeRule[] = [
  { label: "Organização", terms: ["organizar", "estrutura clara", "clareza"] },
  { label: "Família", terms: ["família", "sucessão", "filhos"] },
  { label: "Tempo", terms: ["menos tempo", "delegar", "com apoio"] },
  { label: "Proteção", terms: ["proteger", "proteção patrimonial"] },
  { label: "Projetos", terms: ["projetos pessoais", "negócio", "imóvel"] },
  { label: "Continuidade", terms: ["próximos anos", "aposentadoria", "longo prazo"] },
  { label: "Liberdade", terms: ["liberdade", "qualidade de vida"] },
  { label: "Horizonte global", terms: ["internacional", "mudança de país"] },
];

function deriveThemes(answers: Record<string, string[]>) {
  const selectedText = Object.values(answers).flat().join(" ").toLocaleLowerCase("pt-BR");
  const themes = THEME_RULES
    .filter((rule) => rule.terms.some((term) => selectedText.includes(term)))
    .map((rule) => rule.label)
    .slice(0, 3);

  return themes.length >= 3 ? themes : [...new Set([...themes, "Clareza", "Acompanhamento", "Continuidade"])].slice(0, 3);
}

export default function DiagnosticResult({ answers }: Props) {
  const whatsappLink = getOrigamiWhatsappLink(
    "Olá! Fiz o diagnóstico patrimonial da Origami e gostaria de conversar."
  );
  const themes = deriveThemes(answers);
  const themeSentence = `${themes.slice(0, -1).join(", ")} e ${themes.at(-1)} aparecem como pontos importantes no seu momento.`;

  return (
    <div className="diagnostic__screen diagnostic__screen--result">
      <div className="diagnostic__titleMask">
        <h2 className="diagnostic__title diagnostic__revealTitle" tabIndex={-1}>
          Seu patrimônio não precisa responder a uma única pergunta.
        </h2>
      </div>

      <p className="diagnostic__text diagnostic__revealText">
        Pelas suas respostas, existem diferentes decisões conectadas entre si. {themeSentence}
      </p>

      <div className="diagnostic__themes" aria-label="Assuntos presentes nas suas respostas">
        {themes.map((theme) => <span className="diagnostic__revealTheme" key={theme}>{theme}</span>)}
      </div>

      <p className="diagnostic__text diagnostic__text--emphasis diagnostic__revealText">
        É justamente dessa visão que nasce o Folding Tomorrow.
      </p>

      <div className="diagnostic__actions diagnostic__revealAction">
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--blue"
          >
            Conversar com a Origami
          </a>
        ) : (
          // TODO: apontar para o canal de contato real assim que
          // NEXT_PUBLIC_ORIGAMI_WHATSAPP estiver configurado no ambiente.
          <a href="#contato" className="button button--blue">
            Conversar com a Origami
          </a>
        )}

        <Link href="/" className="button button--ghost">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}
