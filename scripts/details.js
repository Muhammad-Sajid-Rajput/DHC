import { products } from './utils/products.js';
import { addToCart } from './cart.js';


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
  const tier3Price = product.price - (product.price * 0.4);
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
  // Save for later div event
  const saveForLaterDiv = document.querySelector('.save-for-later');
  if (saveForLaterDiv) {
    saveForLaterDiv.addEventListener('click', () => {
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
      } else {
        alert(`${product.title} is already in your saved for later list.`);
      }
    });
  }
}

// Helper function to shuffle array
function shuffleArray(arr) {
  return arr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);
}

// ========= You May Like Section =========
const youMayLikeContainer = document.querySelector(".you-may-like");
if (youMayLikeContainer) {
  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "You may like";
  youMayLikeContainer.appendChild(title);

  // Pick 4 random different products
  shuffleArray(products.filter(p => p.id !== product.id))
    .slice(0, 4).forEach(item => {
      const suggestion = document.createElement("div");
      suggestion.className = "suggestion";
      suggestion.innerHTML = `
          <img src="${item.img}" alt="${item.title}">
          <div>
            <p>${item.title}</p>
            <span>$${item.price}</span>
          </div>
        `;
      youMayLikeContainer.appendChild(suggestion);
    });
}

// ========= Related Products Section =========
const relatedList = document.querySelector(".js-related-list");
if (relatedList) {
  // Pick 6 random different products
  shuffleArray(products.filter(p => p.id !== product.id))
    .slice(0, 6).forEach(item => {
      const card = document.createElement("div");
      card.className = "related-item";
      card.innerHTML = `
          <img src="${item.img}" alt="${item.title}">
          <div class="desc">
            <p>${item.title}</p>
            <span>$${item.price}</span>
          </div>
        `;
      relatedList.appendChild(card);
    });
}
