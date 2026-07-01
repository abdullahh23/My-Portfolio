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
      pct += Math.floor(Math.random() * 20) + 10;
      if (pct >= 100) {
        pct = 100;
        clearInterval(tick);
        loaderBar.style.width = '100%';
        setTimeout(() => {
          loader.classList.add('done');
          animateHeroIn();
        }, 200);
      } else {
        loaderBar.style.width = `${pct}%`;
      }
    }, 30);
  } else {
    animateHeroIn();
  }

  // ─────────────────────────────────────────────────────────
  // 2. HERO GSAP ANIMATIONS
  // ─────────────────────────────────────────────────────────
  function animateHeroIn() {
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo('#hBadge', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '+=0.1');
      
      tl.fromTo('.h-name-line', { 
        y: 60, 
        opacity: 0 
      }, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.15,
        duration: 1.1
      }, '-=0.6');

      tl.fromTo('#hIdentity', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7');
      tl.fromTo('#hPara', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.7');
      tl.fromTo('#hActions .magnetic', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, '-=0.8');
      tl.fromTo('#hStats', { opacity: 0 }, { opacity: 1, duration: 1.2 }, '-=0.8');

      tl.fromTo('#photoWrap', { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, '-=1.4');
      tl.fromTo('.ring', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.15, duration: 1.8, ease: 'elastic.out(1, 0.75)' }, '-=1.4');
      
      tl.fromTo('.gcard', { scale: 0.8, opacity: 0, y: 30 }, { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 1.2, 
        ease: 'back.out(1.5)',
        onComplete: () => {
          startFloatingLoops();
        }
      }, '-=1.0');

      animateHeroCounters();

    } else {
      document.querySelectorAll('.h-name-line, #hBadge, #hIdentity, #hPara, #hActions .magnetic, #hStats, #photoWrap, .ring, .gcard').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      animateHeroCounters();
    }
  }

  function startFloatingLoops() {
    if (typeof gsap !== 'undefined') {
      const floatConfigs = [
        { y: -10, r: 1.5, d: 3.5 },
        { y: 8, r: -1.2, d: 4.2 },
        { y: -8, r: 1.0, d: 3.8 },
        { y: 10, r: -1.5, d: 4.5 }
      ];
      
      document.querySelectorAll('.gcard').forEach((card, idx) => {
        const config = floatConfigs[idx] || { y: -8, r: 1, d: 4 };
        gsap.to(card, {
          y: `+=${config.y}`,
          rotation: `+=${config.r}`,
          duration: config.d,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.3
        });
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  // 3. MOUSE PARALLAX & GLOW INTERACTION
  // ─────────────────────────────────────────────────────────
  const heroVisual = document.getElementById('heroVisual');
  const photoWrap  = document.getElementById('photoWrap');
  const gcards     = document.querySelectorAll('.gcard');
  const rings      = document.querySelectorAll('.ring');
  const hOrbs      = document.querySelectorAll('.h-orb');

  if (heroVisual && window.matchMedia('(hover: hover)').matches) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const width  = window.innerWidth;
      const height = window.innerHeight;
      targetX = (e.clientX / width) - 0.5;
      targetY = (e.clientY / height) - 0.5;
    });

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (photoWrap) {
        const rotateY = currentX * 18;
        const rotateX = -currentY * 18;
        const moveX   = currentX * 12;
        const moveY   = currentY * 12;
        photoWrap.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate3d(${moveX}px, ${moveY}px, 20px)`;
      }

      rings.forEach((ring, idx) => {
        const factor = (idx + 1) * -8;
        ring.style.transform = `translate(calc(-50% + ${currentX * factor}px), calc(-50% + ${currentY * factor}px))`;
      });

      requestAnimationFrame(updateParallax);
    };
    requestAnimationFrame(updateParallax);
  }

  // ─────────────────────────────────────────────────────────
  // 4. SUBTLE CANVAS BACKGROUND PARTICLES
  // ─────────────────────────────────────────────────────────
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        d: Math.random() * 40 + 20,
        vy: Math.random() * -0.15 - 0.05,
        vx: Math.random() * 0.1 - 0.05,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#60a5fa';

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.vx = -p.vx;
        }
      });

      requestAnimationFrame(drawParticles);
    };
    drawParticles();
  }

  // ─────────────────────────────────────────────────────────
  // 5. MAGNETIC BUTTONS EFFECT
  // ─────────────────────────────────────────────────────────
  const magneticButtons = document.querySelectorAll('.magnetic');
  if (magneticButtons.length && window.matchMedia('(hover: hover)').matches) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        
        const inner = btn.querySelector('svg');
        if (inner) {
          inner.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        const inner = btn.querySelector('svg');
        if (inner) {
          inner.style.transform = '';
        }
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // 6. CUSTOM CURSOR (desktop only)
  // ─────────────────────────────────────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let fx = mx, fy = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; 
      my = e.clientY;
    });

    const updateCursorPosition = () => {
      cx += (mx - cx) * 0.30;
      cy += (my - cy) * 0.30;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

      fx += (mx - fx) * 0.08;
      fy += (my - fy) * 0.08;
      follower.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(updateCursorPosition);
    };
    requestAnimationFrame(updateCursorPosition);

    const clickables = document.querySelectorAll('a, button, [role="tab"], .gcard');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width  = '52px';
        follower.style.height = '52px';
        follower.style.borderColor = 'rgba(99,160,255,0.75)';
        follower.style.backgroundColor = 'rgba(99,160,255,0.04)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width  = '34px';
        follower.style.height = '34px';
        follower.style.borderColor = 'rgba(99,160,255,0.45)';
        follower.style.backgroundColor = 'transparent';
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // 7. NAVBAR SCROLL EFFECT
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
  // 8. MOBILE NAV
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
  // 9. SCROLL REVEAL (Intersection Observer)
  // ─────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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
  // 10. SKILL BAR ANIMATION
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
  // 11. STAT COUNTERS
  // ─────────────────────────────────────────────────────────
  function animateHeroCounters() {
    document.querySelectorAll('.h-stat-n[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.ceil(1500 / target);
      const timer = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }

  // ─────────────────────────────────────────────────────────
  // 12. GALLERY TAB SWITCHING
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
  // 13. CONTACT FORM
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
  // 14. ACTIVE NAV LINK ON SCROLL
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
