import type { Metadata } from "next";
import HeadlineAnalyzer from "./HeadlineAnalyzer";

export const metadata: Metadata = {
  title: "Headline Analyzer Gratis | Analiza tus Títulos SEO",
  description:
    "Analiza tus títulos y descubre cómo mejorarlos. Score 0-100, power words, longitud óptima, sugerencias y títulos alternativos. Sin registro.",
  keywords: [
    "headline analyzer",
    "analizador de títulos",
    "mejorar títulos SEO",
    "CTR títulos",
    "power words",
    "títulos que convierten",
  ],
  openGraph: {
    title: "Headline Analyzer Gratis — Score 0-100 | Chachi Rana",
    description: "Analiza tus títulos y descubre cómo mejorarlos. Power words, longitud, sugerencias.",
    url: "https://chachirana.com/tools/headline-analyzer",
  },
  alternates: {
    canonical: "https://chachirana.com/tools/headline-analyzer",
  },
};

export default function Page() {
  return <HeadlineAnalyzer />;
}
