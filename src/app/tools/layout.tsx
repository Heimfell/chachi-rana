import Link from "next/link";

const tools = [
  { name: "Schema Generator", href: "/tools/schema-generator", icon: "🛠️" },
  { name: "Headline Analyzer", href: "/tools/headline-analyzer", icon: "📊" },
  { name: "Meta Description", href: "/tools/meta-description-generator", icon: "📝" },
  { name: "Open Graph Preview", href: "/tools/og-preview", icon: "🖼️" },
  { name: "Robots.txt Generator", href: "/tools/robots-txt-generator", icon: "🤖" },
  { name: "Landing Page Score", href: "/tools/landing-page-score", icon: "📋" },
  { name: "Firma Email", href: "/tools/email-signature", icon: "✉️" },
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-rana-background/95 backdrop-blur-sm border-b border-rana-border/50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
          >
            <span>🐸</span>
            <span className="font-bold gradient-text text-sm">Chachi Rana</span>
          </Link>
          <div className="h-4 w-px bg-rana-border shrink-0" />
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rana-light/50 text-xs font-medium hover:text-rana-green hover:bg-rana-green/5 transition-all shrink-0 whitespace-nowrap"
            >
              <span>{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-rana-border shrink-0" />
          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rana-gold/10 text-rana-gold text-xs font-bold hover:bg-rana-gold/20 transition-all shrink-0 whitespace-nowrap"
          >
            💬 Chat IA
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
