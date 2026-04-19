import type { Metadata } from "next";
import RobotsTxtGenerator from "./RobotsTxtGenerator";

export const metadata: Metadata = {
  title: "Robots.txt Generator Gratis | Crea tu archivo robots.txt",
  description:
    "Genera tu archivo robots.txt fácilmente. Configura qué bots pueden rastrear tu web y cuáles bloquear. Plantillas para Google, Bing y más.",
  keywords: [
    "robots.txt generator",
    "generador robots.txt",
    "bloquear bots",
    "SEO técnico",
    "rastreo Google",
  ],
};

export default function Page() {
  return <RobotsTxtGenerator />;
}
