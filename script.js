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

    // --- LENIS SMOOTH SCROLL ---
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 1.5
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Anchor link support
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = anchor.getAttribute('href');
                if (target && target.length > 1) {
                    const el = document.querySelector(target);
                    if (el) {
                        e.preventDefault();
                        lenis.scrollTo(el, { offset: -80, duration: 1.3 });
                    }
                }
            });
        });

        window.lenis = lenis;
    }

    // --- WEATHER WIDGET (Cali en vivo) ---
    (async () => {
        const weatherEl = document.getElementById('heroWeather');
        const tempEl = document.getElementById('heroWeatherTemp');
        const iconEl = document.getElementById('heroWeatherIcon');
        if (!weatherEl || !tempEl) return;

        const iconMap = {
            113: '☀️', 116: '⛅', 119: '☁️', 122: '☁️',
            143: '🌫️', 176: '🌦️', 179: '🌨️', 182: '🌧️',
            185: '🌧️', 200: '⛈️', 227: '❄️', 230: '❄️',
            248: '🌫️', 260: '🌫️', 263: '🌦️', 266: '🌦️',
            281: '🌧️', 284: '🌧️', 293: '🌦️', 296: '🌦️',
            299: '🌧️', 302: '🌧️', 305: '🌧️', 308: '🌧️',
            311: '🌧️', 314: '🌧️', 317: '🌧️', 320: '🌨️',
            323: '🌨️', 326: '🌨️', 329: '❄️', 332: '❄️',
            335: '❄️', 338: '❄️', 353: '🌦️', 356: '🌧️',
            359: '🌧️', 362: '🌨️', 365: '🌨️', 368: '🌨️',
            371: '❄️', 374: '🌨️', 377: '🌨️', 386: '⛈️',
            389: '⛈️', 392: '⛈️', 395: '❄️'
        };

        try {
            const res = await fetch('https://wttr.in/Cali,CO?format=j1', { cache: 'no-store' });
            if (!res.ok) throw new Error();
            const data = await res.json();
            const current = data.current_condition?.[0];
            if (!current) throw new Error();

            const tempC = current.temp_C;
            const weatherCode = parseInt(current.weatherCode, 10);
            const icon = iconMap[weatherCode] || '☀️';

            tempEl.textContent = `${tempC}°C`;
            iconEl.textContent = icon;
            requestAnimationFrame(() => weatherEl.classList.add('visible'));
        } catch (_) {
            // Fallback: show a static pleasant weather for Cali
            tempEl.textContent = '26°C';
            requestAnimationFrame(() => weatherEl.classList.add('visible'));
        }
    })();

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

    // --- DREAM DESTINATIONS CAROUSEL (manual arrows) ---
    const dreamTrack = document.getElementById('dreamTrack');
    const dreamPrev = document.getElementById('dreamPrev');
    const dreamNext = document.getElementById('dreamNext');
    if (dreamTrack && dreamPrev && dreamNext) {
        const getCardStep = () => {
            const firstCard = dreamTrack.querySelector('.dream-card');
            if (!firstCard) return 280;
            const style = getComputedStyle(dreamTrack);
            const gap = parseInt(style.columnGap || style.gap || '24', 10);
            return firstCard.offsetWidth + gap;
        };

        const updateArrowState = () => {
            const maxScroll = dreamTrack.scrollWidth - dreamTrack.clientWidth;
            const atStart = dreamTrack.scrollLeft <= 4;
            const atEnd = dreamTrack.scrollLeft >= maxScroll - 4;
            dreamPrev.setAttribute('aria-disabled', atStart);
            dreamNext.setAttribute('aria-disabled', atEnd);
        };

        dreamPrev.addEventListener('click', () => {
            dreamTrack.scrollBy({ left: -getCardStep() * 2, behavior: 'smooth' });
            track('carousel_nav', { carousel: 'destinos', direction: 'prev' });
        });

        dreamNext.addEventListener('click', () => {
            dreamTrack.scrollBy({ left: getCardStep() * 2, behavior: 'smooth' });
            track('carousel_nav', { carousel: 'destinos', direction: 'next' });
        });

        let dreamArrowTicking = false;
        dreamTrack.addEventListener('scroll', () => {
            if (!dreamArrowTicking) {
                requestAnimationFrame(() => {
                    updateArrowState();
                    dreamArrowTicking = false;
                });
                dreamArrowTicking = true;
            }
        }, { passive: true });

        // Initial state
        updateArrowState();
    }

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

    // --- STICKY CTA BAR (mobile) ---
    const stickyCta = document.getElementById('stickyCta');
    if (stickyCta && window.innerWidth < 1024) {
        const contactSection = document.getElementById('contacto');
        let stickyTicking = false;

        function updateStickyCta() {
            const scrolled = window.scrollY > 400;
            let nearContact = false;
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                // Hide when contact form visible in viewport
                nearContact = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            }
            const shouldShow = scrolled && !nearContact;
            stickyCta.classList.toggle('visible', shouldShow);
            document.body.classList.toggle('sticky-cta-active', shouldShow);
            stickyTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!stickyTicking) {
                requestAnimationFrame(updateStickyCta);
                stickyTicking = true;
            }
        }, { passive: true });

        // Track sticky CTA clicks
        stickyCta.querySelector('.sticky-cta__primary').addEventListener('click', () => {
            track('cta_click', { cta_label: 'Reserva tu espacio', cta_location: 'sticky_mobile_bar' });
        });
        stickyCta.querySelector('.sticky-cta__wa').addEventListener('click', () => {
            track('whatsapp_click', { location: 'sticky_mobile_bar' });
        });
    }

    // --- SCROLL PROGRESS CIRCULAR (scroll-to-top) ---
    const scrollRing = document.createElement('button');
    scrollRing.className = 'scroll-ring';
    scrollRing.setAttribute('aria-label', 'Volver arriba');
    scrollRing.innerHTML = `
        <div class="scroll-ring__bg"></div>
        <svg viewBox="0 0 56 56" aria-hidden="true">
            <defs>
                <linearGradient id="scrollRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F28C28"/>
                    <stop offset="50%" stop-color="#eab818"/>
                    <stop offset="100%" stop-color="#f9167e"/>
                </linearGradient>
            </defs>
            <circle class="scroll-ring__track" cx="28" cy="28" r="26"/>
            <circle class="scroll-ring__bar" cx="28" cy="28" r="26"/>
        </svg>
        <span class="scroll-ring__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        </span>
    `;
    document.body.appendChild(scrollRing);

    const ringBar = scrollRing.querySelector('.scroll-ring__bar');
    const ringCircumference = 2 * Math.PI * 26;
    ringBar.style.strokeDasharray = ringCircumference;

    let progressTicking = false;
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        ringBar.style.strokeDashoffset = ringCircumference * (1 - progress);
        scrollRing.classList.toggle('visible', scrollTop > 400);
        progressTicking = false;
    }
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            requestAnimationFrame(updateScrollProgress);
            progressTicking = true;
        }
    }, { passive: true });

    scrollRing.addEventListener('click', () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        track('scroll_to_top_click');
    });

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
                // Celebration confetti — brand colors
                if (typeof confetti === 'function') {
                    const brandColors = ['#1a8a4a', '#F28C28', '#eab818', '#f9167e', '#2c3d6b'];
                    const end = Date.now() + 1500;
                    (function frame() {
                        confetti({
                            particleCount: 4,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0, y: 0.85 },
                            colors: brandColors
                        });
                        confetti({
                            particleCount: 4,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1, y: 0.85 },
                            colors: brandColors
                        });
                        if (Date.now() < end) requestAnimationFrame(frame);
                    })();
                }
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

    // --- DESTINATION INTEREST (GA4) ---
    document.querySelectorAll('.destination-highlight--icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const label = icon.querySelector('span')?.textContent.replace(/\s+/g, ' ').trim() || 'unknown';
            track('destination_interest_click', { destination_type: label });
        });
    });

    // --- SOCIAL CLICK (GA4) ---
    document.querySelectorAll('.footer__social a').forEach(a => {
        a.addEventListener('click', () => {
            const network = a.getAttribute('aria-label') || 'unknown';
            track('social_click', { network: network.toLowerCase(), url: a.href });
        });
    });

    // --- LOCATION OPTION CLICK (GA4) ---
    document.querySelectorAll('.location__option').forEach(opt => {
        opt.addEventListener('click', () => {
            const title = opt.querySelector('h4')?.textContent.trim() || 'unknown';
            track('location_option_click', { option: title });
        });
    });

    // --- GALLERY CLICK + LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
    const gallerySources = galleryItems.map(item => {
        const img = item.querySelector('img');
        return {
            src: img?.currentSrc || img?.src || '',
            alt: img?.alt || ''
        };
    });

    let currentLightboxIndex = 0;

    const openLightbox = (index) => {
        if (!lightbox || !gallerySources[index]) return;
        currentLightboxIndex = index;
        lightboxImage.src = gallerySources[index].src;
        lightboxImage.alt = gallerySources[index].alt;
        lightboxCounter.textContent = `${index + 1} / ${gallerySources.length}`;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
    };

    const navLightbox = (dir) => {
        const total = gallerySources.length;
        const newIndex = (currentLightboxIndex + dir + total) % total;
        openLightbox(newIndex);
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const src = gallerySources[index].src;
            const name = src.split('/').pop().split('.')[0] || `item_${index + 1}`;
            track('gallery_click', { gallery_item: name, gallery_index: index + 1 });
            openLightbox(index);
        });
    });

    if (lightbox) {
        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxPrev?.addEventListener('click', () => navLightbox(-1));
        lightboxNext?.addEventListener('click', () => navLightbox(1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navLightbox(-1);
            if (e.key === 'ArrowRight') navLightbox(1);
        });

        // Touch swipe
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) navLightbox(dx > 0 ? -1 : 1);
        }, { passive: true });
    }

    // --- FORM START / FIELD BLUR TRACKING (GA4) ---
    let formStartTracked = false;
    const formFieldsBlurTracked = new Set();
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('focus', () => {
            if (!formStartTracked) {
                formStartTracked = true;
                track('form_start', { form_name: 'contact' });
            }
        }, { once: false });

        field.addEventListener('blur', () => {
            if (formFieldsBlurTracked.has(field.name)) return;
            const hasValue = field.type === 'checkbox' ? field.checked : field.value.trim().length > 0;
            if (!hasValue) {
                formFieldsBlurTracked.add(field.name);
                track('form_field_abandon', { form_name: 'contact', field_name: field.name });
            }
        });
    });

    // --- WEB VITALS TRACKING (GA4) ---
    try {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            if (last) {
                track('web_vitals', {
                    metric_name: 'LCP',
                    metric_value: Math.round(last.renderTime || last.loadTime || last.startTime),
                    metric_rating: last.startTime < 2500 ? 'good' : last.startTime < 4000 ? 'needs_improvement' : 'poor'
                });
            }
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) clsValue += entry.value;
            }
        }).observe({ type: 'layout-shift', buffered: true });

        // Send CLS on page hide (final value)
        const sendCls = () => {
            if (clsValue > 0) {
                track('web_vitals', {
                    metric_name: 'CLS',
                    metric_value: Math.round(clsValue * 1000) / 1000,
                    metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
                });
                clsValue = 0;
            }
        };
        addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendCls(); }, { once: true });
        addEventListener('pagehide', sendCls, { once: true });

        // INP (Interaction to Next Paint) via event timing
        let maxInp = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.interactionId && entry.duration > maxInp) {
                    maxInp = entry.duration;
                    track('web_vitals', {
                        metric_name: 'INP',
                        metric_value: Math.round(maxInp),
                        metric_rating: maxInp < 200 ? 'good' : maxInp < 500 ? 'needs_improvement' : 'poor'
                    });
                }
            }
        }).observe({ type: 'event', buffered: true, durationThreshold: 40 });
    } catch (_) {}

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

    // --- STORYTELLING CAROUSEL (auto-play + clickable dots) ---
    const storyImages = document.querySelectorAll('.stories__img');
    const storyDots = document.querySelectorAll('.stories__progress-dot');
    const stories = document.querySelectorAll('.story');
    const storiesSection = document.querySelector('.stories');

    if (stories.length > 0 && storyImages.length > 0) {
        let activeStory = 0;
        let storyInterval = null;
        const AUTOPLAY_MS = 4500;

        const activateStory = (idx) => {
            activeStory = idx;
            stories.forEach((s, i) => s.classList.toggle('active', i === idx));
            storyImages.forEach((img, i) => img.classList.toggle('visible', i === idx));
            storyDots.forEach((d, i) => d.classList.toggle('active', i === idx));
        };

        const nextStory = () => activateStory((activeStory + 1) % stories.length);

        const startAutoplay = () => {
            stopAutoplay();
            if (!prefersReducedMotion) {
                storyInterval = setInterval(nextStory, AUTOPLAY_MS);
            }
        };

        const stopAutoplay = () => {
            if (storyInterval) {
                clearInterval(storyInterval);
                storyInterval = null;
            }
        };

        // Clickable dots
        storyDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                activateStory(i);
                startAutoplay();
                track('story_dot_click', { story_index: i });
            });
        });

        // Pause on hover (desktop)
        if (storiesSection) {
            storiesSection.addEventListener('mouseenter', stopAutoplay);
            storiesSection.addEventListener('mouseleave', startAutoplay);
        }

        // Play only when section is in viewport
        if (storiesSection) {
            const visibilityObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            }, { threshold: 0.3 });
            visibilityObserver.observe(storiesSection);
        }

        // Initial state
        activateStory(0);
    }

    // --- HERO SPLIT TEXT LETTER REVEAL ---
    if (!prefersReducedMotion) {
        document.querySelectorAll('.hero__title-line').forEach((line, lineIdx) => {
            const text = line.textContent;
            line.textContent = '';
            line.classList.add('split-ready');
            // Override hero-anim parent hidden state; split controls its own reveal
            line.style.opacity = '1';
            line.style.transform = 'none';
            line.style.filter = 'none';

            const baseDelay = lineIdx === 0 ? 200 : 700;
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'split-char' + (char === ' ' ? ' split-space' : '');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${(baseDelay + i * 28) / 1000}s`;
                line.appendChild(span);
            });
        });

        // Trigger entrance immediately (delays handle stagger)
        requestAnimationFrame(() => {
            document.querySelectorAll('.split-char').forEach(c => c.classList.add('visible'));
        });
    }

    // --- CLIP-PATH IMAGE REVEAL ON SCROLL ---
    const clipTargets = document.querySelectorAll('.valle__card, .gallery__item, .exhibitors__render-item, .evento__razon-img, .evento__exp-card, .video-showcase__player');
    clipTargets.forEach(el => el.classList.add('clip-reveal'));
    const clipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                clipObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    clipTargets.forEach(el => clipObserver.observe(el));

    // --- HERO AMBIENT PARTICLES ---
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer && !prefersReducedMotion) {
        const particleCount = window.innerWidth > 768 ? 18 : 10;
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'hero__parallax-particle';
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDuration = `${8 + Math.random() * 10}s`;
            p.style.animationDelay = `${Math.random() * 10}s`;
            p.style.opacity = `${0.4 + Math.random() * 0.5}`;
            const size = 2 + Math.random() * 3;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            particlesContainer.appendChild(p);
        }
    }

    // --- HERO WAVES PARALLAX ON SCROLL ---
    const heroWaves = document.querySelector('.hero__parallax-waves');
    if (heroWaves && !prefersReducedMotion) {
        let wavesTicking = false;
        window.addEventListener('scroll', () => {
            if (!wavesTicking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y < window.innerHeight) {
                        heroWaves.style.transform = `translateY(${y * 0.3}px)`;
                    }
                    wavesTicking = false;
                });
                wavesTicking = true;
            }
        }, { passive: true });
    }

    // --- CUSTOM CURSOR (desktop only) ---
    const isDesktop = window.matchMedia('(hover: hover) and (min-width: 1025px)').matches;
    if (isDesktop && !prefersReducedMotion) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let curX = mouseX, curY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function loop() {
            curX += (mouseX - curX) * 0.22;
            curY += (mouseY - curY) * 0.22;
            cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        }
        loop();

        const hoverSel = 'a, button, input, textarea, select, [role="button"], .gallery__item, .faq__question, .valle__card, .evento__exp-card, .destination-highlight--icon, .video-showcase__player, .whatsapp-float';
        document.querySelectorAll(hoverSel).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        document.addEventListener('mousedown', () => cursor.classList.add('click'));
        document.addEventListener('mouseup', () => cursor.classList.remove('click'));

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    }

    // --- TILT 3D ON CARDS (desktop only) ---
    if (isDesktop && !prefersReducedMotion) {
        const tiltTargets = document.querySelectorAll('.valle__card, .exhibitors__render-item, .benefit-card, .evento__exp-card');
        tiltTargets.forEach(card => {
            card.classList.add('tilt-3d');
            let tiltRaf = null;

            card.addEventListener('mousemove', (e) => {
                if (tiltRaf) return;
                tiltRaf = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    const rotY = x * 8;
                    const rotX = y * -8;
                    card.classList.add('tilting');
                    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.01)`;
                    tiltRaf = null;
                });
            });

            card.addEventListener('mouseleave', () => {
                if (tiltRaf) { cancelAnimationFrame(tiltRaf); tiltRaf = null; }
                card.classList.remove('tilting');
                card.style.transform = '';
            });
        });
    }
});
