// main.js - Основной файл приложения
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Инициализация всех модулей
    initNavigation();
    initSliders();
    initAccordions();
    initScrollEffects();
    setupEventListeners();
    initModalSystem();
    initFormValidation();
    initFilters();
    
    // Инициализация корзины
    updateCartCounter();
    
    console.log('🚀 Приложение полностью инициализировано');
}

// ==================== НАВИГАЦИЯ ====================
function initNavigation() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Закрытие меню при клике на ссылку
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
    
    // Плавная прокрутка к якорям
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Фиксированный хедер при скролле
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ==================== СЛАЙДЕРЫ ====================
function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach((slider, index) => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dotsContainer = slider.querySelector('.slider-dots');
        let currentSlide = 0;
        let slideInterval;
        
        if (slides.length <= 1) return;
        
        // Создаем точки для слайдера
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }
        
        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            // Обновляем точки
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            
            currentSlide = index;
        }
        
        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            goToSlide(next);
        }
        
        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) prev = slides.length - 1;
            goToSlide(prev);
        }
        
        // Обработчики кнопок
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Автопрокрутка
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        // Пауза при наведении
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        startAutoSlide();
    });
}

// ==================== АККОРДЕОНЫ ====================
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const isActive = accordionItem.classList.contains('active');
            
            // Закрываем другие аккордеоны (опционально)
            if (!accordionItem.classList.contains('single')) {
                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                        item.querySelector('.accordion-content').style.maxHeight = '0';
                    }
                });
            }
            
            // Переключаем текущий аккордеон
            accordionItem.classList.toggle('active');
            
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = '0';
            }
        });
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    // Появление элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Кнопка "Наверх"
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== МОДАЛЬНЫЕ ОКНА ====================
function initModalSystem() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        
        // Закрытие по кнопке
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        // Закрытие по клику на фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Открытие модальных окон
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) openModal(modal);
        });
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== ВАЛИДАЦИЯ ФОРМ ====================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        // Валидация в реальном времени
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => clearError(input));
        });
        
        // Валидация при отправке
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    if (!value) {
        message = 'Это поле обязательно для заполнения';
        isValid = false;
    } else {
        switch(input.type) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    message = 'Введите корректный email';
                    isValid = false;
                }
                break;
            case 'tel':
                if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                    message = 'Введите корректный номер телефона';
                    isValid = false;
                }
                break;
            case 'password':
                if (value.length < 6) {
                    message = 'Пароль должен содержать минимум 6 символов';
                    isValid = false;
                }
                break;
        }
    }
    
    if (!isValid) {
        showError(input, message);
    } else {
        clearError(input);
        showSuccess(input);
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    clearError(input);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    
    input.classList.add('error');
}

function showSuccess(input) {
    input.classList.add('success');
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error', 'success');
}

// ==================== ФИЛЬТРЫ ====================
function initFilters() {
    // Фильтрация по категориям
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            filterItems(filterValue);
            
            // Активный класс для кнопок
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Поиск
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(function(e) {
            searchItems(e.target.value);
        }, 300));
    }
}

function filterItems(category) {
    const items = document.querySelectorAll('.filter-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('visible'), 50);
        } else {
            item.classList.remove('visible');
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

function searchItems(query) {
    const items = document.querySelectorAll('.filter-item');
    const searchTerm = query.toLowerCase();
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(searchTerm);
        
        if (matches) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('visible'), 50);
        } else {
            item.classList.remove('visible');
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

// ==================== КОРЗИНА ====================
function addToCart(productId, productName = 'Товар', price = 0) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    showNotification(`${productName} добавлен в корзину!`);
}

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// ==================== УВЕДОМЛЕНИЯ ====================
function showNotification(message, type = 'success') {
    // Создаем контейнер для уведомлений если его нет
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Закрытие по кнопке
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentElement) {
            closeNotification(notification);
        }
    }, 4000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// ==================== ОБРАБОТЧИКИ СОБЫТИЙ ====================
function setupEventListeners() {
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Обработчики для кнопок "В корзину"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const productId = button.dataset.productId;
            const productName = button.dataset.productName || 'Товар';
            const price = parseFloat(button.dataset.price) || 0;
            
            addToCart(productId, productName, price);
        }
    });
    
    // Предотвращение двойной отправки форм
    document.addEventListener('submit', function(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (submitBtn && !form.classList.contains('submitting')) {
            form.classList.add('submitting');
            submitBtn.disabled = true;
            
            // Восстанавливаем через 5 секунд на случай ошибки
            setTimeout(() => {
                form.classList.remove('submitting');
                submitBtn.disabled = false;
            }, 5000);
        }
    });
}

// ==================== УТИЛИТЫ ====================
const utils = {
    formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(price);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    getUrlParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        return params;
    },
    
    setUrlParams(params) {
        const url = new URL(window.location);
        Object.keys(params).forEach(key => {
            url.searchParams.set(key, params[key]);
        });
        window.history.pushState({}, '', url);
    }
};

// Глобальные экспорты для использования в других скриптах
window.App = {
    utils,
    addToCart,
    showNotification,
    openModal,
    closeModal
};