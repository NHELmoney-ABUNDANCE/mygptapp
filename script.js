const products = [
  { id: 1, name: 'LED Bulb 12W', category: 'Lighting Products', price: 120, label: 'Popular', newest: 20, image: '' },
  { id: 2, name: 'Extension Cord', category: 'Electrical Supplies', price: 350, label: 'Popular', newest: 19, image: '' },
  { id: 3, name: 'Electrical Tape', category: 'Electrical Supplies', price: 35, label: '', newest: 18, image: '' },
  { id: 4, name: 'Circuit Breaker', category: 'Electrical Supplies', price: 480, label: 'New', newest: 17, image: '' },
  { id: 5, name: 'PVC Pipe', category: 'Plumbing Supplies', price: 95, label: '', newest: 16, image: '' },
  { id: 6, name: 'Hammer', category: 'Tools', price: 180, label: '', newest: 15, image: '' },
  { id: 7, name: 'Screwdriver Set', category: 'Tools', price: 220, label: 'Popular', newest: 14, image: '' },
  { id: 8, name: 'Pliers', category: 'Tools', price: 165, label: '', newest: 13, image: '' },
  { id: 9, name: 'Light Switch', category: 'Electrical Supplies', price: 75, label: '', newest: 12, image: '' },
  { id: 10, name: 'Outlet', category: 'Electrical Supplies', price: 85, label: '', newest: 11, image: '' },
  { id: 11, name: 'Junction Box', category: 'Electrical Supplies', price: 60, label: '', newest: 10, image: '' },
  { id: 12, name: 'Wire Roll', category: 'Wiring and Cables', price: 950, label: 'Popular', newest: 9, image: '' },
  { id: 13, name: 'Paint Brush', category: 'Hardware Materials', price: 55, label: '', newest: 8, image: '' },
  { id: 14, name: 'Padlock', category: 'Hardware Materials', price: 145, label: '', newest: 7, image: '' },
  { id: 15, name: 'Measuring Tape', category: 'Tools', price: 130, label: '', newest: 6, image: '' },
  { id: 16, name: 'Safety Gloves', category: 'Safety Equipment', price: 90, label: 'New', newest: 5, image: '' },
  { id: 17, name: 'Flashlight', category: 'Lighting Products', price: 260, label: '', newest: 4, image: '' },
  { id: 18, name: 'Door Hinge', category: 'Hardware Materials', price: 45, label: '', newest: 3, image: '' },
  { id: 19, name: 'Faucet', category: 'Plumbing Supplies', price: 320, label: 'New', newest: 2, image: '' },
  { id: 20, name: 'Drill Bit Set', category: 'Tools', price: 280, label: 'Popular', newest: 1, image: '' }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const emptyState = document.getElementById('emptyState');
const productCount = document.getElementById('productCount');
const productForm = document.getElementById('productForm');

function formatPrice(price) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(price);
}

function getCategoryIcon(category) {
  const icons = {
    'Electrical Supplies': '🔌',
    'Wiring and Cables': '🧵',
    'Lighting Products': '💡',
    Tools: '🧰',
    'Hardware Materials': '🔩',
    'Plumbing Supplies': '🚰',
    'Safety Equipment': '🧤'
  };

  return icons[category] || '📦';
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function sortProducts(productList) {
  const sortedProducts = [...productList];

  switch (sortSelect.value) {
    case 'low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.sort((a, b) => b.newest - a.newest);
    case 'az':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sortedProducts;
  }
}

function renderProducts() {
  const filteredProducts = filterProducts();
  const visibleProducts = sortProducts(filteredProducts);

  productGrid.innerHTML = '';
  productCount.textContent = `${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'} found`;
  emptyState.hidden = visibleProducts.length > 0;

  visibleProducts.forEach((product) => {
    const productCard = document.createElement('article');
    productCard.className = 'product-card';

    const imageContent = product.image
      ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" /><span class="placeholder-icon" style="display:none;">${getCategoryIcon(product.category)}</span>`
      : `<span class="placeholder-icon">${getCategoryIcon(product.category)}</span>`;

    productCard.innerHTML = `
      <div class="product-image">
        ${product.label ? `<span class="product-label">${product.label}</span>` : ''}
        ${imageContent}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    `;

    productGrid.appendChild(productCard);
  });
}

function addProduct(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value.trim();
  const productCategory = document.getElementById('productCategory').value;
  const productPrice = Number(document.getElementById('productPrice').value);
  const productImage = document.getElementById('productImage').value.trim();
  const productLabel = document.getElementById('productLabel').value;

  if (!productName || !productCategory || !productPrice) {
    return;
  }

  products.unshift({
    id: Date.now(),
    name: productName,
    category: productCategory,
    price: productPrice,
    image: productImage,
    label: productLabel,
    newest: Date.now()
  });

  productForm.reset();
  renderProducts();
}

searchInput.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);
sortSelect.addEventListener('change', renderProducts);
productForm.addEventListener('submit', addProduct);

renderProducts();
