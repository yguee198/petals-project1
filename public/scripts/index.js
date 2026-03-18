lucide.createIcons();

// Plant Products Data
const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "indoor",
    price: 450000,
    image: "../assets/image_assets/download (31).jpg",
    description: "Beautiful split-leaf philodendron, perfect for indoor spaces",
    care: "Medium light, water weekly",
  },
  {
    id: 2,
    name: "Snake Plant",
    category: "indoor",
    price: 180000,
    image: "../assets/image_assets/download (32).jpg",
    description: "Low maintenance air purifying plant",
    care: "Low light, water bi-weekly",
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    category: "indoor",
    price: 520000,
    image: "../assets/image_assets/download (33).jpg",
    description: "Statement plant with large glossy leaves",
    care: "Bright indirect light, water weekly",
  },
  {
    id: 4,
    name: "Pothos Golden",
    category: "indoor",
    price: 150000,
    image: "../assets/image_assets/download (34).jpg",
    description: "Easy-care trailing vine plant",
    care: "Low to medium light, water weekly",
  },
  {
    id: 5,
    name: "Peace Lily",
    category: "flowering",
    price: 220000,
    image: "../assets/image_assets/download (35).jpg",
    description: "Elegant white flowering plant",
    care: "Low to medium light, keep moist",
  },
  {
    id: 6,
    name: "Succulent Mix",
    category: "succulents",
    price: 95000,
    image: "../assets/image_assets/download (36).jpg",
    description: "Variety of colorful succulents",
    care: "Bright light, water sparingly",
  },
  {
    id: 7,
    name: "Rubber Plant",
    category: "indoor",
    price: 380000,
    image: "../assets/image_assets/download (37).jpg",
    description: "Bold burgundy foliage plant",
    care: "Bright indirect light, water weekly",
  },
  {
    id: 8,
    name: "Bird of Paradise",
    category: "indoor",
    price: 650000,
    image: "../assets/image_assets/download (38).jpg",
    description: "Tropical plant with dramatic leaves",
    care: "Bright light, water regularly",
  },
  {
    id: 9,
    name: "ZZ Plant",
    category: "indoor",
    price: 280000,
    image: "../assets/image_assets/download (39).jpg",
    description: "Nearly indestructible houseplant",
    care: "Low light tolerant, water monthly",
  },
  {
    id: 10,
    name: "Aloe Vera",
    category: "succulents",
    price: 120000,
    image: "../assets/image_assets/download (40).jpg",
    description: "Medicinal succulent plant",
    care: "Bright light, water sparingly",
  },
  {
    id: 11,
    name: "Spider Plant",
    category: "indoor",
    price: 140000,
    image: "../assets/image_assets/download (41).jpg",
    description: "Air purifying hanging plant",
    care: "Indirect light, water regularly",
  },
  {
    id: 12,
    name: "Chinese Money Plant",
    category: "indoor",
    price: 190000,
    image: "../assets/image_assets/download (42).jpg",
    description: "Unique coin-shaped leaves",
    care: "Bright indirect light, water weekly",
  },
];

let product_list = document.getElementById("product-list");

function mapDataIntoDiv(data) {
  product_list.innerHTML = "";
  data.forEach((item) => {
    let div = document.createElement("div");
    div.className = "border border-white/50 rounded-xl p-3";
    div.innerHTML = `
    <div>
    <h1 class="text-white">${item.name}</h1>
    </div>
    <div>
    <h1 class="text-white">${item.category}</h1>
    </div>
    <div>
    <h1 class="text-white">${item.price}</h1>
    </div>
    <button class="text-white bg-green-600 p-3 rounded cursor-pointer" onclick='handleAddToCart(${item.id})'>add to cart</button>
    `;
    product_list.appendChild(div);
  });
}
mapDataIntoDiv(plants);

let search_filter = document.getElementById("search");
let category_filter = document.getElementById("category-filter");
let price_filter = document.getElementById("price-filter");

search_filter.addEventListener("input", applyFilters);
category_filter.addEventListener("change", applyFilters);
price_filter.addEventListener("change", applyFilters);

function applyFilters() {
  let search_input = search_filter.value.toLowerCase();
  let category = category_filter.value;
  let priceRange = price_filter.value;

  let filtered_value = plants.filter((item) => {
    // search

    let search_match =
      search_input == "" ||
      item.name.toLowerCase().includes(search_input) ||
      item.category.toLowerCase().includes(search_input);

    // category
    let category_match = category == "all" || item.category == category;

    // price
    let price_match = true;
    if (priceRange !== "all") {
      if (priceRange === "0-200") {
        price_match = item.price < 200000;
      } else if (priceRange === "200-400") {
        price_match = item.price >= 200000 && item.price < 400000;
      } else if (priceRange === "400-600") {
        price_match = item.price >= 400000 && item.price < 600000;
      } else if (priceRange === "600+") {
        price_match = item.price >= 600000;
      }
    }
    return search_match && category_match && price_match;
  });
  mapDataIntoDiv(filtered_value);
}
const local_storage = document.getElementById("cart");

// utility functions
const CART_KEY = "cart_data";

function getCart() {
  return (
    JSON.parse(localStorage.getItem(CART_KEY)) || {
      items: [],
      totalQuantity: 0,
    }
  );
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  document.getElementById("cart").innerText = cart.totalQuantity;
}

function handleAddToCart(productId) {
  const cart = getCart();

  const product = plants.find((p) => p.id === productId);
  if (!product) return;

  // Check if product already exists in cart
  const existingItem = cart.items.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  cart.totalQuantity += 1;

  saveCart(cart);
  updateCartBadge();

  console.log("Cart updated:", cart);
}

