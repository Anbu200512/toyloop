/* ToyLoop - Footer */

function renderFooter() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'dashboard.html' || currentPage === 'admin.html') return;

  const footer = document.createElement('footer');
  footer.className = 'bg-gray-50 border-t-4 border-green-500 text-gray-600 dark:bg-gray-900 dark:text-gray-300 pt-16 pb-8';
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <a href="index.html" class="flex items-center gap-2.5 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <i data-lucide="baby" class="w-5 h-5 text-white"></i>
            </div>
            <span class="text-xl font-extrabold text-green-600 dark:text-green-400 tracking-tight">Toy<span class="text-green-500 dark:text-green-300">Loop</span></span>
          </a>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">Play More. Waste Less. Giving every child access to a world of toys without the waste.</p>
          <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-5">
            <i data-lucide="leaf" class="w-4 h-4 text-green-500 dark:text-green-400"></i>
            <span>1,200+ toys recycled to date</span>
          </div>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:bg-green-600 hover:border-green-600 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300 hover:text-white" aria-label="Facebook"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:bg-green-600 hover:border-green-600 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300 hover:text-white" aria-label="Instagram"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:bg-green-600 hover:border-green-600 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300 hover:text-white" aria-label="Twitter"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:bg-green-600 hover:border-green-600 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300 hover:text-white" aria-label="YouTube"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 class="text-gray-800 dark:text-white font-semibold mb-4 flex items-center gap-2">
            <i data-lucide="compass" class="w-4 h-4 text-green-500 dark:text-green-400"></i> Quick Links
          </h4>
          <ul class="space-y-2.5">
            <li><a href="index.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Home <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="about.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">About <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="sustainability.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Sustainability <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="catalog.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Toy Catalog <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="plans.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Subscription Plans <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="hygiene.html" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Hygiene & Safety <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-gray-800 dark:text-white font-semibold mb-4 flex items-center gap-2">
            <i data-lucide="shapes" class="w-4 h-4 text-green-500 dark:text-green-400"></i> Categories
          </h4>
          <ul class="space-y-2.5">
            <li><a href="catalog.html?cat=educational" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Educational <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="catalog.html?cat=pretend" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Pretend Play <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="catalog.html?cat=outdoor" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Outdoor <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="catalog.html?cat=building" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Building Sets <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
            <li><a href="catalog.html?cat=activity" class="text-sm group inline-flex items-center gap-1.5 hover:text-green-600 dark:hover:text-green-400 transition-colors">Activity Kits <i data-lucide="arrow-right" class="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"></i></a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-gray-800 dark:text-white font-semibold mb-4 flex items-center gap-2">
            <i data-lucide="headphones" class="w-4 h-4 text-green-500 dark:text-green-400"></i> Contact
          </h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm"><i data-lucide="map-pin" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"></i>123 Toy Lane, Play City, India 400001</li>
            <li class="flex items-start gap-3 text-sm"><i data-lucide="phone" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"></i><a href="tel:+919876543210" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">+91 98765 43210</a></li>
            <li class="flex items-start gap-3 text-sm"><i data-lucide="mail" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"></i><a href="mailto:hello@toyloop.in" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">hello@toyloop.in</a></li>
            <li class="flex items-start gap-3 text-sm"><i data-lucide="clock" class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"></i>Mon - Sat: 9AM - 7PM</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <i data-lucide="shield-check" class="w-4 h-4 text-green-500 dark:text-green-400"></i>
          <span>Secure checkout · 100% hygienically cleaned toys</span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 order-first lg:order-none">&copy; ${new Date().getFullYear()} <span class="font-semibold text-gray-700 dark:text-gray-200">ToyLoop</span>. All rights reserved.</p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">Refund Policy</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
  if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [footer] });
}

document.addEventListener('DOMContentLoaded', renderFooter);