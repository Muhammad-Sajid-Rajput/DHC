import { cart as importedCart, saveForLater } from './cart.js';

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
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    }
}
// Render saved for later section
function renderSavedForLater() {
    const savedGrid = document.querySelector('.js-saved-grid');
    if (!savedGrid) return;
    // Load from localStorage
    let saved = [];
    try {
        saved = JSON.parse(localStorage.getItem('saveForLater')) || [];
    } catch (e) {
        saved = [];
    }
    savedGrid.innerHTML = '';
    if (saved.length === 0) {
        savedGrid.innerHTML = '<p style="padding:20px;color:#888;">No items saved for later.</p>';
        return;
    }
    saved.forEach(product => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        item.innerHTML = `
            <img src="${product.img}" alt="${product.alt}">
            <p class="saved-price">$${product.price}</p>
            <p class="saved-title">${product.title}</p>
            <button class="move-to-cart">Move to cart</button>
        `;
        // Move to cart button
        item.querySelector('.move-to-cart').addEventListener('click', () => {
            // Remove from both local and imported saveForLater arrays
            let idxLocal = saved.findIndex(p => p.id === product.id);
            if (idxLocal !== -1) {
                saved.splice(idxLocal, 1);
            }
            let idxImported = saveForLater.findIndex(p => p.id === product.id);
            if (idxImported !== -1) {
                saveForLater.splice(idxImported, 1);
            }
            localStorage.setItem('saveForLater', JSON.stringify(saved));
            // Add to cart if not already there
            if (!cart.some(p => p.id === product.id)) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                alert('This product is already in the cart!');
            }
            renderCart();
            renderSavedForLater();
        });
        savedGrid.appendChild(item);
    });
}


// Load cart from localStorage or fallback to importedCart
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || importedCart || [];
} catch (e) {
    cart = importedCart || [];
}

function renderCart() {
    const cartItemsWrapper = document.querySelector('.cart-items');
    const cartHeading = document.querySelector('.cart-heading h2');
    if (!cartItemsWrapper || !cartHeading) return;

    cartItemsWrapper.innerHTML = '';
    cartHeading.textContent = `My cart (${cart.length})`;

    // Summary calculation: subtotal (original prices), discount (total discount), tax (10% on discounted subtotal), total
    let subtotal = 0;
    let discount = 0;
    let discountedSubtotal = 0;
    cart.forEach(product => {
        const qty = Number(product.qty);
        const price = Number(product.price);
        const discountPercent = Number(product.discount);
        const validQty = isNaN(qty) || qty < 1 ? 1 : qty;
        const validPrice = isNaN(price) || price < 0 ? 0 : price;
        const validDiscount = isNaN(discountPercent) || discountPercent < 0 ? 0 : discountPercent;

        subtotal += validPrice * validQty;
        let productDiscount = 0;
        let discountedPrice = validPrice;
        if (validDiscount > 0) {
            productDiscount = (validPrice * validDiscount) / 100;
            discountedPrice = validPrice - productDiscount;
            discount += productDiscount * validQty;
        }
        discountedSubtotal += discountedPrice * validQty;
    });
    let tax = discountedSubtotal * 0.10;
    let total = discountedSubtotal + tax;

    // Update only the values in summary section
    const summarySection = document.querySelector('.js-summary-section');
    if (summarySection) {
        const subtotalSpan = summarySection.querySelector('.value.subtotal');
        const discountSpan = summarySection.querySelector('.value.discount');
        const taxSpan = summarySection.querySelector('.value.tax');
        const totalSpan = summarySection.querySelector('.value.total');
        if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        if (discountSpan) discountSpan.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : `$0.00`;
        if (taxSpan) taxSpan.textContent = `+$${tax.toFixed(2)}`;
        if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
    }

    if (cart.length === 0) {
        cartItemsWrapper.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        // Use product.qty or default to 1
        const qty = Number(product.qty) || 1;
        const price = Number(product.price) || 0;
        const discountPercent = Number(product.discount) || 0;
        let productDiscount = 0;
        let discountedPrice = price;
        let discountSpan = '';
        if (discountPercent > 0) {
            productDiscount = (price * discountPercent) / 100;
            discountedPrice = price - productDiscount;
            discountSpan = `<span class="discount-info" style="color:#e53935;font-size:0.95em;margin-left:8px;">${discountPercent}% off</span>`;
        }
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

        // Remove button functionality
        item.querySelector('.remove').addEventListener('click', () => {
            removeFromCart(product.id);
        });

        // Quantity change functionality
        const qtySelect = item.querySelector('.qty-select');
        qtySelect.addEventListener('change', (e) => {
            const newQty = parseInt(e.target.value, 10);
            product.qty = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Re-render to update summary
        });

        // Wishlist button functionality
        const wishlistBtn = item.querySelector('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                // Avoid duplicates
                if (!saveForLater.some(p => p.id === product.id)) {
                    saveForLater.push(product);
                    localStorage.setItem('saveForLater', JSON.stringify(saveForLater));
                    renderSavedForLater();
                }
            });
        }

        // Save for later button functionality
        const saveBtn = item.querySelector('.save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Remove from cart (global array)
                const idx = cart.findIndex(p => p.id === product.id);
                if (idx !== -1) {
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                // Add to saveForLater if not already there
                if (!saveForLater.some(p => p.id === product.id)) {
                    saveForLater.push(product);
                    localStorage.setItem('saveForLater', JSON.stringify(saveForLater));
                }
                renderCart();
                renderSavedForLater();
            });
        }
    });
}

function removeFromCart(id) {
    const idx = cart.findIndex(p => p.id === id);
    if (idx !== -1) {
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    renderCart();
}   

// Render cart and saved for later on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderSavedForLater();
    setupCartFooterActions();
});