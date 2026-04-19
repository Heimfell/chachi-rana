import type { Metadata } from "next";
import MetaDescriptionGenerator from "./MetaDescriptionGenerator";

export const metadata: Metadata = {
  title: "Meta Description Generator Gratis | Crea Meta Tags SEO",
  description:
    "Genera meta descriptions optimizadas para SEO. Plantillas profesionales, contador de caracteres y preview en Google. 100% gratis.",
  keywords: [
    "meta description generator",
    "generador meta description",
    "meta tags SEO",
    "SEO on-page",
    "optimizar meta description",
  ],
};

export default function Page() {
  return <MetaDescriptionGenerator />;
}
