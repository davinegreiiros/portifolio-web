/* ============================================================
   Davi Negreiros — Portfólio · motion graphics
   kinetic type, scroll-driven bands, cursor, magnetic, tilt
   ============================================================ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;

  /* ---------- split text into masked words ---------- */
  // Percorre só os nós de texto, então <span class="acc">, <br> etc. continuam intactos.
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const wi = document.createElement('span');
            wi.className = 'wi';
            wi.style.setProperty('--i', i++);
            wi.textContent = part;
            w.appendChild(wi);
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    el.innerHTML = el.innerHTML.trim();
    walk(el);
  }

  function splitAll() {
    document.querySelectorAll('[data-split]').forEach(splitWords);
  }

  /* ---------- in-view observer (split, stagger, pipeline...) ---------- */
  const inView = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); inView.unobserve(e.target); }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });

  function observeMotion() {
    document.querySelectorAll('[data-split], .stagger, .pipeline, .case, .tier, .chips.pop')
      .forEach((el) => { el.classList.add('m-ready'); inView.observe(el); });
  }

  /* ---------- hero title: line mask reveal on load ---------- */
  requestAnimationFrame(() => document.querySelector('.hero-title')?.classList.add('in'));

  splitAll();
  observeMotion();
  document.addEventListener('langchange', () => {
    // innerHTML foi trocado pelo i18n: refaz o split e mantém o estado "in"
    splitAll();
  });

  if (reduce) {
    document.querySelectorAll('.m-ready').forEach((el) => el.classList.add('in'));
    return;
  }

  /* ---------- scroll state: progress, velocity, parallax ---------- */
  const bar = document.querySelector('.scroll-progress span');
  const rows = [...document.querySelectorAll('.kinetic-row')].map((row) => ({
    el: row,
    track: row.querySelector('.kinetic-track'),
    speed: parseFloat(row.dataset.speed) || 1,
    x: 0,
  }));
  // repete o conteúdo até cobrir a tela e duplica: as duas metades iguais fazem o loop infinito
  rows.forEach((r) => {
    const orig = r.track.innerHTML;
    let base = orig;
    r.track.innerHTML = base;
    while (r.track.scrollWidth < window.innerWidth + 200 && base.length < orig.length * 8) {
      base += orig;
      r.track.innerHTML = base;
    }
    r.track.innerHTML = base + base;
  });

  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  const timeline = document.querySelector('.timeline');

  let lastY = window.scrollY;
  let velocity = 0;

  function frame() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    const delta = y - lastY;
    lastY = y;
    velocity += (delta - velocity) * 0.12;

    // faixas cinéticas: andam sozinhas e aceleram/inclinam com a rolagem
    const boost = 1 + Math.min(Math.abs(velocity) * 0.25, 8);
    const dir = velocity < -0.5 ? -1 : 1;
    rows.forEach((r) => {
      const half = r.track.scrollWidth / 2;
      r.x -= 0.6 * r.speed * boost * dir;
      if (half) {
        if (r.x <= -half) r.x += half;
        if (r.x > 0) r.x -= half;
      }
      const skew = Math.max(-10, Math.min(10, velocity * -0.35));
      r.track.style.transform = `translate3d(${r.x}px,0,0) skewX(${skew}deg)`;
    });

    parallaxEls.forEach((el) => {
      const k = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${y * k}px, 0)`;
    });

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      timeline.style.setProperty('--tl', Math.max(0, Math.min(1, p)).toFixed(3));
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- pointer-driven effects (desktop only) ---------- */
  if (!finePointer) return;

  // hero glows seguem o mouse
  const mouseEls = [...document.querySelectorAll('[data-mouse]')];
  window.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    mouseEls.forEach((el) => {
      const k = parseFloat(el.dataset.mouse) || 0;
      el.style.transform = `translate3d(${nx * k * 2}px, ${ny * k * 2}px, 0)`;
    });
  }, { passive: true });

  // cursor customizado: ponto + anel com inércia
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const label = ring?.querySelector('.cursor-label');
  if (dot && ring) {
    root.classList.add('has-cursor');
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('a, button, [data-cursor], .tilt');
      ring.classList.toggle('hover', !!t);
      const txt = t?.dataset.cursor || '';
      ring.classList.toggle('labeled', !!txt);
      if (label) label.textContent = txt;
    });
    document.addEventListener('pointerleave', () => { ring.style.opacity = 0; dot.style.opacity = 0; });
    document.addEventListener('pointerenter', () => { ring.style.opacity = ''; dot.style.opacity = ''; });
  }

  // botões magnéticos
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  // tilt 3D nos cards
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--rx', (py * -7).toFixed(2) + 'deg');
      card.style.setProperty('--ry', (px * 9).toFixed(2) + 'deg');
      card.classList.add('tilting');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.classList.remove('tilting');
    });
  });
})();
