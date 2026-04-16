"use client";

import Link from "next/link";
import { useState } from "react";

type SchemaType = "Article" | "FAQ" | "LocalBusiness" | "Product" | "HowTo" | "Event";

const schemaTypes: { value: SchemaType; label: string; icon: string }[] = [
  { value: "Article", label: "Artículo", icon: "📝" },
  { value: "FAQ", label: "FAQ", icon: "❓" },
  { value: "LocalBusiness", label: "Negocio Local", icon: "📍" },
  { value: "Product", label: "Producto", icon: "🛒" },
  { value: "HowTo", label: "Tutorial", icon: "📋" },
  { value: "Event", label: "Evento", icon: "📅" },
];

interface Field {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

const fieldSets: Record<SchemaType, Field[]> = {
  Article: [
    { key: "headline", label: "Título", placeholder: "Título del artículo", required: true },
    { key: "description", label: "Descripción", placeholder: "Breve descripción", required: true },
    { key: "author", label: "Autor", placeholder: "Nombre del autor" },
    { key: "datePublished", label: "Fecha publicación", placeholder: "2026-01-01" },
    { key: "image", label: "URL imagen", placeholder: "https://..." },
  ],
  FAQ: [
    { key: "questions", label: "Preguntas (una por línea)", placeholder: "¿Qué es SEO?\n¿Cuánto cuesta?", required: true },
    { key: "answers", label: "Respuestas (una por línea, mismo orden)", placeholder: "SEO es...\nEl precio depende...", required: true },
  ],
  LocalBusiness: [
    { key: "name", label: "Nombre del negocio", placeholder: "Mi Negocio", required: true },
    { key: "description", label: "Descripción", placeholder: "Descripción del negocio", required: true },
    { key: "streetAddress", label: "Dirección", placeholder: "Calle Mayor 1" },
    { key: "addressLocality", label: "Ciudad", placeholder: "Madrid" },
    { key: "telephone", label: "Teléfono", placeholder: "+34 600 000 000" },
    { key: "url", label: "Web", placeholder: "https://..." },
  ],
  Product: [
    { key: "name", label: "Nombre del producto", placeholder: "Producto X", required: true },
    { key: "description", label: "Descripción", placeholder: "Descripción del producto", required: true },
    { key: "price", label: "Precio", placeholder: "29.99" },
    { key: "priceCurrency", label: "Moneda", placeholder: "EUR" },
    { key: "availability", label: "Disponibilidad", placeholder: "InStock" },
    { key: "image", label: "URL imagen", placeholder: "https://..." },
  ],
  HowTo: [
    { key: "name", label: "Título del tutorial", placeholder: "Cómo hacer X", required: true },
    { key: "description", label: "Descripción", placeholder: "Aprende a...", required: true },
    { key: "steps", label: "Pasos (uno por línea)", placeholder: "Paso 1: Hacer esto\nPaso 2: Hacer aquello", required: true },
  ],
  Event: [
    { key: "name", label: "Nombre del evento", placeholder: "Mi Evento", required: true },
    { key: "description", label: "Descripción", placeholder: "Descripción del evento", required: true },
    { key: "startDate", label: "Fecha inicio", placeholder: "2026-06-01T10:00" },
    { key: "endDate", label: "Fecha fin", placeholder: "2026-06-01T18:00" },
    { key: "location", label: "Ubicación", placeholder: "Madrid, España" },
    { key: "url", label: "URL del evento", placeholder: "https://..." },
  ],
};

function generateSchema(type: SchemaType, values: Record<string, string>): string {
  const v = values;
  const base = { "@context": "https://schema.org", "@type": type };

  switch (type) {
    case "Article":
      return JSON.stringify(
        {
          ...base,
          headline: v.headline,
          description: v.description,
          author: v.author ? { "@type": "Person", name: v.author } : undefined,
          datePublished: v.datePublished || undefined,
          image: v.image || undefined,
        },
        null,
        2
      );

    case "FAQ": {
      const questions = (v.questions || "").split("\n").filter(Boolean);
      const answers = (v.answers || "").split("\n").filter(Boolean);
      return JSON.stringify(
        {
          ...base,
          mainEntity: questions.map((q, i) => ({
            "@type": "Question",
            name: q.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: (answers[i] || "").trim(),
            },
          })),
        },
        null,
        2
      );
    }

    case "LocalBusiness":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          address: v.streetAddress
            ? {
                "@type": "PostalAddress",
                streetAddress: v.streetAddress,
                addressLocality: v.addressLocality || undefined,
                addressCountry: "ES",
              }
            : undefined,
          telephone: v.telephone || undefined,
          url: v.url || undefined,
        },
        null,
        2
      );

    case "Product":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          offers: v.price
            ? {
                "@type": "Offer",
                price: v.price,
                priceCurrency: v.priceCurrency || "EUR",
                availability: `https://schema.org/${v.availability || "InStock"}`,
              }
            : undefined,
          image: v.image || undefined,
        },
        null,
        2
      );

    case "HowTo": {
      const steps = (v.steps || "").split("\n").filter(Boolean);
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text: s.trim(),
          })),
        },
        null,
        2
      );
    }

    case "Event":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          startDate: v.startDate || undefined,
          endDate: v.endDate || undefined,
          location: v.location
            ? { "@type": "Place", name: v.location }
            : undefined,
          url: v.url || undefined,
        },
        null,
        2
      );
  }
}

export default function SchemaGeneratorPage() {
  const [selectedType, setSelectedType] = useState<SchemaType>("Article");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const fields = fieldSets[selectedType];
  const output = generateSchema(selectedType, values);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-rana-background">
      <div className="px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
        >
          ← Volver al inicio
        </Link>

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-rana-green/10 border border-rana-green/20 text-rana-light text-sm font-medium mb-6">
            🔧 Herramienta gratuita
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            <span className="gradient-text">Schema Generator</span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Genera código JSON-LD para datos estructurados. Elige el tipo, rellena los campos y copia el resultado.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {schemaTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setSelectedType(t.value);
                setValues({});
              }}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-300 ${
                selectedType === t.value
                  ? "bg-rana-green/15 border-rana-green/50 text-rana-green"
                  : "bg-rana-surface border-rana-border text-rana-light/50 hover:border-rana-green/30"
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <h2 className="text-lg font-bold mb-4">Campos</h2>
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-rana-light/60 mb-1">
                    {field.label}
                    {field.required && <span className="text-rana-gold ml-1">*</span>}
                  </label>
                  {field.key === "questions" || field.key === "answers" || field.key === "steps" ? (
                    <textarea
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">JSON-LD</h2>
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-rana-green/10 text-rana-green text-sm font-medium hover:bg-rana-green/20 transition-colors"
              >
                {copied ? "✓ Copiado!" : "📋 Copiar"}
              </button>
            </div>
            <pre className="bg-rana-background rounded-xl p-4 text-sm text-rana-lime overflow-x-auto border border-rana-border leading-relaxed">
              {output}
            </pre>
            <p className="text-rana-light/30 text-xs mt-4">
              Pega este código dentro de {"<script type=\"application/ld+json\">"}{" "}
              {"</script>"} en el {"<head>"} de tu página.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
