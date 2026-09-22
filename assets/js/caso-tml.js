/* ═══════════════════════════════════════════════════════
   caso-tml.js — Nozoe Studio Web 2026
   JS específico de caso-tml.html
   · Caja de luz de la galería, el manual y el brochure
   · Reproductor de reels verticales
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Lightbox ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg) return;

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    // limpiar src tras la transición para liberar memoria
    setTimeout(() => { lightboxImg.src = ''; }, 260);
  };

  document.querySelectorAll('[data-lightbox-src]').forEach(item => {
    // accesible por teclado: Tab para llegar, Enter o Espacio para abrir
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Ampliar: ' + (item.dataset.lightboxAlt || 'imagen'));
    item.addEventListener('click', () => {
      open(item.dataset.lightboxSrc, item.dataset.lightboxAlt);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(item.dataset.lightboxSrc, item.dataset.lightboxAlt);
      }
    });
  });

  // cerrar: clic fuera de la imagen, botón ×, tecla Esc
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  if (lightboxClose) lightboxClose.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });

  // evitar que el clic en la imagen cierre el modal
  lightboxImg.addEventListener('click', (e) => e.stopPropagation());

});


/* ── Reels verticales ──
   · Arrancan en silencio cuando al menos la mitad del reel está en pantalla
     y se pausan al salir (el video no se descarga hasta ese momento:
     preload="none").
   · Botón de sonido: activar el sonido de un reel silencia el otro.
   · Clic en el video: pausa / reanuda. Si el visitante pausa a mano,
     el scroll no vuelve a reproducirlo.
   · Con "reducir movimiento" activado no hay reproducción automática.
   · Sin JavaScript quedan los controles nativos del navegador. */
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
