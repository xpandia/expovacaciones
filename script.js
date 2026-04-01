// ============================================
// EXPOVACACIONES CALI 2026 - Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- HERO KEN BURNS SLIDESHOW ---
    const slides = document.querySelectorAll('.hero__slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('hero__slide--active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('hero__slide--active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 6000);
    }

    // --- HEADER SCROLL ---
    const header = document.getElementById('header');
    const handleScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- COUNTDOWN ---
    const eventDate = new Date('2026-05-22T09:00:00-05:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = Date.now();
        const diff = eventDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- ANIMATED COUNTERS ---
    const stats = document.querySelectorAll('.stat');
    let statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.stats');
        const rect = statsSection.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.8) return;

        statsAnimated = true;

        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            const numberEl = stat.querySelector('.stat__number');
            const duration = 2000;
            const start = performance.now();

            function step(timestamp) {
                const progress = Math.min((timestamp - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                numberEl.textContent = Math.floor(eased * target).toLocaleString('es-CO');

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // --- SCROLL REVEAL ---
    const revealElements = document.querySelectorAll(
        '.about__card, .feature, .benefit-card, .location__option, .faq__item, .exhibitors__list li'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- FAQ ACCORDION ---
    document.querySelectorAll('.faq__question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const answer = item.querySelector('.faq__answer');
            const isOpen = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq__item.active').forEach(openItem => {
                openItem.classList.remove('active');
                openItem.querySelector('.faq__answer').style.maxHeight = null;
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- FORM HANDLING ---
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        // Simulate submission (replace with actual endpoint)
        setTimeout(() => {
            btn.textContent = 'Enviado';
            btn.style.background = '#22c55e';
            btn.style.borderColor = '#22c55e';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });

    // --- ACTIVE NAV LINK ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(section => navObserver.observe(section));
});
