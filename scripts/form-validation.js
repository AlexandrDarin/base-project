// Валидация email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Валидация телефона
function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Валидация пароля
function validatePassword(password) {
    return password.length >= 6;
}

// Показать ошибку
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

// Убрать ошибку
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

// Валидация конкретной формы
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        clearError(input);
        
        if (!input.value.trim()) {
            showError(input, 'Это поле обязательно для заполнения');
            isValid = false;
            return;
        }
        
        // Специфическая валидация по типу input
        switch(input.type) {
            case 'email':
                if (!validateEmail(input.value)) {
                    showError(input, 'Введите корректный email');
                    isValid = false;
                }
                break;
            case 'tel':
                if (!validatePhone(input.value)) {
                    showError(input, 'Введите корректный номер телефона');
                    isValid = false;
                }
                break;
            case 'password':
                if (!validatePassword(input.value)) {
                    showError(input, 'Пароль должен содержать минимум 6 символов');
                    isValid = false;
                }
                break;
        }
    });
    
    return isValid;
}

// Валидация в реальном времени
function setupRealTimeValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    // Валидируем только если есть значение
                    clearError(input);
                    
                    switch(input.type) {
                        case 'email':
                            if (!validateEmail(input.value)) {
                                showError(input, 'Введите корректный email');
                            }
                            break;
                        case 'tel':
                            if (!validatePhone(input.value)) {
                                showError(input, 'Введите корректный номер телефона');
                            }
                            break;
                    }
                }
            });
            
            input.addEventListener('input', () => {
                clearError(input);
            });
        });
        
        // Обработка отправки формы
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
});