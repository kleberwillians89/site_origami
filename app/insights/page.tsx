import type { Metadata } from "next";
import { EditorialFooter, EditorialHeader } from "@/components/EditorialChrome";
import InsightsHub from "@/components/InsightsHub";

export const metadata: Metadata = {
  title: "Insights | Origami Investimentos",
  description: "Carta Mensal e perspectivas da Origami sobre patrimônio, comportamento e decisões de longo prazo.",
};

export default function InsightsPage() {
  return (
    <div className="editorial-page">
      <EditorialHeader />
      <main>
        <InsightsHub />
      </main>
      <EditorialFooter />
    </div>
  );
}
