import { categories } from './utils/categories.js';


const trendingWrapper = document.querySelector(".js-trending-wrapper");

// Left Column: Categories
const trendingCategories = document.createElement("div");
trendingCategories.className = "trending-categories";

categories.forEach((text, index) => {
  const btn = document.createElement("button");
  btn.className = "category-btn";
  if (index === 0) btn.classList.add("active");
  btn.textContent = text;
  trendingCategories.appendChild(btn);
});

// Center Column: Banner
const trendingBanner = document.createElement("div");
trendingBanner.className = "trending-banner";

const bannerOverlay = document.createElement("div");
bannerOverlay.className = "banner-overlay";

const bannerHeading = document.createElement("h2");
bannerHeading.innerHTML = `Latest trending <br><strong>Electronic items</strong>`;

const learnMoreBtn = document.createElement("button");
learnMoreBtn.textContent = "Learn more";

bannerOverlay.append(bannerHeading, learnMoreBtn);
trendingBanner.appendChild(bannerOverlay);


// Right Column: User + Promotions
const trendingUser = document.createElement("div");
trendingUser.className = "trending-user";

// User Box
const userBox = document.createElement("div");
userBox.className = "user-box";

const userIcon = document.createElement("iconify-icon");
userIcon.setAttribute("icon", "ic:round-account-circle");
userIcon.setAttribute("width", "40");
userIcon.setAttribute("height", "40");

const userText = document.createElement("p");
userText.innerHTML = `Hi, user<br><span class="subtext">let’s get started</span>`;

const joinBtn = document.createElement("button");
joinBtn.className = "btn-blue";
joinBtn.textContent = "Join now";

const loginBtn = document.createElement("button");
loginBtn.className = "btn-white";
loginBtn.textContent = "Log in";

userBox.append(userIcon, userText, joinBtn, loginBtn);

// Promo Boxes
const promoBox1 = document.createElement("div");
promoBox1.className = "promo-box orange";
promoBox1.innerHTML = `<p>Get US $10 off with a new supplier</p>`;

const promoBox2 = document.createElement("div");
promoBox2.className = "promo-box teal";
promoBox2.innerHTML = `<p>Send quotes with supplier preferences</p>`;

trendingUser.append(userBox, promoBox1, promoBox2);

// Combine all
trendingWrapper.append(trendingCategories, trendingBanner, trendingUser);