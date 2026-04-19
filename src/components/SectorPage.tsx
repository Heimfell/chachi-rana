"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import EmailCapture from "@/components/EmailCapture";

interface SectorConfig {
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  problems: { icon: string; text: string }[];
  solutions: { icon: string; title: string; text: string }[];
  examples: { question: string; answer: string }[];
  stats: { value: string; label: string }[];
  cta: string;
}

export default function SectorPage({
  config,
}: {
  config: SectorConfig;
}) {
  const solutionsRef = useRef<HTMLElement>(null);

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

    const cards = solutionsRef.current?.querySelectorAll(".sector-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-rana-background">
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rana-green/8 rounded-full animate-blob hero-blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rana-gold/5 rounded-full animate-blob delay-300 hero-blob" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
          >
            ← Chat IA
          </Link>

          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-rana-green/10 border border-rana-green/20 text-rana-light text-sm font-medium mb-6">
              {config.badge}
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            {config.title}{" "}
            <span className="gradient-text">{config.subtitle}</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-rana-light/60 max-w-2xl mx-auto mb-10">
            {config.description}
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-rana-gold text-rana-dark font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-rana-gold/90 animate-gold-glow"
            >
              {config.cta}
            </a>
            <a
              href="#ejemplos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-rana-border text-rana-light font-medium text-lg transition-all duration-300 hover:border-rana-green hover:bg-rana-green/5"
            >
              Ver ejemplos
            </a>
          </div>
        </div>
      </section>

      {config.stats.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {config.stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl bg-rana-surface border border-rana-border p-6"
              >
                <div className="text-3xl font-black gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-rana-light/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 py-16 bg-rana-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Los problemas que{" "}
            <span className="gradient-text">conoces demasiado bien</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.problems.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-rana-surface border border-red-400/20 p-5"
              >
                <span className="text-2xl shrink-0">{p.icon}</span>
                <p className="text-rana-light/70 text-sm leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={solutionsRef} className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tu chat <span className="gradient-text">lo resuelve</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.solutions.map((s, i) => (
            <div
              key={s.title}
              className="sector-card opacity-0 card-shine rounded-2xl bg-rana-surface border border-rana-border p-7 transition-all duration-500 hover:scale-[1.03] hover:border-rana-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-rana-light/50 text-sm leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="ejemplos" className="px-6 py-20 bg-rana-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Así <span className="gradient-text">habla tu chat</span>
            </h2>
            <p className="text-rana-light/60 text-lg">
              Ejemplos reales de conversaciones que tu chat maneja solo.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {config.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-2xl bg-rana-surface border border-rana-border overflow-hidden"
              >
                <div className="px-6 py-4 bg-rana-green/10 border-b border-rana-border">
                  <span className="text-sm text-rana-green font-medium">
                    👤 Cliente pregunta:
                  </span>
                  <p className="text-white font-medium mt-1">{ex.question}</p>
                </div>
                <div className="px-6 py-4">
                  <span className="text-sm text-rana-lime font-medium">
                    🐸 Chachi Rana responde:
                  </span>
                  <p className="text-rana-light/70 mt-1">{ex.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-rana-surface border border-rana-border p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Cómo funciona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-rana-green/20 text-rana-green font-bold text-sm mx-auto mb-3">
                1
              </span>
              <h4 className="font-bold text-white text-sm mb-1">
                Añade tu negocio
              </h4>
              <p className="text-rana-light/40 text-xs">
                Pega la URL de tu web o sube tus documentos.
              </p>
            </div>
            <div className="text-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-rana-green/20 text-rana-green font-bold text-sm mx-auto mb-3">
                2
              </span>
              <h4 className="font-bold text-white text-sm mb-1">
                Se entrena solo
              </h4>
              <p className="text-rana-light/40 text-xs">
                El chat lee tu web y aprende todo automáticamente.
              </p>
            </div>
            <div className="text-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-rana-green/20 text-rana-green font-bold text-sm mx-auto mb-3">
                3
              </span>
              <h4 className="font-bold text-white text-sm mb-1">
                Pega el código
              </h4>
              <p className="text-rana-light/40 text-xs">
                Copia el código en tu web. Funciona al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-rana-surface border border-rana-green/30 p-12 overflow-hidden animate-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-rana-green/5 via-transparent to-rana-gold/5" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-rana-green/5 rounded-full animate-blob hero-blob" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">{config.icon}</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                ¿Listo para <span className="gradient-text">empezar</span>?
              </h2>
              <p className="text-rana-light/60 text-lg mb-8 max-w-xl mx-auto">
                Prueba gratis 7 días. Sin compromiso. Empieza en minutos.
              </p>
              <EmailCapture />
              <p className="text-rana-light/30 text-xs mt-4">
                Acceso inmediato. Tu chat listo en minutos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-rana-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-lg">🐸</span>
            <span className="font-bold gradient-text">Chachi Rana</span>
          </Link>
          <div className="flex items-center gap-6 text-rana-light/30 text-sm">
            <Link
              href="/chat"
              className="hover:text-rana-green transition-colors"
            >
              Chat IA
            </Link>
            <Link
              href="/blog"
              className="hover:text-rana-green transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/tools/schema-generator"
              className="hover:text-rana-green transition-colors"
            >
              Herramientas
            </Link>
            <span>© 2026 Chachi Rana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
