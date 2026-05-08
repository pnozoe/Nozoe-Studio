# NOZOE STUDIO — Instrucciones permanentes del proyecto

> Este archivo se carga automáticamente al inicio de cada sesión de Claude Cowork/Code.
> Contiene toda la información crítica del proyecto para que no tengas que re-explicarla cada vez.

---

## Contexto del proyecto

**Cliente:** Pedro — diseñador gráfico peruano-nikkei (sansei, tercera generación japonesa) con 25 años de trayectoria, operando desde Japón.

**Proyecto:** Rediseño completo de nozoestudio.com (estudio de diseño propio).

**Audiencia objetivo:** Emprendedores latinos y brasileños residentes en Japón. NO el mercado japonés local. Acepta clientes puntuales de Perú y otras regiones de habla hispana.

**Tecnología:**
- WordPress + Divi 5 (con maquetador Divi 5)
- Child theme custom con sistema de tokens CSS
- Entorno local: Local by Flywheel en macOS
- Versionado: Git + GitHub privado

---

## Sistema de diseño — tokens oficiales

### Paleta de colores

```css
/* Primarios */
--nz-ink: #1D2A40;           /* azul noche — texto principal, secciones oscuras, botones */
--nz-accent: #E94E1B;        /* naranja — máximo 5% de la superficie, solo acentos */

/* Neutros azulados */
--nz-neutral-700: #475773;   /* texto corrido y navegación secundaria */
--nz-neutral-500: #8B9DB7;   /* metadatos, labels, subtítulos */
--nz-neutral-300: #C6D5EA;   /* bordes, fondos suaves, avatares */

/* Superficies cálidas */
--nz-surface-warm: #F4F1EC;  /* fondos de sección calidez */
--nz-surface-white: #FFFFFF; /* lienzo principal */

/* Verde brasileño — solo para codificación de audiencias */
--nz-green-br: #2E9B5E;      /* banderita para "emprendedores brasileños" */
```

### Tipografía

**Familia única:** Nunito (Google Fonts)
**Pesos a cargar:** 300 (Light), 400 (Regular), 600 (SemiBold), 800 (ExtraBold)

```css
--nz-font: 'Nunito', sans-serif;
--nz-weight-light: 300;
--nz-weight-regular: 400;
--nz-weight-semibold: 600;
--nz-weight-extrabold: 800;
```

**Jerarquía de tamaños (responsive con clamp):**

```css
--nz-size-hero: clamp(32px, 7vw, 48px);        /* hero headline */
--nz-size-h1: clamp(28px, 5vw, 42px);          /* títulos de sección */
--nz-size-h2: clamp(22px, 4vw, 34px);          /* subtítulos */
--nz-size-h3: clamp(18px, 3vw, 24px);          /* encabezados menores */
--nz-size-body: clamp(14px, 2vw, 17px);        /* texto corrido */
--nz-size-small: clamp(12px, 1.5vw, 14px);     /* texto pequeño */
--nz-size-eyebrow: 11px;                        /* eyebrow labels en UPPERCASE */
```

### Espaciados

```css
--nz-space-xs: 4px;
--nz-space-sm: 8px;
--nz-space-md: 16px;
--nz-space-lg: 24px;
--nz-space-xl: 40px;
--nz-space-2xl: 64px;
--nz-space-3xl: 80px;
```

### Breakpoints

```css
--nz-bp-mobile: 768px;       /* mobile breakpoint */
--nz-bp-tablet: 1024px;      /* tablet breakpoint */
--nz-bp-desktop: 1280px;     /* desktop breakpoint */
```

### Bordes y radios

```css
--nz-border-thin: 0.5px solid var(--nz-neutral-300);
--nz-border-regular: 1px solid var(--nz-neutral-300);
--nz-border-strong: 2px solid var(--nz-ink);
--nz-radius-sm: 4px;         /* imágenes de proyectos */
--nz-radius-md: 6px;         /* cards */
--nz-radius-lg: 10px;        /* secciones destacadas */
--nz-radius-pill: 999px;     /* botones */
```

---

## Reglas visuales — disciplina del sistema

1. **El naranja (#E94E1B) nunca excede el 5% de la superficie visible.** Solo para:
   - Punto final de titulares: *"Algo que admiras**.**"*
   - Numeración de secciones (01, 02, 03...)
   - Cuadrado decorativo antes de eyebrows
   - Comillas del testimonio
   - Badges "MÁS PEDIDO" o "ANCLA"
   - CTA principal del cierre

2. **Nada de negro puro.** El texto principal es `#1D2A40` (azul noche), no `#000000`.

3. **Sentence case siempre.** Nunca Title Case ni ALL CAPS, salvo en eyebrow labels cortos (11px, letter-spacing 0.1em).

4. **Dos pesos activos por defecto:** 400 (regular) y 800 (extrabold). El 300 solo para testimonios/quotes largas. El 600 para UI navegacional.

5. **Responsive siempre con `clamp()`**, nunca con media queries gigantes para tipografía.

---

## Narrativa y copy — consistencia

### Posicionamiento
*"Marcas que hablan dos culturas sin elegir una."*

### Eyebrow de home
*"Desde Tokio · para los tuyos"*

### Sello de footer
`© 2026 NOZOE STUDIO · 東京・リマ`
(los caracteres 東京・リマ significan "Tokio · Lima" en kanji y katakana)

### Trayectoria oficial a comunicar
- +40 proyectos recientes
- 25 años de oficio
- 3 países activos: Perú · Japón · Brasil

### Idiomas de trabajo
- Español — NATIVO
- Português — FLUENTE
- English — BÁSICO
- 日本語 — BÁSICO (honestidad intencional)

### Modalidad
100% remoto · digital · Zoom/Meet

---

## Estructura del child theme

```
nozoe-child/
├── style.css                  # header del theme + imports de tokens
├── functions.php              # enqueue de styles, Nunito, overrides PHP
├── tokens/
│   └── nozoe-tokens.css      # todas las CSS variables
├── components/
│   ├── whatsapp-float.css    # botón flotante WhatsApp
│   ├── confidence-bar.css    # barra con banderitas
│   └── case-grid.css         # grid editorial asimétrico
└── templates/
    └── (templates futuros si se necesitan)
```

---

## Flujo de trabajo con Cowork/Code

1. **Cowork** para tareas de proyecto (setup, migración, backup, generación de archivos nuevos).
2. **Code** para edición de archivos con diffs visuales (cambios en CSS, ajustes de PHP).
3. **Siempre** pedirle a Claude que muestre el plan antes de ejecutar cambios importantes.
4. **Siempre** commit de git antes de experimentar algo grande.
5. **Nunca** trabajar directo en producción. Todo en local, deploy solo cuando esté probado.

---

## Preferencias de comunicación

- Responde en español.
- Sé directo, evita preámbulos largos.
- Si algo tiene riesgo, avisa antes de hacerlo.
- Muestra siempre el plan antes de ejecutar cambios que afecten varios archivos.
- Usa commits de Git descriptivos en español para que el historial sea legible.

---

## Páginas del site — referencia de diseño

Los mockups ya están diseñados y aprobados por Pedro en sesiones previas:

1. **Home** — hero emocional "Marcas que hablan dos culturas", barra de confianza con banderitas, 3 servicios, portafolio con TML Cipango como ancla, proceso de 4 pasos, paquetes, testimonio, CTA a WhatsApp.
2. **Caso de estudio individual** — plantilla replicable: contexto, reto, solución, resultados. TML Cipango será el flagship cuando haya materiales.
3. **Servicios** — tabs por tipo (Identidad, Web, Contenido, Retainer), paquetes con precios, proceso, FAQ.
4. **Portafolio** — TML Cipango como ancla destacada, grid asimétrico editorial agrupado por año, filtros por categoría.
5. **Contacto** — WhatsApp protagonista con mini-conversación ejemplo, formulario corto, bloque de audiencias bicultural, idiomas honestos.

Todas las páginas también tienen versión mobile optimizada.

---

## Decisiones pendientes (no urgentes)

- Caso de estudio extendido de TML Cipango (pendiente de materiales).
- Página "Estudio/About" con la historia personal de Pedro.
- Definición final de precios por servicio.
- Textos de FAQ completos.
