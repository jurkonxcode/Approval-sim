// ============================
// DATA SEMENTARA
// ============================
const categories = [
  { id: 1, name: 'Elektronik', icon: '📱' },
  { id: 2, name: 'Fashion',    icon: '👕' },
  { id: 3, name: 'Kendaraan',  icon: '🏍️' },
  { id: 4, name: 'Rumah',      icon: '🏠' },
  { id: 5, name: 'Hobi',       icon: '🎮' },
  { id: 6, name: 'Buku',       icon: '📚' },
];

const products = [
  { id: 1, name: 'iPhone 12 Bekas Mulus', price: 5500000, loc: 'Jakarta', icon: '📱' },
  { id: 2, name: 'Sepatu Nike Air Original', price: 450000, loc: 'Bandung', icon: '👟' },
  { id: 3, name: 'Motor Honda Vario 2020', price: 15000000, loc: 'Surabaya', icon: '🏍️' },
  { id: 4, name: 'PS4 Slim Fullset 2 Stik', price: 3200000, loc: 'Yogyakarta', icon: '🎮' },
  { id: 5, name: 'Kulkas 2 Pintu Sharp', price: 1800000, loc: 'Medan', icon: '🧊' },
  { id: 6, name: 'Buku Clean Code Original', price: 85000, loc: 'Semarang', icon: '📚' },
];

// ============================
// RENDER KATEGORI
// ============================
function renderCategories() {
  const container = document.getElementById('categoryList');
  container.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <span class="icon">${cat.icon}</span>
      <span class="name">${cat.name}</span>
    `;
    card.addEventListener('click', () => filterByCategory(cat.name));
    container.appendChild(card);
  });
}

// ============================
// RENDER PRODUK
// ============================
function renderProducts(list = products) {
  const container = document.getElementById('productList');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#94a3b8;">
        <p style="font-size:40px;margin-bottom:8px;">🔎</p>
        <p>Produk tidak ditemukan.</p>
      </div>`;
    return;
  }

  list.forEach((prod, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animation = `fadeInUp 0.5s ${i * 0.05}s var(--ease) backwards`;
    card.innerHTML = `
      <div class="product-img">${prod.icon}</div>
      <div class="product-info">
        <div class="product-name">${prod.name}</div>
        <div class="product-price">Rp ${prod.price.toLocaleString('id-ID')}</div>
        <div class="product-loc">📍 ${prod.loc}</div>
      </div>
    `;
    card.addEventListener('click', () => openProduct(prod.id));
    container.appendChild(card);
  });
}

// ============================
// PENCARIAN & FILTER
// ============================
function searchProducts(keyword) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
  renderProducts(filtered);
}

function filterByCategory(name) {
  alert(`Menampilkan kategori: ${name}\n(Fitur filter akan diimplementasikan)`);
}

function openProduct(id) {
  alert(`Membuka produk ID: ${id}\n(Halaman detail akan dibuat)`);
}

// ============================
// EVENT LISTENER
// ============================
document.getElementById('btnSearch').addEventListener('click', () => {
  const kw = document.getElementById('searchInput').value.trim();
  if (kw) searchProducts(kw);
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const kw = e.target.value.trim();
    if (kw) searchProducts(kw);
  }
});

document.getElementById('btnLogin').addEventListener('click', () => {
  alert('Menuju halaman login...');
  // nanti: window.location.href = 'login.html';
});

document.getElementById('btnRegister').addEventListener('click', () => {
  alert('Menuju halaman daftar...');
  // nanti: window.location.href = 'register.html';
});

// ============================
// INIT
// ============================
renderCategories();
renderProducts();
