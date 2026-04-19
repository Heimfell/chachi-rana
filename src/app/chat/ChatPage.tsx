"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import EmailCapture from "@/components/EmailCapture";

const benefits = [
  {
    icon: "🌙",
    title: "Atiende 24/7",
    description:
      "Tu chat responde aunque sea las 3 de la mañana. No pierdes clientes nunca más.",
  },
  {
    icon: "🎯",
    title: "Captura leads",
    description:
      "Recoge nombre, email y teléfono automáticamente durante la conversación.",
  },
  {
    icon: "🧠",
    title: "Aprende de tu negocio",
    description:
      "Pega tu URL o sube tus documentos y el chat aprende solo. Sabe lo que vendes.",
  },
  {
    icon: "💰",
    title: "Cero comisiones",
    description:
      "No cobramos por conversación ni por lead. Precio fijo mensual, sin sorpresas.",
  },
  {
    icon: "⚡",
    title: "Activo en minutos",
    description:
      "Añade tu URL, el chat se entrena automáticamente. Copia un código en tu web y listo.",
  },
  {
    icon: "📊",
    title: "Dashboard completo",
    description:
      "Ve todas las conversaciones, leads capturados y preguntas más frecuentes.",
  },
];

const steps = [
  {
    num: "1",
    title: "Añade tu negocio",
    description: "Pega la URL de tu web o sube tus documentos. El chat lee todo.",
  },
  {
    num: "2",
    title: "Se entrena solo",
    description: "Lee tu web y aprende tus servicios, precios y FAQs automáticamente.",
  },
  {
    num: "3",
    title: "Copia y pega",
    description:
      "Un código en tu web y el chat ya está atendiendo clientes.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "/mes",
    description: "Para negocios que empiezan",
    features: [
      "1 agente de chat",
      "1 dominio",
      "Conocimiento ilimitado",
      "Captura de leads",
      "Dashboard de conversaciones",
      "Soporte por email",
    ],
    cta: "Empezar prueba gratis",
    highlighted: false,
  },
  {
    name: "Business",
    price: "89",
    period: "/mes",
    description: "Para negocios que quieren más",
    features: [
      "3 agentes de chat",
      "3 dominios",
      "Conocimiento ilimitado",
      "Captura de leads avanzada",
      "Analytics completo",
      "Soporte prioritario",
      "Sin branding Chachi Rana",
      "Personalización total",
    ],
    cta: "Empezar prueba gratis",
    highlighted: true,
  },
  {
    name: "Setup",
    price: "149",
    period: " único",
    description: "¿Prefieres que lo hagamos nosotros?",
    features: [
      "Analizamos tu negocio",
      "Entrenamos el chat por ti",
      "Lo integramos en tu web",
      "Ajustamos tono y respuestas",
      "1 revisión incluida",
      "Soporte las primeras 2 semanas",
    ],
    cta: "Solicitar setup",
    highlighted: false,
    note: "Servicio opcional, se suma al plan mensual",
  },
];

const faqs = [
  {
    q: "¿Cómo funciona la prueba gratuita?",
    a: "Te registras, añades la URL de tu web y el chat se configura solo. Lo pruebas durante 7 días sin compromiso. Si te convence, eliges tu plan. Si no, lo borras y listo.",
  },
  {
    q: "¿Necesito saber programar?",
    a: "No. Solo tienes que copiar un código y pegarlo en tu web (te decimos exactamente dónde). Si usas WordPress, Shopify o Wix es aún más fácil. Y si prefieres no hacerlo tú, tenemos el servicio de Setup.",
  },
  {
    q: "¿El chat habla español?",
    a: "Sí, español nativo. También puede responder en inglés, catalán, euskera o gallego si lo necesitas.",
  },
  {
    q: "¿De dónde saca la información el chat?",
    a: "Lo entrenas tú: pegas tu URL o subes documentos, FAQs, precios... Lo que quieras. El chat solo responde con información de tu negocio.",
  },
  {
    q: "¿Puedo ver las conversaciones?",
    a: "Sí, tienes un dashboard donde ves todas las conversaciones, los leads capturados y las preguntas más frecuentes de tus clientes.",
  },
  {
    q: "¿Y si el chat no sabe la respuesta?",
    a: "Puedes configurarlo para que pida el email del cliente y te notifique, o para que ofrezca contactar por teléfono/WhatsApp directamente.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Paga mes a mes, cancela cuando quieras. Sin letra pequeña.",
  },
  {
    q: "¿En cuánto tiempo está funcionando?",
    a: "En 5 minutos. Pegas tu URL, copias el código y lo pones en tu web. Listo.",
  },
];

const useCases = [
  {
    icon: "🍽️",
    title: "Restaurantes",
    description: "Reservas, menú, alérgenos, horarios. Tu chat lo gestiona.",
    href: "/restaurantes",
  },
  {
    icon: "🏥",
    title: "Clínicas",
    description: "Citas, preguntas sobre tratamientos, precios, seguros.",
    href: "/clinicas",
  },
  {
    icon: "🛒",
    title: "E-commerce",
    description: "Estado de pedidos, devoluciones, tamaño, envíos.",
    href: "/ecommerce",
  },
  {
    icon: "🏠",
    title: "Inmobiliarias",
    description: "Propiedades disponibles, visitas, zona, precios.",
    href: "/inmobiliarias",
  },
  {
    icon: "💼",
    title: "Autónomos",
    description: "Presupuestos, servicios, disponibilidad, contacto.",
    href: "/autonomos",
  },
];

export default function ChatPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

    const cards = featuresRef.current?.querySelectorAll(".chat-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-rana-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rana-green/8 rounded-full animate-blob hero-blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rana-gold/5 rounded-full animate-blob delay-300 hero-blob" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
          >
            ← Volver al inicio
          </Link>

          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-rana-green/10 border border-rana-green/20 text-rana-light text-sm font-medium mb-6">
              🐸 Chat IA para tu negocio
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Tu web atiende clientes{" "}
            <span className="gradient-text">mientras duermes</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-rana-light/60 max-w-2xl mx-auto mb-10">
            Un chat con inteligencia artificial que responde preguntas, captura
            leads y vende por ti las 24 horas. Sin código. Sin complicaciones.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#planes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-rana-gold text-rana-dark font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-rana-gold/90 animate-gold-glow"
            >
              🚀 Prueba gratis 7 días
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-rana-border text-rana-light font-medium text-lg transition-all duration-300 hover:border-rana-green hover:bg-rana-green/5"
            >
              Cómo funciona
            </a>
          </div>

          <div className="animate-fade-in-up delay-500 flex flex-wrap items-center justify-center gap-6 text-rana-light/40 text-sm">
            <span className="flex items-center gap-2">
              ✓ Sin permanencia
            </span>
            <span className="flex items-center gap-2">
              ✓ Sin código
            </span>
            <span className="flex items-center gap-2">
              ✓ Español nativo
            </span>
            <span className="flex items-center gap-2">
              ✓ 24/7
            </span>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Todo lo que tu <span className="gradient-text">negocio necesita</span>
          </h2>
          <p className="text-rana-light/60 text-lg max-w-2xl mx-auto">
            Un chat que trabaja por ti sin parar. Captura leads, resuelve dudas
            y cierra ventas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="chat-card opacity-0 card-shine rounded-2xl bg-rana-surface border border-rana-border p-7 transition-all duration-500 hover:scale-[1.03] hover:border-rana-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl mb-4 block">{b.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-rana-light/50 text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-20 bg-rana-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Listo en <span className="gradient-text">3 pasos</span>
          </h2>
          <p className="text-rana-light/60 text-lg mb-12 max-w-xl mx-auto">
            Sin curva de aprendizaje. Sin técnicos. Sin dolores de cabeza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="rounded-2xl bg-rana-surface border border-rana-border p-8 h-full">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-rana-green/20 text-rana-green font-black text-xl mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-rana-light/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-rana-green/30 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Hecho para <span className="gradient-text">tu sector</span>
          </h2>
          <p className="text-rana-light/60 text-lg max-w-2xl mx-auto">
            Cada negocio es diferente. Configura el chat para lo que vendes y cómo hablan tus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {useCases.map((uc) => (
            <Link
              key={uc.title}
              href={uc.href}
              className="group rounded-2xl bg-rana-surface border border-rana-border p-6 text-center transition-all duration-300 hover:border-rana-green/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:scale-[1.03] block"
            >
              <span className="text-4xl mb-3 block group-hover:animate-float">
                {uc.icon}
              </span>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-rana-green transition-colors">
                {uc.title}
              </h3>
              <p className="text-rana-light/40 text-xs leading-relaxed">
                {uc.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="planes" className="px-6 py-20 bg-rana-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Precios <span className="gradient-text">claros</span>
            </h2>
            <p className="text-rana-light/60 text-lg max-w-xl mx-auto">
              Sin letra pequeña. Sin permanencia. Cancela cuando quieras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] ${
                  plan.highlighted
                    ? "bg-rana-surface border-rana-green/50 shadow-[0_0_50px_rgba(34,197,94,0.15)] relative"
                    : "bg-rana-surface/50 border-rana-border"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rana-green text-rana-dark text-xs font-bold">
                    Más popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-rana-light/40 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">
                    {plan.price}€
                  </span>
                  <span className="text-rana-light/40 text-sm">
                    {plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-rana-light/70"
                    >
                      <span className="text-rana-green mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`block text-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                    plan.highlighted
                      ? "bg-rana-green text-rana-dark hover:bg-rana-lime"
                      : "bg-rana-green/10 text-rana-green hover:bg-rana-green/20"
                  }`}
                >
                  {plan.cta}
                </a>
                {plan.note && (
                  <p className="text-rana-light/30 text-xs text-center mt-3">
                    {plan.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-rana-surface border border-rana-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-white">
                  {faq.q}
                </span>
                <span
                  className={`text-rana-green transition-transform duration-300 shrink-0 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-rana-light/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-rana-surface border border-rana-green/30 p-12 overflow-hidden animate-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-rana-green/5 via-transparent to-rana-gold/5" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-rana-green/5 rounded-full animate-blob hero-blob" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">🐸</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                ¿Listo para que tu web{" "}
                <span className="gradient-text">trabaje por ti</span>?
              </h2>
              <p className="text-rana-light/60 text-lg mb-8 max-w-xl mx-auto">
                Prueba gratis 7 días. Sin compromiso. Empieza ahora mismo.
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
              href="/blog"
              className="hover:text-rana-green transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/chat"
              className="hover:text-rana-green transition-colors"
            >
              Chat IA
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
