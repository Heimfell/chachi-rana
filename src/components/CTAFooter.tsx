"use client";

import { useEffect, useRef } from "react";

export default function CTAFooter() {
  const ctaRef = useRef<HTMLElement>(null);

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
      { threshold: 0.2 }
    );

    const el = ctaRef.current?.querySelector(".cta-content");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={ctaRef} className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto text-center cta-content opacity-0">
          <div className="relative rounded-3xl bg-rana-surface border border-rana-border p-12 sm:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rana-green/5 via-transparent to-rana-lime/5" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-rana-green/5 rounded-full animate-blob hero-blob" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rana-lime/5 rounded-full animate-blob delay-500 hero-blob" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">🐸</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                ¿Listo para <span className="gradient-text">saltar</span> al futuro?
              </h2>
              <p className="text-rana-light/60 text-lg mb-8 max-w-xl mx-auto">
                Herramientas, chat IA y recursos para tu negocio. Todo gratis para empezar.
              </p>
              <a
                href="https://chat.chachirana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-rana-gold text-rana-dark font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-rana-gold/90 animate-gold-glow"
              >
                🚀 Empezar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative px-6 py-8 border-t border-rana-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐸</span>
            <span className="font-bold gradient-text">Chachi Rana</span>
          </div>
          <div className="flex items-center gap-6 text-rana-light/30 text-sm">
            <a href="/blog" className="hover:text-rana-green transition-colors">Blog</a>
            <a href="/tools/schema-generator" className="hover:text-rana-green transition-colors">Schema Generator</a>
            <a href="/tools/headline-analyzer" className="hover:text-rana-green transition-colors">Headline Analyzer</a>
            <a href="/seo" className="hover:text-rana-green transition-colors">SEO</a>
            <span>© 2026 Chachi Rana</span>
          </div>
        </div>
      </footer>
    </>
  );
}
