const state = { cart: {} };
let products = [];
let config = { storeName: 'JULIANJOKI', heroImage: '', heroSub: '' };

async function loadData(){
  try{
    const [cRes,pRes] = await Promise.all([fetch('config.json'), fetch('products.json')]);
    if(cRes.ok) config = await cRes.json();
    if(pRes.ok) products = await pRes.json();
  }catch(e){ console.error('Gagal memuat data:', e) }
  applyConfig();
  renderProducts();
  updateCartCount();
}

function applyConfig(){
  document.getElementById('store-name').textContent = config.storeName || 'JULIANJOKI';
  document.getElementById('hero-sub').textContent = config.heroSub || 'Jasa joki game Roblox — aman, cepat';
  const hero = document.getElementById('hero');
  if(config.heroImage) hero.style.backgroundImage = `url(${config.heroImage})`;
}

function formatPrice(v){ return v.toFixed(2).replace('.',',') }

function renderProducts(){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">Rp ${formatPrice(p.price)}</div>
      <div class="actions">
        <button class="btn-primary" data-id="${p.id}" ${p.available?'' : 'disabled'}>${p.available ? 'Tambah ke Keranjang' : 'Habis'}</button>
        <button class="btn-outline" data-id="${p.id}" data-action="details">Detail</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function updateCartCount(){
  const count = Object.values(state.cart).reduce((s,n)=>s+n,0);
  document.getElementById('cart-count').textContent = count;
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p || !p.available) return alert('Layanan tidak tersedia');
  state.cart[id] = (state.cart[id]||0) + 1;
  updateCartCount();
}

function openCart(){ renderCartItems(); document.getElementById('cart-modal').classList.remove('hidden') }
function closeCart(){ document.getElementById('cart-modal').classList.add('hidden') }

function renderCartItems(){
  const ul = document.getElementById('cart-items'); ul.innerHTML = '';
  let total = 0;
  for(const id in state.cart){
    const qty = state.cart[id]; const p = products.find(x=>x.id===id); if(!p) continue;
    total += p.price * qty;
    const li = document.createElement('li'); li.textContent = `${p.name} × ${qty} — Rp ${formatPrice(p.price * qty)}`;
    ul.appendChild(li);
  }
  document.getElementById('cart-total').textContent = formatPrice(total);
}

function checkoutDemo(){
  document.getElementById('checkout-note').classList.remove('hidden');
  alert('Ini demo checkout. Lihat README untuk cara menghubungkan pembayaran.');
}

document.addEventListener('click',(e)=>{
  if(e.target.matches('.btn-primary')) addToCart(e.target.dataset.id);
  else if(e.target.id === 'cart-btn') openCart();
  else if(e.target.id === 'close-cart') closeCart();
  else if(e.target.id === 'checkout-btn') checkoutDemo();
  else if(e.target.id === 'contact-btn') window.location.href = 'https://wa.me/?text=Halo%20JULIANJOKI';
  else if(e.target.matches('button[data-action="details"]')){
    const id = e.target.dataset.id; const p = products.find(x=>x.id===id);
    if(p) alert(`${p.name}\n\n${p.desc}\nHarga: Rp ${formatPrice(p.price)}`);
  }
});

loadData();
