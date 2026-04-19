"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type SchemaType =
  | "Article"
  | "FAQ"
  | "LocalBusiness"
  | "Product"
  | "HowTo"
  | "Event"
  | "BreadcrumbList"
  | "Organization"
  | "VideoObject";

const schemaTypes: { value: SchemaType; label: string; icon: string }[] = [
  { value: "Article", label: "Artículo", icon: "📝" },
  { value: "FAQ", label: "FAQ", icon: "❓" },
  { value: "LocalBusiness", label: "Negocio Local", icon: "📍" },
  { value: "Product", label: "Producto", icon: "🛒" },
  { value: "HowTo", label: "Tutorial", icon: "📋" },
  { value: "Event", label: "Evento", icon: "📅" },
  { value: "BreadcrumbList", label: "Breadcrumb", icon: "🍞" },
  { value: "Organization", label: "Organización", icon: "🏢" },
  { value: "VideoObject", label: "Video", icon: "🎬" },
];

interface Field {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "url" | "text";
}

const fieldSets: Record<SchemaType, Field[]> = {
  Article: [
    { key: "headline", label: "Título", placeholder: "Título del artículo", required: true },
    { key: "description", label: "Descripción", placeholder: "Breve descripción", required: true },
    { key: "author", label: "Autor", placeholder: "Nombre del autor" },
    { key: "datePublished", label: "Fecha publicación", placeholder: "2026-01-01" },
    { key: "image", label: "URL imagen", placeholder: "https://...", type: "url" },
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
    { key: "url", label: "Web", placeholder: "https://...", type: "url" },
  ],
  Product: [
    { key: "name", label: "Nombre del producto", placeholder: "Producto X", required: true },
    { key: "description", label: "Descripción", placeholder: "Descripción del producto", required: true },
    { key: "price", label: "Precio", placeholder: "29.99" },
    { key: "priceCurrency", label: "Moneda", placeholder: "EUR" },
    { key: "availability", label: "Disponibilidad", placeholder: "InStock" },
    { key: "image", label: "URL imagen", placeholder: "https://...", type: "url" },
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
    { key: "url", label: "URL del evento", placeholder: "https://...", type: "url" },
  ],
  BreadcrumbList: [
    { key: "items", label: "Items (nombre | URL, uno por línea)", placeholder: "Inicio | https://ejemplo.com\nBlog | https://ejemplo.com/blog\nArtículo | https://ejemplo.com/blog/articulo", required: true },
  ],
  Organization: [
    { key: "name", label: "Nombre", placeholder: "Mi Empresa", required: true },
    { key: "url", label: "URL", placeholder: "https://...", required: true, type: "url" },
    { key: "logo", label: "URL logo", placeholder: "https://...", type: "url" },
    { key: "telephone", label: "Teléfono", placeholder: "+34 600 000 000" },
    { key: "email", label: "Email", placeholder: "info@empresa.com" },
    { key: "socialLinks", label: "Redes sociales (URL, una por línea)", placeholder: "https://twitter.com/empresa\nhttps://linkedin.com/company/empresa", type: "url" },
  ],
  VideoObject: [
    { key: "name", label: "Título del video", placeholder: "Mi Video", required: true },
    { key: "description", label: "Descripción", placeholder: "Descripción del video", required: true },
    { key: "thumbnailUrl", label: "URL thumbnail", placeholder: "https://...", required: true, type: "url" },
    { key: "uploadDate", label: "Fecha de subida", placeholder: "2026-01-01" },
    { key: "duration", label: "Duración (ISO 8601)", placeholder: "PT5M30S" },
    { key: "contentUrl", label: "URL del video", placeholder: "https://...", type: "url" },
  ],
};

function isValidUrl(value: string): boolean {
  if (!value) return true;
  return /^https:\/\/.+/.test(value);
}

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
        null, 2
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
            acceptedAnswer: { "@type": "Answer", text: (answers[i] || "").trim() },
          })),
        },
        null, 2
      );
    }

    case "LocalBusiness":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          address: v.streetAddress
            ? { "@type": "PostalAddress", streetAddress: v.streetAddress, addressLocality: v.addressLocality || undefined, addressCountry: "ES" }
            : undefined,
          telephone: v.telephone || undefined,
          url: v.url || undefined,
        },
        null, 2
      );

    case "Product":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          offers: v.price
            ? { "@type": "Offer", price: v.price, priceCurrency: v.priceCurrency || "EUR", availability: `https://schema.org/${v.availability || "InStock"}` }
            : undefined,
          image: v.image || undefined,
        },
        null, 2
      );

    case "HowTo": {
      const steps = (v.steps || "").split("\n").filter(Boolean);
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s.trim() })),
        },
        null, 2
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
          location: v.location ? { "@type": "Place", name: v.location } : undefined,
          url: v.url || undefined,
        },
        null, 2
      );

    case "BreadcrumbList": {
      const items = (v.items || "").split("\n").filter(Boolean);
      return JSON.stringify(
        {
          ...base,
          itemListElement: items.map((item, i) => {
            const parts = item.split("|").map((s) => s.trim());
            return {
              "@type": "ListItem",
              position: i + 1,
              name: parts[0] || "",
              item: parts[1] || undefined,
            };
          }),
        },
        null, 2
      );
    }

    case "Organization": {
      const socials = (v.socialLinks || "").split("\n").filter((s) => s.trim());
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          url: v.url,
          logo: v.logo || undefined,
          telephone: v.telephone || undefined,
          email: v.email || undefined,
          sameAs: socials.length > 0 ? socials : undefined,
        },
        null, 2
      );
    }

    case "VideoObject":
      return JSON.stringify(
        {
          ...base,
          name: v.name,
          description: v.description,
          thumbnailUrl: v.thumbnailUrl,
          uploadDate: v.uploadDate || undefined,
          duration: v.duration || undefined,
          contentUrl: v.contentUrl || undefined,
        },
        null, 2
      );
  }
}

function RichSnippetPreview({ type, values }: { type: SchemaType; values: Record<string, string> }) {
  const v = values;

  const GoogleResult = ({ title, url, description, extra }: { title: string; url: string; description: string; extra?: React.ReactNode }) => (
    <div className="rounded-xl bg-white p-4 max-w-lg">
      <div className="text-sm text-green-700 truncate">{url || "https://ejemplo.com"}</div>
      <div className="text-lg text-blue-700 hover:underline cursor-pointer leading-tight mt-0.5">{title || "Título de la página"}</div>
      <div className="text-sm text-gray-600 mt-1 line-clamp-2">{description || "Descripción de la página que aparecerá en los resultados de Google..."}</div>
      {extra}
    </div>
  );

  switch (type) {
    case "Article":
      return (
        <GoogleResult
          title={v.headline}
          url={v.image ? "https://ejemplo.com/articulo" : ""}
          description={`${v.description || "Descripción del artículo"}${v.author ? ` — ${v.author}` : ""}${v.datePublished ? ` · ${v.datePublished}` : ""}`}
        />
      );

    case "FAQ": {
      const questions = (v.questions || "").split("\n").filter(Boolean);
      const answers = (v.answers || "").split("\n").filter(Boolean);
      return (
        <GoogleResult
          title="Preguntas Frecuentes"
          url="https://ejemplo.com/faq"
          description={questions[0] || "Pregunta frecuente"}
          extra={
            questions.length > 0 ? (
              <div className="mt-3 flex flex-col gap-2">
                {questions.slice(0, 3).map((q, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-2">
                    <div className="text-sm font-medium text-gray-800">{q.trim()}</div>
                    <div className="text-xs text-gray-500 mt-1">{(answers[i] || "").trim()}</div>
                  </div>
                ))}
              </div>
            ) : undefined
          }
        />
      );
    }

    case "LocalBusiness":
      return (
        <GoogleResult
          title={v.name || "Negocio Local"}
          url={v.url || "https://ejemplo.com"}
          description={`${v.description || "Descripción del negocio"}${v.streetAddress ? ` · ${v.streetAddress}, ${v.addressLocality || ""}` : ""}${v.telephone ? ` · ${v.telephone}` : ""}`}
        />
      );

    case "Product":
      return (
        <GoogleResult
          title={v.name || "Producto"}
          url="https://ejemplo.com/producto"
          description={v.description || "Descripción del producto"}
          extra={
            v.price ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-medium text-gray-900">{v.price} {v.priceCurrency || "EUR"}</span>
                <span className="text-sm text-green-700">En stock</span>
              </div>
            ) : undefined
          }
        />
      );

    case "HowTo": {
      const steps = (v.steps || "").split("\n").filter(Boolean);
      return (
        <GoogleResult
          title={v.name || "Tutorial"}
          url="https://ejemplo.com/tutorial"
          description={v.description || "Descripción del tutorial"}
          extra={
            steps.length > 0 ? (
              <div className="mt-2 flex flex-col gap-1">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={i} className="text-xs text-gray-600">
                    <span className="font-medium">{i + 1}.</span> {s.trim()}
                  </div>
                ))}
              </div>
            ) : undefined
          }
        />
      );
    }

    case "Event":
      return (
        <GoogleResult
          title={v.name || "Evento"}
          url={v.url || "https://ejemplo.com/evento"}
          description={`${v.description || "Descripción del evento"}${v.startDate ? ` · ${v.startDate}` : ""}${v.location ? ` · ${v.location}` : ""}`}
        />
      );

    case "BreadcrumbList": {
      const items = (v.items || "").split("\n").filter(Boolean).map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        return parts[0] || "";
      });
      return (
        <div className="rounded-xl bg-white p-4 max-w-lg">
          <div className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
            {items.length > 0 ? (
              items.map((name, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-gray-300">›</span>}
                  <span className={i === items.length - 1 ? "text-gray-800 font-medium" : "text-blue-700"}>{name || "Item"}</span>
                </span>
              ))
            ) : (
              <span>Inicio › Categoría › Página</span>
            )}
          </div>
        </div>
      );
    }

    case "Organization":
      return (
        <GoogleResult
          title={v.name || "Organización"}
          url={v.url || "https://ejemplo.com"}
          description={`${v.description || "Información de la organización"}${v.telephone ? ` · Tel: ${v.telephone}` : ""}${v.email ? ` · ${v.email}` : ""}`}
        />
      );

    case "VideoObject":
      return (
        <GoogleResult
          title={v.name || "Video"}
          url={v.contentUrl || "https://ejemplo.com/video"}
          description={`${v.description || "Descripción del video"}${v.duration ? ` · Duración: ${v.duration}` : ""}${v.uploadDate ? ` · ${v.uploadDate}` : ""}`}
          extra={
            v.thumbnailUrl ? (
              <div className="mt-2 rounded-lg bg-gray-100 h-32 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 text-3xl">▶</div>
              </div>
            ) : undefined
          }
        />
      );

    default:
      return null;
  }
}

export default function SchemaGenerator() {
  const [selectedType, setSelectedType] = useState<SchemaType>("Article");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const fields = fieldSets[selectedType];
  const output = generateSchema(selectedType, values);

  const urlFields = useMemo(() => {
    return fields.filter((f) => f.type === "url").map((f) => f.key);
  }, [fields]);

  const invalidUrls = urlFields.filter((key) => values[key] && !isValidUrl(values[key]));

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setValues({});
  };

  const handleTypeChange = (type: SchemaType) => {
    setSelectedType(type);
    setValues({});
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

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-10">
          {schemaTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => handleTypeChange(t.value)}
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Campos</h2>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-rana-background border border-rana-border text-rana-light/50 text-xs hover:text-white hover:border-rana-green/30 transition-colors"
              >
                🔄 Limpiar
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {fields.map((field) => {
                const isInvalid = field.type === "url" && values[field.key] && !isValidUrl(values[field.key]);
                return (
                  <div key={field.key}>
                    <label className="block text-sm text-rana-light/60 mb-1">
                      {field.label}
                      {field.required && <span className="text-rana-gold ml-1 text-xs">(obligatorio)</span>}
                    </label>
                    {field.key === "questions" || field.key === "answers" || field.key === "steps" || field.key === "items" || field.key === "socialLinks" ? (
                      <textarea
                        value={values[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-rana-background border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:ring-1 transition-all resize-none ${
                          isInvalid ? "border-red-400 focus:border-red-400 focus:ring-red-400/50" : "border-rana-border focus:border-rana-green focus:ring-rana-green/50"
                        }`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 rounded-xl bg-rana-background border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:ring-1 transition-all ${
                          isInvalid ? "border-red-400 focus:border-red-400 focus:ring-red-400/50" : "border-rana-border focus:border-rana-green focus:ring-rana-green/50"
                        }`}
                      />
                    )}
                    {isInvalid && (
                      <p className="text-xs text-red-400 mt-1">La URL debe empezar por https://</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
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
              <pre className="bg-rana-background rounded-xl p-4 text-sm text-rana-lime overflow-x-auto border border-rana-border leading-relaxed max-h-80">
                {output}
              </pre>
              <p className="text-rana-light/30 text-xs mt-4">
                Pega este código dentro de {"<script type=\"application/ld+json\">"} {"</script>"} en el {"<head>"} de tu página.
              </p>
            </div>

            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
              <h2 className="text-lg font-bold mb-4">👁️ Preview Google</h2>
              <p className="text-rana-light/30 text-xs mb-3">Así podría verse tu resultado en Google:</p>
              <RichSnippetPreview type={selectedType} values={values} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
