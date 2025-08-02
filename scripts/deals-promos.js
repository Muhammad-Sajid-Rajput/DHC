import { categorySections } from './utils/categories.js';
import { products } from './utils/products.js';

// Populate Offers (Only products with a discount)
const offerContainer = document.querySelector('.js-offers-container');

products
  .filter(product => product.discount) // Only include products with discount
  .forEach(({ img, alt, title, discount, price }) => {
    const html = `
      <div class="offer-item" data-name="${title}">
        <img src="${img}" alt="${alt}" />
        <h3>${title}</h3>
        <span class="discount">-${discount}%</span>
        <p class="price">Price: $${price}</p>
        <button class="btn-blue">Buy Now</button>
      </div>
    `;
    offerContainer.insertAdjacentHTML('beforeend', html);
  });

// Add Buy Now button functionality
offerContainer.querySelectorAll('.offer-item .btn-blue').forEach(btn => {
  btn.addEventListener('click', function () {
    const offerItem = this.closest('.offer-item');
    const name = offerItem.getAttribute('data-name');

    const product = products.find(p => p.title === name);
    if (product) {
      localStorage.setItem('selectedProductId', product.id);
      window.location.href = 'details.html';
    }
  });
});

// Populate Only Category Grids
categorySections.forEach(({ class: className, products }) => {
  const grid = document.querySelector(`.js-grid-${className}`);
  if (!grid) return;

  products.forEach(({ name, price, img }) => {
    const itemHTML = `
      <div class="category-item">
        <p>${name}</p>
        <span>${price}</span>
        <img src="${img}" alt="${name}" />
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', itemHTML);
  });
});
