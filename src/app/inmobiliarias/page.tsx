import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";

export const metadata: Metadata = {
  title: "Chatbot IA para Inmobiliarias | Captación de Leads Automática",
  description:
    "Chat inteligente para inmobiliarias. Captura leads, informa sobre propiedades y gestiona visitas automáticamente. Pruébalo gratis 7 días.",
  keywords: [
    "chatbot inmobiliaria",
    "chat IA inmuebles",
    "captación leads inmobiliaria",
    "chatbot pisos",
    "atención automática inmobiliaria",
    "Chachi Rana",
  ],
  openGraph: {
    title: "Chatbot IA para Inmobiliarias — Leads 24/7 | Chachi Rana",
    description:
      "Tu inmobiliaria captifica leads mientras no estás. Propiedades, visitas, zona. Automático.",
    url: "https://chachirana.com/inmobiliarias",
  },
  alternates: {
    canonical: "https://chachirana.com/inmobiliarias",
  },
};

const config = {
  icon: "🏠",
  badge: "Para inmobiliarias",
  title: "Tu inmobiliaria",
  subtitle: "captiva sin parar",
  description:
    "Un chat que responde sobre propiedades, filtra leads por presupuesto y zona, y agenda visitas. Cada visitante de tu web es un posible comprador.",
  problems: [
    {
      icon: "💸",
      text: "Un visitante entra a tu web a las 22:00, ve un piso y se va. Nunca supiste que existía.",
    },
    {
      icon: "📞",
      text: "Llamadas de curiosos que no tienen presupuesto ni intención real de comprar.",
    },
    {
      icon: "📋",
      text: "\"¿Tienen algo por la zona X por menos de Y€?\" La misma pregunta todo el día.",
    },
    {
      icon: "⏰",
      text: "Pierdes leads porque no respondes a tiempo. El cliente va a la competencia.",
    },
  ],
  solutions: [
    {
      icon: "🎯",
      title: "Captura de leads",
      text: "Cada visitante que pregunta por una propiedad deja su nombre, email y teléfono.",
    },
    {
      icon: "🏠",
      title: "Catálogo inteligente",
      text: "El chat conoce todas tus propiedades: precio, zona, m², habitaciones, fotos.",
    },
    {
      icon: "📅",
      title: "Agenda visitas",
      text: "El cliente elige día y hora. Llega a tu calendario confirmado.",
    },
    {
      icon: "🔍",
      title: "Filtro de calidad",
      text: "Pregunta presupuesto, necesidades y plazo. Tú solo hablas con leads reales.",
    },
    {
      icon: "📊",
      title: "Dashboard de leads",
      text: "Ve quién pregunta, por qué propiedad y su nivel de interés.",
    },
    {
      icon: "🌙",
      title: "24/7 activo",
      text: "El mercado inmobiliario no duerme. Tu chat tampoco.",
    },
  ],
  examples: [
    {
      question: "¿Tenéis pisos de 3 habitaciones en Chamberí por menos de 350.000€?",
      answer:
        "Sí, tenemos 3 propiedades que encajan: 🏠 C/ Fuencarral 45 — 3hab, 95m², 335.000€. 🏠 C/ Alonso Cano 12 — 3hab, 88m², 345.000€. 🏠 C/ Eloy Gonzalo 28 — 3hab, 92m², 349.000€. ¿Te interesa visitar alguna?",
    },
    {
      question: "¿Cuáles son los gastos de compraventa?",
      answer:
        "Los gastos aproximados sobre el precio de compra son: ITP (6-10% según CCAA), notaría (~600€), registro (~400€), gestoría (~300€). En total, cuenta un 8-12% extra sobre el precio. ¿Quieres que calculemos el coste total para una propiedad concreta?",
    },
    {
      question: "¿Podría visitar el piso de Alonso Cano esta semana?",
      answer:
        "¡Claro! Tenemos disponibilidad para el piso de Alonso Cano 12: 📅 Martes a las 17:00, 📅 Miércoles a las 11:00, 📅 Jueves a las 18:30. ¿Qué día te va mejor? Necesito tu nombre y teléfono para confirmar la visita.",
    },
    {
      question: "¿Aceptáis hipotecas?",
      answer:
        "Sí, por supuesto. Trabajamos con varios bancos que ofrecen condiciones preferentes a nuestros clientes. La hipoteca habitual cubre hasta el 80% del valor de tasación. ¿Quieres que te ponga en contacto con nuestro asesor hipotecario?",
    },
  ],
  stats: [
    { value: "3x", label: "más leads capturados" },
    { value: "50%", label: "leads cualificados" },
    { value: "24/7", label: "disponibilidad" },
    { value: "<2s", label: "tiempo respuesta" },
  ],
  cta: "🚀 Quiero mi chat gratis",
};

export default function InmobiliariasPage() {
  return <SectorPage config={config} />;
}
