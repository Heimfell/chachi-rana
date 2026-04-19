import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-rana-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="text-8xl mb-6 animate-float">🐸</div>
        <h1 className="text-7xl sm:text-9xl font-black gradient-text mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Parece que te has perdido en el charco
        </h2>
        <p className="text-rana-light/50 mb-10 text-sm">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-rana-green text-rana-background font-semibold hover:bg-rana-light transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 rounded-xl border border-rana-border text-rana-light hover:border-rana-green hover:text-rana-green transition-colors"
          >
            Ir al chat
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 rounded-xl border border-rana-border text-rana-light hover:border-rana-green hover:text-rana-green transition-colors"
          >
            Herramientas
          </Link>
        </div>
      </div>
    </main>
  );
}
