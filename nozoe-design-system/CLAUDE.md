# NOZOE STUDIO — Instrucciones permanentes del proyecto

> Este archivo se carga automáticamente al inicio de cada sesión de Claude Code.
> Contiene toda la información crítica del proyecto para que no tengas que re-explicarla cada vez.

---

## Contexto del proyecto

**Cliente:** Pedro — diseñador gráfico peruano-nikkei (sansei, tercera generación japonesa) con 25 años de trayectoria, operando desde Japón.

**Proyecto:** Rediseño completo de nozoestudio.com (estudio de diseño propio).

**Posicionamiento:** Diseño de marca estratégico — ayuda a negocios a crecer con una imagen profesional y coherente. La doble cultura Japón–Latinoamérica es una ventaja, no el titular.

**Audiencia objetivo:** Emprendedores y negocios de habla hispana que quieren una marca profesional y lista para crecer. Muchos en Japón o con vínculo Japón–Latam, pero el filtro es querer crecer con buen diseño, no la biculturalidad.

**Tecnología:**
- Stack: HTML5 + CSS3 + JavaScript vanilla (estático puro)
- Sin frameworks, sin build tools, sin dependencias de runtime
- Servidor local de desarrollo: server.py (Python http.server)
- Versionado: Git + GitHub (repo pnozoe/Nozoe-Studio)
- Deploy: Cloudflare Pages (auto-deploy en push a main). Sitio en producción: nozoestudio.com

---

## Sistema de diseño

La especificación completa del sistema (tokens, escalas, paletas, tipografía, spacing, breakpoints, componentes) vive en:

- `nozoe-design-system/README.md` — documentación canónica
- `nozoe-design-system/nozoe-tokens.json` — tokens en formato W3C DTCG
- `nozoe-design-system/nozoe-tokens.css` — variables CSS de uso

Prefijo oficial: `--ns-` (ej: `--ns-ink-800`, `--ns-orange-500`, `--ns-fs-md`).

No duplicar la documentación de tokens en este archivo. Para cualquier cambio o consulta sobre el sistema, ir directo al README.md.

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
*Diseño de marca estratégico que ayuda a negocios a crecer con una imagen profesional y coherente.* (La conexión Japón–Latam es una ventaja, no el titular.)

### Eyebrow de home
*"Diseño estratégico desde Tokio"*

### Sello de footer
`© 2026 NOZOE STUDIO · 東京・リマ`
(los caracteres 東京・リマ significan "Tokio · Lima" en kanji y katakana)

### Trayectoria oficial a comunicar (cifras canónicas)
- +40 proyectos
- 25+ años de oficio
- 100% remoto
(Nota: "3 países" se retiró del sitio; el equipo es Pedro + red de colaboradores por proyecto.)

### Idiomas de trabajo
- Español — NATIVO
- Português — FLUENTE
- English — BÁSICO
- 日本語 — BÁSICO (honestidad intencional)

### Modalidad
100% remoto · digital · Zoom/Meet

---

## Flujo de trabajo con Claude Code

1. **Claude Code** para edición de archivos con diffs visuales (CSS, HTML, JS) y tareas de proyecto.
2. **Siempre** pedirle a Claude que muestre el plan antes de ejecutar cambios importantes.
3. **Siempre** commit de git antes de experimentar algo grande.
4. **Nunca** trabajar directo en producción. Todo en local, deploy solo cuando esté probado.

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
