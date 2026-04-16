import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import EmailCapture from "@/components/EmailCapture";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "No encontrado" };

  return {
    title: `${post.title} | Chachi Rana Blog`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-rana-background">
      <article className="px-6 pt-20 pb-16 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
        >
          ← Blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-rana-green/10 text-rana-green text-xs font-medium">
            {post.category}
          </span>
          <span className="text-rana-light/30 text-xs">{post.readTime}</span>
          <span className="text-rana-light/30 text-xs">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black mb-8 leading-tight">
          {post.title}
        </h1>

        <div
          className="prose prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:leading-tight
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-rana-light/70 prose-p:text-lg prose-p:leading-relaxed
            prose-a:text-rana-green prose-a:font-medium
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-rana-lime prose-code:bg-rana-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-rana-surface prose-pre:border prose-pre:border-rana-border
            prose-li:text-rana-light/70 prose-li:text-lg
            prose-ul:my-4 prose-ol:my-4
            prose-blockquote:border-rana-green/30 prose-blockquote:text-rana-light/50
            prose-hr:border-rana-border prose-hr:my-10"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-16 pt-8 border-t border-rana-border">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              ¿Te ha gustado? 🐸
            </h3>
            <p className="text-rana-light/50 text-sm mb-6">
              Recibe más artículos como este directamente en tu correo.
            </p>
            <EmailCapture />
          </div>
        </div>
      </article>
    </div>
  );
}
