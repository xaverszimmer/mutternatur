// Mutter Natur — site scripts (mobile nav, scroll reveal, header shadow, forms, video)

// Single place to change the destination address for both contact forms.
const EMAIL_TO = 'xaverszimmer@web.de';

// Web3Forms access key (free at https://web3forms.com – the key is sent to EMAIL_TO).
// TODO: replace the placeholder with the real access key. Until then the forms
// fall back to opening a pre-filled email.
const WEB3FORMS_ACCESS_KEY = 'TODO-WEB3FORMS-ACCESS-KEY';

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
    // Images that already move with their container (partner band, duo tiles) stay put.
    if (el.closest('[data-static-img]')) return;
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

  // Forms: real submission via Web3Forms (https://web3forms.com).
  // Each form carries data-form (subject) and data-thanks (thank-you page).
  // While the access key is still a placeholder, the form falls back to a
  // pre-filled email so no inquiry gets lost.
  const isDE = document.documentElement.lang === 'de';
  const MSG = isDE
    ? { sending: 'Wird gesendet …', error: 'Das hat leider nicht geklappt. Bitte schreiben Sie uns direkt an ', invalid: 'Bitte füllen Sie die markierten Pflichtfelder aus.' }
    : { sending: 'Sending …', error: 'Sorry, that did not work. Please email us directly at ', invalid: 'Please fill in the required fields.' };

  document.querySelectorAll('form[data-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const setStatus = (text, isError, withMail) => {
      status.textContent = text;
      status.classList.toggle('is-error', !!isError);
      if (withMail) {
        const a = document.createElement('a');
        a.href = `mailto:${EMAIL_TO}`;
        a.className = 'text-link';
        a.textContent = EMAIL_TO;
        status.append(a, '.');
      }
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(MSG.invalid, true);
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      // Honeypot: real people never see or fill this field.
      if (data.botcheck) return;
      delete data.botcheck;

      const subject = `${form.dataset.form}${data.leistung ? ' – ' + data.leistung : ''}${data.organisation ? ' – ' + data.organisation : ''}`;

      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith('TODO')) {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
        window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return;
      }

      button.disabled = true;
      setStatus(MSG.sending);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject,
            from_name: 'Website Mutter Natur',
            replyto: data.email,
            botcheck: false,
            ...data,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success) {
          window.location.href = form.dataset.thanks;
          return;
        }
        throw new Error(json.message || res.status);
      } catch (err) {
        button.disabled = false;
        setStatus(MSG.error, true, true);
      }
    });
  });

  // Pre-select the service when arriving from a service page (?leistung=imagefilm).
  const wanted = new URLSearchParams(window.location.search).get('leistung');
  if (wanted) {
    document.querySelectorAll('select[name="leistung"]').forEach((select) => {
      const option = [...select.options].find((o) => o.dataset.key === wanted);
      if (option) select.value = option.value;
    });
  }

  // Click-to-load YouTube (privacy-enhanced youtube-nocookie.com): nothing is
  // requested from YouTube until the visitor clicks the preview image.
  document.querySelectorAll('.yt-facade').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
      iframe.title = btn.dataset.title || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
    });
  });

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
        // Drop the slow entrance transition once scrolling so the counter-motion tracks directly.
        if (progress > 0) el.style.transition = 'none';
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

  // Instagram posts/reels: loaded in a modal only after a click (click-to-load).
  const mediaModal = document.querySelector('#media-modal');
  if (mediaModal) {
    const frame = mediaModal.querySelector('.video-modal-frame');
    let lastTrigger = null;
    const close = () => {
      mediaModal.hidden = true;
      frame.innerHTML = '';
      document.body.classList.remove('modal-open');
      if (lastTrigger) lastTrigger.focus();
    };
    document.querySelectorAll('[data-ig]').forEach((el) => {
      el.addEventListener('click', () => {
        lastTrigger = el;
        const iframe = document.createElement('iframe');
        iframe.src = el.dataset.ig;
        iframe.title = el.dataset.title || 'Instagram';
        iframe.setAttribute('scrolling', 'yes');
        frame.replaceChildren(iframe);
        mediaModal.hidden = false;
        document.body.classList.add('modal-open');
        mediaModal.querySelector('.video-modal-close').focus();
      });
    });
    mediaModal.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mediaModal.hidden) close(); });
  }

  // Home film strip: arrow buttons scroll the strip by one card.
  document.querySelectorAll('.film-strip-wrap').forEach((wrap) => {
    const strip = wrap.querySelector('.film-strip');
    wrap.querySelectorAll('[data-strip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = strip.querySelector('.video-card');
        const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(strip).columnGap || 0) : strip.clientWidth;
        strip.scrollBy({ left: Number(btn.dataset.strip) * step, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  });

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
