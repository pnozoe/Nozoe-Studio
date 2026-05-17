# REFACTOR_PATTERN.md — Patrón de refactor Fase 2

Guía operativa para replicar el refactor de index.html en las
5 páginas restantes: estudio.html, servicios.html, trabajo.html,
contacto.html, caso-tml.html.

Establecido en Fase 1 (commits f32581b → 667677b).

---

## Resumen del patrón

El refactor convierte cada página HTML de un monolito autónomo
(CSS inline + JS inline + valores hardcodeados) a un componente
del sistema (CSS externo + JS externo + tokens del DS).

**Cuatro sub-operaciones por página:**

1. **Externalizar CSS** → mover el <style> inline a site.css
2. **Aplicar tokens del DS** → reemplazar hex por var(--ns-*)
3. **Estructura semántica** → agregar landmarks <header> y <main>
4. **Externalizar JS** → mover <script> inline a site.js

---

## Sub-operación 1 — Externalizar CSS

### Qué hacer

1. Extraer el contenido del <style> de la página (todo entre
   <style> y </style>, excluyendo los tags)
2. Agregarlo a assets/css/site.css después del CSS existente,
   precedido de un separador comentado:
   
   /* ─── [nombre-página].html ─── */
   [CSS extraído]

3. Eliminar el bloque <style>...</style> del HTML
4. Verificar que el <head> ya tiene los dos <link> en orden:
   <link rel="stylesheet" href="nozoe-design-system/nozoe-tokens.css">
   <link rel="stylesheet" href="assets/css/site.css">
   Si no están, agregarlos en ese orden después de Google Fonts.

### Validación

Comparación visual con baseline: página debe verse idéntica.
Hash del CSS extraído debe coincidir con el hash del CSS original.

---

## ⚠️ Lección aprendida en servicios.html — Scoping de selectores

Al externalizar el CSS de una página a site.css, los selectores
que coinciden con selectores ya existentes en bloques anteriores
pueden causar conflictos de cascada.

### El problema

site.css acumula CSS de todas las páginas en orden:

    /* ─── index.html ─── */     → selectores de index
    /* ─── contacto.html ─── */  → selectores de contacto
    /* ─── estudio.html ─── */   → selectores de estudio
    /* ─── servicios.html ─── */ → selectores de servicios ← pueden pisar a los anteriores

Si servicios.html tiene `.nav-link`, `.footer-inner`, `.btn-ember`
con propiedades distintas, esas reglas afectan a TODAS las páginas
que usan site.css, no solo a servicios.html.

Caso real (commit 9dd0434 → fix 232eb31): tras externalizar el CSS
de servicios.html, en index.html la imagen del hero desapareció
(`.hero-right { align-items: flex-end }` colapsaba `.hero-img-frame`
a ancho 0) y el grid 2×2 de cards se rompió (`.svc-card`,
`.svc-card-img`, `.svc-card-num` con valores incompatibles).

### La solución: scoping por página desde el inicio

Los selectores específicos de una página deben ir bajo un
selector padre único:

    /* MAL — afecta a todas las páginas */
    .svc-card { justify-content: flex-start; }

    /* BIEN — solo afecta a servicios.html */
    .servicios-page .svc-card { justify-content: flex-start; }

### Cómo aplicarlo en las páginas restantes

Antes de externalizar el CSS de cada página:

1. Identificar qué selectores del CSS inline YA EXISTEN en
   site.css (de páginas anteriores)
2. Para selectores COMUNES con mismos valores: eliminarlos del
   bloque de la página nueva (ya están definidos)
3. Para selectores COMUNES con valores diferentes: scopearlos
   bajo la clase de la página (ej: `.trabajo-page`, `.caso-page`)
4. Agregar la clase identificadora al `<body>` o `<main>`:

       <main id="contenido" class="trabajo-page">

### Alternativa usada en servicios.html

En servicios.html se scopeó bajo parents que YA existen como
clases únicas de esa página (`.page-hero`, `.svc-section`),
evitando agregar una clase extra al `<main>`. Funciona cuando
la página tiene contenedores con clases distintivas. Si no los
tiene, usar el approach de `.trabajo-page` en `<main>`.

---

## Sub-operación 2 — Aplicar tokens del DS

### Regla principal

**Preferir tokens semánticos sobre primitivos.**
Los semánticos cambian con dark mode; los primitivos no.

### Mapeo de colores (hex → token)

Los siguientes hex aparecen en todo el sitio. Reemplazarlos
consistentemente por sus tokens:

| Hex original | Token DS | Tipo |
|---|---|---|
| #1D2A40 | var(--ns-text-primary) | semántico |
| #243450 | var(--ns-ink-700) | primitivo |
| #0A1119 | var(--ns-ink-950) | primitivo |
| #475773 | var(--ns-text-secondary) | semántico |
| #8B9DB7 | var(--ns-text-tertiary) | semántico |
| #C6D5EA | var(--ns-border-default) | semántico |
| #F4F1EC | var(--ns-surface-base) | semántico |
| #ECE7DF | var(--ns-surface-sunken) | semántico |
| #E0D9CD | var(--ns-border-subtle) | semántico |
| #E94E1B | var(--ns-accent) | semántico |
| #D14418 | var(--ns-accent-hover) | semántico |
| #B83C15 | var(--ns-accent-active) | semántico |
| #fff / #ffffff | var(--ns-text-on-accent) | semántico* |

*Solo cuando #fff aparece en contexto de texto sobre fondo de acento
(botones, badges). En otros contextos, evaluar el token semántico
apropiado.

**Excepción documentada — no reemplazar:**
#25D366 → Color de marca WhatsApp. Mantener literal siempre.

### Variables locales de cada página

Cada página puede tener su propio bloque :root local con aliases
(--ink, --slate, --warm, etc.). Seguir la estrategia de dos pasos:

PASO A — Redirigir aliases al DS (sin eliminarlos aún):
:root {
  --ink: var(--ns-ink-800);
  --slate: var(--ns-text-secondary);
  [etc.]
}

PASO B — Reemplazar todos los usos de var(--alias) por token DS
directo, luego eliminar el :root local.

Ver mapeo completo de aliases en docs/REFACTOR_ANALYSIS.md.

### Valores que NO se tokenizan (quedan literales)

- Font-sizes fuera de la escala del DS: 9px, 10px, 11px, 13px,
  15px, 17px, 20px (agendado a BACKLOG — armonización tipográfica)
- Spacing fuera de la escala 4px: 2, 5, 6, 7, 10, 14, 18, 26,
  28, 36, 44, 52, 56, 72px (microajustes intencionales)
- rgba() con alpha compositing: quedan literales (agendado a BACKLOG)
- border-radius: 50%, 1px (no tienen token equivalente)
- Duraciones de transición no estándar: 120, 200, 220, 240ms

---

## Sub-operación 3 — Estructura semántica

### Qué agregar

**<header class="site-header">:**
Envuelve el <nav class="nav">. Toma el sticky del nav.

HTML:
<header class="site-header">
  <nav class="nav">...</nav>
</header>

CSS (ya en site.css, no agregar de nuevo):
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(...);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(...);
}

IMPORTANTE: el sticky debe estar en .site-header, NO en .nav.
Si el CSS extraído de la página tiene position:sticky en .nav,
moverlo a .site-header (patrón establecido en Fase 1.4 de index).

**<main id="contenido">:**
Envuelve todo el contenido principal entre </header> y <footer>.

HTML:
<main id="contenido">
  [secciones de contenido]
</main>

CSS: ninguno. <main> es contenedor semántico puro.

### Landmarks semánticos ya presentes (no duplicar)

El <header class="site-header"> y el CSS de .site-header se agregan
UNA SOLA VEZ al sitio (ya están en index.html y site.css). Para
las páginas restantes, solo agregar el HTML — el CSS ya está.

### Verificar y corregir

- Si alguna <section> no tiene id, agregarlo para consistencia
- Si hay <div> que conceptualmente son <section>, evaluarlo
- Verificar que el <footer> está FUERA del <main>

---

## Sub-operación 4 — Externalizar JS

### Qué hacer

1. Leer el <script> inline al final del <body>
2. Evaluar si el código es:
   a) COMÚN a todas las páginas (ej: toggle menú hamburguesa)
      → Ya está en assets/js/site.js. NO duplicar. Solo enlazar.
   b) ESPECÍFICO de la página (ej: slider, accordion, tabs custom)
      → Crear assets/js/[nombre-página].js y enlazarlo.

3. Eliminar el <script> inline del HTML
4. Reemplazar por: <script src="assets/js/site.js" defer></script>
   (+ el script específico si aplica)

### El toggle del menú hamburguesa

YA ESTÁ en assets/js/site.js (migrado desde index.html en Fase 1.4).
No duplicar en ninguna página. Solo enlazar site.js.

---

## Orden recomendado de ejecución en Fase 2

Para cada página (en este orden):

1. Verificar punto de partida (rama, working tree limpio, ultimo commit)
2. Analizar la página (estructura, bloques CSS, JS inline, hardcodes)
3. Externalizar CSS a site.css (sin cambiar valores)
4. Validar visualmente (página debe verse idéntica)
5. Aplicar tokens del DS (hex → var(--ns-*), estrategia dos pasos)
6. Validar visualmente (página debe verse idéntica)
7. Agregar estructura semántica (<header>, <main>)
8. Externalizar JS (si lo hay)
9. Validar visualmente + funcional
10. Commit atómico por página

**Regla de oro:** un commit por página. Nunca refactorizar dos
páginas en el mismo commit.

---

## Decisiones de diseño tomadas (no rediscutir)

Estas decisiones están cerradas. No volver a debatirlas en Fase 2:

- **Dark mode**: forzado a light en V1 via data-theme="light" en
  el <html>. Toggle dark/light en BACKLOG prioridad alta.
- **Fuente de verdad de tokens**: nozoe-design-system/nozoe-tokens.css.
  No duplicar variables CSS localmente.
- **Stack técnico**: HTML+CSS+JS estático puro. Sin frameworks.
- **JS**: vanilla, sin dependencias, envuelto en DOMContentLoaded.
- **El !important de .nav-links.open**: se mantiene (funcional).
  El !important de .svc-cards 600px: eliminado (redundante).

---

## Qué esperar de cada página en Fase 2

Basado en la auditoría de Fase 1.1 (ver docs/REFACTOR_ANALYSIS.md):

**estudio.html** (897 líneas, 589 líneas CSS inline):
- Probablemente tiene sus propios estilos de sección "About"
- Verificar si tiene galería de imágenes con JS

**servicios.html** (1.553 líneas, 829 líneas CSS inline):
- La más compleja después de index
- Footer divergente respecto al resto (verificar)
- Probable CSS de paquetes/precios

**trabajo.html** (1.326 líneas, 798 líneas CSS inline):
- Footer divergente respecto al resto (verificar)
- Probable galería o grid de proyectos con JS

**contacto.html** (811 líneas, 517 líneas CSS inline):
- La más sencilla
- Probable formulario o mapa

**caso-tml.html** (1.124 líneas, 690 líneas CSS inline):
- Case study con galería de imágenes
- Ya tiene loading="lazy" en algunas imágenes

---

## Archivos de referencia

- docs/REFACTOR_ANALYSIS.md: análisis profundo de index.html
  (mapeo de tokens, bloques CSS, JS, riesgos)
- docs/baseline/: capturas visuales pre-refactor de index.html
- nozoe-design-system/README.md: documentación canónica del DS
- nozoe-design-system/nozoe-tokens.css: tokens disponibles
- CLAUDE.md raíz: reglas generales del proyecto
- BACKLOG.md: mejoras pendientes post-cierre

---

*Última actualización: mayo 2026 — generado al cierre de Fase 1.*
