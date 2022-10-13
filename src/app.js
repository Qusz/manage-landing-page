import Swiper from 'swiper/bundle';

class Navbar {
  constructor() {
    this.hamburger = document.querySelector('.navbar__hamburger');
    this.veil = document.querySelector('.veil');
    this.navbar = document.querySelector('.navbar__items');
  }

  toggleNav() {
    this.hamburger.classList.toggle('is-active');
    this.veil.classList.toggle('is-active');
    this.navbar.classList.toggle('is-active');
  }
}

(() => {
  try {
    const navbar = new Navbar();
    navbar.hamburger.addEventListener('click', () => {
      navbar.toggleNav();
    });
  
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('veil')) {
        navbar.toggleNav();
      }
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination"
      },
    });
  } catch (error) {
    console.log(error);
  }

})();

