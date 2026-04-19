---
title: "Open Graph: Cómo Hacer que tus Enlaces Destaquen en Redes Sociales"
date: "2026-04-18"
excerpt: "Aprende a configurar las etiquetas Open Graph para que tus enlaces se vean perfectos al compartirlos en Facebook, Twitter, LinkedIn y más."
category: "SEO Social"
keywords: ["open graph", "OG tags", "compartir en redes sociales", "Facebook preview", "Twitter cards"]
readTime: "8 min"
---

## ¿Qué son las etiquetas Open Graph?

Las **etiquetas Open Graph (OG)** son fragmentos de código que añades a tu web para controlar cómo se ve tu contenido cuando alguien lo comparte en redes sociales.

Si alguna vez has pegado un enlace en WhatsApp, Slack o Facebook y has visto que aparece con una imagen bonita, un título y una descripción, eso es gracias a las etiquetas Open Graph.

Sin OG tags, las redes sociales intentan adivinar qué imagen y texto mostrar. El resultado suele ser **aleatorio y feo**. Con OG tags, tú decides exactamente qué se ve.

El protocolo Open Graph fue creado por **Facebook en 2010** y hoy lo usan prácticamente todas las plataformas: Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Slack, Discord...

## Por qué deberían importarte

Piénsalo así: cuando compartes un enlace en redes sociales, estás haciendo un **mini-anuncio gratuito** de tu contenido. Hay dos opciones:

**Sin OG tags:** Tu enlace se ve como un texto plano sin imagen. Fácil de ignorar. Parece spam.

**Con OG tags:** Tu enlace aparece con una imagen atractiva, un título claro y una descripción que invita a hacer clic.

> **Dato:** Los enlaces con imagen de preview rica obtienen **2-3 veces más clics** que los que solo muestran texto. Según un estudio de BuzzSumo (2025), los posts en Facebook con rich preview tienen un **39% más de interacción**.

Si estás creando contenido y no configuras las OG tags, estás dejando tráfico sobre la mesa.

## Las 8 etiquetas Open Graph esenciales

No necesitas docenas de etiquetas. Con estas 8 cubres todo lo necesario:

### Las 4 imprescindibles

```html
<meta property="og:title" content="Título de tu página">
<meta property="og:description" content="Descripción atractiva del contenido">
<meta property="og:image" content="https://tudominio.com/imagen.jpg">
<meta property="og:url" content="https://tudominio.com/pagina">
```

Sin estas cuatro, las redes sociales no tienen nada que mostrar.

### Las 4 recomendadas

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Nombre de tu web">
<meta property="og:locale" content="es_ES">
<meta property="article:published_time" content="2026-04-18T09:00:00Z">
```

Estas dan contexto extra y mejoran cómo se muestra tu contenido.

## Twitter Cards: la prima hermana

Twitter tiene su propio sistema llamado **Twitter Cards**, que funciona de forma similar. Lo ideal es incluir ambas para cubrir todas las plataformas.

### Tipos de Twitter Cards

- **`summary`**: Imagen pequeña + título + descripción. Para artículos y páginas generales.
- **`summary_large_image`**: Imagen grande + título + descripción. La más recomendada para blog posts.

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título de tu página">
<meta name="twitter:description" content="Descripción del contenido">
<meta name="twitter:image" content="https://tudominio.com/imagen.jpg">
```

**Buenas noticias:** Si ya tienes las OG tags, Twitter las usa como fallback. Pero añadir las Twitter Cards específicas te da más control.

## Tamaños de imagen recomendados

La imagen es lo más importante del preview. Si se ve mal, todo se ve mal.

| Plataforma | Tamaño recomendado | Ratio |
|------------|-------------------|-------|
| **Facebook** | 1200 × 630 px | 1.91:1 |
| **Twitter** | 1200 × 675 px | 16:9 |
| **LinkedIn** | 1200 × 627 px | 1.91:1 |
| **WhatsApp** | 1200 × 630 px | 1.91:1 |

**La regla de oro:** Usa **1200 × 630 px** como tamaño universal. Funciona bien en todas las plataformas. Mantén el texto importante en el centro, ya que algunas plataformas recortan los bordes.

### Consejos para la imagen perfecta

- **Texto grande y legible** en la imagen (mínimo 24px visual)
- **Colores que contrasten** con el fondo
- **Sin detalles en los bordes** (se pueden recortar)
- **Menos es más:** una frase corta + un icono funciona mejor que un collage saturado
- **Formato JPG o PNG**, máximo 5MB (idealmente menos de 1MB)

## Errores comunes que arruinan tu preview

### ❌ Imagen demasiado pequeña

Si la imagen mide menos de 200×200 px, Facebook la ignora y muestra texto plano. Usa siempre al menos 600×315 px como mínimo absoluto.

### ❌ Olvidar og:type

Sin el tipo, algunas plataformas no procesan bien el resto de etiquetas. Para blog posts usa `article`, para páginas usa `website`.

### ❌ URLs relativas en og:image

La imagen debe ser una URL absoluta: `https://tudominio.com/imagen.jpg`. No funciona con URLs relativas como `/imagen.jpg`.

### ❌ No probar antes de publicar

Subes tu artículo, lo compartes en Facebook y... sale sin imagen. Demasiado tarde. Prueba siempre antes.

### ❌ No usar HTTPS

Las redes sociales prefieren URLs con HTTPS. Si tu web usa HTTP, algunas plataformas pueden tener problemas al cargar la preview.

## Cómo probar tus OG tags

### Facebook Sharing Debugger

La herramienta oficial de Meta. Pega tu URL y ves exactamente cómo se verá tu enlace en Facebook. Además, te avisa de errores en las etiquetas.

**Importante:** Facebook cachea las previews. Si cambias una imagen y no se actualiza, usa el botón "Scrape Again" del debugger para forzar la actualización.

### Twitter Card Validator

La herramienta de Twitter para previsualizar tus Twitter Cards. Funciona igual: pega la URL y ves el resultado.

### LinkedIn Post Inspector

Igual que las anteriores pero para LinkedIn. Útil si tu audiencia es profesional.

### Vista previa con Chachi Rana

No quieres abrir tres herramientas diferentes. Con nuestro **[OG Preview Tool](/tools/og-preview)** puedes ver cómo se ve tu enlace en todas las plataformas a la vez:

- Preview simultánea de Facebook, Twitter, LinkedIn y WhatsApp
- Detección de etiquetas faltantes
- Verificación de tamaño de imagen
- Sugerencias de mejora
- Código listo para copiar y pegar

## Checklist rápido de Open Graph

Antes de publicar cualquier página, revisa esta lista:

- [ ] `og:title` presente y atractivo (máximo 60 caracteres)
- [ ] `og:description` clara (máximo 155 caracteres)
- [ ] `og:image` con URL absoluta y HTTPS (1200×630 px)
- [ ] `og:url` con la URL canónica de la página
- [ ] `og:type` definido (article o website)
- [ ] `twitter:card` configurada
- [ ] Imagen probada en al menos una herramienta de debug
- [ ] No hay errores en el código HTML

---

## Haz que tus enlaces destaquen

Las etiquetas Open Graph son una de las optimizaciones más fáciles y con más impacto visual. Te llevan 5 minutos y pueden duplicar los clics que recibes desde redes sociales.

**[Previsualiza y optimiza tus OG tags ahora →](/tools/og-preview)** o **[recibe más tips de SEO social en tu email →](/#newsletter)**
