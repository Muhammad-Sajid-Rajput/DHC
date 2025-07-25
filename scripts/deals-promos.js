import { offers } from './utils/offers.js';
import { categorySections } from './utils/categories.js';
// Populate Offers
const offerContainer = document.querySelector('.js-offers-container');
offers.forEach(({ img, alt, name, discount, price }) => {
  const html = `
    <div class="offer-item">
      <img src="${img}" alt="${alt}" />
      <h3>${name}</h3>
      <span class="discount">${discount}</span>
      <p class="price">Price: ${price}</p>
      <button class="btn-blue">Buy Now</button>
    </div>
  `;
  offerContainer.insertAdjacentHTML('beforeend', html);
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
