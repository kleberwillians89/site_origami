import type { Metadata } from "next";
import DiagnosticoFlow from "@/components/diagnostico/DiagnosticoFlow";

export const metadata: Metadata = {
  title: "Diagnóstico patrimonial | Origami Investimentos",
  description:
    "Um diagnóstico simples para entender como organizar, proteger e planejar decisões patrimoniais.",
};

export default function DiagnosticoPage() {
  return <DiagnosticoFlow />;
}
