async function downloadResume(){
  const payload = await fetch('resume/resume.b64').then(r => { if(!r.ok) throw new Error('Resume unavailable'); return r.text(); });
  const binary = atob(payload.trim()); const bytes = new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
  const blob = new Blob([bytes], {type:'application/pdf'}); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='Kyle_Christopher_Resume.pdf'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500);
}
document.querySelectorAll('[data-resume]').forEach(btn=>btn.addEventListener('click', downloadResume));
const nav=document.getElementById('nav'); addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>18),{passive:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
if(!reduced && innerWidth>820){
  const pEls=[...document.querySelectorAll('[data-parallax]')]; let ticking=false;
  const draw=()=>{pEls.forEach(el=>{const rate=parseFloat(el.dataset.parallax||'0');el.style.transform=`translate3d(0,${(scrollY*rate).toFixed(1)}px,0)`}); ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(draw);ticking=true}},{passive:true}); draw();
}
