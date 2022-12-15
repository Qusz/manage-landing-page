/**
 * @jest-environment jsdom
 */

import { expect, jest, it } from '@jest/globals';
import { Navbar, Slider, main } from '../src/app.js';


beforeEach(() => {
  initDOM();
});

afterEach(() => {
  clearDOM();
})



describe('Navbar test', () => {
  let navbar;
  beforeEach(() => {
    navbar = new Navbar();
  });
  
  it('Should select appropriate classes', () => {
    expect(navbar.refs.hamburger.classList.contains('navbar__hamburger')).toBe(true);
    expect(navbar.refs.hamburger).toBeTruthy();
    expect(navbar.refs.veil.classList.contains('veil')).toBe(true);
    expect(navbar.refs.navbar.classList.contains('navbar__items')).toBe(true);
  });

  it('Should toggle is-active class', () => {
    navbar.toggleNav();
    expect(navbar.refs.hamburger.classList.contains('is-active')).toBe(true);
    expect(navbar.refs.veil.classList.contains('is-active')).toBe(true);
    expect(navbar.refs.navbar.classList.contains('is-active')).toBe(true);
  })
});



describe('Swiper test', () => {
  let slider;
  beforeEach(() => {
    slider = new Slider();
  })

  it('Should init this.slider property', () => {
    expect(slider.swiper).not.toBeNull();
  });

  it('Should init Swiper element', () => {
    slider.initSwiper();
    expect(document.querySelector('.swiper-initialized')).toBeTruthy();
  });

  it('Should destroy Swiper element', () => {
    slider.initSwiper();
    slider.destroySwiper();
    expect(document.querySelector('.swiper-initialized')).toBeNull();
  });

  it('Should init Swiper elements for small screens by default and/or when resizing the screen', () => {
    window.innerWidth = 1023;
    slider.validateSwiper();
    expect(document.querySelector('.swiper-initialized')).not.toBeNull();
  });

  it('Should destroy Swiper elements for big screens by default and/or when resizing the screen', () => {
    window.innerWidth = 1025;
    slider.validateSwiper();
    expect(document.querySelector('.swiper-initialized')).toBeNull();
  });

  it('Should remove swiper container for big screens', () => {
    window.innerWidth = 1025;
    slider.removeContainer();

    expect(document.querySelector('.feedback__container').classList.contains('container')).toBe(false);
  });

  it('Should add swiper container for small screens', () => {
    window.innerWidth = 1023;
    slider.removeContainer();

    expect(document.querySelector('.feedback__container').classList.contains('container')).toBe(true);
  });
});



describe('Events test', () => {
  let navbar;

  beforeEach(() => {
    navbar = new Navbar();
    main();
  });

  it('Should toggle mobile menu on click', () => {
    window.innerWidth = 768;

    navbar.refs.hamburger.click();
    expect(navbar.refs.hamburger.classList.contains('is-active')).toBe(true);
    expect(navbar.refs.veil.classList.contains('is-active')).toBe(true);
    expect(navbar.refs.navbar.classList.contains('is-active')).toBe(true);

    navbar.refs.hamburger.click();
    expect(navbar.refs.hamburger.classList.contains('is-active')).toBe(false);
    expect(navbar.refs.veil.classList.contains('is-active')).toBe(false);
    expect(navbar.refs.navbar.classList.contains('is-active')).toBe(false);
  });

  it('Should close mobile menu on click on any outside area', () => {
    window.innerWidth = 768;

    navbar.refs.hamburger.click();
    expect(navbar.refs.veil.classList.contains('is-active')).toBe(true);

    navbar.refs.veil.click();
    expect(navbar.refs.hamburger.classList.contains('is-active')).toBe(false);
    expect(navbar.refs.veil.classList.contains('is-active')).toBe(false);
    expect(navbar.refs.navbar.classList.contains('is-active')).toBe(false);
  });

  it('Should kill swiper on big screens on DOMContentLoad', () => {
    window.innerWidth = 1025;
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    }));

    expect(document.querySelector('.swiper-initialized')).toBeFalsy();
    expect(document.querySelector('.feedback__container').classList.contains('container')).toBeFalsy();
  });

  it('Should show swiper on small screens on DOMContentLoad', () => {
    window.innerWidth = 1023;
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    }));

    expect(document.querySelector('.swiper-initialized')).toBeTruthy();
    expect(document.querySelector('.feedback__container').classList.contains('container')).toBeTruthy();
  });
});



describe('Email validation test', () => {
  let emailField;

  const mockInvalidEvent = jest.fn(() => {
    emailField.addEventListener('invalid', (e) => {
      if (document.querySelector('.footer__alert')) {
        e.preventDefault();
        return;
      }

      const alert = document.createElement('div');
      alert.className = 'footer__alert';
      document.querySelector('.footer__subscribe').appendChild(alert);
      e.preventDefault();
    });
  });

  const mockFocusEvent = jest.fn(() => {
    emailField.addEventListener('focus', () => {
      if (document.querySelector('.footer__alert') !== null) {
        document.querySelector('.footer__alert').remove();
      }
    });
  });

  beforeEach(() => {
    main();
    emailField = document.querySelector('.footer__email');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should show alert on invalid email input', () => {
    mockInvalidEvent();
    emailField.dispatchEvent(new Event('invalid'));
    expect(document.querySelector('.footer__alert')).toBeTruthy();
  });

  it('Should kill alert on input focus', () => {
    mockInvalidEvent();
    emailField.dispatchEvent(new Event('invalid'));

    mockFocusEvent();
    emailField.dispatchEvent(new Event('focus'));
    expect(document.querySelector('.footer__alert')).toBeFalsy();
  });

  it('Should only show 1 alert at a time', () => {
    mockInvalidEvent();

    emailField.dispatchEvent(new Event('invalid'));
    emailField.dispatchEvent(new Event('invalid'));
    emailField.dispatchEvent(new Event('invalid'));

    const numberOfAlerts = document.querySelectorAll('.footer__alert').length;

    expect(numberOfAlerts).toBe(1);
  });

})



function initDOM() {
  document.body.innerHTML = `
    <div class="navbar__hamburger"></div>
    <div class="veil"></div>
    <div class="navbar__items"></div>
    <div class="feedback__slider swiper"></div>
    <div class="feedback__container"></div>
    <div class="footer__subscribe"></div>
    <div class="footer__email"></div>
  `;
}

function clearDOM() {
  document.body.innerHTML = ``;
}
