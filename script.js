/* ============================================================
   MU HAIR CREATIVE SALON — Script
   ============================================================ */

// header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

// ============================================================
// accordion — catalog & hair items
// ============================================================
document.querySelectorAll('.acc-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panelId = btn.dataset.target;
    const panel = document.getElementById(panelId);
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      // 閉じる
      btn.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
      // アニメーション後に hidden を付与
      panel.addEventListener('transitionend', () => {
        if (!panel.classList.contains('is-open')) {
          panel.hidden = true;
        }
      }, { once: true });
    } else {
      // 開く
      panel.hidden = false;
      // 次フレームでクラス付与（transition を効かせるため）
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.classList.add('is-open');
        });
      });
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});