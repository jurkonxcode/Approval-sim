// ============================
// KONFIGURASI FIREBASE (Nanti diisi)
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyC9M8KK2P8lqTxGc1X4ltjQZUeAoikNe8o",
  authDomain: "fir-login-4c963.firebaseapp.com",
  projectId: "fir-login-4c963",
  storageBucket: "fir-login-4c963.firebasestorage.app",
  messagingSenderId: "577920418582",
  appId: "1:577920418582:android:a43883daf1215ecb524637"
};

// Inisialisasi Firebase (Hanya jika config sudah diisi)
let auth;
if (firebaseConfig.apiKey !== "ISI_DENGAN_API_KEY_ANDA") {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
}

// ============================
// DATA SEMENTARA (Untuk Halaman Utama)
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
// FUNGSI RENDER (Halaman Utama)
// ============================
function renderCategories() {
  const container = document.getElementById('categoryList');
  if (!container) return;
  container.innerHTML = '';
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `<span class="icon">${cat.icon}</span><span class="name">${cat.name}</span>`;
    container.appendChild(card);
  });
}

function renderProducts(list = products) {
  const container = document.getElementById('productList');
  if (!container) return;
  container.innerHTML = '';
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
    container.appendChild(card);
  });
}

// ============================
// LOGIKA UTAMA SAAT HALAMAN DIMUAT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. CEK HALAMAN UTAMA (index.html) ---
  if (document.getElementById('categoryList')) {
    renderCategories();
    renderProducts();
    
    document.getElementById('btnSearch')?.addEventListener('click', () => {
      const kw = document.getElementById('searchInput').value.trim();
      if (kw) renderProducts(products.filter(p => p.name.toLowerCase().includes(kw.toLowerCase())));
    });
    
    document.getElementById('btnLogin')?.addEventListener('click', () => window.location.href = 'login.html');
    document.getElementById('btnRegister')?.addEventListener('click', () => window.location.href = 'register.html');
  }

  // --- 2. CEK HALAMAN LOGIN (login.html) ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const message = document.getElementById('message');
      
      if (!auth) { message.textContent = "Firebase belum dikonfigurasi!"; message.style.color = "red"; return; }
      
      message.textContent = "Sedang masuk...";
      message.style.color = "blue";
      
      auth.signInWithEmailAndPassword(email, password)
        .then(() => { window.location.href = 'dashboard.html'; })
        .catch(err => { message.textContent = err.message; message.style.color = "red"; });
    });
  }

  // --- 3. CEK HALAMAN DAFTAR (register.html) ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const message = document.getElementById('message');
      
      if (!auth) { message.textContent = "Firebase belum dikonfigurasi!"; message.style.color = "red"; return; }
      
      message.textContent = "Membuat akun...";
      message.style.color = "blue";
      
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => { window.location.href = 'dashboard.html'; })
        .catch(err => { message.textContent = err.message; message.style.color = "red"; });
    });
  }

  // --- 4. CEK HALAMAN DASHBOARD (dashboard.html) ---
  if (document.getElementById('userName')) {
    if (!auth) return;
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        document.getElementById('userName').textContent = user.email;
      } else {
        window.location.href = 'login.html';
      }
    });

    document.getElementById('btnLogout')?.addEventListener('click', () => {
      auth.signOut().then(() => { window.location.href = 'login.html'; });
    });
  }
});
