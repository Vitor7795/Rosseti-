(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const menu=$('.menu-overlay'),toggle=$('.menu-toggle');let lastFocus;
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');document.body.style.overflow='';if(lastFocus)lastFocus.focus({preventScroll:true})}
toggle.addEventListener('click',()=>{if(!menu.hidden)return closeMenu();lastFocus=document.activeElement;menu.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Fechar menu');document.body.style.overflow='hidden';menu.querySelector('a').focus()});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu()});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach(el=>{if(!el.closest('.intro'))io.observe(el)});
})();
