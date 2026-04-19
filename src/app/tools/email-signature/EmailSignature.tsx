"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

type Template = "profesional" | "moderno" | "minimalista";

const templates: { value: Template; label: string }[] = [
  { value: "profesional", label: "Profesional" },
  { value: "moderno", label: "Moderno" },
  { value: "minimalista", label: "Minimalista" },
];

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateProfesionalHTML(data: FormData, color: string) {
  const rows: string[] = [];
  rows.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;max-width:500px;">`);
  rows.push(`<tr><td style="padding-bottom:4px;"><strong style="font-size:18px;color:${color};">${esc(data.nombre)}</strong></td></tr>`);
  if (data.cargo)
    rows.push(`<tr><td style="padding-bottom:2px;font-size:13px;color:#666666;">${esc(data.cargo)}</td></tr>`);
  if (data.empresa)
    rows.push(`<tr><td style="padding-bottom:8px;font-size:13px;color:#666666;font-weight:600;">${esc(data.empresa)}</td></tr>`);
  rows.push(`<tr><td style="padding-bottom:8px;"><span style="display:inline-block;width:120px;height:3px;background-color:${color};border-radius:2px;"></span></td></tr>`);
  if (data.email)
    rows.push(`<tr><td style="padding-bottom:3px;font-size:13px;"><span style="color:${color};margin-right:6px;">✉</span><a href="mailto:${esc(data.email)}" style="color:#333333;text-decoration:none;">${esc(data.email)}</a></td></tr>`);
  if (data.telefono)
    rows.push(`<tr><td style="padding-bottom:3px;font-size:13px;"><span style="color:${color};margin-right:6px;">☎</span><a href="tel:${esc(data.telefono)}" style="color:#333333;text-decoration:none;">${esc(data.telefono)}</a></td></tr>`);
  if (data.web)
    rows.push(`<tr><td style="padding-bottom:3px;font-size:13px;"><span style="color:${color};margin-right:6px;">🌐</span><a href="${esc(data.web)}" style="color:#333333;text-decoration:none;">${esc(data.web.replace(/^https?:\/\//, ""))}</a></td></tr>`);
  const socials: string[] = [];
  if (data.linkedin) socials.push(`<a href="${esc(data.linkedin)}" style="color:#0077B5;text-decoration:none;margin-right:8px;">in</a>`);
  if (data.twitter) socials.push(`<a href="${esc(data.twitter)}" style="color:#1DA1F2;text-decoration:none;margin-right:8px;">𝕏</a>`);
  if (data.instagram) socials.push(`<a href="${esc(data.instagram)}" style="color:#E4405F;text-decoration:none;margin-right:8px;">📷</a>`);
  if (socials.length) {
    rows.push(`<tr><td style="padding-top:6px;font-size:14px;">${socials.join(" ")}</td></tr>`);
  }
  rows.push(`</table>`);
  return rows.join("\n");
}

function generateModernoHTML(data: FormData, color: string) {
  const leftRows: string[] = [];
  const rightRows: string[] = [];

  leftRows.push(`<td style="vertical-align:top;padding-right:16px;">`);
  leftRows.push(`<strong style="font-size:18px;color:${color};display:block;">${esc(data.nombre)}</strong>`);
  if (data.cargo) leftRows.push(`<span style="font-size:13px;color:#555555;display:block;">${esc(data.cargo)}</span>`);
  if (data.empresa) leftRows.push(`<span style="font-size:13px;color:#888888;display:block;font-weight:600;">${esc(data.empresa)}</span>`);
  leftRows.push(`</td>`);

  rightRows.push(`<td style="vertical-align:top;border-left:3px solid ${color};padding-left:16px;">`);
  if (data.email) rightRows.push(`<span style="display:block;font-size:12px;color:#555555;margin-bottom:3px;">✉ <a href="mailto:${esc(data.email)}" style="color:#555555;text-decoration:none;">${esc(data.email)}</a></span>`);
  if (data.telefono) rightRows.push(`<span style="display:block;font-size:12px;color:#555555;margin-bottom:3px;">☎ <a href="tel:${esc(data.telefono)}" style="color:#555555;text-decoration:none;">${esc(data.telefono)}</a></span>`);
  if (data.web) rightRows.push(`<span style="display:block;font-size:12px;color:#555555;margin-bottom:3px;">🌐 <a href="${esc(data.web)}" style="color:#555555;text-decoration:none;">${esc(data.web.replace(/^https?:\/\//, ""))}</a></span>`);
  const socials: string[] = [];
  if (data.linkedin) socials.push(`<a href="${esc(data.linkedin)}" style="text-decoration:none;margin-right:6px;font-size:14px;">in</a>`);
  if (data.twitter) socials.push(`<a href="${esc(data.twitter)}" style="text-decoration:none;margin-right:6px;font-size:14px;">𝕏</a>`);
  if (data.instagram) socials.push(`<a href="${esc(data.instagram)}" style="text-decoration:none;margin-right:6px;font-size:14px;">📷</a>`);
  if (socials.length) rightRows.push(`<span style="display:block;margin-top:4px;font-size:13px;color:${color};">${socials.join("")}</span>`);
  rightRows.push(`</td>`);

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;max-width:500px;">\n<tr>\n${leftRows.join("\n")}\n${rightRows.join("\n")}\n</tr>\n</table>`;
}

function generateMinimalistaHTML(data: FormData, color: string) {
  const rows: string[] = [];
  rows.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#444444;max-width:400px;">`);
  rows.push(`<tr><td style="padding-bottom:2px;"><strong style="font-size:15px;color:#222222;">${esc(data.nombre)}</strong></td></tr>`);
  const subtitle: string[] = [];
  if (data.cargo) subtitle.push(esc(data.cargo));
  if (data.empresa) subtitle.push(esc(data.empresa));
  if (subtitle.length)
    rows.push(`<tr><td style="padding-bottom:6px;color:#888888;font-size:12px;">${subtitle.join(" · ")}</td></tr>`);
  if (data.email)
    rows.push(`<tr><td style="padding-bottom:2px;"><a href="mailto:${esc(data.email)}" style="color:${color};text-decoration:none;font-size:12px;">${esc(data.email)}</a></td></tr>`);
  if (data.telefono)
    rows.push(`<tr><td style="padding-bottom:2px;font-size:12px;color:#888888;">${esc(data.telefono)}</td></tr>`);
  if (data.web)
    rows.push(`<tr><td style="padding-bottom:2px;"><a href="${esc(data.web)}" style="color:${color};text-decoration:none;font-size:12px;">${esc(data.web.replace(/^https?:\/\//, ""))}</a></td></tr>`);
  rows.push(`</table>`);
  return rows.join("\n");
}

function generateHTML(data: FormData, template: Template, color: string) {
  switch (template) {
    case "profesional":
      return generateProfesionalHTML(data, color);
    case "moderno":
      return generateModernoHTML(data, color);
    case "minimalista":
      return generateMinimalistaHTML(data, color);
  }
}

interface FormData {
  nombre: string;
  cargo: string;
  empresa: string;
  email: string;
  telefono: string;
  web: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

function ProfesionalePreview({ data, color }: { data: FormData; color: string }) {
  return (
    <div style={{ fontFamily: "Arial,Helvetica,sans-serif", fontSize: 14, color: "#333" }}>
      <strong style={{ fontSize: 18, color }}>{data.nombre || "Tu Nombre"}</strong>
      {data.cargo && <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{data.cargo}</div>}
      {data.empresa && <div style={{ fontSize: 13, color: "#666", fontWeight: 600, marginTop: 2 }}>{data.empresa}</div>}
      <div style={{ width: 120, height: 3, backgroundColor: color, borderRadius: 2, margin: "8px 0" }} />
      {data.email && <div style={{ fontSize: 13, marginBottom: 3 }}><span style={{ color, marginRight: 6 }}>✉</span>{data.email}</div>}
      {data.telefono && <div style={{ fontSize: 13, marginBottom: 3 }}><span style={{ color, marginRight: 6 }}>☎</span>{data.telefono}</div>}
      {data.web && <div style={{ fontSize: 13, marginBottom: 3 }}><span style={{ color, marginRight: 6 }}>🌐</span>{data.web.replace(/^https?:\/\//, "")}</div>}
      {(data.linkedin || data.twitter || data.instagram) && (
        <div style={{ marginTop: 6, fontSize: 14, display: "flex", gap: 8 }}>
          {data.linkedin && <span style={{ color: "#0077B5", cursor: "pointer" }}>in</span>}
          {data.twitter && <span style={{ color: "#1DA1F2", cursor: "pointer" }}>𝕏</span>}
          {data.instagram && <span style={{ color: "#E4405F", cursor: "pointer" }}>📷</span>}
        </div>
      )}
    </div>
  );
}

function ModernoPreview({ data, color }: { data: FormData; color: string }) {
  return (
    <div style={{ display: "flex", fontFamily: "Arial,Helvetica,sans-serif", maxWidth: 500 }}>
      <div style={{ paddingRight: 16 }}>
        <strong style={{ fontSize: 18, color, display: "block" }}>{data.nombre || "Tu Nombre"}</strong>
        {data.cargo && <span style={{ fontSize: 13, color: "#555", display: "block" }}>{data.cargo}</span>}
        {data.empresa && <span style={{ fontSize: 13, color: "#888", display: "block", fontWeight: 600 }}>{data.empresa}</span>}
      </div>
      <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16 }}>
        {data.email && <div style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>✉ {data.email}</div>}
        {data.telefono && <div style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>☎ {data.telefono}</div>}
        {data.web && <div style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>🌐 {data.web.replace(/^https?:\/\//, "")}</div>}
        {(data.linkedin || data.twitter || data.instagram) && (
          <div style={{ marginTop: 4, fontSize: 13, color, display: "flex", gap: 6 }}>
            {data.linkedin && <span>in</span>}
            {data.twitter && <span>𝕏</span>}
            {data.instagram && <span>📷</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalistaPreview({ data, color }: { data: FormData; color: string }) {
  return (
    <div style={{ fontFamily: "Arial,Helvetica,sans-serif", fontSize: 13, color: "#444", maxWidth: 400 }}>
      <strong style={{ fontSize: 15, color: "#222" }}>{data.nombre || "Tu Nombre"}</strong>
      {(data.cargo || data.empresa) && (
        <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
          {[data.cargo, data.empresa].filter(Boolean).join(" · ")}
        </div>
      )}
      {data.email && <div style={{ marginTop: 6 }}><a style={{ color, textDecoration: "none", fontSize: 12 }}>{data.email}</a></div>}
      {data.telefono && <div style={{ color: "#888", fontSize: 12 }}>{data.telefono}</div>}
      {data.web && <div><a style={{ color, textDecoration: "none", fontSize: 12 }}>{data.web.replace(/^https?:\/\//, "")}</a></div>}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-rana-background border border-rana-border text-white text-sm placeholder:text-rana-light/20 focus:outline-none focus:border-rana-green focus:ring-1 focus:ring-rana-green/50 transition-all";

export default function EmailSignature() {
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [web, setWeb] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [color, setColor] = useState("#22c55e");
  const [template, setTemplate] = useState<Template>("profesional");
  const [copied, setCopied] = useState(false);

  const formData: FormData = useMemo(
    () => ({ nombre, cargo, empresa, email, telefono, web, linkedin, twitter, instagram }),
    [nombre, cargo, empresa, email, telefono, web, linkedin, twitter, instagram]
  );

  const htmlCode = useMemo(
    () => generateHTML(formData, template, color),
    [formData, template, color]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [htmlCode]);

  return (
    <div className="min-h-screen bg-rana-background">
      <div className="px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rana-light/40 text-sm hover:text-rana-green transition-colors mb-8"
        >
          ← Volver al inicio
        </Link>

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-rana-green/10 border border-rana-green/20 text-rana-light text-sm font-medium mb-6">
            ✉️ Herramienta gratuita
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            <span className="gradient-text">
              Generador de Firma Email Profesional
            </span>
          </h1>
          <p className="text-rana-light/60 max-w-xl mx-auto">
            Crea firmas de email profesionales y modernas. Personaliza colores,
            añade tus redes sociales y copia el HTML para usarlo en Gmail,
            Outlook o Apple Mail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
            <h2 className="text-lg font-bold mb-4">Datos de tu firma</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: María García López"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Cargo
                </label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Ej: Directora de Marketing"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Ej: Acme S.L."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: maria@acme.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: +34 612 345 678"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-rana-light/60 mb-1">
                  Web
                </label>
                <input
                  type="url"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  placeholder="Ej: https://acme.com"
                  className={inputClass}
                />
              </div>

              <div className="border-t border-rana-border pt-4 mt-1">
                <p className="text-sm text-rana-light/40 mb-3">Redes sociales</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-rana-light/60 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/tu-perfil"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-rana-light/60 mb-1">
                      Twitter / X URL
                    </label>
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="https://x.com/tu-usuario"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-rana-light/60 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/tu-usuario"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-rana-border pt-4 mt-1">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-rana-light/60 mb-1">
                      Color principal
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-rana-border bg-transparent"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-rana-background border border-rana-border text-white text-sm font-mono focus:outline-none focus:border-rana-green"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-rana-light/60 mb-1">
                      Plantilla
                    </label>
                    <div className="flex flex-col gap-2">
                      {templates.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setTemplate(t.value)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 text-left ${
                            template === t.value
                              ? "bg-rana-green/15 border-rana-green/50 text-rana-green"
                              : "bg-rana-background border-rana-border text-rana-light/50 hover:border-rana-green/30"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
              <h2 className="text-lg font-bold mb-4">👁 Vista previa</h2>
              <div className="rounded-xl bg-white p-6 shadow-lg">
                {template === "profesional" && <ProfesionalePreview data={formData} color={color} />}
                {template === "moderno" && <ModernoPreview data={formData} color={color} />}
                {template === "minimalista" && <MinimalistaPreview data={formData} color={color} />}
              </div>
              {!nombre && !email && (
                <p className="text-center text-rana-light/30 text-sm mt-4">
                  Empienza a rellenar los campos para ver tu firma
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-rana-surface border border-rana-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">📋 Código HTML</h2>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-lg bg-rana-green/10 text-rana-green text-sm font-medium hover:bg-rana-green/20 transition-colors"
                >
                  {copied ? "✓ Copiado!" : "📋 Copiar HTML"}
                </button>
              </div>
              <p className="text-rana-light/30 text-xs mb-3">
                Pega este HTML en la configuración de tu cliente de email:
              </p>
              <div className="rounded-xl bg-rana-background border border-rana-border p-4 overflow-x-auto max-h-64">
                <pre className="text-xs text-rana-light/80 font-mono whitespace-pre-wrap leading-relaxed break-all">
                  {htmlCode}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-rana-surface border border-rana-border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">
            <span className="gradient-text">
              Cómo instalar tu firma
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-3 text-rana-green">
                Gmail
              </h3>
              <ol className="text-sm text-rana-light/60 space-y-2 list-decimal list-inside">
                <li>Abre Gmail y ve a Configuración (⚙)</li>
                <li>En &quot;General&quot;, baja hasta &quot;Firma&quot;</li>
                <li>Crea una firma nueva</li>
                <li>Copia el HTML generado</li>
                <li>Pégalo en el editor de firma</li>
                <li>Guarda los cambios abajo</li>
              </ol>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-3 text-rana-lime">
                Outlook
              </h3>
              <ol className="text-sm text-rana-light/60 space-y-2 list-decimal list-inside">
                <li>Abre Outlook y ve a Archivo → Opciones</li>
                <li>Selecciona &quot;Correo&quot; → &quot;Firmas&quot;</li>
                <li>Crea una firma nueva</li>
                <li>Copia el código HTML generado</li>
                <li>Pégalo en el editor de firma</li>
                <li>Guarda y aplica</li>
              </ol>
            </div>

            <div className="rounded-xl bg-rana-background border border-rana-border p-5">
              <h3 className="text-base font-bold mb-3 text-rana-gold">
                Apple Mail
              </h3>
              <ol className="text-sm text-rana-light/60 space-y-2 list-decimal list-inside">
                <li>Abre Mail → Preferencias → Firmas</li>
                <li>Crea una firma nueva</li>
                <li>Ve a ~/Library/Mail/V*/MailData/Signatures</li>
                <li>Abre el archivo .mailsignature</li>
                <li>Reemplaza el contenido con el HTML</li>
                <li>Bloquea el archivo (⌘+I → Bloqueado)</li>
              </ol>
            </div>
          </div>
        </div>

        <Link
          href="/chat"
          className="block rounded-2xl bg-rana-surface border border-rana-gold/20 p-6 sm:p-8 text-center hover:border-rana-gold/40 transition-colors"
        >
          <p className="text-lg sm:text-xl font-bold text-rana-gold mb-2">
            ¿Tu web pierde clientes? 🐸 Chachi Rana Chat atiende 24/7
          </p>
          <p className="text-rana-light/60 text-sm mb-4">
            Un chat inteligente en tu web que convierte visitantes en clientes
            mientras tú descansas.
          </p>
          <span className="inline-block px-6 py-3 rounded-xl bg-rana-gold text-rana-dark font-bold hover:bg-rana-gold-dark transition-colors">
            Probar Chachi Rana Chat gratis →
          </span>
        </Link>
      </div>
    </div>
  );
}
