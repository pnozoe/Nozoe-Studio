/* ═══════════════════════════════════════════════════════
   caso-tml.js — Nozoe Studio Web 2026
   JS específico de caso-tml.html (rediseño de octubre 2026)
   · Caja de luz con flechas: recorre las piezas del mismo grupo
   · Movimiento al hacer scroll: parallax, carril del manual,
     fila del itinerario y pliegos del brochure
   · Videos en bucle que solo se reproducen a la vista
   · Tarjeta personal que se inclina con el cursor
   · Reproductor de reels verticales y reel de fondo del hero
   Las cifras que cuentan hacia arriba las anima site.js ([data-count-to]).
   ═══════════════════════════════════════════════════════ */

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
    // limpiar src tras la transición para liberar memoria
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


/* ── Movimiento al hacer scroll ──
   · [data-par="n"]: parallax; se desplaza n px por cada px de distancia
     al centro de la pantalla.
   · Manual: la sección se ancla y el scroll vertical recorre el carril de
     31 páginas; las etiquetas de capítulo se encienden según avanza.
   · Itinerario: la fila de páginas se desliza en horizontal.
   · Brochure: cada pliego se abre como un libro al entrar en pantalla.
   En móvil (≤ 760 px) el manual y el itinerario se recorren deslizando, sin
   anclaje. Con "reducir movimiento" no se mueve nada y todo queda abierto. */
document.addEventListener('DOMContentLoaded', function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const par    = Array.from(document.querySelectorAll('[data-par]'));
  const leaves = Array.from(document.querySelectorAll('.tml-leaf'));
  const pin    = document.getElementById('tml-man-pin');
  const track  = document.getElementById('tml-man-track');
  const bar    = document.getElementById('tml-man-bar');
  const chips  = Array.from(document.querySelectorAll('#tml-chapters span'));
  const iti    = document.getElementById('tml-iti-track');
  const itiSec = iti && iti.closest('section');
  const stage  = pin && pin.querySelector('.tml-man-stage');
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

    leaves.forEach((leaf) => {
      const r = leaf.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.5), 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      leaf.style.transform = e > 0.995 ? 'none' : 'rotateY(' + (178 * (1 - e)).toFixed(1) + 'deg)';
    });

    if (iti && itiSec && isDesktop()) {
      const r = itiSec.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      const max = Math.max(0, iti.scrollWidth - window.innerWidth);
      iti.style.transform = 'translate3d(' + (-p * max).toFixed(1) + 'px,0,0)';
    }

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


/* ── Videos en bucle (firma animada, fondo de Proceso) ──
   Sin sonido; se reproducen solo mientras están a la vista. */
document.addEventListener('DOMContentLoaded', function() {
  const vids = Array.from(document.querySelectorAll('video[data-autoplay]'));
  if (!vids.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const v = entry.target;
      if (entry.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.25 });
  vids.forEach((v) => { v.muted = true; io.observe(v); });
});


/* ── Tarjeta personal: se inclina siguiendo el cursor ── */
document.addEventListener('DOMContentLoaded', function() {
  const stage = document.querySelector('.tml-card-stage');
  if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = Array.from(stage.querySelectorAll('.tml-bcard'));
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cards.forEach((c, i) => {
      c.style.transform = 'rotateY(' + (x * 18).toFixed(1) + 'deg) rotateX(' + (-y * 14).toFixed(1) + 'deg) translateZ(' + (i ? 10 : 30) + 'px)';
    });
  });
  stage.addEventListener('pointerleave', () => cards.forEach((c) => { c.style.transform = ''; }));
});


/* ── Reels verticales ──
   · Arrancan en silencio cuando al menos la mitad del reel está en pantalla
     y se pausan al salir (el video no se descarga hasta ese momento:
     preload="none").
   · Botón de sonido: activar el sonido de un reel silencia el otro.
   · Clic en el video: pausa / reanuda. Si el visitante pausa a mano,
     el scroll no vuelve a reproducirlo.
   · Con "reducir movimiento" activado no hay reproducción automática.
   · Sin JavaScript quedan los controles nativos del navegador.
   · data-skip="s": empieza en ese segundo (salta la portada en blanco). */
document.addEventListener('DOMContentLoaded', function() {
  const reels = Array.from(document.querySelectorAll('.reel'));
  if (!reels.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const play = (reel) => {
    const p = reel.video.play();
    if (p && p.catch) p.catch(() => reel.el.classList.add('is-paused'));
  };

  const items = reels.map((el) => {
    const video = el.querySelector('.reel-video');
    const sound = el.querySelector('.reel-sound');
    const btn   = el.querySelector('.reel-play');
    const bar   = el.querySelector('.reel-progress span');
    const reel  = { el, video, userPaused: false };

    video.removeAttribute('controls');
    video.muted = true;
    // data-skip: arranca pasada la portada en blanco del reel (solo la primera vez)
    if (video.dataset.skip) {
      video.addEventListener('loadedmetadata', () => {
        if (video.currentTime < 0.1) video.currentTime = parseFloat(video.dataset.skip);
      }, { once: true });
    }
    el.classList.add('is-ready', 'is-paused');

    video.addEventListener('play',  () => el.classList.remove('is-paused'));
    video.addEventListener('pause', () => el.classList.add('is-paused'));
    if (bar) {
      video.addEventListener('timeupdate', () => {
        if (video.duration) bar.style.transform = 'scaleX(' + (video.currentTime / video.duration) + ')';
      });
    }

    const toggle = () => {
      if (video.paused) { reel.userPaused = false; play(reel); }
      else { reel.userPaused = true; video.pause(); }
    };
    video.addEventListener('click', toggle);
    if (btn) btn.addEventListener('click', toggle);

    if (sound) {
      sound.addEventListener('click', () => {
        const turnOn = video.muted;
        items.forEach((other) => {
          other.video.muted = true;
          const s = other.el.querySelector('.reel-sound');
          if (s) { s.setAttribute('aria-pressed', 'false'); s.setAttribute('aria-label', 'Activar sonido'); }
        });
        video.muted = !turnOn;
        sound.setAttribute('aria-pressed', String(turnOn));
        sound.setAttribute('aria-label', turnOn ? 'Silenciar' : 'Activar sonido');
        if (turnOn && video.paused) { reel.userPaused = false; play(reel); }
      });
    }
    return reel;
  });

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const reel = items.find((r) => r.el === entry.target);
      if (!reel) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (!reel.userPaused && reel.video.paused) play(reel);
      } else if (!reel.video.paused) {
        reel.video.pause();
      }
    });
  }, { threshold: [0, 0.5] });

  items.forEach((r) => io.observe(r.el));
});


/* ── Reel de fondo del hero ──
   · Bucle sin sonido; el navegador lo arranca solo (autoplay + muted).
   · Con "reducir movimiento" activado se detiene y queda el póster.
   · Se pausa cuando el hero sale de pantalla, para no gastar batería
     ni CPU mientras se lee el resto del caso. */
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.tml-hero-video');
  if (!video) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
    return;
  }

  const play = () => {
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) play();
        else video.pause();
      });
    }, { threshold: 0.15 }).observe(video);
  }
});
