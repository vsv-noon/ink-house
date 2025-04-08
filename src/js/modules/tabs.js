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
          console.log(item.country)
          console.log(country)
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

export default tabs;
