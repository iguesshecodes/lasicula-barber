/* =============================================
   LA SICULA BARBER — main.js (shared)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR ── */
  const cursor = document.querySelector('.cursor');
  const cursorF = document.querySelector('.cursor-f');
  if (cursor && cursorF) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
    (function af(){ fx += (mx-fx)*.1; fy += (my-fy)*.1; cursorF.style.left = fx+'px'; cursorF.style.top = fy+'px'; requestAnimationFrame(af); })();
  }

  /* ── NAV ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const isDark = nav.classList.contains('dark-nav');
    window.addEventListener('scroll', () => {
      if (!isDark) nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive:true });

    /* Active link */
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  /* ── MOBILE MENU ── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ── REVEAL ── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); } });
    }, { threshold:.1, rootMargin:'0px 0px -40px 0px' });
    revealEls.forEach(el => ro.observe(el));
  }

  /* ── HERO PARALLAX ── */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) heroBg.style.transform = `translateY(${window.scrollY * .4}px)`;
    }, { passive:true });
  }

  /* ── COUNTERS ── */
  document.querySelectorAll('.counter').forEach(el => {
    const co = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const target = +el.dataset.target, dur = 1800, start = performance.now();
      (function tick(now){ const p = Math.min((now-start)/dur,1), e = 1-Math.pow(1-p,4); el.textContent = Math.round(e*target); if(p<1) requestAnimationFrame(tick); })(start);
      co.unobserve(el);
    }, { threshold:.5 });
    co.observe(el);
  });

  /* ── MARQUEE CLONE ── */
  document.querySelectorAll('.marquee-inner').forEach(m => {
    m.parentElement.appendChild(m.cloneNode(true));
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior:'smooth' });
    });
  });

  /* ── SERVICE CARD TILT ── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });

  /* ── BOOKING FORM ── */
  const form = document.getElementById('book-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      await new Promise(r => setTimeout(r, 1200));
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }

});
