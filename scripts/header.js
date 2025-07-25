window.addEventListener("DOMContentLoaded", function () {
    // HEADER

    const header = document.querySelector(".js-header");

    const headerContainer = document.createElement("div");
    headerContainer.className = "header-container";

    const logo = document.createElement("div");
    logo.className = "logo";

    const logoIcon = document.createElement("iconify-icon");
    logoIcon.setAttribute("icon", "mdi:shopping-outline");
    logoIcon.setAttribute("width", "40");
    logoIcon.setAttribute("height", "40");
    logoIcon.style.color = "#fe5300";

    const logoText = document.createElement("span");
    logoText.textContent = "Brand";
    logo.append(logoIcon, logoText);

    const searchBar = document.createElement("div");
    searchBar.className = "search-bar";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search...";

    const categorySelect = document.createElement("select");
    categorySelect.id = "categorySelect";

    const options = [
        { value: "all", text: "All Categories" },
        { value: "kitchenware", text: "Kitchenware" },
        { value: "tableware", text: "Tableware" },
        { value: "clothing", text: "Clothing" },
        { value: "footwear", text: "Footwear" },
        { value: "accessories", text: "Accessories" },
        { value: "home-textiles", text: "Home Textiles" },
        { value: "appliances", text: "Home Appliances" },
        { value: "jewelry", text: "Jewelry" },
        { value: "misc", text: "Miscellaneous" }
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        categorySelect.appendChild(option);
    });

    const searchBtn = document.createElement("button");
    searchBtn.id = "searchBtn";
    searchBtn.textContent = "Search";

    searchBar.append(searchInput, categorySelect, searchBtn);

    const topMenu = document.createElement("nav");
    topMenu.className = "top-menu";

    const topMenuList = document.createElement("ul");
    const topMenuItems = [
        { icon: "mdi:account-circle", text: "Profile" },
        { icon: "mdi:message-text", text: "Message" },
        { icon: "mdi:clipboard-list", text: "Orders" },
        { icon: "mdi:cart", text: "My Cart" }
    ];

    topMenuItems.forEach(item => {
        const li = document.createElement("li");
        const icon = document.createElement("iconify-icon");
        icon.setAttribute("icon", item.icon);
        icon.setAttribute("width", "20");
        li.append(icon, ` ${item.text}`);
        topMenuList.appendChild(li);
    });

    topMenu.appendChild(topMenuList);
    headerContainer.append(logo, searchBar, topMenu);
    header.appendChild(headerContainer);

    // SECONDARY MENU

    const secondaryMenu = document.querySelector(".js-secondary-menu");
    const secondaryMenuContainer = document.createElement("div");
    secondaryMenuContainer.className = "secondary-menu-container";

    const secondaryMenuLinks = document.createElement("div");
    secondaryMenuLinks.className = "secondary-menu-links";

    const secondaryLinks = ["Hot offers", "Gift boxes", "Menu items"];
    secondaryLinks.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item;
        secondaryMenuLinks.appendChild(span);
    });

    const secondaryMenuSelect = document.createElement("div");
    secondaryMenuSelect.className = "secondary-menu-select";

    const shipTo = document.createElement("span");
    shipTo.textContent = "Ship to";

    const countrySelect = document.createElement("select");
    countrySelect.id = "countrySelect";

    const countries = [
        { value: "pk", text: "Pakistan" },
        { value: "us", text: "United States" },
        { value: "uk", text: "United Kingdom" },
        { value: "ca", text: "Canada" },
        { value: "au", text: "Australia" },
        { value: "ae", text: "United Arab Emirates" },
        { value: "in", text: "India" },
        { value: "de", text: "Germany" },
        { value: "fr", text: "France" },
        { value: "sa", text: "Saudi Arabia" }
    ];

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.value;
        option.textContent = country.text;
        countrySelect.appendChild(option);
    });

    secondaryMenuSelect.append(shipTo, countrySelect);
    secondaryMenuContainer.append(secondaryMenuLinks, secondaryMenuSelect);
    secondaryMenu.appendChild(secondaryMenuContainer);

});
