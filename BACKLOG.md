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

(Vacío por ahora — agregar mejoras conforme se detecten)

---

## Prioridad baja / nice-to-have

(Vacío por ahora — agregar mejoras conforme se detecten)

---

*Última actualización: mayo 2026.*
