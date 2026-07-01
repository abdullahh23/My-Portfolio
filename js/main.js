/* ============================================================
   ABDULLAH BIN YOUSAF — PORTFOLIO
   JavaScript — Version 2.0
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────
  // 1. LOADER
  // ─────────────────────────────────────────────────────────
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');

  if (loader && loaderBar) {
    let pct = 0;
    const tick = setInterval(() => {
      pct += Math.floor(Math.random() * 18) + 8;
      if (pct >= 100) {
        pct = 100;
        clearInterval(tick);
        loaderBar.style.width = '100%';
        setTimeout(() => {
          loader.classList.add('done');
          animateHeroIn();
        }, 300);
      } else {
        loaderBar.style.width = `${pct}%`;
      }
    }, 45);
  } else {
    animateHeroIn();
  }

  function animateHeroIn() {
    // Stagger the hero name lines in
    const lines = document.querySelectorAll('.name-line');
    lines.forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(20px)';
      setTimeout(() => {
        line.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        line.style.opacity = '1';
        line.style.transform = 'none';
      }, i * 180 + 80);
    });

    // Animate hero sub elements
    const heroEls = document.querySelectorAll('.hero-status, .hero-sub, .hero-tags, .hero-buttons, .hero-metrics');
    heroEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, i * 100 + 400);
    });

    // Photo col
    const photoCol = document.querySelector('.hero-photo-col');
    if (photoCol) {
      photoCol.style.opacity = '0';
      photoCol.style.transform = 'translateX(20px)';
      setTimeout(() => {
        photoCol.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        photoCol.style.opacity = '1';
        photoCol.style.transform = 'none';
      }, 350);
    }

    // Start counter animation for hero metrics
    setTimeout(animateCounters, 900);
  }

  // ─────────────────────────────────────────────────────────
  // 2. CUSTOM CURSOR (desktop only)
  // ─────────────────────────────────────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let fx = mx, fy = my;

    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    follower.style.left = mx + 'px';
    follower.style.top  = my + 'px';

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    const rafFollower = () => {
      fx += (mx - fx) * 0.10;
      fy += (my - fy) * 0.10;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(rafFollower);
    };
    requestAnimationFrame(rafFollower);

    // Scale on clickable elements
    const clickables = document.querySelectorAll('a, button, [role="tab"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width  = '52px';
        follower.style.height = '52px';
        follower.style.borderColor = 'rgba(99,160,255,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width  = '34px';
        follower.style.height = '34px';
        follower.style.borderColor = 'rgba(99,160,255,0.45)';
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // 3. NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ─────────────────────────────────────────────────────────
  // 4. MOBILE NAV
  // ─────────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      mobileNav.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // 5. SCROLL REVEAL (Intersection Observer)
  // ─────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger delay for groups of cards
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll('.fade-up'))
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─────────────────────────────────────────────────────────
  // 6. SKILL BAR ANIMATION
  // ─────────────────────────────────────────────────────────
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.sk-fill').forEach(bar => {
            const w = bar.getAttribute('data-w');
            if (w) bar.style.width = w + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillObserver.observe(skillsSection);
  }

  // ─────────────────────────────────────────────────────────
  // 7. STAT COUNTERS
  // ─────────────────────────────────────────────────────────
  function animateCounters() {
    document.querySelectorAll('.metric-val[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.ceil(1800 / target);
      const timer = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }

  // ─────────────────────────────────────────────────────────
  // 8. GALLERY TAB SWITCHING
  // ─────────────────────────────────────────────────────────
  const gTabs   = document.querySelectorAll('.g-tab');
  const gPanels = document.querySelectorAll('.g-panel');

  gTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      gTabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });

      gPanels.forEach(panel => {
        const match = panel.id === `tab-${target}`;
        panel.classList.toggle('active', match);
      });
    });
  });

  // ─────────────────────────────────────────────────────────
  // 9. CONTACT FORM
  // ─────────────────────────────────────────────────────────
  const form     = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.querySelector('#contactName').value.trim();
      const email   = form.querySelector('#contactEmailInput').value.trim();
      const message = form.querySelector('#contactMessage').value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in all required fields.';
        formNote.className = 'form-note error';
        return;
      }

      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email)) {
        formNote.textContent = 'Please enter a valid email address.';
        formNote.className = 'form-note error';
        return;
      }

      // Since this is a static site, open mailto as fallback
      const subject  = form.querySelector('#contactSubject').value.trim() || 'Portfolio Contact';
      const body     = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailto   = `mailto:abdullahbinyousaf20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, '_blank');

      formNote.textContent = 'Opening your email client...';
      formNote.className = 'form-note';

      setTimeout(() => {
        form.reset();
        formNote.textContent = '';
      }, 3000);
    });
  }

  // ─────────────────────────────────────────────────────────
  // 10. ACTIVE NAV LINK ON SCROLL
  // ─────────────────────────────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('active', href === entry.target.id);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(sec => navObserver.observe(sec));

});
