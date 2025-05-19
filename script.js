window.addEventListener('DOMContentLoaded', () => {
  /* Material-Farbschema */
  mdui.setColorScheme('#6750A4');

  /* Texte für Fächer */
  const texts={
    de:'Rechtschreibung, Grammatik, Aufsatztraining und Leseförderung.',
    ku:'Farbenlehre, Zeichentechniken und Bildbetrachtung.',
    mu:'Notenlesen, Rhythmusübungen und Instrumentenkunde.',
    ma:'Grundrechenarten, Textaufgaben und erste Geometrie.'
  };

  const desc=document.getElementById('subject-desc');
  desc.textContent=texts.de;

  document.querySelectorAll('.chips mdui-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('.chips mdui-chip').forEach(c=>c.removeAttribute('selected'));
      chip.setAttribute('selected','');
      desc.classList.remove('show');
      setTimeout(()=>{desc.textContent=texts[chip.dataset.subject];desc.classList.add('show');},150);
    });
  });

  /* Fade-In-Animation */
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.fade-section').forEach(sec=>obs.observe(sec));

  /* ---------- animiertes Heart-Favicon ---------- */
  document.fonts.ready.then(() => {
    const fav=document.getElementById('favicon');
    const canvas=document.createElement('canvas');
    const size=64;
    canvas.width=canvas.height=size;
    const ctx=canvas.getContext('2d');
    let hue=0;

    const draw=()=>{
      ctx.clearRect(0,0,size,size);
      ctx.fillStyle=`hsl(${hue},70%,50%)`;
      ctx.font='48px "Material Icons"';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillText('\uE87D',size/2,size/2+2); // ♥ (favorite)
      fav.href=canvas.toDataURL('image/png');
      hue=(hue+4)%360;
    };
    draw();
    setInterval(draw,180);
  });
});
