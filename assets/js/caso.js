/* ═══════════════════════════════════════════════════════
   caso.js — Nozoe Studio Web 2026
   JS genérico para páginas de caso de estudio (lightbox de galería).
   Reutilizable por cualquier caso-*.html (opera sobre
   [data-lightbox-src] y #lightbox).
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Lightbox ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg) return;

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    // limpiar src tras la transición para liberar memoria
    setTimeout(() => { lightboxImg.src = ''; }, 260);
  };

  document.querySelectorAll('[data-lightbox-src]').forEach(item => {
    item.addEventListener('click', () => {
      open(item.dataset.lightboxSrc, item.dataset.lightboxAlt);
    });
  });

  // cerrar: clic fuera de la imagen, botón ×, tecla Esc
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  if (lightboxClose) lightboxClose.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });

  // evitar que el clic en la imagen cierre el modal
  lightboxImg.addEventListener('click', (e) => e.stopPropagation());

});
