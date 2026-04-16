import Hero from "@/components/Hero";
import ToolCards from "@/components/ToolCards";
import BlogPreview from "@/components/BlogPreview";
import EmailCapture from "@/components/EmailCapture";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <ToolCards />
      <BlogPreview />
      <section id="newsletter" className="px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Sé el primero en <span className="gradient-text">enterarte</span>
        </h2>
        <p className="text-rana-light/50 mb-8">
          Nuevas herramientas, novedades y ofertas. Directo a tu correo.
        </p>
        <EmailCapture />
      </section>
      <CTAFooter />
    </>
  );
}
