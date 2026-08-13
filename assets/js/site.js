/* ═══════════════════════════════════════════════════════
   site.js — Nozoe Studio Web 2026

   JavaScript común externalizado del sitio. Refactorizado
   en Fase 1 del cierre del proyecto.

   Reglas:
   - Vanilla JS, sin dependencias externas
   - IIFE o módulos ES6 según el caso
   - Sin frameworks, sin librerías
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* Menú hamburguesa */
  const navHam = document.getElementById('nav-ham');
  const navMenu = document.querySelector('.nav-links');
  if (navHam && navMenu) {
    navHam.addEventListener('click', () => navMenu.classList.toggle('open'));
  }
});

/* ── Scroll-reveal ── */
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
});

/* ── Dinamismo moderno (rama feature) ── */

/* Count-up: anima números con [data-count-to] al entrar en viewport */
(function(){
  var els = document.querySelectorAll('[data-count-to]');
  if (!els.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate(el){
    var to = parseFloat(el.dataset.countTo);
    var prefix = el.dataset.countPrefix || '';
    var suffix = el.dataset.countSuffix || '';
    if (reduce){ el.textContent = prefix + to + suffix; return; }
    var dur = 1200, start = null;
    function step(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  els.forEach(function(el){ io.observe(el); });
})();

/* Demo del editor conversacional (tarjeta "Web Profesional" del home) */
(function(){
  var chat = document.getElementById('wp-feature-chat');
  if (!chat) return;
  var msgs = [
    { who: 'user', html: 'Cambia mi horario a lun–sáb, 9am a 7pm' },
    { who: 'bot',  html: 'Listo. Actualizado en Contacto. <span class="wp-feature-ok">Publicado ✓</span>' },
    { who: 'user', html: 'Sube la consulta inicial a S/ 120' },
    { who: 'bot',  html: 'Hecho, visible en «Servicios». <span class="wp-feature-ok">Publicado ✓</span>' }
  ];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bubble(m){
    var d = document.createElement('div');
    d.className = 'wp-feature-msg wp-feature-msg--' + m.who;
    d.innerHTML = m.html;
    return d;
  }

  if (reduce) { msgs.forEach(function(m){ chat.appendChild(bubble(m)); }); return; }

  var typing = document.createElement('div');
  typing.className = 'wp-feature-typing';
  typing.innerHTML = '<i></i><i></i><i></i>';
  chat.appendChild(typing);

  var i = 0;
  function step(){
    if (i >= msgs.length){
      setTimeout(function(){
        chat.querySelectorAll('.wp-feature-msg').forEach(function(n){ n.remove(); });
        i = 0; setTimeout(step, 600);
      }, 4200);
      return;
    }
    var m = msgs[i++];
    if (m.who === 'bot'){
      typing.classList.add('on');
      setTimeout(function(){
        typing.classList.remove('on');
        chat.insertBefore(bubble(m), typing);
        setTimeout(step, 1500);
      }, 1100);
    } else {
      chat.insertBefore(bubble(m), typing);
      setTimeout(step, 1300);
    }
  }
  var seen = false;
  var chatIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting && !seen){ seen = true; setTimeout(step, 400); chatIo.disconnect(); }
    });
  }, { threshold: 0.35 });
  chatIo.observe(chat);
})();

/* Botones magnéticos: el CTA sigue sutilmente el cursor (solo desktop) */
(function(){
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var STRENGTH = 0.2;
  document.querySelectorAll('.btn-ember, .btn-ink').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * STRENGTH;
      var y = (e.clientY - r.top - r.height / 2) * STRENGTH;
      btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
  });
})();

/* Hero home: muro vivo — pared de proyectos en loop vertical */
(function(){
  var wall = document.getElementById('muroWall');
  if (!wall) return;
  var BASE = 'assets/casos/trabajo/';
  var P = [
    { n: 'Cassaforma', t: 'Identidad', f: 'identidad-brand-cassaforma.webp', x: '100% rediseño integral: identidad, impresos y web' },
    { n: 'Cassaforma', t: 'Identidad', f: 'identidad-logo-cassaforma.webp', x: '100% rediseño integral: identidad, impresos y web' },
    { n: 'TML Cipango', t: 'Identidad', f: 'identidad-logo-tml.webp', x: '14 meses de colaboración continua' },
    { n: 'Cassaforma', t: 'Identidad', f: 'identidad-tipografia-cassaforma.webp', x: '100% rediseño integral: identidad, impresos y web' },
    { n: 'Wilkamikuy', t: 'Identidad', f: 'identidad-logo-wilkamikuy.webp' },
    { n: 'Papa Francisco', t: 'Identidad', f: 'identidad-logo-francisco.webp' },
    { n: 'Papa Francisco', t: 'Identidad', f: 'identidad-brand-francisco.webp' },
    { n: 'Cassaforma', t: 'Identidad', f: 'flyer-cassaforma-1.webp', x: '100% rediseño integral: identidad, impresos y web' },
    { n: 'Cassaforma', t: 'Identidad', f: 'flyer-cassaforma-2.webp', x: '100% rediseño integral: identidad, impresos y web' },
    { n: 'Pfizer', t: 'Publicidad', f: 'ads-pfizer.webp' },
    { n: 'Sabor Latino', t: 'Publicidad', f: 'ads-sabor-latino-pollo.webp' },
    { n: 'DuBom', t: 'Publicidad', f: 'ads-aviso-dubom.webp' },
    { n: 'QuickPhone', t: 'Publicidad', f: 'ads-quickphone-lima.webp' },
    { n: 'QuickPhone', t: 'Publicidad', f: 'ads-quickphone.webp' },
    { n: 'QuickPhone', t: 'Publicidad', f: 'ads-metro-quickphone.webp' },
    { n: 'QuickPhone', t: 'Publicidad', f: 'ads-poster-quickphone.webp' },
    { n: 'Progress Gold', t: 'Publicidad', f: 'ads-promocion-progressgold.webp' },
    { n: 'Guaraná', t: 'Publicidad', f: 'ads-sale-guarana.webp' },
    { n: 'Western Union', t: 'Publicidad', f: 'ads-cartel-westernunion.webp' },
    { n: 'Papa Francisco', t: 'Publicidad', f: 'ads-banners-papa-francisco.webp' },
    { n: 'Progress Gold', t: 'Publicidad', f: 'editorial-afiche-progress-gold.webp' },
    { n: 'Vive Salsa', t: 'Publicidad', f: 'editorial-afiche-vivesalsa.webp' },
    { n: 'Papa Francisco', t: 'Publicidad', f: 'editorial-calendario-francisco-a.webp' },
    { n: 'Papa Francisco', t: 'Publicidad', f: 'editorial-calendario-francisco-b.webp' },
    { n: 'DuBom', t: 'Publicidad', f: 'editorial-brochure-dubom.webp' },
    { n: 'Progress Gold', t: 'Empaque', f: 'packaging-caja-progressgold.webp' },
    { n: 'Progress Gold', t: 'Empaque', f: 'packaging-bidonera-pg.webp' },
    { n: 'Cassaforma', t: 'Web', f: 'web-cassaforma-home.webp' }
  ];
  function folderFor(f){ return f.split('-')[0]; }
  var shapes = ['', 'tall', 'wide', ''];
  var cols = 6, html = '';
  for (var c = 0; c < cols; c++){
    var inner = '';
    for (var rep = 0; rep < 2; rep++){
      for (var i = 0; i < 5; i++){
        var p = P[(c * 5 + i) % P.length];
        var src = BASE + folderFor(p.f) + '/' + p.f;
        inner += '<div class="muro-tile ' + shapes[(i + c) % 4] + '">'
          + '<img src="' + src + '" alt="' + p.n + ' — ' + p.t + '" loading="lazy">'
          + '<span class="mt-name">' + p.n + '</span>'
          + '<span class="mt-reveal"><b>' + p.n + '</b><span>' + (p.x || p.t) + '</span></span></div>';
      }
    }
    html += '<div class="muro-col"><div class="muro-col-inner">' + inner + '</div></div>';
  }
  wall.innerHTML = html;
})();

/* Comparador antes/después — arrastrar divisor + chips de rubro */
(function(){
  var cmp = document.getElementById('cmp');
  if (!cmp) return;
  var after = document.getElementById('cmp-after'),
      handle = document.getElementById('cmp-handle'),
      knob = document.getElementById('cmp-knob');
  var touched = false;

  function set(p){
    p = Math.max(6, Math.min(94, p));
    after.style.clipPath = 'inset(0 0 0 ' + p + '%)';
    handle.style.left = p + '%';
  }
  function fromEvent(e){
    var r = cmp.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    set(x / r.width * 100);
  }
  var dragging = false;
  function start(e){ dragging = true; touched = true; knob.classList.remove('cmp-knob-nudge'); fromEvent(e); }
  function move(e){ if (dragging){ fromEvent(e); if (e.cancelable) e.preventDefault(); } }
  function end(){ dragging = false; }
  cmp.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  cmp.addEventListener('touchstart', start, { passive: true });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);
  cmp.addEventListener('mousemove', function(e){
    if (!dragging && window.innerWidth > 900){ fromEvent(e); touched = true; knob.classList.remove('cmp-knob-nudge'); }
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce){
    var t0 = null;
    function sweep(ts){
      if (touched) return;
      if (!t0) t0 = ts;
      var k = (ts - t0) / 1400;
      if (k >= 1){ set(34); return; }
      set(34 + 12 * Math.sin(k * Math.PI));
      requestAnimationFrame(sweep);
    }
    setTimeout(function(){ requestAnimationFrame(sweep); }, 700);
  }

  var CASES = [
    { theme: 'cmp-theme-resto',
      badLogo: 'EL SABOR NORTEÑO', badTit: '¡¡GRAN<br>PROMOCIÓN!!',
      badSub: 'LOS MEJORES PLATOS DE LA ZONA ★ ATENCIÓN DE LUNES A DOMINGO ★ DELIVERY ★ PEDIDOS AL WHATSAPP',
      badBadge: '50%<br>DCTO',
      badFoot: 'SÍGUENOS EN NUESTRAS REDES SOCIALES · TELF 999-999-999 · AV. SIEMPRE VIVA 123 · PROMOCIÓN VÁLIDA HASTA AGOTAR STOCK',
      logo: 'Norteño', cat: 'Cocina peruana · Lima', mark: 'Temporada 01',
      tit: 'Lo de siempre,<br>hecho <span class="hl-em">como siempre.</span>',
      sub: 'Carta de estación, cocina a la vista y una barra que abre a las seis.',
      cta: 'Reservar mesa' },
    { theme: 'cmp-theme-dental',
      badLogo: 'CLÍNICA DENTAL SONRISAS', badTit: '¡SONRISA<br>PERFECTA!',
      badSub: 'BLANQUEAMIENTO ★ ORTODONCIA ★ IMPLANTES ★ FINANCIAMIENTO SIN INTERESES ★ CONSULTA GRATIS',
      badBadge: '0%<br>INTERÉS',
      badFoot: 'ATENDEMOS TODAS LAS TARJETAS · PREVIA CITA · TELF 999-999-999 · SIGUENOS EN FACEBOOK E INSTAGRAM',
      logo: 'Aroma', cat: 'Odontología · San Isidro', mark: 'Consulta 01',
      tit: 'Un lugar donde<br>nadie <span class="hl-em">llega nervioso.</span>',
      sub: 'Diagnóstico explicado, plan por escrito y precios cerrados antes de empezar.',
      cta: 'Agendar consulta' },
    { theme: 'cmp-theme-legal',
      badLogo: 'ESTUDIO JURÍDICO & ASOCIADOS', badTit: '¡DEFENDEMOS<br>TUS DERECHOS!',
      badSub: 'CIVIL ★ PENAL ★ LABORAL ★ FAMILIA ★ MÁS DE 20 AÑOS DE EXPERIENCIA ★ PRIMERA CONSULTA GRATIS',
      badBadge: '1ERA<br>GRATIS',
      badFoot: 'ASESORÍA INMEDIATA · TELF 999-999-999 · AV. AREQUIPA 1234 OF. 502 · WHATSAPP 24/7',
      logo: 'Vera', cat: 'Derecho laboral · Lima', mark: 'Caso 01',
      tit: 'Le decimos<br>lo que <span class="hl-em">sí se puede.</span>',
      sub: 'Derecho laboral para empresas. Respuestas en lenguaje claro y plazos por escrito.',
      cta: 'Consultar caso' }
  ];
  var ids = {
    badLogo: 'cmp-bad-logo', badTit: 'cmp-bad-tit', badSub: 'cmp-bad-sub', badBadge: 'cmp-bad-badge', badFoot: 'cmp-bad-foot',
    logo: 'cmp-good-logo', cat: 'cmp-good-cat', mark: 'cmp-good-mark', tit: 'cmp-good-tit', sub: 'cmp-good-sub', cta: 'cmp-good-cta'
  };
  var THEMES = ['cmp-theme-resto', 'cmp-theme-dental', 'cmp-theme-legal'];
  var badEl = document.getElementById('cmp-bad'), goodEl = document.getElementById('cmp-good');
  var chips = document.getElementById('cmp-chips');
  if (chips){
    chips.addEventListener('click', function(e){
      var b = e.target.closest('.cmp-chip');
      if (!b) return;
      [].forEach.call(this.children, function(c){ c.classList.remove('on'); });
      b.classList.add('on');
      var d = CASES[+b.dataset.i];
      for (var k in ids){ var el = document.getElementById(ids[k]); if (el) el.innerHTML = d[k]; }
      if (badEl){ badEl.classList.remove.apply(badEl.classList, THEMES); badEl.classList.add(d.theme); }
      if (goodEl){ goodEl.classList.remove.apply(goodEl.classList, THEMES); goodEl.classList.add(d.theme); }
      set(34);
      cmp.classList.remove('cmp-fade'); void cmp.offsetWidth; cmp.classList.add('cmp-fade');
    });
  }
})();

/* ── Caja de luz de piezas ──
   Compartida por el home y trabajo.html: se engancha a cualquier .proj-card
   que tenga un .proj-thumb con imagen. Las tarjetas con data-caso navegan a
   su caso de estudio en vez de abrir el modal. */
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.proj-card');

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
