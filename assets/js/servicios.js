/* ═══════════════════════════════════════════════════════
   servicios.js — Nozoe Studio Web 2026
   JS específico de servicios.html
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Slider de servicios ── */
  const trackWrap = document.getElementById('svc-track-wrap');
  const dots      = document.querySelectorAll('.svc-dot');
  const cards     = document.querySelectorAll('.svc-card');
  const curEl     = document.getElementById('svc-cur');

  function getCardWidth() {
    return cards.length ? cards[0].offsetWidth + 12 : 0;
  }

  function getActiveIdx() {
    const cw = getCardWidth();
    return cw ? Math.round(trackWrap.scrollLeft / cw) : 0;
  }

  const prevBtn = document.getElementById('svc-prev');
  const nextBtn = document.getElementById('svc-next');

  function updateUI() {
    if (!trackWrap || !cards.length) return;
    const idx = getActiveIdx();
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === cards.length - 1;
  }

  if (trackWrap) {
    trackWrap.addEventListener('scroll', updateUI, { passive: true });
    updateUI();

    if (prevBtn) prevBtn.addEventListener('click', () => {
      const idx = Math.max(0, getActiveIdx() - 1);
      trackWrap.scrollTo({ left: idx * getCardWidth(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const idx = Math.min(cards.length - 1, getActiveIdx() + 1);
      trackWrap.scrollTo({ left: idx * getCardWidth(), behavior: 'smooth' });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.idx, 10);
        trackWrap.scrollTo({ left: idx * getCardWidth(), behavior: 'smooth' });
      });
    });

    let isDragging = false, dragMoved = false, startX, startScrollLeft;
    trackWrap.addEventListener('mousedown', e => {
      isDragging = true;
      dragMoved = false;
      startX = e.pageX - trackWrap.offsetLeft;
      startScrollLeft = trackWrap.scrollLeft;
      trackWrap.style.userSelect = 'none';
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      trackWrap.style.userSelect = '';
    });
    trackWrap.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - trackWrap.offsetLeft;
      if (Math.abs(x - startX) > 5) dragMoved = true;
      const walk = (x - startX) * 1.4;
      trackWrap.scrollLeft = startScrollLeft - walk;
    });

    /* Tras un arrastre, el clic que dispara el navegador al soltar no debe
       abrir la tarjeta enlazada ni un cajón. Va en fase de captura para
       frenarlo antes de que llegue al enlace o al botón. */
    trackWrap.addEventListener('click', e => {
      if (!dragMoved) return;
      e.preventDefault();
      e.stopPropagation();
      dragMoved = false;
    }, true);
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item    = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

});

/* ═══════════════════════════════════════════════════════
   HERO SERVICIOS — opción 1b · v2
   Rotación del índice + viraje del header.
   Añadir a assets/js/site.js o cargar aparte en servicios.html.
   Vanilla JS, sin dependencias.
   ═══════════════════════════════════════════════════════ */
(function () {
  const hero = document.querySelector('.svc-hero');
  if (!hero) return;

  /* ── 1. Header: transparente sobre el hero, sólido al pasarlo ──
     El estado por defecto (sin esta clase) es el header sólido de
     siempre, así que si algo falla se degrada a lo seguro. */
  const centinela = hero.querySelector('.svc-hero-sentinel');
  const header    = document.querySelector('.site-header');

  /* El centinela va justo un alto de header por encima del borde
     inferior del hero. Medimos el header en vez de fiarnos del 64px
     escrito en el CSS: así el punto de viraje sigue siendo correcto
     si cambia el alto de la barra en otro breakpoint. */
  function ajustarCentinela() {
    if (header) hero.style.setProperty('--svc-hdr', header.offsetHeight + 'px');
  }
  ajustarCentinela();
  addEventListener('resize', ajustarCentinela);

  if (centinela && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      // Fuera de viewport puede ser por arriba (ya pasamos el hero)
      // o por abajo (aún no hemos llegado). Solo la primera cuenta.
      const pasado = !e.isIntersecting && e.boundingClientRect.top < 0;
      document.body.classList.toggle('hdr-over-hero', !pasado);
    }, { threshold: 0 }).observe(centinela);
  }

  /* ── 2. Rotación del índice ── */
  const slides = hero.querySelectorAll('.svc-hero-media img');
  const items  = hero.querySelectorAll('.svc-hero-item');
  if (!slides.length || slides.length !== items.length) return;

  const INTERVALO = 4200; // ms que dura cada servicio en pantalla
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let actual  = 0;
  let timer   = null;
  let enVista = true;   // el hero está en pantalla
  let fijado  = false;  // el cursor o el foco retienen un servicio

  /* La saliente pasa a .is-prev: se queda opaca por debajo mientras la
     entrante hace el fundido encima. Así la cobertura nunca baja del
     100% y la foto no pulsa a oscuro entre servicio y servicio. */
  function mostrar(i) {
    const previo = actual;
    actual = (i + slides.length) % slides.length;
    if (previo === actual) return;

    slides.forEach((s, n) => {
      s.classList.toggle('is-prev', n === previo);
      s.classList.toggle('is-active', n === actual);
    });
    items.forEach((it, n) => it.classList.toggle('is-active', n === actual));
  }

  function detener() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  /* Solo arranca si de verdad toca: nada de reanudar con la pestaña
     oculta, el hero fuera de pantalla o un servicio retenido. */
  function arrancar() {
    detener();
    if (reduce.matches || document.hidden || !enVista || fijado) return;
    timer = setInterval(() => mostrar(actual + 1), INTERVALO);
  }

  items.forEach((it, n) => {
    it.addEventListener('mouseenter', () => { fijado = true;  detener(); mostrar(n); });
    it.addEventListener('focus',      () => { fijado = true;  detener(); mostrar(n); });
    it.addEventListener('mouseleave', () => { fijado = false; arrancar(); });
    it.addEventListener('blur',       () => { fijado = false; arrancar(); });
  });

  document.addEventListener('visibilitychange', arrancar);
  reduce.addEventListener('change', arrancar);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      enVista = e.isIntersecting;
      arrancar();
    }, { threshold: 0.15 }).observe(hero);
  }

  arrancar();  // el servicio 01 ya viene marcado desde el HTML
})();
