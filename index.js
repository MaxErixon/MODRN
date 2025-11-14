(function () {
  const NAV_LINKS = [
    { href: 'services.html', label: 'Tjänster' },
    { href: 'gallery.html', label: 'Galleri' },
    { href: 'about.html', label: 'Om oss' },
    { href: 'contact.html', label: 'Kontakt' },
  ];

  const BOOKING_URL = 'https://www.bokadirekt.se/places/modrn-barbershop-131308';

  const TESTIMONIALS = [
    {
      quote:
        'Fantastisk service och ett resultat som håller varje gång. Jag har hittat min barbershop för livet.',
      name: 'Erik Larsson',
      detail: 'Stammis sedan 2020',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
    },
    {
      quote:
        'Professionellt bemötande, noggrannhet i varje drag och en atmosfär där man verkligen kan koppla av.',
      name: 'Mohamed Ali',
      detail: 'Rekommenderar herrklippning + skägg',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        'Äntligen någon som förstår hur mitt skägg ska formas. Lawan levererar varje gång.',
      name: 'Kristoffer Holm',
      detail: 'Premium skäggbehandling',
      image: 'https://images.unsplash.com/photo-1527772837295-9150784b5ae5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote:
        'Ansiktsbehandlingen var magisk. Lyxig känsla från start till mål och fantastisk produktkunskap.',
      name: 'Sofia Berg',
      detail: 'Ansiktsbehandling & hårborttagning',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=300&q=80',
    },
  ];

  document.addEventListener('DOMContentLoaded', () => {
    buildLayout();
    setupHeaderInteractions();
    setupTestimonials();
    setupLightbox();
    setupContactForm();
    animateOnScroll();
  });

  function buildLayout() {
    const headerEl = document.querySelector('[data-component="site-header"]');
    const footerEl = document.querySelector('[data-component="site-footer"]');
    if (headerEl) {
      headerEl.innerHTML = createHeader();
    }
    if (footerEl) {
      footerEl.innerHTML = createFooter();
    }
    markActiveNavLink();
    wireMobileNav();
  }

  function createHeader() {
    return `
      <div class="header-glass">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="index.html" class="flex items-center gap-3" aria-label="Till startsidan">
            <img src="Images/Modrn_logo2.png" alt="MODRN Barbershop logotyp" class="site-logo" />
          </a>
          <nav class="hidden items-center gap-8 text-sm font-medium text-brand-silver/80 lg:flex" aria-label="Huvudnavigation">
            ${NAV_LINKS.map((link) => {
              return `<a href="${link.href}" class="nav-link" data-nav="${link.href}">${link.label}</a>`;
            }).join('')}
          </nav>
          <div class="hidden items-center gap-4 lg:flex">
            <a href="${BOOKING_URL}" class="btn-primary py-2" aria-label="Boka tid hos MODRN">Boka tid</a>
          </div>
          <button class="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-silver/30 text-brand-silver hover:border-brand-silver/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-silver" aria-label="Öppna mobilmeny" data-mobile-toggle>
            <span class="sr-only">Öppna meny</span>
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="mobile-nav__overlay" data-mobile-overlay></div>
      <aside class="mobile-nav" data-mobile-nav aria-label="Mobil navigering">
        <div class="flex items-center justify-between px-6 py-5">
          <img src="Images/Modrn_logo.jpeg" alt="MODRN logotyp" class="site-logo site-logo--compact" />
          <button class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-silver/30 text-brand-silver hover:border-brand-silver/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-silver" aria-label="Stäng mobilmeny" data-mobile-close>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="px-6 py-8" aria-label="Mobilnavigation">
          <ul class="space-y-6 text-lg font-medium text-brand-silver/80">
            ${NAV_LINKS.map((link) => `<li><a class="mobile-link" data-nav="${link.href}" href="${link.href}">${link.label}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="px-6 pb-10">
          <a href="${BOOKING_URL}" class="btn-primary w-full justify-center" aria-label="Boka tid via mobilmeny">Boka tid</a>
        </div>
      </aside>
    `;
  }

  function createFooter() {
    const currentYear = new Date().getFullYear();
    return `
      <footer class="border-t border-brand-slate/60 bg-brand-charcoal/70">
        <div class="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div class="space-y-5">
            <img src="Images/Modrn_logo2.png" alt="MODRN Barbershop logotyp" class="site-logo site-logo--small" />
            <p class="text-sm text-brand-silver/70 leading-relaxed">
              MODRN – Din barbershop i hjärtat av staden.<br />
              Avkoppling, precision och en look som lyfter dig varje dag.
            </p>
            <a href="${BOOKING_URL}" class="btn-primary inline-flex" aria-label="Boka tid via footern">Boka tid</a>
          </div>
          <div class="space-y-4">
            <h2 class="text-xs uppercase tracking-[0.3em] text-brand-muted">Besök oss</h2>
            <p class="text-sm text-brand-silver/70">
              Föreningsgatan 5<br />211 44 Malmö
            </p>
            <p class="text-sm text-brand-silver/70">
              Mån–Fre 10:00–19:00<br />Lör 11:00–18:00<br />Sön Stängt
            </p>
          </div>
          <div class="space-y-4">
            <h2 class="text-xs uppercase tracking-[0.3em] text-brand-muted">Kontakt</h2>
            <a class="block text-sm text-brand-silver/70 hover:text-white" href="tel:+4640123456">+46 (0)40 123 456</a>
            <a class="block text-sm text-brand-silver/70 hover:text-white" href="mailto:hello@modrnbarber.se">hello@modrnbarber.se</a>
            <a class="block text-sm text-brand-silver/70 hover:text-white" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div class="border-t border-brand-slate/70">
          <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-brand-silver/60 md:flex-row md:items-center md:justify-between">
            <p>© ${currentYear} MODRN Barbershop. Alla rättigheter förbehållna.</p>
            <p>Designad med precision i Malmö.</p>
          </div>
        </div>
      </footer>
    `;
  }

  function markActiveNavLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('[data-nav]');
    links.forEach((link) => {
      if (normalizePath(link.dataset.nav) === normalizePath(currentPath)) {
        link.classList.add('text-white');
        link.classList.add('after-active');
      }
    });
  }

  function normalizePath(pathname) {
    try {
      const url = new URL(pathname, window.location.href);
      return url.pathname.replace(/\/index\.html$/, '/');
    } catch (error) {
      return pathname;
    }
  }

  function wireMobileNav() {
    const nav = document.querySelector('[data-mobile-nav]');
    const overlay = document.querySelector('[data-mobile-overlay]');
    const openBtn = document.querySelector('[data-mobile-toggle]');
    const closeBtn = document.querySelector('[data-mobile-close]');
    const links = nav ? nav.querySelectorAll('a') : [];

    function open() {
      nav?.classList.add('is-open');
      overlay?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      nav?.classList.remove('is-open');
      overlay?.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
    links.forEach((link) => link.addEventListener('click', close));
  }

  function setupHeaderInteractions() {
    const header = document.querySelector('.header-glass');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupTestimonials() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;

    let currentIndex = 0;
    renderTestimonials();
    updateView();

    const prevBtn = document.querySelector('[data-action="prev"]');
    const nextBtn = document.querySelector('[data-action="next"]');

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      updateView();
    });

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
      updateView();
    });

    let autoAdvance = setInterval(() => {
      currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
      updateView();
    }, 3000);

    const cards = track.querySelectorAll('.testimonial-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    clearInterval(autoAdvance); // pausa när man hovrar kortet
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(autoAdvance); // safety, så vi inte får flera timers
    autoAdvance = setInterval(() => {
      currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
      updateView();
    }, 3000); // samma intervall som i början
  });
});


    function renderTestimonials() {
      track.innerHTML = TESTIMONIALS.map(
        (item, index) => `
          <article class="testimonial-card" data-index="${index}">
            <div class="testimonial-card__author">
              <img src="${item.image}" alt="Porträtt av ${item.name}" />
              <div>
                <strong>${item.name}</strong>
                <span>${item.detail}</span>
              </div>
            </div>
            <blockquote>“${item.quote}”</blockquote>
            <footer>
              <span>MODRN Kund</span>
              <span>★★★★☆</span>
            </footer>
          </article>
        `
      ).join('');
    }

    function updateView() {
      const cards = track.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const index = Number(card.dataset.index);
        const isActive = index === currentIndex;
        card.style.opacity = isActive ? '1' : '0.4';
        card.style.transform = index === currentIndex ? 'translateY(-8px)' : 'translateY(0)';
      });
    }
  }

  function setupLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const closeButton = lightbox.querySelector('.lightbox__close');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach((item) => {
      item.addEventListener('click', () => open(item.dataset.image, item.querySelector('img')?.alt));
      item.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(item.dataset.image, item.querySelector('img')?.alt);
        }
      });
    });

    closeButton?.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        close();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        close();
      }
    });

    function open(src, alt) {
      if (!lightboxImage || !src) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt || 'Visad bild från galleriet';
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.style.overflow = '';
    }
  }

  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!status) return;
      status.textContent = 'Skickar…';
      status.classList.remove('text-white', 'text-red-400');
      status.classList.add('text-brand-silver/60');

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        console.info('Kontaktformulär (stub för Next.js server action):', payload);
        status.textContent = 'Tack! Vi återkommer till dig inom kort.';
        status.classList.remove('text-brand-silver/60');
        status.classList.add('text-white');
        form.reset();
      } catch (error) {
        console.error('Kunde inte skicka formulär', error);
        status.textContent = 'Något gick fel. Försök igen eller kontakta oss via telefon.';
        status.classList.remove('text-brand-silver/60', 'text-white');
        status.classList.add('text-red-400');
      }
    });
  }

  function animateOnScroll() {
    if (!window?.Motion) return;
    const elements = document.querySelectorAll('[data-motion="fade"], .service-card, .team-card, .service-detail');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.Motion.animate(entry.target, { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] }, { duration: 0.7, easing: 'ease-out' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => {
      element.style.opacity = '0';
      observer.observe(element);
    });
  }
})();

