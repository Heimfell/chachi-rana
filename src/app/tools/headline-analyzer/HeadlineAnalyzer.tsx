"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";

const POWER_WORDS = [
  "gratis", "free", "secreto", "secret", "prohibido", "ahora", "hoy",
  "fácil", "rápido", "simple", "nuevo", "nueva", "mejor", "mejores",
  "increíble", "increibles", "impresionante", "esencial", "definitivo",
  "definitiva", "último", "última", "exclusivo", "exclusiva", "potente",
  "éxito", "ganar", "triplicar", "duplicar", "multiplicar", "error",
  "errores", "peligro", "peligroso", "malo", "mortal", "fatal",
  "nunca", "jamás", "siempre", "obvio", "ignorado", "olvidado",
  "completo", "completa", "total", "absoluto", "absoluta", "verdadero",
  "verdadera", "real", "auténtico", "auténtica", "brutal", "bestial",
];

const EMOTIONAL_WORDS = [
  "asombroso", "increíble", "impactante", "devastador", "revolucionario",
  "transformar", "conquistar", "dominar", "destruir", "romper", "superar",
  "shocking", "amazing", "incredible", "mind-blowing", "insane",
];

const STOP_WORDS = new Set([
  "de", "la", "el", "en", "y", "a", "los", "las", "un", "una", "que",
  "se", "del", "por", "con", "para", "al", "es", "lo", "su", "como",
  "más", "pero", "sin", "sobre", "entre", "cuando", "muy", "ya", "no",
  "tu", "mi", "este", "esta", "ese", "esa", "qué", "cómo", "por qué",
  "si", "o", "ha", "han", "le", "les", "nos", "sus", "son", "fue",
  "ser", "tiene", "puede", "todo", "todos", "cada", "hay", "tiene",
]);

const HISTORY_KEY = "headline-analyzer-history";
const MAX_HISTORY = 20;

interface HistoryEntry {
  title: string;
  score: number;
  date: string;
}

function extractKeyword(title: string): string {
  const words = title
    .toLowerCase()
    .replace(/[^\wáéíóúñü]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));
  return words[0] || "tu tema";
}

function generateAlternatives(title: string): string[] {
  const keyword = extractKeyword(title);
  const num = Math.floor(Math.random() * 9) + 3;

  return [
    `${num} Formas ${["Brutales", "Definitivas", "Potentes", "Esenciales"][Math.floor(Math.random() * 4)]} de Mejorar tu ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`,
    `Cómo ${["Conseguir", "Lograr", "Dominar", "Multiplicar"][Math.floor(Math.random() * 4)]} Resultados ${["Increíbles", "Asombrosos", "Reales"][Math.floor(Math.random() * 3)]} en ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Sin ${["Frustración", "Complicaciones", "Perder Tiempo"][Math.floor(Math.random() * 3)]}`,
    `¿Por Qué el 90% Fracasa en ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} y Tú No Tienes Por Qué?`,
  ];
}

function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToHistory(title: string, score: number) {
  try {
    const history = getHistory();
    const entry: HistoryEntry = { title, score, date: new Date().toISOString() };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}

interface AnalysisResult {
  score: number;
  title: string;
  checks: { label: string; passed: boolean; detail: string }[];
  suggestions: string[];
}

function analyzeHeadline(title: string): AnalysisResult {
  if (!title.trim()) {
    return { score: 0, title, checks: [], suggestions: ["Escribe un título para analizarlo"] };
  }

  const checks: { label: string; passed: boolean; detail: string }[] = [];
  const suggestions: string[] = [];
  let score = 0;
  const lower = title.toLowerCase();
  const words = title.split(/\s+/).filter(Boolean);
  const charCount = title.length;

  const lengthOk = charCount >= 30 && charCount <= 65;
  checks.push({
    label: "Longitud óptima (30-65 caracteres)",
    passed: lengthOk,
    detail: `${charCount} caracteres ${lengthOk ? "✓" : charCount < 30 ? "(muy corto)" : "(muy largo, Google lo cortará)"}`,
  });
  if (lengthOk) score += 20;
  else if (charCount >= 20 && charCount <= 75) score += 10;
  if (charCount < 30) suggestions.push("Tu título es muy corto. Intenta alcanzar al menos 30 caracteres.");
  if (charCount > 65) suggestions.push("Tu título supera los 65 caracteres. Google lo cortará en los resultados.");

  const foundPower = POWER_WORDS.filter((w) => lower.includes(w));
  const hasPower = foundPower.length > 0;
  checks.push({
    label: "Power words",
    passed: hasPower,
    detail: hasPower ? `Encontradas: ${foundPower.join(", ")}` : "Ninguna encontrada",
  });
  if (hasPower) score += 20;
  else suggestions.push(`Añade power words como: gratis, secreto, fácil, definitivo, brutal...`);

  const foundEmotional = EMOTIONAL_WORDS.filter((w) => lower.includes(w));
  const hasEmotional = foundEmotional.length > 0;
  checks.push({
    label: "Palabras emocionales",
    passed: hasEmotional,
    detail: hasEmotional ? `Encontradas: ${foundEmotional.join(", ")}` : "Ninguna encontrada",
  });
  if (hasEmotional) score += 15;
  else suggestions.push("Añade palabras emocionales para generar curiosidad o urgencia.");

  const hasNumbers = /\d/.test(title);
  checks.push({
    label: "Contiene números",
    passed: hasNumbers,
    detail: hasNumbers ? "Sí, los números aumentan el CTR" : "Los números o listas aumentan hasta un 36% el CTR",
  });
  if (hasNumbers) score += 15;
  else suggestions.push("Añade un número (ej: '7 trucos', '3 errores', '10 herramientas').");

  const isQuestion = /^[¿?]|^[^\w]*\?|cómo|por qué|qué|cuándo|dónde|cuál|cuáles|cuánto/i.test(title);
  checks.push({
    label: "Es una pregunta",
    passed: isQuestion,
    detail: isQuestion ? "Las preguntas generan curiosidad" : "Formular como pregunta puede aumentar clics",
  });
  if (isQuestion) score += 10;
  else suggestions.push("Prueba formular tu título como pregunta: '¿Cómo...', '¿Por qué...'");

  const hasBrackets = /[\[\(]/.test(title);
  checks.push({
    label: "Paréntesis o corchetes",
    passed: hasBrackets,
    detail: hasBrackets ? "Los brackets aumentan CTR un 38%" : "Añadir (2026) o [Gratis] puede aumentar clics",
  });
  if (hasBrackets) score += 10;

  const wordCount = words.length;
  const wordCountOk = wordCount >= 5 && wordCount <= 12;
  checks.push({
    label: "Número de palabras (5-12 ideal)",
    passed: wordCountOk,
    detail: `${wordCount} palabras ${wordCountOk ? "✓" : wordCount < 5 ? "(muy pocas)" : "(demasiadas)"}`,
  });
  if (wordCountOk) score += 10;
  else if (wordCount >= 3 && wordCount <= 15) score += 5;

  if (!hasNumbers && !isQuestion) {
    suggestions.push("Prueba combinar números + pregunta: '¿7 Herramientas SEO que No Conoces?'");
  }

  return {
    score: Math.min(score, 100),
    title,
    checks,
    suggestions: suggestions.length > 0 ? suggestions : ["Tu título está muy bien. ¡A publicar!"],
  };
}

function getScoreColor(score: number) {
  if (score >= 75) return "text-rana-green";
  if (score >= 50) return "text-rana-gold";
  return "text-red-400";
}

function getScoreLabel(score: number) {
  if (score >= 75) return "Excelente";
  if (score >= 50) return "Bueno";
  if (score >= 25) return "Mejorable";
  return "Débil";
}

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);

  return <>{display}</>;
}

export default function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [copiedAlt, setCopiedAlt] = useState<number | null>(null);

  const result = useMemo(() => analyzeHeadline(headline), [headline]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!headline.trim()) return;
    saveToHistory(headline, result.score);
    setHistory(getHistory());
    setAlternatives(generateAlternatives(headline));
    setHasAnalyzed(true);
  }, [headline, result.score]);

  const handleReAnalyze = useCallback((title: string) => {
    setHeadline(title);
    setHasAnalyzed(false);
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const handleCopyAlt = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedAlt(index);
    setTimeout(() => setCopiedAlt(null), 2000);
  }, []);

  const charLimit = 65;
  const charPercent = Math.min((headline.length / 80) * 100, 100);
  const charBarColor =
    headline.length === 0
      ? "bg-rana-border"
      : headline.length <= charLimit
      ? "bg-rana-green"
      : headline.length <= 75
      ? "bg-rana-gold"
      : "bg-red-400";

  return (
    <div className="min-h-screen bg-rana-background">
      <div className="px-6 pt-20 pb-16 max-w-4xl mx-auto">
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
            <span className="gradient-text">Headline Analyzer</span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Analiza tus títulos y descubre cómo mejorarlos para conseguir más clics. Sin API, sin registro, al instante.
          </p>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 mb-8">
          <label className="block text-sm text-rana-light/60 mb-2">Escribe tu título</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => {
              setHeadline(e.target.value);
              setHasAnalyzed(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze();
            }}
            placeholder="Ej: 7 Herramientas SEO Gratis que Triplicarán tu Tráfico"
            className="w-full px-5 py-4 rounded-xl bg-rana-background border border-rana-border text-white text-lg placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
          />
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-rana-light/30 text-xs">{headline.length} caracteres</span>
              <span className={`text-xs ${headline.length > charLimit ? "text-rana-gold" : "text-rana-light/30"}`}>
                Límite ideal: {charLimit}
              </span>
            </div>
            <div className="w-full bg-rana-background rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${charBarColor}`}
                style={{ width: `${charPercent}%` }}
              />
            </div>
          </div>
        </div>

        {headline.trim() && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 text-center">
                {hasAnalyzed ? (
                  <div className={`text-6xl font-black ${getScoreColor(result.score)} mb-2`}>
                    <AnimatedScore target={result.score} />
                  </div>
                ) : (
                  <div className={`text-6xl font-black ${getScoreColor(result.score)} mb-2`}>
                    {result.score}
                  </div>
                )}
                <div className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </div>
                <div className="text-rana-light/30 text-sm mt-1">de 100</div>
                <div className="mt-6 w-full bg-rana-background rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      result.score >= 75
                        ? "bg-rana-green"
                        : result.score >= 50
                        ? "bg-rana-gold"
                        : "bg-red-400"
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              <div className="lg:col-span-2 rounded-2xl bg-rana-surface border border-rana-border p-6">
                <h3 className="text-lg font-bold mb-4">Análisis</h3>
                <div className="flex flex-col gap-3">
                  {result.checks.map((check) => (
                    <div key={check.label} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 ${check.passed ? "text-rana-green" : "text-rana-light/30"}`}>
                        {check.passed ? "✓" : "○"}
                      </span>
                      <div>
                        <span className={check.passed ? "text-white" : "text-rana-light/50"}>
                          {check.label}
                        </span>
                        <p className="text-rana-light/30 text-xs mt-0.5">{check.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-rana-border">
                  <h4 className="text-sm font-bold text-rana-gold mb-2">💡 Sugerencias</h4>
                  <ul className="flex flex-col gap-1.5">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-rana-light/60">• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {hasAnalyzed && alternatives.length > 0 && (
              <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">✨ Títulos alternativos</h3>
                <div className="flex flex-col gap-3">
                  {alternatives.map((alt, i) => {
                    const altResult = analyzeHeadline(alt);
                    return (
                      <div
                        key={i}
                        className="rounded-xl bg-rana-background border border-rana-border p-4"
                      >
                        <p className="text-sm text-white mb-2">{alt}</p>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${getScoreColor(altResult.score)}`}>
                            Score: {altResult.score}/100
                          </span>
                          <button
                            onClick={() => handleCopyAlt(alt, i)}
                            className="text-xs px-3 py-1 rounded-lg bg-rana-green/10 text-rana-green hover:bg-rana-green/20 transition-colors"
                          >
                            {copiedAlt === i ? "✓ Copiado!" : "📋 Copiar"}
                          </button>
                          <button
                            onClick={() => handleReAnalyze(alt)}
                            className="text-xs px-3 py-1 rounded-lg bg-rana-gold/10 text-rana-gold hover:bg-rana-gold/20 transition-colors"
                          >
                            🔍 Analizar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!hasAnalyzed && headline.trim() && (
              <div className="text-center mb-8">
                <button
                  onClick={handleAnalyze}
                  className="px-8 py-3 rounded-xl bg-rana-green text-rana-dark font-bold transition-all duration-300 hover:scale-105 hover:bg-rana-lime"
                >
                  🔍 Analizar título
                </button>
              </div>
            )}
          </>
        )}

        {history.length > 0 && (
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">📜 Historial</h3>
              <button
                onClick={handleClearHistory}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
              >
                🗑️ Borrar historial
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {history.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => handleReAnalyze(entry.title)}
                  className="flex items-center justify-between gap-4 rounded-xl bg-rana-background border border-rana-border p-3 text-left hover:border-rana-green/30 transition-colors"
                >
                  <span className="text-sm text-rana-light/70 truncate flex-1">
                    {entry.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-bold ${getScoreColor(entry.score)}`}>
                      {entry.score}/100
                    </span>
                    <span className="text-rana-light/20 text-xs">
                      {new Date(entry.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
