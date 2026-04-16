"use client";

import { useEffect, useRef } from "react";

const tools = [
  {
    icon: "🛠️",
    title: "Schema Generator",
    description:
      "Genera código JSON-LD para datos estructurados. Article, FAQ, Product, LocalBusiness y más.",
    href: "/tools/schema-generator",
    available: true,
  },
  {
    icon: "📊",
    title: "Headline Analyzer",
    description:
      "Analiza tus títulos y descubre cómo mejorarlos. Score 0-100, power words y sugerencias.",
    href: "/tools/headline-analyzer",
    available: true,
  },
  {
    icon: "💬",
    title: "Chat IA",
    description:
      "Chatea con nuestra inteligencia artificial. Resuelve dudas, genera contenido y más.",
    href: "https://chat.chachirana.com",
    available: true,
  },
  {
    icon: "🔍",
    title: "Meta Description Generator",
    description:
      "Genera meta descriptions optimizadas para tus páginas.",
    href: "#",
    available: false,
  },
  {
    icon: "❓",
    title: "FAQ Generator",
    description:
      "Genera FAQs con schema markup JSON-LD incluido.",
    href: "#",
    available: false,
  },
  {
    icon: "🔎",
    title: "Auditoría SEO",
    description:
      "Analiza tu web y recibe un informe completo con recomendaciones.",
    href: "#",
    available: false,
  },
];

export default function ToolCards() {
  const sectionRef = useRef<HTMLElement>(null);

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

    const cards = sectionRef.current?.querySelectorAll(".tool-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="herramientas"
      ref={sectionRef}
      className="relative px-6 py-24 max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Nuestras <span className="gradient-text">herramientas</span>
        </h2>
        <p className="text-rana-light/60 text-lg max-w-2xl mx-auto">
          Todo lo que necesitas para potenciar tu negocio con inteligencia artificial
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <a
            key={tool.title}
            href={tool.href}
            target={tool.href.startsWith("http") ? "_blank" : undefined}
            rel={tool.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`tool-card opacity-0 card-shine group relative rounded-2xl bg-rana-surface border border-rana-border p-8 transition-all duration-500 hover:scale-[1.03] hover:border-rana-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] cursor-pointer block`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {!tool.available && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rana-gold/10 text-rana-gold text-xs font-medium border border-rana-gold/20">
                Próximamente
              </span>
            )}

            <span className="text-5xl mb-6 block group-hover:animate-float">
              {tool.icon}
            </span>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rana-green transition-colors">
              {tool.title}
            </h3>

            <p className="text-rana-light/50 text-sm leading-relaxed mb-6">
              {tool.description}
            </p>

            <div
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                tool.available
                  ? "text-rana-green group-hover:text-rana-lime"
                  : "text-rana-light/30"
              }`}
            >
              {tool.available ? "Probar ahora" : "Disponible pronto"}
              <svg
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  tool.available ? "opacity-100" : "opacity-30"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
