/* ToyLoop - Admin Dashboard */

const ADM_TABS = [
  { id: 'overview', icon: 'layout-dashboard', label: 'Overview' },
  { id: 'toys', icon: 'puzzle', label: 'Toy Inventory' },
  { id: 'swaps', icon: 'arrow-left-right', label: 'Swap Requests' },
  { id: 'payments', icon: 'receipt', label: 'Payments' },
  { id: 'subscribers', icon: 'users', label: 'Subscribers' },
  { id: 'shipments', icon: 'truck', label: 'Shipments' },
  { id: 'reports', icon: 'bar-chart-3', label: 'Reports' },
  { id: 'notifications', icon: 'megaphone', label: 'Broadcast' }
];

const ADM_CATEGORIES = ['educational', 'pretend', 'outdoor', 'building', 'activity'];

function getAdminState() {
  return TL.get('toyloop_admin_toys') || { overrides: {}, removed: [], added: [] };
}

function setAdminState(s) {
  TL.set('toyloop_admin_toys', s);
}

function effectiveToys() {
  const s = getAdminState();
  const base = TOYS.filter(t => !s.removed.includes(t.id));
  const added = s.added || [];
  return [...added, ...base].map(t => ({
    ...t,
    available: s.overrides[t.id] !== undefined ? s.overrides[t.id] : t.available
  }));
}

function adminStats() {
  const toys = effectiveToys();
  const rentals = TL.get('toyloop_current_box') || [];
  const swaps = TL.get('toyloop_swap_requests') || [];
  const payments = TL.get('toyloop_payments') || [];
  const revenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  return {
    totalToys: toys.length,
    available: toys.filter(t => t.available).length,
    rented: toys.filter(t => !t.available).length + rentals.length,
    pendingSwaps: swaps.filter(s => s.status === 'pending').length,
    revenue,
    payments
  };
}

function renderAdminSidebar() {
  const sidebar = document.getElementById('adm-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="p-6 border-b border-gray-100 flex items-center gap-3">
      <a href="index.html" class="flex items-center gap-2.5">
        <div class="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
          <i data-lucide="baby" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <span class="text-xl font-extrabold text-green-600 dark:text-green-400 tracking-tight leading-none block">Toy<span class="text-green-500 dark:text-green-300">Loop</span></span>
          <span class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Admin Portal</span>
        </div>
      </a>
    </div>
    <div class="px-6 pt-5 pb-1">
      <span class="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-1">Manage</span>
    </div>
    <nav class="p-4 pt-2 flex flex-col gap-1 flex-1 overflow-y-auto dashboard-scroll">
      ${ADM_TABS.map(t => `
        <button data-adm-tab="${t.id}" class="adm-nav-btn group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-gray-600 hover:bg-green-50 hover:text-green-600 w-full text-left">
          <i data-lucide="${t.icon}" class="w-5 h-5"></i>
          <span>${t.label}</span>
          ${t.id === 'swaps' ? `<span class="ml-auto" id="adm-swap-badge"></span>` : ''}
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
  updateAdmSwapBadge();
}

function updateAdmSwapBadge() {
  const swaps = TL.get('toyloop_swap_requests') || [];
  const pending = swaps.filter(s => s.status === 'pending').length;
  const badge = document.getElementById('adm-swap-badge');
  if (badge) {
    badge.innerHTML = pending > 0
      ? `<span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full badge-pulse">${pending}</span>`
      : '';
  }
}

function renderAdminHeader(title = 'Overview', subtitle = 'Store operations at a glance') {
  const header = document.getElementById('adm-header');
  if (!header) return;
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  header.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button id="adm-menu-toggle" class="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>
        </button>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-xl font-bold text-gray-800 truncate" id="adm-page-title">${title}</h1>
          <p class="text-xs sm:text-sm text-gray-500 truncate max-w-[50vw] sm:max-w-none">${subtitle} · ${today}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button id="adm-theme-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle dark mode" title="Toggle dark/light mode">
          <span data-theme-icon></span>
        </button>
        <button id="adm-dir-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle text direction" title="Toggle RTL/LTR">
          <i data-lucide="text" class="w-5 h-5 text-gray-600"></i>
        </button>
        <a href="catalog.html" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-200">
          <i data-lucide="external-link" class="w-4 h-4"></i> View Store
        </a>
      </div>
    </div>
  `;
  TL.initThemeToggle('adm-theme-toggle');
  TL.initDirToggle('adm-dir-toggle');
  TL.renderThemeIcons();
}

function renderAdminSection(tabKey, title, subtitle) {
  const el = document.getElementById('adm-content');
  if (!el) return;
  renderAdminHeader(title, subtitle);

  const map = {
    overview: renderAdmOverview,
    toys: renderAdmToys,
    swaps: renderAdmSwaps,
    payments: renderAdmPayments,
    subscribers: renderAdmSubscribers,
    shipments: renderAdmShipments,
    reports: renderAdmReports,
    notifications: renderAdmNotifications
  };
  const fn = map[tabKey];
  if (fn) fn(el);
  updateAdmTabActive(tabKey);
  if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [el] });
  updateAdmSwapBadge();
}

function updateAdmTabActive(tabKey) {
  document.querySelectorAll('.adm-nav-btn').forEach(btn => {
    const isActive = btn.dataset.admTab === tabKey;
    btn.className = `adm-nav-btn group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left ${
      isActive
        ? 'bg-green-50 text-green-600 shadow-sm border border-green-100'
        : 'text-gray-600 hover:bg-green-50 hover:text-green-600 border border-transparent'
    }`;
  });
}

function admSectionHead(icon, eyebrow, heading, sub) {
  return `
    <div class="mb-6">
      <span class="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-3"><i data-lucide="${icon}" class="w-3.5 h-3.5"></i>${eyebrow}</span>
      <h2 class="text-2xl font-extrabold text-gray-800">${heading}</h2>
      ${sub ? `<p class="text-sm text-gray-500 mt-1">${sub}</p>` : ''}
    </div>`;
}

function admStatCard(tint, tintText, icon, label, value, note) {
  return `
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-${tint}-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="${icon}" class="w-6 h-6 text-${tint}-600"></i></div>
        <div class="min-w-0">
          <p class="text-sm text-gray-500">${label}</p>
          <p class="text-2xl font-bold text-gray-800">${value}</p>
          <p class="text-xs text-gray-400 mt-0.5">${note}</p>
        </div>
      </div>
    </div>`;
}

/* OVERVIEW */
function renderAdmOverview(el) {
  const st = adminStats();
  const toys = effectiveToys();
  const swaps = TL.get('toyloop_swap_requests') || [];
  const pending = swaps.filter(s => s.status === 'pending');
  const user = TL.getUser() || TL.get('toyloop_profile') || {};
  const sub = TL.get('toyloop_subscription') || {};

  el.innerHTML = `
    ${admSectionHead('layout-dashboard', 'Overview', 'Store health at a glance', 'Live snapshot of inventory, requests and revenue.')}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      ${admStatCard('green', 'green', 'puzzle', 'Total Toys', st.totalToys, 'in catalog')}
      ${admStatCard('sky', 'sky', 'package-check', 'Available', st.available, 'ready to rent')}
      ${admStatCard('amber', 'amber', 'package', 'Rented Out', st.rented, 'currently in rotation')}
      ${admStatCard('purple', 'purple', 'arrow-left-right', 'Pending Swaps', st.pendingSwaps, 'awaiting review')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold text-gray-800">Pending Swap Requests</h3>
          <button onclick="renderAdminSection('swaps', 'Swap Requests', 'Review incoming early-swap requests')" class="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">Manage <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
        </div>
        ${pending.length === 0
          ? '<div class="py-8 text-center"><i data-lucide="check-circle-2" class="w-12 h-12 text-green-200 mx-auto mb-3"></i><p class="text-gray-500 text-sm">No pending requests.</p></div>'
          : `<div class="space-y-3">${pending.slice(0, 5).map(r => `
            <div class="flex items-center gap-3 p-3 bg-amber-50/60 hover:bg-amber-50 rounded-2xl transition-colors">
              <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="refresh-cw" class="w-5 h-5 text-amber-600"></i></div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 text-sm truncate">${r.toy}</p>
                <p class="text-xs text-gray-500 truncate">${r.reason} · ${TL.formatDate(r.date)}</p>
              </div>
              <div class="flex gap-2 flex-shrink-0">
                <button onclick="approveAdmSwap('${r.id}')" class="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors" title="Approve"><i data-lucide="check" class="w-4 h-4 text-green-700"></i></button>
                <button onclick="rejectAdmSwap('${r.id}')" class="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors" title="Reject"><i data-lucide="x" class="w-4 h-4 text-red-600"></i></button>
              </div>
            </div>
          `).join('')}</div>`}
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-5">Active Subscriber</h3>
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-md flex-shrink-0">
            <span class="text-white font-bold">${(user.name || 'P').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          </div>
          <div class="min-w-0">
            <p class="font-bold text-gray-800 truncate">${user.name || 'Priya Sharma'}</p>
            <p class="text-sm text-gray-500 truncate">${user.email || 'priya@example.com'}</p>
          </div>
          <span class="ml-auto inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full flex-shrink-0"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i>${sub.status === 'active' ? 'Active' : 'Inactive'}</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-2xl"><p class="text-xs text-gray-500 mb-1">Plan</p><p class="font-bold text-gray-800">${sub.plan || 'Explorer'}</p></div>
          <div class="p-4 bg-gray-50 rounded-2xl"><p class="text-xs text-gray-500 mb-1">Child</p><p class="font-bold text-gray-800">${user.childName || 'Aarav'}</p></div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-bold text-gray-800">Inventory Snapshot</h3>
        <button onclick="renderAdminSection('toys', 'Toy Inventory', 'Manage catalog availability')" class="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">Full inventory <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <th class="pb-3 pr-4">Toy</th><th class="pb-3 pr-4">Category</th><th class="pb-3 pr-4">Age</th><th class="pb-3 pr-4">Price</th><th class="pb-3">Status</th>
          </tr></thead>
          <tbody>${toys.slice(0, 6).map(t => `
            <tr class="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td class="py-3 pr-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0"><i data-lucide="toy-brick" class="w-5 h-5 text-green-600"></i></div><span class="font-medium text-gray-800">${t.name}</span></div></td>
              <td class="py-3 pr-4 text-gray-500 capitalize">${t.category}</td>
              <td class="py-3 pr-4 text-gray-500">${t.age}</td>
              <td class="py-3 pr-4 font-medium text-gray-800">${TL.formatCurrency(t.price)}</td>
              <td class="py-3">${t.available ? '<span class="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>Available</span>' : '<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full"><i data-lucide="package" class="w-3.5 h-3.5"></i>Rented</span>'}</td>
            </tr>
          `).join('')}</tbody>
        </table>
      </div>
    </div>
  `;
}

/* TOYS */
function renderAdmToys(el) {
  const toys = effectiveToys();

  el.innerHTML = `
    ${admSectionHead('puzzle', 'Toy Inventory', 'Manage the catalog', 'Toggle availability or add new toys to the store.')}
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2"><i data-lucide="plus-circle" class="w-5 h-5 text-green-600"></i>Add New Toy</h3>
      <form id="adm-add-toy-form" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div class="lg:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Toy Name</label><input name="name" required placeholder="e.g. Wooden Train Set" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Category</label><select name="category" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">${ADM_CATEGORIES.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('')}</select></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Age Group</label><select name="age" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white"><option>1-2 Years</option><option>3-4 Years</option><option>5-6 Years</option><option>7-9 Years</option></select></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Price (₹/mo)</label><input name="price" type="number" min="50" required placeholder="399" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"></div>
        <div class="sm:col-span-2 lg:col-span-5"><button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-200"><i data-lucide="plus" class="w-4 h-4"></i>Add to Catalog</button></div>
      </form>
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-bold text-gray-800">All Toys (${toys.length})</h3>
        <span class="text-xs font-semibold text-gray-500">${toys.filter(t => t.available).length} available</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <th class="pb-3 pr-4">Toy</th><th class="pb-3 pr-4">Category</th><th class="pb-3 pr-4">Age</th><th class="pb-3 pr-4">Price</th><th class="pb-3 pr-4">Status</th><th class="pb-3 text-right">Actions</th>
          </tr></thead>
          <tbody>${toys.map(t => `
            <tr class="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td class="py-3.5 pr-4"><div class="flex items-center gap-3"><div class="w-11 h-11 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="toy-brick" class="w-5 h-5 text-green-600"></i></div><div><p class="font-medium text-gray-800">${t.name}</p><p class="text-xs text-gray-400">${t.id}</p></div></div></td>
              <td class="py-3.5 pr-4"><span class="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full capitalize">${t.category}</span></td>
              <td class="py-3.5 pr-4 text-gray-500">${t.age}</td>
              <td class="py-3.5 pr-4 font-medium text-gray-800">${TL.formatCurrency(t.price)}</td>
              <td class="py-3.5 pr-4">${t.available
                ? '<span class="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>Available</span>'
                : '<span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full"><i data-lucide="package" class="w-3.5 h-3.5"></i>Rented</span>'}</td>
              <td class="py-3.5 text-right whitespace-nowrap">
                <button onclick="toggleAdmToy('${t.id}')" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${t.available ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'} transition-colors"><i data-lucide="exchange" class="w-3.5 h-3.5"></i>${t.available ? 'Mark rented' : 'Make available'}</button>
                <button onclick="removeAdmToy('${t.id}')" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors ml-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i>Remove</button>
              </td>
            </tr>
          `).join('')}</tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('adm-add-toy-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    addAdmToy(e.target);
  });
}

function toggleAdmToy(id) {
  const s = getAdminState();
  const toy = effectiveToys().find(t => t.id === id);
  if (!toy) return;
  s.overrides[id] = !toy.available;
  setAdminState(s);
  TL.toast(`"${toy.name}" is now ${s.overrides[id] ? 'available' : 'rented out'}`, 'success');
  renderAdminSection('toys', 'Toy Inventory', 'Manage catalog availability');
}

function removeAdmToy(id) {
  const s = getAdminState();
  const toy = effectiveToys().find(t => t.id === id);
  if (!toy) return;
  if (!window.confirm(`Remove "${toy.name}" from the catalog?`)) return;
  s.removed = s.removed.includes(id) ? s.removed : [...s.removed, id];
  s.overrides = { ...s.overrides };
  delete s.overrides[id];
  setAdminState(s);
  TL.toast(`"${toy.name}" removed from catalog`, 'info');
  renderAdminSection('toys', 'Toy Inventory', 'Manage catalog availability');
}

function addAdmToy(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.price) { TL.toast('Name and price are required', 'error'); return; }
  const s = getAdminState();
  const maxId = TOYS.reduce((m, t) => Math.max(m, parseInt(t.id.replace('T', ''), 10) || 0), 0);
  const id = `T${String(maxId + 1).padStart(3, '0')}`;
  s.added = s.added || [];
  s.added.unshift({
    id,
    name: data.name,
    category: data.category,
    age: data.age,
    description: 'Newly added to the ToyLoop catalog.',
    price: Math.max(50, Math.round(Number(data.price))),
    available: true,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop'
  });
  setAdminState(s);
  TL.toast(`${data.name} added to the catalog!`, 'success');
  renderAdminSection('toys', 'Toy Inventory', 'Manage catalog availability');
}

/* SWAPS */
function renderAdmSwaps(el) {
  const swaps = TL.get('toyloop_swap_requests') || [];
  const pending = swaps.filter(s => s.status === 'pending');
  const done = swaps.filter(s => s.status !== 'pending');

  el.innerHTML = `
    ${admSectionHead('arrow-left-right', 'Swap Requests', `Review early swaps (${pending.length} pending)`, 'Approve or reject parent swap requests.')}
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 class="font-bold text-gray-800 mb-5 flex items-center gap-2"><i data-lucide="clock" class="w-5 h-5 text-amber-500"></i>Pending Requests</h3>
      ${pending.length === 0
        ? '<div class="py-10 text-center"><i data-lucide="check-circle-2" class="w-14 h-14 text-green-200 mx-auto mb-3"></i><p class="text-gray-500">All caught up — no pending swaps.</p></div>'
        : `<div class="space-y-4">${pending.map(r => `
          <div class="p-5 bg-amber-50/50 hover:bg-amber-50 rounded-2xl border border-amber-100/60 transition-colors">
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <div class="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"><i data-lucide="refresh-cw" class="w-5 h-5 text-amber-600"></i></div>
                <div class="min-w-0">
                  <p class="font-bold text-gray-800 truncate">${r.toy}</p>
                  <p class="text-xs text-gray-500">Reason: ${r.reason}${r.category ? ' · pref: ' + r.category : ''}</p>
                  <p class="text-xs text-gray-400 mt-0.5">Requested ${TL.formatDate(r.date)}</p>
                </div>
              </div>
              <div class="flex gap-2 flex-shrink-0">
                <button onclick="approveAdmSwap('${r.id}')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all hover:shadow-lg hover:shadow-green-200"><i data-lucide="check" class="w-4 h-4"></i>Approve</button>
                <button onclick="rejectAdmSwap('${r.id}')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-red-50 text-red-600 text-xs font-bold border border-red-200 transition-colors"><i data-lucide="x" class="w-4 h-4"></i>Reject</button>
              </div>
            </div>
          </div>
        `).join('')}</div>`}
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-800 mb-5 flex items-center gap-2"><i data-lucide="history" class="w-5 h-5 text-gray-400"></i>Request History</h3>
      ${done.length === 0
        ? '<p class="text-gray-400 text-sm">No resolved requests yet.</p>'
        : `<div class="space-y-3">${done.map(r => `
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800 text-sm truncate">${r.toy}</p>
              <p class="text-xs text-gray-500">${r.reason} · ${TL.formatDate(r.date)}</p>
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${r.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}"><i data-lucide="${r.status === 'approved' ? 'check-circle' : 'x-circle'}" class="w-3.5 h-3.5"></i>${r.status}</span>
          </div>
        `).join('')}</div>`}
    </div>
  `;
}

function approveAdmSwap(id) {
  const swaps = TL.get('toyloop_swap_requests') || [];
  const req = swaps.find(s => s.id === id);
  if (!req) return;
  req.status = 'approved';
  TL.set('toyloop_swap_requests', swaps);
  const notifications = TL.get('toyloop_notifications') || [];
  notifications.unshift({ id: TL.genId(), message: `Good news! Your early swap for "${req.toy}" was approved.`, read: false, date: new Date().toISOString(), category: 'swap' });
  TL.set('toyloop_notifications', notifications);
  TL.toast(`Swap for "${req.toy}" approved!`, 'success');
  renderAdminSection('swaps', 'Swap Requests', 'Review incoming early-swap requests');
}

function rejectAdmSwap(id) {
  const swaps = TL.get('toyloop_swap_requests') || [];
  const req = swaps.find(s => s.id === id);
  if (!req) return;
  req.status = 'rejected';
  TL.set('toyloop_swap_requests', swaps);
  const notifications = TL.get('toyloop_notifications') || [];
  notifications.unshift({ id: TL.genId(), message: `Your early swap for "${req.toy}" could not be approved this time.`, read: false, date: new Date().toISOString(), category: 'swap' });
  TL.set('toyloop_notifications', notifications);
  TL.toast(`Swap for "${req.toy}" rejected`, 'info');
  renderAdminSection('swaps', 'Swap Requests', 'Review incoming early-swap requests');
}

/* PAYMENTS */
function renderAdmPayments(el) {
  const st = adminStats();
  const payments = st.payments;

  el.innerHTML = `
    ${admSectionHead('receipt', 'Payments', 'Revenue & billing', 'Track subscription revenue.')}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <div class="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl p-6 text-white shadow-lg shadow-green-200/50 relative overflow-hidden">
        <div class="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="flex items-center justify-between mb-4"><span class="text-green-100 text-sm font-medium">Total Revenue</span><div class="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center"><i data-lucide="indian-rupee" class="w-5 h-5 text-white"></i></div></div>
        <p class="text-3xl font-bold">${TL.formatCurrency(st.revenue)}</p>
        <p class="text-green-100 text-sm mt-1">across ${payments.length} payments</p>
      </div>
      ${admStatCard('sky', 'sky', 'receipt', 'Payments', payments.length, 'all time')}
      ${admStatCard('amber', 'amber', 'credit-card', 'Subscriptions', 1, 'active subscriber')}
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-800 mb-5">Payment History</h3>
      ${payments.length === 0
        ? '<div class="py-10 text-center"><i data-lucide="receipt" class="w-14 h-14 text-gray-200 mx-auto mb-3"></i><p class="text-gray-500">No payments recorded yet.</p></div>'
        : `<div class="overflow-x-auto"><table class="w-full text-sm">
          <thead><tr class="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <th class="pb-3 pr-4">Invoice</th><th class="pb-3 pr-4">Plan</th><th class="pb-3 pr-4">Period</th><th class="pb-3 pr-4">Date</th><th class="pb-3 pr-4">Amount</th><th class="pb-3">Status</th>
          </tr></thead>
          <tbody>${payments.map(p => `
            <tr class="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td class="py-3.5 pr-4 font-mono text-xs text-gray-500">${p.id}</td>
              <td class="py-3.5 pr-4 font-medium text-gray-800">${p.plan || 'Subscription'}</td>
              <td class="py-3.5 pr-4 text-gray-500">${p.period}</td>
              <td class="py-3.5 pr-4 text-gray-500">${TL.formatDate(p.date)}</td>
              <td class="py-3.5 pr-4 font-bold text-gray-800">${TL.formatCurrency(p.amount)}</td>
              <td class="py-3.5"><span class="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>${p.status || 'paid'}</span></td>
            </tr>
          `).join('')}</tbody>
        </table></div>`}
    </div>
  `;
}

/* SUBSCRIBERS */
function renderAdmSubscribers(el) {
  const user = TL.get('toyloop_user') || {};
  const reg = TL.get('toyloop_registration') || {};
  const sub = TL.get('toyloop_subscription') || {};

  const entries = [];
  if (user.email) entries.push({ name: user.name, email: user.email, phone: user.phone || 'N/A', child: user.childName, age: user.ageGroup, source: 'Active login' });
  if (reg.email && reg.email !== user.email) entries.push({ name: reg.name, email: reg.email, phone: reg.phone || 'N/A', child: reg.childName, age: reg.ageGroup, source: 'Registered' });
  const count = Math.max(entries.length, 1);

  el.innerHTML = `
    ${admSectionHead('users', 'Subscribers', 'Manage memberships', 'Everyone with an active ToyLoop account.')}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      ${admStatCard('green', 'green', 'users', 'Subscribers', count, 'registered')}
      ${admStatCard('sky', 'sky', 'shield-check', 'Active Plans', count, 'memberships paid')}
      ${admStatCard('amber', 'amber', 'baby', 'Children', count, 'little explorers')}
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h3 class="font-bold text-gray-800">Member List</h3>
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>All systems active</span>
      </div>
      ${
        entries.length === 0
          ? '<div class="py-10 text-center"><i data-lucide="users" class="w-14 h-14 text-gray-200 mx-auto mb-3"></i><p class="text-gray-500">No subscribers yet — log in or register to see them here.</p></div>'
          : `<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">${entries.map(m => `
            <div class="p-5 bg-gray-50 hover:bg-green-50/60 rounded-2xl transition-colors">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-md flex-shrink-0">
                  <span class="text-white font-bold">${(m.name || 'P').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                </div>
                <div class="min-w-0">
                  <p class="font-bold text-gray-800 truncate">${m.name}</p>
                  <p class="text-sm text-gray-500 truncate">${m.email}</p>
                </div>
                <span class="ml-auto inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2.5 py-1 rounded-full flex-shrink-0"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i>Active</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><p class="text-xs text-gray-400 mb-0.5">Plan</p><p class="font-semibold text-gray-800">${sub.plan || 'Starter'}</p></div>
                <div><p class="text-xs text-gray-400 mb-0.5">Child</p><p class="font-semibold text-gray-800">${m.child || 'N/A'}</p></div>
                <div><p class="text-xs text-gray-400 mb-0.5">Age Group</p><p class="font-semibold text-gray-800">${m.age || 'N/A'}</p></div>
                <div><p class="text-xs text-gray-400 mb-0.5">Next Billing</p><p class="font-semibold text-gray-800">${sub.nextBilling ? TL.formatDate(sub.nextBilling) : 'N/A'}</p></div>
              </div>
            </div>
          `).join('')}</div>`
      }
    </div>
  `;
}

/* SHIPMENTS */
function renderAdmShipments(el) {
  const box = TL.get('toyloop_current_box') || [];
  const sub = TL.get('toyloop_subscription') || {};
  const profile = TL.get('toyloop_profile') || {};
  const address = profile.address || '123 Green Park, Mumbai 400001';

  const delivered = box.length > 0;
  const steps = [
    { label: 'Box Packed & Dispatched', note: 'Toy aunties packed the box', done: true },
    { label: 'Out for Delivery', note: 'Courier partner assigned', done: true },
    { label: 'Delivered to Home', note: delivered ? address : 'Awaiting dispatch', done: delivered },
    { label: 'Return & Swap Scheduled', note: sub.nextSwap ? TL.formatDate(sub.nextSwap) : 'Scheduled automatically', done: !!sub.nextSwap }
  ];

  el.innerHTML = `
    ${admSectionHead('truck', 'Shipments', 'Track deliveries & returns', 'Box dispatch, transit and swap logistics.')}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      ${admStatCard('green', 'green', 'package', 'Active Shipments', box.length > 0 ? 1 : 0, 'in transit')}
      ${admStatCard('sky', 'sky', 'boxes', 'Items in Transit', box.length, 'toys on the move')}
      ${admStatCard('amber', 'amber', 'rotate-ccw', 'Next Swap', sub.nextSwap ? TL.formatDate(sub.nextSwap) : 'N/A', 'return pickup')}
      ${admStatCard('purple', 'purple', 'map-pin', 'Delivery Hub', 'Mumbai', 'Colaba centre')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-6">Box #${box.length > 0 ? 'L-2026-01' : 'N/A'} · Live Tracking</h3>
        <div class="relative pl-9 space-y-7">
          <div class="absolute left-[13px] top-2 bottom-2 w-px bg-green-200"></div>
          ${steps.map((s, i) => `
            <div class="relative">
              <div class="absolute -left-9 top-0 w-7 h-7 rounded-full ring-4 ring-white flex items-center justify-center ${s.done ? 'bg-green-500 shadow-md' : 'bg-gray-100'}">
                <i data-lucide="${s.done ? (i === steps.length - 1 ? 'flag' : 'check') : 'circle'}" class="w-3.5 h-3.5 ${s.done ? 'text-white' : 'text-gray-300'}"></i>
              </div>
              <p class="text-sm font-semibold ${s.done ? 'text-gray-800' : 'text-gray-400'}">${s.label}</p>
              <p class="text-xs ${s.done ? 'text-gray-500' : 'text-gray-400'}">${s.note}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-5">Delivery Details</h3>
        <div class="p-5 bg-gray-50 rounded-2xl mb-5">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="home" class="w-5 h-5 text-green-600"></i></div>
            <div>
              <p class="font-semibold text-gray-800">Home Delivery</p>
              <p class="text-sm text-gray-500 mt-0.5">${address}</p>
              <p class="text-xs text-gray-400 mt-1">Standard slot · 9 AM – 6 PM</p>
            </div>
          </div>
        </div>
        <h4 class="font-bold text-gray-800 mb-4">In This Shipment (${box.length})</h4>
        ${box.length === 0
          ? '<p class="text-gray-400 text-sm">No toys in the current dispatch.</p>'
          : `<div class="space-y-3">${box.map(t => `
            <div class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50/60 rounded-2xl transition-colors">
              <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="toy-brick" class="w-6 h-6 text-green-600"></i></div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 text-sm truncate">${t.name}</p>
                <p class="text-xs text-gray-500">Return: ${TL.formatDate(t.returnDate)}</p>
              </div>
              <span class="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Delivered</span>
            </div>
          `).join('')}</div>`}
      </div>
    </div>
  `;
}

/* REPORTS */
function renderAdmReports(el) {
  const payments = TL.get('toyloop_payments') || [];
  const rentals = TL.get('toyloop_rentals') || [];
  const boxes = TL.get('toyloop_current_box') || [];
  const revenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const byPeriod = {};
  payments.forEach(p => {
    const key = p.period || (p.date ? TL.formatDate(p.date) : 'Now');
    byPeriod[key] = (byPeriod[key] || 0) + (Number(p.amount) || 0);
  });
  const periods = Object.entries(byPeriod).reverse();
  const maxPeriod = periods.reduce((m, [, v]) => Math.max(m, v), 0);

  const toys = effectiveToys();
  const catCount = {};
  toys.forEach(t => { catCount[t.category] = (catCount[t.category] || 0) + 1; });
  const cats = Object.entries(catCount).sort((a, b) => b[1] - a[1]);
  const maxCat = cats.reduce((m, [, v]) => Math.max(m, v), 0);

  el.innerHTML = `
    ${admSectionHead('bar-chart-3', 'Reports', 'Performance insights', 'Revenue trends and inventory breakdown.')}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      ${admStatCard('green', 'green', 'indian-rupee', 'Total Revenue', TL.formatCurrency(revenue), 'all-time')}
      ${admStatCard('sky', 'sky', 'receipt', 'Payments', payments.length, 'collected')}
      ${admStatCard('amber', 'amber', 'package-check', 'Rentals Completed', rentals.length, 'boxes returned')}
      ${admStatCard('purple', 'purple', 'boxes', 'Active Rentals', boxes.length, 'in circulation')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-6 flex items-center gap-2"><i data-lucide="trending-up" class="w-5 h-5 text-green-600"></i>Monthly Revenue</h3>
        ${periods.length === 0
          ? '<div class="py-10 text-center"><i data-lucide="chart-line" class="w-12 h-12 text-gray-200 mx-auto mb-3"></i><p class="text-gray-500 text-sm">Record a payment to see your trend.</p></div>'
          : `<div class="flex items-end justify-between gap-3 h-44 pb-8">${periods.slice(0, 8).map(([label, val]) => `
            <div class="group flex-1 h-full flex flex-col items-center justify-end gap-2">
              <span class="text-[11px] font-semibold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">${TL.formatCurrency(val)}</span>
              <div class="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-green-600 to-emerald-400 group-hover:from-green-700 group-hover:to-emerald-500 transition-all shadow-sm" style="height:${maxPeriod ? Math.max((val / maxPeriod) * 100, 6) : 6}%"></div>
              <span class="text-[11px] text-gray-500 font-medium">${label}</span>
            </div>
          `).join('')}</div>`}
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-6 flex items-center gap-2"><i data-lucide="pie-chart" class="w-5 h-5 text-green-600"></i>Inventory by Category</h3>
        ${cats.length === 0
          ? '<p class="text-gray-500 text-sm">Catalog is empty.</p>'
          : `<div class="space-y-5">${cats.map(([cat, count]) => `
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-sm font-medium text-gray-700 capitalize">${cat}</span>
                <span class="text-xs font-semibold text-gray-500">${count}</span>
              </div>
              <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all" style="width:${maxCat ? (count / maxCat) * 100 : 0}%"></div>
              </div>
            </div>
          `).join('')}</div>`}
      </div>
    </div>
  `;
}

/* BROADCAST */
function renderAdmNotifications(el) {
  const notifications = TL.get('toyloop_notifications') || [];

  el.innerHTML = `
    ${admSectionHead('megaphone', 'Broadcast', 'Send a notification', 'Announce new toys, swaps or updates to parents.')}
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
      <form id="adm-broadcast-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Notification Message</label>
          <textarea id="adm-broadcast-msg" rows="3" required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" placeholder="e.g. New STEM kits just dropped — check the catalog!"></textarea>
        </div>
        <button type="submit" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-200"><i data-lucide="send" class="w-4 h-4"></i>Send Broadcast</button>
      </form>
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-800 mb-5">Outbox (${notifications.length})</h3>
      ${notifications.length === 0
        ? '<p class="text-gray-400 text-sm">No notifications sent yet.</p>'
        : `<div class="space-y-3">${notifications.slice(0, 12).map(n => `
          <div class="flex items-start gap-3 p-4 ${n.read ? 'bg-gray-50' : 'bg-green-50/60'} rounded-2xl">
            <div class="w-9 h-9 ${n.read ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'} rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="bell" class="w-4 h-4"></i></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 ${n.read ? '' : 'font-semibold'}">${n.message}</p>
              <p class="text-xs text-gray-400 mt-0.5">${TL.formatDate(n.date)}${n.read ? ' · read' : ' · unread'}</p>
            </div>
          </div>
        `).join('')}</div>`}
    </div>
  `;

  document.getElementById('adm-broadcast-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('adm-broadcast-msg').value.trim();
    if (!msg) { TL.toast('Message cannot be empty', 'error'); return; }
    const notifications = TL.get('toyloop_notifications') || [];
    notifications.unshift({ id: TL.genId(), message: msg, read: false, date: new Date().toISOString(), category: 'system' });
    TL.set('toyloop_notifications', notifications);
    TL.toast('Broadcast sent!', 'success');
    renderAdminSection('notifications', 'Broadcast', 'Send a notification');
  });
}

/* NAVIGATION */
function initAdmDashboard() {
  renderAdminSidebar();
  renderAdminHeader('Overview', 'Store operations at a glance');

  const sidebar = document.getElementById('adm-sidebar');
  if (sidebar) {
    sidebar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-adm-tab]');
      if (!btn) return;
      const tab = ADM_TABS.find(t => t.id === btn.dataset.admTab);
      if (tab) renderAdminSection(tab.id, tab.label);
      if (window.innerWidth < 640) {
        sidebar.classList.add('-translate-x-full');
        document.getElementById('adm-sidebar-overlay')?.classList.add('hidden');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#adm-menu-toggle')) {
      sidebar.classList.toggle('-translate-x-full');
      document.getElementById('adm-sidebar-overlay')?.classList.toggle('hidden');
    }
  });

  document.getElementById('adm-sidebar-overlay')?.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    document.getElementById('adm-sidebar-overlay')?.classList.add('hidden');
  });

  const tab = TL.getParam('tab') || 'overview';
  const active = ADM_TABS.find(t => t.id === tab) || ADM_TABS[0];
  renderAdminSection(active.id, active.label);
}

document.addEventListener('DOMContentLoaded', initAdmDashboard);