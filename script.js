// ============================================
// EXPOVACACIONES CALI 2026 - Scripts
// Premium 2026 Edition with enhanced animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- GA4 EVENT TRACKING ---
    const track = (eventName, params = {}) => {
        if (typeof gtag === 'function') {
            try { gtag('event', eventName, params); } catch (_) {}
        }
    };

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

    // Slideshow with Page Visibility API — pause when tab is hidden
    let slideshowInterval = null;

    function startSlideshow() {
        if (slideshowInterval || slides.length <= 1) return;
        slideshowInterval = setInterval(nextSlide, 7000);
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    }

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopSlideshow() : startSlideshow();
    });

    startSlideshow();

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
        const willOpen = !nav.classList.contains('open');
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        if (willOpen) track('menu_open', { device: 'mobile' });
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('href') || '';
            const label = link.textContent.trim();
            if (!link.classList.contains('nav-link--cta')) {
                track('nav_link_click', { nav_label: label, nav_target: target });
            }
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

    // Use IntersectionObserver instead of scroll listener for counters
    const statsSection = document.querySelector('.stats-inline');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    }

    // --- ANIMATED COUNTERS (Evento Section) ---
    const eventoStats = document.querySelectorAll('.evento__stat-number[data-target]');
    let eventoStatsAnimated = false;

    function animateEventoCounters() {
        if (eventoStatsAnimated) return;
        eventoStatsAnimated = true;

        eventoStats.forEach((numberEl, index) => {
            const target = parseInt(numberEl.dataset.target, 10);
            const duration = 2000;
            const delayMs = index * 200;

            setTimeout(() => {
                const start = performance.now();
                function step(timestamp) {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    numberEl.textContent = Math.floor(eased * target).toLocaleString('es-CO');
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            }, delayMs);
        });
    }

    const eventoStatsSection = document.querySelector('.evento__stats');
    if (eventoStatsSection) {
        const eventoStatsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateEventoCounters();
                eventoStatsObserver.disconnect();
            }
        }, { threshold: 0.2 });
        eventoStatsObserver.observe(eventoStatsSection);
    }

    // --- VIDEO SHOWCASE (play/pause with button, lazy load) ---
    document.querySelectorAll('.video-showcase__player').forEach((player, index) => {
        const video = player.querySelector('.video-showcase__video');
        const playBtn = player.querySelector('.video-showcase__play');
        const videoSrc = video?.querySelector('source')?.src || video?.src || '';
        const videoName = videoSrc.split('/').pop().split('.')[0] || `video_${index + 1}`;
        let videoPlayTracked = false;

        // Lazy load when near viewport
        const videoObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (video.preload === 'none') video.preload = 'auto';
                videoObserver.disconnect();
            }
        }, { rootMargin: '300px' });
        videoObserver.observe(player);

        // Pause when out of viewport
        const pauseObserver = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting && !video.paused) {
                video.pause();
                playBtn.classList.remove('hidden');
            }
        });
        pauseObserver.observe(player);

        // Toggle play/pause on click
        player.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => {});
                playBtn.classList.add('hidden');
                if (!videoPlayTracked) {
                    track('video_play', { video_name: videoName, video_index: index + 1 });
                    videoPlayTracked = true;
                }
            } else {
                video.pause();
                playBtn.classList.remove('hidden');
            }
        });
    });

    // --- DREAM DESTINATIONS INFINITE SCROLL ---
    // Cards are duplicated in HTML for seamless CSS animation

    // --- SCROLL REVEAL (CSS-driven, no class injection flash) ---
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .location__option, .faq__item, .exhibitors__list li, .gallery__item, .section-header, .scroll-slide-left, .scroll-slide-right, .scroll-scale-blur, .scroll-clip-reveal, .scroll-fade-up, .scroll-stagger, .stagger-children, .video-showcase__item, .immersive-break--tall, .evento__exp-card, .evento__razon, .evento__stat-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    animatedElements.forEach(el => revealObserver.observe(el));

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

        // Parallax on immersive break images
        document.querySelectorAll('.immersive-break__image').forEach(img => {
            const section = img.closest('.immersive-break');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                img.style.transform = `scale(1.1) translateY(${(progress - 0.5) * -40}px)`;
            }
        });

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

    // --- MAGNETIC BUTTON EFFECT (Desktop Only, throttled via rAF) ---
    if (!prefersReducedMotion && window.innerWidth > 768) {
        document.querySelectorAll('.btn--primary').forEach(btn => {
            let magneticRaf = null;

            btn.addEventListener('mousemove', (e) => {
                if (magneticRaf) return;
                magneticRaf = requestAnimationFrame(() => {
                    const rect = btn.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const deltaX = (e.clientX - centerX) / (rect.width / 2);
                    const deltaY = (e.clientY - centerY) / (rect.height / 2);

                    const maxOffset = 8;
                    btn.style.transform = `translate(${deltaX * maxOffset}px, ${deltaY * maxOffset}px)`;
                    magneticRaf = null;
                });
            });

            btn.addEventListener('mouseleave', () => {
                if (magneticRaf) { cancelAnimationFrame(magneticRaf); magneticRaf = null; }
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
            { selector: '.hero__badge', delay: 100 },
            { selector: '.hero__title-line:first-child', delay: 200 },
            { selector: '.hero__title-line:last-child', delay: 350 },
            { selector: '.hero__slogan', delay: 500 },
            { selector: '.hero__info-item:nth-child(1)', delay: 600 },
            { selector: '.hero__info-item:nth-child(2)', delay: 700 },
            { selector: '.hero__info-item:nth-child(3)', delay: 800 },
            { selector: '.countdown', delay: 900 },
            { selector: '.hero__ctas', delay: 1000 },
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

    // --- FAQ ACCORDION (cached references) ---
    const faqItems = document.querySelectorAll('.faq__item');
    let currentOpenFaq = null;

    document.querySelectorAll('.faq__question').forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const answer = item.querySelector('.faq__answer');
            const isOpen = item === currentOpenFaq;

            // Close current open item
            if (currentOpenFaq) {
                currentOpenFaq.classList.remove('active');
                currentOpenFaq.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                currentOpenFaq.querySelector('.faq__answer').style.maxHeight = null;
                currentOpenFaq = null;
            }

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                currentOpenFaq = item;
                const question = button.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
                track('faq_open', { faq_index: index + 1, faq_question: question });
            }
        });
    });

    // --- PHONE / EMAIL CLICK TRACKING (GA4) ---
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.addEventListener('click', () => {
            track('phone_click', { phone_number: a.getAttribute('href').replace('tel:', '') });
        });
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        a.addEventListener('click', () => {
            track('email_click', { email: a.getAttribute('href').replace('mailto:', '') });
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
            email: form.email.value,
            telefono: form.telefono.value,
            ciudad: form.ciudad.value,
            interes: form.interes.value,
            acepta_politicas: form.politicas.checked,
            acepta_promociones: form.promociones.checked
        };

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
                btn.textContent = '¡Enviado!';
                btn.style.background = '#22c55e';
                btn.style.borderColor = '#22c55e';
                track('form_submit', {
                    form_name: 'contact',
                    status: 'success',
                    ciudad: data.ciudad,
                    interes: data.interes
                });
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (err) {
            btn.textContent = 'Error, intenta de nuevo';
            btn.style.background = '#ef4444';
            btn.style.borderColor = '#ef4444';
            track('form_submit', { form_name: 'contact', status: 'error' });
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 3000);
    });

    // --- SECTION VIEW TRACKING (GA4) ---
    const sectionViewTracked = new Set();
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !sectionViewTracked.has(entry.target.id)) {
                sectionViewTracked.add(entry.target.id);
                track('section_view', { section_id: entry.target.id });
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    // --- CTA CLICK TRACKING (GA4) ---
    document.querySelectorAll('.btn--primary, .btn--outline, .nav-link--cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.textContent.trim().slice(0, 60);
            const section = btn.closest('section')?.id || (btn.closest('header') ? 'header' : 'unknown');
            track('cta_click', {
                cta_label: label,
                cta_location: section
            });
        });
    });

    // --- WHATSAPP CLICK TRACKING (GA4) ---
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', () => {
            track('whatsapp_click', { location: 'floating_widget' });
        });
    }

    // --- SCROLL DEPTH TRACKING (GA4) ---
    const scrollMilestones = [25, 50, 75, 100];
    const scrollReached = new Set();
    let scrollDepthTicking = false;

    function checkScrollDepth() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) { scrollDepthTicking = false; return; }
        const percent = (scrollTop / docHeight) * 100;

        scrollMilestones.forEach(m => {
            if (percent >= m && !scrollReached.has(m)) {
                scrollReached.add(m);
                track('scroll_depth', { percent: m });
            }
        });
        scrollDepthTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollDepthTicking) {
            requestAnimationFrame(checkScrollDepth);
            scrollDepthTicking = true;
        }
    }, { passive: true });

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
