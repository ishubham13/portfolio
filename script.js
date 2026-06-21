const loader=document.querySelector('#loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hidden'),650));

const navbar=document.querySelector('#navbar'),backToTop=document.querySelector('#back-to-top');
const onScroll=()=>{navbar.classList.toggle('scrolled',scrollY>40);backToTop.classList.toggle('show',scrollY>500)};
addEventListener('scroll',onScroll,{passive:true});onScroll();backToTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const toggle=document.querySelector('#nav-toggle'),navLinks=document.querySelector('#nav-links');
toggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',open)});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

const words=['Software Developer','Java Programmer','Frontend Developer','Problem Solver'];let wi=0,ci=0,deleting=false;
const typed=document.querySelector('#typed-text');
function type(){const w=words[wi];typed.textContent=deleting?w.slice(0,--ci):w.slice(0,++ci);let delay=deleting?45:85;if(!deleting&&ci===w.length){deleting=true;delay=1500}else if(deleting&&ci===0){deleting=false;wi=(wi+1)%words.length;delay=350}setTimeout(type,delay)}setTimeout(type,900);

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')],navAnchors=[...document.querySelectorAll('.nav-links a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}),{rootMargin:'-40% 0px -50%'});
sections.forEach(s=>sectionObserver.observe(s));

const stats=document.querySelectorAll('[data-count]');
const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count,start=performance.now(),duration=target>100?1200:900;function tick(now){const p=Math.min((now-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=Math.floor(target*ease);if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.6});stats.forEach(s=>countObserver.observe(s));

const canvas=document.querySelector('#particles-canvas'),ctx=canvas.getContext('2d');let particles=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);particles=Array.from({length:Math.min(75,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.3}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);particles.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(87,206,230,.5)';ctx.fill();for(let j=i+1;j<particles.length;j++){const q=particles[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<110){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(62,153,190,${.08*(1-d/110)})`;ctx.stroke()}}});requestAnimationFrame(draw)}
resize();addEventListener('resize',resize);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();

document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget),subject=encodeURIComponent(data.get('subject')||'Portfolio enquiry'),body=encodeURIComponent(`Hi Shubham,\n\n${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`);document.querySelector('#contact-status').textContent='Opening your email app…';location.href=`mailto:shubham.s.91732@gmail.com?subject=${subject}&body=${body}`});
