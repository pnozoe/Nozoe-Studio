/* ═══════════════════════════════════════════════════════
   trabajo.js — Nozoe Studio Web 2026
   JS específico de trabajo.html
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  const pills = document.querySelectorAll('.fpill');
  const cards = document.querySelectorAll('.proj-card');

  /* ── Filter pills ── */
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.opacity = '';
          card.style.pointerEvents = '';
          card.style.visibility = '';
        } else {
          card.style.opacity = '0.2';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });

  /* ── Modal de proyecto ── */
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
        const thumb = card.querySelector('.proj-thumb');
        const meta  = card.querySelector('.proj-meta');
        if (!thumb) return;
        const cloned = thumb.cloneNode(true);
        cloned.classList.remove('proj-thumb-4-3', 'proj-thumb-3-4', 'proj-thumb-1-1');
        cloned.style.aspectRatio = '4/3';
        if (modalSlot) {
          modalSlot.innerHTML = '';
          modalSlot.appendChild(cloned);
        }
        if (modalLabel) modalLabel.textContent = meta ? meta.querySelector('span:first-child').textContent : '';
        if (modalYear)  modalYear.textContent  = meta ? meta.querySelector('.proj-meta-year').textContent : '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ── Load more ── */
  const loadMoreBtn  = document.getElementById('load-more-btn');
  const group2020    = document.getElementById('group-2020');
  const loadMoreWrap = document.getElementById('load-more-wrap');

  if (loadMoreBtn && group2020 && loadMoreWrap) {
    loadMoreBtn.addEventListener('click', () => {
      group2020.style.display = '';
      loadMoreWrap.style.display = 'none';
      const active = document.querySelector('.fpill.active');
      if (active && active.dataset.filter !== 'all') {
        const filter = active.dataset.filter;
        group2020.querySelectorAll('.proj-card').forEach(card => {
          if (card.dataset.cat !== filter) {
            card.style.opacity = '0.2';
            card.style.pointerEvents = 'none';
          }
        });
      }
    });
  }

});
