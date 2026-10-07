import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origami Investimentos | Consultoria Independente",
  description:
    "Estratégia patrimonial para pessoas e famílias que buscam clareza, independência e planejamento conectado aos seus objetivos de vida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
