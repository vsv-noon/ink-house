 (function() { 
 	"use strict";

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

  function fetchReproductions(country) {
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

  fetchReproductions('France');

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
        fetchReproductions(country);

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
 })()
;