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

export { cartData };