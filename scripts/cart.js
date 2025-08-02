// Array to store products saved for later
export const saveForLater = [];
// cart.js
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

// Add product to cart
export function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
}
