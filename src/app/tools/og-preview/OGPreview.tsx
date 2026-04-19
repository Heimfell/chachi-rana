"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

type OgType = "website" | "article" | "product" | "profile";

const ogTypes: { value: OgType; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "article", label: "Artículo" },
  { value: "product", label: "Producto" },
  { value: "profile", label: "Perfil" },
];

export default function OGPreview() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [ogType, setOgType] = useState<OgType>("website");
  const [copied, setCopied] = useState(false);

  const displayTitle = title || "Título de tu página";
  const displayDesc = description || "Descripción de tu página web";
  const displayImage = imageUrl || "";
  const displayUrl = pageUrl || "https://ejemplo.com";
  const displaySite = siteName || "ejemplo.com";
  const shortUrl = displayUrl.replace(/^https?:\/\//, "").slice(0, 40);

  const metaTags = useMemo(() => {
    const tags = [
      `<meta property="og:title" content="${displayTitle}" />`,
      `<meta property="og:description" content="${displayDesc}" />`,
    ];
    if (imageUrl) {
      tags.push(`<meta property="og:image" content="${imageUrl}" />`);
    }
    tags.push(`<meta property="og:url" content="${displayUrl}" />`);
    tags.push(`<meta property="og:type" content="${ogType}" />`);
    tags.push(`<meta property="og:site_name" content="${displaySite}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:title" content="${displayTitle}" />`);
    tags.push(`<meta name="twitter:description" content="${displayDesc}" />`);
    if (imageUrl) {
      tags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
    }
    return tags.join("\n");
  }, [displayTitle, displayDesc, imageUrl, displayUrl, ogType, displaySite]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [metaTags]);

  const ImagePlaceholder = ({
    className = "",
    compact = false,
  }: {
    className?: string;
    compact?: boolean;
  }) => {
    if (displayImage) {
      return (
        <img
          src={displayImage}
          alt={displayTitle}
          className={`w-full object-cover ${className}`}
          style={{ aspectRatio: compact ? undefined : "1.91 / 1" }}
        />
      );
    }
    return (
      <div
        className={`w-full bg-gray-200 flex items-center justify-center ${className}`}
        style={{ aspectRatio: compact ? undefined : "1.91 / 1" }}
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
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
            <span className="gradient-text">
              Open Graph Preview & Generator
            </span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Previsualiza cómo se ve tu enlace en Facebook, Twitter, LinkedIn y
            WhatsApp. Genera los meta tags Open Graph para tu web.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <h2 className="text-lg font-bold mb-4">Configura tus OG tags</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Título (og:title)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Asesoría Fiscal para Autónomos en Madrid"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
                <span className="text-xs text-rana-light/30 mt-1 block">
                  {title.length}/60 caracteres
                  {title.length > 60 && (
                    <span className="text-red-400 ml-1">⚠ Excedido</span>
                  )}
                </span>
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Descripción (og:description)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Ofrecemos asesoría fiscal completa para autónomos con más de 15 años de experiencia."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all resize-none"
                />
                <span className="text-xs text-rana-light/30 mt-1 block">
                  {description.length}/200 caracteres
                  {description.length > 200 && (
                    <span className="text-red-400 ml-1">⚠ Excedido</span>
                  )}
                </span>
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  URL de la imagen (og:image)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg (1200×630 recomendado)"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  URL de la página (og:url)
                </label>
                <input
                  type="url"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/mi-pagina"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Nombre del sitio (og:site_name)
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Ej: Mi Sitio Web"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Tipo (og:type)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ogTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setOgType(t.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        ogType === t.value
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
                📱 Previsualización en redes
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs text-rana-light/40 mb-2 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-5 h-5 rounded bg-[#1877F2] text-white text-[10px] font-bold leading-5 text-center">
                      f
                    </span>
                    Facebook
                  </p>
                  <div className="rounded-lg overflow-hidden bg-[#242526] border border-[#3a3b3c] max-w-sm">
                    <ImagePlaceholder />
                    <div className="p-3">
                      <p className="text-xs text-[#b0b3b8] uppercase tracking-wide">
                        {shortUrl.toUpperCase()}
                      </p>
                      <p className="text-[15px] text-white font-semibold leading-tight mt-0.5 line-clamp-2">
                        {displayTitle}
                      </p>
                      <p className="text-xs text-[#b0b3b8] mt-1 line-clamp-2">
                        {displayDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-rana-light/40 mb-2 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-5 h-5 rounded bg-black border border-gray-700 text-white text-[10px] font-bold leading-5 text-center">
                      𝕏
                    </span>
                    Twitter / X
                  </p>
                  <div className="rounded-2xl overflow-hidden bg-black border border-[#2f3336] max-w-sm">
                    <ImagePlaceholder />
                    <div className="p-3">
                      <p className="text-[15px] text-[#e7e9ea] font-bold leading-tight line-clamp-2">
                        {displayTitle}
                      </p>
                      <p className="text-[13px] text-[#71767b] mt-1 line-clamp-2">
                        {displayDesc}
                      </p>
                      <p className="text-[13px] text-[#71767b] mt-1 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.96 14.945c-.067 0-.136-.01-.203-.032l-5.166-1.76a.56.56 0 01-.217-.14.56.56 0 01-.14-.217.56.56 0 01-.015-.256.56.56 0 01.104-.236l3.44-4.743a.56.56 0 01.225-.177.56.56 0 01.283-.033.56.56 0 01.258.117.56.56 0 01.164.238l1.76 5.166a.56.56 0 01-.015.422.56.56 0 01-.3.286.56.56 0 01-.188.035zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                        {shortUrl}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-rana-light/40 mb-2 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-5 h-5 rounded bg-[#0a66c2] text-white text-[10px] font-bold leading-5 text-center">
                      in
                    </span>
                    LinkedIn
                  </p>
                  <div className="rounded-lg overflow-hidden bg-white border border-[#e0e0e0] max-w-sm">
                    <ImagePlaceholder />
                    <div className="p-3">
                      <p className="text-[14px] text-[#000000] font-semibold leading-tight line-clamp-2">
                        {displayTitle}
                      </p>
                      <p className="text-[12px] text-[#666666] mt-1 line-clamp-2">
                        {displayDesc}
                      </p>
                      <p className="text-[12px] text-[#999999] mt-2 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.96 14.945c-.067 0-.136-.01-.203-.032l-5.166-1.76a.56.56 0 01-.217-.14.56.56 0 01-.14-.217.56.56 0 01-.015-.256.56.56 0 01.104-.236l3.44-4.743a.56.56 0 01.225-.177.56.56 0 01.283-.033.56.56 0 01.258.117.56.56 0 01.164.238l1.76 5.166a.56.56 0 01-.015.422.56.56 0 01-.3.286.56.56 0 01-.188.035z" />
                        </svg>
                        {displaySite}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-rana-light/40 mb-2 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-5 h-5 rounded bg-[#25d366] text-white text-[10px] font-bold leading-5 text-center">
                      W
                    </span>
                    WhatsApp
                  </p>
                  <div className="rounded-lg overflow-hidden bg-[#0b141a] border border-[#233138] max-w-sm p-3">
                    <div className="flex gap-3">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={displayTitle}
                          className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-md bg-[#233138] flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-[#8696a0]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[13px] text-[#e9edef] font-medium leading-tight line-clamp-2">
                          {displayTitle}
                        </p>
                        <p className="text-[12px] text-[#8696a0] mt-1 line-clamp-2">
                          {displayDesc}
                        </p>
                        <p className="text-[11px] text-[#00a884] mt-1.5">
                          {shortUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              📋 Meta tags generados
            </h2>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-rana-green/10 text-rana-green text-sm font-medium hover:bg-rana-green/20 transition-colors"
            >
              {copied ? "✓ Copiado!" : "📋 Copiar todo"}
            </button>
          </div>
          <p className="text-rana-light/30 text-xs mb-3">
            Pega estos tags en el {"<head>"} de tu HTML:
          </p>
          <div className="rounded-xl bg-rana-background border border-rana-border p-4 overflow-x-auto">
            <pre className="text-sm text-rana-light/80 font-mono whitespace-pre leading-relaxed">
              {metaTags}
            </pre>
          </div>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">
            <span className="gradient-text">
              Consejos para tus OG tags
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-green">
                📐 Imagen
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Tamaño recomendado: 1200×630 px</li>
                <li>• Formato: JPG o PNG</li>
                <li>• Texto legible en la imagen</li>
                <li>• Evita texto excesivo</li>
                <li>• Mínimo 600×315 px</li>
              </ul>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-lime">
                📝 Título y descripción
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Título: máximo 60 caracteres</li>
                <li>• Descripción: máximo 200 caracteres</li>
                <li>• Incluye tu keyword principal</li>
                <li>• Sé claro y atractivo</li>
                <li>• Cada página con tags únicos</li>
              </ul>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-gold">
                ⚡ Extra
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Usa twitter:card summary_large_image</li>
                <li>• Verifica con Facebook Sharing Debugger</li>
                <li>• Prueba con Twitter Card Validator</li>
                <li>• Actualiza si cambias la imagen</li>
                <li>• Incluye og:url canónico</li>
              </ul>
            </div>
          </div>
        </div>

        <Link
          href="/chat"
          className="block rounded-2xl bg-rana-surface border border-rana-gold/20 p-6 sm:p-8 text-center hover:border-rana-gold/40 transition-colors"
        >
          <p className="text-lg sm:text-xl font-bold text-rana-gold mb-2">
            ¿Tu web pierde clientes? 🐸 Chachi Rana Chat atiende 24/7
          </p>
          <p className="text-rana-light/60 text-sm mb-4">
            Un chat inteligente en tu web que convierte visitantes en clientes
            mientras tú descansas.
          </p>
          <span className="inline-block px-6 py-3 rounded-xl bg-rana-gold text-rana-dark font-bold hover:bg-rana-gold-dark transition-colors">
            Probar Chachi Rana Chat gratis →
          </span>
        </Link>
      </div>
    </div>
  );
}
