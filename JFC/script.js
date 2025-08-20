/* NAV behavior: solid background on scroll, active link highlight, mobile toggle */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Active link on scroll */
const sections = document.querySelectorAll('section[id]');
const navMap = {};
document.querySelectorAll('.nav-link').forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (navMap[id]) navMap[id].classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(sec => observer.observe(sec));

/* CATEGORIES CAROUSEL */
const track = document.querySelector('.cat-track');
const cards = Array.from(document.querySelectorAll('.cat-card'));
const prevBtn = document.querySelector('.cat-nav.prev');
const nextBtn = document.querySelector('.cat-nav.next');
const dotsWrap = document.getElementById('cat-dots');

let perView = 1;
function getPerView(){
  if (window.innerWidth >= 1080) return 3;
  if (window.innerWidth >= 720) return 2;
  return 1;
}
function pagesCount(){ return Math.max(1, Math.ceil(cards.length / perView)); }

function buildDots(){
  dotsWrap.innerHTML = '';
  for (let i=0; i<pagesCount(); i++){
    const b = document.createElement('button');
    if (i===page) b.classList.add('active');
    b.addEventListener('click',()=>goTo(i));
    dotsWrap.appendChild(b);
  }
}

let page = 0;
function updateTransform(){
  const viewport = document.querySelector('.cat-viewport');
  const w = viewport.clientWidth;
  track.style.transform = `translateX(-${page * w}px)`;
  Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active', i===page));
}

function goTo(p){
  page = Math.max(0, Math.min(p, pagesCount()-1));
  updateTransform();
}

function next(){ goTo(page+1); }
function prev(){ goTo(page-1); }

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

let auto = setInterval(next, 4000);
const carousel = document.getElementById('cat-carousel');
carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
carousel.addEventListener('mouseleave', ()=> auto = setInterval(next, 4000));

function onResize(){
  const newPer = getPerView();
  if (newPer !== perView){
    perView = newPer;
    page = 0;
    buildDots();
    updateTransform();
  } else {
    updateTransform();
  }
}
window.addEventListener('resize', onResize);

/* init */
perView = getPerView();
buildDots();
updateTransform();
