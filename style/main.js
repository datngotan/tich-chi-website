// Main Interactive Logic for Tích Chỉ Vàng Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 3. Real Authentic App Price Cards (matching the user app screenshot)
  const realAppData = [
    {
      id: 'btmh',
      brand: 'Bảo Tín Mạnh Hải',
      logoClass: 'btmh',
      logoText: 'BTMH',
      productName: 'Kim Gia Bảo Gift 24K',
      diffText: 'Chênh lệch: 400',
      buyPrice: '14.480',
      buyDelta: '▼ 20',
      buyDeltaUp: false,
      sellPrice: '14.880',
      sellDelta: '▼ 20',
      sellDeltaUp: false,
      isFav: true
    },
    {
      id: 'sjc',
      brand: 'SJC',
      logoClass: 'sjc',
      logoSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93A6 6 0 0 0 6 15a6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-5.25-5.07A4.004 4.004 0 0 0 16 6a4 4 0 0 0-4-4z"/></svg>`,
      productName: 'Vàng nhẫn 99.9%',
      diffText: 'Chênh lệch: 300',
      buyPrice: '14.130',
      buyDelta: '▲ 50',
      buyDeltaUp: true,
      sellPrice: '14.430',
      sellDelta: '▲ 50',
      sellDeltaUp: true,
      isFav: true
    },
    {
      id: 'kimkara',
      brand: 'Kim Kara',
      logoClass: 'kimkara',
      logoSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8l5 4-5 4V8zm7 0h3v8h-3V8z" fill="#000"/></svg>`,
      productName: 'Vàng 999,9',
      diffText: 'Chênh lệch: 60',
      buyPrice: '14.423',
      buyDelta: '▲ 50',
      buyDeltaUp: true,
      sellPrice: '14.483',
      sellDelta: '▲ 50',
      sellDeltaUp: true,
      isFav: false
    },
    {
      id: 'saigoncarat',
      brand: 'SaigonCarat',
      logoClass: 'saigoncarat',
      logoSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 18,3 22,9 12,21 2,9"/></svg>`,
      productName: 'Vàng 9999',
      diffText: 'Chênh lệch: 50',
      buyPrice: '14.300',
      buyDelta: '▲ 20',
      buyDeltaUp: true,
      sellPrice: '14.350',
      sellDelta: '▲ 20',
      sellDeltaUp: true,
      isFav: false
    },
    {
      id: 'quytung',
      brand: 'Vàng Quý Tùng',
      logoClass: 'quytung',
      logoSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="#fffbeb"/></svg>`,
      productName: 'Vàng Miếng SJC',
      diffText: 'Chênh lệch: 636',
      buyPrice: '14.282',
      buyDelta: '',
      buyDeltaUp: false,
      sellPrice: '14.918',
      sellDelta: '',
      sellDeltaUp: false,
      isFav: false
    },
    {
      id: 'mihong',
      brand: 'Mi Hồng',
      logoClass: 'sjc',
      logoSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="#dc2626"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z"/></svg>`,
      productName: 'Vàng 9999 Mi Hồng',
      diffText: 'Chênh lệch: 150',
      buyPrice: '14.350',
      buyDelta: '▲ 30',
      buyDeltaUp: true,
      sellPrice: '14.500',
      sellDelta: '▲ 30',
      sellDeltaUp: true,
      isFav: true
    }
  ];

  let currentFilterMode = 'all'; // 'all' or 'fav'
  let currentSearchQuery = '';

  const appRealCardsList = document.getElementById('appRealCardsList');
  const appSearchInput = document.getElementById('appSearchInput');
  const filterDisplayChip = document.getElementById('filterDisplayChip');
  const filterDisplayVal = document.getElementById('filterDisplayVal');

  function renderRealCards() {
    if (!appRealCardsList) return;

    let filtered = realAppData.filter(item => {
      if (currentFilterMode === 'fav' && !item.isFav) return false;
      if (currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase();
        const matchBrand = item.brand.toLowerCase().includes(query);
        const matchName = item.productName.toLowerCase().includes(query);
        return matchBrand || matchName;
      }
      return true;
    });

    if (filtered.length === 0) {
      appRealCardsList.innerHTML = `
        <div style="text-align: center; padding: 24px 12px; color: #a8a29e; font-size: 0.8rem;">
          Không tìm thấy sản phẩm phù hợp.
        </div>
      `;
      return;
    }

    appRealCardsList.innerHTML = filtered.map(item => `
      <div class="app-real-card" data-id="${item.id}">
        <!-- Top row: logo, brand name, star -->
        <div class="app-real-card-top">
          <div class="app-brand-info-wrap">
            <div class="app-brand-mini-logo ${item.logoClass}">
              ${item.logoSvg ? item.logoSvg : item.logoText}
            </div>
            <span class="app-brand-name-text">${item.brand}</span>
          </div>
          <button class="app-fav-star-btn ${item.isFav ? 'active' : ''}" data-star-id="${item.id}" title="${item.isFav ? 'Bỏ yêu thích' : 'Thêm yêu thích'}">
            ${item.isFav ? '★' : '☆'}
          </button>
        </div>

        <!-- Main row: product name & diff (left), buy/sell prices (right) -->
        <div class="app-real-card-main">
          <div class="app-product-details">
            <span class="app-product-name">${item.productName}</span>
            <span class="app-product-diff">${item.diffText}</span>
          </div>
          <div class="app-prices-numbers-wrap">
            <div class="app-price-col-real">
              <span class="app-price-value-green">${item.buyPrice}</span>
              ${item.buyDelta ? `<span class="app-price-delta-sub ${item.buyDeltaUp ? 'up' : 'down'}">${item.buyDelta}</span>` : ''}
            </div>
            <div class="app-price-col-real">
              <span class="app-price-value-red">${item.sellPrice}</span>
              ${item.sellDelta ? `<span class="app-price-delta-sub ${item.sellDeltaUp ? 'up' : 'down'}">${item.sellDelta}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events for star buttons
    appRealCardsList.querySelectorAll('.app-fav-star-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-star-id');
        const target = realAppData.find(it => it.id === id);
        if (target) {
          target.isFav = !target.isFav;
          renderRealCards();
          showToast(target.isFav ? `Đã lưu ${target.brand} vào Yêu thích` : `Đã bỏ ${target.brand} khỏi Yêu thích`);
        }
      });
    });
  }

  // Search input event
  if (appSearchInput) {
    appSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderRealCards();
    });
  }

  // Filter "Hiển thị: Toàn bộ / Yêu thích" Toggle
  if (filterDisplayChip) {
    filterDisplayChip.addEventListener('click', () => {
      if (currentFilterMode === 'all') {
        currentFilterMode = 'fav';
        if (filterDisplayVal) filterDisplayVal.textContent = 'Yêu thích';
        showToast('Đang lọc: Danh sách Yêu thích');
      } else {
        currentFilterMode = 'all';
        if (filterDisplayVal) filterDisplayVal.textContent = 'Toàn bộ';
        showToast('Đang lọc: Toàn bộ nguồn giá');
      }
      renderRealCards();
    });
  }

  // Initial render of app cards
  renderRealCards();

  // Bottom dock tab switching
  document.querySelectorAll('.app-dock-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.app-dock-item').forEach(d => d.classList.remove('active'));
      item.classList.add('active');
      const tabName = item.querySelector('span')?.textContent || '';
      showToast(`Mở màn hình: ${tabName}`);
    });
  });

  // 4. Widget Switcher Logic
  const widgetBtns = document.querySelectorAll('.widget-switch-btn');
  const widgetPreviewRows = document.getElementById('widgetPreviewRows');
  const widgetPreviewTitle = document.getElementById('widgetPreviewTitle');

  const widgetTemplates = {
    'compact': {
      title: 'Widget 2x2 - Tiêu điểm',
      items: [
        { name: 'Kim Gia Bảo 24K', brand: 'Bảo Tín Mạnh Hải', buy: '14.480', sell: '14.880', change: '▼ 20', isUp: false },
        { name: 'Vàng nhẫn 99.9%', brand: 'SJC', buy: '14.130', sell: '14.430', change: '▲ 50', isUp: true }
      ]
    },
    'wide': {
      title: 'Widget 4x2 - Toàn diện',
      items: [
        { name: 'Kim Gia Bảo Gift 24K', brand: 'Bảo Tín Mạnh Hải', buy: '14.480', sell: '14.880', change: '▼ 20', isUp: false },
        { name: 'Vàng nhẫn 99.9%', brand: 'SJC', buy: '14.130', sell: '14.430', change: '▲ 50', isUp: true },
        { name: 'Vàng 999,9', brand: 'Kim Kara', buy: '14.423', sell: '14.483', change: '▲ 50', isUp: true },
        { name: 'Vàng 9999 Mi Hồng', brand: 'Mi Hồng', buy: '14.350', sell: '14.500', change: '▲ 30', isUp: true }
      ]
    }
  };

  function renderWidget(type) {
    if (!widgetPreviewRows || !widgetTemplates[type]) return;
    const config = widgetTemplates[type];
    if (widgetPreviewTitle) {
      widgetPreviewTitle.textContent = config.title;
    }
    widgetPreviewRows.innerHTML = config.items.map(it => `
      <div class="widget-row-item">
        <div class="widget-row-name">
          <span>${it.name}</span>
          <span class="widget-row-sub">${it.brand} • <span style="color: ${it.isUp ? '#16a34a' : '#ef4444'}">${it.change}</span></span>
        </div>
        <div class="widget-row-prices">
          <div>
            <div class="widget-price-label">Mua</div>
            <div class="widget-price-val" style="color: #16a34a;">${it.buy}</div>
          </div>
          <div>
            <div class="widget-price-label">Bán</div>
            <div class="widget-price-val" style="color: #ef4444;">${it.sell}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  widgetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      widgetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-widget');
      renderWidget(mode);
    });
  });

  renderWidget('compact');

  // 5. App Store Modal Handling
  const iosModal = document.getElementById('iosModal');
  const openModalBtns = document.querySelectorAll('.trigger-ios-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  function openModal() {
    if (iosModal) {
      iosModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (iosModal) {
      iosModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (iosModal) {
    iosModal.addEventListener('click', (e) => {
      if (e.target === iosModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && iosModal && iosModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Copy Email helper & Toast
  function showToast(message) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastMsg';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('tichchivangapp@gmail.com').then(() => {
        showToast('Đã sao chép email: tichchivangapp@gmail.com');
      }).catch(() => {
        showToast('Email: tichchivangapp@gmail.com');
      });
    });
  }

  // Live time updater for mockup
  const appClockTime = document.getElementById('appClockTime');
  const appLastUpdatedText = document.getElementById('appLastUpdatedText');

  function updateMockupTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    if (appClockTime) {
      appClockTime.textContent = `${hours}:${mins}`;
    }
    if (appLastUpdatedText) {
      appLastUpdatedText.textContent = `Cập nhật lúc: ${day}/${month}/${year} ${hours}:${mins}`;
    }
  }

  updateMockupTime();
  setInterval(updateMockupTime, 30000);
});
