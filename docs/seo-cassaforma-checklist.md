# Checklist SEO — caso de estudio: Cassaforma Proyectos

> Aplicar a `caso-cassaforma.html` antes de publicar. Sitio estático
> (HTML + Cloudflare Pages). Objetivo: que el caso sea encontrable por su
> keyword y convierta la visita en contacto.

---

## ⚠️ BLOQUEANTE antes de publicar

El brief indica **permiso del cliente para publicar = No**. Publicar un
caso con el nombre real "Cassaforma", sus resultados de ventas y su web
**requiere autorización del cliente** (Sergio Gallo). Opciones:

1. **Pedir permiso por escrito** (lo ideal — incluso un sí por WhatsApp sirve).
2. **Anonimizar:** "una empresa de materiales de construcción en Lima",
   sin logo del cliente reconocible — pierde fuerza pero es publicable.

No publicar con nombre real hasta resolver esto. El resto del checklist
queda listo para cuando se autorice.

---

## 🎯 Nota de estrategia de keyword (importante)

Hay que separar dos audiencias:

- **Las keywords del brief** (encofrados, tableros fenólicos, vigas H20,
  puntales) son las de **los clientes de Cassaforma**, no las de Nozoe.
  Posicionar por ahí te traería gente que busca *comprar encofrados*, no
  contratar diseño. Sirven solo como **contexto/long-tail**, no como foco.
- **La keyword de Nozoe** = lo que busca *quien necesita un diseñador*:
  → **principal:** `diseño de marca para empresa de construcción`
  → variantes: `branding empresa de construcción`, `diseño web para
    constructora`, `rediseño de identidad PyME industrial`.

El caso se redacta hablando del sector (encofrados, construcción, Lima)
de forma natural, pero **optimizado para la intención de diseño**.

---

## Datos reales del cliente (verificados en cassaformaproyectos.com)

- **Razón:** Cassaforma Proyectos — "Expertos en encofrados y más"
- **Rubro:** sistemas de encofrado, materiales de construcción e instalación
- **Productos:** tableros fenólicos (18 mm), vigas H20, puntales metálicos,
  andamios, drywall, pintura, aislamiento acústico/térmico
- **Ubicación:** Ate Vitarte, Lima — Perú · cobertura: todo el Perú
- **Trayectoria del cliente:** +15 años de experiencia
- **Tono del cliente:** "Asumimos cada proyecto como propio" · seguridad y eficiencia
- **Contacto del proyecto:** Sergio Gallo · Año del trabajo: 2024

---

## A. Identidad de la página

- [ ] **Slug / URL limpia:** `/caso-cassaforma` (sin `.html` en enlaces).
- [ ] **`<title>`** (~57 car.):
      `Diseño de marca para construcción — Cassaforma | Nozoe Studio`
- [ ] **`<meta name="description">`** (~155 car.):
      `Cómo rediseñamos la identidad y la web de Cassaforma Proyectos para proyectar solidez y vender más en el competitivo sector de la construcción en Perú.`
- [ ] **`<link rel="canonical">`** → `https://nozoestudio.com/caso-cassaforma`
- [ ] **`<html lang="es">`** (por defecto en el sitio).

## B. Compartir en redes (Open Graph + Twitter)

- [ ] `og:title` = `Diseño de marca para construcción — Cassaforma | Nozoe Studio`
- [ ] `og:description` = (igual que la meta description)
- [ ] `og:type` = `article`
- [ ] `og:url` = `https://nozoestudio.com/caso-cassaforma`
- [ ] **`og:image`** = `https://nozoestudio.com/assets/casos/cassaforma-og.webp`
      (portada ≥1200×630, ruta **absoluta**, WebP optimizado)
- [ ] `twitter:card` = `summary_large_image`
- [ ] `twitter:title` = `Diseño de marca para construcción — Cassaforma`
- [ ] `twitter:description` = `Estrategia, identidad y web para un referente en encofrados y construcción en Perú.`
- [ ] `twitter:image` = `https://nozoestudio.com/assets/casos/cassaforma-og.webp`

> Ojo: la ruta de imágenes del sitio es `assets/casos/` (no `/img/casos/`).

## C. Datos estructurados (JSON-LD)

- [ ] Bloque `<script type="application/ld+json">` tipo **`Article`**.
      URLs en texto plano (sin formato markdown):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Diseño de marca para construcción — Cassaforma",
  "description": "Caso de estudio: rediseño de identidad visual y desarrollo web para Cassaforma Proyectos, expertos en encofrados y construcción en Perú.",
  "image": "https://nozoestudio.com/assets/casos/cassaforma-og.webp",
  "author":    { "@type": "Person",       "name": "Pedro Nozoe" },
  "publisher": {
    "@type": "Organization",
    "name": "Nozoe Studio",
    "logo": { "@type": "ImageObject", "url": "https://nozoestudio.com/assets/nozoe-studio-logo.svg" }
  },
  "datePublished": "2026-06-07",
  "inLanguage": "es"
}
```

- [ ] `headline`/`description` coherentes con title/meta (sin "bicultural"
      como titular; enfoque estratégico).

## D. Contenido on-page

- [ ] **Un solo `<h1>`** = titular del caso, con la keyword natural
      (ej. *"Una marca a la altura de 15 años en obra"*).
- [ ] `<h2>` en cada sección: El reto / Proceso / Resultado / Impacto.
- [ ] Keyword principal en h1, primer párrafo y la description, sin forzar.
- [ ] Mencionar de forma natural: encofrados, construcción, Lima/Perú,
      WordPress (la web se hizo en WP) — da contexto y long-tail.
- [ ] **`alt` editorial** en todas las imágenes (marca + qué muestra).
- [ ] `loading="lazy"` en imágenes que no estén above-the-fold.
- [ ] Imágenes en **WebP optimizado** (Pillow convierte; `sips` no escribe WebP).

## E. Enlazado interno (la cadena que convierte)

- [ ] Tarjeta en `/trabajo` (Cassaforma) → enlaza a `/caso-cassaforma`.
- [ ] Dentro del caso: CTA final → `/contacto` + enlace a `/servicios`.
- [ ] "Otros proyectos" al pie → 1–2 casos relacionados.

## F. Indexación

- [ ] Añadir `/caso-cassaforma` a **`sitemap.xml`**.
- [ ] `git push` → deploy Cloudflare → **purgar caché** (Purge Everything).
- [ ] **Search Console** → Inspección de URL → Solicitar indexación.
- [ ] Verificar redirección `caso-cassaforma.html` → URL limpia.

## G. Verificación final

- [ ] PageSpeed móvil ≥90 (como el resto del sitio).
- [ ] Probar `og:image` en un validador (cómo se ve al compartir).
- [ ] Revisar en móvil real: imágenes, CTA y tarjeta de chat.

---

## Materiales a preparar (del brief)

| Rol | Archivo | Estado |
|---|---|---|
| Portada / OG | `cassaforma-og.webp` (derivar de identidad-brand) | pendiente |
| Identidad | `identidad-brand-cassaforma.webp` | ✔ listado |
| Logo | `identidad-logo-cassaforma.webp` | ✔ listado |
| Tipografía | `identidad-tipografia-cassaforma.webp` | ✔ listado |
| Web | `web-cassaforma-home.webp` | ✔ listado |
| Flyer 1 | `flyer-cassaforma-1.webp` | ✔ listado |
| Flyer 2 | `flyer-cassaforma-2.webp` | ✔ listado |

> Destino sugerido: `assets/casos/cassaforma/…`. Falta generar la portada
> OG (1200×630) — puedo derivarla de la pieza de identidad.
