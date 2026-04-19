import type { Metadata } from "next";
import SchemaGenerator from "./SchemaGenerator";

export const metadata: Metadata = {
  title: "Schema Generator Gratis | Genera JSON-LD para SEO",
  description:
    "Genera código JSON-LD para datos estructurados. Article, FAQ, Product, LocalBusiness, HowTo, Event, Organization y más. Con preview en Google.",
  keywords: [
    "schema generator",
    "JSON-LD generator",
    "datos estructurados",
    "schema markup",
    "rich snippets",
    "SEO técnico",
    "schema.org",
  ],
  openGraph: {
    title: "Schema Generator Gratis — JSON-LD para SEO | Chachi Rana",
    description: "Genera código JSON-LD para 9 tipos de schema con preview en Google.",
    url: "https://chachirana.com/tools/schema-generator",
  },
  alternates: {
    canonical: "https://chachirana.com/tools/schema-generator",
  },
};

export default function Page() {
  return <SchemaGenerator />;
}
