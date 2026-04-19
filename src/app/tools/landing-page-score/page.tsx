import type { Metadata } from "next";
import LandingPageScore from "./LandingPageScore";

export const metadata: Metadata = {
  title: "Landing Page Score Gratis | Auditá tu Landing en 20 Preguntas",
  description:
    "Responde 20 preguntas sobre tu landing page y descubre tu puntuación. Fixes específicos para cada punto débil. Hero, CTA, Social Proof, SEO, Mobile.",
  keywords: [
    "landing page score",
    "auditoría landing page",
    "mejorar landing page",
    "conversión landing",
    "optimizar landing page",
    "CTR",
  ],
  openGraph: {
    title: "Landing Page Score — Auditá tu Landing Gratis | Chachi Rana",
    description: "20 preguntas para auditar tu landing page. Fixes específicos incluidos.",
    url: "https://chachirana.com/tools/landing-page-score",
  },
  alternates: {
    canonical: "https://chachirana.com/tools/landing-page-score",
  },
};

export default function Page() {
  return <LandingPageScore />;
}
