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
          if (item.country == country) {
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
      });

      event.currentTarget.classList.add('active');
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

export default tabs;
