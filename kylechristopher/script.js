const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 18), { passive: true });

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (!reduced && innerWidth > 820) {
  const parallaxElements = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;

  const draw = () => {
    parallaxElements.forEach(el => {
      const rate = parseFloat(el.dataset.parallax || '0');
      el.style.transform = `translate3d(0,${(scrollY * rate).toFixed(1)}px,0)`;
    });
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(draw);
      ticking = true;
    }
  }, { passive: true });

  draw();
}
