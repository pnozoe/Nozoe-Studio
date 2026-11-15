# Nozoe Studio · Sistema de diseño (copia del sitio)

Versión **2.2.0** · 15 nov 2026 · Tokio 東京

Esta carpeta guarda la copia de los tokens que usa el sitio. **No se edita aquí.** La fuente única es `Desktop/Nozoe Studio/00-Marca/nozoe-design-system/`:

- `nozoe-tokens.json`: fuente de tokens (Design Tokens 2025.10). Se construye con `node tools/construir.mjs`.
- `nozoe-tokens.css`: el archivo generado que se copia aquí.
- `MARCA.md`: reglas de uso. `README.md`: documentación completa. `CAMBIOS.md`: versiones.

Para actualizar el sitio: construir allí, copiar `nozoe-tokens.css` y `nozoe-tokens.json` a esta carpeta y subir el parámetro `?v=` del enlace en las páginas.

## Migración a la v2 (15 nov 2026)

- Todos los nombres de la v1 siguen existiendo; los valores de marca no cambian salvo el texto terciario en claro (`#8B9DB7` → `#566B89`).
- Fondos naranjas con texto encima (botones, insignias, etiquetas): `--ns-accent-fill`, con `--ns-accent-fill-hover` al pasar el cursor. Puntos, líneas y barras siguen en `--ns-accent`.
- Escenas en tinta (hero, proceso, cierre, pie y similares): `assets/css/site.css` les devuelve el terciario claro (`--ns-sky-400`), porque `#566B89` sobre tinta no llega a 3:1.
- Fuentes: entra Nunito 400 (`assets/fonts/nunito-400.woff2`, mismo subconjunto que el resto) y Geist Mono variable para datos.
- Cuerpo en Nunito 400: las 104 reglas de texto que pedían 300 pasan a 400; las citas grandes y las cifras decorativas (14 reglas) siguen en 300. La precarga es la 400.
- Pie: `© 2026 Nozoe Studio · Tokio 東京`.
