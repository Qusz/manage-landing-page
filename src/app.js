

loadHamburger();

function loadHamburger() {
  const hamburger = document.querySelector('.navbar__hamburger'),
        navbarItems = document.querySelector('.navbar__items'),
        body = document.querySelector('.body');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navbarItems.classList.toggle('is-active');
    body.classList.toggle('is-active');
  })
}