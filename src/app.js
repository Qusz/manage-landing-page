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



//* Main

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
  } catch(error) {
    console.log(error);
  }



})();


let swiper;


function checkSlider() {

  if (window.innerWidth < 1024 && swiper === undefined) {
    swiper = new Swiper(".feedback__slider", {
      pagination: {
        el: ".swiper-pagination"
      },
    });

    document.querySelector('.feedback__slider').classList.add('swiper');
    document.querySelector('.feedback__slider').children[0].classList.add('swiper-wrapper');
    document.querySelector('.feedback__card').classList.add('swiper-slide');

  } else if (window.innerWidth < 1024 && swiper.destroyed === true) {
    swiper = new Swiper(".feedback__slider", {
      pagination: {
        el: ".swiper-pagination"
      },
    });

    document.querySelector('.feedback__slider').classList.add('swiper');
    document.querySelector('.feedback__slider').children[0].classList.add('swiper-wrapper');
    document.querySelector('.feedback__card').classList.add('swiper-slide');

  } else if (window.innerWidth >= 1024 && swiper !== undefined && swiper.destroyed !== true) {
    swiper.destroy(false, true);

    document.querySelector('.feedback__slider').classList.remove('swiper');
    document.querySelector('.feedback__slider').children[0].classList.remove('swiper-wrapper');
    document.querySelector('.feedback__card').classList.remove('swiper-slide');
  }

}

window.addEventListener('DOMContentLoaded', () => {
  checkSlider();
});
window.addEventListener('resize', () => {
  checkSlider();
});



