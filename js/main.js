/* ============================================================
   ABDULLAH BIN YOUSAF — PORTFOLIO
   Interactive Logic & Premium Transitions
   Version 1.0
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. LOADER IMPLEMENTATION
  // ============================================================
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');

  if (loader && loaderBar) {
    let progress = 0;
    // Simulate initial loading sequence for aesthetic purposes
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loaderBar.style.width = '100%';
          setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger entry text animations
            revealHeroText();
          }, 400);
        }, 100);
      }
      loaderBar.style.width = `${progress}%`;
    }, 40);
  } else {
    revealHeroText();
  }

  function revealHeroText() {
    const lines = document.querySelectorAll('.reveal-text');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('revealed');
      }, index * 200 + 100);
    });

    // Animate skill track fills immediately or when in viewport
    setTimeout(() => {
      animateSkillTracks();
    }, 600);
  }

  // ============================================================
  // 2. CUSTOM CURSOR
  // ============================================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Use requestAnimationFrame for smooth lag/elastic cursor behavior
    const updateCursor = () => {
      // Elastic cursor outline
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Snappy cursor dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    // Hide custom cursor when mouse leaves document viewport
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  // ============================================================
  // 3. MOUSE SPOTLIGHT (HERO GRID GLOW EFFECT)
  // ============================================================
  const heroSection = document.getElementById('hero');
  const spotlight = document.getElementById('mouseSpotlight');

  if (heroSection && spotlight) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
      spotlight.style.opacity = '1';
    });

    heroSection.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  }

  // ============================================================
  // 4. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // ============================================================
  // 5. MOBILE NAVIGATION TOGGLE
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (navToggle && navMobile) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      navMobile.classList.toggle('open');
      navMobile.setAttribute('aria-hidden', isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden'; // Lock background scroll when open
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        navMobile.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // 6. GALLERY TABS SWITCHING
  // ============================================================
  const tabs = document.querySelectorAll('.gallery-tab');
  const panels = document.querySelectorAll('.gallery-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update tabs state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels visibility
      panels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ============================================================
  // 7. INTERSECTION OBSERVER FOR TRANSITIONS
  // ============================================================
  const revealElements = document.querySelectorAll('.fade-up, .timeline-item, .trait-card, .exp-card, .project-card, .diff-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Stagger index for children animation delays if present
        if (entry.target.classList.contains('stagger')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            child.style.setProperty('--i', i);
          });
        }
        
        // Counter animation trigger if target is in hero
        if (entry.target.classList.contains('hero-stats')) {
          animateStatCounters();
        }

        // Unobserve to trigger once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe skill section specifically for animating fills on scroll
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillTracks();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    skillObserver.observe(skillSection);
  }

  // ============================================================
  // 8. ANIMATE SKILL TRACK FILLS
  // ============================================================
  function animateSkillTracks() {
    const fills = document.querySelectorAll('.skill-fill, .learning-fill');
    fills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      fill.style.width = `${width}%`;
    });
  }

  // ============================================================
  // 9. ANIMATE STAT COUNTERS
  // ============================================================
  function animateStatCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      let count = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.max(Math.floor(duration / target), 30);
      
      const timer = setInterval(() => {
        count++;
        counter.textContent = count;
        if (count >= target) {
          counter.textContent = target; // Ensure exact final value
          clearInterval(timer);
        }
      }, stepTime);
    });
  }

  // Immediate triggers in case element is visible instantly on load
  setTimeout(() => {
    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) {
      animateStatCounters();
    }
  }, 1000);

});
