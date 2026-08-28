/* ToyLoop - Catalog */

const TOYS = [
  { id: 'T001', name: 'Wooden Alphabet Puzzle', category: 'educational', age: '3-4 Years', description: 'Handcrafted wooden puzzle with colorful letters to teach alphabet recognition and fine motor skills.', price: 299, available: true, image: 'assets/images/Wooden Alphabet Puzzle.jpg' },
  { id: 'T002', name: 'Shape Sorter Cube', category: 'educational', age: '1-2 Years', description: 'Classic shape sorting cube that helps toddlers learn shapes, colors, and problem-solving.', price: 249, available: true, image: 'assets/images/Shape Sorter Cube.jpg' },
  { id: 'T003', name: 'Counting Bears Set', category: 'educational', age: '3-4 Years', description: 'Colorful bear counters with cups for learning counting, sorting, and basic math.', price: 349, available: true, image: 'assets/images/Counting Bears Set.jpg' },
  { id: 'T004', name: 'Doctor Play Kit', category: 'pretend', age: '3-4 Years', description: 'Complete doctor kit with stethoscope, syringe, bandages, and medical bag for imaginative play.', price: 399, available: true, image: 'assets/images/Doctor Play Kit.jpg' },
  { id: 'T005', name: 'Kitchen Play Set', category: 'pretend', age: '3-4 Years', description: 'Miniature kitchen set with pots, pans, utensils, and play food for cooking adventures.', price: 599, available: true, image: 'assets/images/Kitchen Play Set.jpg' },
  { id: 'T006', name: 'Superhero Action Figures', category: 'pretend', age: '5-6 Years', description: 'Set of 4 superhero action figures with movable joints and accessories.', price: 449, available: false, image: 'assets/images/Superhero Action Figures.jpg' },
  { id: 'T007', name: 'Outdoor Sports Kit', category: 'outdoor', age: '5-6 Years', description: 'Includes cricket bat, football, badminton set, and skipping rope for active outdoor play.', price: 549, available: true, image: 'assets/images/Outdoor Sports Kit.jpg' },
  { id: 'T008', name: 'Gardening Tool Set', category: 'outdoor', age: '5-6 Years', description: 'Child-sized gardening tools with watering can and seed pots for nature exploration.', price: 349, available: true, image: 'assets/images/Gardening Tool Set.jpg' },
  { id: 'T009', name: 'Bubble Machine Gun', category: 'outdoor', age: '3-4 Years', description: 'Automatic bubble gun that produces hundreds of bubbles for outdoor fun.', price: 299, available: true, image: 'assets/images/Bubble Machine Gun.jpg' },
  { id: 'T010', name: 'Building Blocks 50pc', category: 'building', age: '3-4 Years', description: 'Colorful interlocking blocks for creative construction and spatial awareness.', price: 399, available: true, image: 'assets/images/Building Blocks 50pc.jpg' },
  { id: 'T011', name: 'Magnetic Tiles 60pc', category: 'building', age: '5-6 Years', description: 'Magnetic building tiles for creating 3D structures, houses, and vehicles.', price: 699, available: true, image: 'assets/images/Magnetic Tiles 60pc.jpg' },
  { id: 'T012', name: 'Marble Run Set', category: 'building', age: '7-9 Years', description: 'Build exciting marble tracks with curves, loops, and funnels for STEM learning.', price: 799, available: false, image: 'assets/images/Marble Run Set.jpg' }
];

function getToys() { return TOYS; }

function getToyById(id) { return TOYS.find(t => t.id === id); }

function renderCatalogToys(toys, container) {
  if (!container) return;
  if (toys.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-16"><i data-lucide="search-x" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i><p class="text-gray-500 text-lg">No toys found matching your criteria.</p><p class="text-gray-400 text-sm mt-2">Try adjusting your filters.</p></div>';
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [container] });
    return;
  }
  const categoryColors = { educational: 'bg-sky-100 text-sky-700', pretend: 'bg-purple-100 text-purple-700', outdoor: 'bg-green-100 text-green-700', building: 'bg-amber-100 text-amber-700', activity: 'bg-pink-100 text-pink-700' };
  const categoryLabels = { educational: 'Educational', pretend: 'Pretend Play', outdoor: 'Outdoor', building: 'Building Sets', activity: 'Activity Kits' };

  container.innerHTML = toys.map(t => `
    <div class="group bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300" onclick="showToyDetails('${t.id}')">
      <div class="relative overflow-hidden aspect-[4/3]">
        <img src="${t.image}" alt="${t.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <span class="absolute top-3 left-3 ${categoryColors[t.category] || 'bg-gray-100 text-gray-700'} text-xs font-semibold px-3 py-1 rounded-full shadow-sm">${categoryLabels[t.category] || t.category}</span>
        ${!t.available
          ? '<span class="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">Rented Out</span>'
          : '<span class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"><i data-lucide="check-circle" class="w-3.5 h-3.5 inline align-[-2px]"></i> Available</span>'}
      </div>
      <div class="p-5">
        <h3 class="font-bold text-gray-800 text-lg leading-snug mb-1.5">${t.name}</h3>
        <div class="flex items-center gap-2 mb-2">
          <i data-lucide="users" class="w-4 h-4 text-gray-400"></i>
          <span class="text-sm text-gray-500">${t.age}</span>
        </div>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${t.description}</p>
        <div class="flex items-end justify-between">
          <span class="text-xs font-medium text-gray-400 uppercase tracking-wide">Rent from</span>
          <span class="text-green-600 font-bold text-lg leading-none">${TL.formatCurrency(t.price)}<span class="text-xs font-medium text-gray-400">/month</span></span>
        </div>
        <button class="w-full mt-4 py-3 rounded-full font-bold text-sm transition-all ${t.available ? 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg hover:shadow-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}" ${!t.available ? 'disabled' : ''}>
          ${t.available ? 'View Details' : 'Currently Rented'}
        </button>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [container] });
}

function showToyDetails(toyId) {
  const toy = getToyById(toyId);
  if (!toy) return;
  const categoryLabels = { educational: 'Educational', pretend: 'Pretend Play', outdoor: 'Outdoor', building: 'Building Sets', activity: 'Activity Kits' };
  TL.openModal(`
    <div class="flex flex-col md:flex-row gap-6">
      <div class="md:w-1/2">
        <img src="${toy.image}" alt="${toy.name}" class="w-full h-64 md:h-80 object-cover rounded-xl">
      </div>
      <div class="md:w-1/2">
        <span class="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">${categoryLabels[toy.category]}</span>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">${toy.name}</h2>
        <div class="flex items-center gap-2 mb-3">
          <i data-lucide="users" class="w-4 h-4 text-gray-400"></i>
          <span class="text-sm text-gray-500">Recommended: ${toy.age}</span>
        </div>
        <p class="text-gray-600 mb-4 leading-relaxed">${toy.description}</p>
        <div class="flex items-center gap-2 mb-6">
          <span class="text-sm font-medium text-gray-500">Availability:</span>
          <span class="text-sm font-semibold ${toy.available ? 'text-green-600' : 'text-red-500'}">${toy.available ? 'Available Now' : 'Currently Rented Out'}</span>
        </div>
        <div class="flex gap-3">
          ${toy.available ? `<a href="plans.html" class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-center transition-all hover:shadow-lg">Subscribe to Rent</a>` : ''}
          <button onclick="TL.closeModal()" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all">Close</button>
        </div>
      </div>
    </div>
  `);
}

function initCatalogFilters() {
  const searchInput = document.getElementById('catalog-search');
  const ageFilter = document.getElementById('age-filter');
  const categoryFilter = document.getElementById('category-filter');
  const container = document.getElementById('catalog-grid');
  if (!container) return;

  // Check URL params for category
  const urlCat = TL.getParam('cat');
  if (urlCat && categoryFilter) {
    categoryFilter.value = urlCat;
  }

  function filterToys() {
    const search = (searchInput?.value || '').toLowerCase().trim();
    const age = ageFilter?.value || '';
    const cat = categoryFilter?.value || '';
    let filtered = getToys();
    if (search) filtered = filtered.filter(t => t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search) || t.category.toLowerCase().includes(search));
    if (age) filtered = filtered.filter(t => t.age === age);
    if (cat) filtered = filtered.filter(t => t.category === cat);
    renderCatalogToys(filtered, container);
  }

  searchInput?.addEventListener('input', filterToys);
  ageFilter?.addEventListener('change', filterToys);
  categoryFilter?.addEventListener('change', filterToys);

  filterToys();
}

function initDashboardCatalog() {
  const container = document.getElementById('dashboard-catalog-grid');
  const searchInput = document.getElementById('dash-catalog-search');
  const ageFilter = document.getElementById('dash-age-filter');
  const categoryFilter = document.getElementById('dash-category-filter');
  if (!container) return;

  function filter() {
    const search = (searchInput?.value || '').toLowerCase().trim();
    const age = ageFilter?.value || '';
    const cat = categoryFilter?.value || '';
    let filtered = getToys();
    if (search) filtered = filtered.filter(t => t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search));
    if (age) filtered = filtered.filter(t => t.age === age);
    if (cat) filtered = filtered.filter(t => t.category === cat);
    renderCatalogToys(filtered, container);
  }

  searchInput?.addEventListener('input', filter);
  ageFilter?.addEventListener('change', filter);
  categoryFilter?.addEventListener('change', filter);
  filter();
}
