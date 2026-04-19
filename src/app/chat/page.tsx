import type { Metadata } from "next";
import ChatPage from "./ChatPage";

export const metadata: Metadata = {
  title: "Chat IA para tu Negocio | Atiende Clientes 24/7",
  description:
    "Chatbot con inteligencia artificial para tu web. Atiende clientes, captura leads y responde preguntas 24/7. Sin código, sin complicaciones. Prueba gratis 7 días.",
  keywords: [
    "chatbot IA",
    "chat inteligente para web",
    "atención al cliente automática",
    "chatbot para negocios",
    "chatbot restaurante",
    "chatbot clínica",
    "Chachi Rana chat",
    "whitelabel chatbot",
    "atender clientes 24/7",
  ],
  openGraph: {
    title: "Chachi Rana Chat — Tu web atiende clientes mientras duermes",
    description:
      "Chatbot IA que atiende, capta leads y vende por ti las 24 horas. Pruébalo gratis.",
    url: "https://chachirana.com/chat",
  },
  alternates: {
    canonical: "https://chachirana.com/chat",
  },
};

export default function Page() {
  return <ChatPage />;
}
