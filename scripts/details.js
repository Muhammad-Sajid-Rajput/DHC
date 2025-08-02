import { saveForLater } from './cart.js';
import { products } from './utils/products.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const saveDiv = document.querySelector('.save-for-later');
  if (saveDiv) {
    saveDiv.addEventListener('click', async () => {
      // Get selected product ID
      const selectedId = localStorage.getItem('selectedProductId');
      if (!selectedId) return alert('No product selected!');
      // Get product data (prefer window.product, fallback to imported products)
      let product = window.product;
      if (!product || String(product.id) !== String(selectedId)) {
        // Use imported products array
        try {
          // Import products from module
          const { products } = await import('./utils/products.js');
          product = products.find(p => String(p.id) === String(selectedId));
        } catch (e) {
          product = null;
        }
      }
      if (!product) return alert('Product not found!');
      // Avoid duplicates
      if (!saveForLater.some(p => String(p.id) === String(product.id))) {
        saveForLater.push(product);
        localStorage.setItem('saveForLater', JSON.stringify(saveForLater));
        alert(`${product.title} has been saved for later!`);
      } else {
        alert(`${product.title} is already in your saved for later list.`);
      }
    });
  }
});


// Get selected product ID from localStorage
const id = localStorage.getItem('selectedProductId');
const product = products.find(p => p.id === id);

if (product) {
    document.querySelector(".main-img").src = product.img;

    document.querySelectorAll(".thumbnails img").forEach(thumb => {
        thumb.src = product.img;
    });

    document.querySelector(".title").textContent = product.title;
    document.querySelector(".rating").innerHTML = `
    ${product.rating}
    <span>|</span>
    <span><iconify-icon icon="ic:outline-message" width="16" height="16"></iconify-icon> ${product.reviews || '32'} reviews</span>
    <span>|</span>
    <span><iconify-icon icon="ep:sell" width="16" height="16"></iconify-icon> ${product.orders} sold</span>
  `;

    const tier3Price = product.price - (product.price*0.4);

    document.querySelector(".price-box").innerHTML = `
    <div>
      <p>$${product.oldPrice.toFixed(2)}</p>
      <small>50-100 pcs</small>
    </div>
    <div>
      <p>$${product.price.toFixed(2)}</p>
      <small>100-700 pcs</small>
    </div>
    <div>
      <p>$${tier3Price.toFixed(2)}</p>
      <small>700+ pcs</small>
    </div>
  `;

    document.querySelector(".meta-info").innerHTML = `
  <div class="meta-row">
    <span class="meta-label">Price:</span>
    <span class="meta-value">$${product.oldPrice.toFixed(2)}</span>
  </div>
  <div class="meta-row">
    <span class="meta-label">Type:</span>
    <span class="meta-value">${product.meta?.type || 'N/A'}</span>

    <span class="meta-label">Material:</span>
    <span class="meta-value">${product.meta?.material || 'N/A'}</span>

    <span class="meta-label">Design:</span>
    <span class="meta-value">${product.meta?.design || 'N/A'}</span>
  </div>
  <div class="meta-row">
    <span class="meta-label">Customization:</span>
    <span class="meta-value">${product.meta?.customization || 'N/A'}</span>

    <span class="meta-label">Protection:</span>
    <span class="meta-value">${product.meta?.protection || 'N/A'}</span>

    <span class="meta-label">Warranty:</span>
    <span class="meta-value">${product.meta?.warranty || 'N/A'}</span>
  </div>

  <button class="btn-blue" id="add-to-cart-btn">Add to cart</button>
`;

    // Add to cart button event
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(product);
            alert('Product added to cart!');
        });
    }
}


const suggestionsContainer = document.querySelector('.js-suggestions');

products.slice(0, 5).forEach(product => {
    const html = `
        <div class="suggestion">
            <img src="${product.img}" alt="${product.alt}" />
            <div>
                <p>${product.title}</p>
                <span>$${product.price} - $${product.oldPrice}</span>
            </div>
        </div>
    `;
    suggestionsContainer.insertAdjacentHTML('beforeend', html);
});


const relatedContainer = document.querySelector('.js-related-list');

products.slice(-6).forEach(product => {
    const html = `
        <div class="related-item">
            <img src="${product.img}" alt="${product.img}" />
            <div class="desc">
                <p>${product.title}</p>
                <p>Original</p>
                <span>$${product.price} - $${product.oldPrice}</span>
            </div>
        </div>`;
    relatedContainer.insertAdjacentHTML('beforeend', html);
});