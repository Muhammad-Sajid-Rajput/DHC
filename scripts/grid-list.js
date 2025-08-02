import { products } from './utils/products.js';
import { saveForLater } from './cart.js';

window.addEventListener('DOMContentLoaded', () => {
  populateProducts();
  setupViewToggle();
});

function populateProducts() {
  const productList = document.querySelector('.js-product-list');
  if (!productList) return;
  // Get latest saveForLater and cart from localStorage
  let saveForLaterArr = [];
  let cartArr = [];
  try {
    saveForLaterArr = JSON.parse(localStorage.getItem('saveForLater')) || [];
  } catch (e) {
    saveForLaterArr = [];
  }
  try {
    cartArr = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    cartArr = [];
  }

  products.forEach(product => {
    // Don't show product as saved if it's already in cart
    const isInCart = cartArr.some(p => String(p.id) === String(product.id));
    const isSaved = saveForLaterArr.some(p => String(p.id) === String(product.id));
    const html = `
      <div class="products" data-id="${product.id}">
        <img src="${product.img}" alt="${product.alt}">
        <div class="product-info">
          <div class="title-row">
            <h3>${product.title}</h3>
            <button class="wishlist-btn" ${isSaved && !isInCart ? 'disabled' : ''}>
              <span class="iconify" data-icon="mdi:heart-outline"></span>
            </button>
          </div>
          <div class="price-row">
            <span class="price">$${product.price}</span>
            <span class="old-price">$${product.oldPrice}</span>
          </div>
          <div class="meta">${product.rating} · ${product.orders} · <span class="green">${product.shipping}</span></div>
          <p class="desc">${product.desc}</p>
        </div>
      </div>`; 
    productList.insertAdjacentHTML('beforeend', html);
  });

  // Make the entire product card clickable for details
  productList.querySelectorAll('.products').forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent wishlist button click from triggering navigation
      if (e.target.closest('.wishlist-btn')) return;
      const id = this.getAttribute('data-id');
      localStorage.setItem('selectedProductId', id);
      window.location.href = 'details.html';
    });

    // Wishlist button functionality
    const wishlistBtn = card.querySelector('.wishlist-btn');
    if (wishlistBtn && !wishlistBtn.disabled) {
      wishlistBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Get product id
        const id = card.getAttribute('data-id');
        // Find product from products array
        const product = products.find(p => String(p.id) === String(id));
        if (!product) return;
        // Get latest saveForLater from localStorage
        let saveForLaterArr = [];
        try {
          saveForLaterArr = JSON.parse(localStorage.getItem('saveForLater')) || [];
        } catch (e) {
          saveForLaterArr = [];
        }
        // Avoid duplicates
        if (!saveForLaterArr.some(p => String(p.id) === String(product.id))) {
          saveForLaterArr.push(product);
          localStorage.setItem('saveForLater', JSON.stringify(saveForLaterArr));
          alert(`${product.title} has been saved for later!`);
          // Optionally, disable button after saving
          wishlistBtn.disabled = true;
        } else {
          alert(`${product.title} is already in your saved for later list.`);
        }
      });
    }
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