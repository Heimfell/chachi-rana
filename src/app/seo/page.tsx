import type { Metadata } from "next";
import SEOPage from "./SEOPage";

export const metadata: Metadata = {
  title: "SEO Inteligente | Chachi Rana",
  description:
    "Optimiza tu posicionamiento en buscadores con inteligencia artificial. Análisis SEO, palabras clave, auditorías y estrategias automáticas.",
  keywords: ["SEO", "posicionamiento web", "inteligencia artificial SEO", "keywords", "auditoría SEO", "Chachi Rana"],
};

export default function Page() {
  return <SEOPage />;
}
