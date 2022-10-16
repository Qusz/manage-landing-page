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

function initSwiper() {

  swiper = new Swiper(".feedback__slider", {
    pagination: {
      el: ".swiper-pagination"
    },

  });

}

function destroySwiper() {
  swiper.destroy();
}


function checkSlider() {

  if (window.innerWidth < 1024 && swiper === undefined) {
    
    initSwiper();
    console.log('init swiper');

  } else if (window.innerWidth < 1024 && swiper.destroyed === true) {
    initSwiper();
    console.log('init swiper');

  } else if (window.innerWidth >= 1024 && swiper !== undefined && swiper.destroyed !== true) {

    destroySwiper();
    console.log('removed swiper');

  } 
}


function removeSliderContainer() {

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
  


window.addEventListener('DOMContentLoaded', () => {
  checkSlider();
  removeSliderContainer();
});

window.addEventListener('resize', () => {
  checkSlider();
  removeSliderContainer();
});





