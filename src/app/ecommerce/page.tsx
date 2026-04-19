import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";

export const metadata: Metadata = {
  title: "Chatbot IA para E-commerce | Atención al Cliente Automática",
  description:
    "Chat inteligente para tiendas online. Estado de pedidos, devoluciones, tallas y envíos automático. Reduce tickets de soporte un 60%. Pruébalo gratis.",
  keywords: [
    "chatbot ecommerce",
    "chat IA tienda online",
    "atención al cliente automática",
    "chatbot Shopify",
    "chatbot WooCommerce",
    "Chachi Rana",
  ],
  openGraph: {
    title: "Chatbot IA para E-commerce — Atención 24/7 | Chachi Rana",
    description:
      "Tu tienda online atiende clientes las 24 horas. Pedidos, devoluciones, tallas. Automático.",
    url: "https://chachirana.com/ecommerce",
  },
  alternates: {
    canonical: "https://chachirana.com/ecommerce",
  },
};

const config = {
  icon: "🛒",
  badge: "Para tiendas online",
  title: "Tu tienda online",
  subtitle: "vende mientras duermes",
  description:
    "Un chat que resuelve dudas de productos, gestiona devoluciones, informa de envíos y recomienda productos. Reducción de tickets de soporte desde el día uno.",
  problems: [
    {
      icon: "📩",
      text: "Tu bandeja de email se llena de \"¿cuándo llega mi pedido?\" y \"¿qué talla soy?\". Repetitivo y agotador.",
    },
    {
      icon: "💸",
      text: "El cliente duda entre dos productos. Si nadie le responde ya, se va de tu web.",
    },
    {
      icon: "🔄",
      text: "Devoluciones lentas porque el proceso no está claro. El cliente se enfada más.",
    },
    {
      icon: "🌍",
      text: "¿Y si alguien compra a las 3 de la mañana? No hay nadie para ayudarle.",
    },
  ],
  solutions: [
    {
      icon: "📦",
      title: "Estado de pedidos",
      text: "El cliente pregunta por su pedido y recibe la info al instante. Sin esperar email.",
    },
    {
      icon: "📏",
      title: "Guía de tallas",
      text: "Pregunta altura y peso, el chat recomienda la talla perfecta. Menos devoluciones.",
    },
    {
      icon: "🔄",
      title: "Devoluciones fáciles",
      text: "Explica la política, genera la etiqueta y gestiona el proceso paso a paso.",
    },
    {
      icon: "🎯",
      title: "Recomendaciones",
      text: "Si buscan un regalo, el chat sugiere productos según presupuesto y ocasión.",
    },
    {
      icon: "💰",
      title: "Captura leads",
      text: "Recoge emails de visitantes que no compran aún. Para tu newsletter y retargeting.",
    },
    {
      icon: "🛍️",
      title: "Carrito abandonado",
      text: "Ofrece descuentos o ayuda en tiempo real cuando el cliente duda.",
    },
  ],
  examples: [
    {
      question: "¿Cuándo llega mi pedido #CR-4821?",
      answer:
        "Tu pedido #CR-4821 está en tránsito. El transportista es Correos y la fecha estimada de entrega es mañana entre 10:00 y 14:00. Te enviamos el enlace de seguimiento por email. ¿Necesitas algo más?",
    },
    {
      question: "¿Qué talla debo pedir si mido 1,75 y peso 72kg?",
      answer:
        "Con tu altura y peso, te recomendamos la talla M. Nuestros clientes con medidas similares quedan genial con la M. Si estás entre dos tallas, siempre recomendamos la mayor para más comodidad. ¿Quieres que te ayude a elegir?",
    },
    {
      question: "¿Cómo puedo devolver un producto?",
      answer:
        "Muy fácil: 1️⃣ Ve a 'Mi cuenta' > 'Devoluciones', 2️⃣ Selecciona el producto y motivo, 3️⃣ Imprime la etiqueta gratuita, 4️⃣ Déjalo en cualquier punto Correos. Tienes 30 días. ¿Quieres que inicie el proceso ahora?",
    },
    {
      question: "Busco un regalo para mi madre, unos 50€.",
      answer:
        "¡Qué bonito! 🎁 Para 50€ te recomiendo: 1) Set de skincare premium (49,90€), 2) Pañuelo de seda artesanal (45€), 3) Kit de aromaterapia (52€). ¿Cuál le gusta más? Todos con caja regalo gratuita.",
    },
  ],
  stats: [
    { value: "60%", label: "menos tickets soporte" },
    { value: "35%", label: "más conversiones" },
    { value: "<2s", label: "tiempo respuesta" },
    { value: "24/7", label: "disponibilidad" },
  ],
  cta: "🚀 Quiero mi chat gratis",
};

export default function EcommercePage() {
  return <SectorPage config={config} />;
}
