# CLAUDE.md — Nozoe Studio Web 2026

Instrucciones permanentes para trabajar en este proyecto con Claude Code.
Léeme antes de modificar cualquier archivo.

---

## 1. Contexto del proyecto

**Nozoe Studio** es un estudio de diseño gráfico bicultural Japón-Latam, 
con sede en (Ibaraki, Japón). Atiende clientes locales de Perú, Brasil y Argentina.
Además, audiencia hispanohablante a través de redes sociales y web.

Este repositorio contiene el **rediseño 2026 de la web del estudio**. 
La web es la pieza central de la marca: portafolio, voz editorial, 
servicios y captación de clientes.

**Audiencia primaria:** latinos que viven en Japón, clientes 
hispanohablantes a distancia, emprendedores locales con interés en estética bicultural.

**Voz de marca:** editorial, sobria, cálida. Cruce entre rigor suizo 
y calidez latina. Bilingüe en espíritu, principalmente en español.

Para identidad de marca, voz, tono y dirección visual, ver `BRAND.md`.

---

## 2. Stack técnico (definitivo)

- **HTML5** semántico
- **CSS3** vanilla (variables CSS, sin preprocesadores)
- **JavaScript** vanilla (sin frameworks, sin librerías de terceros)
- **Sin build tools, sin bundlers, sin dependencias de runtime**
- Servidor local de desarrollo: `server.py` (Python http.server)
- Versionado: Git local
- Deploy: estático (host por definir)

**Decisión cerrada:** este proyecto es y será HTML estático. No se 
migrará a WordPress, React, Next.js u otro framework. Cualquier 
sugerencia de cambio de stack debe rechazarse.

---

## 3. Estructura del repositorio


```
.
├── CLAUDE.md                    ← este archivo (sitio completo)
├── BRAND.md                     ← identidad y voz de marca
├── README.md                    ← (pendiente de crear)
├── .gitignore
├── server.py                    ← servidor local de desarrollo
│
├── index.html                   ← home
├── estudio.html                 ← sobre el estudio
├── servicios.html               ← oferta de servicios
├── trabajo.html                 ← portafolio
├── contacto.html                ← contacto
├── caso-tml.html                ← caso de estudio TML Cipango
│
├── assets/
│   ├── favicon.webp
│   ├── nozoe-studio-logo.svg
│   ├── nozoe-studio-isotipo.svg
│   ├── img/                     ← imágenes generales del sitio
│   └── casos/                   ← imágenes por caso de estudio
│
└── nozoe-design-system/         ← sistema de diseño (paquete propio)
    ├── CLAUDE.md                ← contexto del DS
    ├── README.md                ← documentación canónica del DS
    ├── nozoe-tokens.css         ← variables CSS (fuente única)
    ├── nozoe-tokens.json        ← tokens W3C DTCG
    └── nozoe-design-system.html ← showcase del sistema
```


**A futuro (en fase de refactor):**
- `assets/css/site.css` — CSS común externalizado
- `assets/js/site.js` — JS común externalizado

---

## 4. Sistema de diseño

El sistema de diseño es un **paquete autocontenido** dentro de 
`nozoe-design-system/`. La documentación canónica vive ahí.

**Prefijo oficial de variables CSS:** `--ns-` (ejemplos: 
`--ns-ink-800`, `--ns-orange-500`, `--ns-fs-md`, `--ns-space-16`).

**Fuente única de tokens:** `nozoe-design-system/nozoe-tokens.css`. 
Este archivo se enlaza desde el `<head>` de cada página del sitio.

**Reglas de uso:**
- **Preferir tokens semánticos sobre tokens primitivos.** 
  Usar `--ns-surface-base` en lugar de `--ns-warm-200`, 
  `--ns-text-primary` en lugar de `--ns-ink-800`, etc. 
  Los tokens semánticos están preparados para soportar 
  modo claro/oscuro; los primitivos no. Solo usar primitivos 
  cuando no exista un semántico apropiado.
- Nunca hardcodear colores, tamaños tipográficos, espaciados o radios. 
  Usar siempre `var(--ns-…)`.
- Si un valor necesario no existe como token, primero proponer 
  agregarlo al sistema. Solo en casos justificados se admite un 
  valor literal (ej: colores de marca de terceros como WhatsApp `#25D366`).
- No introducir nuevas paletas, fuentes o escalas sin actualizar 
  primero `nozoe-tokens.json` y `nozoe-tokens.css`.

Para detalles sobre paletas, escalas, tipografía y filosofía del 
sistema, leer `nozoe-design-system/README.md`.

---

## 5. Convenciones de código

**HTML:**
- Idioma declarado: `<html lang="es">`
- Estructura semántica obligatoria: `<header>`, `<nav>`, `<main>`, 
  `<section>`, `<footer>`. No omitir landmarks por comodidad.
- Atributo `alt` obligatorio en todas las imágenes (descriptivo, 
  no genérico).
- `loading="lazy"` en imágenes que no estén above-the-fold.
- Indentación: 2 espacios.

**CSS:**
- Variables CSS del sistema (`var(--ns-…)`) por defecto. Hex 
  literales solo si están justificados.
- Nomenclatura de clases: kebab-case, semántica (no utility-first).
- Evitar `!important`. Si es inevitable, comentar el porqué.
- Mobile-first: media queries de menor a mayor.
- Breakpoints oficiales: ver `nozoe-tokens.css` (`--ns-bp-*`).

**JavaScript:**
- Vanilla JS, sin dependencias.
- IIFE o módulos ES6 según el caso.
- Sin frameworks. Sin jQuery. Sin librerías de terceros.

**Idioma:**
- Contenido del sitio: español neutro.
- Comentarios en código: español.
- Mensajes de commit: español, descriptivos, en imperativo 
  (ej: "Refactoriza header para usar tokens").
- Nombres de variables/funciones: inglés (convención de programación).

---

## 6. Estado actual del proyecto

**Fase actual:** cierre del rediseño 2026 (estimado en 75-80% real 
al actualizar este documento).

**Trabajo en rama:** `cierre-final` (creada desde `main`).
**Baseline seguro:** `main` (commit inicial `997ce0f`).

**Páginas existentes (6):** index, estudio, servicios, trabajo, 
contacto, caso-tml.

### Roadmap de cierre — sub-fases

**Fase 1 — Refactor técnico de index.html (página piloto)**
- ✅ Fase 1.1: Preparación e infraestructura (commit 24df36b)
- ✅ Fase 1.2: Externalización de CSS (commit f32581b)
- ⏳ Fase 1.3: Aplicación de tokens del DS
- ⏳ Fase 1.4: Estructura semántica + JS
- ⏳ Cierre Fase 1: Documentación del patrón (docs/REFACTOR_PATTERN.md)

**Fase 2 — Replicación a las 5 páginas restantes**
Aplicar el patrón documentado en Fase 1 a: estudio, servicios, 
trabajo, contacto, caso-tml. Unificar header/footer divergentes.

**Fase 3 — Optimización técnica de assets existentes**
- Reemplazar JPGs por WebPs ya disponibles (~8.9 MB de ahorro)
- Agregar `loading="lazy"` donde corresponda
- Decidir destino de SVGs no usados

**Fase 3.5 — Actualización de contenido visual**
Integrar las 52 imágenes WebP nuevas organizadas por Pedro en 
`~/Desktop/Imagenes web 2026/`:
- 2 archivos para Estudio (Pedro-Perfil, web-perfil)
- 8 archivos para Servicios (4 Como Trabajamos + 4 Servicios)
- 38 archivos para Trabajo (12 Ads + 5 Editorial + 2 Flyer 
  + 7 Identidad + 2 Packaging + 1 Web)
Decisiones pendientes: curaduría de portafolio (¿mostrar todas 
o seleccionar 12-15?), nomenclatura final en assets/, alt text 
editorial.

**Fase 4 — SEO técnico y pre-producción**
Canonical, sitemap.xml, robots.txt, completar OG tags, Twitter 
Cards, JSON-LD (Organization, LocalBusiness, ItemList para 
portafolio, Article para casos de estudio).

**Fase 4.7 — Refinamiento editorial de copy**
Decisión sobre estructura de precios (Opción D confirmada: 
"Desde $X" con doble moneda ¥/US$). Capa pedagógica antes de 
los precios en la página Servicios. Revisión integral del copy 
de Home y Servicios. Coherencia bicultural según BRAND.md.

**Fase 5 — QA final + deploy**
Validación cross-browser, Lighthouse, merge cierre-final → main, 
deploy estático.

**Post-deploy (en BACKLOG.md):**
- Actualización integral de perfiles sociales (Behance, LinkedIn, 
  Instagram)
- FAB WhatsApp móvil
- Toggle dark/light mode
- Armonización tipográfica
- Estrategia de contenido orgánico (sección de recursos)

### Deuda técnica detectada (a resolver en estas fases)

1. CSS inline en cada página (~4.450 líneas duplicadas) → 
   externalizar a `assets/css/site.css`. ✅ Resuelto para index 
   en Fase 1.2.
2. Tokens del DS no aplicados al sitio (~125 colores hardcodeados) 
   → reemplazar por `var(--ns-…)`. Próximo en Fase 1.3.
3. Falta de `<header>` y `<main>` semánticos. Programado en Fase 1.4.
4. Footer divergente entre `servicios`/`trabajo` y el resto. 
   A resolver en Fase 2.
5. Imágenes JPG pesadas con `.webp` ya disponibles (8.9 MB 
   evitables). A resolver en Fase 3.
6. SEO técnico incompleto. A resolver en Fase 4.

**Estrategia de cierre:** página piloto (`index.html`) → patrón 
documentado → replicación mecánica a las otras 5.

---

## 7. Reglas de trabajo durante esta fase

Estas reglas son **defensivas**. El proyecto está casi terminado 
y el riesgo es romper lo que ya funciona, no la falta de avance.

1. **Antes de modificar un archivo, leerlo completo.** No asumir 
   estructura.
2. **Antes de aplicar cambios estructurales (refactor de un archivo 
   completo), mostrar el plan al usuario.** Esperar confirmación.
3. **Trabajar en commits pequeños y atómicos.** Un cambio 
   conceptual = un commit.
4. **Nunca refactorizar más de una página por sesión** sin 
   confirmación explícita. Riesgo de divergencia.
5. **Validar visualmente** después de cada cambio relevante 
   (abrir el sitio en `server.py` y revisar).
6. **No introducir nuevas dependencias, librerías ni frameworks.**
7. **No cambiar el sistema de diseño** salvo que se solicite 
   explícitamente. El DS está cerrado.
8. **No reescribir el contenido editorial** (textos, copy) sin 
   consulta. El tono está definido.
9. **No tocar las imágenes finales.** Si una imagen necesita 
   cambio, es decisión del usuario.

---

## 8. Cosas que NO hacer

- ❌ Migrar a WordPress, Divi, o cualquier framework.
- ❌ Introducir build tools (webpack, vite, parcel).
- ❌ Agregar librerías JS externas (jQuery, GSAP, AOS, etc.) sin 
  pedir permiso explícito.
- ❌ Hardcodear colores, espaciados, tamaños tipográficos.
- ❌ Crear nuevos prefijos de variables CSS distintos a `--ns-`.
- ❌ Refactorizar páginas en paralelo sin haber validado la piloto.
- ❌ Hacer commits que mezclen múltiples cambios conceptuales.
- ❌ Modificar `nozoe-design-system/` sin consulta previa.

---

## 9. Flujo de trabajo con Git

- Trabajo activo en `cierre-final`.
- `main` queda intocable como punto de restauración.
- Commits frecuentes, mensajes en español, descriptivos.
- Al cierre del proyecto: merge `cierre-final` → `main` con 
  revisión final.

---

*Última actualización: mayo 2026 — fase de cierre.*
