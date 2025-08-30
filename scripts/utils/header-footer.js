document.addEventListener('DOMContentLoaded', function() {
  // Inject Header
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // Add search button redirect AFTER header is loaded
      const searchBtn = document.getElementById('searchBtn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          window.location.href = 'search.html';
        });
      }

      // My Cart redirect
      const cartListItem = Array.from(document.querySelectorAll('.top-menu li')).find(li => {
        return li.textContent.trim().toLowerCase().includes('my cart');
      });
      if (cartListItem) {
        cartListItem.style.cursor = 'pointer';
        cartListItem.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'web-cart.html';
        });
      }

      // Sidebar toggle
      const hamburger = document.querySelector('.hambuger');
      const sidebar = document.querySelector('.sidebar');
      const closeBtn = document.querySelector('.sidebar .close-btn');
      const overlay = document.querySelector('.overlay');

      if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', () => {
          sidebar.classList.add('active');
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // disable scroll
        });
      }

      if (closeBtn && sidebar && overlay) {
        closeBtn.addEventListener('click', () => {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = ''; // enable scroll
        });
      }

      // Close sidebar when clicking outside (overlay)
      if (overlay) {
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });

  // Inject Footer
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});
