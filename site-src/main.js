(function(){
const R=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let L='en';
const t=k=>{const v=COPY[k];if(!v){console.warn('missing',k);return k}return v[L==='en'?1:0]};
const gs=k=>{try{return localStorage.getItem(k)}catch(e){return null}},ss=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const NAV=$$('section.ch').map((s,i)=>({id:s.id,k:s.dataset.nav,n:String(i+1).padStart(2,'0')}));

function applyText(){$$('[data-k]').forEach(el=>{el.innerHTML=t(el.dataset.k)})}
function setLang(l){L=l;R.lang=l==='en'?'en':'zh-CN';R.classList.toggle('zh',l!=='en');$('#l-zh').setAttribute('aria-pressed',l!=='en');$('#l-en').setAttribute('aria-pressed',l==='en');ss('tlr-lang',l);applyText();renderAll()}
$('#l-zh').onclick=()=>setLang('zh');$('#l-en').onclick=()=>setLang('en');

/* rail, menu, chip */
function buildNav(){const ol=$('#rail');ol.querySelectorAll('li').forEach(l=>l.remove());const ml=$('#menu-list');ml.innerHTML='';
  NAV.forEach((n,i)=>{const li=document.createElement('li');li.innerHTML=`<button data-go="${n.id}">${t(n.k)}</button>`;ol.appendChild(li);
    const m=document.createElement('li');m.innerHTML=`<button data-go="${n.id}" style="transition-delay:${i*40}ms"><small>${n.n}</small>${t(n.k)}</button>`;ml.appendChild(m)});moveDot()}
let curIdx=-1;
function moveDot(){const lis=$$('#rail li');lis.forEach((l,i)=>l.classList.toggle('on',i===curIdx));const li=lis[Math.max(0,curIdx)];if(li)$('#rail-dot').style.transform=`translateY(${li.offsetTop+li.offsetHeight/2-4}px)`}
function setNow(i){if(i===curIdx)return;const now=$('#now');const dir=i>curIdx?1:-1;curIdx=i;moveDot();
  if(i<0){now.textContent='';return}const txt=NAV[i].n+' — '+t(NAV[i].k);
  if(RM){now.textContent=txt;return}now.style.transform=`translateY(${-100*dir}%)`;now.style.opacity=0;setTimeout(()=>{now.textContent=txt;now.style.transition='none';now.style.transform=`translateY(${100*dir}%)`;requestAnimationFrame(()=>{now.style.transition='';now.style.transform='none';now.style.opacity=1})},250)}
(function(){const nav=$('.rail'),ol=$('#rail');if(RM)return;
  function reset(){nav.classList.remove('hot');ol.querySelectorAll('li').forEach(li=>{li.style.transform='';li.style.opacity='';li.classList.remove('near')})}
  ol.addEventListener('mousemove',e=>{nav.classList.add('hot');ol.querySelectorAll('li').forEach(li=>{const r=li.getBoundingClientRect();const d=(e.clientY-(r.top+r.height/2))/r.height;const f=Math.max(0,1-Math.abs(d)/3);
    li.style.transform=`translateX(${(f*12).toFixed(1)}px) translateZ(${(f*70).toFixed(1)}px) rotateX(${Math.max(-50,Math.min(50,d*-11)).toFixed(1)}deg)`;li.style.opacity=(.35+f*.65).toFixed(2);li.classList.toggle('near',f>.66)})});
  ol.addEventListener('mouseleave',reset)})();
function closeMenu(){const wasOpen=$('#menu').classList.contains('open');$('#menu').classList.remove('open');if(wasOpen)$('#menu-open').focus()}
$('#menu-open').onclick=()=>{$('#menu').classList.add('open');$('#menu-close').focus()};
$('#menu-close').onclick=closeMenu;
addEventListener('keydown',e=>{if(!$('#menu').classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();closeMenu()}if(e.key==='Tab'){const buttons=[...$('#menu').querySelectorAll('button')];const first=buttons[0],last=buttons.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

/* chapter jump: plain smooth scroll */
function go(id){const el=document.getElementById(id);if(!el)return;$('#menu').classList.remove('open');
  const top=id==='hero'?0:el.getBoundingClientRect().top+scrollY-64;scrollTo({top,behavior:RM?'auto':'smooth'})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b){e.preventDefault();go(b.dataset.go)}});

/* scroll: progress, current chapter */
function onScroll(){const bn=$('.banner');if(bn){const away=bn.getBoundingClientRect().bottom>innerHeight*.35;$('.rail').classList.toggle('away',away);$('.chip-now').classList.toggle('away',away)}const h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.setProperty('--p',(scrollY/h).toFixed(4));
  const mid=innerHeight*.45;let idx=-1;$$('section.ch').forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=mid&&r.bottom>mid)idx=i});setNow(idx)}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});addEventListener('resize',()=>{moveDot();onScroll()});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
$$('.head,.rv,.body').forEach(el=>io.observe(el));
if(RM)$$('.head,.rv,.body').forEach(el=>el.classList.add('revealed'));
requestAnimationFrame(()=>$('.banner').classList.add('in'));
if(!RM){const bi=$('#bn-img');addEventListener('scroll',()=>{const y=scrollY;if(y<900)bi.style.translate=`0 ${(y*.1).toFixed(1)}px`},{passive:true})}

/* counters */
$$('[data-c]').forEach(b=>{if(RM)return;const o=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;o.disconnect();const n=+b.dataset.c,t0=performance.now();(function f(tm){const p=Math.min(1,(tm-t0)/1100);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)},{threshold:.5});o.observe(b)});

/* equaliser beside the record */
(function(){const eq=$('#eq');let h='';for(let i=0;i<36;i++){const d=(.55+Math.random()*.9).toFixed(2),dl=(-Math.random()*1.4).toFixed(2),b=(.22+Math.random()*.5).toFixed(2);h+=`<span style="--d:${d}s;--dl:${dl}s;--b:${b}"></span>`}eq.innerHTML=h})();

/* screens: journey tabs + horizontal strip */
const SCR=[['01-welcome',0],['02-home',0],['03-your-library',0],['04-liked-songs',0],['05-family-playlist',1],['06-cantopop-favourites',1],['07-morning-walk',1],['08-invite-family',1],
 ['09-search',2],['10-voice-listening',2],['11-voice-try-again',2],['12-search-results',2],['13-now-playing',3],['14-playback-paused',3],['15-audio-output',3],['16-listening-preferences',3],
 ['17-musictag-overview',4],['18-musictag-get-ready',4],['19-musictag-connect',4],['20-musictag-button-guide',4],['21-musictag-connected',5],['22-musictag-paired-overview',5],['23-musictag-try-again',5],['24-search-offline',5]];
let jIdx=0;
function buildStrip(){const st=$('#strip');const keep=st.scrollLeft;let h='';let last=-1;
  SCR.forEach(([f,j],i)=>{if(j!==last){last=j;h+=`<div class="jdiv" data-j="${j}"><b>0${j+1}</b><span>${t('j'+(j+1))}</span></div>`}
    h+=`<figure class="si"><div class="phone" data-zoom="img/shot/${f}.jpg"><div class="scr"><img src="img/shot/${f}.jpg" alt="${t('s'+String(i+1).padStart(2,'0'))}" loading="lazy" draggable="false"></div></div><figcaption><small>${String(i+1).padStart(2,'0')}</small> ${t('s'+String(i+1).padStart(2,'0'))}</figcaption></figure>`});
  st.innerHTML=h;st.scrollLeft=keep;
  $('#jtabs').innerHTML=[0,1,2,3,4,5].map(j=>`<button type="button" role="tab" data-j="${j}" aria-selected="${j===jIdx}"><b>0${j+1}</b>${t('j'+(j+1))}</button>`).join('');
  $$('#jtabs button').forEach(b=>b.onclick=()=>{const d=st.querySelector(`.jdiv[data-j="${b.dataset.j}"]`);st.scrollTo({left:d.offsetLeft-st.offsetLeft-(innerWidth>1100?190:16),behavior:RM?'auto':'smooth'})});
  stripSync()}
function stripSync(){const st=$('#strip');const divs=$$('#strip .jdiv');let j=0;const x=st.scrollLeft+st.clientWidth*.28;divs.forEach(d=>{if(d.offsetLeft-st.offsetLeft<=x)j=+d.dataset.j});jIdx=j;
  $$('#jtabs button').forEach(b=>b.setAttribute('aria-selected',+b.dataset.j===j));
  const m=st.scrollWidth-st.clientWidth;$('#sprog').style.transform=`scaleX(${m>0?(st.scrollLeft/m).toFixed(3):0})`}
(function(){const st=$('#strip');st.addEventListener('scroll',()=>requestAnimationFrame(stripSync),{passive:true});
  let down=false,sx=0,sl=0,moved=false;
  st.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=st.scrollLeft;st.classList.add('drag')});
  addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;st.scrollLeft=sl-dx});
  addEventListener('pointerup',()=>{if(down){down=false;st.classList.remove('drag')}});
  st.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
  st.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();st.scrollBy({left:240,behavior:'smooth'})}if(e.key==='ArrowLeft'){e.preventDefault();st.scrollBy({left:-240,behavior:'smooth'})}})})();

/* voice search: sticky phone follows the step in view */
(function(){const steps=$$('.vs-step'),imgs=$$('.vs-phone .scr img'),stick=$('#vs-stick');if(!steps.length)return;
  function set(i){steps.forEach((s,k)=>s.classList.toggle('on',k===i));imgs.forEach((m,k)=>m.classList.toggle('on',k===i));stick.classList.toggle('listen',i===1)}
  const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(steps.indexOf(e.target))}),{rootMargin:'-42% 0px -42% 0px'});
  steps.forEach(s=>o.observe(s));set(0)})();

/* Keyboard accessible, local image inspection. */
let zoomTrigger=null;
function closeZoom(){const box=$('.lb');if(box){box.remove();zoomTrigger?.focus({preventScroll:true})}}
function prepareZoom(){$$('[data-zoom]').forEach(f=>{f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label',t('ui.enlarge')+': '+(f.querySelector('img')?.alt||f.parentElement.querySelector('figcaption')?.textContent||''))})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.lb')){e.preventDefault();closeZoom()}else if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-zoom]')){e.preventDefault();e.target.click()}else if(e.key==='Tab'&&$('.lb')){e.preventDefault();$('.lb button').focus()}});
document.addEventListener('click',e=>{const f=e.target.closest('[data-zoom]');if(!f)return;zoomTrigger=f;const d=document.createElement('div');d.className='lb';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label',t('ui.enlarge'));d.innerHTML=`<img alt=""><button>${t('ui.close')}</button>`;d.querySelector('img').src=f.dataset.zoom;d.querySelector('img').alt=f.querySelector('img')?.alt||'';d.onclick=ev=>{if(ev.target.tagName!=='IMG')closeZoom()};document.body.appendChild(d);d.querySelector('button').focus()});

/* copy email */
$('#copy').onclick=async function(){try{await navigator.clipboard.writeText($('#mail').textContent);this.textContent=t('ft.copied')}catch(e){const r=document.createRange();r.selectNodeContents($('#mail'));const s=getSelection();s.removeAllRanges();s.addRange(r)}};

function renderAll(){buildNav();buildStrip();prepareZoom();if(curIdx>=0){const i=curIdx;curIdx=-2;setNow(i)}}
setLang(gs('tlr-lang')==='zh'?'zh':'en');onScroll();
// Resize only the trusted local frames, and stop hidden demos from playing.
const frames=$$('.live-frame');
addEventListener('message',e=>{if(e.origin!==location.origin||e.data?.type!=='musictag:height')return;const f=frames.find(f=>f.contentWindow===e.source);if(f&&Number.isFinite(e.data.height))f.style.height=Math.min(2500,Math.max(300,e.data.height))+'px'});
const demoObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)target.contentWindow?.postMessage({type:'musictag:pause'},location.origin)}),{threshold:0});frames.forEach(f=>demoObserver.observe(f));
const film=$('#walkthrough');
$$('[data-film]').forEach(b=>b.onclick=()=>{film.pause();film.src='assets/recordings/'+b.dataset.film+'.mp4';$('#film-captions').src='assets/recordings/'+b.dataset.film+'.vtt';film.poster='assets/recordings/'+(b.dataset.film==='musictag-early-full'?'hardware':'app')+'-poster.jpg';$$('[data-film]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));film.load()});
$('#recordings').addEventListener('toggle',()=>{if(!$('#recordings').open)film.pause()});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)film.pause()}).observe(film);
$('.screen-details').addEventListener('toggle',stripSync);
window.CU={COPY,lang:()=>L,rerender:()=>setLang(L)};
})();
