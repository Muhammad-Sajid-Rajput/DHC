// web-cart.js
import { 
  cart, 
  saveForLater, 
  addToCart, 
  removeFromCart, 
  updateCartQty, 
  moveToSaveForLater, 
  moveToCartFromSaved, 
  clearCart,
  removeFromSaved
} from './cart.js';

// Handle Back to shop and Remove all buttons
function setupCartFooterActions() {
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'search.html';
    });
  }
  const removeAllBtn = document.querySelector('.remove-all');
  if (removeAllBtn) {
    removeAllBtn.addEventListener('click', () => {
      clearCart();
      renderCart();
    });
  }
}

// Render saved for later section
function renderSavedForLater() {
  const savedGrid = document.querySelector('.js-saved-grid');
  if (!savedGrid) return;

  savedGrid.innerHTML = '';
  if (saveForLater.length === 0) {
    savedGrid.innerHTML = '<p style="padding:20px;color:#888;">No items saved for later.</p>';
    return;
  }

  saveForLater.forEach(product => {
    const item = document.createElement('div');
    item.className = 'saved-item';
    item.innerHTML = `
      <img src="${product.img}" alt="${product.alt}">
      <p class="saved-price">$${product.price}</p>
      <p class="saved-title">${product.title}</p>
      <div class="actions-for-saved-items">
      <button class="move-to-cart">Move to cart</button>
      <button class="remove">Remove</button>
      </div>
    `;

    item.querySelector('.move-to-cart').addEventListener('click', () => {
      moveToCartFromSaved(product);
      renderCart();
      renderSavedForLater();
    });

    // remove button event
    item.querySelector('.remove').addEventListener('click', () => {
      removeFromSaved(product.id);
      renderSavedForLater();
    });

    savedGrid.appendChild(item);
  });
}

function renderCart() {
  const cartItemsWrapper = document.querySelector('.cart-items');
  const cartHeading = document.querySelector('.cart-heading h2');
  if (!cartItemsWrapper || !cartHeading) return;

  cartItemsWrapper.innerHTML = '';
  cartHeading.textContent = `My cart (${cart.length})`;

  // Summary calculation
  let subtotal = 0, discount = 0, discountedSubtotal = 0;
  cart.forEach(product => {
    const qty = Number(product.qty) || 1;
    const price = Number(product.price) || 0;
    const discountPercent = Number(product.discount) || 0;

    subtotal += price * qty;

    let productDiscount = 0;
    let discountedPrice = price;
    if (discountPercent > 0) {
      productDiscount = (price * discountPercent) / 100;
      discountedPrice = price - productDiscount;
      discount += productDiscount * qty;
    }
    discountedSubtotal += discountedPrice * qty;
  });
  let tax = discountedSubtotal * 0.10;
  let total = discountedSubtotal + tax;

  // Update summary
  const summarySection = document.querySelector('.js-summary-section');
  if (summarySection) {
    summarySection.querySelector('.value.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    summarySection.querySelector('.value.discount').textContent = discount > 0 ? `-$${discount.toFixed(2)}` : `$0.00`;
    summarySection.querySelector('.value.tax').textContent = `+$${tax.toFixed(2)}`;
    summarySection.querySelector('.value.total').textContent = `$${total.toFixed(2)}`;
  }

  if (cart.length === 0) {
    cartItemsWrapper.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  // Render cart items
  cart.forEach(product => {
    const item = document.createElement('div');
    item.className = 'cart-item';
    const qty = Number(product.qty) || 1;
    const price = Number(product.price) || 0;
    const discountPercent = Number(product.discount) || 0;
    let discountedPrice = discountPercent > 0 ? price - (price * discountPercent / 100) : price;

    let qtyOptions = '';
    for (let i = 1; i <= 10; i++) {
      qtyOptions += `<option value="${i}"${i === qty ? ' selected' : ''}>Qty: ${i}</option>`;
    }

    item.innerHTML = `
      <img src="${product.img}" alt="${product.alt}">
      <div class="item-info">
        <strong>${product.title}</strong>
        <p>${product.meta ? `Size: ${product.meta.size || '-'}, Color: ${product.meta.color || '-'}, Material: ${product.meta.material || '-'}` : ''}</p>
        <p>Seller: ${product.seller || 'Unknown'}</p>
        <div class="action-buttons">
          <button class="remove">Remove</button>
          <button class="save">Save for later</button>
        </div>
      </div>
      <div class="item-controls">
        <div class="price">
          ${discountPercent > 0
            ? `<span class="discount-percentage">${discountPercent}% off</span> $${discountedPrice.toFixed(2)} <span class='original-price'>$${price.toFixed(2)}</span>`
            : `$${discountedPrice.toFixed(2)}`}
        </div>
        <select class="qty-select">${qtyOptions}</select>
      </div>
    `;
    cartItemsWrapper.appendChild(item);

    // Event handlers
    item.querySelector('.remove').addEventListener('click', () => {
      removeFromCart(product.id);
      renderCart();
    });

    item.querySelector('.qty-select').addEventListener('change', (e) => {
      updateCartQty(product.id, parseInt(e.target.value, 10));
      renderCart();
    });

    item.querySelector('.save').addEventListener('click', () => {
      moveToSaveForLater(product);
      renderCart();
      renderSavedForLater();
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  renderSavedForLater();
  setupCartFooterActions();
});
