"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

type PageType =
  | "tienda"
  | "blog"
  | "servicio"
  | "restaurante"
  | "clinica"
  | "inmobiliaria"
  | "otro";

type Tone = "profesional" | "cercano" | "urgente" | "informativo";

const pageTypes: { value: PageType; label: string }[] = [
  { value: "tienda", label: "Tienda online" },
  { value: "blog", label: "Blog" },
  { value: "servicio", label: "Servicio" },
  { value: "restaurante", label: "Restaurante" },
  { value: "clinica", label: "Clínica" },
  { value: "inmobiliaria", label: "Inmobiliaria" },
  { value: "otro", label: "Otro" },
];

const tones: { value: Tone; label: string }[] = [
  { value: "profesional", label: "Profesional" },
  { value: "cercano", label: "Cercano" },
  { value: "urgente", label: "Urgente" },
  { value: "informativo", label: "Informativo" },
];

const ctaByTone: Record<Tone, string[]> = {
  profesional: [
    "Solicita tu presupuesto gratis",
    "Contacta con nosotros hoy",
    "Consulta nuestra oferta",
    "Habla con un experto",
    "Descubre nuestras soluciones",
  ],
  cercano: [
    "¡Empieza hoy!",
    "Ven a conocernos",
    "Descubre más aquí",
    "Únete a nuestra comunidad",
    "Te esperamos",
  ],
  urgente: [
    "¡Oferta limitada!",
    "No esperes más",
    "Reserva ahora",
    "¡Apúntate antes de que se acabe!",
    "Pide cita hoy mismo",
  ],
  informativo: [
    "Lee más en nuestra web",
    "Más información aquí",
    "Aprende más en este enlace",
    "Consulta la guía completa",
    "Encuentra todos los detalles",
  ],
};

const audienceByType: Record<PageType, string> = {
  tienda: "compradores",
  blog: "lectores",
  servicio: "clientes",
  restaurante: "comensales",
  clinica: "pacientes",
  inmobiliaria: "compradores y vendedores",
  otro: "visitantes",
};

const numberByType: Record<PageType, string> = {
  tienda: "+500 productos",
  blog: "10 artículos",
  servicio: "+100 clientes",
  restaurante: "+50 platos",
  clinica: "+1.000 pacientes",
  inmobiliaria: "+200 propiedades",
  otro: "+50 opciones",
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(".", max);
  if (cut > max - 40) return text.slice(0, cut + 1);
  const cut2 = text.lastIndexOf(",", max);
  if (cut2 > max - 40) return text.slice(0, cut2);
  return text.slice(0, max - 3) + "...";
}

function generateDescriptions(
  title: string,
  keyword: string,
  description: string,
  pageType: PageType,
  tone: Tone
): string[] {
  const ctas = ctaByTone[tone];
  const audience = audienceByType[pageType];
  const numbers = numberByType[pageType];
  const k = keyword || title || "tu tema";
  const desc = description || "Soluciones de calidad para ti";
  const shortDesc = truncate(desc, 80);

  const templates = [
    `${k.charAt(0).toUpperCase() + k.slice(1)}: ${shortDesc}. ${ctas[0]}.`,
    `Descubre ${shortDesc.toLowerCase().startsWith("soluciones") || shortDesc.toLowerCase().startsWith("ofrecemos") ? "todo sobre" : ""} ${k}. ${truncate(desc, 90)}. ${ctas[1]}`,
    `¿Buscas ${k}? ${shortDesc}. ${ctas[2]}.`,
    `${numbers} de ${k} para ${audience}. ${truncate(desc, 70)}. ${ctas[3]}`,
    `${title ? title + ". " : ""}${shortDesc}. ${ctas[4]}. ¡Entra ya!`,
    `Todo lo que necesitas saber sobre ${k}. ${truncate(desc, 75)}. ${ctas[0]}`,
  ];

  return templates.map((t) =>
    t
      .replace(/\.\./g, ".")
      .replace(/  +/g, " ")
      .trim()
  );
}

function getCharColor(len: number) {
  if (len >= 150 && len <= 160) return "text-rana-green";
  if ((len >= 120 && len < 150) || (len > 160 && len <= 170))
    return "text-rana-gold";
  return "text-red-400";
}

function getBarColor(len: number) {
  if (len >= 150 && len <= 160) return "bg-rana-green";
  if ((len >= 120 && len < 150) || (len > 160 && len <= 170))
    return "bg-rana-gold";
  return "bg-red-400";
}

export default function MetaDescriptionGenerator() {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");
  const [pageType, setPageType] = useState<PageType>("servicio");
  const [tone, setTone] = useState<Tone>("profesional");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generated = useMemo(
    () => generateDescriptions(title, keyword, description, pageType, tone),
    [title, keyword, description, pageType, tone]
  );

  const previewTitle = title || "Título de tu página";
  const previewUrl = `https://ejemplo.com/${keyword
    .toLowerCase()
    .replace(/\s+/g, "-") || "tu-pagina"}`;
  const previewDesc = generated[0] || "Tu meta description aparecerá aquí...";

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const hasInput = title || keyword || description;

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
            <span className="gradient-text">
              Meta Description Generator
            </span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Genera meta descriptions optimizadas para SEO con plantillas
            profesionales. Contador de caracteres y preview en Google en
            tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <h2 className="text-lg font-bold mb-4">
              Configura tu meta description
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Título de la página
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Asesoría Fiscal para Autónomos en Madrid"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Keyword principal
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ej: asesoría fiscal autónomos"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Breve descripción del negocio/página
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Ofrecemos asesoría fiscal completa para autónomos y pymes con más de 15 años de experiencia. Precios transparentes y atención personalizada."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Tipo de página
                </label>
                <div className="flex flex-wrap gap-2">
                  {pageTypes.map((pt) => (
                    <button
                      key={pt.value}
                      onClick={() => setPageType(pt.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        pageType === pt.value
                          ? "bg-rana-green/15 border-rana-green/50 text-rana-green"
                          : "bg-rana-background border-rana-border text-rana-light/50 hover:border-rana-green/30"
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Tono
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        tone === t.value
                          ? "bg-rana-green/15 border-rana-green/50 text-rana-green"
                          : "bg-rana-background border-rana-border text-rana-light/50 hover:border-rana-green/30"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
              <h2 className="text-lg font-bold mb-4">
                👁️ Preview Google
              </h2>
              <p className="text-rana-light/30 text-xs mb-3">
                Así se verá tu página en los resultados de Google:
              </p>
              <div className="rounded-xl bg-white p-4 max-w-lg">
                <div className="text-sm text-green-700 truncate">
                  {previewUrl}
                </div>
                <div className="text-lg text-blue-700 leading-tight mt-0.5 line-clamp-1">
                  {previewTitle}
                </div>
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {previewDesc}
                </div>
              </div>
            </div>

            {hasInput && (
              <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
                <h2 className="text-lg font-bold mb-4">
                  ✨ Meta descriptions generadas
                </h2>
                <div className="flex flex-col gap-3">
                  {generated.map((meta, i) => {
                    const len = meta.length;
                    return (
                      <div
                        key={i}
                        className="rounded-xl bg-rana-background border border-rana-border p-4"
                      >
                        <p className="text-sm text-white mb-2">{meta}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs font-bold ${getCharColor(
                                len
                              )}`}
                            >
                              {len} caracteres
                            </span>
                            <div className="w-20 bg-rana-surface rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${getBarColor(
                                  len
                                )}`}
                                style={{
                                  width: `${Math.min((len / 160) * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-rana-light/30">
                              {len >= 150 && len <= 160
                                ? "Ideal"
                                : len >= 120 && len <= 170
                                ? "Aceptable"
                                : "Ajustar"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(meta, i)}
                            className="px-3 py-1 rounded-lg bg-rana-green/10 text-rana-green text-xs font-medium hover:bg-rana-green/20 transition-colors"
                          >
                            {copiedIndex === i
                              ? "✓ Copiado!"
                              : "📋 Copiar"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">
            <span className="gradient-text">
              ¿Qué es una Meta Description?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-green">
                Definición
              </h3>
              <p className="text-sm text-rana-light/60 leading-relaxed">
                La meta description es el texto que aparece bajo el título en
                los resultados de Google. Aunque no es un factor directo de
                ranking, influye en el CTR (porcentaje de clics) y puede
                determinar si un usuario entra en tu web o en la de tu
                competencia.
              </p>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-lime">
                Mejores prácticas
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Longitud ideal: 150-160 caracteres</li>
                <li>• Incluye tu keyword principal</li>
                <li>• Añade un CTA (llamada a la acción)</li>
                <li>• Cada página debe tener una única meta description</li>
                <li>• Describe el contenido de forma honesta</li>
                <li>• Evita duplicados entre páginas</li>
              </ul>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-gold">
                Errores comunes
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Dejarla vacía (Google generará una aleatoria)</li>
                <li>• Escribir más de 160 caracteres (se cortará)</li>
                <li>• Keyword stuffing (repetir keywords forzadamente)</li>
                <li>• Usar la misma en todas las páginas</li>
                <li>• No incluir un CTA claro</li>
                <li>• Copiar el title tag como meta description</li>
              </ul>
            </div>
          </div>
        </div>

        <Link
          href="/chat"
          className="block rounded-2xl bg-rana-surface border border-rana-gold/20 p-6 sm:p-8 text-center hover:border-rana-gold/40 transition-colors animate-gold-glow"
        >
          <p className="text-lg sm:text-xl font-bold text-rana-gold mb-2">
            ¿Tu web pierde clientes por las noches? 🐸
          </p>
          <p className="text-rana-light/60 text-sm mb-4">
            Chachi Rana Chat atiende por ti 24/7. Convierte visitantes en
            clientes mientras duermes.
          </p>
          <span className="inline-block px-6 py-3 rounded-xl bg-rana-gold text-rana-dark font-bold hover:bg-rana-gold-dark transition-colors">
            Probar Chachi Rana Chat gratis →
          </span>
        </Link>
      </div>
    </div>
  );
}
