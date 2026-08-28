/* ToyLoop - Dashboard */

function initDashboard() {
  if (!window.location.pathname.includes('dashboard.html')) return;

  const user = TL.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  renderDashboardSidebar();
  renderDashboardHeader();
  initDashboardNav();
  renderDashboardSection(TL.getParam('tab') || 'overview');
  initNotifications();
}

function renderDashboardSidebar() {
  const sidebar = document.getElementById('dash-sidebar');
  if (!sidebar) return;
  const tabs = [
    { id: 'overview', icon: 'layout-dashboard', label: 'Overview' },
    { id: 'subscription', icon: 'credit-card', label: 'Subscription' },
    { id: 'current-box', icon: 'box', label: 'Current Box' },
    { id: 'rentals', icon: 'package', label: 'Rental History' },
    { id: 'swap', icon: 'refresh-cw', label: 'Early Swap' },
    { id: 'payments', icon: 'receipt', label: 'Billing & Payments' },
    { id: 'notifications', icon: 'bell', label: 'Notifications' },
    { id: 'profile', icon: 'user', label: 'Profile' }
  ];

  const notifications = TL.get('toyloop_notifications') || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  sidebar.innerHTML = `
    <div class="p-6 border-b border-gray-100 flex items-center gap-3">
      <a href="index.html" class="flex items-center gap-2.5">
        <div class="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
          <i data-lucide="baby" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <span class="text-xl font-extrabold text-green-600 dark:text-green-400 tracking-tight leading-none block">Toy<span class="text-green-500 dark:text-green-300">Loop</span></span>
          <span class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Parent Portal</span>
        </div>
      </a>
    </div>
    <div class="px-6 pt-5 pb-1">
      <span class="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-1">Menu</span>
    </div>
    <nav class="p-4 pt-2 flex flex-col gap-1 flex-1 overflow-y-auto dashboard-scroll">
      ${tabs.map(t => `
        <button data-tab="${t.id}" class="dash-nav-btn group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-gray-600 hover:bg-green-50 hover:text-green-600 w-full text-left">
          <i data-lucide="${t.icon}" class="w-5 h-5"></i>
          <span>${t.label}</span>
          ${t.id === 'notifications' && unreadCount > 0 ? `<span class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full badge-pulse">${unreadCount}</span>` : ''}
        </button>
      `).join('')}
    </nav>
    <div class="p-4 border-t border-gray-100">
      <button onclick="TL.logout()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all">
        <i data-lucide="log-out" class="w-5 h-5"></i>
        <span>Logout</span>
      </button>
    </div>
  `;
}

function renderDashboardHeader() {
  const header = document.getElementById('dash-header');
  if (!header) return;
  const user = TL.getUser();
  const notifications = TL.get('toyloop_notifications') || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const initials = (user?.name || 'P').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  header.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button id="dash-menu-toggle" class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>
        </button>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-xl font-bold text-gray-800 truncate" id="dash-page-title">Overview</h1>
          <p class="text-xs sm:text-sm text-gray-500 truncate max-w-[50vw] sm:max-w-none">Welcome back, <span class="font-medium text-gray-700">${user?.name?.split(' ')[0] || 'Parent'}</span> · ${today}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button id="dash-theme-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle dark mode" title="Toggle dark/light mode">
          <span data-theme-icon></span>
        </button>
        <button id="dash-dir-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle text direction" title="Toggle RTL/LTR">
          <i data-lucide="text" class="w-5 h-5 text-gray-600"></i>
        </button>
        <button onclick="showNotifications()" class="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors" title="Notifications">
          <i data-lucide="bell" class="w-5 h-5 text-gray-600"></i>
          ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full badge-pulse"></span>` : ''}
        </button>
        <div class="flex items-center gap-2.5 pl-2 border-l border-gray-100">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-100 shadow-md flex-shrink-0">
            <span class="text-white font-bold text-sm">${initials}</span>
          </div>
          <div class="hidden sm:block">
            <p class="text-sm font-bold text-gray-800 leading-tight">${user?.name || 'Parent'}</p>
            <p class="text-xs text-gray-400">${user?.email || ''}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  TL.initThemeToggle('dash-theme-toggle');
  TL.initDirToggle('dash-dir-toggle');
  TL.renderThemeIcons();
}

function initDashboardNav() {
  document.querySelectorAll('.dash-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      renderDashboardSection(tab);
      updateActiveTab(tab);
      closeDashSidebar();
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('#dash-menu-toggle')) openDashSidebar();
  });

  document.getElementById('dash-sidebar-overlay')?.addEventListener('click', closeDashSidebar);
}

function updateActiveTab(tab) {
  document.querySelectorAll('.dash-nav-btn').forEach(btn => {
    btn.classList.toggle('bg-green-50', btn.dataset.tab === tab);
    btn.classList.toggle('text-green-600', btn.dataset.tab === tab);
    btn.classList.toggle('font-semibold', btn.dataset.tab === tab);
    btn.classList.toggle('text-gray-600', btn.dataset.tab !== tab);
  });
  const titles = { overview: 'Overview', subscription: 'Subscription', 'current-box': 'Current Box', rentals: 'Rental History', swap: 'Early Swap Request', payments: 'Billing & Payments', notifications: 'Notifications', profile: 'Profile' };
  const titleEl = document.getElementById('dash-page-title');
  if (titleEl) titleEl.textContent = titles[tab] || 'Dashboard';
}

function openDashSidebar() {
  const sidebar = document.getElementById('dash-sidebar');
  const overlay = document.getElementById('dash-sidebar-overlay');
  sidebar?.classList.remove('-translate-x-full', 'hidden-sidebar');
  overlay?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDashSidebar() {
  const sidebar = document.getElementById('dash-sidebar');
  const overlay = document.getElementById('dash-sidebar-overlay');
  sidebar?.classList.add('-translate-x-full', 'hidden-sidebar');
  overlay?.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderDashboardSection(tab) {
  const content = document.getElementById('dash-content');
  if (!content) return;
  updateActiveTab(tab);

  const renderers = {
    'overview': renderOverview,
    'subscription': renderSubscription,
    'current-box': renderCurrentBox,
    'rentals': renderRentals,
    'swap': renderSwapRequest,
    'payments': renderPayments,
    'notifications': renderNotificationsPage,
    'profile': renderProfile
  };

  (renderers[tab] || renderOverview)(content);
  if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [content] });
}

/* OVERVIEW */
function renderOverview(el) {
  const user = TL.getUser();
  const sub = TL.get('toyloop_subscription') || {};
  const box = TL.get('toyloop_current_box') || [];
  const rentals = TL.get('toyloop_rentals') || [];
  const activeRentals = rentals.filter(r => r.status === 'active');

  el.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <div class="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl p-6 text-white shadow-lg shadow-green-200/50 relative overflow-hidden">
        <div class="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-green-100 text-sm font-medium">Current Plan</span>
          <div class="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center"><i data-lucide="credit-card" class="w-5 h-5 text-white"></i></div>
        </div>
        <p class="text-2xl font-bold">${sub.plan || 'No Plan'}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="inline-flex items-center gap-1.5 text-green-100 text-sm"><i data-lucide="${sub.status === 'active' ? 'check-circle-2' : 'alert-circle'}" class="w-4 h-4"></i>${sub.status === 'active' ? 'Active' : 'Inactive'}</span>
          <a href="#" onclick="renderDashboardSection('subscription'); return false;" class="text-xs font-semibold underline decoration-green-300 underline-offset-2 hover:text-white transition-colors">Manage</a>
        </div>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
        <div class="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="baby" class="w-6 h-6 text-sky-600"></i></div>
        <div class="min-w-0">
          <span class="text-gray-500 text-sm">Child</span>
          <p class="text-xl font-bold text-gray-800 truncate">${user?.childName || 'N/A'}</p>
          <p class="text-xs text-gray-400 mt-0.5">${user?.ageGroup || 'N/A'}</p>
        </div>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
        <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="box" class="w-6 h-6 text-amber-600"></i></div>
        <div class="min-w-0">
          <span class="text-gray-500 text-sm">Active Rentals</span>
          <p class="text-xl font-bold text-gray-800">${activeRentals.length}</p>
          <p class="text-xs text-gray-400 mt-0.5">toys in current box</p>
        </div>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
        <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="refresh-cw" class="w-6 h-6 text-purple-600"></i></div>
        <div class="min-w-0">
          <span class="text-gray-500 text-sm">Next Swap</span>
          <p class="text-xl font-bold text-gray-800">${sub.nextSwap ? TL.formatDate(sub.nextSwap) : 'N/A'}</p>
          <p class="text-xs text-gray-400 mt-0.5">scheduled rotation</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold text-gray-800">Current Box</h3>
          <button onclick="renderDashboardSection('current-box')" class="text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1">View all <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
        </div>
        ${box.length === 0 ? '<p class="text-gray-400 text-sm">No toys in current box.</p>' :
        `<div class="space-y-3">${box.slice(0, 4).map(t => `
          <div class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50/60 rounded-2xl transition-colors">
            <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="toy-brick" class="w-6 h-6 text-green-600"></i></div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800 text-sm truncate">${t.name}</p>
              <p class="text-xs text-gray-500">${t.category} · <span class="text-green-600">${TL.formatDate(t.returnDate)}</span></p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>Active</span>
          </div>
        `).join('')}</div>`}
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-5">Next Swap Timeline</h3>
        <div class="relative pl-8 space-y-6">
          <div class="absolute left-3 top-2 bottom-2 w-px bg-green-200"></div>
          <div class="relative">
            <div class="absolute -left-8 top-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center ring-4 ring-white"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-green-600"></i></div>
            <p class="text-sm font-medium text-gray-800">Current Box Received</p><p class="text-xs text-gray-500">Playing with toys</p>
          </div>
          <div class="relative">
            <div class="absolute -left-8 top-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white shadow-md"><i data-lucide="clock" class="w-3.5 h-3.5 text-white"></i></div>
            <p class="text-sm font-medium text-green-600">Play Period</p><p class="text-xs text-gray-500">Enjoy your current toys</p>
          </div>
          <div class="relative">
            <div class="absolute -left-8 top-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-gray-400"></i></div>
            <p class="text-sm font-medium text-gray-500">Return Toys</p><p class="text-xs text-gray-400">${sub.nextSwap ? 'By ' + TL.formatDate(sub.nextSwap) : 'Upcoming'}</p>
          </div>
          <div class="relative">
            <div class="absolute -left-8 top-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-white"><i data-lucide="package-check" class="w-3.5 h-3.5 text-gray-400"></i></div>
            <p class="text-sm font-medium text-gray-500">New Box</p><p class="text-xs text-gray-400">Fresh toys delivered</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-bold text-gray-800">Subscription Details</h3>
        <span class="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i>All good</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-gray-50 rounded-2xl"><p class="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><i data-lucide="credit-card" class="w-3.5 h-3.5 text-green-600"></i>Plan</p><p class="font-semibold text-gray-800">${sub.plan || 'N/A'}</p></div>
        <div class="p-4 bg-gray-50 rounded-2xl"><p class="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><i data-lucide="indian-rupee" class="w-3.5 h-3.5 text-green-600"></i>Monthly Price</p><p class="font-semibold text-gray-800">${sub.price ? TL.formatCurrency(sub.price) : 'N/A'}</p></div>
        <div class="p-4 bg-gray-50 rounded-2xl"><p class="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-green-600"></i>Next Billing</p><p class="font-semibold text-gray-800">${sub.nextBilling ? TL.formatDate(sub.nextBilling) : 'N/A'}</p></div>
        <div class="p-4 bg-green-50 rounded-2xl border border-green-100"><p class="text-xs text-green-700 mb-1 flex items-center gap-1.5"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>Payment Status</p><p class="font-semibold text-green-700">Paid</p></div>
      </div>
    </div>
  `;
}

/* SUBSCRIPTION */
function renderSubscription(el) {
  const sub = TL.get('toyloop_subscription') || {};
  const plans = [
    { name: 'Starter', price: 999, toys: 2, features: ['2 toys per rotation', 'Monthly rotation', 'Standard support'] },
    { name: 'Explorer', price: 1499, toys: 4, features: ['4 toys/activity kits', 'Monthly rotation', 'Flexible swaps', 'Priority support'], badge: 'Current Plan' },
    { name: 'Family', price: 2299, toys: 6, features: ['6 toys/activity kits', 'Flexible swaps', 'Premium support', 'Early access to new toys'] }
  ];

  el.innerHTML = `
    <div class="mb-8">
      <div class="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-green-200/50 relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
          <div>
            <span class="inline-flex items-center gap-1.5 text-green-100 text-xs font-bold uppercase tracking-widest mb-2"><i data-lucide="credit-card" class="w-4 h-4"></i>Current Subscription</span>
            <h3 class="text-2xl font-bold">${sub.plan || 'No Plan'}</h3>
            <p class="text-green-100 text-sm mt-1">${sub.price ? TL.formatCurrency(sub.price) + '/month' : 'Choose a plan below'}</p>
          </div>
          <div class="flex gap-6 sm:gap-10">
            <div>
              <p class="text-green-100 text-sm mb-1 flex items-center gap-1.5"><i data-lucide="calendar" class="w-4 h-4"></i>Next Billing</p>
              <p class="font-bold">${sub.nextBilling ? TL.formatDate(sub.nextBilling) : 'N/A'}</p>
            </div>
            <div>
              <p class="text-green-100 text-sm mb-1 flex items-center gap-1.5"><i data-lucide="refresh-cw" class="w-4 h-4"></i>Next Swap</p>
              <p class="font-bold">${sub.nextSwap ? TL.formatDate(sub.nextSwap) : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3 mb-5">
      <div class="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center"><i data-lucide="boxes" class="w-5 h-5 text-green-600"></i></div>
      <h3 class="text-lg font-bold text-gray-800">Available Plans</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${plans.map(p => `
        <div class="plan-card bg-white rounded-3xl p-7 shadow-sm border-2 ${sub.plan === p.name ? 'border-green-500 shadow-xl shadow-green-100/60' : 'border-gray-100 hover:border-green-200 hover:shadow-lg'} relative transition-all flex flex-col">
          ${sub.plan === p.name ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">Current Plan</span>' : ''}
          ${p.badge && sub.plan !== p.name ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">Best Value</span>' : ''}
          <h4 class="text-lg font-bold text-gray-800 mb-2">${p.name}</h4>
          <p class="text-3xl font-bold text-gray-800 mb-1">${TL.formatCurrency(p.price)}<span class="text-sm font-normal text-gray-500">/mo</span></p>
          <p class="text-sm text-gray-500 mb-5">${p.toys} toys per rotation</p>
          <ul class="space-y-2.5 mb-8 flex-1">
            ${p.features.map(f => `<li class="flex items-center gap-2 text-sm text-gray-600"><span class="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0"><i data-lucide="check" class="w-3 h-3 text-green-500"></i></span>${f}</li>`).join('')}
          </ul>
          ${sub.plan === p.name ?
            '<button class="w-full py-3 rounded-full bg-gray-100 text-gray-500 font-semibold cursor-not-allowed" disabled>Current Plan</button>' :
            `<button onclick="changePlan('${p.name}', ${p.price})" class="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-200">Switch to ${p.name}</button>`
          }
        </div>
      `).join('')}
    </div>
  `;
}

function changePlan(planName, price) {
  const sub = TL.get('toyloop_subscription') || {};
  sub.plan = planName;
  sub.price = price;
  TL.set('toyloop_subscription', sub);
  TL.toast(`Plan changed to ${planName}!`, 'success');
  renderDashboardSection('subscription');
}

/* CURRENT BOX */
function renderCurrentBox(el) {
  const box = TL.get('toyloop_current_box') || [];
  const sub = TL.get('toyloop_subscription') || {};

  el.innerHTML = `
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
      <div class="absolute -top-6 -right-6 w-28 h-28 bg-green-50 rounded-full blur-2xl"></div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0"><i data-lucide="package" class="w-6 h-6 text-green-600"></i></div>
          <div>
            <h3 class="font-bold text-gray-800 text-lg">Current Toy Box</h3>
            <p class="text-sm text-gray-500">Next swap: <span class="font-medium text-green-600">${sub.nextSwap ? TL.formatDate(sub.nextSwap) : 'N/A'}</span></p>
          </div>
        </div>
        <div class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
          <i data-lucide="calendar" class="w-4 h-4 text-green-600"></i>
          <span>${box.length} toys in rotation</span>
        </div>
      </div>
    </div>
    ${box.length === 0 ? '<div class="text-center py-16"><div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-4"><i data-lucide="box" class="w-10 h-10 text-gray-300"></i></div><p class="text-gray-500">No toys in your current box.</p><button onclick="window.location.href=\'catalog.html\'" class="mt-4 text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 mx-auto"><i data-lucide="search" class="w-4 h-4"></i>Browse the catalog</button></div>' :
    `<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      ${box.map((t, i) => `
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-xl hover:-translate-y-0.5 transition-all group">
          <div class="w-full sm:w-44 h-40 sm:h-auto bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center flex-shrink-0">
            <i data-lucide="toy-brick" class="w-12 h-12 text-green-600/70"></i>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-bold text-gray-800 group-hover:text-green-600 transition-colors">${t.name}</h4>
              <span class="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full"><i data-lucide="check-circle-2" class="w-3 h-3"></i>Active</span>
            </div>
            <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full self-start mb-3">${t.category}</span>
            <div class="space-y-1.5 text-sm text-gray-500 mb-4">
              <p><span class="font-medium text-gray-700">Collected:</span> ${TL.formatDate(t.collected)}</p>
              <p><span class="font-medium text-gray-700">Return by:</span> ${TL.formatDate(t.returnDate)}</p>
            </div>
            <button onclick="requestEarlySwapForToy('${t.id}', '${t.name}')" class="mt-auto text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1.5 transition-colors w-fit">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i> Request Early Swap
            </button>
          </div>
        </div>
      `).join('')}
    </div>`}
  `;
}

function requestEarlySwapForToy(toyId, toyName) {
  renderDashboardSection('swap');
  setTimeout(() => {
    const toySelect = document.getElementById('swap-toy');
    if (toySelect) toySelect.value = toyName;
  }, 100);
}

/* RENTALS */
function renderRentals(el) {
  const rentals = TL.get('toyloop_rentals') || [];
  const allRentals = [...rentals];
  const box = TL.get('toyloop_current_box') || [];
  box.forEach(t => {
    if (!allRentals.find(r => r.toy === t.name)) {
      allRentals.unshift({ id: 'R' + t.id, toy: t.name, category: t.category, collected: t.collected?.split('T')[0] || '', returnDate: t.returnDate?.split('T')[0] || '', status: 'active', swapEligible: true });
    }
  });

  el.innerHTML = `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">Rental History</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Toy</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Category</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Collected</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Return</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Swap</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${allRentals.map(r => `
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-800">${r.toy}</td>
                <td class="px-6 py-4 text-gray-600">${r.category}</td>
                <td class="px-6 py-4 text-gray-600">${r.collected ? TL.formatDate(r.collected) : 'N/A'}</td>
                <td class="px-6 py-4 text-gray-600">${r.returnDate ? TL.formatDate(r.returnDate) : 'N/A'}</td>
                <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-xs font-medium ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">${r.status === 'active' ? 'Active' : 'Returned'}</span></td>
                <td class="px-6 py-4">${r.status === 'active' ? '<span class="text-green-600 text-sm font-medium">Eligible</span>' : '<span class="text-gray-400 text-sm">-</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* EARLY SWAP REQUEST */
function renderSwapRequest(el) {
  const box = TL.get('toyloop_current_box') || [];
  const requests = TL.get('toyloop_swap_requests') || [];
  const reasons = ['Child finished using it', 'Not suitable', 'Want something different', 'Damaged', 'Other'];

  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Request Early Swap</h3>
        <form id="swap-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Toy to Swap</label>
            <select id="swap-toy" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white" required>
              <option value="">Choose a toy...</option>
              ${box.map(t => `<option value="${t.name}">${t.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select id="swap-reason" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white" required>
              <option value="">Select reason...</option>
              ${reasons.map(r => `<option value="${r}">${r}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Replacement Category</label>
            <select id="swap-category" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white">
              <option value="">No preference</option>
              <option value="educational">Educational</option>
              <option value="pretend">Pretend Play</option>
              <option value="outdoor">Outdoor</option>
              <option value="building">Building Sets</option>
              <option value="activity">Activity Kits</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Message (optional)</label>
            <textarea id="swap-message" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" placeholder="Any additional notes..."></textarea>
          </div>
          <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg">Submit Swap Request</button>
        </form>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Your Swap Requests</h3>
        ${requests.length === 0 ? '<p class="text-gray-400 text-sm">No swap requests yet.</p>' :
        `<div class="space-y-3">${requests.map(r => `
          <div class="p-4 bg-gray-50 rounded-xl">
            <div class="flex items-start justify-between mb-1">
              <p class="font-medium text-gray-800 text-sm">${r.toy}</p>
              <span class="text-xs font-medium px-2 py-1 rounded-full ${r.status === 'approved' ? 'bg-green-100 text-green-700' : r.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}">${r.status}</span>
            </div>
            <p class="text-xs text-gray-500">${r.reason}</p>
            <p class="text-xs text-gray-400 mt-1">${TL.formatDate(r.date)}</p>
          </div>
        `).join('')}</div>`}
      </div>
    </div>
  `;

  document.getElementById('swap-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const toy = document.getElementById('swap-toy').value;
    const reason = document.getElementById('swap-reason').value;
    const category = document.getElementById('swap-category').value;
    const message = document.getElementById('swap-message').value.trim();
    if (!toy || !reason) { TL.toast('Please fill in all required fields', 'error'); return; }

    const requests = TL.get('toyloop_swap_requests') || [];
    requests.unshift({ id: TL.genId(), toy, reason, category, message, date: new Date().toISOString(), status: 'pending' });
    TL.set('toyloop_swap_requests', requests);

    const notifications = TL.get('toyloop_notifications') || [];
    notifications.unshift({ id: TL.genId(), message: `Early swap request submitted for "${toy}"`, read: false, date: new Date().toISOString(), category: 'swap' });
    TL.set('toyloop_notifications', notifications);

    TL.toast('Swap request submitted successfully!', 'success');
    renderDashboardSection('swap');
  });
}

/* PAYMENTS */
function renderPayments(el) {
  const payments = TL.get('toyloop_payments') || [];
  const sub = TL.get('toyloop_subscription') || {};

  el.innerHTML = `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 class="font-bold text-gray-800 mb-4">Make a Payment</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="p-4 bg-gray-50 rounded-xl"><p class="text-xs text-gray-500 mb-1">Current Plan</p><p class="font-bold text-gray-800">${sub.plan || 'N/A'}</p></div>
        <div class="p-4 bg-gray-50 rounded-xl"><p class="text-xs text-gray-500 mb-1">Amount Due</p><p class="font-bold text-gray-800">${sub.price ? TL.formatCurrency(sub.price) : 'N/A'}</p></div>
        <div class="p-4 bg-gray-50 rounded-xl"><p class="text-xs text-gray-500 mb-1">Due Date</p><p class="font-bold text-gray-800">${sub.nextBilling ? TL.formatDate(sub.nextBilling) : 'N/A'}</p></div>
        <div class="p-4 bg-green-50 rounded-xl"><p class="text-xs text-green-600 mb-1">Status</p><p class="font-bold text-green-600">Pending</p></div>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <button onclick="processPayment('upi')" class="flex items-center justify-center gap-2 px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold text-sm transition-all"><i data-lucide="smartphone" class="w-4 h-4"></i>Pay via UPI</button>
        <button onclick="processPayment('card')" class="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-all"><i data-lucide="credit-card" class="w-4 h-4"></i>Pay via Card</button>
        <button onclick="processPayment('netbanking')" class="flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-sm transition-all"><i data-lucide="landmark" class="w-4 h-4"></i>Net Banking</button>
      </div>
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">Billing History</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Invoice</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Date</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Plan</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Period</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Amount</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
              <th class="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${payments.map(p => `
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-800">${p.id}</td>
                <td class="px-6 py-4 text-gray-600">${TL.formatDate(p.date)}</td>
                <td class="px-6 py-4 text-gray-600">${p.plan}</td>
                <td class="px-6 py-4 text-gray-600">${p.period}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${TL.formatCurrency(p.amount)}</td>
                <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-xs font-medium ${p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">${p.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button onclick="viewInvoice('${p.id}')" class="text-green-600 hover:text-green-700 text-sm font-medium">View</button>
                    <button onclick="printInvoice('${p.id}')" class="text-green-600 hover:text-green-700 text-sm font-medium">Print</button>
                    <button onclick="downloadInvoice('${p.id}')" class="text-purple-600 hover:text-purple-700 text-sm font-medium">Download</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function processPayment(method) {
  const sub = TL.get('toyloop_subscription') || {};
  const payments = TL.get('toyloop_payments') || [];
  const pending = payments.find(p => p.status === 'pending');
  if (pending) {
    pending.status = 'paid';
    TL.set('toyloop_payments', payments);
  } else {
    payments.unshift({ id: TL.genId(), date: new Date().toISOString().split('T')[0], plan: sub.plan, period: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }), amount: sub.price, status: 'paid' });
    TL.set('toyloop_payments', payments);
  }
  const notifications = TL.get('toyloop_notifications') || [];
  notifications.unshift({ id: TL.genId(), message: `Payment of ${TL.formatCurrency(sub.price)} via ${method.toUpperCase()} successful!`, read: false, date: new Date().toISOString(), category: 'payment' });
  TL.set('toyloop_notifications', notifications);
  TL.toast(`Payment of ${TL.formatCurrency(sub.price)} successful via ${method.toUpperCase()}!`, 'success');
  renderDashboardSection('payments');
}

function viewInvoice(id) {
  const payments = TL.get('toyloop_payments') || [];
  const p = payments.find(inv => inv.id === id);
  if (!p) return;
  const user = TL.getUser();
  TL.openModal(`
    <div class="invoice-printable" id="invoice-content">
      <div class="flex justify-between items-start mb-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center"><i data-lucide="toy-brick" class="w-4 h-4 text-white"></i></div>
            <span class="text-lg font-bold">ToyLoop</span>
          </div>
          <p class="text-sm text-gray-500">Invoice ${p.id}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Date: ${TL.formatDate(p.date)}</p>
          <p class="text-sm font-medium ${p.status === 'paid' ? 'text-green-600' : 'text-amber-600'}">${p.status === 'paid' ? 'PAID' : 'PENDING'}</p>
        </div>
      </div>
      <div class="border-t border-b border-gray-200 py-4 mb-4">
        <p class="text-sm text-gray-600 mb-1">Bill To: ${user?.name || 'N/A'}</p>
        <p class="text-sm text-gray-600">${user?.email || ''}</p>
      </div>
      <table class="w-full text-sm mb-6">
        <thead><tr class="border-b border-gray-200"><th class="text-left py-2 font-semibold text-gray-600">Description</th><th class="text-right py-2 font-semibold text-gray-600">Amount</th></tr></thead>
        <tbody><tr><td class="py-2 text-gray-800">ToyLoop ${p.plan} Plan — ${p.period}</td><td class="py-2 text-right font-medium text-gray-800">${TL.formatCurrency(p.amount)}</td></tr></tbody>
      </table>
      <div class="text-right">
        <p class="text-lg font-bold text-gray-800">Total: ${TL.formatCurrency(p.amount)}</p>
      </div>
    </div>
  `);
}

function printInvoice(id) {
  viewInvoice(id);
  setTimeout(() => window.print(), 500);
}

function downloadInvoice(id) {
  const payments = TL.get('toyloop_payments') || [];
  const p = payments.find(inv => inv.id === id);
  if (!p) return;
  const user = TL.getUser();
  const content = `ToyLoop Invoice\n\nInvoice: ${p.id}\nDate: ${TL.formatDate(p.date)}\nStatus: ${p.status.toUpperCase()}\n\nBill To: ${user?.name}\nEmail: ${user?.email}\n\nDescription: ToyLoop ${p.plan} Plan - ${p.period}\nAmount: ${TL.formatCurrency(p.amount)}\n\nTotal: ${TL.formatCurrency(p.amount)}\n\nThank you for your subscription!\nToyLoop - Play More. Waste Less.`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `ToyLoop_Invoice_${p.id}.txt`;
  a.click(); URL.revokeObjectURL(url);
  TL.toast('Invoice downloaded!', 'success');
}

/* NOTIFICATIONS */
function renderNotificationsPage(el) {
  const notifications = TL.get('toyloop_notifications') || [];
  const categoryIcons = { box: 'box', swap: 'refresh-cw', payment: 'credit-card', info: 'info', return: 'package', system: 'bell' };

  el.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-bold text-gray-800">Notifications</h3>
      <button onclick="markAllRead()" class="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">Mark all as read</button>
    </div>
    ${notifications.length === 0 ? '<div class="text-center py-16"><i data-lucide="bell-off" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i><p class="text-gray-500">No notifications yet.</p></div>' :
    `<div class="space-y-3">${notifications.map(n => `
      <div class="bg-white rounded-xl p-4 shadow-sm border ${n.read ? 'border-gray-100' : 'border-green-200 bg-green-50/30'} flex items-start gap-4 cursor-pointer transition-all hover:shadow-md" onclick="markRead('${n.id}')">
        <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${n.read ? 'bg-gray-100' : 'bg-green-100'}">
          <i data-lucide="${categoryIcons[n.category] || 'bell'}" class="w-5 h-5 ${n.read ? 'text-gray-400' : 'text-green-600'}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm ${n.read ? 'text-gray-600' : 'text-gray-800 font-medium'}">${n.message}</p>
          <p class="text-xs text-gray-400 mt-1">${n.date ? TL.formatDate(n.date) : ''}</p>
        </div>
        ${!n.read ? '<div class="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>' : ''}
      </div>
    `).join('')}</div>`}
  `;
}

function markRead(id) {
  const notifications = TL.get('toyloop_notifications') || [];
  const n = notifications.find(n => n.id === id);
  if (n) { n.read = true; TL.set('toyloop_notifications', notifications); }
  renderDashboardSection('notifications');
  renderDashboardSidebar();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function markAllRead() {
  const notifications = TL.get('toyloop_notifications') || [];
  notifications.forEach(n => n.read = true);
  TL.set('toyloop_notifications', notifications);
  TL.toast('All notifications marked as read', 'success');
  renderDashboardSection('notifications');
  renderDashboardSidebar();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function showNotifications() {
  renderDashboardSection('notifications');
}

/* PROFILE */
function renderProfile(el) {
  const profile = TL.get('toyloop_profile') || TL.getUser() || {};

  el.innerHTML = `
    <form id="profile-form" class="space-y-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Parent Information</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" value="${profile.name || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value="${profile.email || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" name="phone" value="${profile.phone || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" name="address" value="${profile.address || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Child Information</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Child Name</label>
            <input type="text" name="childName" value="${profile.childName || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input type="date" name="childDob" value="${profile.childDob || ''}" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
            <select name="ageGroup" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white">
              <option value="1-2 Years" ${profile.ageGroup === '1-2 Years' ? 'selected' : ''}>1-2 Years</option>
              <option value="3-4 Years" ${profile.ageGroup === '3-4 Years' ? 'selected' : ''}>3-4 Years</option>
              <option value="5-6 Years" ${profile.ageGroup === '5-6 Years' ? 'selected' : ''}>5-6 Years</option>
              <option value="7-9 Years" ${profile.ageGroup === '7-9 Years' ? 'selected' : ''}>7-9 Years</option>
              <option value="10+ Years" ${profile.ageGroup === '10+ Years' ? 'selected' : ''}>10+ Years</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">Save Changes</button>
      </div>
    </form>
  `;

  document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      phone: form.querySelector('[name="phone"]').value,
      address: form.querySelector('[name="address"]').value,
      childName: form.querySelector('[name="childName"]').value,
      childDob: form.querySelector('[name="childDob"]').value,
      ageGroup: form.querySelector('[name="ageGroup"]').value
    };
    TL.set('toyloop_profile', data);
    TL.set('toyloop_user', { ...TL.getUser(), ...data });
    TL.toast('Profile updated successfully!', 'success');
    renderDashboardHeader();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });
}

function initNotifications() {
  // Auto-refresh notification badge periodically
}

document.addEventListener('DOMContentLoaded', initDashboard);
