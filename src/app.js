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

class Slider {
  constructor() {
    this.swiper = undefined;
  }

  initSwiper() {

    try {
      this.swiper = new Swiper(".feedback__slider", {
        pagination: {
          el: ".swiper-pagination",
        },
      });
    } catch(error) {
      console.log(error);
    }

  }

  destroySwiper() {

    try {
      this.swiper.destroy();
    } catch(error) {
      console.log(error);
    }

  }

  validateSwiper() {

    try {
      switch(true) {
        case window.innerWidth < 1024 && this.swiper === undefined:
        case window.innerWidth < 1024 && this.swiper.destroyed === true:
          this.initSwiper();
          break;
        case window.innerWidth >= 1024 && this.swiper !== undefined && this.swiper.destroyed !== true:
          this.destroySwiper();
          break;
      }
    } catch(error) {
      console.log(error);
    }

  }

  removeContainer() {

    try {
      switch(true) {
        case window.innerWidth > 1024:
          document.querySelector('.feedback__container').classList.remove('container');
          break;
        case window.innerWidth <= 1024:
          document.querySelector('.feedback__container').classList.add('container');
          break;
      }
    } catch(error) {
      console.log(error);
    }

  }
}



//* ============
//* Main
//* ============

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

  try {
    const slider = new Slider();
    window.addEventListener('DOMContentLoaded', () => {
      slider.validateSwiper();
      slider.removeContainer();
    });

    window.addEventListener('resize', () => {
      slider.validateSwiper();
      slider.removeContainer();
    });
   
  } catch(error) {
    console.log(error);
  }

})();

