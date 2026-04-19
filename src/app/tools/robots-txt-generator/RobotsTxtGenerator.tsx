"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

type UserAgent = "todos" | "googlebot" | "bingbot" | "slurp" | "baiduspider" | "otro";

const userAgentOptions: { value: UserAgent; label: string; agent: string }[] = [
  { value: "todos", label: "Todos los bots", agent: "*" },
  { value: "googlebot", label: "Googlebot", agent: "Googlebot" },
  { value: "bingbot", label: "Bingbot", agent: "bingbot" },
  { value: "slurp", label: "Slurp Yahoo", agent: "Slurp" },
  { value: "baiduspider", label: "Baiduspider", agent: "Baiduspider" },
  { value: "otro", label: "Otro", agent: "" },
];

const aiBots = [
  { agent: "GPTBot", label: "GPTBot (ChatGPT)" },
  { agent: "ChatGPT-User", label: "ChatGPT-User" },
  { agent: "CCBot", label: "CCBot (Common Crawl)" },
  { agent: "Google-Extended", label: "Google-Extended (Bard/Gemini)" },
  { agent: "ClaudeBot", label: "ClaudeBot (Anthropic)" },
  { agent: "anthropic-ai", label: "Anthropic-AI" },
  { agent: "Bytespider", label: "Bytespider (TikTok/Bytedance)" },
  { agent: "FacebookBot", label: "FacebookBot (Meta)" },
];

export default function RobotsTxtGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [userAgent, setUserAgent] = useState<UserAgent>("todos");
  const [customAgent, setCustomAgent] = useState("");
  const [allowPaths, setAllowPaths] = useState("");
  const [disallowPaths, setDisallowPaths] = useState("");
  const [blockAiBots, setBlockAiBots] = useState(false);
  const [crawlDelay, setCrawlDelay] = useState("");
  const [copied, setCopied] = useState(false);

  const agentName = userAgent === "otro" ? customAgent : userAgentOptions.find((o) => o.value === userAgent)?.agent ?? "*";

  const allows = useMemo(() => allowPaths.split("\n").map((p) => p.trim()).filter(Boolean), [allowPaths]);
  const disallows = useMemo(() => disallowPaths.split("\n").map((p) => p.trim()).filter(Boolean), [disallowPaths]);

  const robotsTxt = useMemo(() => {
    const lines: string[] = [];

    if (agentName) {
      lines.push("User-agent: " + agentName);
      disallows.forEach((p) => lines.push("Disallow: " + p));
      allows.forEach((p) => lines.push("Allow: " + p));
      if (crawlDelay) {
        const delay = parseInt(crawlDelay, 10);
        if (!isNaN(delay) && delay > 0) {
          lines.push("Crawl-delay: " + delay);
        }
      }
      lines.push("");
    }

    if (blockAiBots) {
      aiBots.forEach((bot) => {
        lines.push("User-agent: " + bot.agent);
        lines.push("Disallow: /");
        lines.push("");
      });
    }

    if (sitemapUrl.trim()) {
      lines.push("Sitemap: " + sitemapUrl.trim());
    }

    return lines.join("\n");
  }, [agentName, allows, disallows, crawlDelay, blockAiBots, sitemapUrl]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [robotsTxt]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([robotsTxt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [robotsTxt]);

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
              Robots.txt Generator
            </span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Genera tu archivo robots.txt fácilmente. Configura qué bots pueden
            rastrear tu web y cuáles bloquear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <h2 className="text-lg font-bold mb-4">Configura tu robots.txt</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  URL del sitemap
                </label>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://tudominio.com/sitemap.xml"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  User-agent
                </label>
                <div className="flex flex-wrap gap-2">
                  {userAgentOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setUserAgent(opt.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        userAgent === opt.value
                          ? "bg-rana-green/15 border-rana-green/50 text-rana-green"
                          : "bg-rana-background border-rana-border text-rana-light/50 hover:border-rana-green/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {userAgent === "otro" && (
                  <input
                    type="text"
                    value={customAgent}
                    onChange={(e) => setCustomAgent(e.target.value)}
                    placeholder="Nombre del bot"
                    className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all mt-2"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Paths to Allow
                </label>
                <textarea
                  value={allowPaths}
                  onChange={(e) => setAllowPaths(e.target.value)}
                  placeholder={"/paginas/"}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all resize-none"
                />
                <span className="text-xs text-rana-light/30 mt-1 block">Una ruta por línea</span>
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Paths to Disallow
                </label>
                <textarea
                  value={disallowPaths}
                  onChange={(e) => setDisallowPaths(e.target.value)}
                  placeholder={"/admin/"}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all resize-none"
                />
                <span className="text-xs text-rana-light/30 mt-1 block">Una ruta por línea</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-rana-background border border-rana-border p-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Bloquear bots de IA
                  </p>
                  <p className="text-xs text-rana-light/40 mt-0.5">
                    ChatGPT, GPTBot, CCBot, ClaudeBot, etc.
                  </p>
                </div>
                <button
                  onClick={() => setBlockAiBots(!blockAiBots)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    blockAiBots ? "bg-rana-green" : "bg-rana-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      blockAiBots ? "translate-x-6.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Crawl-delay (opcional, en segundos)
                </label>
                <input
                  type="number"
                  value={crawlDelay}
                  onChange={(e) => setCrawlDelay(e.target.value)}
                  placeholder="Ej: 10"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  📄 Vista previa robots.txt
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg bg-rana-green/10 text-rana-green text-sm font-medium hover:bg-rana-green/20 transition-colors"
                  >
                    {copied ? "✓ Copiado!" : "📋 Copiar"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-lg bg-rana-gold/10 text-rana-gold text-sm font-medium hover:bg-rana-gold/20 transition-colors"
                  >
                    ⬇️ Descargar
                  </button>
                </div>
              </div>
              <p className="text-rana-light/30 text-xs mb-3">
                El archivo se actualiza en tiempo real mientras configuras:
              </p>
              <div className="rounded-xl bg-rana-background border border-rana-border p-4 overflow-x-auto max-h-[500px] overflow-y-auto">
                <pre className="text-sm text-rana-light/80 font-mono whitespace-pre leading-relaxed">
                  {robotsTxt || "# Configura las opciones para generar tu robots.txt"}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">
            <span className="gradient-text">
              Consejos SEO sobre robots.txt
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-green">
                ¿Qué hace robots.txt?
              </h3>
              <p className="text-sm text-rana-light/60 leading-relaxed">
                El archivo robots.txt indica a los motores de búsqueda qué
                páginas de tu web pueden rastrear y cuáles no. Se coloca en la
                raíz de tu dominio (tudominio.com/robots.txt) y es lo primero
                que leen los bots antes de indexar tu sitio.
              </p>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-lime">
                Errores comunes
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• Bloquear CSS/JS que Google necesita renderizar</li>
                <li>• Usar robots.txt para ocultar páginas sensibles</li>
                <li>• No incluir el sitemap</li>
                <li>• Olvidar subir el archivo a la raíz del dominio</li>
                <li>• Bloquear páginas que quieres indexar</li>
              </ul>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-2 text-rana-gold">
                robots.txt vs meta robots
              </h3>
              <ul className="text-sm text-rana-light/60 space-y-1.5">
                <li>• <strong className="text-white">robots.txt</strong> controla el rastreo (crawling)</li>
                <li>• <strong className="text-white">meta robots</strong> controla la indexación</li>
                <li>• robots.txt no impide que una página indexada aparezca</li>
                <li>• Usa meta robots noindex para excluir páginas del índice</li>
                <li>• Combina ambos para un SEO técnico completo</li>
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
