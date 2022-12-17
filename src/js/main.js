import Swiper from 'swiper/swiper-bundle';

class Navbar {
  constructor() {
    this.activeClass = 'is-active';
    this.refs = {
      hamburger: document.querySelector('.navbar__hamburger'),
      veil: document.querySelector('.veil'),
      navbar: document.querySelector('.navbar__items')
    }
  }

  toggleNav() {
    for (const element in this.refs) {
      this.refs[element].classList.toggle(this.activeClass);

      if (document.body.style.overflowY === 'hidden') {
        document.body.style.overflowY = '';
      } else {
        document.body.style.overflowY = 'hidden';
      }
    }
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
        }
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



main();



function main() {
  //* Hamburger menu
  try {
    const navbar = new Navbar();
    navbar.refs.hamburger.addEventListener('click', () => {
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

  //* Swiper
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

  //* Email validation
  try {
    const emailField = document.querySelector('.footer__email');
    let alert = null;

    // Prevent email form submission by default
    document.querySelector('.footer__form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    emailField.addEventListener('invalid', (e) => {
      // Make sure there's only 1 alert at a time
      if (document.querySelector('.footer__alert')) {
        e.preventDefault();
        return;
      }

      emailField.style.border = '2px solid #D22B2B';
      emailField.style.color = '#D22B2B';

      alert = document.createElement('div');
      alert.className = 'footer__alert';
      alert.textContent = 'Please insert a valid email';
      document.querySelector('.footer__subscribe').appendChild(alert);

      e.preventDefault();
    });

    // Remove alert after re-focusing
    emailField.addEventListener('focus', () => {
      if (alert !== null) {
        alert.remove();
      }
    })

  } catch(error) {
    console.log(error);
  }
}

export { Navbar, Slider, main };
