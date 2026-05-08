# Nozoe Studio · Design System

**Versión 1.0.0** · Tokio · Lima / 東京・リマ

Sistema de diseño completo para todos los productos de Nozoe Studio: web, mobile, aplicaciones y comunicación. Construido sobre una arquitectura de *design tokens* compatible con Figma, Claude Code, y cualquier framework moderno.

---

## 📦 Qué incluye este paquete

| Archivo | Para qué sirve | Dónde se usa |
|---|---|---|
| **`nozoe-tokens.json`** | Tokens en formato W3C DTCG | Figma (Tokens Studio plugin), Style Dictionary, build pipelines |
| **`nozoe-tokens.css`** | Variables CSS listas para producción | Claude Code, WordPress, Divi 5, cualquier proyecto web |
| **`nozoe-design-system.html`** | Documentación visual interactiva | Referencia diaria, presentación a clientes, onboarding |
| **`README.md`** | Esta guía | Instalación, uso, decisiones de diseño |

---

## 🎨 Filosofía del sistema

> **Suizo editorial con calidez latina.** Estructura precisa heredada del modernismo suizo (grilla, tipografía, jerarquía), suavizada con cromática cálida y un único acento vibrante. Bicultural por construcción: opera entre Tokio y Lima, sirve a Latinoamérica, Brasil y España.

### Tres principios

1. **El acento es sagrado** — el naranja `#E94E1B` nunca supera el 5% de ninguna superficie. Su escasez es lo que le da poder.
2. **Bordes mínimos** — máximo 4px en cualquier superficie. La sensación es editorial, no orgánica.
3. **Tipografía única** — Nunito en cuatro pesos. Toda la jerarquía nace de variar peso, tamaño y tracking — nunca cambiando de fuente.

---

## 🚀 Instalación rápida

### Para Figma

1. Instalá el plugin **[Tokens Studio for Figma](https://tokens.studio/)** (gratis).
2. En el plugin: `Tools → Load from file → nozoe-tokens.json`.
3. Aplicá `Push to Figma styles` para generar todos los estilos automáticamente.
4. (Opcional) Conectá el plugin a un repositorio Git para sincronización bidireccional.

### Para Claude Code / Web

```html
<!-- En el <head> de tu HTML -->
<link rel="stylesheet" href="nozoe-tokens.css">
```

```css
/* Usá los tokens semánticos en cualquier componente */
.mi-boton {
  background: var(--ns-accent);
  color: var(--ns-text-on-accent);
  padding: var(--ns-space-3) var(--ns-space-5);
  border-radius: var(--ns-radius-md);
  font: var(--ns-fw-semibold) var(--ns-fs-sm)/1 var(--ns-font-sans);
  transition: all var(--ns-dur-fast) var(--ns-ease-out);
}
```

## 🌓 Modo oscuro

El sistema tiene tres comportamientos automáticos:

```html
<!-- 1. Forzar light -->
<html data-theme="light">

<!-- 2. Forzar dark -->
<html data-theme="dark">

<!-- 3. Seguir preferencia del sistema (default si no se setea data-theme) -->
<html>
```

**Toggle vía JavaScript:**
```javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  localStorage.setItem('nozoe-theme', current === 'light' ? 'dark' : 'light');
}
```

---

## 🎯 Arquitectura de tokens (3 capas)

```
┌─────────────────────────────────────────────┐
│  CAPA 1 · PRIMITIVAS                        │
│  --ns-ink-800, --ns-orange-500, etc.        │
│  ⚠️  No usar directamente en componentes.   │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  CAPA 2 · SEMÁNTICAS  ✅ Usar acá           │
│  --ns-text-primary, --ns-accent, etc.       │
│  Cambian automáticamente en dark mode.      │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  CAPA 3 · COMPONENT TOKENS                  │
│  --ns-btn-h-md, --ns-card-padding, etc.     │
│  Inherit de las semánticas.                 │
└─────────────────────────────────────────────┘
```

**Regla de oro:** componentes hablan con la capa 2. Solo los tokens semánticos referencian primitivas. Cuando agregues un token nuevo, preguntate a qué capa pertenece.

---

## 🎨 Color · cuándo usar qué

### Paleta brand (los 5 originales)
| Color | HEX | Cuándo |
|---|---|---|
| **Ink** | `#1D2A40` | Texto principal, fondos dark, ancla estructural |
| **Orange** | `#E94E1B` | Único acento. CTAs, highlights, focus rings |
| **Sky Dark** | `#475773` | Texto secundario, iconos UI |
| **Sky Mid** | `#8B9DB7` | Texto terciario, placeholders |
| **Sky Light** | `#C6D5EA` | Bordes, divisores, estados hover sutiles |
| **Warm** | `#F4F1EC` | Fondo de página en light mode |

### Reglas de uso del acento

✅ **Sí**: un único CTA primario por pantalla, focus ring, número de sección, bullet de eyebrow, iconografía clave.

❌ **No**: textos largos, fondos grandes, múltiples botones en la misma vista, decoración gratuita.

> **Test del 5%:** si tachás el naranja con un dedo en la pantalla y se ve menos del 5% restante, pasás el test.

---

## ✍️ Tipografía · jerarquía clara

### Cuándo usar cada estilo

| Estilo | Tamaño | Uso |
|---|---|---|
| `display-xl` | 96px | Hero gigante de portfolio (1 vez por página máx) |
| `display-l` | 72px | Hero estándar |
| `display-m` | 56px | Sección hero secundaria |
| `h1` | 40px | Título de página |
| `h2` | 28px | Sección mayor |
| `h3` | 22px | Subsección |
| `h4` | 18px | Card title, label fuerte |
| `body-l` | 18px | Lede / introducción |
| `body` | 16px | Texto base |
| `body-s` | 14px | Texto secundario, capciones |
| `caption` | 12px | Metadata, footnotes |
| `eyebrow` | 12px UPPERCASE | **Sello editorial Nozoe** — usar en cada sección |
| `label` | 14px | Form labels |
| `mono` | 14px | Códigos, números de proyecto, IDs |

### El eyebrow: la firma del estudio

```html
<span class="ns-eyebrow">Estudio · Tokio Lima · 2026</span>
```

Es el detalle más reconocible del lenguaje Nozoe. Úsalo encima de títulos importantes, junto a una línea decorativa naranja de 32–48px.

---

## 📐 Espaciado · ritmo de 4px

Todo el sistema vive en múltiplos de 4. Esto crea ritmo perceptual incluso cuando el usuario no lo nota conscientemente.

**Los más usados** (75% de los casos): `2`, `4`, `6`, `8`, `12`, `16`.

```css
/* Padding de un card típico */
.card { padding: var(--ns-space-6); }       /* 24px */

/* Separación entre secciones */
.section { padding: var(--ns-space-24) 0; } /* 96px arriba/abajo */

/* Gap entre elementos en una línea */
.row { gap: var(--ns-space-3); }            /* 12px */
```

---

## 🧱 Componentes · inventario

El sistema incluye estos componentes base. Todos viven en el HTML showcase.

- **Botones**: `primary`, `secondary`, `ghost`, `text` × tamaños `sm`, `md`, `lg`
- **Inputs**: text, email, select, textarea, search × tamaños `sm`, `md`, `lg`
- **Tags**: default + variantes semánticas (`accent`, `success`, `warning`, `danger`)
- **Cards**: con/sin numeración editorial
- **Alerts**: 4 variantes (info, success, warning, danger)
- **Patrones**: hero editorial, grilla de portfolio

### Próximas adiciones recomendadas (v1.1)

- Navigation (header, footer, breadcrumbs)
- Modal / Drawer / Toast
- Tabs / Accordion
- Avatar / User card
- Pricing card (para tu plan de packages)
- Testimonial card (para tu plan de testimonios)
- Lead magnet block (para captura de email)
- WhatsApp floating button (componente con ícono y animación)

---

## 🤖 Cómo trabajar con Claude Code

### Patrón recomendado

Cuando le pidas a Claude Code que construya algo, incluí esto en el contexto:

> *"Usá el design system de Nozoe Studio que está en `nozoe-tokens.css`. Solo referenciá tokens semánticos (los que empiezan con `--ns-text-`, `--ns-surface-`, `--ns-accent`, `--ns-border-`). El sitio debe funcionar automáticamente en light y dark mode. Estética: suizo editorial con calidez. Usá la utility class `.ns-eyebrow` encima de los títulos de sección."*

### Snippets útiles

**Sección estándar Nozoe:**
```html
<section class="section">
  <header>
    <span class="ns-eyebrow" style="color: var(--ns-accent);">— 01 · Servicios</span>
    <h2 class="ns-h1">Diseño con dirección</h2>
    <p class="ns-body-l" style="color: var(--ns-text-secondary);">
      Lede introductorio…
    </p>
  </header>
  <!-- contenido -->
</section>
```

**CTA primario:**
```html
<a href="#" class="btn btn-primary btn-lg">Conversemos →</a>
```

**Stamp bilingüe (footer):**
```html
<div style="font-family: var(--ns-font-jp); font-weight: 600; letter-spacing: 0.08em;">
  東京 · リマ
</div>
```

---

## ♿ Accesibilidad

- **Contraste**: todas las combinaciones text-primary/surface-base superan WCAG AA (4.5:1) en ambos modos.
- **Focus visible**: ring naranja de 3px en todo elemento interactivo, automático vía `:focus-visible`.
- **Reduced motion**: el sistema desactiva animaciones cuando `prefers-reduced-motion: reduce`.
- **Tamaños mínimos**: botones e inputs nunca bajan de 32px de alto (target táctil).

---

## 📐 Grilla responsiva

| Breakpoint | Columnas | Gutter | Margen | Container |
|---|---|---|---|---|
| Mobile (< 768) | 4 | 16px | 20px | fluid |
| Tablet (768–1023) | 8 | 16px | 32px | fluid |
| Desktop (1024–1279) | 12 | 24px | 48px | 1024–1200px |
| Wide (≥ 1280) | 12 | 24px | 80px | 1440px max |

```css
.container {
  max-width: var(--ns-container-default); /* 1200px */
  margin: 0 auto;
  padding: 0 var(--ns-grid-margin);
}
```

---

## 🔄 Versionado

Este sistema sigue **SemVer**:
- `1.x.x` → cambios mayores que rompen tokens existentes
- `x.1.x` → tokens o componentes nuevos
- `x.x.1` → fixes, ajustes de valores

**Cambios pendientes para v1.1:**
- [ ] Tokens de iconografía (sizes, stroke widths)
- [ ] Componentes de navegación
- [ ] Patrones de portfolio extendidos
- [ ] Tokens para email templates
- [ ] Variantes para print (CMYK alternates)

---

## 🌏 Notas culturales del sistema

- El stamp `東京 · リマ` (Tokio · Lima en katakana) es la firma editorial. Usalo en footers, business cards, presentaciones.
- La numeración de secciones (`— 01`, `— 02`) es un guiño al diseño editorial suizo y refuerza el carácter del estudio.
- El sistema soporta tres idiomas en jerarquía: ES (primario), PT (secundario), EN/JP (terciario). Cuando incluyas texto JP, usá `font-family: var(--ns-font-jp)`.

---

## 📞 Preguntas o cambios

Este sistema es un documento vivo. Cuando un proyecto exija algo que no exista (un componente nuevo, un token específico), agregalo aquí primero — luego úsalo en el proyecto. Así el sistema crece con el estudio en lugar de quedarse atrás.

**Pedro · Nozoe Studio · 2026**
*Diseñado en Tokio para Latinoamérica, Brasil y España.*
