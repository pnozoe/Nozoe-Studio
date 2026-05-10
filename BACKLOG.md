# BACKLOG.md — Mejoras visuales y UX

Backlog de mejoras visuales, de UX y funcionales detectadas durante 
el cierre del proyecto que NO forman parte del refactor técnico 
(Fases 1-2), optimización de assets (Fase 3), o SEO técnico (Fase 4).

Estas mejoras se ejecutan en **fase posterior dedicada**, en commits 
separados, para mantener trazabilidad clara.

---

## Prioridad alta

### Botón flotante de WhatsApp en móvil
**Detectado:** mayo 2026, durante revisión visual previa a Fase 1.
**Contexto:** En viewport móvil (iPhone 14 Pro y similares), el 
botón de WhatsApp en el header ocupa demasiado espacio horizontal 
y compite visualmente con el logo y el menú hamburguesa.
**Propuesta:** Convertir el CTA de WhatsApp en un FAB (Floating 
Action Button) circular, fijo en la esquina inferior derecha en 
viewports < 768px. En desktop puede mantenerse en el header o 
duplicarse como flotante (a decidir).
**Páginas afectadas:** las 6 páginas del sitio.
**Estimación:** 1 sesión de Claude Code.
**Dependencias:** ninguna.

---

### Toggle de modo claro / oscuro funcional
**Detectado:** mayo 2026, durante revisión del Design System.
**Contexto:** El archivo nozoe-design-system.html del Design System 
ya implementa un toggle Light/Dark funcional. El sistema de tokens 
(nozoe-tokens.css y nozoe-tokens.json) ya define los 38 tokens 
semánticos para ambos modos. El sitio actualmente NO aprovecha 
esta capacidad — falta el toggle y el JavaScript de control.
**Propuesta:** 
- Agregar componente toggle (botón o switch) en header/footer 
  de las 6 páginas.
- JavaScript que: (a) lee preferencia del usuario en localStorage, 
  (b) respeta prefers-color-scheme del sistema como default, 
  (c) aplica clase .dark o data-theme="dark" en <html>, 
  (d) persiste la preferencia.
- Validar que las 6 páginas se ven correctamente en ambos modos.
**Páginas afectadas:** las 6 páginas del sitio.
**Estimación:** 1-2 sesiones de Claude Code.
**Dependencias críticas:** requiere que el refactor (Fases 1-2) 
haya migrado el CSS del sitio a tokens SEMÁNTICOS 
(--ns-surface-base, --ns-text-primary, etc.) en lugar de tokens 
primitivos (--ns-warm-200, --ns-ink-800). De lo contrario, los 
colores no cambiarán al alternar el modo.

---

## Prioridad media

### Armonización tipográfica con el Design System
**Detectado:** mayo 2026, durante análisis de Fase 1.1.
**Contexto:** index.html (y probablemente otras páginas) usan 8+
tamaños tipográficos fuera de la escala oficial del DS: 9px, 10px,
11px, 13px, 15px, 17px, 20px, 2rem. La escala del DS no contempla
estos valores actualmente.
**Propuesta:** Decisión editorial entre dos caminos:
- (A) Reemplazar cada uso por el token DS más cercano. Cambio
  visual perceptible pero genera disciplina sistémica.
- (B) Expandir el DS con tokens nuevos (--ns-fs-2xs, --ns-fs-13,
  --ns-fs-15) que documenten oficialmente la escala usada. Mantiene
  visual actual pero rompe la disciplina del sistema actual.
- (C) Híbrido: armonizar lo que sea natural, expandir el DS solo
  donde sea necesario.
**Páginas afectadas:** todas las del sitio (probablemente).
**Estimación:** 1 sesión + decisiones editoriales con Pedro.
**Dependencias:** ninguna técnica. Decisión de diseño.

---

### Investigación y limpieza de `<template id="__bundler_thumbnail">`
**Detectado:** mayo 2026, durante análisis de Fase 1.1.
**Contexto:** En el `<head>` de index.html (líneas 15-61) hay un
`<template>` con SVG embebido (~46 líneas) que parece autogenerado
por una herramienta externa. Pedro no recuerda haberlo agregado
ni qué herramienta lo produjo. Posibles orígenes: Adobe Express
export, Figma plugin, AI tool de generación de thumbnails, bundler
del editor.
**Propuesta:**
- Determinar origen (revisar herramientas usadas en la creación
  del archivo, buscar el ID en plugins instalados, comparar con
  exports de las herramientas mencionadas).
- Verificar si tiene función real (¿OG image fallback? ¿metadata
  para previews? ¿bundler que lo procesa?).
- Decidir: eliminar si es residuo, mantener si tiene función,
  documentar si es necesario para alguna pipeline.
- Verificar si el mismo template existe en las otras 5 páginas.
**Páginas afectadas:** index.html confirmado, otras a verificar.
**Estimación:** 30-60 min de investigación.
**Dependencias:** ninguna.

---

## Prioridad baja / nice-to-have

### Tokens de overlay y hairline para el DS
**Detectado:** mayo 2026, durante análisis de Fase 1.1.
**Contexto:** index.html usa 28 valores rgba únicos como bordes
sutiles, separadores hairline, y overlays de superficie. Son
colores del DS con alpha compositing variable. El DS actual no
expone tokens semánticos para estos casos.
**Propuesta:** Expandir el DS con tokens semánticos como:
- --ns-border-hairline (rgba sky-400 0.15)
- --ns-border-subtle (rgba sky-400 0.25)
- --ns-overlay-subtle (rgba ink-800 0.05)
- --ns-overlay-medium (rgba ink-800 0.1)
- (etc., una vez auditados todos los usos reales)
**Beneficio:** Coherencia sistémica + soporte automático de dark
mode + reducción de hardcodes en el sitio.
**Estimación:** 1-2 horas (auditoría de usos + diseño de escala
+ documentación + migración del sitio).
**Dependencias:** post-cierre del refactor de Fase 1-2.

---

*Última actualización: mayo 2026.*
