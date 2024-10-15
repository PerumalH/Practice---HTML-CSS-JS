'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// creating and inserting elements
// .insertAdjacentHTML

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookied for improved functionality and analytics.';

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>';

header.append(message);
// header.prepend(message);- it'll start of the list in the header element
// header.before(message); - before the header elements
// header.after(message);
// header.after(message.cloneNode(true));

const closebutton = document.querySelector('.btn-close-cookie');

closebutton.addEventListener('click', () => {
  // message.remove();
  message.parentElement.removeChild(message);
});

//style

message.style.backgroundColor = 'grey';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes

// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// console.log(logo.getAttribute('alt'));
// logo.setAttribute('alt', 'Beautiful minimalist logo');

// console.log(logo.alt);

// //Data attributes - start with a name attributes

// console.log(logo.dataset.version);

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');

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
