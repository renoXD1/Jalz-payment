// ========== Load Config ==========
async function loadConfig() {
  try {
    const res = await fetch('config.json');
    const cfg = await res.json();

    // Terapkan background
    document.body.style.background = cfg.background || "linear-gradient(135deg,#0f172a,#1e293b)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    // Terapkan warna utama
    if (cfg.accent) {
      document.documentElement.style.setProperty('--accent', cfg.accent);
    }

    // Update nama toko
    const storeNameEl = document.getElementById('store-name');
    if (storeNameEl && cfg.storeName) {
      storeNameEl.textContent = cfg.storeName;
    }

    // Update tagline
    const taglineEl = document.getElementById('hero-sub');
    if (taglineEl && cfg.tagline) {
      taglineEl.textContent = cfg.tagline;
    }
  } catch (err) {
    console.error("Gagal load config.json:", err);
  }
}

// ========== Load Products ==========
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    const products = await res.json();
    const container = document.getElementById('product-list');

    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = "product-card";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-img" />
        <h3>${p.name}</h3>
        <p class="price">Rp ${p.price.toLocaleString()}</p>
        <button class="btn-primary">Pesan</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Gagal load products.json:", err);
  }
}

// ========== Init ==========
document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  loadProducts();
});
