let productsData = {};
let cart = [];

// Load products.json
async function loadProducts() {
  try {
    const res = await fetch("products.json");
    productsData = await res.json();

    // Default tampil kategori pertama (misalnya Leveling)
    const defaultCategory = Object.keys(productsData)[0];
    renderCategory(defaultCategory);
  } catch (err) {
    console.error("Gagal load products.json", err);
  }
}

// Render produk per kategori
function renderCategory(category) {
  const container = document.getElementById("product-list");
  const title = document.getElementById("category-title");

  container.innerHTML = "";
  title.textContent = category;

  if (!productsData[category]) {
    container.innerHTML = "<p>Tidak ada produk di kategori ini.</p>";
    return;
  }

  productsData[category].forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString()}</p>
      <button class="btn-primary" onclick="addToCart('${category}', '${product.name}')">
        Tambah ke Keranjang
      </button>
    `;
    container.appendChild(card);
  });
}

// Tambah ke keranjang
function addToCart(category, productName) {
  const product = productsData[category].find(p => p.name === productName);
  if (!product) return;

  cart.push(product);
  updateCart();
}

// Update tampilan keranjang
function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toLocaleString();
}

// Toggle menu kategori (hamburger)
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

// Klik kategori di menu
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const category = e.target.dataset.category;
    renderCategory(category);

    // Tutup menu setelah pilih kategori
    document.getElementById("menu").classList.add("hidden");
  });
});

// Modal keranjang
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("hidden");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.add("hidden");
});

// Load awal
loadProducts();
