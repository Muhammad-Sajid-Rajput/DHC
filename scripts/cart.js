// Array to store products saved for later
export let saveForLater = [];

// Simple cart implementation using localStorage
export let cart = [];

// Load cart from localStorage if exists
const storedCart = localStorage.getItem('cart');
if (storedCart) {
  try {
    cart = JSON.parse(storedCart);
  } catch (e) {
    cart = [];
  }
}

// Load saveForLater from localStorage
const storedSaved = localStorage.getItem('saveForLater');
if (storedSaved) {
  try {
    saveForLater = JSON.parse(storedSaved);
  } catch (e) {
    saveForLater = [];
  }
}

// Save to localStorage helpers
function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateSavedStorage() {
  localStorage.setItem('saveForLater', JSON.stringify(saveForLater));
}

// Add product to cart
export function addToCart(product) {
  cart.push(product);
  updateCartStorage();
}

// Remove product from cart
export function removeFromCart(id) {
  const idx = cart.findIndex(p => p.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    updateCartStorage();
  }
}

// Update product quantity
export function updateCartQty(id, qty) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty = qty;
    updateCartStorage();
  }
}

// Save item for later
export function moveToSaveForLater(product) {
  // Remove from cart
  removeFromCart(product.id);
  // Add if not already saved
  if (!saveForLater.some(p => p.id === product.id)) {
    saveForLater.push(product);
    updateSavedStorage();
  }
}

// Move back from saved to cart
export function moveToCartFromSaved(product) {
  const idx = saveForLater.findIndex(p => p.id === product.id);
  if (idx !== -1) {
    saveForLater.splice(idx, 1);
    updateSavedStorage();
  }
  if (!cart.some(p => p.id === product.id)) {
    cart.push(product);
    updateCartStorage();
  }
}

// Remove directly from Saved for Later
export function removeFromSaved(id) {
  const idx = saveForLater.findIndex(p => p.id === id);
  if (idx !== -1) {
    saveForLater.splice(idx, 1);
    updateSavedStorage();
  }
}

// Clear cart
export function clearCart() {
  cart.length = 0;
  updateCartStorage();
}
