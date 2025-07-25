const searchBtn = document.getElementById("searchBtn");
const mainContent = document.querySelector(".js-main-content");
const productData = [
  {
    img: "Images/products/Smart-Mobile-Phone.avif",
    alt: "Smartphone",
    title: "Canon Camera EOS 2000, Black 10x zoom",
    price: "$998.00",
    oldPrice: "$1128.00",
    rating: "⭐ 7.5",
    orders: "154 orders",
    shipping: "Free Shipping",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit..."
  },
  {
    img: "Images/products/Smart-Mobile-Phone.avif",
    alt: "Smartphone 2",
    title: "Samsung Galaxy Z Flip 5",
    price: "$999.00",
    oldPrice: "$1199.00",
    rating: "⭐ 8.2",
    orders: "231 orders",
    shipping: "Free Shipping",
    desc: "Latest foldable phone with innovative design and durability."
  },
  // Add more products as needed
];


searchBtn.addEventListener("click", () => {
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
            <select>
              <option>Featured</option>
              <option>Price: Low to High</option>
            </select>
            <div class="view-icons">
              <span class="iconify" data-icon="mdi:view-list"></span>
              <span class="iconify" data-icon="mdi:grid"></span>
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
  </main>
  `;

  // Populate product cards
  const productList = document.querySelector('.js-product-list');

  productData.forEach(product => {
    const html = `
  <div class="product-card">
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

});