/* ═══════════════════════════════════════════════════════
   trabajo.js — Nozoe Studio Web 2026
   JS específico de trabajo.html (hero rotativo)
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Hero rotativo: alterna entre los 4 casos destacados ── */
  const hero = document.querySelector('.page-hero--rotating');
  if (hero) {
    const slides   = [...hero.querySelectorAll('.hsv-slide')];
    const infoCases = [...hero.querySelectorAll('.hsi-case')];
    const pills     = [...hero.querySelectorAll('.cat-pill')];
    const numEl     = hero.querySelector('.hsv-num');
    const DURATION  = 6000;
    let index = 0;
    let timer = null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = i;
      slides.forEach((el, j) => el.classList.toggle('is-active', j === i));
      infoCases.forEach((el, j) => el.classList.toggle('is-active', j === i));
      pills.forEach((el, j) => {
        const on = j === i;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
    }

    function restartProgress() {
      hero.classList.remove('is-animating');
      void hero.offsetWidth; // fuerza reflow para reiniciar la animación CSS
      hero.classList.add('is-animating');
    }

    function next() {
      show((index + 1) % slides.length);
      restartProgress();
    }

    function start() {
      if (reduceMotion || timer) return;
      restartProgress();
      timer = setInterval(next, DURATION);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
      hero.classList.remove('is-animating');
    }

    // Al elegir una categoría se muestra su caso y el contador vuelve a empezar
    function goTo(i) {
      show(i);
      stop();
      start();
    }

    pills.forEach((pill, i) => pill.addEventListener('click', () => goTo(i)));

    show(0);
    start();

    /* La pausa se limita al panel visual: el hero ocupa toda la pantalla, así que
       escuchar el hover sobre la sección entera dejaría la rotación siempre detenida. */
    const visual = hero.querySelector('.hero-showcase-visual');
    if (visual) {
      visual.addEventListener('mouseenter', stop);
      visual.addEventListener('mouseleave', start);
    }
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
  }

});
