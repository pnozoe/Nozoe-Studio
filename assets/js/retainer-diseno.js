/* ═══════════════════════════════════════════════════════
   retainer-diseno.js — Nozoe Studio Web 2026
   JS específico de retainer-diseno.html.

   1. Header transparente mientras el hero ocupa la pantalla
      (mismo patrón que identidad-de-marca.js).
   2. Mes del hero: recorre los tres paquetes. En cada uno las
      solicitudes se encienden de lunes a viernes y las piezas
      aparecen en el bloque de fin de semana.

   Vanilla JS, sin dependencias. Si no corre, la página se
   degrada a lo seguro: header sólido y el mes del paquete
   Profesional ya completo.
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

  /* ── 2. Mes: rotación de paquetes ── */
  const mes = hero.querySelector('.sp-month');
  const semanas = mes ? Array.from(mes.querySelectorAll('.sp-week')) : [];
  const planes = Array.from(hero.querySelectorAll('.sp-formats .sp-layer'));
  const cuenta = hero.querySelector('.sp-month-n');
  const total = hero.querySelector('.sp-month-total');
  const nombre = hero.querySelector('.sp-plate-client');
  const meta = hero.querySelector('.sp-plate-meta');
  const contador = hero.querySelector('.sp-plate-count');
  if (semanas.length !== 4 || planes.length < 2 ||
      !cuenta || !total || !nombre || !meta || !contador) return;

  /* Stories de TML Cipango, en el mismo orden que el HTML */
  const PIEZAS = [
    'assets/casos/tml/redes/tml1-240.webp',
    'assets/casos/tml/redes/tml2-240.webp',
    'assets/casos/tml/redes/tml3-240.webp',
    'assets/casos/tml/redes/tml4-240.webp',
    'assets/casos/tml/tml-poster-240.webp'
  ];

  const CICLO = 8200;  // ms por paquete
  const INICIO = 300;  // pausa antes de la primera semana
  const DIA = 90;      // una solicitud por día laborable
  const PIEZA = 150;   // una pieza en el bloque de fin de semana
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* La barra del paquete activo se llena en lo que dura el ciclo */
  hero.style.setProperty('--sp-ciclo', CICLO + 'ms');

  let actual = Math.max(0, planes.findIndex(p => p.classList.contains('is-active')));
  let timer = null;
  let pasos = [];
  let enVista = true;   // el hero está en pantalla
  let fijado = false;   // el cursor o el foco retienen el mes

  function dosDigitos(n) {
    return String(n).padStart(2, '0');
  }

  function limpiarPasos() {
    pasos.forEach(clearTimeout);
    pasos = [];
  }

  function nuevaPieza(i) {
    const img = document.createElement('img');
    img.className = 'sp-week-piece';
    img.src = PIEZAS[i % PIEZAS.length];
    img.alt = '';
    img.width = 240;
    img.height = 427;
    img.decoding = 'async';
    return img;
  }

  function vaciar() {
    semanas.forEach(s => {
      s.querySelectorAll('.sp-week-day').forEach(d => d.classList.remove('is-on'));
      s.querySelector('.sp-week-block').replaceChildren();
    });
    cuenta.textContent = '0';
  }

  function pintarPie(p) {
    const d = planes[p].dataset;
    nombre.textContent = d.plan;
    meta.textContent = d.meta;
    total.textContent = d.pieces;
    contador.textContent = dosDigitos(p + 1) + ' / ' + dosDigitos(planes.length);
    planes.forEach((li, n) => li.classList.toggle('is-active', n === p));
  }

  /* Mes completo sin animación: estado de reposo */
  function llenar(p) {
    vaciar();
    const porSemana = Number(planes[p].dataset.pieces) / semanas.length;
    let i = 0;
    semanas.forEach(s => {
      s.querySelectorAll('.sp-week-day').forEach(d => d.classList.add('is-on'));
      const bloque = s.querySelector('.sp-week-block');
      for (let k = 0; k < porSemana; k++) bloque.appendChild(nuevaPieza(i++));
    });
    cuenta.textContent = String(i);
  }

  function reproducir(p) {
    limpiarPasos();
    actual = (p + planes.length) % planes.length;
    pintarPie(actual);

    if (reduce.matches) { llenar(actual); return; }

    vaciar();
    const porSemana = Number(planes[actual].dataset.pieces) / semanas.length;
    let t = INICIO;
    let i = 0;
    semanas.forEach(s => {
      s.querySelectorAll('.sp-week-day').forEach(d => {
        pasos.push(setTimeout(() => d.classList.add('is-on'), t));
        t += DIA;
      });
      const bloque = s.querySelector('.sp-week-block');
      for (let k = 0; k < porSemana; k++) {
        const n = i++;
        pasos.push(setTimeout(() => {
          bloque.appendChild(nuevaPieza(n));
          cuenta.textContent = String(n + 1);
        }, t));
        t += PIEZA;
      }
    });
  }

  /* Si se detiene a mitad de un mes, se completa: nunca queda a medias */
  function detener() {
    if (timer) { clearInterval(timer); timer = null; }
    hero.classList.remove('is-rotating');
    if (pasos.length) { limpiarPasos(); llenar(actual); }
  }

  /* Solo rota si de verdad toca: nada de avanzar con la pestaña
     oculta, el hero fuera de pantalla o el mes retenido. */
  function arrancar() {
    if (timer) { clearInterval(timer); timer = null; }
    hero.classList.remove('is-rotating');
    if (reduce.matches || document.hidden || !enVista || fijado) return;
    /* Quitar y volver a poner la clase reinicia la barra del paquete activo */
    void hero.offsetWidth;
    hero.classList.add('is-rotating');
    timer = setInterval(() => reproducir(actual + 1), CICLO);
  }

  mes.addEventListener('mouseenter', () => { fijado = true; detener(); });
  mes.addEventListener('mouseleave', () => { fijado = false; arrancar(); });
  mes.addEventListener('focusin', () => { fijado = true; detener(); });
  mes.addEventListener('focusout', () => { fijado = false; arrancar(); });

  document.addEventListener('visibilitychange', arrancar);
  reduce.addEventListener('change', arrancar);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      enVista = e.isIntersecting;
      arrancar();
    }, { threshold: 0.15 }).observe(hero);
  }

  if (!reduce.matches && !document.hidden) reproducir(actual);
  arrancar();
})();
