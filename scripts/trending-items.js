const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    categoryButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
  });
});
