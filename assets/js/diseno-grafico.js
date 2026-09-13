/* ═══════════════════════════════════════════════════════
   diseno-grafico.js — Nozoe Studio Web 2026
   JS específico de diseno-grafico.html.

   1. Header transparente mientras el hero ocupa la pantalla
      (mismo patrón que identidad-de-marca.js).
   2. Hoja del hero: cuatro piezas reales en cuatro formatos.
      La hoja apaga la pieza, cambia de proporción con sus
      marcas de corte y enciende la siguiente.

   Vanilla JS, sin dependencias. Si no corre, la página se
   degrada a lo seguro: header sólido y el afiche fijo.
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

  /* ── 2. Hoja: rotación de formatos ── */
  const hoja = hero.querySelector('.sp-sheet');
  const imgs = Array.from(hero.querySelectorAll('.sp-sheet-img'));
  const formatos = Array.from(hero.querySelectorAll('.sp-formats .sp-layer'));
  const figura = hero.querySelector('.sp-press');
  const cliente = hero.querySelector('.sp-plate-client');
  const meta = hero.querySelector('.sp-plate-meta');
  const enlace = hero.querySelector('.sp-plate-link');
  const enlaceTxt = hero.querySelector('.sp-plate-link-txt');
  const contador = hero.querySelector('.sp-plate-count');
  if (!hoja || imgs.length < 2 || formatos.length !== imgs.length ||
      !cliente || !meta || !enlace || !enlaceTxt || !contador) return;

  const CICLO = 5600;   // ms por formato
  const FUNDIDO = 400;  // = --ns-dur-slow: la pieza se apaga
  const CAMBIO = 900;   // = --ns-dur-slower × 1,5: la hoja cambia de proporción
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* La barra del formato activo se llena en lo que dura el ciclo */
  hero.style.setProperty('--sp-ciclo', CICLO + 'ms');

  let actual = 0;
  let timer = null;
  let pasos = [];
  let enVista = true;   // el hero está en pantalla
  let fijado = false;   // el cursor o el foco retienen la hoja

  function dosDigitos(n) {
    return String(n).padStart(2, '0');
  }

  function limpiarPasos() {
    pasos.forEach(clearTimeout);
    pasos = [];
  }

  function pintarPie(i) {
    const d = imgs[i].dataset;
    cliente.textContent = d.client;
    meta.textContent = d.meta;
    enlace.href = d.href;
    enlaceTxt.textContent = d.linkLabel;
    contador.textContent = dosDigitos(i + 1) + ' / ' + dosDigitos(imgs.length);
    formatos.forEach((f, n) => f.classList.toggle('is-active', n === i));
  }

  function mostrar(i) {
    const siguiente = (i + imgs.length) % imgs.length;
    limpiarPasos();
    actual = siguiente;
    pintarPie(siguiente);

    if (reduce.matches) {
      hoja.dataset.format = imgs[siguiente].dataset.format;
      imgs.forEach((img, n) => img.classList.toggle('is-active', n === siguiente));
      return;
    }

    /* Se apaga la pieza antes de cambiar la hoja: redimensionar una
       imagen con object-fit: cover a la vista la hace saltar. */
    hoja.classList.add('is-shifting');
    imgs.forEach(img => img.classList.remove('is-active'));
    pasos.push(setTimeout(() => {
      hoja.dataset.format = imgs[siguiente].dataset.format;
    }, FUNDIDO));
    pasos.push(setTimeout(() => {
      imgs[siguiente].classList.add('is-active');
      hoja.classList.remove('is-shifting');
    }, FUNDIDO + CAMBIO));
  }

  function detener() {
    if (timer) { clearInterval(timer); timer = null; }
    hero.classList.remove('is-rotating');
  }

  /* Solo rota si de verdad toca: nada de avanzar con la pestaña
     oculta, el hero fuera de pantalla o la hoja retenida. */
  function arrancar() {
    detener();
    if (reduce.matches || document.hidden || !enVista || fijado) return;
    /* Quitar y volver a poner la clase reinicia la barra del formato activo */
    void hero.offsetWidth;
    hero.classList.add('is-rotating');
    timer = setInterval(() => mostrar(actual + 1), CICLO);
  }

  if (figura) {
    figura.addEventListener('mouseenter', () => { fijado = true; detener(); });
    figura.addEventListener('mouseleave', () => { fijado = false; arrancar(); });
    figura.addEventListener('focusin', () => { fijado = true; detener(); });
    figura.addEventListener('focusout', () => { fijado = false; arrancar(); });
  }

  document.addEventListener('visibilitychange', arrancar);
  reduce.addEventListener('change', arrancar);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      enVista = e.isIntersecting;
      arrancar();
    }, { threshold: 0.15 }).observe(hero);
  }

  arrancar();
})();
