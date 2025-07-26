import { products } from './utils/recommeded-items.js';

window.addEventListener('DOMContentLoaded', () => {
  populateProducts();
  setupViewToggle();
});

function populateProducts() {
  const productList = document.querySelector('.js-product-list');
    if (!productList) return;
  products.forEach(product => {
    const html = `
      <div class="products">
        <img src="${product.img}" alt="${product.alt}">
        <div class="product-info">
          <h3>${product.title}</h3>
          <div class="price-row">
            <span class="price">${product.price}</span>
            <span class="old-price">${product.oldPrice}</span>
          </div>
          <div class="meta">${product.rating} · ${product.orders} · <span class="green">${product.shipping}</span></div>
          <p class="desc">${product.desc}</p>
          <a href="#" class="details">View details</a>
        </div>
        <button class="wishlist-btn">
          <span class="iconify" data-icon="mdi:heart-outline"></span>
        </button>
      </div>`;
    productList.insertAdjacentHTML('beforeend', html);
  });
}


function setupViewToggle() {
  const viewIcons = document.querySelectorAll('.view-icons');
  const productList = document.querySelector('.js-product-list');

  viewIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      document.querySelector('.view-icons.active-view')?.classList.remove('active-view');
      icon.classList.add('active-view');

      const isGrid = icon.querySelector('[data-icon="rivet-icons:grid"]');
      if (isGrid) {
        productList.classList.add('grid-view');
      } else {
        productList.classList.remove('grid-view');
      }
    });
  });
}