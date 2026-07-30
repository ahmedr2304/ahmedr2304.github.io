(() => {
  'use strict';

  const doc = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animeReady = typeof window.anime === 'function';

  function setTheme(theme, animateToggle = false) {
    doc.dataset.theme = theme;
    localStorage.setItem('ahmed-portfolio-theme', theme);
    themeColor?.setAttribute('content', theme === 'dark' ? '#061326' : '#f6f9fc');
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

    if (animateToggle && animeReady && !reduceMotion && themeToggle) {
      anime.remove(themeToggle);
      anime({
        targets: themeToggle,
        rotate: [0, 180],
        scale: [1, .9, 1],
        duration: 520,
        easing: 'easeOutCubic'
      });
    }
  }

  setTheme(doc.dataset.theme || 'dark');
  themeToggle?.addEventListener('click', () => {
    setTheme(doc.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  function openNavigation() {
    if (!nav || !menuToggle) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    if (animeReady && !reduceMotion) {
      anime.remove(nav);
      anime({ targets: nav, opacity: [0, 1], translateY: [-8, 0], duration: 260, easing: 'easeOutCubic' });
    }
  }

  function closeNavigation() {
    if (!nav || !menuToggle) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    if (animeReady && !reduceMotion && nav.classList.contains('open')) {
      anime.remove(nav);
      anime({
        targets: nav,
        opacity: [1, 0],
        translateY: [0, -8],
        duration: 190,
        easing: 'easeInCubic',
        complete: () => {
          nav.classList.remove('open');
          nav.style.opacity = '';
          nav.style.transform = '';
        }
      });
    } else {
      nav.classList.remove('open');
    }
  }

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    open ? closeNavigation() : openNavigation();
  });
  navLinks.forEach(link => link.addEventListener('click', closeNavigation));

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-38% 0px -54% 0px', threshold: .01 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  function toggleCollection(button, selector, openText, closedText) {
    const items = [...document.querySelectorAll(selector)];
    const expanded = button.getAttribute('aria-expanded') === 'true';

    if (expanded) {
      if (animeReady && !reduceMotion) {
        anime({
          targets: items,
          opacity: [1, 0],
          translateY: [0, 10],
          delay: anime.stagger(35),
          duration: 220,
          easing: 'easeInCubic',
          complete: () => items.forEach(item => { item.hidden = true; item.style.opacity = ''; item.style.transform = ''; })
        });
      } else {
        items.forEach(item => { item.hidden = true; });
      }
    } else {
      items.forEach(item => { item.hidden = false; });
      if (animeReady && !reduceMotion) {
        anime({
          targets: items,
          opacity: [0, 1],
          translateY: [18, 0],
          delay: anime.stagger(70),
          duration: 480,
          easing: 'easeOutCubic'
        });
      }
    }

    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? closedText : openText;
  }

  document.querySelector('[data-project-toggle]')?.addEventListener('click', event => {
    toggleCollection(event.currentTarget, '.extra-project', 'Show Featured Projects Only', 'View All Projects');
  });
  document.querySelector('[data-cert-toggle]')?.addEventListener('click', event => {
    toggleCollection(event.currentTarget, '.extra-certificate', 'Show Main Certifications Only', 'View More Certifications');
  });

  const animatedCounters = new WeakSet();
  function animateCounter(el) {
    if (animatedCounters.has(el)) return;
    animatedCounters.add(el);
    const value = Number(el.dataset.value || el.textContent);

    if (reduceMotion || !animeReady) {
      el.textContent = String(value);
      return;
    }

    const state = { value: 0 };
    anime({
      targets: state,
      value,
      round: 1,
      duration: 1250,
      easing: 'easeOutExpo',
      update: () => { el.textContent = String(state.value); }
    });
  }

  function animateMetricVisuals(card) {
    const icon = card.querySelector('.impact-icon');
    const fills = [...card.querySelectorAll('.metric-fill')];

    fills.forEach(fill => {
      const progress = Math.max(0, Math.min(100, Number(fill.dataset.progress || 0)));
      fill.style.setProperty('--metric-progress', `${progress}%`);
      if (reduceMotion || !animeReady) {
        fill.style.width = `${progress}%`;
      } else {
        anime({
          targets: fill,
          width: ['0%', `${progress}%`],
          duration: 1150,
          delay: 180,
          easing: 'easeOutExpo'
        });
      }
    });

    if (icon && animeReady && !reduceMotion) {
      anime({
        targets: icon,
        opacity: [0, 1],
        scale: [.72, 1],
        rotate: [-7, 0],
        duration: 620,
        easing: 'easeOutBack'
      });
    }
  }

  const seen = new WeakSet();
  function revealElement(el) {
    if (seen.has(el)) return;
    seen.add(el);

    if (reduceMotion || !animeReady) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    } else {
      const config = { targets: el, opacity: [0, 1], duration: 650, easing: 'easeOutCubic' };
      if (el.classList.contains('reveal-scale')) config.scale = [.96, 1];
      else if (el.classList.contains('reveal-left')) config.translateX = [-22, 0];
      else config.translateY = [18, 0];
      config.complete = () => { el.style.transform = ''; };
      anime(config);
    }

    el.querySelectorAll?.('.counter').forEach(animateCounter);
    if (el.classList.contains('impact-item')) animateMetricVisuals(el);
  }

  const revealTargets = [...document.querySelectorAll('.reveal-up,.reveal-left,.reveal-scale,.reveal-card')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(revealElement);
  }

  function runHeroIntro() {
    if (reduceMotion || !animeReady) return;

    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.site-header .brand,.primary-nav .nav-link,.nav-actions > *',
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: anime.stagger(45),
        duration: 420
      })
      .add({
        targets: '.hero-copy .eyebrow,.hero-copy h1,.hero-subtitle,.hero-summary',
        opacity: [0, 1],
        translateY: [22, 0],
        delay: anime.stagger(85),
        duration: 650
      }, '-=180')
      .add({
        targets: '.hero-actions > *,.hero-tags span',
        opacity: [0, 1],
        translateY: [12, 0],
        delay: anime.stagger(55),
        duration: 420
      }, '-=260')
      .add({
        targets: '.hero-portrait',
        opacity: [0, 1],
        scale: [.965, 1],
        translateX: [18, 0],
        duration: 760
      }, '-=620')
      .add({
        targets: '.portrait-glow',
        opacity: [0, 1],
        scale: [.82, 1],
        duration: 900
      }, '-=700');

    anime({
      targets: '.hero-lines',
      opacity: [.08, .22],
      duration: 1400,
      easing: 'easeOutQuad'
    });
  }

  runHeroIntro();
})();
