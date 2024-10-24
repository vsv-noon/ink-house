/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/modules/cartData.js
const cartData = () => {
  const cart = document.querySelector('.cart');
  const productList = document.querySelector('.tabs-container');
  const cartList = document.querySelector('.cart-list');
  const cartEmpty = document.querySelector('.cart-empty-container');
  const cartOrder = document.querySelector('.cart-order-container');
  const formatter = new Intl.NumberFormat('ru');

  const iconCart = document.querySelector('.icon-cart');
  const iconCartSpan = iconCart.querySelector('span');
  
  const productInfo = {};
  
  const addProductToCart = () => {
    productList.addEventListener('click', (event) => {
      if (!event.target.classList.contains('buy-btn')) {
        return;
      }
  
      if (event.target.classList.contains('buy-btn')) {
        const card = event.target.closest('.card');

        const imageCard = card.querySelector('.card-img');
        const title = card.querySelector('.card-title')
        const price = card.querySelector('.price');

        productInfo.title = title.textContent;
        productInfo.price = price.textContent;
        productInfo.image = imageCard.src;

        renderProductInCart();
        calculateTotalCartValue();

        toggleCartStatus();
      }
    })
  }
  
  addProductToCart();

  const renderProductInCart = () => {
    const li = document.createElement('li');
    li.classList.add('cart-item');

    li.innerHTML = `
            <span class="close-btn js-remove"></span>
            <div class="cart-item-container">
              <img class="cart-item-img" src="${productInfo.image}" alt="img" />
              <div class="cart-text">
                <div class="cart-item-title">${productInfo.title}</div>
                <div class="cart-item-price">${productInfo.price}</div>
              </div>
            </div>
    `;
    cartList.append(li);
  }

  const removeProductFromCart = () => {
    cartList.addEventListener('click', (event) => {
      if (!event.target.classList.contains('js-remove')) {
        return;
      }

      if (event.target.classList.contains('js-remove')) {
        const cartItem = event.target.closest('.cart-item');
        cartItem.remove();

        calculateTotalCartValue();
        toggleCartStatus();
      }
    })
  }

  removeProductFromCart();
  
  const toggleCartStatus = () => {
    if (cart.querySelector('.cart-item')) {
      cartOrder.classList.remove('hidden');
      cartEmpty.classList.add('hidden');
    } else {
      cartOrder.classList.add('hidden');
      cartEmpty.classList.remove('hidden');
  
    }
  }

  const calculateTotalCartValue = () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartTotalPrice = document.querySelector('.total-price');

    let totalCartValue = 0;
    let totalQuantity = 0

    cartItems.forEach((item) => {
      const itemPrice = item.querySelector('.cart-item-price');

      totalCartValue += parseInt(itemPrice.textContent.split(' ').join(''));
      totalQuantity++;
    });

    cartTotalPrice.textContent = formatter.format(totalCartValue);

    iconCartSpan.innerHTML = totalQuantity;

    if (totalQuantity === 0) {
      iconCartSpan.style.display = 'none';
    } else {
      iconCartSpan.style.display = 'block';

    }
  };

  calculateTotalCartValue();
};


;// ./src/js/modules/cartPopup.js
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


;// ./src/js/modules/mobile-menu.js
function mobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.nav-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('menu-active');
    
    mobileMenu.classList.toggle('nav-menu-open');
    document.body.classList.toggle('lock');
    console.log(1);
  })

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && event.target !== mobileMenuButton || event.target.classList.contains('nav-link')) {
      mobileMenu.classList.remove('nav-menu-open');
      mobileMenuButton.classList.remove('menu-active');
      document.body.classList.remove('lock');
    }
  })
}

/* harmony default export */ var mobile_menu = (mobileMenu);
;// ./src/js/modules/tabs.js
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
              <picture>
                <source srcset="${item.img}.webp" type="image/webp">
                <img class="card-img" src="${item.img}.jpg" alt="img">
              </picture>

              <h4>${item.author}</h4>
              <h3 class="card-title">${item.title}</h3>
              <p class="description">${item.description}</p>
              <p class="price">${item.price}</p>
              <button class="btn buy-btn">В корзину</button>
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
      // event.currentTarget.classList.add('active');

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

/* harmony default export */ var modules_tabs = (tabs);

;// ./src/js/index.js





modules_tabs();
mobile_menu();
openCart();
closeCart();
cartData();
/******/ })()
;