"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface Question {
  id: string;
  text: string;
  category: string;
  points: number;
  fixYes: string;
  fixNo: string;
}

interface Category {
  name: string;
  icon: string;
  maxPoints: number;
  questions: Question[];
}

const categories: Category[] = [
  {
    name: "Hero Section",
    icon: "🏠",
    maxPoints: 25,
    questions: [
      {
        id: "hero1",
        text: "¿Tu título explica claramente qué haces/vendes?",
        category: "Hero Section",
        points: 5,
        fixYes: "Tu título comunica tu oferta claramente.",
        fixNo: "Reescribe tu título para que un visitante entienda tu oferta en 3 segundos. Usa lenguaje simple y directo.",
      },
      {
        id: "hero2",
        text: "¿El subtítulo describe el beneficio principal?",
        category: "Hero Section",
        points: 5,
        fixYes: "Buen subtítulo que refuerza el beneficio.",
        fixNo: "Añade un subtítulo bajo el título que explique el beneficio principal de tu producto/servicio en una frase.",
      },
      {
        id: "hero3",
        text: "¿Hay un CTA (botón) visible sin hacer scroll?",
        category: "Hero Section",
        points: 5,
        fixYes: "CTA visible above the fold.",
        fixNo: "Coloca un botón CTA principal visible sin hacer scroll. Debe estar en el primer viewport (above the fold).",
      },
      {
        id: "hero4",
        text: "¿Hay imagen, video o GIF del producto/servicio?",
        category: "Hero Section",
        points: 5,
        fixYes: "Contenido visual presente en el hero.",
        fixNo: "Añade una imagen, video o GIF de tu producto en la sección hero. El contenido visual aumenta la confianza un 80%.",
      },
      {
        id: "hero5",
        text: "¿Se entiende tu oferta en menos de 5 segundos?",
        category: "Hero Section",
        points: 5,
        fixYes: "Oferta clara e inmediata.",
        fixNo: "Simplifica tu hero: título claro + subtítulo con beneficio + CTA. Un visitante debe entender qué ofreces en 5 segundos.",
      },
    ],
  },
  {
    name: "CTA y Conversión",
    icon: "🎯",
    maxPoints: 25,
    questions: [
      {
        id: "cta1",
        text: "¿El botón CTA tiene un color que contrasta con el fondo?",
        category: "CTA y Conversión",
        points: 5,
        fixYes: "Buen contraste del CTA.",
        fixNo: "Cambia el color de tu CTA para que destaque del fondo. Usa un color que no aparezca en ningún otro elemento de la página.",
      },
      {
        id: "cta2",
        text: "¿Hay más de un CTA en la página?",
        category: "CTA y Conversión",
        points: 5,
        fixYes: "Múltiples oportunidades de conversión.",
        fixNo: "Añade CTAs adicionales a lo largo de la página: al menos uno en el hero, otro tras la sección de beneficios, y otro al final.",
      },
      {
        id: "cta3",
        text: "¿El texto del CTA dice qué pasa después de hacer clic?",
        category: "CTA y Conversión",
        points: 5,
        fixYes: "CTA descriptivo y claro.",
        fixNo: "Cambia 'Enviar' o 'Click aquí' por textos que describan la acción: 'Obtener mi presupuesto gratis', 'Empezar mi prueba de 7 días'.",
      },
      {
        id: "cta4",
        text: "¿El formulario tiene 3 campos o menos?",
        category: "CTA y Conversión",
        points: 5,
        fixYes: "Formulario corto y efectivo.",
        fixNo: "Reduce tu formulario a 3 campos o menos. Cada campo extra reduce las conversiones un 25%. Pide solo lo esencial.",
      },
      {
        id: "cta5",
        text: "¿Hay prueba social (testimonios/logos) cerca del CTA?",
        category: "CTA y Conversión",
        points: 5,
        fixYes: "Social proof junto al CTA.",
        fixNo: "Coloca testimonios o logos de clientes justo antes o después de tu CTA. La prueba social cerca del CTA aumenta conversiones un 15%.",
      },
    ],
  },
  {
    name: "Social Proof",
    icon: "⭐",
    maxPoints: 15,
    questions: [
      {
        id: "sp1",
        text: "¿Tienes testimonios de clientes reales?",
        category: "Social Proof",
        points: 5,
        fixYes: "Testimonios reales presentes.",
        fixNo: "Añade al menos 3 testimonios con nombre, foto y resultado concreto. Los testimonios aumentan conversiones un 34%.",
      },
      {
        id: "sp2",
        text: "¿Muestras logos de empresas/clientes?",
        category: "Social Proof",
        points: 5,
        fixYes: "Logos de clientes visibles.",
        fixNo: "Añade una sección con logos de empresas o clientes que usan tu servicio. Genera confianza instantánea.",
      },
      {
        id: "sp3",
        text: "¿Hay números concretos de resultados?",
        category: "Social Proof",
        points: 5,
        fixYes: "Datos concretos de resultados.",
        fixNo: "Incluye métricas específicas: '+500 clientes', 'Ahorramos 30h/mes', '99.9% uptime'. Los números concretos son más creíbles.",
      },
    ],
  },
  {
    name: "SEO y Técnico",
    icon: "🔍",
    maxPoints: 15,
    questions: [
      {
        id: "seo1",
        text: "¿El title tag tiene menos de 60 caracteres?",
        category: "SEO y Técnico",
        points: 3,
        fixYes: "Title tag optimizado.",
        fixNo: "Acorta tu title tag a menos de 60 caracteres. Google lo cortará si es más largo y perderás clics.",
      },
      {
        id: "seo2",
        text: "¿Hay meta description optimizada?",
        category: "SEO y Técnico",
        points: 3,
        fixYes: "Meta description presente.",
        fixNo: "Escribe una meta description de 150-160 caracteres que incluya tu keyword principal y un CTA.",
      },
      {
        id: "seo3",
        text: "¿La URL es corta y descriptiva?",
        category: "SEO y Técnico",
        points: 3,
        fixYes: "URL limpia y descriptiva.",
        fixNo: "Usa URLs cortas con keywords: /servicios-seo en vez de /page?id=123. Las URLs limpias mejoran el CTR un 45%.",
      },
      {
        id: "seo4",
        text: "¿La página carga en menos de 3 segundos?",
        category: "SEO y Técnico",
        points: 3,
        fixYes: "Velocidad de carga óptima.",
        fixNo: "Optimiza la velocidad: comprime imágenes, usa lazy loading, minimiza CSS/JS. Cada segundo extra de carga reduce conversiones un 7%.",
      },
      {
        id: "seo5",
        text: "¿Es responsive (funciona bien en mobile)?",
        category: "SEO y Técnico",
        points: 3,
        fixYes: "Diseño responsive correcto.",
        fixNo: "Haz tu landing 100% responsive. El 60% del tráfico viene de móvil. Google penaliza páginas no responsive.",
      },
    ],
  },
  {
    name: "Contenido",
    icon: "✍️",
    maxPoints: 10,
    questions: [
      {
        id: "cont1",
        text: "¿Hablas de beneficios (no solo features)?",
        category: "Contenido",
        points: 3.5,
        fixYes: "Enfoque en beneficios.",
        fixNo: "Transforma features en beneficios: en vez de 'API REST' di 'Conecta con cualquier herramienta en minutos'.",
      },
      {
        id: "cont2",
        text: "¿Hay sección de FAQ?",
        category: "Contenido",
        points: 3,
        fixYes: "FAQ presente.",
        fixNo: "Añade una sección FAQ con 5-8 preguntas comunes. Resuelve objeciones y mejora el SEO con schema FAQ.",
      },
      {
        id: "cont3",
        text: "¿El texto es escaneable (bullets, negritas, párrafos cortos)?",
        category: "Contenido",
        points: 3.5,
        fixYes: "Contenido escaneable.",
        fixNo: "Usa bullets, negritas, párrafos de 2-3 líneas y subtítulos. Nadie lee landing pages, las escanean.",
      },
    ],
  },
  {
    name: "Mobile y UX",
    icon: "📱",
    maxPoints: 10,
    questions: [
      {
        id: "mob1",
        text: "¿Los botones CTA son thumb-friendly (fáciles de tocar)?",
        category: "Mobile y UX",
        points: 5,
        fixYes: "Botones optimizados para móvil.",
        fixNo: "Haz tus botones más grandes: mínimo 44x44px con padding generoso. Los botones pequeños frustran a usuarios móviles.",
      },
      {
        id: "mob2",
        text: "¿Los formularios funcionan bien en móvil?",
        category: "Mobile y UX",
        points: 5,
        fixYes: "Formularios mobile-friendly.",
        fixNo: "Usa input types correctos (email, tel), autocomplete, y campos grandes. Testea en móvil real.",
      },
    ],
  },
];

const allQuestions = categories.flatMap((c) => c.questions);

function getScoreColor(score: number) {
  if (score >= 70) return "text-rana-green";
  if (score >= 40) return "text-rana-gold";
  return "text-red-400";
}

function getBarColor(score: number) {
  if (score >= 70) return "bg-rana-green";
  if (score >= 40) return "bg-rana-gold";
  return "bg-red-400";
}

function getBarBgColor(score: number) {
  if (score >= 70) return "bg-rana-green/20";
  if (score >= 40) return "bg-rana-gold/20";
  return "bg-red-400/20";
}

function getScoreEmoji(score: number) {
  if (score >= 90) return "🏆";
  if (score >= 70) return "🐸";
  if (score >= 50) return "📈";
  if (score >= 30) return "⚠️";
  return "🔴";
}

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {};
  }, [target]);

  return <>{display}</>;
}

function CircularProgress({ value, size = 200 }: { value: number; size?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(eased * value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-rana-border)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={value >= 70 ? "#22c55e" : value >= 40 ? "#fbbf24" : "#f87171"}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-100"
        style={{ filter: `drop-shadow(0 0 8px ${value >= 70 ? "rgba(34,197,94,0.5)" : value >= 40 ? "rgba(251,191,36,0.5)" : "rgba(248,113,113,0.5)"})` }}
      />
    </svg>
  );
}

export default function LandingPageScore() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const totalQuestions = allQuestions.length;
  const answeredCount = Object.values(answers).filter((a) => a !== null).length;

  const handleAnswer = useCallback((id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const totalScore = allQuestions.reduce((sum, q) => {
    return sum + (answers[q.id] === true ? q.points : 0);
  }, 0);

  const categoryScores = categories.map((cat) => {
    const earned = cat.questions.reduce((sum, q) => {
      return sum + (answers[q.id] === true ? q.points : 0);
    }, 0);
    return {
      name: cat.name,
      icon: cat.icon,
      earned,
      max: cat.maxPoints,
      percentage: Math.round((earned / cat.maxPoints) * 100),
    };
  });

  const fixes = allQuestions
    .filter((q) => answers[q.id] === false)
    .map((q) => ({ category: q.category, fix: q.fixNo }));

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailCaptured(true);
    }
  };

  const handleShare = () => {
    const text = `🐸 Mi Landing Page Score: ${Math.round(totalScore)}/100\n\n${categoryScores.map((c) => `${c.icon} ${c.name}: ${c.percentage}%`).join("\n")}\n\n¿Cuánto saca la tuya? → chachirana.com/tools/landing-page-score`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setEmailCaptured(false);
    setEmail("");
  };

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
            <span className="gradient-text">Landing Page Score</span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Responde 20 preguntas sobre tu landing page y descubre tu puntuación. Fixes específicos para cada punto débil.
          </p>
        </div>

        {!showResults ? (
          <>
            <div className="rounded-2xl bg-rana-surface border border-rana-border p-4 mb-8 sticky top-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-rana-light/50 text-sm">
                    Progreso: {answeredCount}/{totalQuestions} preguntas
                  </span>
                </div>
                <div className="w-48 bg-rana-background rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-rana-green transition-all duration-500"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {categories.map((cat) => (
              <div key={cat.name} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold">{cat.name}</h2>
                  <span className="text-rana-light/30 text-sm">({cat.maxPoints} pts)</span>
                </div>
                <div className="flex flex-col gap-3">
                  {cat.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-4 transition-all duration-300 ${
                        answers[q.id] === true
                          ? "bg-rana-green/5 border-rana-green/30"
                          : answers[q.id] === false
                          ? "bg-red-400/5 border-red-400/20"
                          : "bg-rana-surface border-rana-border"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm flex-1">{q.text}</p>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleAnswer(q.id, true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              answers[q.id] === true
                                ? "bg-rana-green text-rana-dark"
                                : "bg-rana-background border border-rana-border text-rana-light/50 hover:border-rana-green/50 hover:text-rana-green"
                            }`}
                          >
                            Sí
                          </button>
                          <button
                            onClick={() => handleAnswer(q.id, false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              answers[q.id] === false
                                ? "bg-red-400 text-white"
                                : "bg-rana-background border border-rana-border text-rana-light/50 hover:border-red-400/50 hover:text-red-400"
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                      {answers[q.id] === true && (
                        <p className="text-xs text-rana-green/70 mt-2 pl-1">{q.fixYes}</p>
                      )}
                      {answers[q.id] === false && (
                        <p className="text-xs text-red-400/70 mt-2 pl-1">💡 Fix: {q.fixNo}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center mt-10">
              <button
                onClick={() => setShowResults(true)}
                disabled={answeredCount < totalQuestions}
                className="px-8 py-4 rounded-xl bg-rana-green text-rana-dark font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-rana-lime disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {answeredCount < totalQuestions
                  ? `Responde todas las preguntas (${totalQuestions - answeredCount} restantes)`
                  : "🐸 Ver mi Score"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="relative inline-block">
                <CircularProgress value={totalScore} size={200} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-black ${getScoreColor(totalScore)}`}>
                    <AnimatedScore target={Math.round(totalScore)} />
                  </span>
                  <span className="text-rana-light/40 text-sm">de 100</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-4xl">{getScoreEmoji(totalScore)}</span>
              </div>
              <p className={`text-xl font-bold mt-2 ${getScoreColor(totalScore)}`}>
                {totalScore >= 90
                  ? "¡Landing Page premium!"
                  : totalScore >= 70
                  ? "¡Buena landing, casi perfecta!"
                  : totalScore >= 50
                  ? "Vas por buen camino, pero puedes mejorar"
                  : totalScore >= 30
                  ? "Tu landing necesita trabajo"
                  : "Tu landing necesita bastante trabajo"}
              </p>
            </div>

            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 mb-8">
              <h3 className="text-lg font-bold mb-5">Desglose por categoría</h3>
              <div className="flex flex-col gap-4">
                {categoryScores.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.name}
                      </span>
                      <span className={`text-sm font-bold ${getScoreColor(cat.percentage)}`}>
                        {cat.percentage}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 overflow-hidden ${getBarBgColor(cat.percentage)}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${getBarColor(cat.percentage)}`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {fixes.length > 0 && (
              <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">
                  🔧 Fixes específicos ({fixes.length})
                </h3>
                <div className="flex flex-col gap-3">
                  {fixes.map((fix, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-rana-background border border-rana-border p-4"
                    >
                      <span className="text-xs text-rana-gold font-medium">{fix.category}</span>
                      <p className="text-sm text-rana-light/70 mt-1">{fix.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                onClick={handleShare}
                className="px-6 py-3 rounded-xl bg-rana-green/10 border border-rana-green/30 text-rana-green font-medium hover:bg-rana-green/20 transition-colors"
              >
                {copied ? "✓ ¡Copiado al clipboard!" : "📋 Comparte tu score"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-rana-surface border border-rana-border text-rana-light/60 font-medium hover:text-white transition-colors"
              >
                🔄 Volver a empezar
              </button>
            </div>

            <div className="rounded-2xl bg-rana-surface border border-rana-gold/20 p-6 mb-8 animate-gold-glow">
              <h3 className="text-lg font-bold mb-2 text-rana-gold">
                📊 ¿Quieres el informe completo?
              </h3>
              <p className="text-rana-light/50 text-sm mb-4">
                Deja tu email y recibirás un PDF con todos los fixes, priorizados por impacto.
              </p>
              {!emailCaptured ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white placeholder:text-rana-light/30 focus:outline-none focus:border-rana-gold focus:ring-1 focus:ring-rana-gold/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-rana-gold text-rana-dark font-bold hover:bg-rana-gold-dark transition-colors whitespace-nowrap"
                  >
                    🐸 Quiero mi informe
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-rana-green">
                  <span className="text-xl">✓</span>
                  <span className="font-medium">¡Apuntado! Revisa tu bandeja de entrada.</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
