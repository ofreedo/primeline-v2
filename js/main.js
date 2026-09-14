document.addEventListener('DOMContentLoaded', () => {
  const introLoader = document.querySelector('.intro-loader');
  if (introLoader) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      introLoader.remove();
      document.body.classList.remove('intro-active');
    } else {
      introLoader.addEventListener('animationend', (e) => {
        if (e.animationName === 'intro-fade-out') {
          introLoader.remove();
          document.body.classList.remove('intro-active');
        }
      });
    }
  }

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-item__answer').style.maxHeight = null;
          other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  document.querySelectorAll('.gallery-filters').forEach(filterBar => {
    const grid = document.querySelector(filterBar.dataset.target);
    if (!grid) return;
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      filterBar.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const category = btn.dataset.filter;
      grid.querySelectorAll('.gallery-item').forEach(item => {
        const show = category === 'all' || item.dataset.category === category;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.ba-slider').forEach(slider => {
    const afterWrap = slider.querySelector('.ba-slider__after-wrap');
    const handle = slider.querySelector('.ba-slider__handle');
    let dragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterWrap.style.width = pct + '%';
      handle.style.left = pct + '%';
    };

    handle.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', (e) => { if (dragging) setPosition(e.clientX); });
    handle.addEventListener('pointerup', () => { dragging = false; });
    handle.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const current = parseFloat(afterWrap.style.width) || 50;
      if (e.key === 'ArrowLeft') setPosition(rect.left + (rect.width * (current - 5) / 100));
      if (e.key === 'ArrowRight') setPosition(rect.left + (rect.width * (current + 5) / 100));
    });
  });

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const statusEl = contactForm.querySelector('.form-status');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      contactForm.classList.add('is-submitting');
      statusEl.className = 'form-status';
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.reset();
          statusEl.textContent = "Thanks — we've received your message and will be in touch shortly.";
          statusEl.classList.add('is-success');
        } else {
          statusEl.textContent = 'Something went wrong sending your message. Please call us at (858) 650-9640 instead.';
          statusEl.classList.add('is-error');
        }
      } catch (err) {
        statusEl.textContent = 'Something went wrong sending your message. Please call us at (858) 650-9640 instead.';
        statusEl.classList.add('is-error');
      } finally {
        contactForm.classList.remove('is-submitting');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
});
