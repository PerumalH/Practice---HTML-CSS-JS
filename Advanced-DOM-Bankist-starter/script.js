'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');

const header = document.querySelector('header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// page Navigation

// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function (e1) {
//     e1.preventDefault();

//     const ID = this.getAttribute('href');
//     console.log(ID);
//     document.querySelector(ID).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const ID = e.target.getAttribute('href');
    document.querySelector(ID).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //active tab
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //active container
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind('.5'));

nav.addEventListener('mouseout', handleHover.bind(1));

// sticky bar

// window.addEventListener('scroll', function (e) {
//   const initial = section1.getBoundingClientRect();

//   if (window.scrollY > initial.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// sticky navigation : intersection observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const headerCallbak = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const navigation = nav.getBoundingClientRect();
const navHeight = navigation.height;

const headerObserver = new IntersectionObserver(headerCallbak, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  revealObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy load image

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider

const Slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRth = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const cr = document.createElement('div');
  let curSlide = 0;

  const maxSlides = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  createDots();

  const goToSlide = function (visible) {
    slides.forEach((sl, i) => {
      sl.style.transform = `translateX(${100 * (i - visible)}%)`;
    });
    document
      .querySelectorAll('.dots__dot[data-slide]')
      .forEach(e => e.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${visible}"]`)
      .classList.add('dots__dot--active');
  };

  // const currentSlide = function (num) {
  //   document
  //     .querySelectorAll('button[data-slide]')
  //     .forEach(e => e.classList.remove('dots__dot--active'));

  //   document
  //     .querySelector(`button[data-slide="${num}"]`)
  //     .classList.add('dots__dot--active');
  // };

  goToSlide(0);
  // currentSlide(0);

  const NextSlide = () => {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };
  const PrevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  btnLeft.addEventListener('click', PrevSlide);
  btnRth.addEventListener('click', NextSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') PrevSlide();
    e.key === 'ArrowRight' && NextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      // currentSlide(slide);
    }
  });
};

Slider();
// creating and inserting elements
// .insertAdjacentHTML

// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookied for improved functionality and analytics.';

// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>';

// header.append(message);
// // header.prepend(message);- it'll start of the list in the header element
// // header.before(message); - before the header elements
// // header.after(message);
// // header.after(message.cloneNode(true));

// const closebutton = document.querySelector('.btn-close-cookie');

// closebutton.addEventListener('click', () => {
//   // message.remove();
//   message.parentElement.removeChild(message);
// });

// //style

// message.style.backgroundColor = 'grey';
// message.style.width = '120%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //attributes

// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// console.log(logo.getAttribute('alt'));
// logo.setAttribute('alt', 'Beautiful minimalist logo');

// console.log(logo.alt);

// //Data attributes - start with a name attributes

// console.log(logo.dataset.version);
//  scrolltoo 1

btnScrollTo.addEventListener('click', e => {
  // by coordinate - we do scrolling on button click

  const slcoords = section1.getBoundingClientRect();

  console.log(e.target.getBoundingClientRect());

  // console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //scrolling

  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + window.pageYOffset
  // );

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Dom Traversing

// const h11 = document.querySelector('h1');

// //Going downwards: child
// console.log(h11.querySelectorAll('.highlight'));
// console.log(h11.childNodes);
// console.log(h11.children);
// h11.firstElementChild.style.color = 'white';
// h11.lastElementChild.style.color = 'orangered';

// //going upwards : Parents
// console.log(h11.parentNode);
// console.log(h11.parentElement);

// h11.closest('.header').style.background = 'var( --gradient-secondary)';

// //going sideways: siblings

// console.log(h11.previousElementSibling);
// console.log(h11.nextElementSibling);

// console.log(h11.previousSibling);
// console.log(h11.nextSibling);
