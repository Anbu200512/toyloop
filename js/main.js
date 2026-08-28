/* ToyLoop - Main Utilities */

const TL = {
  // localStorage helpers
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  },

  // Toast notifications
  toast(message, type = 'success', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-sky-500',
      warning: 'bg-amber-500'
    };
    const icons = {
      success: '<i data-lucide="check-circle" class="w-5 h-5"></i>',
      error: '<i data-lucide="x-circle" class="w-5 h-5"></i>',
      info: '<i data-lucide="info" class="w-5 h-5"></i>',
      warning: '<i data-lucide="alert-triangle" class="w-5 h-5"></i>'
    };
    const toast = document.createElement('div');
    toast.className = `toast ${colors[type] || colors.info} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3`;
    toast.innerHTML = `${icons[type] || icons.info}<span class="text-sm font-medium">${message}</span>`;
    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [toast] });
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Modal
  openModal(content) {
    let overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
      <button onclick="TL.closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <div id="modal-body">${content}</div>
    </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) TL.closeModal();
    });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [overlay] });
  },
  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = '';
    }
  },

  // FAQ accordion
  initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer')?.classList.remove('open');
        });
        if (!isActive) {
          item.classList.add('active');
          answer.classList.add('open');
        }
      });
    });
  },

  // Scroll reveal
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
  },

  // Back to top
  initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  // Format currency
  formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  },

  // Format date
  formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  // Generate ID
  genId() {
    return 'TL' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  },

  // Get URL params
  getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  // Check auth
  isAuthenticated() {
    return !!TL.get('toyloop_user');
  },

  // Get user
  getUser() {
    return TL.get('toyloop_user');
  },

  // Logout
  logout() {
    TL.remove('toyloop_user');
    window.location.href = 'login.html';
  },

  // Theme icons (rendered directly, no Lucide dependency)
  themeIcons: {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
  },
  renderThemeIcons() {
    const dark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('[data-theme-icon]').forEach(el => {
      el.innerHTML = dark ? TL.themeIcons.sun : TL.themeIcons.moon;
    });
  },

  // Theme
  applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    TL.set('toyloop_theme', dark ? 'dark' : 'light');
    TL.renderThemeIcons();
  },
  initThemeToggle(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      TL.applyTheme(!document.documentElement.classList.contains('dark'));
    });
  },

  // Text direction (RTL/LTR)
  applyDir(rtl) {
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    TL.set('toyloop_dir', rtl ? 'rtl' : 'ltr');
  },
  initDirToggle(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      TL.applyDir(document.documentElement.getAttribute('dir') !== 'rtl');
    });
  },

  // Seed demo data
  seedData() {
    if (!TL.get('toyloop_registration')) {
      TL.set('toyloop_registration', {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        password: 'demo123',
        childName: 'Aarav',
        childDob: '2020-05-15',
        ageGroup: '3-4 Years'
      });
    }
    if (!TL.get('toyloop_user')) {
      TL.set('toyloop_user', {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        childName: 'Aarav',
        childDob: '2020-05-15',
        ageGroup: '3-4 Years'
      });
    }
    if (!TL.get('toyloop_subscription')) {
      TL.set('toyloop_subscription', {
        plan: 'Explorer',
        price: 1499,
        startDate: '2026-07-01',
        nextBilling: '2026-09-01',
        nextSwap: '2026-09-05',
        status: 'active'
      });
    }
    if (!TL.get('toyloop_current_box')) {
      const today = new Date();
      const ret = new Date(today);
      ret.setDate(ret.getDate() + 14);
      TL.set('toyloop_current_box', [
        { id: 'T001', name: 'Wooden Alphabet Puzzle', category: 'Educational', age: '3-4 Years', collected: today.toISOString(), returnDate: ret.toISOString(), status: 'active', image: 'assets/images/Wooden Alphabet Puzzle.jpg' },
        { id: 'T002', name: 'Doctor Play Kit', category: 'Pretend Play', age: '3-4 Years', collected: today.toISOString(), returnDate: ret.toISOString(), status: 'active', image: 'assets/images/Doctor Play Kit.jpg' },
        { id: 'T003', name: 'Building Blocks 50pc', category: 'Building Sets', age: '3-4 Years', collected: today.toISOString(), returnDate: ret.toISOString(), status: 'active', image: 'assets/images/Building Blocks 50pc.jpg' },
        { id: 'T005', name: 'Kitchen Play Set', category: 'Pretend Play', age: '3-4 Years', collected: today.toISOString(), returnDate: ret.toISOString(), status: 'active', image: 'assets/images/Kitchen Play Set.jpg' }
      ]);
    }
    if (!TL.get('toyloop_rentals')) {
      TL.set('toyloop_rentals', [
        { id: 'R001', toy: 'Wooden Alphabet Puzzle', category: 'Educational', collected: '2026-07-01', returnDate: '2026-08-01', status: 'returned', swapEligible: false },
        { id: 'R002', toy: 'Outdoor Sports Kit', category: 'Outdoor', collected: '2026-06-01', returnDate: '2026-07-01', status: 'returned', swapEligible: false },
        { id: 'R003', toy: 'Shape Sorter Cube', category: 'Educational', collected: '2026-08-01', returnDate: '2026-09-01', status: 'active', swapEligible: true, swapStatus: null }
      ]);
    }
    if (!TL.get('toyloop_payments')) {
      TL.set('toyloop_payments', [
        { id: 'INV001', date: '2026-07-01', plan: 'Explorer', period: 'Jul 2026', amount: 1499, status: 'paid' },
        { id: 'INV002', date: '2026-08-01', plan: 'Explorer', period: 'Aug 2026', amount: 1499, status: 'paid' },
        { id: 'INV003', date: '2026-09-01', plan: 'Explorer', period: 'Sep 2026', amount: 1499, status: 'pending' }
      ]);
    }
    if (!TL.get('toyloop_notifications')) {
      TL.set('toyloop_notifications', [
        { id: 'N001', message: 'Your ToyLoop box for August is ready!', read: false, date: '2026-08-01', category: 'box' },
        { id: 'N002', message: 'Swap date approaching — Sep 5, 2026', read: false, date: '2026-08-25', category: 'swap' },
        { id: 'N003', message: 'Monthly payment of ₹1,499 processed successfully.', read: true, date: '2026-08-01', category: 'payment' },
        { id: 'N004', message: 'New educational toys added to catalog!', read: true, date: '2026-08-15', category: 'info' },
        { id: 'N005', message: 'Please return your current toys by Sep 1.', read: false, date: '2026-08-26', category: 'return' }
      ]);
    }
    if (!TL.get('toyloop_swap_requests')) {
      TL.set('toyloop_swap_requests', []);
    }
    if (!TL.get('toyloop_profile')) {
      const user = TL.get('toyloop_user');
      TL.set('toyloop_profile', user || {
        name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210',
        address: '123 Green Park, Mumbai 400001',
        childName: 'Aarav', childDob: '2020-05-15', ageGroup: '3-4 Years'
      });
    }
  },

  // Initialize common
  init() {
    TL.seedData();
    if (TL.get('toyloop_dir') === 'rtl') TL.applyDir(true);
    TL.renderThemeIcons();
    TL.initScrollReveal();
    TL.initBackToTop();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
};

document.addEventListener('DOMContentLoaded', () => TL.init());
