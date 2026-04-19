import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal de Chachi Rana. Información sobre las condiciones de uso, propiedad intelectual y responsabilidad del sitio web.",
  alternates: {
    canonical: "https://chachirana.com/aviso-legal",
  },
};

export default function AvisoLegal() {
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
          Aviso Legal
        </h1>
        <p className="text-rana-light/50 text-sm mb-10">
          Última actualización: abril de 2026
        </p>

        <div className="space-y-8">
          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              1. Datos identificativos
            </h2>
            <div className="text-rana-light/80 space-y-1 text-sm leading-relaxed">
              <p>
                <span className="text-white font-medium">Denominación:</span>{" "}
                Chachi Rana
              </p>
              <p>
                <span className="text-white font-medium">NIF:</span> Pendiente
                de registro
              </p>
              <p>
                <span className="text-white font-medium">Domicilio:</span>{" "}
                España
              </p>
              <p>
                <span className="text-white font-medium">Email:</span>{" "}
                hola@chachirana.com
              </p>
              <p>
                <span className="text-white font-medium">Sitio web:</span>{" "}
                https://chachirana.com
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              2. Objeto
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                Chachi Rana pone a disposición de los usuarios, de forma
                gratuita, un conjunto de herramientas de SEO e inteligencia
                artificial, así como un servicio de chatbot orientado a
                negocios y profesionales.
              </p>
              <p>
                El acceso y uso del sitio web atribuye la condición de usuario e
                implica la aceptación plena de todas las condiciones incluidas
                en este aviso legal.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              3. Propiedad intelectual
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                Todos los contenidos del sitio web, incluyendo textos,
                imágenes, diseños, código fuente, logos, iconos y cualquier otro
                elemento creativo, son propiedad de Chachi Rana o de terceros
                que han autorizado su uso, y están protegidos por las leyes de
                propiedad intelectual e industrial aplicables.
              </p>
              <p>
                Queda prohibida la reproducción, distribución, comunicación
                pública, transformación o cualquier otra actividad que se pueda
                realizar con los contenidos sin autorización expresa por
                escrito.
              </p>
              <p>
                Los resultados generados por las herramientas (meta
                descripciones, esquemas JSON-LD, titulares analizados, etc.)
                son propiedad del usuario que los genera.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              4. Limitación de responsabilidad
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                Las herramientas y el chatbot de Chachi Rana se proporcionan
                "tal cual", sin garantías de ningún tipo, ni expresas ni
                implícitas.
              </p>
              <p>
                Chachi Rana no garantiza que los resultados generados por las
                herramientas sean totalmente precisos, completos o adecuados
                para un fin concreto. El usuario es responsable de verificar y
                validar los resultados antes de su uso.
              </p>
              <p>
                Las respuestas del chatbot se generan mediante modelos de
                inteligencia artificial y pueden contener errores o
                inexactitudes. No deben considerarse asesoramiento profesional
                definitivo.
              </p>
              <p>
                Chachi Rana no se responsabiliza de los daños y perjuicios
                directos o indirectos que puedan derivarse del uso de las
                herramientas o del contenido del sitio web.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              5. Política de enlaces
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                El sitio web puede contener enlaces a sitios web de terceros.
                Chachi Rana no se responsabiliza del contenido, las políticas de
                privacidad ni las prácticas de dichos sitios externos.
              </p>
              <p>
                La inclusión de un enlace no implica necesariamente una
                recomendación ni acuerdo con los contenidos del sitio web
                enlazado.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              6. Legislación aplicable
            </h2>
            <div className="text-rana-light/80 space-y-3 text-sm leading-relaxed">
              <p>
                Las presentes condiciones se rigen por la legislación española.
                Para la resolución de cualquier controversia, las partes se
                someterán a los juzgados y tribunales del domicilio del usuario
                cuando la legislación vigente así lo disponga.
              </p>
            </div>
          </section>

          <section className="bg-rana-surface border border-rana-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-rana-green mb-4">
              7. Contacto
            </h2>
            <div className="text-rana-light/80 text-sm leading-relaxed space-y-2">
              <p>
                Para cualquier consulta relacionada con este aviso legal,
                puedes contactarnos en:
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
