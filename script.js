document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products");
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const cartContent = document.querySelector(".cart-content");
  const closeCart = document.createElement("span");

  let cart = [];

  // Tombol X di modal keranjang
  closeCart.innerHTML = "&times;";
  closeCart.style.cursor = "pointer";
  closeCart.style.float = "right";
  closeCart.style.fontSize = "20px";
  cartContent.prepend(closeCart);

  // Fetch products.json
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data);
    })
    .catch((err) => console.error("Gagal load products.json:", err));

  // Render produk per kategori
  function renderProducts(data) {
    productsContainer.innerHTML = "";
    for (const category in data) {
      const section = document.createElement("div");
      section.classList.add("category");

      const title = document.createElement("h3");
      title.textContent = category;
      section.appendChild(title);

      const list = document.createElement("div");
      list.classList.add("product-list");

      data[category].forEach((item) => {
        const product = document.createElement("div");
        product.classList.add("product");

        product.innerHTML = `
          <h4>${item.name}</h4>
          <p>Rp ${item.price.toLocaleString()}</p>
          <button>Tambah ke Keranjang</button>
        `;

        product.querySelector("button").addEventListener("click", () => {
          addToCart(item);
        });

        list.appendChild(product);
      });

      section.appendChild(list);
      productsContainer.appendChild(section);
    }
  }

  // Tambah ke keranjang
  function addToCart(item) {
    cart.push(item);
    updateCartButton();
    alert(`${item.name} ditambahkan ke keranjang!`);
  }

  // Update teks tombol keranjang
  function updateCartButton() {
    cartButton.textContent = `Keranjang (${cart.length})`;
  }

  // Tampilkan isi keranjang
  function showCart() {
    let total = 0;
    let itemsHtml = "<ul style='text-align:left; margin-bottom:15px;'>";

    cart.forEach((item) => {
      total += item.price;
      itemsHtml += `<li>${item.name} - Rp ${item.price.toLocaleString()}</li>`;
    });

    itemsHtml += "</ul>";
    cartContent.innerHTML = `
      <span id="close-cart" style="cursor:pointer;float:right;font-size:20px;">&times;</span>
      <h3>Keranjang</h3>
      ${itemsHtml}
      <p><b>Total:</b> Rp ${total.toLocaleString()}</p>
      <button>Checkout</button>
    `;

    cartModal.style.display = "flex";

    // Close button
    document.getElementById("close-cart").addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  }

  // Klik tombol keranjang
  cartButton.addEventListener("click", () => {
    showCart();
  });

  // Tutup modal jika klik di luar konten
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
});
