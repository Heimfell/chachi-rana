import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";

export const metadata: Metadata = {
  title: "Chatbot IA para Autónomos | Presupuestos y Consultas Automáticas",
  description:
    "Chat inteligente para autónomos y freelancers. Presupuestos automáticos, consultas sobre servicios, disponibilidad. Pruébalo gratis 7 días.",
  keywords: [
    "chatbot autónomos",
    "chat IA freelance",
    "presupuestos automáticos",
    "chatbot para profesionales",
    "atención cliente autónomo",
    "Chachi Rana",
  ],
  openGraph: {
    title: "Chatbot IA para Autónomos — Presupuestos 24/7 | Chachi Rana",
    description:
      "Tu web profesional atiende consultas y envía presupuestos sin que estés delante. Automático.",
    url: "https://chachirana.com/autonomos",
  },
  alternates: {
    canonical: "https://chachirana.com/autonomos",
  },
};

const config = {
  icon: "💼",
  badge: "Para autónomos",
  title: "Tu negocio",
  subtitle: "no para nunca",
  description:
    "Un chat que envía presupuestos, informa sobre tus servicios y captura leads. Tú te concentras en trabajar, el chat consigue clientes.",
  problems: [
    {
      icon: "⏰",
      text: "Estás trabajando y no puedes contestar. El posible cliente se va a otro sitio.",
    },
    {
      icon: "📋",
      text: "El mismo \"¿cuánto cobras por X?\" una y otra vez. Te quita tiempo de facturar.",
    },
    {
      icon: "💸",
      text: "Clientes potenciales que visitan tu web y se van sin dejar sus datos.",
    },
    {
      icon: "📱",
      text: "WhatsApp, email, teléfono... consultas por todos lados y no puedes con todo.",
    },
  ],
  solutions: [
    {
      icon: "📋",
      title: "Presupuestos auto",
      text: "El chat da rango de precios según el servicio y recopila detalles del proyecto.",
    },
    {
      icon: "🎯",
      title: "Captura leads",
      text: "Cada visitante que consulta algo deja su contacto. Tú decides cuándo llamar.",
    },
    {
      icon: "📦",
      title: "Catálogo de servicios",
      text: "El chat conoce tus servicios, experiencia, precios y disponibilidad.",
    },
    {
      icon: "📅",
      title: "Agenda reuniones",
      text: "El cliente elige hueco directo de tu calendario. Sin emails de ida y vuelta.",
    },
    {
      icon: "🌙",
      title: "24/7 activo",
      text: "Tu web trabaja mientras tú facturas, duermes o estás con clientes.",
    },
    {
      icon: "💬",
      title: "Filtra consultas",
      text: "Solo te llegan los leads serios. Las preguntas básicas las responde el chat.",
    },
  ],
  examples: [
    {
      question: "¿Cuánto cobrais por hacer una web para un negocio local?",
      answer:
        "Para una web de negocio local, nuestros precios arrancan desde 800€ (landing page con contacto) hasta 2.500€ (web completa con catálogo y reservas). Todo incluye diseño responsive, SEO básico y hosting el primer año. ¿Quieres que te prepare un presupuesto personalizado? Solo necesito unos detalles sobre tu negocio.",
    },
    {
      question: "¿Cuál es vuestra disponibilidad para empezar un proyecto?",
      answer:
        "Actualmente tenemos disponibilidad para empezar proyectos nuevos a partir de la semana del 28 de abril. Los proyectos de web suelen tardar 2-3 semanas. ¿Quieres agendar una llamada para hablar de tu proyecto?",
    },
    {
      question: "¿Hacéis mantenimiento mensual?",
      answer:
        "Sí, ofrecemos planes de mantenimiento desde 59€/mes que incluyen: actualizaciones, copias de seguridad semanales, monitorización de velocidad y soporte técnico. ¿Para qué tipo de web lo necesitas?",
    },
    {
      question: "¿Trabajáis con empresas de fuera de Madrid?",
      answer:
        "¡Por supuesto! Trabajamos con clientes de toda España. Las reuniones son online y la comunicación por email/Slack. De hecho, el 60% de nuestros clientes son fuera de Madrid. ¿De qué ciudad nos escribes?",
    },
  ],
  stats: [
    { value: "3x", label: "más leads" },
    { value: "70%", label: "consultas resueltas" },
    { value: "24/7", label: "disponibilidad" },
    { value: "<2s", label: "tiempo respuesta" },
  ],
  cta: "🚀 Quiero mi chat gratis",
};

export default function AutonomosPage() {
  return <SectorPage config={config} />;
}
