import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Chachi Rana. Información sobre cómo recogemos, usamos y protegemos tus datos personales conforme al RGPD.",
  alternates: {
    canonical: "https://chachirana.com/politica-privacidad",
  },
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-rana-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rana-light/60 hover:text-rana-green transition-colors mb-8"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 gradient-text">
          Política de Privacidad
        </h1>
        <p className="text-rana-light/50 text-sm mb-10">
          Última actualización: abril de 2026
        </p>

        <div className="space-y-8">
          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              1. Datos del responsable
            </h2>
            <div className="text-rana-light/80 space-y-1 text-sm leading-relaxed">
              <p>
                <span className="text-white font-medium">Responsable:</span>{" "}
                Chachi Rana
              </p>
              <p>
                <span className="text-white font-medium">Sitio web:</span>{" "}
                https://chachirana.com
              </p>
              <p>
                <span className="text-white font-medium">Email:</span>{" "}
                hola@chachirana.com
              </p>
              <p>
                <span className="text-white font-medium">
                  Actividad:
                </span>{" "}
                Herramientas gratuitas de SEO e inteligencia artificial, y
                servicio de chatbot para negocios.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              2. Datos que recogemos
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>Recogemos los siguientes datos de forma automática:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Dirección IP anónima para fines estadísticos.</li>
                <li>
                  Páginas visitadas, tiempo de permanencia y fuente de tráfico.
                </li>
                <li>
                  Datos proporcionados voluntariamente al usar nuestras
                  herramientas (URLs, textos, esquemas JSON-LD generados).
                </li>
                <li>
                  Mensajes enviados al chatbot para procesar la respuesta.
                </li>
                <li>
                  Dirección de correo electrónico si te suscribes a nuestra
                  newsletter.
                </li>
              </ul>
              <p className="mt-3">
                No recogemos datos financieros, de identidad (DNI, pasaporte) ni
                datos especialmente protegidos (salud, afiliación sindical, etc.).
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              3. Finalidad del tratamiento
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>Tratamos tus datos con las siguientes finalidades:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Prestar el servicio de herramientas SEO gratuitas (generación
                  de meta descripciones, análisis de titulares, esquemas
                  estructurados, etc.).
                </li>
                <li>
                  Ofrecer el servicio de chatbot con respuestas basadas en
                  inteligencia artificial.
                </li>
                <li>
                  Mejorar la experiencia de navegación y el rendimiento del
                  sitio.
                </li>
                <li>
                  Enviar comunicaciones por correo electrónico si el usuario se
                  ha suscrito voluntariamente.
                </li>
                <li>Cumplir con obligaciones legales aplicables.</li>
              </ul>
              <p className="mt-3">
                Los datos introducidos en las herramientas y el chatbot se
                procesan en tiempo real y no se almacenan de forma permanente en
                nuestros servidores.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              4. Derechos del usuario
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                De conformidad con el Reglamento General de Protección de Datos
                (RGPD) y la LOPDGDD, tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <span className="text-white font-medium">Acceso:</span>{" "}
                  solicitar información sobre los datos personales que tenemos
                  sobre ti.
                </li>
                <li>
                  <span className="text-white font-medium">Rectificación:</span>{" "}
                  solicitar la corrección de datos inexactos.
                </li>
                <li>
                  <span className="text-white font-medium">Supresión:</span>{" "}
                  solicitar la eliminación de tus datos personales.
                </li>
                <li>
                  <span className="text-white font-medium">
                    Limitación del tratamiento:
                  </span>{" "}
                  solicitar que limitemos el uso de tus datos.
                </li>
                <li>
                  <span className="text-white font-medium">
                    Portabilidad:
                  </span>{" "}
                  recibir tus datos en un formato estructurado.
                </li>
                <li>
                  <span className="text-white font-medium">Oposición:</span>{" "}
                  oponerte al tratamiento de tus datos en determinadas
                  circunstancias.
                </li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, puedes escribirnos a{" "}
                <a
                  href="mailto:hola@chachirana.com"
                  className="text-rana-green hover:text-rana-light transition-colors underline"
                >
                  hola@chachirana.com
                </a>
                . Responderemos en un plazo máximo de 30 días naturales.
              </p>
              <p>
                También puedes presentar una reclamación ante la Agencia Española
                de Protección de Datos (AEPD) si consideras que tus derechos han
                sido vulnerados.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              5. Cookies
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                Utilizamos cookies propias y de terceros para mejorar la
                experiencia de navegación y obtener datos analíticos.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <span className="text-white font-medium">Técnicas:</span>{" "}
                  necesarias para el funcionamiento básico del sitio.
                </li>
                <li>
                  <span className="text-white font-medium">Analíticas:</span>{" "}
                  para comprender cómo los usuarios interactúan con el sitio
                  (Google Analytics).
                </li>
              </ul>
              <p className="mt-3">
                Puedes configurar o deshabilitar las cookies en la configuración
                de tu navegador. La desactivación de cookies analíticas no
                afecta al funcionamiento de las herramientas.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              6. Contacto
            </h2>
            <div className="text-rana-light/80 text-sm leading-relaxed space-y-2">
              <p>
                Si tienes cualquier pregunta sobre esta política de privacidad o
                sobre el tratamiento de tus datos personales, puedes
                contactarnos en:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:hola@chachirana.com"
                  className="text-rana-green hover:text-rana-light transition-colors underline"
                >
                  hola@chachirana.com
                </a>
              </p>
              <p>
                Web:{" "}
                <Link
                  href="/"
                  className="text-rana-green hover:text-rana-light transition-colors underline"
                >
                  chachirana.com
                </Link>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-rana-green text-rana-background font-semibold hover:bg-rana-light transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
