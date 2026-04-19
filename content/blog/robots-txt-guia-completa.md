---
title: "Robots.txt: Guía Completa para Controlar Cómo Google Rastrea tu Web"
date: "2026-04-18"
excerpt: "Todo lo que necesitas saber sobre robots.txt: qué es, cómo configurarlo, errores comunes y cómo bloquear bots de IA. Con ejemplos prácticos."
category: "SEO Técnico"
keywords: ["robots.txt", "bloquear Google", "SEO técnico", "rastreo web", "crawl budget"]
readTime: "10 min"
---

## ¿Qué es el archivo robots.txt?

El **robots.txt** es un archivo de texto que vive en la raíz de tu web (`tudominio.com/robots.txt`) y le dice a los robots de los buscadores qué páginas pueden rastrear y cuáles no.

Piensa en él como el **portero de tu web**. Cuando Googlebot llega, lo primero que hace es leer este archivo para saber por dónde puede entrar y qué habitaciones tiene prohibidas.

No es una medida de seguridad. Es una **solicitud cortés**. Los buscadores respetables (Google, Bing, DuckDuckGo) lo cumplen. Los bots maliciosos, no. Si necesitas proteger contenido realmente sensible, usa autenticación o bloqueos en el servidor.

## ¿Por qué importa para el SEO?

El robots.txt afecta directamente a algo llamado **crawl budget**: el número de páginas que Google está dispuesto a rastrear en tu web en cada visita.

Si tu web tiene 10.000 páginas pero Google solo rastrea 500 por sesión, quieres que esas 500 sean las importantes. El robots.txt te ayuda a:

- **Evitar que Google pierda tiempo** en páginas sin valor SEO (archivos, carpetas internas, páginas de búsqueda)
- **Priorizar el contenido importante** para que se indexe más rápido
- **Evitar indexar contenido duplicado** como versiones de impresión o parámetros de URL
- **Bloquear bots de IA** que consumen recursos sin aportar tráfico

> **Dato:** Según Google, el crawl budget es un problema real solo para webs con más de 10.000 URLs. Para webs pequeñas, Google rastrea todo de todas formas. Pero configurar bien el robots.txt sigue siendo buena práctica desde el día uno.

## Sintaxis básica del robots.txt

El archivo tiene dos directivas principales: **User-agent** y las reglas de acceso.

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /privado/

Sitemap: https://tudominio.com/sitemap.xml
```

### Explicación línea por línea

- **`User-agent: *`** → La regla aplica a todos los bots
- **`Allow: /`** → Permite rastrear todo por defecto
- **`Disallow: /admin/`** → Bloquea la carpeta /admin/
- **`Sitemap:`** → Le dice a Google dónde está tu sitemap

### Directivas principales

| Directiva | Qué hace | Ejemplo |
|-----------|----------|---------|
| `User-agent` | A qué bot aplica la regla | `Googlebot`, `bingbot`, `*` |
| `Allow` | Permite rastrear una ruta | `Allow: /blog/` |
| `Disallow` | Bloquea una ruta | `Disallow: /tmp/` |
| `Sitemap` | Ubicación del sitemap XML | `Sitemap: https://...` |
| `Crawl-delay` | Segundos entre peticiones | `Crawl-delay: 10` |

## Ejemplos prácticos por situación

### Para un blog de WordPress

```
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /?s=
Disallow: /feed/

Sitemap: https://tublog.com/sitemap.xml
```

### Para una tienda online

```
User-agent: *
Allow: /
Disallow: /carrito/
Disallow: /checkout/
Disallow: /mi-cuenta/
Disallow: /wp-admin/
Disallow: /*?orderby=
Disallow: /*?filter=

Sitemap: https://tutienda.com/sitemap.xml
```

### Para bloquear bots de IA

Cada vez más sitios quieren evitar que los bots de IA entren a entrenar sus modelos:

```
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://tudominio.com/sitemap.xml
```

## Los 5 errores más peligrosos

### 1. ❌ Bloquear CSS y JavaScript

Si bloqueas `/wp-content/` o `/assets/`, Google no puede renderizar bien tu web. Esto afecta directamente a cómo indexa tu contenido.

```
Disallow: /wp-content/    ← ¡MAL! Bloquea CSS y JS
Disallow: /wp-content/uploads/   ← BIEN, solo bloquea imágenes subidas
```

### 2. ❌ Bloquear toda la web

Un solo carácter mal puesto puede bloquear todo tu sitio de Google:

```
Disallow: /     ← ¡Esto bloquea TODO!
```

Si haces esto, Google desindexará tu web completa. Revisa siempre antes de subir cambios.

### 3. ❌ Confundir robots.txt con noindex

El robots.txt **bloquea el rastreo**, no la indexación. Google puede indexar una página bloqueada en robots.txt si otros sitios enlazan a ella. Para evitar la indexación, usa la etiqueta meta robots:

```html
<meta name="robots" content="noindex, nofollow">
```

### 4. ❌ No incluir el sitemap

La directiva `Sitemap:` es la forma más fácil de decirle a Google dónde están todas tus páginas. Sin ella, Google tiene que descubrir cada URL siguiendo enlaces.

### 5. ❌ No probar después de cambios

Google Search Console tiene una herramienta para probar tu robots.txt. Úsala siempre después de hacer cambios.

## Cómo probar tu robots.txt

### Desde Google Search Console

1. Ve a **Herramientas de robots.txt** en Search Console
2. Pega tu archivo o introduce la URL
3. Prueba URLs específicas para ver si están bloqueadas o permitidas
4. Verifica que las páginas importantes son rastreables

### Comprobación rápida manual

Visita `tudominio.com/robots.txt` en tu navegador y revisa que el contenido es correcto. Si ves una página en blanco o un error 404, no tienes robots.txt (no es obligatorio, pero es recomendable).

## Robots.txt vs. Meta Robots vs. X-Robots-Tag

Es fácil confundir estos tres métodos. Aquí tienes la diferencia clara:

| Método | Qué hace | Cuándo usarlo |
|--------|----------|---------------|
| **robots.txt** | Bloquea el rastreo | Páginas sin valor SEO, carpetas internas |
| **meta robots** | Bloquea la indexación | Páginas específicas que no quieres en Google |
| **X-Robots-Tag** | Igual que meta robots, pero en el servidor | Archivos PDF, imágenes, respuestas HTTP |

**Regla:** Si no quieres que una página aparezca en Google, usa `noindex`. Si no quieres que Google pierda tiempo rastreándola, usa `robots.txt`.

## Genera tu robots.txt automáticamente

No escribas tu robots.txt a mano. Es fácil cometer errores que pueden costarte caro en el SEO.

Con el **[Robots.txt Generator de Chachi Rana](/tools/robots-txt-generator)** puedes:

- Generar el archivo correcto para tu tipo de web
- Bloquear bots de IA con un clic
- Incluir tu sitemap automáticamente
- Probar las reglas antes de subirlas
- Recibir alertas de errores comunes

---

## Controla cómo Google ve tu web

El robots.txt es una de las primeras cosas que deberías configurar en cualquier web. Es simple, es rápido, y puede ahorrarte muchos problemas de indexación.

**[Genera tu robots.txt ahora →](/tools/robots-txt-generator)** o **[recibe más guías de SEO técnico en tu email →](/#newsletter)**
