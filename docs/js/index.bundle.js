 (function() { 
 	"use strict";

const overlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const openCartButton = document.querySelector('.cart-btn');
const closeCartElement = document.querySelectorAll('.js-close-cart');

const getScrollbarWidth = () => {
  let div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.append(div);
  let scrollbarWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollbarWidth
}

const cartPopup_scroll = getScrollbarWidth();

function toggleCart(isActive) {
  document.body.style.overflow = isActive ? 'hidden' : '';
  document.body.style.marginRight = isActive ? `${cartPopup_scroll}px` : `0px`;
  cart.classList.toggle('active', isActive);
  overlay.classList.toggle('active', isActive);
}

function openCart() {
  openCartButton.addEventListener('click', () => {
    toggleCart(true);
  });
};

function closeCart() {
  closeCartElement.forEach((item) => {
    item.addEventListener('click', () => {
      toggleCart(false);
    })
  })
}


;
function mobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.nav-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('menu-active');
    mobileMenu.classList.toggle('nav-menu-open');
    document.body.classList.toggle('lock');
  })

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && event.target !== mobileMenuButton || event.target.classList.contains('nav-link')) {
      mobileMenu.classList.remove('nav-menu-open');
      mobileMenuButton.classList.remove('menu-active');
      document.body.classList.remove('lock');
    }
  })
}

 var mobile_menu = (mobileMenu);
;
function tabs() {
  const tabsControlButton = document.querySelectorAll('.control-item');
  const tabsContainer = document.querySelector('.tabs-container');

  function fetchCatalog(country) {
    tabsContainer.innerHTML = '';

    fetch('./files/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((item) => {
          if (item.country === country) {
            tabsContainer.innerHTML += `
            <div class="card">
              <img class="card-img" src=${item.img} alt="img">
              <h4>${item.author}</h4>
              <h3>${item.title}</h3>
              <p class="description">${item.description}</p>
              <p class="price">${item.price}</p>
              <button class="btn">В корзину</button>
            </div>
            `;
          }
        });
      });
  }

  fetchCatalog('France');

  tabsControlButton.forEach((el) => {
    el.addEventListener('click', (event) => {
      const country = event.currentTarget.dataset.country;

      tabsControlButton.forEach((el) => {
        el.classList.remove('active');

        if (el.getAttribute('data-country') == country) {
          el.classList.add('active');
        }
      });

      tabsContainer.classList.add('tabs-hide-animation');
      tabsContainer.classList.remove('tabs-animation');

      setTimeout(() => {
        fetchCatalog(country);

        tabsContainer.classList.add('tabs-animation');
        tabsContainer.classList.remove('tabs-hide-animation');
      }, 500)

    });
  });
}

 var modules_tabs = (tabs);

;




modules_tabs();
mobile_menu();
openCart();
closeCart();
 })()
;