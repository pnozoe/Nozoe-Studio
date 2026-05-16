/* ═══════════════════════════════════════════════════════
   site.js — Nozoe Studio Web 2026

   JavaScript común externalizado del sitio. Refactorizado
   en Fase 1 del cierre del proyecto.

   Reglas:
   - Vanilla JS, sin dependencias externas
   - IIFE o módulos ES6 según el caso
   - Sin frameworks, sin librerías
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* Menú hamburguesa */
  const navHam = document.getElementById('nav-ham');
  const navMenu = document.querySelector('.nav-links');
  if (navHam && navMenu) {
    navHam.addEventListener('click', () => navMenu.classList.toggle('open'));
  }
});

/* ── Scroll-reveal ── */
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
});
