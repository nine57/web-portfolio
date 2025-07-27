// 스크롤에 따라 네비게이션 바 스타일 변경
const navbar = document.getElementById('navbar-main');
const mainLanding = document.getElementById('main-landing');
function handleNavbar() {
  const scrollY = window.scrollY;
  const landingHeight = mainLanding.offsetHeight;
  if (scrollY < landingHeight - 60) {
    navbar.classList.remove('navbar-scrolled');
  } else {
    navbar.classList.add('navbar-scrolled');
  }
}
window.addEventListener('scroll', handleNavbar);
window.addEventListener('DOMContentLoaded', handleNavbar); 