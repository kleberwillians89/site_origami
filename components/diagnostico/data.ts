export type DiagnosticQuestion = {
  id: string;
  title: string;
  multiple?: boolean;
  options: string[];
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "atencao",
    title: "Hoje, o que mais pede sua atenção?",
    options: [
      "Organizar melhor meu patrimônio",
      "Proteger o que já construí",
      "Planejar os próximos anos",
      "Preparar decisões para minha família",
      "Ter mais clareza para decidir",
      "Dedicar menos tempo à gestão financeira",
    ],
  },
  {
    id: "acompanhamento",
    title: "Como essas decisões são acompanhadas hoje?",
    options: [
      "Eu mesmo acompanho",
      "Tenho apoio do meu banco ou assessor",
      "Já trabalho com uma consultoria",
      "Meu patrimônio está dividido entre diferentes instituições",
      "Ainda não existe uma estrutura clara",
      "Prefiro conversar sobre isso depois",
    ],
  },
  {
    id: "prioridade",
    title: "Quando você pensa nos próximos anos, o que ganha mais importância?",
    options: [
      "Liberdade e qualidade de vida",
      "Família e sucessão",
      "Proteção patrimonial",
      "Projetos pessoais",
      "Organização financeira",
      "Patrimônio internacional",
      "Um pouco de tudo isso",
    ],
  },
  {
    id: "tempo",
    title: "Quanto tempo você gostaria de dedicar a essas decisões?",
    options: [
      "Quero participar de cada decisão",
      "Quero acompanhar, mas com apoio",
      "Quero delegar mais sem perder visibilidade",
      "Ainda não sei",
    ],
  },
  {
    id: "horizonte",
    title: "Existe alguma decisão importante no horizonte?",
    multiple: true,
    options: [
      "Mudança profissional",
      "Venda ou entrada em um negócio",
      "Aposentadoria",
      "Intercâmbio ou estudos dos filhos",
      "Sucessão familiar",
      "Compra de imóvel",
      "Mudança de país",
      "Nenhuma decisão específica agora",
    ],
  },
];
