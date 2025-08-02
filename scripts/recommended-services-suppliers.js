import { suppliers,services } from './utils/services-services.js';
import { products } from './utils/products.js';
// ----------------- Recommended Section -----------------

const recommendedGrid = document.querySelector('.js-recommended-grid');

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.img}" alt="${product.alt}">
    <p class="price">$${product.price}</p>
    <p class="desc">${product.desc}</p>
  `;
  recommendedGrid.appendChild(card);
});


// ----------------- Services Section -----------------

const servicesGrid = document.querySelector('.js-services-grid');

services.forEach(service => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `
    <img src="${service.img}" alt="${service.alt}">
    <iconify-icon icon="${service.icon}" width="24" class="service-icon"></iconify-icon>
    <p>${service.text}</p>
  `;
  servicesGrid.appendChild(card);
});


// ----------- Suppliers Section -----------
const suppliersGrid = document.querySelector('.js-suppliers-grid');

suppliers.forEach(supplier => {
  const card = document.createElement('div');
  card.innerHTML = `
    <div class="country-name">
      <img src="${supplier.flag}" alt="${supplier.country}"> ${supplier.country}
    </div>
    <span>${supplier.domain}</span>
  `;
  suppliersGrid.appendChild(card);
});
