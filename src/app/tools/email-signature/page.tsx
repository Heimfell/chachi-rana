import type { Metadata } from "next";
import EmailSignature from "./EmailSignature";

export const metadata: Metadata = {
  title: "Generador de Firma Email Profesional | Gratis",
  description:
    "Crea firmas de email profesionales y modernas. Personaliza colores, añade tus redes sociales y copia el HTML. 100% gratis.",
  keywords: [
    "generador firma email",
    "email signature generator",
    "firma email profesional",
    "firma HTML email",
    "firma Gmail",
  ],
};

export default function Page() {
  return <EmailSignature />;
}
