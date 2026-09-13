/* ═══════════════════════════════════════════════════════
   diseno-web.js — Nozoe Studio Web 2026
   JS específico de diseno-web.html.

   1. Header transparente mientras el hero ocupa la pantalla
      (mismo patrón que identidad-de-marca.js).
   2. Navegador y móvil del hero: rotan tres demos reales. Cada
      captura se recorre de arriba abajo (animación CSS) y la
      siguiente entra con un fundido por encima de la anterior.

   Vanilla JS, sin dependencias. Si no corre, la página se
   degrada a lo seguro: header sólido y la primera demo fija.
   ═══════════════════════════════════════════════════════ */
(function () {
  const hero = document.querySelector('.sp-hero');
  if (!hero) return;

  /* ── 1. Header: transparente sobre el hero, sólido al pasarlo ── */
  const header = document.querySelector('.site-header');
  const centinela = hero.querySelector('.sp-hero-sentinel');

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

  /* ── 2. Demos: rotación ── */
  const sitio = hero.querySelector('.sp-site');
  const escritorio = Array.from(hero.querySelectorAll('.sp-browser .sp-shot'));
  const movil = Array.from(hero.querySelectorAll('.sp-phone .sp-shot'));
  const demos = Array.from(hero.querySelectorAll('.sp-formats .sp-layer'));
  const url = hero.querySelector('.sp-browser-url');
  const cliente = hero.querySelector('.sp-plate-client');
  const meta = hero.querySelector('.sp-plate-meta');
  const enlace = hero.querySelector('.sp-plate-link');
  const contador = hero.querySelector('.sp-plate-count');
  if (!sitio || escritorio.length < 2 || movil.length !== escritorio.length ||
      demos.length !== escritorio.length || !url || !cliente || !meta || !enlace || !contador) return;

  const CICLO = 7000;  // ms por demo: lo que dura el recorrido de la captura
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* El recorrido de cada captura y la barra de la demo activa duran el ciclo */
  hero.style.setProperty('--sp-ciclo', CICLO + 'ms');

  let actual = 0;
  let timer = null;
  let enVista = true;   // el hero está en pantalla
  let fijado = false;   // el cursor o el foco retienen la demo

  function dosDigitos(n) {
    return String(n).padStart(2, '0');
  }

  /* La saliente pasa a .is-prev: queda opaca debajo, detenida al final
     de su recorrido, mientras la entrante hace el fundido encima y
     empieza el suyo desde arriba. */
  function mostrar(i) {
    const previo = actual;
    actual = (i + escritorio.length) % escritorio.length;
    if (previo === actual) return;

    [escritorio, movil].forEach(capturas => capturas.forEach((img, n) => {
      img.classList.toggle('is-prev', n === previo);
      img.classList.toggle('is-active', n === actual);
    }));

    const d = escritorio[actual].dataset;
    url.textContent = d.url;
    cliente.textContent = d.client;
    meta.textContent = d.meta;
    enlace.href = d.href;
    contador.textContent = dosDigitos(actual + 1) + ' / ' + dosDigitos(escritorio.length);
    demos.forEach((li, n) => li.classList.toggle('is-active', n === actual));
  }

  /* Al retener la demo, el recorrido se congela donde está */
  function detener() {
    if (timer) { clearInterval(timer); timer = null; }
    hero.classList.remove('is-rotating');
    sitio.classList.add('is-paused');
  }

  /* Solo rota si de verdad toca: nada de avanzar con la pestaña
     oculta, el hero fuera de pantalla o la demo retenida. */
  function arrancar() {
    detener();
    if (reduce.matches || document.hidden || !enVista || fijado) return;
    sitio.classList.remove('is-paused');
    /* Quitar y volver a poner la clase reinicia la barra de la demo activa */
    void hero.offsetWidth;
    hero.classList.add('is-rotating');
    timer = setInterval(() => mostrar(actual + 1), CICLO);
  }

  sitio.addEventListener('mouseenter', () => { fijado = true; detener(); });
  sitio.addEventListener('mouseleave', () => { fijado = false; arrancar(); });
  sitio.addEventListener('focusin', () => { fijado = true; detener(); });
  sitio.addEventListener('focusout', () => { fijado = false; arrancar(); });

  document.addEventListener('visibilitychange', arrancar);
  reduce.addEventListener('change', arrancar);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      enVista = e.isIntersecting;
      arrancar();
    }, { threshold: 0.15 }).observe(hero);
  }

  sitio.classList.add('is-scrolling');
  arrancar();
})();
