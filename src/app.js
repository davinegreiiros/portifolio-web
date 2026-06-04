/* ============================================================
   Davi Negreiros — Portfólio · interações
   ============================================================ */
(function () {
  'use strict';

  /* ---------- i18n (PT / EN) ---------- */
  const LANG_KEY = 'dn-lang';
  let lang = localStorage.getItem(LANG_KEY) || 'pt';

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-pt]').forEach((el) => {
      const val = el.dataset[l];
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.classList.toggle('on', b.dataset.lang === l);
    });
    localStorage.setItem(LANG_KEY, l);
    startTyped();     // restart role typer in new language
    startTerminal();  // re-render terminal
  }

  document.querySelectorAll('.lang-toggle button').forEach((b) => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });

  /* ---------- nav scroll state + scrollspy ---------- */
  const nav = document.querySelector('.nav');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
    let current = sections[0];
    const mid = window.scrollY + window.innerHeight * 0.32;
    sections.forEach((s) => { if (s.offsetTop <= mid) current = s; });
    navLinks.forEach((a) =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + (current && current.id))
    );
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  // marca os elementos ANTES de observar para pausar a animação CSS
  revealEls.forEach((el) => el.classList.add('js-ready'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- count-up stats ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / 36;
      const tick = () => {
        cur += step;
        if (cur >= target) { el.firstChild ? (el.childNodes[0].nodeValue = target + '') : (el.textContent = target); el.innerHTML = target + suffix; return; }
        el.innerHTML = Math.floor(cur) + suffix;
        requestAnimationFrame(tick);
      };
      tick();
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countObs.observe(el));

  /* ---------- typed role rotator ---------- */
  const ROLES = {
    pt: ['Desenvolvedor Mobile Flutter', 'Especialista em QA & Automação', 'Clean Architecture + BLoC', 'Mobile · iOS · Android · Web'],
    en: ['Flutter Mobile Developer', 'QA & Test Automation Specialist', 'Clean Architecture + BLoC', 'Mobile · iOS · Android · Web'],
  };
  let typedTimer = null;
  function startTyped() {
    const el = document.querySelector('.hero-role .typed');
    if (!el) return;
    if (typedTimer) clearTimeout(typedTimer);
    const list = ROLES[lang];
    let i = 0, j = 0, deleting = false;
    function loop() {
      const word = list[i];
      el.textContent = word.slice(0, j);
      if (!deleting && j < word.length) { j++; typedTimer = setTimeout(loop, 55); }
      else if (!deleting && j === word.length) { deleting = true; typedTimer = setTimeout(loop, 1700); }
      else if (deleting && j > 0) { j--; typedTimer = setTimeout(loop, 26); }
      else { deleting = false; i = (i + 1) % list.length; typedTimer = setTimeout(loop, 360); }
    }
    loop();
  }

  /* ---------- hero terminal typewriter ---------- */
  const TERMINAL = {
    pt: [
      { t: 'cmd', txt: '<span class="prompt">davi@portfolio</span> <span class="prompt">~</span> $ ', type: 'whoami --stack' },
      { t: 'out', txt: '<span class="out">role</span>     <span class="key">"Desenvolvedor Mobile Flutter"</span>' },
      { t: 'out', txt: '<span class="out">edge</span>     <span class="str">"Dev + QA · qualidade desde a base"</span>' },
      { t: 'out', txt: '<span class="out">stack</span>    [ <span class="key">Flutter</span>, <span class="key">Dart</span>, <span class="key">BLoC</span>, <span class="key">GraphQL</span> ]' },
      { t: 'out', txt: '<span class="out">since</span>    <span class="str">2021</span>  ·  <span class="out">base</span> <span class="str">Fortaleza/CE</span>' },
      { t: 'cmd', txt: '<span class="prompt">davi@portfolio</span> <span class="prompt">~</span> $ ', type: 'ls ~/projetos' },
      { t: 'out', txt: '<span class="key">agenda-pet</span>  <span class="key">pomodoro-quest</span>  <span class="key">barber-saas</span>' },
    ],
    en: [
      { t: 'cmd', txt: '<span class="prompt">davi@portfolio</span> <span class="prompt">~</span> $ ', type: 'whoami --stack' },
      { t: 'out', txt: '<span class="out">role</span>     <span class="key">"Flutter Mobile Developer"</span>' },
      { t: 'out', txt: '<span class="out">edge</span>     <span class="str">"Dev + QA · quality from the ground up"</span>' },
      { t: 'out', txt: '<span class="out">stack</span>    [ <span class="key">Flutter</span>, <span class="key">Dart</span>, <span class="key">BLoC</span>, <span class="key">GraphQL</span> ]' },
      { t: 'out', txt: '<span class="out">since</span>    <span class="str">2021</span>  ·  <span class="out">base</span> <span class="str">Fortaleza/BR</span>' },
      { t: 'cmd', txt: '<span class="prompt">davi@portfolio</span> <span class="prompt">~</span> $ ', type: 'ls ~/projects' },
      { t: 'out', txt: '<span class="key">agenda-pet</span>  <span class="key">pomodoro-quest</span>  <span class="key">barber-saas</span>' },
    ],
  };
  let termTimer = null;
  function startTerminal() {
    const body = document.querySelector('.term-body');
    if (!body) return;
    if (termTimer) { clearTimeout(termTimer); termTimer = null; }
    body.innerHTML = '';
    const lines = TERMINAL[lang];
    let li = 0;

    function nextLine() {
      if (li >= lines.length) {
        const c = document.createElement('span');
        c.className = 'cursor';
        body.appendChild(c);
        return;
      }
      const data = lines[li];
      const lineEl = document.createElement('div');
      lineEl.className = 'term-line';
      body.appendChild(lineEl);
      if (data.t === 'cmd') {
        lineEl.innerHTML = data.txt + '<span class="cmd"></span>';
        const cmdSpan = lineEl.querySelector('.cmd');
        let k = 0;
        (function typeCmd() {
          cmdSpan.textContent = data.type.slice(0, k);
          if (k < data.type.length) { k++; termTimer = setTimeout(typeCmd, 46); }
          else { li++; termTimer = setTimeout(nextLine, 340); }
        })();
      } else {
        lineEl.innerHTML = data.txt;
        lineEl.style.opacity = 0;
        lineEl.style.transition = 'opacity .25s';
        requestAnimationFrame(() => (lineEl.style.opacity = 1));
        li++;
        termTimer = setTimeout(nextLine, 260);
      }
    }
    nextLine();
  }

  /* ---------- project card pointer glow ---------- */
  document.querySelectorAll('.proj').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  /* ---------- init ---------- */
  applyLang(lang);
})();
