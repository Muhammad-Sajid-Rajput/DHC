
# DHC E-Commerce Cart Project

This project is a modern e-commerce cart web application. Users can browse products, view detailed product information, add items to their cart, and save products for later. The application is built using HTML, CSS, and JavaScript, with all cart and wishlist data stored in the browser's localStorage for persistence.

## Features
- Product listing with grid and list views
- Product detail page with dynamic info and price tiers
- Add products to cart
- Save products for later (wishlist) from both grid and details sidebar
- Remove products from cart
- Update product quantity in cart
- Cart summary: subtotal, discount, tax, total
- Pagination for product grid
- Responsive UI and modern design
- Persistent cart and wishlist using localStorage

## Project Structure
```
├── details.html           # Product detail page
├── footer.html            # Footer partial
├── header.html            # Header partial
├── Home.html              # Home page
├── search.html            # Product search & grid page
├── web-cart.html          # Cart page
├── Images/
│   ├── banner/            # Banner images
│   ├── extra-services/    # Service illustrations
│   ├── icons/             # UI icons
│   ├── products/          # Product images
│   └── ratings/           # Ratings images
├── scripts/
│   ├── cart.js            # Cart logic
│   ├── deals-promos.js    # Deals and promotions
│   ├── details.js         # Product detail logic (now supports save for later via sidebar)
│   ├── grid-list.js       # Product grid, pagination, and wishlist logic
│   ├── recommended-services-suppliers.js
│   ├── trending-items.js
│   ├── web-cart.js        # Cart page logic
│   └── utils/
├── styles/
│   ├── cart.css
│   ├── details.css
│   ├── footer.css
│   ├── general.css
│   ├── grid-list.css      # Supports pagination and grid/list views
│   ├── header.css
│   ├── promo-and-deals.css
│   ├── quote-recommended-services.css
│   ├── supplier-newsletter.css
│   └── trending-items.css
```

## How It Works
- **Product Grid**: Browse products with pagination and switch between grid/list views. Add products to wishlist directly from the grid.
- **Product Details**: View detailed info, price tiers, and seller info. Add to cart or "Save for later" using the sidebar heart icon.
- **Cart**: Manage cart items, update quantities, remove items, and see a summary with discounts and tax.
- **Wishlist (Save for Later)**: Products can be saved for later from both the grid and details page. Saved items persist in localStorage.

## Usage
- **Add to Cart**: Click "Add to cart" on product details.
- **Save for Later**: Click the heart icon or "Save for later" in the sidebar on details page, or wishlist button in the grid.
- **Pagination**: Use the dropdown and page numbers to browse products.
- **Remove/Update**: Manage cart and wishlist from the cart page.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API

## Customization
- Add new products in `scripts/utils/products.js`.
- Update styles in the `styles/` folder.
- Extend features by editing scripts in the `scripts/` folder.

## License
This project is for educational and demonstration purposes. You may modify and use it as needed.

## Author
Muhammad Sajid

---
Feel free to contribute or suggest improvements!
