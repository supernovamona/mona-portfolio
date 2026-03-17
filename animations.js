/* Mona Li Portfolio — Micro Animations */
(function () {
  'use strict';

  // ── Selectors to animate on scroll ─────────────────────────────
  const SINGLES = [
    '.section-label',
    '.work-section h2',
    '.exp-section h2',
    '.analyst-box',
    '.footer-heading-row',
    '.footer-cta-row',
    '.about-hero-photo',
    '.about-hero-text',
    '.about-row-text',
    '.about-row-image',
    '.bento-intro',
    '.bento-grid',
    // Case study hero
    '.case-meta-label',
    '.case-hero-title',
    '.case-hero-subtitle',
    '.case-hero-body',
    '.case-meta-row',
    // Case study sections
    '.section-eyebrow',
    '.section-heading',
    '.section-body',
    '.case-image-block',
    '.sub-heading',
    '.takeaway-box',
    '.next-project-link',
  ];

  // ── Stagger groups: [parent, child] ────────────────────────────
  const STAGGER = [
    ['.projects-grid',    '.project-card'],
    ['.exp-list',         '.exp-row'],
    ['.about-content',    '.about-row'],
    ['.result-callouts',  '.result-callout'],
  ];

  function init() {
    // Apply .fade-up to single elements (skip anything inside .hero)
    SINGLES.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest('.hero') && !el.closest('.about-hero')) {
          el.classList.add('fade-up');
        }
      });
    });

    // Apply .fade-up with stagger delays to group children
    STAGGER.forEach(([parentSel, childSel]) => {
      document.querySelectorAll(parentSel).forEach(parent => {
        parent.querySelectorAll(childSel).forEach((child, i) => {
          child.classList.add('fade-up');
          if (i > 0) child.dataset.delay = Math.min(i, 4);
          child.style.transitionDelay = i * 0.12 + 's';
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

    document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
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
