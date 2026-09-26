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
// RENDER KATEGORI & PRODUK
// ============================
function renderCategories() {
  const container = document.getElementById('categoryList');
  if (!container) return;
  container.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `<span class="icon">${cat.icon}</span><span class="name">${cat.name}</span>`;
    card.addEventListener('click', () => filterByCategory(cat.name));
    container.appendChild(card);
  });
}

function renderProducts(list = products) {
  const container = document.getElementById('productList');
  if (!container) return;
  container.innerHTML = '';
  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#94a3b8;"><p style="font-size:40px;margin-bottom:8px;">🔎</p><p>Produk tidak ditemukan.</p></div>`;
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
      </div>`;
    card.addEventListener('click', () => openProduct(prod.id));
    container.appendChild(card);
  });
}

// ============================
// FUNGSI BANTUAN
// ============================
function searchProducts(keyword) {
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
  renderProducts(filtered);
}

function filterByCategory(name) { alert(`Menampilkan kategori: ${name}`); }
function openProduct(id) { alert(`Membuka produk ID: ${id}`); }

// ============================
// EVENT LISTENER
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // Halaman Utama
  const btnSearch = document.getElementById('btnSearch');
  const searchInput = document.getElementById('searchInput');
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');

  if (btnSearch) btnSearch.addEventListener('click', () => { const kw = searchInput.value.trim(); if (kw) searchProducts(kw); });
  if (searchInput) searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { const kw = e.target.value.trim(); if (kw) searchProducts(kw); } });
  if (btnLogin) btnLogin.addEventListener('click', () => { window.location.href = 'login.html'; });
  if (btnRegister) btnRegister.addEventListener('click', () => { window.location.href = 'register.html'; });

  // Inisialisasi Halaman Utama
  if (document.getElementById('categoryList')) renderCategories();
  if (document.getElementById('productList')) renderProducts();
});
