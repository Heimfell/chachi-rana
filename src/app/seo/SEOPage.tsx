"use client";

import { useEffect, useRef } from "react";
import EmailCapture from "@/components/EmailCapture";

const features = [
  {
    icon: "📊",
    title: "Análisis SEO con IA",
    description: "Escanea tu web y recibe un informe completo con recomendaciones priorizadas para mejorar tu posicionamiento.",
  },
  {
    icon: "🔑",
    title: "Keywords inteligentes",
    description: "Descubre las mejores palabras clave para tu nicho con predicciones de volumen y dificultad en tiempo real.",
  },
  {
    icon: "📝",
    title: "Contenido optimizado",
    description: "Genera artículos, meta descripciones y títulos optimizados para Google con un solo clic.",
  },
  {
    icon: "🏗️",
    title: "Auditoría técnica",
    description: "Detecta errores de velocidad, enlaces rotos, estructura de datos y problemas de indexación automáticamente.",
  },
  {
    icon: "📈",
    title: "Seguimiento de rankings",
    description: "Monitoriza tus posiciones en Google día a día y recibe alertas cuando algo cambie.",
  },
  {
    icon: "🔗",
    title: "Estrategia de enlaces",
    description: "Identifica oportunidades de link building y analiza el perfil de backlinks de tu competencia.",
  },
];

const steps = [
  { num: "1", text: "Introduce tu URL" },
  { num: "2", text: "La IA analiza tu web" },
  { num: "3", text: "Recibe un plan de acción" },
  { num: "4", text: "Sube en Google" },
];

export default function SEOPage() {
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = featuresRef.current?.querySelectorAll(".seo-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-rana-background">
      <div className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-rana-green/8 rounded-full animate-blob hero-blob" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-rana-lime/5 rounded-full animate-blob delay-300 hero-blob" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
          >
            ← Volver al inicio
          </a>

          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-rana-green/10 border border-rana-green/20 text-rana-light text-sm font-medium mb-6">
              🔍 SEO Inteligente
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            Sube en Google con <span className="gradient-text">IA</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg text-rana-light/60 max-w-2xl mx-auto mb-10">
            Análisis SEO automático, keywords inteligentes y contenido optimizado. Deja que la IA haga el trabajo pesado mientras tú ves cómo subes en los resultados.
          </p>

          <div className="animate-fade-in-up delay-300 flex justify-center gap-3 mb-16">
            <EmailCapture />
          </div>

          <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rana-green/20 text-rana-green font-bold text-sm">
                    {step.num}
                  </span>
                  <span className="text-rana-light/60 text-sm">{step.text}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="text-rana-green/30 hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section ref={featuresRef} className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`seo-card opacity-0 card-shine rounded-2xl bg-rana-surface border border-rana-border p-7 transition-all duration-500 hover:scale-[1.03] hover:border-rana-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-rana-light/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-rana-surface border border-rana-border p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rana-green/5 via-transparent to-rana-lime/5" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-rana-green/5 rounded-full animate-blob hero-blob" />

            <div className="relative z-10">
              <span className="text-4xl mb-4 block">🚀</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Sé el primero en probarlo
              </h2>
              <p className="text-rana-light/60 mb-8 max-w-lg mx-auto">
                Estamos preparando la herramienta SEO más chachi del mercado. Deja tu email y te avisamos cuando esté lista.
              </p>
              <EmailCapture />
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-rana-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-lg">🐸</span>
            <span className="font-bold gradient-text">Chachi Rana</span>
          </a>
          <p className="text-rana-light/30 text-sm">
            © 2026 Chachi Rana. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
