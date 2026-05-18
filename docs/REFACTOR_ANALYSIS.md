# REFACTOR_ANALYSIS.md — Fase 1 cierre del proyecto

Análisis profundo de index.html generado en Fase 1.1 / Paso 4.
Sirve como guía operativa para las sub-fases 1.2 (externalización
CSS), 1.3 (aplicación de tokens) y 1.4 (estructura semántica + JS).

**Generado:** mayo 2026
**Base analizada:** index.html @ commit 17384db (hash 1cde8b28...)
**Decisiones tomadas por Pedro:**
- Tipografía oddballs: mantener literales + agendar BACKLOG
- Spacing oddballs: mantener literales sin agendar
- RGBA overlays: mantener literales + agendar BACKLOG (prio baja)
- Template autogenerado: no tocar, agendar investigación
- Migración :root: estrategia de dos pasos en Fase 1.3
- !important .svc-cards: resolver en Fase 1.4

---

# Análisis profundo de `index.html` — Fase 1.1 / Paso 4

Base: `index.html` @ commit `17384db` · 1.575 líneas · hash `1cde8b28…`
DS de referencia: `nozoe-design-system/nozoe-tokens.css`

---

## 4.1 — Inventario de bloques CSS (`<style>` líneas 62–1089)

**Total CSS:** 1.026 líneas (líneas 63–1088, excluyendo `<style>` y `</style>`).

| # | Bloque | Líneas | Descripción |
|---|---|---|---|
| 1 | **Tokens locales `:root`** | 63–79 | 11 variables de color + 3 de tipografía + ease. **Duplica el DS.** Eliminable. |
| 2 | **Reset / base** | 81–89 | `*`, `html`, `body` |
| 3 | **Texturas globales** (`body::before`) | 91–99 | dot-grid de fondo, `position:fixed` |
| 4 | **Layout helpers** | 101–114 | `.wrap`, `.g12` (grid 12 cols), `.hairline` |
| 5 | **Section mark `.sm`** (eyebrow) | 116–125 | num + rule + label que abre cada sección |
| 6 | **Links `.tlink`** | 127–148 | link tipográfico con underline animado |
| 7 | **Buttons `.btn*`** | 150–176 | btn-ember, btn-ghost, btn-ink |
| 8 | **NAV** | 178–247 | sticky, blur, logo, links, CTA, `.wa-dot` |
| 9 | **HERO** | 249–355 | grid 7/5, headline clamp, image frame con overlays |
| 10 | **TRUST BAR** | 357–410 | banderitas + stats |
| 11 | **SERVICIOS** (dark) | 412–574 | grid 2×2 con dark surface override |
| 12 | **TRABAJO** | 576–720 | featured + grid 2×2 |
| 13 | **PROCESO** (dark) | 722–792 | 4 pasos en grid 12 cols anidado |
| 14 | **PAQUETES** | 794–867 | 3 cards, .featured |
| 15 | **CTA FINAL** (dark) | 871–928 | dark surface |
| 16 | **FOOTER** | 930–963 | dark, copyright + social |
| 17 | **ANIMATIONS** (`@media reduced-motion`) | 965–981 | `.anim`, `.d1`–`.d5`, `@keyframes rise` |
| 18 | **Responsive 1024** | 986–993 | reduce padding del wrap |
| 19 | **Responsive 900** | 995–1036 | colapso a 1 col, ajustes de grid por sección |
| 20 | **Hamburger menu** | 1038–1060 | botón mobile + variante naranja en última barra |
| 21 | **Responsive 600** | 1062–1088 | mobile final, menú off-canvas con `!important` |

**Hallazgo clave:** los bloques 1–10 + 17–21 son **comunes a todo el sitio**. Los bloques 11–16 son **específicos de home** (otras páginas tendrán contraparte propia o alguna comunidad por convención).

---

## 4.2 — Colores hardcodeados

### 4.2.1 Hex únicos (todos en CSS, no en `<template>` del thumbnail)

| Hex | Frecuencia | Token propuesto | Tipo | Notas |
|---|---|---|---|---|
| `#1D2A40` | 1 (en `:root` local) | `var(--ns-ink-800)` | primitivo | brand ink. Solo aparece en `--ink:` local. |
| `#243450` | 1 | `var(--ns-ink-700)` | primitivo | en `--ink-700:` local |
| `#0A1119` | 1 | `var(--ns-ink-950)` | primitivo | en `--ink-950:` local |
| `#475773` | **3** | `var(--ns-ink-500)` o `var(--ns-text-secondary)` | sem./prim. | 1 en `--slate:` local + **2 hardcodeados** en `.svc-card-desc` y `.svc-card-link`. ⚠️ los 2 hardcodeados deberían usar la var. |
| `#8B9DB7` | 1 | `var(--ns-sky-400)` o `var(--ns-text-tertiary)` | sem./prim. | en `--mist:` local |
| `#C6D5EA` | 1 | `var(--ns-sky-200)` o `var(--ns-border-default)` | sem./prim. | en `--sky:` local |
| `#F4F1EC` | 1 | `var(--ns-warm-200)` o `var(--ns-surface-base)` | sem./prim. | en `--warm:` local |
| `#ECE7DF` | 1 | `var(--ns-warm-300)` o `var(--ns-surface-sunken)` | sem./prim. | en `--warm-300:` local |
| `#E0D9CD` | 1 | `var(--ns-warm-400)` o `var(--ns-border-subtle)` | sem./prim. | en `--warm-400:` local |
| `#E94E1B` | 1 | `var(--ns-orange-500)` o `var(--ns-accent)` | sem./prim. | en `--ember:` local |
| `#D14418` | 1 | `var(--ns-orange-600)` o `var(--ns-accent-hover)` | sem./prim. | en `--ember-h:` local |
| `#B83C15` | 1 | `var(--ns-orange-700)` o `var(--ns-accent-active)` | sem./prim. | hardcodeado en `.btn-ember:active` |
| `#fff` | 2 | `var(--ns-text-on-accent)` | semántico | `.btn-ember` color, `.pkg-badge` color |
| `#25D366` | 1 | (literal) | 🟢 | WhatsApp brand color, mantener |

**Conclusión 4.2.1:** todos los hex del CSS local son trivialmente reemplazables. Los 11 del bloque `:root` local **se eliminan** al borrar ese bloque (Fase 1.3 step 1). Los 4 hardcodeados restantes (`#475773`×2, `#B83C15`, `#fff`×2) se reemplazan caso a caso.

### 4.2.2 RGBA únicos (28 distintos)

Estos son uniformemente colores **del DS con alpha compositing** (sky-400 con varias opacidades, ink-800 con varias opacidades, sky-200 con varias). No hay tokens DS para esto — el sistema sólo expone `--ns-elev-*` como compuestos y colores planos.

| Patrón | Frecuencia | Equivalente conceptual |
|---|---|---|
| `rgba(139,157,183, α)` (sky-400 con α) | **23** ocurrencias en 9 alphas | `--ns-sky-400` con opacidad. Hardlines, separadores, borders subtle. |
| `rgba(29,42,64, α)` (ink-800 con α) | 8 ocurrencias en 7 alphas | overlays sobre warm |
| `rgba(198,213,234, α)` (sky-200 con α) | 6 ocurrencias en 6 alphas | overlays sobre dark surface (servicios, proceso) |
| `rgba(71,87,115, α)` (ink-500 con α) | 1 | underline svc-card-link |
| `rgba(233,78,27, α)` (orange-500 con α) | 1 | radial gradient project-img default |
| `rgba(255,255,255,0.05)` | 1 | svc-card-img background sobre dark |

**Decisión Pedro:** estos rgba quedan **literales** en site.css en Fase 1.3 (no hay token equivalente y no aporta semántica). Tokens nuevos para overlay/hairline → BACKLOG prioridad baja.

### 4.2.3 Hex en `<template id="__bundler_thumbnail">` (líneas 15–61)

Este `<template>` usa hex puros (`#F4F1EC`, `#1D2A40`, `#C6D5EA`, etc.). Es un thumbnail SVG embebido, probablemente generado por un bundler externo (no se renderiza). **Decisión Pedro:** no tocar en Fase 1, investigación agendada en BACKLOG prioridad media.

---

## 4.3 — Tipografía hardcodeada

### Font-sizes encontrados (todos hardcodeados, ninguno usa token DS)

| Valor | Usos | Mapeo aproximado al DS | Notas |
|---|---|---|---|
| `9px` | 3 | (no existe en DS) | feat-tag, pkg-badge, cta-contact-role. ⚠️ por debajo de `--ns-fs-xs` (12px). Mantener literal o crear `--ns-fs-2xs`. |
| `10px` | 10 | (no existe en DS) | sm-lbl, eyebrow, trust labels, pimg-lbl, etc. ⚠️ idem. |
| `11px` | 6 | (no existe en DS) | hero-credit, footer-copy, pkg-from, etc. |
| `12px` | 8 | `--ns-fs-xs` (0.75rem = 12px) | tlink, feat-meta, nav-cta, pkg-sub… |
| `13px` | 2 | (no existe) | tlink (en `font:`) y `.nav-link` mobile override |
| `14px` | 5 | `--ns-fs-sm` (0.875rem = 14px) | btn, feat-desc, proc-step-body, cta-lede, cta-contact-val |
| `15px` | 4 | (no existe) | section-lede, svc-card-desc, proc-sub, cta-lede |
| `16px` | 1 | `--ns-fs-base` | svc-lede-dark |
| `17px` | 1 | (no existe) | hero-lede |
| `18px` | 2 | `--ns-fs-md` (1.125rem) | svc-card-num, pkg-name |
| `20px` | 2 | (no existe; `--ns-fs-lg` = 22px) | proj-name, proc-step-title |
| `2rem` | 1 | (no exacto; `--ns-fs-xl` = 1.75rem = 28px) | pkg-price |
| `2.5rem` | 1 | (cerca de `--ns-fs-2xl` = 2.5rem = 40px) ✓ | proc-step-num |

**Clamps (6 distintos):** todos para titulares responsive. No tocan tokens. Pueden quedar literales o, en una iteración futura, mapear a `--ns-fs-2xl/3xl/4xl/5xl`.

**Decisión Pedro (D1):** mantener todos los font-sizes literales en Fase 1. Armonización tipográfica → BACKLOG prioridad media.

### Font-weights / line-heights / letter-spacings

- **Weights usados:** 300, 400, 600, 800 → **coinciden 1:1 con tokens DS** `--ns-fw-light/regular/semibold/extrabold`. Reemplazo trivial.
- **Line-heights:** `1`, `0.97`, `1.05`, `1.0`, `1.2`, `1.65`, `1.7` → mapeo parcial a `--ns-lh-tight (1.05) / snug (1.2) / relaxed (1.65)`. Los valores `1`, `0.97`, `1.7` quedan literales.
- **Letter-spacings:** `-0.03em`, `-0.025em`, `-0.015em`, `-0.01em`, `0.01em`, `0.04em`, `0.08em`, `0.1em`, `0.12em`, `0.14em`, `0.16em`, `0.18em`, `0.2em`, `0.22em` → mapeo parcial: `-0.04em` no se usa pero `--ns-ls-tighter (-0.02em)`, `--ns-ls-tight (-0.01em)`, `--ns-ls-wide (0.04em)`, `--ns-ls-wider (0.08em)`, `--ns-ls-widest (0.16em)` cubren la mitad. Resto queda literal.
- **Familias:** `var(--sans)` y `var(--jp)` (vars locales). Reemplazo directo por `var(--ns-font-sans)` y `var(--ns-font-jp)`.

---

## 4.4 — Espaciados hardcodeados

Detalle resumido (ver tabla completa en el run del extractor):

| Valor | Usos aprox | Token DS | Compatibilidad |
|---|---|---|---|
| `0` | múltiples | `--ns-space-0` | ✓ |
| `4px` | 5+ | `--ns-space-1` | ✓ |
| `8px` | 4 | `--ns-space-2` | ✓ |
| `12px` | 5 | `--ns-space-3` | ✓ |
| `16px` | 8+ | `--ns-space-4` | ✓ |
| `20px` | 3 | `--ns-space-5` | ✓ |
| `24px` | 9+ | `--ns-space-6` | ✓ |
| `32px` | 6+ | `--ns-space-8` | ✓ |
| `40px` | 1 | `--ns-space-10` | ✓ |
| `48px` | 4 | `--ns-space-12` | ✓ |
| `64px` | 4 | `--ns-space-16` | ✓ |
| `80px` | 5 | `--ns-space-20` | ✓ |
| `96px` | 9 | `--ns-space-24` | ✓ |
| **Oddballs:** `2px`, `5px`, `6px`, `7px`, `10px`, `14px`, `18px`, `26px`, `28px`, `36px`, `44px`, `52px`, `56px`, `72px` | varias | parcial / no existen | ⚠️ |

**Decisión Pedro (D2):** reemplazar los valores que coinciden con tokens DS (~80 % de usos), dejar oddballs como literales sin agendar (microajustes intencionales).

---

## 4.5 — Radios y bordes

### Border-radius

| Valor | Usos | Token | Notas |
|---|---|---|---|
| `4px` | **11** | `--ns-radius-md` ✓ | uso dominante. Reemplazo directo. |
| `1px` | 1 | (no existe — sería pixel literal) | trust-flag. Mantener literal. |
| `0` | 1 | `--ns-radius-none` | proj-cell-img override. ✓ |
| `50%` | 1 | (forma circular) | wa-dot. Mantener literal (no es un radio token). |
| `999px` | 1 | `--ns-radius-pill` (9999px) | nav-ham span. ⚠️ DS tiene 9999px no 999px. Diferencia visual nula. Reemplazar. |

### Borders

Solo se usa **`1px solid <color rgba>`** (predominante) y **`2px solid var(--ink)`** (1 caso, `.pkg-card.featured`). Border-widths mapeables a `--ns-bw-1`, `--ns-bw-2`. Colores de border son los rgba documentados arriba.

---

## 4.6 — Sombras, transiciones, z-index, opacity

### Box-shadow
**1 sola declaración** en todo el archivo:
```css
.nav-links.open { box-shadow: 0 8px 24px rgba(29,42,64,0.1); }
```
No coincide exactamente con `--ns-elev-2` ni `-3` del DS. Decisión: dejarlo literal.

### Transitions
12 declaraciones, 9 únicas. Usan `var(--ease)` (local) → `var(--ns-ease-out)` en DS. Duraciones: **120, 150, 200, 220, 240ms**. Dos coinciden con DS (`--ns-dur-fast` = 150ms). Las otras (120, 200, 220, 240) no tienen token.

**Recomendación:** reemplazar `var(--ease)` por `var(--ns-ease-out)` (1:1) y dejar las duraciones como literales por ahora.

### Z-index
- `100` (nav sticky) → `--ns-z-dropdown` ✓
- `99` (nav-links.open mobile) → ⚠️ no hay token exacto; usar literal o redefinir como `calc(var(--ns-z-dropdown) - 1)`
- `1` (×11) → `--ns-z-raised` (10) ❌ no coincide. Mantener literal.
- `0`, `-1` → `--ns-z-base`, `--ns-z-behind`

**Recomendación:** mantener z-index numéricos literales. La escala del DS no encaja con el patrón actual del archivo.

### Opacity
Valores: `0`, `0.5`, `0.65`, `0.7`, `1`. Todos literales. DS no tiene tokens de opacity. Mantener.

---

## 4.7 — JavaScript inline

```javascript
const navHam = document.getElementById('nav-ham');
const navMenu = document.querySelector('.nav-links');
if (navHam && navMenu) {
  navHam.addEventListener('click', () => navMenu.classList.toggle('open'));
}
```

5 líneas. Función: **toggle del menú hamburguesa en mobile** — cuando se hace clic en `#nav-ham`, agrega/quita la clase `.open` al `.nav-links`, que en `@media (max-width:600px)` lo muestra como overlay off-canvas con `display:flex !important`.

**Predicción de reuso:** **100 % común** con las otras 5 páginas. Toda página del sitio tiene el mismo nav. Va directo a `assets/js/site.js` en Fase 1.4 sin cambios.

**Mejora opcional para Fase 1.4 (no urgente):** envolverlo en IIFE o `DOMContentLoaded` defensivo. Hoy depende de que el `<script>` esté al final del `<body>`.

---

## 4.8 — Bloques comunes vs específicos

| Bloque | Clasificación | Razonamiento |
|---|---|---|
| Tokens locales `:root` | **ELIMINAR** | Lo provee el DS. Borrar entero, ajustar referencias. |
| Reset / base / `body::before` | **COMÚN** | Aplica a todas las páginas. |
| `.wrap`, `.g12`, `.hairline` | **COMÚN** | layout primitives. |
| `.sm` (section mark) | **COMÚN** | Usado en home, ~probable en otras páginas. Confirmar con `grep`. |
| `.tlink` | **COMÚN** | link con underline animado, patrón global. |
| `.btn*` | **COMÚN** | sistema de botones. |
| `.nav*` (NAV completo) | **COMÚN** | mismo nav en las 6 páginas (pendiente confirmar parity). |
| `.hero*` | **ESPECÍFICO de home** | layout 7/5 con frame de imagen vertical. Otras páginas tienen heros propios. |
| `.trust*` | **ESPECÍFICO** | aparece solo en home. |
| `.servicios*`, `.svc*` | **MIXTO** | dark surface section + cards 2×2 son patrón aplicable a `servicios.html`. Recomiendo dejarlo en site.css con prefijo claro. |
| `.section-headline`, `.section-lede` | **COMÚN** | helpers tipográficos para todas las secciones. |
| `.trabajo*`, `.tj*`, `.project-img*`, `.proj-cell*`, `.feat*` | **MIXTO** | base reutilizable para `trabajo.html`. Mantener con prefijos. |
| `.proceso*`, `.proc*` | **ESPECÍFICO de home** (probablemente) | confirmar si `estudio.html` lo replica. |
| `.paquetes`, `.pkg*` | **ESPECÍFICO de home + servicios.html** | reutilizable. |
| `.cta-final*`, `.cta*` | **ESPECÍFICO** o **COMÚN** | depende de si otras páginas tienen CTA al final con mismo formato. Probable que sí. |
| `.footer*` | **COMÚN** | mismo footer en las 6 páginas (pendiente confirmar parity — CLAUDE.md menciona divergencia entre servicios/trabajo y el resto). |
| `.anim`, `.d1`–`.d5`, `@keyframes rise` | **COMÚN** | animación de entrada genérica. |
| Media queries 1024 / 900 / 600 | **COMÚN base + ESPECÍFICOS** | reglas como `.wrap padding` van a base; las que tocan grids específicos viajan con su sección. |

**Estrategia recomendada para Fase 1.2:**
> `site.css` único, **organizado por bloques** (con comentarios separadores como los actuales). No fragmentar todavía en `nav.css`, `hero.css`, etc. — exceso de ingeniería para 6 páginas estáticas. Si en una Fase 2 hace falta, se separa.

---

## 4.9 — Estructura semántica recomendada

### 4.9.1 Estructura actual (confirmada)

```html
<body>
  <nav class="nav">…</nav>
  <section class="hero" id="inicio">…</section>
  <div class="trust">…</div>
  <section class="servicios" id="servicios">…</section>
  <section class="trabajo" id="trabajo">…</section>
  <section class="proceso" id="estudio">…</section>
  <section class="paquetes">…</section>          ← falta id
  <section class="cta-final" id="contacto">…</section>
  <footer class="footer">…</footer>
  <script>…</script>
</body>
```

### 4.9.2 Estructura objetivo Fase 1.4

```html
<body>
  <header class="site-header">                     ← NUEVO
    <nav class="nav">…</nav>
  </header>

  <main id="contenido">                            ← NUEVO
    <section class="hero" id="inicio">…</section>
    <section class="trust" aria-label="…">…</section>  ← div→section + aria-label
    <section class="servicios" id="servicios">…</section>
    <section class="trabajo" id="trabajo">…</section>
    <section class="proceso" id="estudio">…</section>
    <section class="paquetes" id="paquetes">…</section>  ← id agregado
    <section class="cta-final" id="contacto">…</section>
  </main>

  <footer class="footer">…</footer>
  <script src="assets/js/site.js" defer></script>
</body>
```

**Cambios precisos:**
1. Envolver `<nav class="nav">` en `<header class="site-header">`.
2. Envolver desde `<section class="hero">` hasta `<section class="cta-final">` en `<main id="contenido">` (permite skip-link `#contenido` para a11y).
3. Convertir `<div class="trust">` → `<section class="trust" aria-label="Cobertura geográfica y trayectoria">`.
4. Agregar `id="paquetes"` a `<section class="paquetes">` (consistencia).
5. Mover `<script>` inline → `<script src="assets/js/site.js" defer>` antes de `</body>` (o en `<head>` con `defer`).

**Impacto en CSS:** ninguno crítico. `<header>` y `<main>` no llevan estilos propios (son contenedores semánticos). El selector `.nav` y `.trust` siguen funcionando idéntico. **Cero regresión esperada.**

---

## 4.10 — Estimación de complejidad por sub-fase

| Sub-fase | Estimación previa (BACKLOG) | Estimación refinada | Razón del ajuste |
|---|---|---|---|
| **1.2** Externalizar CSS a `assets/css/site.css` | ~30 min | **20–30 min** | Es copy-paste mecánico + ajustar `<link>` en `<head>`. Sin sorpresas detectadas. |
| **1.3** Aplicar tokens del DS | ~60–90 min | **45–60 min** | El bloque `:root` local cae entero (1 commit). Reemplazo `var(--ink)` → `var(--ns-ink-800)` etc. con find-replace masivo. ~150 reemplazos automáticos. Casos manuales: `#475773`×2, `#fff`×2, `#B83C15`×1 (5 ediciones puntuales). Tipografía y spacing oddballs **se difieren** a BACKLOG (decisión arriba). |
| **1.4** Semántica + JS externo | ~30 min | **20–30 min** | 5 cambios HTML pequeños + mover script + actualizar inline-styles problemáticos del HTML (al menos los 3 colores hardcodeados en `style=`). |
| **Total Fase 1 (index.html)** | ~2,5 h | **1,5–2 h** | El análisis cuidadoso bajó la incertidumbre. |

---

## 4.11 — Riesgos y observaciones

### 🟡 Alertas medias

1. **`<template id="__bundler_thumbnail">`** (líneas 15–61) en el `<head>`: bloque SVG de ~46 líneas con hex hardcodeados que parece autogenerado por una herramienta externa (¿bundler de Adobe Express, Figma export, AI tool?). **No tocar en Fase 1**. Confirmá si es seguro borrarlo en Fase 2. (Decisión Pedro D4: agendado en BACKLOG.)

2. **`color-mix()` en `.nav` (línea 185):**
   `background: color-mix(in srgb, var(--warm) 88%, transparent);`
   Soportado en navegadores modernos pero puede romper si tocamos el orden de carga del CSS (DS antes o después de site.css). **No es problema** mientras se cargue el DS primero — la var existe en cascade.

3. **`backdrop-filter: blur(16px)` en `.nav`:** legítimo, sin token DS equivalente. Mantener literal.

4. **`--ease` local vs `--ns-ease-out` DS:** son **idénticos** (`cubic-bezier(0.16,1,0.3,1)`). Reemplazo seguro.

5. **2 `!important`:**
   - `.nav-links.open { display: flex !important; }` — necesario porque `.nav-links` tiene `display:none` en mobile y `.open` debe ganar. Justificable.
   - `.svc-cards { grid-template-columns: 1fr !important; }` en `@media (max-width:600px)` — sospechoso. Probablemente para forzar 1 columna en mobile sobre la regla del breakpoint 900px (que define `1fr 1fr`). **Decisión Pedro (Bonus):** resolver en Fase 1.4 reordenando media queries para que la cascada lo resuelva sin `!important`.

6. **Inline styles en HTML (13 instancias):** la mayoría legítimas (`aspect-ratio:4/3`, posicionamiento absolute de imagen, dimensiones de logo). **Tres son problemáticas porque hardcodean colores de marca:**
   - Línea 1165: `<div class="trust-flag" style="background:#E94E1B;">` → debería ser clase `.trust-flag-em` o similar.
   - Línea 1167: `style="background:#475773;"` → `.trust-flag-mid`.
   - Línea 1169: `style="background:#8B9DB7;"` → `.trust-flag-mist`.
   - Línea 1525 (CTA email btn): `style="color:var(--sky);border-color:rgba(139,157,183,0.4);"` — usa var local pero con sobrescritura inline. Limpiar.
   - **Acción Fase 1.4:** mover estos colores a clases CSS.

7. **CSS local duplica tokens del DS:** `--ink`, `--slate`, `--mist`, `--sky`, `--warm`, `--warm-300`, `--warm-400`, `--ember`, `--ember-h`, `--ink-700`, `--ink-950`, `--sans`, `--jp`, `--ease`. **14 variables locales** que pisan/duplican el DS. **Decisión Pedro (D5):** estrategia de dos pasos en Fase 1.3 — primero reasignar cada local var → DS var (`--ink: var(--ns-ink-800);`) y luego en una segunda pasada eliminar el alias. Mantiene cero regresión durante el cambio.

### 🟢 Observaciones positivas (lo que NO va a sorprender)

- Espaciados ya alineados al sistema 4-px en ~80 % de los casos.
- Weights tipográficos coinciden 1:1 con los del DS.
- Patrón `:root` local + uso consistente de `var(--…)` en todo el archivo → reemplazar las definiciones cascadea automáticamente a todos los usos.
- Estructura de breakpoints clara (1024, 900, 600) — cercana pero no idéntica a `--ns-bp-lg/md/sm` (1024/768/640). Diferencia visual mínima.
- `.anim` con `prefers-reduced-motion: no-preference` — **buena práctica** ya respetada. No tocar.
- Una sola box-shadow en todo el archivo. Trivial.
- 0 dependencias externas. 0 librerías JS. 0 build tools. Refactor sin riesgo de orden de carga.

---

## Resumen ejecutivo (TL;DR)

- **Refactor mecánico, bajo riesgo.** El uso disciplinado de `:root` local hace que la migración a tokens del DS sea cuestión de redirigir 14 vars locales y resolver ~5 casos hardcodeados puntuales.
- **No tocar tipografía ni spacing oddballs en Fase 1.** Tipografía agendada en BACKLOG; spacing como microajustes intencionales.
- **Estructura semántica:** 4 cambios HTML quirúrgicos, sin impacto visual.
- **JS:** 5 líneas, 100 % reusables tal cual.
- **Tiempo total Fase 1 sobre `index.html`:** 1,5–2 h en 3 commits atómicos (1.2, 1.3, 1.4).
- **Pendiente investigar antes de Fase 2:** `<template id="__bundler_thumbnail">` (qué es, si se borra), parity de footer entre páginas (ya marcado en CLAUDE.md), divergencia tipográfica vs DS.
