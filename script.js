'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const btnScrollTo =  document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // window.scroll({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })
  section1.scrollIntoView({behavior: 'smooth'})
})
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message')
message.innerHTML = 
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

// delete element
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  message.parentElement.removeChild(message)
})

message.style.backgroundColor = '#37383d'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
 