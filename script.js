// ============================================
// EXPOVACACIONES CALI 2026 - Scripts
// Premium 2026 Edition with enhanced animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- REDUCED MOTION CHECK ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- HERO KEN BURNS SLIDESHOW ---
    const slides = document.querySelectorAll('.hero__slide');
    let currentSlide = 0;

    // Start zoom on first slide immediately
    requestAnimationFrame(() => {
        slides[0].classList.add('hero__slide--zooming');
    });

    function nextSlide() {
        const prev = slides[currentSlide];
        currentSlide = (currentSlide + 1) % slides.length;
        const next = slides[currentSlide];

        // Reset zoom on next slide before showing it
        next.style.transition = 'none';
        next.classList.remove('hero__slide--zooming');

        // Force reflow so the reset takes effect
        void next.offsetWidth;

        // Restore transition and show
        next.style.transition = '';
        next.classList.add('hero__slide--active');

        // Start zooming the new slide
        requestAnimationFrame(() => {
            next.classList.add('hero__slide--zooming');
        });

        // Fade out previous after crossfade begins
        prev.classList.remove('hero__slide--active');

        // Remove zoom from prev after it fades out
        setTimeout(() => {
            prev.classList.remove('hero__slide--zooming');
        }, 2200);
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 7000);
    }

    // --- HEADER SCROLL ---
    const header = document.getElementById('header');
    const handleHeaderScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

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

    // --- ANIMATED COUNTERS (Enhanced with stagger) ---
    const stats = document.querySelectorAll('.stat-inline');
    let statsAnimated = false;

    // Add stagger-ready class for entrance animation
    if (!prefersReducedMotion) {
        stats.forEach((stat, i) => {
            stat.classList.add('stat-anim-ready');
            stat.style.transitionDelay = `${i * 0.15}s`;
        });
    }

    function animateCounters() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.stats-inline');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.8) return;

        statsAnimated = true;

        stats.forEach((stat, index) => {
            const target = parseInt(stat.dataset.target, 10);
            const numberEl = stat.querySelector('.stat-inline__number');
            const duration = 2000;
            const delayMs = index * 150;

            // Trigger entrance animation
            setTimeout(() => {
                stat.classList.add('stat-visible');
            }, delayMs);

            // Start counter with delay offset per item
            setTimeout(() => {
                const start = performance.now();

                function step(timestamp) {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    numberEl.textContent = Math.floor(eased * target).toLocaleString('es-CO');

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }

                requestAnimationFrame(step);
            }, delayMs);
        });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // --- SCROLL REVEAL (Enhanced) ---
    // Standard reveal (slide up)
    const revealElements = document.querySelectorAll(
        '.about__card, .benefit-card, .location__option, .faq__item, .exhibitors__list li'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('section-header'); // already has class, observer will handle
    });

    // Features get alternating left/right animations
    document.querySelectorAll('.feature').forEach((el, i) => {
        el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    });

    // Stats inline gets stagger animation
    const statsInline = document.querySelector('.stats-inline');
    if (statsInline) statsInline.classList.add('stagger-children');

    // Gallery items: clip-path reveal instead of simple scale
    document.querySelectorAll('.gallery__item').forEach((el, i) => {
        // Remove old reveal-scale if present
        el.classList.remove('reveal-scale');
        // Alternate between bottom and left reveal
        el.classList.add('reveal-clip');
        if (i % 3 === 1) {
            el.classList.add('reveal-clip--left');
        }
    });

    // Unified observer for all reveal types
    const allRevealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .stagger-children, .section-header'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    allRevealElements.forEach(el => revealObserver.observe(el));

    // --- PARALLAX ON SCROLL (Enhanced) ---
    let parallaxTicking = false;

    function updateParallax() {
        if (prefersReducedMotion) return;

        const scrollY = window.scrollY;

        // Subtle parallax on hero content only (not slideshow background)
        const heroContent = document.querySelector('.hero__content');
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            heroContent.style.opacity = `${1 - scrollY / window.innerHeight * 0.6}`;
        }

        parallaxTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });

    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);

    let progressTicking = false;

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
        progressTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            requestAnimationFrame(updateScrollProgress);
            progressTicking = true;
        }
    }, { passive: true });

    // --- MAGNETIC BUTTON EFFECT (Desktop Only) ---
    if (!prefersReducedMotion && window.innerWidth > 768) {
        document.querySelectorAll('.btn--primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                const maxOffset = 8;
                const tx = deltaX * maxOffset;
                const ty = deltaY * maxOffset;

                btn.style.transform = `translate(${tx}px, ${ty}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // --- HERO TEXT ANIMATION ON LOAD ---
    function animateHeroEntrance() {
        const heroContent = document.querySelector('.hero__content');
        if (!heroContent) return;

        // Map selectors to delays
        const animSequence = [
            { selector: '.hero__badge', delay: 300 },
            { selector: '.hero__title-line:first-child', delay: 500 },
            { selector: '.hero__title-line:last-child', delay: 700 },
            { selector: '.hero__slogan', delay: 900 },
            { selector: '.hero__info-item:nth-child(1)', delay: 1100 },
            { selector: '.hero__info-item:nth-child(2)', delay: 1300 },
            { selector: '.hero__info-item:nth-child(3)', delay: 1500 },
            { selector: '.countdown', delay: 1700 },
            { selector: '.hero__ctas', delay: 1900 },
        ];

        // Add hero-anim class to all elements first (hides them)
        if (!prefersReducedMotion) {
            animSequence.forEach(({ selector }) => {
                const el = heroContent.querySelector(selector);
                if (el) el.classList.add('hero-anim');
            });
        }

        // Trigger each element with its delay
        animSequence.forEach(({ selector, delay }) => {
            const el = heroContent.querySelector(selector);
            if (!el) return;

            if (prefersReducedMotion) {
                el.classList.add('hero-anim--visible');
            } else {
                setTimeout(() => {
                    el.classList.add('hero-anim--visible');
                }, delay);
            }
        });
    }

    animateHeroEntrance();

    // --- WAVE DIVIDER MORPHING ---
    function initWaveMorphing() {
        if (prefersReducedMotion) return;

        const wavePaths = document.querySelectorAll('.wave-divider svg path');
        if (!wavePaths.length) return;

        wavePaths.forEach(path => {
            const originalD = path.getAttribute('d');
            if (!originalD) return;

            // Store original path
            path.dataset.originalD = originalD;

            // Create a subtle variation by adjusting numeric values slightly
            function createVariation(d, offset) {
                return d.replace(/(\d+\.?\d*)/g, (match, num) => {
                    const val = parseFloat(num);
                    // Only morph Y-axis values (larger numbers, typically > 10)
                    if (val > 10 && val < 1000) {
                        return (val + (Math.sin(val * 0.1) * offset)).toFixed(1);
                    }
                    return match;
                });
            }

            let phase = 0;
            const morphInterval = setInterval(() => {
                phase += 1;
                const offset = Math.sin(phase * 0.5) * 3;
                const newD = createVariation(originalD, offset);
                path.setAttribute('d', newD);
            }, 3000);

            // Store interval for cleanup if needed
            path._morphInterval = morphInterval;
        });
    }

    initWaveMorphing();

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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        const data = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            empresa: form.empresa.value,
            email: form.email.value,
            telefono: form.telefono.value,
            tipo: form.tipo.value,
            mensaje: form.mensaje.value
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                btn.textContent = '¡Enviado!';
                btn.style.background = '#22c55e';
                btn.style.borderColor = '#22c55e';
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (err) {
            btn.textContent = 'Error, intenta de nuevo';
            btn.style.background = '#ef4444';
            btn.style.borderColor = '#ef4444';
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 3000);
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
