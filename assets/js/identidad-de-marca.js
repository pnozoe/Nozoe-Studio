/* ═══════════════════════════════════════════════════════
   identidad-de-marca.js — Nozoe Studio Web 2026
   JS específico de identidad-de-marca.html.

   1. Header transparente mientras el hero ocupa la pantalla
      (mismo patrón que el hero de servicios.html).
   2. Placa del hero: rota tres identidades reales y reinicia
      la animación de construcción en cada cambio.

   Vanilla JS, sin dependencias. Si no corre, la página se
   degrada a lo seguro: header sólido y la primera identidad
   fija, con la retícula ya dibujada.
   ═══════════════════════════════════════════════════════ */
(function () {
  const hero = document.querySelector('.sp-hero');
  if (!hero) return;

  /* ── 1. Header: transparente sobre el hero, sólido al pasarlo ── */
  const header = document.querySelector('.site-header');
  const centinela = hero.querySelector('.sp-hero-sentinel');

  /* El centinela va un alto de header por encima del borde inferior
     del hero. Se mide el header real en vez de fiarse del CSS. */
  function ajustarCentinela() {
    if (header) hero.style.setProperty('--sp-hdr', header.offsetHeight + 'px');
  }
  ajustarCentinela();
  addEventListener('resize', ajustarCentinela);

  if (centinela && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      // Fuera de pantalla por arriba = ya pasamos el hero.
      const pasado = !e.isIntersecting && e.boundingClientRect.top < 0;
      document.body.classList.toggle('hdr-over-hero', !pasado);
    }, { threshold: 0 }).observe(centinela);
  }

  /* ── 2. Placa: rotación de identidades ── */
  const imgs = Array.from(hero.querySelectorAll('.sp-plate-img'));
  const placa = hero.querySelector('.sp-plate');
  const cliente = hero.querySelector('.sp-plate-client');
  const meta = hero.querySelector('.sp-plate-meta');
  const enlace = hero.querySelector('.sp-plate-link');
  const contador = hero.querySelector('.sp-plate-count');
  if (imgs.length < 2 || !cliente || !meta || !enlace || !contador) return;

  const CICLO = 6400; // ms por identidad: construir, mostrar, cambiar
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let actual = 0;
  let timer = null;
  let enVista = true;   // el hero está en pantalla
  let fijado = false;   // el cursor o el foco retienen la placa

  function dosDigitos(n) {
    return String(n).padStart(2, '0');
  }

  /* Quitar y volver a poner la clase reinicia las animaciones CSS.
     El reflow intermedio es imprescindible: sin él el navegador
     agrupa los dos cambios y no reinicia nada. */
  function construir() {
    hero.classList.remove('is-building');
    void hero.offsetWidth;
    hero.classList.add('is-building');
  }

  function mostrar(i) {
    actual = (i + imgs.length) % imgs.length;
    imgs.forEach((img, n) => img.classList.toggle('is-active', n === actual));

    const d = imgs[actual].dataset;
    cliente.textContent = d.client;
    meta.textContent = d.meta;
    enlace.href = d.href;
    contador.textContent = dosDigitos(actual + 1) + ' / ' + dosDigitos(imgs.length);
    construir();
  }

  function detener() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  /* Solo rota si de verdad toca: nada de avanzar con la pestaña
     oculta, el hero fuera de pantalla o la placa retenida. */
  function arrancar() {
    detener();
    if (reduce.matches || document.hidden || !enVista || fijado) return;
    timer = setInterval(() => mostrar(actual + 1), CICLO);
  }

  if (placa) {
    placa.addEventListener('mouseenter', () => { fijado = true; detener(); });
    placa.addEventListener('mouseleave', () => { fijado = false; arrancar(); });
    placa.addEventListener('focusin', () => { fijado = true; detener(); });
    placa.addEventListener('focusout', () => { fijado = false; arrancar(); });
  }

  document.addEventListener('visibilitychange', arrancar);
  reduce.addEventListener('change', arrancar);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      enVista = e.isIntersecting;
      arrancar();
    }, { threshold: 0.15 }).observe(hero);
  }

  if (!reduce.matches) construir();
  arrancar();
})();
