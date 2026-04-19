import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";

export const metadata: Metadata = {
  title: "Chatbot IA para Clínicas | Citas y Consultas Automáticas",
  description:
    "Chat inteligente para clínicas dentales, médicos y de fisioterapia. Gestiona citas, responde sobre tratamientos y seguros. Pruébalo gratis 7 días.",
  keywords: [
    "chatbot clínica dental",
    "chat IA clínica",
    "citas automáticas clínica",
    "chatbot médico",
    "atención pacientes automática",
    "Chachi Rana",
  ],
  openGraph: {
    title: "Chatbot IA para Clínicas — Citas 24/7 | Chachi Rana",
    description:
      "Tu clínica atiende pacientes las 24 horas. Citas, tratamientos, seguros. Automático.",
    url: "https://chachirana.com/clinicas",
  },
  alternates: {
    canonical: "https://chachirana.com/clinicas",
  },
};

const config = {
  icon: "🏥",
  badge: "Para clínicas",
  title: "Tu clínica",
  subtitle: "nunca cierra",
  description:
    "Un chat que gestiona citas, informa sobre tratamientos y precios, y resuelve dudas de pacientes. Sin esperas, sin saturaciones.",
  problems: [
    {
      icon: "📞",
      text: "La recepción satura por las mañanas. Los pacientes se cansan de esperar al teléfono.",
    },
    {
      icon: "❓",
      text: "\"¿Cuánto cuesta una limpieza dental?\" La misma pregunta 30 veces al día.",
    },
    {
      icon: "📅",
      text: "Citas que se solapan o huecos vacíos por cancelaciones de última hora.",
    },
    {
      icon: "🔄",
      text: "Pacientes que llaman fuera de horario y se van a otra clínica.",
    },
  ],
  solutions: [
    {
      icon: "📅",
      title: "Citas automáticas",
      text: "El chat ofrece huecos disponibles, confirma la cita y envía recordatorio al paciente.",
    },
    {
      icon: "💰",
      title: "Precios y tratamientos",
      text: "Informa sobre cada tratamiento, duración, precio y si lo cubre el seguro.",
    },
    {
      icon: "🌙",
      title: "Disponible 24/7",
      text: "Los pacientes pueden pedir cita a cualquier hora. A la mañana tú solo confirmas.",
    },
    {
      icon: "📋",
      title: "Pre-cita médica",
      text: "Pregunta alergias, medicación actual y motivo de consulta antes de la cita.",
    },
    {
      icon: "🔔",
      title: "Recordatorios",
      text: "Reduce las no-shows con recordatorios automáticos 24h antes.",
    },
    {
      icon: "🔒",
      title: "Privacidad total",
      text: "Cumple con la RGPD. Datos tratados de forma segura y confidencial.",
    },
  ],
  examples: [
    {
      question: "¿Cuánto cuesta una limpieza dental?",
      answer:
        "La limpieza dental tiene un precio de 60€. Con tu seguro sanitaria Sanitas, tiene una cobertura del 80%. ¿Quieres pedir cita? Tenemos disponibilidad este miércoles a las 10:00 o el jueves a las 17:30.",
    },
    {
      question: "¿Hacéis ortodoncia invisible?",
      answer:
        "Sí, trabajamos con Invisalign. El tratamiento tiene un precio desde 2.500€ dependiendo del caso. Lo mejor es que vengas a una primera consulta (es gratuita) para que el doctor evalúe tu caso. ¿Te funciona este viernes a las 12:00?",
    },
    {
      question: "¿Aceptáis seguros de Adeslas?",
      answer:
        "Sí, somos clínica concertada con Adeslas. Las limpiezas y revisiones están cubiertas al 100%. Para tratamientos como ortodoncia, la cobertura varía según tu póliza. ¿Quieres que te agende una revisión?",
    },
    {
      question: "Necesito cancelar mi cita de mañana a las 10:00.",
      answer:
        "Entendido. He cancelado tu cita del [fecha] a las 10:00. Si quieres reagendarla, tenemos disponibilidad el mismo día a las 18:00 o el jueves por la mañana. ¿Te viene bien alguna?",
    },
  ],
  stats: [
    { value: "40%", label: "menos llamadas" },
    { value: "2x", label: "más citas online" },
    { value: "30%", label: "menos no-shows" },
    { value: "24/7", label: "disponibilidad" },
  ],
  cta: "🚀 Quiero mi chat gratis",
};

export default function ClinicasPage() {
  return <SectorPage config={config} />;
}
