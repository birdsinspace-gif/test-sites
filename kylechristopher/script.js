const RESUME_PARTS = [
  'resume-v4/part00.txt',
  'resume-v4/part01.txt',
  'resume-v4/part02.txt',
  'resume-v4/part03.txt',
  'resume-v4/tail00.txt',
  'resume-v4/tail01.txt',
  'resume-v4/tail02.txt',
  'resume-v4/tail03.txt',
  'resume-v4/tail04.txt',
  'resume-v4/tail05.txt'
];

const aboutTitle = document.querySelector('.about-quote');
if (aboutTitle) {
  aboutTitle.textContent = 'A career translating complexity into actionable simplicity.';
}

const aboutParagraphs = document.querySelectorAll('.about-copy > p');
if (aboutParagraphs.length >= 3) {
  aboutParagraphs[0].textContent = 'My career has followed a clear through-line across digital content, regulated healthcare data, infrastructure customer success, university teaching, Microsoft partner programs, and enterprise healthcare technology.';
  aboutParagraphs[1].textContent = 'Across each chapter, the work has been consistent: understand complexity, make it usable, align the people who have to deliver, and keep important work moving.';
  aboutParagraphs[2].textContent = 'Today, I bring that discipline to technical customer success, account management, solutions consulting, partner success, implementation, and AI-enabled delivery.';
}

async function downloadResume() {
  try {
    const parts = await Promise.all(
      RESUME_PARTS.map(path =>
        fetch(path).then(r => {
          if (!r.ok) throw new Error('Resume unavailable');
          return r.text();
        })
      )
    );
    const binary = atob(parts.join('').trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kyle_Christopher_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (error) {
    console.error(error);
    alert('The résumé download is temporarily unavailable.');
  }
}

document.querySelectorAll('[data-resume]').forEach(btn => btn.addEventListener('click', downloadResume));
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 18), { passive: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('visible');
    observer.unobserve(e.target);
  }
}), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
if (!reduced && innerWidth > 820) {
  const pEls = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const draw = () => {
    pEls.forEach(el => {
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
