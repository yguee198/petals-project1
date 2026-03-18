// Shared app utilities for Petal storefront
(function () {
  const defaultPlants = [
    {
      id: 30,
      name: "Monstera #30",
      category: "indoor",
      price: 150000,
      description: "Default plant",
      image: "./assets/image_assets/download (30).jpg",
    },
    {
      id: 31,
      name: "Snake Plant #31",
      category: "indoor",
      price: 120000,
      description: "Default plant",
      image: "./assets/image_assets/download (31).jpg",
    },
  ];

  function ensurePlants() {
    if (!localStorage.getItem("petalPlants")) {
      localStorage.setItem("petalPlants", JSON.stringify(defaultPlants));
    }
  }

  function getPlants() {
    return JSON.parse(localStorage.getItem("petalPlants")) || [];
  }

  function savePlants(plants) {
    localStorage.setItem("petalPlants", JSON.stringify(plants));
  }

  function getUsers() {
    return (
      JSON.parse(localStorage.getItem("petalUsers")) || [
        {
          id: Date.now(),
          email: "admin@petal.com",
          pass: "admin123",
          role: "admin",
          name: "Admin Jonathan",
        },
      ]
    );
  }

  function saveUsers(users) {
    localStorage.setItem("petalUsers", JSON.stringify(users));
  }

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  }

  function setCurrentUser(user) {
    if (user === null) localStorage.removeItem("currentUser");
    else localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function getCart() {
    const user = getCurrentUser();
    if (user) return user.cart || [];
    return JSON.parse(localStorage.getItem("plantCart")) || [];
  }

  function setCart(cart) {
    localStorage.setItem("plantCart", JSON.stringify(cart));
    try {
      const user = getCurrentUser();
      if (user) {
        user.cart = cart;
        const users = getUsers();
        const idx = users.findIndex((u) => u.email === user.email);
        if (idx !== -1) {
          users[idx] = user;
          saveUsers(users);
        }
        setCurrentUser(user);
      }
    } catch (e) {}
    updateCartBadge();
  }

  function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((s, i) => s + (i.quantity || 0), 0);
    ["cart-count", "cart"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = count;
        el.classList.toggle("hidden", count === 0);
      }
    });
  }

  function formatPrice(n) {
    if (typeof n !== "number") return n;
    return `Rp ${n.toLocaleString()}`;
  }

  // expose utilities
  window.petalApp = {
    ensurePlants,
    getPlants,
    savePlants,
    getUsers,
    saveUsers,
    getCurrentUser,
    setCurrentUser,
    getCart,
    setCart,
    updateCartBadge,
    formatPrice,
  };

  document.addEventListener("DOMContentLoaded", () => {
    ensurePlants();
    updateCartBadge();
  });
})();
