/* Mona Li Portfolio — Micro Animations */
(function () {
  'use strict';

  // ── Selectors: blur-up for titles, fade-up for everything else ──
  const BLUR_TITLES = [
    '.section-label',
    '.work-section h2',
    '.exp-section h2',
    // Footer
    '.footer-heading',
    // About page headings
    '.about-hero-text h1',
    '.about-row-text h2',
    // Case study hero
    '.case-hero-title',
    '.case-hero-subtitle',
    // Case study sections
    '.section-eyebrow',
    '.section-heading',
    '.sub-heading',
  ];

  const SINGLES = [
    '.analyst-box',
    '.footer-cta-row',
    '.about-hero-photo',
    '.about-hero-text p',
    '.about-row-text p',
    '.about-row-image',
    '.bento-intro',
    '.bento-grid',
    // Case study hero
    '.case-meta-label',
    '.case-hero-body',
    '.case-meta-row',
    // Case study sections
    '.section-body',
    '.case-image-block',
    '.takeaway-box',
    '.next-project-link',
  ];

  // ── Stagger groups: [parent, child, animClass, startDelay] ─────
  const STAGGER = [
    ['.projects-grid',   '.project-card', 'fade-up', 0],
    ['.exp-list',        '.exp-row',      'fade-up', 0],
    ['.about-content',   '.about-row',    'fade-up', 0],
    ['.result-callouts', '.result-callout','fade-up', 0],
    ['.footer-socials',  '.social-btn',   'blur-fade', 0.28], // blur-fade preserves rotation
  ];

  function init() {
    // Apply .blur-up to title elements
    BLUR_TITLES.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest('.hero') && !el.closest('.about-hero')) {
          el.classList.add('blur-up');
        }
      });
    });

    // Apply .fade-up to single elements (skip anything inside .hero)
    SINGLES.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest('.hero') && !el.closest('.about-hero')) {
          el.classList.add('fade-up');
        }
      });
    });

    // Apply stagger delays to group children
    STAGGER.forEach(([parentSel, childSel, cls, startDelay]) => {
      document.querySelectorAll(parentSel).forEach(parent => {
        parent.querySelectorAll(childSel).forEach((child, i) => {
          child.classList.add(cls);
          child.style.transitionDelay = (startDelay + i * 0.13) + 's';
        });
      });
    });

    // IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.fade-up, .blur-up, .blur-fade').forEach(el => io.observe(el));
  }

  // ── Header shadow on scroll (applied to all pages) ─────────────
  const hdr = document.getElementById('site-header');
  if (hdr) {
    const onScroll = () => {
      hdr.style.boxShadow = window.scrollY > 10
        ? '0 2px 24px rgba(0,0,0,0.07)'
        : '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
