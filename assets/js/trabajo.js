/* ═══════════════════════════════════════════════════════
   trabajo.js — Nozoe Studio Web 2026
   JS específico de trabajo.html (lightbox del portafolio)
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  const cards = document.querySelectorAll('.proj-card');

  /* ── Modal de proyecto (lightbox) ── */
  const modal      = document.getElementById('proj-modal');
  const modalClose = document.getElementById('modal-close');
  const modalSlot  = document.getElementById('modal-thumb-slot');
  const modalLabel = document.getElementById('modal-label');
  const modalYear  = document.getElementById('modal-year');

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modal) {
    cards.forEach(card => {
      card.addEventListener('click', e => {
        e.preventDefault();
        // Tiles con caso de estudio propio → navegar al caso en vez del modal
        if (card.dataset.caso) { window.location.href = card.dataset.caso; return; }
        const thumbImg = card.querySelector('.proj-thumb img');
        if (!thumbImg) return;

        const src = thumbImg.getAttribute('src');
        const alt = thumbImg.getAttribute('alt') || '';
        const name = card.querySelector('.proj-name');
        const tags = card.querySelector('.proj-tags');

        if (modalSlot && src) {
          modalSlot.innerHTML = '';
          const img = document.createElement('img');
          img.src = src;
          img.alt = alt;
          // estilos en CSS (.modal-inner img); aquí solo se setean src/alt
          modalSlot.appendChild(img);
        }
        if (modalLabel) modalLabel.textContent = name ? name.textContent : '';
        if (modalYear)  modalYear.textContent  = tags ? tags.textContent : '';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

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
