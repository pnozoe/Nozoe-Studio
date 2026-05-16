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

    let isDragging = false, startX, startScrollLeft;
    trackWrap.addEventListener('mousedown', e => {
      isDragging = true;
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
      const walk = (x - startX) * 1.4;
      trackWrap.scrollLeft = startScrollLeft - walk;
    });
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

  /* ── Drawers de paquetes de servicios ── */
  (function() {
    const SLUG_TO_ID = { identidad: 'drawer-identidad', web: 'drawer-web', publicitario: 'drawer-publicitario', retainer: 'drawer-retainer' };
    const ID_TO_SLUG = Object.fromEntries(Object.entries(SLUG_TO_ID).map(([k,v]) => [v,k]));
    const drawers = document.querySelectorAll('.drawer');

    function openDrawer(id, updateUrl) {
      const d = document.getElementById(id);
      if (!d) return;
      drawers.forEach(x => x.classList.remove('active'));
      d.classList.add('active');
      document.body.classList.add('drawer-open');
      if (updateUrl && ID_TO_SLUG[id]) {
        history.replaceState(null, '', '?paquete=' + ID_TO_SLUG[id]);
      }
    }
    function closeDrawer() {
      drawers.forEach(d => d.classList.remove('active'));
      document.body.classList.remove('drawer-open');
      history.replaceState(null, '', window.location.pathname);
    }

    document.querySelectorAll('[data-drawer-target]').forEach(t => {
      t.addEventListener('click', e => {
        e.preventDefault();
        const slug = t.dataset.drawerTarget;
        if (SLUG_TO_ID[slug]) openDrawer(SLUG_TO_ID[slug], true);
      });
    });
    document.querySelectorAll('[data-drawer-close]').forEach(b => {
      b.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });

    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('paquete');
    const fromHash = window.location.hash.replace('#', '');
    const slug = (fromQuery && SLUG_TO_ID[fromQuery]) ? fromQuery : (SLUG_TO_ID[fromHash] ? fromHash : null);
    if (slug) setTimeout(() => openDrawer(SLUG_TO_ID[slug], false), 250);
  })();

});
