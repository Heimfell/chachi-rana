"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute top-20 -left-32 w-96 h-96 bg-rana-green/10 rounded-full animate-blob hero-blob" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-rana-lime/8 rounded-full animate-blob delay-300 hero-blob" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rana-green/5 rounded-full animate-spin-slow hero-blob" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-rana-gold/10 border border-rana-gold/20 text-rana-gold text-sm font-medium mb-6">
              🔥 Nuevo: Chat IA para tu negocio
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
            <span className="gradient-text">Chachi</span>
            <br />
            <span className="gradient-text">Rana</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-rana-light/70 max-w-lg mb-8 mx-auto lg:mx-0">
            Herramientas SEO gratuitas y un chat IA que atiende a tus clientes 24/7. Todo lo que tu negocio necesita para crecer online.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/chat"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-rana-gold text-rana-dark font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-rana-gold/90 animate-gold-glow"
            >
              🐸 Chat IA Gratis 7 días
            </a>
            <a
              href="#herramientas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-rana-border text-rana-light font-medium text-lg transition-all duration-300 hover:border-rana-green hover:bg-rana-green/5"
            >
              Ver herramientas
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg animate-fade-in-up delay-500">
          <div className="animate-float">
            <div className="gif-container aspect-square">
              <img
                src="/rana-imagen-animada-0125.gif"
                alt="Chachi Rana - Herramientas IA y SEO"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rana-background to-transparent" />
    </section>
  );
}
