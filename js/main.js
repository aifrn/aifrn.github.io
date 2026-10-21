// 히어로 타이핑 효과에 표시할 문구
const phrases = [
  'AI 엔지니어',
  '평생 학습자',
  '책과 음악을 사랑하는 사람',
];

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const toTop = document.getElementById('toTop');

// 타이핑 효과
(function typeLoop() {
  const el = document.getElementById('typing');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    charIdx += deleting ? -1 : 1;
    el.textContent = current.slice(0, charIdx);

    let delay = deleting ? 50 : 110;
    if (!deleting && charIdx === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

// 스크롤 시 내비게이션 배경, 맨 위로 버튼 표시
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  toTop.classList.toggle('show', y > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

// 모바일 메뉴 토글
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  if (open) nav.classList.add('scrolled');
});
navMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// 요소가 화면에 들어오면 등장 애니메이션
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 보고 있는 섹션을 메뉴에 표시
const menuLinks = [...navMenu.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();
