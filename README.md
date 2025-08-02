# DHC E-Commerce Cart Project

This project is a simple e-commerce cart web application. It allows users to browse products, add them to a shopping cart, save items for later, and manage their cart before checkout. The project is built using HTML, CSS, and JavaScript, with a focus on client-side functionality and localStorage for persistence.

## Features
- Product listing and search
- Add/remove products from cart
- Update product quantity in cart
- Save products for later
- Cart summary with subtotal, discount, tax, and total
- Responsive UI with modern design
- Persistent cart and saved items using localStorage

## Project Structure
```
├── details.html
├── footer.html
├── header.html
├── Home.html
├── search.html
├── web-cart.html
├── Images/
│   ├── clothing-size-chart.png
│   ├── banner/
│   ├── extra-services/
│   ├── icons/
│   ├── products/
│   └── ratings/
├── scripts/
│   ├── cart.js
│   ├── deals-promos.js
│   ├── details.js
│   ├── grid-list.js
│   ├── recommended-services-suppliers.js
│   ├── trending-items.js
│   ├── web-cart.js
│   └── utils/
├── styles/
│   ├── cart.css
│   ├── details.css
│   ├── footer.css
│   ├── general.css
│   ├── grid-list.css
│   ├── header.css
│   ├── promo-and-deals.css
│   ├── quote-recommended-services.css
│   └── supplier-newsletter.css
│   └── trending-items.css
```

## How It Works
- **HTML files**: Define the structure of the main pages (home, cart, search, details, etc.).
- **CSS files**: Provide styling for the cart, product grid, header, footer, and other UI components.
- **JavaScript files**: Handle cart logic, product management, deals/promos, and UI interactions. The main cart logic is in `scripts/web-cart.js`.
- **Images**: Product images, icons, banners, and service illustrations.

## Getting Started
1. Clone or download the repository.
2. Open `Home.html` or `search.html` in your browser to start browsing products.
3. Add products to your cart and manage them via `web-cart.html`.

## Usage
- **Add to Cart**: Browse products and click 'Add to Cart'.
- **Remove from Cart**: Click 'Remove' in the cart view.
- **Update Quantity**: Use the quantity dropdown in the cart.
- **Save for Later**: Click 'Save for later' to move items out of the cart.
- **Move to Cart**: In the 'Saved for later' section, click 'Move to cart'.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API

## Customization
- Add new products by updating the product data in `cart.js` or related scripts.
- Update styles in the `styles/` folder for a custom look.
- Extend functionality by adding new scripts or modifying existing ones.

## License
This project is for educational and demonstration purposes. You may modify and use it as needed.

## Author
Muhammad Sajid

---
Feel free to contribute or suggest improvements!
