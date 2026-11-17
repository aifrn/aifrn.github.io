/* =========================================================
   AI 강의자료실 공통 스크립트
   - 모든 페이지가 이 파일 하나를 함께 사용합니다.
   - 보조 기능만 담당합니다. 이 파일이 없어도 내용과 자료실은 모두 동작합니다.
   ========================================================= */

// 푸터에 올해 연도를 표시합니다.
function set_footer_year() {
  const year_el = document.getElementById("footer_year");
  if (year_el) {
    year_el.textContent = String(new Date().getFullYear());
  }
}

// 새 탭으로 열리는 링크에 보안 속성(rel)을 자동으로 붙입니다.
function secure_blank_links() {
  const blank_links = document.querySelectorAll('a[target="_blank"]');
  blank_links.forEach(function (link_el) {
    link_el.setAttribute("rel", "noopener noreferrer");
  });
}

// data-show-from ~ data-show-until 기간에만 요소를 보여 줍니다.
// 시각은 "2026-11-18T00:00:00+09:00"처럼 시간대까지 적어야 방문자 위치와 상관없이 한국 시간 기준으로 동작합니다.
function show_timed_items() {
  const timed_items = document.querySelectorAll("[data-show-from], [data-show-until]");
  const now_ms = Date.now();
  timed_items.forEach(function (item_el) {
    const from_ms = item_el.dataset.showFrom ? Date.parse(item_el.dataset.showFrom) : -Infinity;
    const until_ms = item_el.dataset.showUntil ? Date.parse(item_el.dataset.showUntil) : Infinity;
    item_el.hidden = !(now_ms >= from_ms && now_ms < until_ms);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  set_footer_year();
  secure_blank_links();
  show_timed_items();
});
