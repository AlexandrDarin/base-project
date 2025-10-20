document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initAnimations();

    function initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        function applyTheme(theme) {
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '🌙'; // Луна для светлой темы
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '☀️'; // Солнце для темной темы
            }
            localStorage.setItem('theme', theme);
        }

        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            
            // Анимация переключения
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 200);
        });
    }

    function initAnimations() {
        // Плавный скролл для якорных ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Анимация прогресс-баров при появлении в viewport
        const progressBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));

        // Анимация для карточек при появлении в viewport
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card, .skill-item, .progress-item, .course-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(el);
        });
    }

    // Добавляем плавную анимацию при загрузке
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});