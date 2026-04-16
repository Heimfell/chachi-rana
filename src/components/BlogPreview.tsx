import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Blog <span className="gradient-text">SEO</span>
          </h2>
          <p className="text-rana-light/60 text-lg max-w-xl">
            Artículos para aprender a posicionar tu web. Sin humo, en español.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rana-border text-rana-light/60 text-sm font-medium hover:border-rana-green hover:text-rana-green transition-all"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl bg-rana-surface border border-rana-border p-6 transition-all duration-300 hover:border-rana-green/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:scale-[1.02] block"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-rana-green/10 text-rana-green text-xs font-medium">
                {post.category}
              </span>
              <span className="text-rana-light/25 text-xs">{post.readTime}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rana-green transition-colors leading-snug">
              {post.title}
            </h3>

            <p className="text-rana-light/40 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rana-border text-rana-light/60 text-sm font-medium hover:border-rana-green hover:text-rana-green transition-all"
        >
          Ver todos los artículos →
        </Link>
      </div>
    </section>
  );
}
