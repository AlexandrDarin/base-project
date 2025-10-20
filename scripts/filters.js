// Фильтрация товаров по категориям
function filterProducts(category) {
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Фильтрация по цене
function filterByPrice(minPrice, maxPrice) {
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Сортировка товаров
function sortProducts(sortType) {
    const container = document.querySelector('.products-container');
    const products = Array.from(container.querySelectorAll('.product-item'));
    
    products.sort((a, b) => {
        switch(sortType) {
            case 'price-asc':
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            case 'price-desc':
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            default:
                return 0;
        }
    });
    
    // Переставляем элементы в DOM
    products.forEach(product => container.appendChild(product));
}

// Поиск товаров
function searchProducts(query) {
    const products = document.querySelectorAll('.product-item');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Инициализация фильтров
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для кнопок фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
    });
    
    // Обработчик для поиска
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
    }
    
    // Обработчик для сортировки
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => sortProducts(e.target.value));
    }
});