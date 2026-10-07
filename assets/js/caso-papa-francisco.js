/* ═══════════════════════════════════════════════════════
   caso-papa-francisco.js — Nozoe Studio Web 2026
   JS específico de caso-papa-francisco.html (rediseño de octubre 2026)
   · Caja de luz con flechas: recorre las piezas del mismo grupo
   · Bucle de fondo del hero
   · 04 · Variantes del refinamiento en un mismo marco
   · 05 · Anatomía del logotipo: cada parte se ilumina
   · 06 · Regla de 20 cm: el logotipo crece y se pixela al pasar el límite
   · 07 · Manual: carril horizontal anclado con capítulos
   · 13 · Medalla que gira sola a la vista y con un clic
   · Parallax suave en [data-par]
   Las cifras que cuentan hacia arriba las anima site.js ([data-count-to]).
   ═══════════════════════════════════════════════════════ */

const pfReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Caja de luz ──
   Cada pieza ampliable lleva data-lightbox-src (versión grande) y
   data-lightbox-alt. Las flechas, el teclado (← →) y el gesto de
   deslizar recorren las piezas del mismo [data-lightbox-group]. */
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev  = document.getElementById('lightbox-prev');
  const btnNext  = document.getElementById('lightbox-next');
  const counter  = document.getElementById('lightbox-count');
  if (!lightbox || !img) return;

  let group = [], index = 0, lastFocus = null;

  const show = (i) => {
    index = (i + group.length) % group.length;
    const item = group[index];
    img.src = item.dataset.lightboxSrc;
    img.alt = item.dataset.lightboxAlt || '';
    const many = group.length > 1;
    if (btnPrev) btnPrev.hidden = !many;
    if (btnNext) btnNext.hidden = !many;
    if (counter) counter.textContent = many ? (index + 1) + ' / ' + group.length : '';
  };

  const open = (item) => {
    // El grupo es el [data-lightbox-group] más cercano que contiene la pieza
    const scope = item.closest('[data-lightbox-group]') || document;
    group = Array.from(scope.querySelectorAll('[data-lightbox-src]'));
    lastFocus = item;
    show(group.indexOf(item));
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    if (btnClose) btnClose.focus();
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => { img.src = ''; }, 260);
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
    item.addEventListener('click', () => open(item));
  });

  if (btnPrev) btnPrev.addEventListener('click', () => show(index - 1));
  if (btnNext) btnNext.addEventListener('click', () => show(index + 1));
  if (btnClose) btnClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  img.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && group.length > 1) show(index - 1);
    else if (e.key === 'ArrowRight' && group.length > 1) show(index + 1);
  });

  let touchX = null;
  lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchX === null || group.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
});


/* ── Bucle de fondo del hero ──
   Sin sonido; con "reducir movimiento" queda el póster. Se pausa
   cuando el hero sale de pantalla. */
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.pf-hero-video');
  if (!video) return;
  if (pfReduce) { video.removeAttribute('autoplay'); video.pause(); return; }
  const play = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) play(); else video.pause(); });
    }, { threshold: 0.15 }).observe(video);
  }
});


/* ── 04 · Variantes del refinamiento ──
   Un marco y cuatro pestañas. Mientras nadie toca, avanza solo cada
   3 s (solo a la vista); un clic detiene el avance automático. */
document.addEventListener('DOMContentLoaded', function() {
  const box = document.getElementById('pf-ronda');
  if (!box) return;
  const imgs = Array.from(box.querySelectorAll('.pf-ronda-stage img'));
  const tabs = Array.from(box.querySelectorAll('.pf-ronda-tabs button'));
  if (!imgs.length || imgs.length !== tabs.length) return;
  box.classList.add('is-ready');

  let cur = 0, timer = null, visible = false, touched = false;
  const set = (i) => {
    cur = i;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    tabs.forEach((t, k) => t.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
  };
  const tick = () => { if (visible && !touched) set((cur + 1) % imgs.length); };

  tabs.forEach((t, k) => t.addEventListener('click', () => { touched = true; set(k); }));
  // Las imágenes ocultas se piden ya, para que el cambio no parpadee
  imgs.forEach((im) => { im.loading = 'eager'; });

  if (pfReduce || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible && !timer) timer = setInterval(tick, 3000);
    if (!visible && timer) { clearInterval(timer); timer = null; }
  }, { threshold: 0.4 }).observe(box);
});


/* ── 05 · Anatomía del logotipo ──
   Al pasar el cursor, enfocar o tocar una parte de la lista, esa zona
   del logotipo se ilumina y el resto queda velado. */
document.addEventListener('DOMContentLoaded', function() {
  const box = document.getElementById('pf-anat');
  if (!box) return;
  const btns = Array.from(box.querySelectorAll('.pf-anat-list button'));
  let locked = '';
  const set = (part) => {
    box.dataset.part = part;
    btns.forEach((b) => b.classList.toggle('is-on', b.dataset.part === part));
  };
  btns.forEach((b) => {
    b.addEventListener('mouseenter', () => set(b.dataset.part));
    b.addEventListener('focus', () => set(b.dataset.part));
    b.addEventListener('mouseleave', () => set(locked));
    b.addEventListener('click', () => {
      locked = locked === b.dataset.part ? '' : b.dataset.part;
      set(locked);
    });
  });
});


/* ── 06 · Regla de 20 cm ──
   El control fija el ancho de impresión (3,2–30 cm). Mientras nadie lo
   toque, el scroll lo recorre: el logotipo crece al cruzar la sección.
   Por encima de 20 cm la versión de píxeles toma el relevo. */
document.addEventListener('DOMContentLoaded', function() {
  const ruler = document.getElementById('pf-ruler');
  const input = document.getElementById('pf-ruler-input');
  const out   = document.getElementById('pf-ruler-out');
  if (!ruler || !input || !out) return;
  const b = out.querySelector('b'), s = out.querySelector('span');
  const MIN = 3.2, MAX = 30;
  let touched = false;

  const render = (cm) => {
    const pix = Math.min(1, Math.max(0, (cm - 20) / 4));
    ruler.style.setProperty('--cm', cm.toFixed(2));
    ruler.style.setProperty('--pix', pix.toFixed(3));
    ruler.classList.toggle('is-over', cm > 20.05);
    b.textContent = cm.toFixed(1).replace('.', ',') + ' cm';
    s.textContent = cm < 3.2 + 0.05 ? 'Mínimo impreso'
      : cm <= 20.05 ? 'Impresión libre'
      : 'Pedir el archivo a la Conferencia Episcopal';
  };

  input.addEventListener('input', () => { touched = true; render(parseFloat(input.value)); });
  render(parseFloat(input.value));
  if (pfReduce) return;

  const stage = ruler.querySelector('.pf-ruler-stage');
  const frame = () => {
    if (touched) return;
    const r = stage.getBoundingClientRect(), vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    // de cuando el escenario asoma por abajo a cuando su tercio superior sale
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height * 0.3)));
    const cm = MIN + (MAX - MIN) * p;
    input.value = cm.toFixed(1);
    render(cm);
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { frame(); ticking = false; });
  }, { passive: true });
  frame();
});


/* ── 13 · Medalla ──
   Mientras está a la vista gira sola cada 3,5 s (anverso ↔ reverso);
   un clic también la gira. Con "reducir movimiento" solo gira al clic. */
document.addEventListener('DOMContentLoaded', function() {
  const coin = document.getElementById('pf-coin');
  if (!coin) return;
  let turn = 0, timer = null;
  const flip = () => { turn += 180; coin.style.setProperty('--turn', turn + 'deg'); };
  coin.addEventListener('click', () => {
    flip();
    if (timer) { clearInterval(timer); timer = setInterval(flip, 3500); }
  });
  if (pfReduce || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((entries) => {
    const on = entries[0].isIntersecting;
    if (on && !timer) timer = setInterval(flip, 3500);
    if (!on && timer) { clearInterval(timer); timer = null; }
  }, { threshold: 0.6 }).observe(coin);
});


/* ── Movimiento al hacer scroll ──
   · [data-par="n"]: parallax; se desplaza n px por cada px de distancia
     al centro de la pantalla.
   · Manual: la sección se ancla y el scroll vertical recorre el carril de
     35 páginas; las etiquetas de capítulo se encienden según avanza.
   En móvil (≤ 760 px) el manual se recorre deslizando, sin anclaje. */
document.addEventListener('DOMContentLoaded', function() {
  if (pfReduce) return;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const par   = Array.from(document.querySelectorAll('[data-par]'));
  const pin   = document.getElementById('pf-man-pin');
  const track = document.getElementById('pf-man-track');
  const bar   = document.getElementById('pf-man-bar');
  const chips = Array.from(document.querySelectorAll('#pf-chapters span'));
  const stage = pin && pin.querySelector('.pf-man-stage');
  let span = 0;

  const isDesktop = () => window.innerWidth > 760;

  const sizePin = () => {
    if (!pin || !track || !stage) return;
    if (!isDesktop()) { pin.style.height = ''; span = 0; return; }
    span = Math.max(0, track.scrollWidth - window.innerWidth);
    pin.style.height = (stage.offsetHeight + span) + 'px';
  };

  const frame = () => {
    const vh = window.innerHeight;

    par.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const d = (r.top + r.height / 2) - vh / 2;
      el.style.transform = 'translate3d(0,' + (d * parseFloat(el.dataset.par)).toFixed(1) + 'px,0)';
    });

    if (span > 0) {
      const r = pin.getBoundingClientRect();
      const p = clamp(-r.top / span, 0, 1);
      track.style.transform = 'translate3d(' + (-p * span).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
      const mid = window.innerWidth * 0.55;
      let ch = 0;
      for (const el of track.children) {
        if (el.getBoundingClientRect().left <= mid) ch = +el.dataset.ch; else break;
      }
      chips.forEach((c, i) => c.classList.toggle('is-on', i === ch));
    } else {
      chips.forEach((c, i) => c.classList.toggle('is-on', i === 0));
    }

  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { frame(); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { sizePin(); frame(); });
  window.addEventListener('load', () => { sizePin(); frame(); });
  sizePin();
  frame();
});
