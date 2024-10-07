function mobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('menu-active');
    mobileMenu.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('lock');
  })

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && event.target !== mobileMenuButton || event.target.classList.contains('nav-link')) {
      mobileMenu.classList.remove('mobile-menu-open');
      mobileMenuButton.classList.remove('menu-active');
      document.body.classList.remove('lock');
    }
  })
}

export default mobileMenu;