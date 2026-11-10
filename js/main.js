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

document.addEventListener("DOMContentLoaded", function () {
  set_footer_year();
  secure_blank_links();
});
