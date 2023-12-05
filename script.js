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
const headerTitle = document.querySelector('.header__title');

//Page navigation - Problem with forEach
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })
// btnScrollTo.addEventListener('click', (e) => {
//   // const s1coords = section1.getBoundingClientRect();
//   // console.log(s1coords);
//   // console.log(e.target.getBoundingClientRect());

//   // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
//   // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

//   // window.scroll({
//   //   left: s1coords.left + window.scrollX,
//   //   top: s1coords.top + window.scrollY,
//   //   behavior: 'smooth'
//   // })
//   section1.scrollIntoView({behavior: 'smooth'})
// })

// Event Delegation Implementing Page Navigation
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  //Matching strategy
  if(e.target.classList.contains('nav__link')) {
    e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
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
})

message.style.backgroundColor = '#37383d'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
 

//Propagation
// const randomInt = (max, min) => Math.floor(Math.random() * (max - min + 1) + min)

// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('Link', e.target, e.currentTarget);
//   e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('Container', e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('Nav', e.target, e.currentTarget);
// })



const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

///////////////////////////////////////
// The bind Method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');


const h1 = document.querySelector('h1')
// Going downwards

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'white'

console.log(h1.parentElement);
console.log(h1.parentNode);
console.log(h1.closest('h1'));

// Queryselector Find children no matter how far - Closest find parent


//Tabled component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab')

  //Guard clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  
  clicked.classList.add('operations__tab--active')
  //Activate Content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//Menu fade animation
const handlerOver = function (e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el != link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}
const nav = document.querySelector('.nav');
//Mouse over instead of mouseenter, because mouse over has bubble - that's we needed
nav.addEventListener('mouseover', handlerOver.bind(0.5))

nav.addEventListener('mouseout', handlerOver.bind(1))
// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords);

// window.addEventListener('scroll', () => {
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//    else nav.classList.remove('sticky')
// })

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })  
// }

// const obsOptions = {
//   root: null, // Root is the element that the target is intersecting  
//   threshold: [0, 0.05] // 0.2 is 20%
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
  const [entry] = entries; // Equal to entry = entries[0]
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Root is the element that the target is intersecting 
  threshold: 0, // 0.2 is 20%, the percentage of element will be intersecting that trigger the callback
  rootMargin: `-${navHeight}px`// Make sure the nav does not overlap at the beginning,
  //  trigger before the threshold actually reach by 90pixel
})
  
headerObserver.observe(header)

//Reveal section when approaching
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // Remove event listening as we did all work we wanted
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // viewport
  threshold: 0.15,
})

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))