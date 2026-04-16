"use client";

import { useState, useRef, useEffect } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div ref={ref} className="opacity-0 w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 px-5 py-3.5 rounded-xl bg-rana-surface border border-rana-border text-white placeholder:text-rana-light/30 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3.5 rounded-xl bg-rana-green text-rana-dark font-bold transition-all duration-300 hover:scale-105 hover:bg-rana-lime disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
        >
          {status === "loading" && "Enviando..."}
          {status === "success" && "✓ Apuntado!"}
          {status === "error" && "✗ Error, reintenta"}
          {status === "idle" && "🐸 Quiero ser Chachi"}
        </button>
      </form>
      <p className="text-rana-light/30 text-xs text-center mt-3">
        Sin spam. Solo novedades y herramientas chachis.
      </p>
    </div>
  );
}
