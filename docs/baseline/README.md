# Baseline visual y estructural — Fase 1 refactor

Este documento captura el estado de referencia de `index.html` antes
del refactor de Fase 1, para detectar regresiones durante el proceso.

Fecha de captura: 2026-05-10
Commit base: `17384db` (rama `cierre-final`)

## Por qué no hay screenshots automatizadas

El sandbox de Vista previa de Claude Code tiene restricciones que
impiden capturar screenshots de páginas servidas localmente desde
`~/Desktop` (políticas TCC de macOS bloquean el acceso del proceso
preview a la carpeta del proyecto). Como alternativa, Pedro toma
screenshots manuales con `Cmd+Shift+4` antes de cada sub-fase y los
guarda en `docs/baseline/`.

## Screenshots de referencia

Los siguientes archivos capturan el estado visual de `index.html`
**antes** del refactor de Fase 1. Fueron tomados manualmente por Pedro
con `Cmd+Shift+4` (macOS, captura full-page en pantalla retina) sobre
el sitio servido por `server.py`, y luego convertidos a WebP con
Pillow 11.3.0 (calidad 85, `method=6`).

**Formato:** WebP, por coherencia con el resto de assets del proyecto
(`assets/img/`, `assets/casos/` ya usan WebP) y para mantener el repo
liviano. La conversión PNG → WebP redujo el peso total un **89,7 %**
(15,5 MB → 1,6 MB).

| Archivo | Viewport | Dimensiones | Tamaño |
|---|---|---|---|
| `index-baseline-desktop.webp` | desktop (~1440 px) | 3118 × 13734 | 675 KB |
| `index-baseline-tablet.webp` | tablet (~768 px) | 1592 × 16000 * | 578 KB |
| `index-baseline-mobile.webp` | mobile (~375 px) | 700 × 16000 * | 387 KB |

\* Tablet y mobile excedían el límite WebP de 16383 px en altura, por
lo que fueron redimensionados proporcionalmente al cap de 16000 px.
Desktop se conservó en sus dimensiones originales.

**PNG originales (~15,5 MB)**: conservados localmente por Pedro fuera
del repositorio en `~/Desktop/Screenshots/`. No se versionan.

Estos archivos son la referencia visual contra la que se comparará
cada sub-fase del refactor para detectar regresiones.

## index.html — métricas de referencia

**Hash SHA-256:**
`1cde8b28a855b6eaecaabdbed873590b9ff7f3a8ce382c08a56bb6b4cac9b2c2`

**Métricas:**
- Líneas totales del archivo: **1.575**
- Tamaño en bytes: **47.695** (~46,6 KB)
- Líneas dentro de `<style>`: **1.026** (≈65 % del archivo)
- Líneas dentro de `<script>`: **5**
- Elementos `<section>`: **6** (5 con id + 1 sin id — `section.paquetes`)
- Elementos `<nav>`: **1**
- Elementos `<footer>`: **1**
- Elementos `<header>`: **0** (esperado — pendiente Fase 1.4)
- Elementos `<main>`: **0** (esperado — pendiente Fase 1.4)
- Bloques `@media`: **4**
- Selectores CSS top-level (estimación): **~110**

## Estructura semántica top-level (orden de aparición en `<body>`)

```
nav.nav
section#inicio.hero
div.trust                ← ⚠️ debería ser <section> o parte de hero
section#servicios.servicios
section#trabajo.trabajo
section#estudio.proceso
section.paquetes         ← ⚠️ falta id
section#contacto.cta-final
footer.footer
script (inline)
```

**Observación:** no existe `<header>` envolviendo `nav.nav`, ni
`<main>` envolviendo el contenido principal. Ambos se introducirán
en Fase 1.4.

## Selectores CSS principales (110 total)

Agrupados por bloque temático aproximado:

**Base / utilidades**
`:root`, `body`, `body::before`, `.wrap`, `.g12`, `.sm`, `.tlink`,
`.tlink::after`, `.btn`, `.btn-ghost`, `.anim`

**Nav**
`.nav`, `.nav-inner`, `.nav-links`, `.nav-link`, `.nav-cta`,
`.wa-dot`, `.nav-ham`, `.nav-ham span`, `.nav-links.open`

**Hero**
`.hero`, `.hero-grid`, `.hero-left`, `.hero-headline`, `.hero-lede`,
`.hero-cta`, `.hero-right`, `.hero-img-frame`, `.hero-img-frame::before`,
`.hero-img-frame::after`, `.img-ph-lbl`, `.hero-img-cap`, `.hero-bottom`

**Trust bar**
`.trust`, `.trust-inner`, `.trust-group`, `.trust-lbl`, `.trust-flag`,
`.trust-market`, `.trust-sep`, `.trust-stat`

**Servicios**
`.servicios`, `.svc-intro-right`, `.section-headline`, `.section-lede`,
`.svc-cards`, `.svc-card`, `.svc-card:hover`, `.svc-card-img`,
`.svc-card-img::before`, `.svc-card-img-label`, `.svc-card-body`,
`.svc-card-num`, `.svc-card-title`, `.svc-card-desc`, `.svc-card-link`,
`.svc-card-link::after`, `.svc-card-link .arr`, `.svc-lede-dark`,
`.svc-headline-dark`

**Trabajo / portafolio**
`.trabajo`, `.tj-featured`, `.tj-feat-body`, `.project-img`,
`.project-img::before`, `.pimg-lbl`, `.feat-tag`, `.feat-title`,
`.feat-meta`, `.feat-desc`, `.tj-grid-wrap`, `.tj-grid-label`,
`.proj-grid`, `.proj-cell`, `.proj-cell-img`, `.proj-cell-img .project-img`,
`.proj-cell-meta`, `.proj-name`, `.proj-tags`

**Proceso**
`.proceso`, `.proc-sub`, `.proc-steps`, `.proc-step`, `.proc-step-num`,
`.proc-step-title`, `.proc-step-body`, `.proc-step-detail`, `.proc-badge`

**Paquetes**
`.paquetes`, `.pkg-grid`, `.pkg-card`, `.pkg-card.featured`, `.pkg-badge`,
`.pkg-name`, `.pkg-sub`, `.pkg-price`, `.pkg-time`, `.pkg-includes`

**CTA final / contacto**
`.cta-final`, `.cta-headline`, `.cta-lede`, `.cta-contact-item`,
`.cta-contact-role`, `.cta-contact-val`, `.cta-stamp`

**Footer**
`.footer`, `.footer-inner`, `.footer-copy`, `.footer-social`,
`.footer-social a`

## Validación de regresión propuesta

**Antes de cada sub-fase de refactor:**
1. Pedro toma screenshot manual con `Cmd+Shift+4` del sitio en navegador
   en los 3 viewports principales (desktop ~1440, tablet ~768, mobile ~375).
2. Guarda en `docs/baseline/index-pre-faseX.X-[viewport].png`.
3. Después del refactor, toma screenshot equivalente con sufijo
   `-post-faseX.X-`.
4. Compara visualmente (Preview macOS o herramienta de diff de imágenes).

**Verificación estructural automática:**
1. Recalcular hash SHA-256 después de cada sub-fase y registrar en este
   archivo.
2. Verificar que el conteo de elementos semánticos evoluciona como se
   espera:
   - Fase 1.2 (CSS externo): líneas de `<style>` → ~0, líneas totales ↓
   - Fase 1.3 (tokens): hash cambia, conteo de selectores ≈ igual
   - Fase 1.4 (semántica): `<header>` 0 → 1, `<main>` 0 → 1
3. `git diff` entre commits para revisión humana.
