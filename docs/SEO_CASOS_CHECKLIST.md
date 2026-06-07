# Checklist SEO — páginas de caso de estudio

> Aplicar a cada `caso-*.html` antes de publicar. Pensado para sitio
> estático (HTML + Cloudflare Pages). El objetivo: que cada caso sea
> encontrable por su keyword y convierta la visita en contacto.

---

## A. Identidad de la página

- [ ] **Slug / URL limpia:** `/caso-<nombre>` (sin `.html` en enlaces).
- [ ] **`<title>`** único, ~55–60 caracteres, con la keyword objetivo
      al inicio. *Ej: "Diseño de marca inmobiliaria — Cassaforma | Nozoe Studio"*
- [ ] **`<meta name="description">`** ~150–160 caracteres, con la keyword
      y un gancho de resultado. *Ej: "Cómo rediseñamos la identidad de
      Cassaforma para proyectar confianza y sostener precios premium."*
- [ ] **`<link rel="canonical">`** apuntando a la URL limpia final
      (https://nozoestudio.com/caso-<nombre>).
- [ ] **`<html lang="es">`** (ya por defecto en el sitio).

## B. Compartir en redes (Open Graph + Twitter)

- [ ] `og:title`, `og:description`, `og:type="article"`
- [ ] `og:url` = URL limpia canónica
- [ ] **`og:image`** = portada del caso (≥1200×630, WebP/JPG, ruta absoluta)
- [ ] `twitter:card="summary_large_image"` + `twitter:title/description/image`

> Sin `og:image` el caso se ve pobre al pegarlo en WhatsApp/LinkedIn.

## C. Datos estructurados (JSON-LD)

- [ ] Bloque `<script type="application/ld+json">` tipo **`Article`** o
      **`CreativeWork`** con: `headline`, `description`, `image`,
      `author` (Pedro Nozoe / Nozoe Studio), `publisher`, `datePublished`,
      `inLanguage: "es"`.
- [ ] Coherente con el `<title>`/description (sin "bicultural" como
      titular ni datos viejos — alinear al enfoque estratégico).

## D. Contenido on-page

- [ ] **Un solo `<h1>`** = el titular del caso, con la keyword natural.
- [ ] Subtítulos `<h2>` en las secciones (El reto / Proceso / Resultado / Impacto).
- [ ] La keyword objetivo aparece de forma natural en h1, primer párrafo
      y una description — **sin forzar** (la voz editorial manda).
- [ ] **`alt` editorial** en TODAS las imágenes (marca + qué muestra).
- [ ] `loading="lazy"` en imágenes que no estén above-the-fold.
- [ ] Imágenes en **WebP optimizado** (peso vigilado; afecta ranking móvil).

## E. Enlazado interno (la cadena que convierte)

- [ ] Desde `/trabajo`: la tarjeta del proyecto enlaza al caso.
- [ ] Dentro del caso: CTA final → `/contacto` + enlace a `/servicios`.
- [ ] Enlace a 1–2 casos relacionados ("Otros proyectos") al pie.
- [ ] Si existe un artículo del blog relacionado, enlazarlo mutuamente.

## F. Indexación

- [ ] Añadir la URL limpia a **`sitemap.xml`**.
- [ ] `git push` → esperar deploy Cloudflare → **purgar caché**.
- [ ] **Google Search Console** → Inspección de URL → Solicitar indexación.
- [ ] Verificar que la URL `.html` redirige a la limpia (Cloudflare ya lo hace).

## G. Verificación final

- [ ] Lighthouse / PageSpeed móvil OK (objetivo ≥90, como el resto del sitio).
- [ ] Probar el `og:image` con un validador (cómo se ve al compartir).
- [ ] Revisar en móvil real: imágenes, CTA y la tarjeta de chat.

---

### Keywords del nicho (baja competencia, alta intención)
Inventario para ir mapeando casos y futuros artículos:

| Tema | Keyword candidata |
|---|---|
| Inmobiliaria | diseño de marca inmobiliaria |
| Gastronomía | branding para restaurantes / marca gastronómica |
| Lanzamiento | campaña de lanzamiento de marca |
| Nicho Japón–Latam | branding para el mercado japonés · marca para emprendedores latinos en Japón |
| Genérico de intención | cuánto cuesta una identidad de marca · cuándo rediseñar tu marca |

> Regla: **1 keyword principal por página.** No competir contra ti mismo
> con dos páginas apuntando a lo mismo.
