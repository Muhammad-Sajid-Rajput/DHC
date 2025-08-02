import { products } from './utils/products.js';
import { saveForLater } from './cart.js';

let currentPage = 1;
let itemsPerPage = 10;

window.addEventListener('DOMContentLoaded', () => {
  setupPaginationControls();
  renderPaginatedProducts();
  setupViewToggle();
});

function setupPaginationControls() {
  const select = document.getElementById('items-per-page');
  if (select) {
    select.addEventListener('change', (e) => {
      itemsPerPage = parseInt(e.target.value);
      currentPage = 1;
      renderPaginatedProducts();
    });
  }
}

function renderPaginatedProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = products.slice(start, end);
  populateProducts(paginated);
  renderPageNumbers();
}

function renderPageNumbers() {
  const pageContainer = document.getElementById('pagination-pages');
  if (!pageContainer) return;
  pageContainer.innerHTML = '';
  const totalPages = Math.ceil(products.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const span = document.createElement('span');
    span.textContent = i;
    if (i === currentPage) {
      span.classList.add('active');
    }
    span.addEventListener('click', () => {
      currentPage = i;
      renderPaginatedProducts();
    });
    pageContainer.appendChild(span);
  }
}

function populateProducts(paginatedProducts) {
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
  productList.innerHTML = '';
  paginatedProducts.forEach(product => {
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
      if (e.target.closest('.wishlist-btn')) return;
      const id = this.getAttribute('data-id');
      localStorage.setItem('selectedProductId', id);
      window.location.href = 'details.html';
    });
    const wishlistBtn = card.querySelector('.wishlist-btn');
    if (wishlistBtn && !wishlistBtn.disabled) {
      wishlistBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = card.getAttribute('data-id');
        const product = products.find(p => String(p.id) === String(id));
        if (!product) return;
        let saveForLaterArr = [];
        try {
          saveForLaterArr = JSON.parse(localStorage.getItem('saveForLater')) || [];
        } catch (e) {
          saveForLaterArr = [];
        }
        if (!saveForLaterArr.some(p => String(p.id) === String(product.id))) {
          saveForLaterArr.push(product);
          localStorage.setItem('saveForLater', JSON.stringify(saveForLaterArr));
          alert(`${product.title} has been saved for later!`);
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