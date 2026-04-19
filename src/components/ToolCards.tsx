"use client";

import { useEffect, useRef } from "react";

const tools = [
  {
    icon: "💬",
    title: "Chat IA",
    description:
      "Chatbot con IA que atiende a tus clientes 24/7. Captura leads, responde preguntas y vende por ti.",
    href: "/chat",
    available: true,
    featured: true,
  },
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
    icon: "📝",
    title: "Meta Description Generator",
    description:
      "Genera meta descriptions optimizadas con plantillas profesionales. Preview en Google en tiempo real.",
    href: "/tools/meta-description-generator",
    available: true,
  },
  {
    icon: "🖼️",
    title: "Open Graph Preview",
    description:
      "Previsualiza cómo se ve tu enlace en Facebook, Twitter, LinkedIn y WhatsApp. Genera los OG tags.",
    href: "/tools/og-preview",
    available: true,
  },
  {
    icon: "📋",
    title: "Landing Page Score",
    description:
      "Responde 20 preguntas sobre tu landing y descubre tu puntuación. Fixes específicos incluidos.",
    href: "/tools/landing-page-score",
    available: true,
  },
  {
    icon: "🤖",
    title: "Robots.txt Generator",
    description:
      "Genera tu archivo robots.txt fácilmente. Configura qué bots rastrean tu web.",
    href: "/tools/robots-txt-generator",
    available: true,
  },
  {
    icon: "✉️",
    title: "Firma Email",
    description:
      "Crea firmas de email profesionales y modernas. Personaliza colores y copia el HTML.",
    href: "/tools/email-signature",
    available: true,
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
          Herramientas, recursos y productos para que tu negocio crezca online
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <a
            key={tool.title}
            href={tool.href}
            className={`tool-card opacity-0 card-shine group relative rounded-2xl bg-rana-surface border p-8 transition-all duration-500 hover:scale-[1.03] cursor-pointer block ${
              tool.featured
                ? "border-rana-gold/50 lg:col-span-2 hover:border-rana-gold hover:shadow-[0_0_60px_rgba(251,191,36,0.2)]"
                : tool.available
                ? "border-rana-border hover:border-rana-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                : "border-rana-border opacity-60"
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {tool.featured && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rana-gold/10 text-rana-gold text-xs font-bold border border-rana-gold/20">
                Producto estrella
              </span>
            )}

            <span className={`${tool.featured ? "text-6xl" : "text-5xl"} mb-6 block group-hover:animate-float`}>
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
                tool.featured
                  ? "text-rana-gold group-hover:text-rana-gold-dark"
                  : "text-rana-green group-hover:text-rana-lime"
              }`}
            >
              {tool.featured ? "Probar gratis" : "Probar ahora"}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
