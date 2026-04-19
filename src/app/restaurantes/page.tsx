import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chatbot IA para Restaurantes | Reservas y Menú Automático",
  description:
    "Chat inteligente para restaurantes. Gestiona reservas, muestra el menú, informa de alérgenos y horarios 24/7. Pruébalo gratis 7 días.",
  keywords: [
    "chatbot restaurante",
    "chat IA restaurante",
    "reservas automáticas restaurante",
    "chatbot para bares",
    "atención al cliente restaurante",
    "Chachi Rana",
  ],
  openGraph: {
    title: "Chatbot IA para Restaurantes — Reservas 24/7 | Chachi Rana",
    description:
      "Tu restaurante atiende clientes mientras cocinas. Reservas, menú, alérgenos. Automático.",
    url: "https://chachirana.com/restaurantes",
  },
  alternates: {
    canonical: "https://chachirana.com/restaurantes",
  },
};

const config = {
  icon: "🍽️",
  badge: "Para restaurantes",
  title: "Tu restaurante",
  subtitle: "atiende sin parar",
  description:
    "Un chat que gestiona reservas, muestra tu menú, contesta sobre alérgenos y horarios. Mientras tú cocinas, él vende.",
  problems: [
    {
      icon: "📞",
      text: "El teléfono suena a la hora punta. Pierdes reservas porque no puedes atender.",
    },
    {
      icon: "🕐",
      text: "Te escriben a las 23:00 preguntando horario. A la mañana ya se han ido a otro sitio.",
    },
    {
      icon: "📋",
      text: "\"¿Tenéis opciones sin gluten?\" La misma pregunta 20 veces al día.",
    },
    {
      icon: "❌",
      text: "Cancelaciones de última hora porque no confirmaste la reserva a tiempo.",
    },
  ],
  solutions: [
    {
      icon: "📅",
      title: "Reservas automáticas",
      text: "El chat confirma reservas, pregunta número de comensales y horario preferido. Llega todo a tu móvil.",
    },
    {
      icon: "📋",
      title: "Menú interactivo",
      text: "Los clientes preguntan por platos, alérgenos, precios. El chat lo sabe todo de tu carta.",
    },
    {
      icon: "🌙",
      title: "Disponible 24/7",
      text: "A las 3 de la mañana o en hora punta. Tu chat nunca se ocupa.",
    },
    {
      icon: "📱",
      title: "WhatsApp y web",
      text: "El chat funciona en tu web y puedes conectarlo a WhatsApp Business.",
    },
    {
      icon: "🔔",
      title: "Notificaciones",
      text: "Recibe cada reserva y mensaje importante al instante en tu móvil.",
    },
    {
      icon: "💬",
      title: "Tono cercano",
      text: "Configúralo para que hable como tú. Amable, cercano, con personalidad.",
    },
  ],
  examples: [
    {
      question: "¿Hacéis reservas para esta noche? Somos 4.",
      answer:
        "¡Claro que sí! 🎉 Tenemos mesa para 4 disponible a las 21:30 o a las 22:00. ¿Cuál te va mejor? Mientras, te dejo nuestro menú aquí 👉 menú del día.",
    },
    {
      question: "¿Tenéis opciones para celíacos?",
      answer:
        "Sí, tenemos varios platos sin gluten. Nuestras paellas, ensaladas y postres caseros son aptos para celíacos. También tenemos pan sin gluten. ¿Quieres que te liste las opciones?",
    },
    {
      question: "¿Cuál es el horario de los domingos?",
      answer:
        "Los domingos abrimos de 13:00 a 16:00 y de 20:30 a 23:30. ¡Te esperamos! 🐸",
    },
    {
      question: "¿Cuánto cuesta el menú del día?",
      answer:
        "El menú del día cuesta 14,90€. Incluye primero, segundo, postre, pan y bebida. Hoy tenemos: primero — ensalada tropical o crema de calabaza, segundo — salmón a la plancha o pollo al curry. ¿Te apetece reservar mesa?",
    },
  ],
  stats: [
    { value: "70%", label: "reservas fuera de horario" },
    { value: "3x", label: "más reservas online" },
    { value: "24/7", label: "disponibilidad" },
    { value: "<2s", label: "tiempo de respuesta" },
  ],
  cta: "🚀 Quiero mi chat gratis",
};

export default function RestaurantesPage() {
  return <SectorPage config={config} />;
}
