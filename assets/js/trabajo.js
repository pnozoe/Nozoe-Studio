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

});
