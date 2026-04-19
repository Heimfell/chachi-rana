import type { Metadata } from "next";
import OGPreview from "./OGPreview";

export const metadata: Metadata = {
  title: "Open Graph Preview & Generator | OG Tags Gratis",
  description:
    "Previsualiza cómo se ve tu enlace en Facebook, Twitter, LinkedIn y WhatsApp. Genera los meta tags Open Graph para tu web. Gratis.",
  keywords: [
    "open graph preview",
    "og tags generator",
    "facebook preview",
    "twitter card preview",
    "meta tags redes sociales",
  ],
};

export default function Page() {
  return <OGPreview />;
}
