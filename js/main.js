/* ============================================
   LA SICULA BARBER — main.js
   Parallax · Reveals · Counters · Nav · Cursor
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== CUSTOM CURSOR ===== */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();


  /* ===== NAV ===== */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ===== MOBILE MENU ===== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ===== SCROLL REVEAL ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ===== HERO PARALLAX ===== */
  const heroBg = document.getElementById('hero-bg');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  }, { passive: true });


  /* ===== ABOUT IMAGE PARALLAX ===== */
  const aboutParallax = document.getElementById('about-parallax');

  if (aboutParallax) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', aboutScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', aboutScroll);
        }
      });
    }, { threshold: 0 });

    aboutObserver.observe(aboutParallax);

    function aboutScroll() {
      const rect = aboutParallax.parentElement.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      aboutParallax.style.transform = `translateY(${progress * -60}px)`;
    }
  }


  /* ===== NUMBER COUNTERS ===== */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const start = performance.now();

        function updateCounter(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(updateCounter);
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));


  /* ===== MARQUEE CLONE ===== */
  const marqueeInner = document.getElementById('marquee');
  if (marqueeInner) {
    const clone = marqueeInner.cloneNode(true);
    marqueeInner.parentElement.appendChild(clone);
  }


  /* ===== BOOKING FORM ===== */
  const form = document.getElementById('book-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit span');
      btn.textContent = 'Sending...';

      // Simulate async (replace with Supabase insert)
      await new Promise(resolve => setTimeout(resolve, 1200));

      form.classList.add('hide');
      successMsg.classList.add('show');
    });
  }


  /* ===== SERVICE CARD TILT ===== */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ===== SMOOTH ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
