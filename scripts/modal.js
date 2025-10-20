class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }
    
    init() {
        // Кнопка закрытия
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // Закрытие по клику на фон
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }
}

// Менеджер модальных окон
const ModalManager = {
    modals: {},
    
    init() {
        // Автоматически инициализируем все модальные окна
        document.querySelectorAll('.modal').forEach(modal => {
            const modalId = modal.id;
            this.modals[modalId] = new Modal(modalId);
        });
        
        // Обработчики для кнопок открытия
        document.querySelectorAll('[data-modal]').forEach(btn => {
            const modalId = btn.dataset.modal;
            btn.addEventListener('click', () => this.open(modalId));
        });
    },
    
    open(modalId) {
        if (this.modals[modalId]) {
            this.modals[modalId].open();
        }
    },
    
    close(modalId) {
        if (this.modals[modalId]) {
            this.modals[modalId].close();
        }
    },
    
    // Открыть модальное окно с загрузкой контента
    openWithContent(modalId, content) {
        const modal = document.getElementById(modalId);
        const contentContainer = modal.querySelector('.modal-content');
        
        if (contentContainer) {
            contentContainer.innerHTML = content;
        }
        
        this.open(modalId);
    }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    ModalManager.init();
});