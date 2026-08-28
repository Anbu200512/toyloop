/* ToyLoop - Navigation */

function renderNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isDashboard = currentPage === 'dashboard.html';
  if (isDashboard) return;

  const isActive = (href) => currentPage === href ? 'nav-link-active' : '';

  const linksHTML = `
    <div class="relative group" id="nav-home-dropdown">
      <button class="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${(currentPage === 'index.html' || currentPage === 'home2.html') ? 'nav-link-active' : ''}">
        Home <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
      </button>
      <div class="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px]">
          <a href="index.html" class="block px-4 py-2.5 text-sm ${currentPage === 'index.html' ? 'nav-link-active bg-green-50' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-colors">Home 1</a>
          <a href="home2.html" class="block px-4 py-2.5 text-sm ${currentPage === 'home2.html' ? 'nav-link-active bg-green-50' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-colors">Home 2</a>
        </div>
      </div>
    </div>
    <a href="about.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('about.html')}">About</a>
    <a href="sustainability.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('sustainability.html')}">Sustainability</a>
    <a href="catalog.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('catalog.html')}">Catalog</a>
    <a href="plans.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('plans.html')}">Plans</a>
    <a href="hygiene.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('hygiene.html')}">Hygiene</a>
    <a href="contact.html" class="text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${isActive('contact.html')}">Contact</a>
    <div class="relative group" id="nav-dash-dropdown">
      <button class="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm ${(currentPage === 'dashboard.html' || currentPage === 'admin.html') ? 'nav-link-active' : ''}">
        Dashboard <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
      </button>
      <div class="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px]">
          <a href="admin.html" class="block px-4 py-2.5 text-sm ${currentPage === 'admin.html' ? 'nav-link-active bg-green-50' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-colors">Admin</a>
          <a href="dashboard.html" class="block px-4 py-2.5 text-sm ${currentPage === 'dashboard.html' ? 'nav-link-active bg-green-50' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'} transition-colors">Parent</a>
        </div>
      </div>
    </div>`;

  const mobileLinksHTML = `
    <div class="relative">
      <button class="mobile-dropdown-btn w-full flex items-center justify-between py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors text-left" data-target="mobile-home-sub">
        Home <i data-lucide="chevron-down" class="w-4 h-4 transition-transform"></i>
      </button>
      <div id="mobile-home-sub" class="hidden pl-6 pb-1">
        <a href="index.html" class="block py-2 px-4 rounded-lg text-sm ${currentPage === 'index.html' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'} transition-colors">Home 1</a>
        <a href="home2.html" class="block py-2 px-4 rounded-lg text-sm ${currentPage === 'home2.html' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'} transition-colors">Home 2</a>
      </div>
    </div>
    <a href="about.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('about.html')}">About</a>
    <a href="sustainability.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('sustainability.html')}">Sustainability</a>
    <a href="catalog.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('catalog.html')}">Catalog</a>
    <a href="plans.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('plans.html')}">Plans</a>
    <a href="hygiene.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('hygiene.html')}">Hygiene</a>
    <a href="contact.html" class="block py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors ${isActive('contact.html')}">Contact</a>
    <div class="relative">
      <button class="mobile-dropdown-btn w-full flex items-center justify-between py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors text-left" data-target="mobile-dash-sub">
        Dashboard <i data-lucide="chevron-down" class="w-4 h-4 transition-transform"></i>
      </button>
      <div id="mobile-dash-sub" class="hidden pl-6 pb-1">
        <a href="admin.html" class="block py-2 px-4 rounded-lg text-sm ${currentPage === 'admin.html' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'} transition-colors">Admin</a>
        <a href="dashboard.html" class="block py-2 px-4 rounded-lg text-sm ${currentPage === 'dashboard.html' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'} transition-colors">Parent</a>
      </div>
    </div>`;

  const authLinks = `
    <a href="login.html" class="border-2 border-green-500 text-green-600 hover:bg-green-50 px-5 py-2 rounded-full font-semibold text-sm transition-all">Login</a>
    <a href="signup.html" class="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:shadow-lg hover:shadow-green-200">Sign Up</a>`;

  const authLinksMobile = `
    <a href="login.html" class="block py-3 px-4 rounded-xl border-2 border-green-500 text-green-600 text-center font-semibold mt-2">Login</a>
    <a href="signup.html" class="block py-3 px-4 rounded-xl bg-green-500 text-white text-center font-semibold mt-2">Sign Up</a>`;

  const isDark = TL.get('toyloop_theme') === 'dark';
  const isRTL = TL.get('toyloop_dir') === 'rtl';

  const navbar = document.createElement('nav');
  navbar.className = 'fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all duration-300';
  navbar.id = 'main-navbar';
  navbar.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="index.html" class="flex items-center gap-2.5">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <i data-lucide="baby" class="w-5 h-5 text-white"></i>
          </div>
          <span class="text-xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">Toy<span class="text-green-500 dark:text-green-300">Loop</span></span>
        </a>
        <div class="hidden lg:flex items-center gap-6">
          ${linksHTML}
        </div>
        <div class="hidden lg:flex items-center gap-2">
          <button id="theme-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle dark mode" title="Toggle dark/light mode">
            <span data-theme-icon></span>
          </button>
          <button id="dir-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle text direction" title="Toggle RTL/LTR">
            <i data-lucide="text" class="w-5 h-5 text-gray-600"></i>
          </button>
          <div class="w-px h-6 bg-gray-200 mx-1"></div>
          ${authLinks}
        </div>
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Menu">
          <i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden lg:hidden fixed inset-0 top-0 z-50">
      <div class="sidebar-overlay" id="mobile-menu-overlay"></div>
      <div class="sidebar-mobile bg-white shadow-2xl p-6 pt-20 overflow-y-auto">
        <button id="mobile-menu-close" class="absolute top-5 right-5 p-2 rounded-xl hover:bg-gray-100">
          <i data-lucide="x" class="w-6 h-6 text-gray-700"></i>
        </button>
        <div class="flex flex-col gap-1">
          ${mobileLinksHTML}
          <hr class="my-3 border-gray-100">
          <div class="flex items-center gap-2 px-4 py-2">
            <button id="mobile-theme-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle dark mode">
              <span data-theme-icon></span>
            </button>
            <button id="mobile-dir-toggle" class="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle text direction">
              <i data-lucide="text" class="w-5 h-5 text-gray-600"></i>
            </button>
          </div>
          ${authLinksMobile}
        </div>
      </div>
    </div>
  `;

  document.body.prepend(navbar);

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 20);
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('mobile-menu-close');
  const menuOverlay = document.getElementById('mobile-menu-overlay');

  function openMenu() { mobileMenu.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { mobileMenu.classList.add('hidden'); document.body.style.overflow = ''; }

  menuBtn?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Mobile dropdowns
  document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const icon = btn.querySelector('i');
      if (target) {
        target.classList.toggle('hidden');
        icon?.classList.toggle('rotate-180');
      }
    });
  });

  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    TL.applyTheme(!document.documentElement.classList.contains('dark'));
  });
  document.getElementById('mobile-theme-toggle')?.addEventListener('click', () => {
    TL.applyTheme(!document.documentElement.classList.contains('dark'));
    closeMenu();
  });

  // Dir toggle
  function applyDir(rtl) {
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    TL.set('toyloop_dir', rtl ? 'rtl' : 'ltr');
  }

  document.getElementById('dir-toggle')?.addEventListener('click', () => {
    applyDir(document.documentElement.getAttribute('dir') !== 'rtl');
  });
  document.getElementById('mobile-dir-toggle')?.addEventListener('click', () => {
    applyDir(document.documentElement.getAttribute('dir') !== 'rtl');
    closeMenu();
  });

  // Apply saved theme on load
  if (isDark) TL.applyTheme(true);
  if (isRTL) applyDir(true);

  TL.renderThemeIcons();
  if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [navbar] });
}

document.addEventListener('DOMContentLoaded', renderNavbar);
