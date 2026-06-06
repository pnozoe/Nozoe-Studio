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

/* ── Dinamismo moderno (rama feature) ── */

/* Count-up: anima números con [data-count-to] al entrar en viewport */
(function(){
  var els = document.querySelectorAll('[data-count-to]');
  if (!els.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate(el){
    var to = parseFloat(el.dataset.countTo);
    var prefix = el.dataset.countPrefix || '';
    var suffix = el.dataset.countSuffix || '';
    if (reduce){ el.textContent = prefix + to + suffix; return; }
    var dur = 1200, start = null;
    function step(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  els.forEach(function(el){ io.observe(el); });
})();

/* Botones magnéticos: el CTA sigue sutilmente el cursor (solo desktop) */
(function(){
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var STRENGTH = 0.2;
  document.querySelectorAll('.btn-ember, .btn-ink').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * STRENGTH;
      var y = (e.clientY - r.top - r.height / 2) * STRENGTH;
      btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
  });
})();
