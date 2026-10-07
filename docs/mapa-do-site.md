# Mapa do site — Origami Investimentos

Estrutura atual do projeto, organizada para apresentação à equipe.

```mermaid
flowchart TD
    SITE["Origami Investimentos"]
    SITE --> HOME["Home · /"]
    SITE --> INSIGHTS["Insights · /insights"]
    SITE --> DIAG["Diagnóstico · /diagnostico"]
    SITE --> FOOT["Rodapé e links externos"]

    HOME --> H1["1. Abertura e apresentação da marca"]
    HOME --> H2["2. A Origami: patrimônio e vida"]
    HOME --> H3["3. Folding Tomorrow: proposta de valor"]
    HOME --> H4["4. Destaque visual"]
    HOME --> H5["5. Pessoas e equipe"]
    HOME --> H6["6. Carta Mensal: edições em destaque"]
    HOME --> H7["7. Convite ao diagnóstico ou WhatsApp"]

    INSIGHTS --> I1["Carta mais recente, filtros e arquivo"]
    INSIGHTS --> I2["Temas: Carta Mensal, Folding Tomorrow, ETF,<br/>Goal Based Investing e Vieses Comportamentais"]
    I1 --> CARTA["Leitura da Carta Mensal · /carta/slug"]
    H6 --> CARTA
    CARTA --> C1["Edições: junho a setembro de 2026"]
    CARTA --> C2["Texto completo, autoria e conteúdos relacionados"]
    CARTA --> DIAG
    H7 --> DIAG

    DIAG --> D1["Introdução"]
    D1 --> D2["5 perguntas sobre momento e prioridades"]
    D2 --> D3["Contato: nome, WhatsApp e e-mail"]
    D3 --> D4["Resultado com temas de interesse"]
    D4 --> WA["Conversa pelo WhatsApp"]
    H7 --> WA

    FOOT --> F1["Atalhos para as páginas e seções"]
    FOOT --> F2["E-mail, WhatsApp, LinkedIn e Instagram"]
    FOOT --> F3["Compliance: 7 documentos externos em PDF"]
```

## Como apresentar

- **Home:** apresenta a Origami, sua visão de patrimônio e a equipe.
- **Insights e cartas:** aprofundam o conteúdo e a perspectiva da empresa.
- **Diagnóstico:** conduz o visitante de suas prioridades a uma conversa com a Origami.
- **Rodapé:** reúne navegação, contato, redes sociais e documentos de compliance.

As seções da Home ficam na mesma página. Cada Carta Mensal tem sua própria página; os demais conteúdos de Insights apontam para trechos do próprio hub. As etapas do diagnóstico acontecem na mesma página.

**Ponto para alinhamento interno:** o formulário do diagnóstico ainda não persiste os dados em CRM ou Supabase; essa integração está pendente no código.
