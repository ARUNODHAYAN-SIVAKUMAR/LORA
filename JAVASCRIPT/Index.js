document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) logoImg.src = logoImg.dataset.dark;
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.src = body.classList.contains('dark-theme') ? logoImg.dataset.dark : logoImg.dataset.light;
        }
    });

    const navbar = document.querySelector('.navbar');
    const stickyOffset = navbar ? navbar.offsetTop : 0;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > stickyOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    document.querySelectorAll('.nav-link, .explore-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const animateElements = document.querySelectorAll('.section-header, .investment-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px'
    });

    animateElements.forEach(el => observer.observe(el));

    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px) scale(0.9)';
            span.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
            heroText.appendChild(span);
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) scale(1)';
            }, 200);
        });
    }

    const exploreButtons = document.querySelectorAll('.explore-btn');
    exploreButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateX(8px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateX(0)';
        });
    });
});
