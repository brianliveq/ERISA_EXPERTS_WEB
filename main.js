/* ─────────────────────────────────────────────────────────────
   ERISA Experts — Interactions
   taste-skill: MOTION_INTENSITY:6 — Fluid CSS + stagger reveals
   ───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Sticky Nav scroll state ─────────────────────────────────
  const header = document.getElementById('site-header');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Mobile menu toggle ──────────────────────────────────────
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu   = document.getElementById('mobile-menu');
  let menuOpen = false;

  function setMenuOpen(open) {
    menuOpen = open;
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.classList.toggle('open', open);

    // Animate hamburger → close
    const spans = mobileToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  mobileToggle.addEventListener('click', () => setMenuOpen(!menuOpen));

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // ── Scroll-reveal with IntersectionObserver ─────────────────
  const revealElements = document.querySelectorAll(
    '.section-heading, .section-sub, .section-tag, .problem-stat, ' +
    '.contrast-list, .pillar, .diff-row:not(.diff-row--head), ' +
    '.clients-reason, .testimonial-card, .clients-position-stmt, ' +
    '.cta-heading, .cta-sub, .btn-primary, .cta-note, .solution-header'
  );

  // Assign reveal class
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within same parent
    const siblings = el.parentElement.querySelectorAll('.reveal');
    const idx = Array.from(siblings).indexOf(el);
    if (idx === 1) el.classList.add('reveal-delay-1');
    if (idx === 2) el.classList.add('reveal-delay-2');
    if (idx === 3) el.classList.add('reveal-delay-3');
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Smooth active nav link highlight on scroll ──────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav-link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // ── CTA button micro-interaction pulse ──────────────────────
  const ctaBtn = document.getElementById('cta-main-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      // Ripple feedback (transform-based for GPU acceleration)
      this.style.transform = 'scale(0.97)';
      setTimeout(() => {
        this.style.transform = '';
      }, 180);
    });
  }

  // ── Parallax gentle on hero badge ──────────────────────────
  const heroBadge = document.querySelector('.hero-badge');
  const heroStat1 = document.querySelector('.hero-stat--1');
  const heroStat2 = document.querySelector('.hero-stat--2');

  if (heroBadge || heroStat1) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const speed   = 0.08;
      if (heroBadge) {
        heroBadge.style.transform = `translateY(${scrollY * speed * 0.5}px)`;
      }
      if (heroStat1) {
        heroStat1.style.transform = `translateY(${scrollY * speed}px)`;
      }
      if (heroStat2) {
        heroStat2.style.transform = `translateY(${scrollY * speed * 0.6}px)`;
      }
    }, { passive: true });
  }

  // ── Marquee pause on hover ──────────────────────────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const strip = marqueeTrack.closest('.marquee-strip');
    strip.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    strip.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ── Pillar hover line animation enhancement ─────────────────
  document.querySelectorAll('.pillar').forEach(pillar => {
    pillar.addEventListener('mouseenter', () => {
      const line = pillar.querySelector('.pillar-line');
      if (line) line.style.transition = 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s';
    });
  });

  // ── Diff table row hover accessibility ─────────────────────
  document.querySelectorAll('.diff-row:not(.diff-row--head)').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = 'rgba(255,255,255,0.015)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = '';
    });
  });

  // ── Scroll-linked scroll-cue fade out ──────────────────────
  const scrollCue = document.querySelector('.hero-scroll-cue');
  if (scrollCue) {
    window.addEventListener('scroll', () => {
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      scrollCue.style.opacity = String(opacity);
    }, { passive: true });
  }

})();
