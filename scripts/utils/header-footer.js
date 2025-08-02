
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

      // Add My Cart redirect
      // Find the My Cart <li> by text or icon
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
    });

  // Inject Footer
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});
