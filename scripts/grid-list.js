import { products } from './utils/recommeded-items.js';

const searchBtn = document.getElementById("searchBtn");
const mainContent = document.getElementById("container");

searchBtn.addEventListener("click", () => {
  // Push to history so back button works
  history.pushState({ search: true }, "", "#search");
  renderSearchLayout();
  populateProducts();
  setupViewToggle();
});

// Restore layout on back/forward browser navigation
window.onpopstate = (event) => {
  if (!event.state || !event.state.search) {
    // If no state or not search page, reload main format
    location.reload();
  } else {
    renderSearchLayout();
    populateProducts();
    setupViewToggle();
  }
};

function renderSearchLayout() {
  mainContent.innerHTML = `
    <main class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Home</a> &gt;
        <a href="#">Clothing</a> &gt;
        <a href="#">Men’s wear</a> &gt;
        <span>Summer clothing</span>
      </nav>

      <div class="main-content">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="filter-group">
            <h4>Category</h4>
            <ul>
              <li>Mobile accessory</li>
              <li>Electronics</li>
              <li>Smartphones</li>
              <li>Modern tech</li>
              <li class="see-all">See all</li>
            </ul>
          </div>

          <div class="filter-group">
            <h4>Brands</h4>
            <label><input type="checkbox"> Samsung</label>
            <label><input type="checkbox"> Apple</label>
            <label><input type="checkbox"> Huawei</label>
            <label><input type="checkbox"> Poco</label>
            <label><input type="checkbox"> Lenovo</label>
            <label class="see-all">See all</label>
          </div>

          <div class="filter-group">
            <h4>Features</h4>
            <label><input type="checkbox"> Metallic</label>
            <label><input type="checkbox"> Plastic cover</label>
            <label><input type="checkbox"> 8GB Ram</label>
            <label><input type="checkbox"> Super power</label>
            <label><input type="checkbox"> Large Memory</label>
          </div>

          <div class="filter-group">
            <h4>Price range</h4>
            <input type="range">
            <div class="range-inputs">
              <input type="number" placeholder="Min">
              <input type="number" placeholder="Max">
            </div>
          </div>

          <div class="filter-group">
            <h4>Condition</h4>
            <label><input type="radio" name="condition"> Any</label>
            <label><input type="radio" name="condition"> Refurbished</label>
            <label><input type="radio" name="condition"> Brand new</label>
            <label><input type="radio" name="condition"> Old items</label>
          </div>

          <div class="filter-group">
            <h4>Ratings</h4>
            <label><input type="checkbox"> ⭐⭐⭐⭐⭐</label>
            <label><input type="checkbox"> ⭐⭐⭐⭐</label>
            <label><input type="checkbox"> ⭐⭐⭐</label>
          </div>
        </aside>

        <!-- Right side: Top Bar + Product List -->
        <div class="right-content">
          <div class="top-bar">
            <div class="items-count">12,911 items in <strong>Mobile accessory</strong></div>
            <div class="top-controls">
              <label><input type="checkbox" checked> Verified only</label>
              <select class="sort-by">
                <option>Featured</option>
                <option>Price: Low to High</option>
              </select>
              <div class="icons">
                <div class="view-icons active-view">
                  <span class="iconify" data-icon="foundation:list"></span>
                </div>
                <div class="view-icons">
                  <span class="iconify" data-icon="rivet-icons:grid"></span>
                </div>
              </div>
            </div>
          </div>

          <section class="product-list js-product-list"></section>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <label>Show
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </label>
        <div class="pages">
          <span class="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>→</span>
        </div>
      </div>
    </main>`;
}

function populateProducts() {
  const productList = document.querySelector('.js-product-list');
  products.forEach(product => {
    const html = `
      <div class="products">
        <img src="${product.img}" alt="${product.alt}">
        <div class="product-info">
          <h3>${product.title}</h3>
          <div class="price-row">
            <span class="price">${product.price}</span>
            <span class="old-price">${product.oldPrice}</span>
          </div>
          <div class="meta">${product.rating} · ${product.orders} · <span class="green">${product.shipping}</span></div>
          <p class="desc">${product.desc}</p>
          <a href="#" class="details">View details</a>
        </div>
        <button class="wishlist-btn">
          <span class="iconify" data-icon="mdi:heart-outline"></span>
        </button>
      </div>`;
    productList.insertAdjacentHTML('beforeend', html);
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