// Mutter Natur Film — site scripts (mobile nav, scroll reveal, header shadow)

// Single place to change the destination address for both contact forms.
const EMAIL_TO = 'xaverszimmer@web.de';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Cinematic scroll-in: tag every heading and image site-wide so they
  // slide/fade in on scroll instead of appearing instantly.
  document.querySelectorAll('main h1, main h2, main h3').forEach((el) => {
    el.setAttribute('data-reveal', '');
    el.classList.add('reveal-heading');
  });
  document.querySelectorAll('main img').forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });

  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Contact form: no backend included yet, so fall back to a mailto draft.
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const message = data.get('message') || '';
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent('Project inquiry via website')}&body=${body}`;
    });
  }

  const inquiryForm = document.querySelector('[data-inquiry-form]');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(inquiryForm);
      const lines = [];
      data.forEach((value, key) => lines.push(`${key}: ${value}`));
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent('Documentary production inquiry')}&body=${body}`;
    });
  }

  // Hero scroll-zoom: the headline scales up (and racks out of focus) as the
  // hero scrolls past, while the small text sinks and fades the opposite way
  // and the background image drifts at a different rate — three layers of
  // counter-motion for a cinematic, depth-of-field feel.
  // Its inline transform/opacity must not start driving the element until
  // the entrance reveal (fade + slide-in) has finished, otherwise it snaps
  // the headline to its resting state instantly instead of easing in.
  const heroZoomEl = document.querySelector('.hero-zoom');
  if (heroZoomEl && !prefersReducedMotion) {
    const heroSection = heroZoomEl.closest('.hero');
    const heroCounterEls = heroSection.querySelectorAll('.hero-counter');
    const heroParallaxEl = heroSection.querySelector('.hero-parallax');
    // Scroll-driven scale and cursor-driven tilt both write to the same
    // element's transform, so they're tracked as state and combined into
    // one string instead of overwriting each other.
    let zoomScale = 1;
    let tiltX = 0;
    let tiltY = 0;
    const applyHeroTransform = () => {
      heroZoomEl.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${zoomScale.toFixed(3)})`;
    };
    const onScrollZoom = () => {
      const rect = heroSection.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.9), 0), 1);
      zoomScale = 1 + progress * 1.4;
      applyHeroTransform();
      heroZoomEl.style.opacity = String(1 - progress * 0.6);
      heroZoomEl.style.filter = `blur(${(progress * 3).toFixed(2)}px)`;
      heroCounterEls.forEach((el) => {
        el.style.transform = `translateY(${(progress * 55).toFixed(1)}px)`;
        el.style.opacity = String(1 - progress * 1.1);
      });
      if (heroParallaxEl) {
        heroParallaxEl.style.transform = `translate3d(0, ${(progress * -32).toFixed(1)}px, 0)`;
      }
    };
    const startScrollZoom = () => {
      onScrollZoom();
      window.addEventListener('scroll', onScrollZoom, { passive: true });
      // Cursor tilt on the headline itself — the same 3D effect used on
      // the image thumbnails, applied to the "Revolutionizing..." text.
      heroSection.addEventListener('mousemove', (e) => {
        const r = heroSection.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tiltX = -py * 8;
        tiltY = px * 8;
        applyHeroTransform();
      });
      heroSection.addEventListener('mouseleave', () => {
        tiltX = 0;
        tiltY = 0;
        applyHeroTransform();
      });
    };
    if (heroZoomEl.classList.contains('is-visible')) {
      startScrollZoom();
    } else {
      heroZoomEl.addEventListener('transitionend', startScrollZoom, { once: true });
    }
  }

  // Cursor-reactive tilt on video thumbnails (Films / Documentaries).
  if (!prefersReducedMotion) {
    document.querySelectorAll('.tilt').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // Team page: the big outlined index numbers drift against the scroll
  // direction, so they float at a different depth than the text.
  const teamIndexEls = document.querySelectorAll('.team-index');
  if (teamIndexEls.length && !prefersReducedMotion) {
    const onScrollTeam = () => {
      const vh = window.innerHeight;
      teamIndexEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(offset * 90).toFixed(1)}px, 0)`;
      });
    };
    onScrollTeam();
    window.addEventListener('scroll', onScrollTeam, { passive: true });
  }

  // Standalone video pop-up modal (e.g. home: "Die Wächter der Berge").
  const videoModal = document.querySelector('#video-modal');
  if (videoModal) {
    const iframe = videoModal.querySelector('#video-modal-iframe');
    const openModal = (youtubeId) => {
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
      videoModal.hidden = false;
      document.body.classList.add('modal-open');
    };
    const closeModal = () => {
      videoModal.hidden = true;
      iframe.src = '';
      document.body.classList.remove('modal-open');
    };
    document.querySelectorAll('[data-video-trigger]').forEach((el) => {
      el.addEventListener('click', () => openModal(el.getAttribute('data-youtube-id')));
    });
    videoModal.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !videoModal.hidden) closeModal();
    });
  }

  // Kinetic typography: split manifest text into words for a staggered reveal.
  document.querySelectorAll('.kinetic-text').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'kw';
      span.textContent = w + ' ';
      span.style.transitionDelay = `${i * 35}ms`;
      el.appendChild(span);
    });
  });
  const kineticEls = document.querySelectorAll('.kinetic-text');
  if ('IntersectionObserver' in window && kineticEls.length) {
    const kio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.kw').forEach((w) => w.classList.add('is-visible'));
            kio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    kineticEls.forEach((el) => kio.observe(el));
  } else {
    kineticEls.forEach((el) => el.querySelectorAll('.kw').forEach((w) => w.classList.add('is-visible')));
  }
});
