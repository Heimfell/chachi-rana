import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Recursos para Negocios Digitales en Español",
  description:
    "Artículos sobre SEO, marketing digital, IA, herramientas y productividad para negocios. Guías prácticas en español, sin humo.",
  keywords: [
    "blog negocios digitales",
    "marketing online pymes",
    "herramientas IA",
    "SEO en español",
    "chatbot negocios",
    "productividad digital",
    "Chachi Rana blog",
  ],
  openGraph: {
    title: "Blog | Recursos para Negocios Digitales | Chachi Rana",
    description: "Artículos sobre SEO, IA, herramientas y marketing para negocios en español.",
    url: "https://chachirana.com/blog",
  },
  alternates: {
    canonical: "https://chachirana.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-rana-background">
      <div className="relative px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          El blog <span className="gradient-text">Chachi</span>
        </h1>
        <p className="text-rana-light/60 text-lg mb-12 max-w-2xl">
          Recursos, guías y artículos sobre negocio digital, IA, SEO, herramientas y marketing. En español, sin humo.
        </p>

        {posts.length === 0 ? (
          <p className="text-rana-light/40">Próximamente más artículos.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 transition-all duration-300 hover:border-rana-green/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:scale-[1.01]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-rana-green/10 text-rana-green text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-rana-light/30 text-xs">
                    {post.readTime} de lectura
                  </span>
                  <span className="text-rana-light/30 text-xs">{post.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-rana-green transition-colors">
                  {post.title}
                </h2>

                <p className="text-rana-light/50 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded bg-rana-surface-light text-rana-light/40 text-xs"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-2xl bg-rana-surface border border-rana-gold/30 p-8 text-center animate-gold-glow">
          <span className="text-3xl mb-3 block">🐸</span>
          <h3 className="text-xl font-bold mb-2">
            ¿Tu web atiende clientes <span className="gradient-text">24/7</span>?
          </h3>
          <p className="text-rana-light/50 text-sm mb-4 max-w-md mx-auto">
            Chachi Rana Chat es un chatbot IA que responde preguntas, captura leads y vende por ti. Pruébalo gratis.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rana-gold text-rana-dark font-bold hover:bg-rana-gold-dark transition-colors"
          >
            🚀 Probar Chat IA gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
