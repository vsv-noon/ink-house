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

const scroll = getScrollbarWidth();

function toggleCart(isActive) {
  document.body.style.overflow = isActive ? 'hidden' : '';
  document.body.style.marginRight = isActive ? `${scroll}px` : `0px`;
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

export { openCart, closeCart };