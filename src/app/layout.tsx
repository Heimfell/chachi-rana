import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chachirana.com"),
  title: {
    default: "Chachi Rana | Herramientas IA y SEO Gratis en Español",
    template: "%s | Chachi Rana",
  },
  description:
    "Herramientas gratuitas de SEO, IA y chat para negocios. Schema Generator, Headline Analyzer, Meta Description Generator y más. Todo en español.",
  keywords: [
    "herramientas SEO gratis",
    "herramientas IA",
    "chat IA",
    "chatbot para negocios",
    "schema generator",
    "headline analyzer",
    "meta description generator",
    "SEO en español",
    "Chachi Rana",
    "posicionar web",
    "inteligencia artificial gratis",
  ],
  authors: [{ name: "Chachi Rana" }],
  creator: "Chachi Rana",
  publisher: "Chachi Rana",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://chachirana.com",
    siteName: "Chachi Rana",
    title: "Chachi Rana | Herramientas IA y SEO Gratis en Español",
    description:
      "Herramientas gratuitas de SEO, IA y chat para negocios. Todo en español, sin registro.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chachi Rana - Herramientas IA y SEO Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chachi Rana | Herramientas IA y SEO Gratis",
    description:
      "Herramientas gratuitas de SEO, IA y chat para negocios. Todo en español.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://chachirana.com",
  },
  icons: {
    icon: "/frog.svg",
    apple: "/apple-touch-icon.svg",
  },
  verification: {
    google: "google-site-verification=PENDIENTE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chachi Rana",
    url: "https://chachirana.com",
    description:
      "Herramientas gratuitas de SEO, IA y chat para negocios en español.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://chachirana.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
