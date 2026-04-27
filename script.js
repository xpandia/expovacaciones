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

    // --- HERO KEN BURNS SLIDESHOW ---
    const slides = document.querySelectorAll('.hero__slide');
    let currentSlide = 0;

    // Start zoom on first slide immediately
    requestAnimationFrame(() => {
        slides[0].classList.add('hero__slide--zooming');
    });

    const heroFlash = document.getElementById('heroFlash');

    function nextSlide() {
        const prev = slides[currentSlide];
        currentSlide = (currentSlide + 1) % slides.length;
        const next = slides[currentSlide];

        // Cinematic flash on slide change
        if (heroFlash && !prefersReducedMotion) {
            heroFlash.classList.remove('flash-active');
            void heroFlash.offsetWidth;
            heroFlash.classList.add('flash-active');
        }

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

    // --- COOKIE CONSENT BANNER ---
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const CONSENT_KEY = 'expovac_cookie_consent';

    if (cookieBanner) {
        const prevConsent = localStorage.getItem(CONSENT_KEY);
        if (!prevConsent) {
            setTimeout(() => cookieBanner.classList.add('visible'), 1500);
        }

        const applyConsent = (status) => {
            localStorage.setItem(CONSENT_KEY, status);
            cookieBanner.classList.remove('visible');
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'ad_storage': status === 'all' ? 'granted' : 'denied',
                    'ad_user_data': status === 'all' ? 'granted' : 'denied',
                    'ad_personalization': status === 'all' ? 'granted' : 'denied',
                    'analytics_storage': status === 'all' ? 'granted' : 'denied'
                });
                track('cookie_consent', { status });
            }
        };

        cookieAccept?.addEventListener('click', () => applyConsent('all'));
        cookieReject?.addEventListener('click', () => applyConsent('essential'));
    }

    // --- ANNOUNCEMENT BAR (top) ---
    const announcementBar = document.getElementById('announcementBar');
    const announcementDays = document.getElementById('announcementDays');
    const announcementClose = document.getElementById('announcementClose');

    // Restore hidden state from localStorage
    if (localStorage.getItem('expovac_banner_hidden') === '1') {
        document.body.classList.add('banner-hidden');
    }

    announcementClose?.addEventListener('click', () => {
        document.body.classList.add('banner-hidden');
        localStorage.setItem('expovac_banner_hidden', '1');
        track('banner_close', { banner: 'announcement' });
    });

    announcementBar?.querySelector('.announcement-bar__cta')?.addEventListener('click', () => {
        track('cta_click', { cta_label: 'Quiero ir', cta_location: 'announcement_bar' });
    });

    // --- VIDEO MODAL POP-UP ---
    const videoModal = document.getElementById('videoModal');
    const openVideoBtn = document.getElementById('openVideoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoModalX = document.getElementById('videoModalX');
    const videoModalVideo = document.getElementById('videoModalVideo');

    const openModal = () => {
        if (!videoModal || !videoModalVideo) return;
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('video-modal-open');
        videoModalVideo.currentTime = 0;
        videoModalVideo.play().catch(() => {});
        track('video_modal_open', { location: 'hero_ver_video' });
    };

    const closeModal = () => {
        if (!videoModal || !videoModalVideo) return;
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('video-modal-open');
        videoModalVideo.pause();
    };

    openVideoBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    videoModalClose?.addEventListener('click', closeModal);
    videoModalX?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal?.classList.contains('is-open')) {
            closeModal();
        }
    });

    // --- COUNTDOWN ---
    const eventDate = new Date('2026-05-22T09:00:00-05:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const setWithFlip = (el, newVal) => {
        if (!el || el.textContent === newVal) return;
        el.classList.remove('flip-in');
        void el.offsetWidth;
        el.textContent = newVal;
        el.classList.add('flip-in');
    };

    function updateCountdown() {
        const now = Date.now();
        const diff = eventDate - now;

        if (diff <= 0) {
            setWithFlip(daysEl, '00');
            setWithFlip(hoursEl, '00');
            setWithFlip(minutesEl, '00');
            setWithFlip(secondsEl, '00');
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setWithFlip(daysEl, String(days).padStart(2, '0'));
        setWithFlip(hoursEl, String(hours).padStart(2, '0'));
        setWithFlip(minutesEl, String(minutes).padStart(2, '0'));
        setWithFlip(secondsEl, String(seconds).padStart(2, '0'));

        if (announcementDays) announcementDays.textContent = String(days);
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

    // --- REELS (auto-play muted, unmute on click, pause out of viewport) ---
    const reels = document.querySelectorAll('.reel');
    reels.forEach((reel, index) => {
        const video = reel.querySelector('.reel__video');
        const soundBtn = reel.querySelector('.reel__sound');
        const frame = reel.querySelector('.reel__frame');
        const videoSrc = video?.querySelector('source')?.src || video?.src || '';
        const videoName = videoSrc.split('/').pop().split('.')[0] || `reel_${index + 1}`;
        let reelPlayTracked = false;
        if (!video) return;

        // Play/pause based on viewport visibility
        const playObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.35 });
        playObserver.observe(reel);

        // Toggle sound on button click (not propagate)
        soundBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isMuted = video.muted;
            if (isMuted) {
                // Mute all other reels
                reels.forEach(other => {
                    if (other !== reel) {
                        const otherVideo = other.querySelector('.reel__video');
                        const otherBtn = other.querySelector('.reel__sound');
                        if (otherVideo) otherVideo.muted = true;
                        if (otherBtn) otherBtn.setAttribute('data-muted', 'true');
                    }
                });
                video.muted = false;
                soundBtn.setAttribute('data-muted', 'false');
                soundBtn.setAttribute('aria-label', 'Silenciar');
            } else {
                video.muted = true;
                soundBtn.setAttribute('data-muted', 'true');
                soundBtn.setAttribute('aria-label', 'Activar sonido');
            }
        });

        // Track first play
        video.addEventListener('play', () => {
            if (!reelPlayTracked) {
                track('video_play', { video_name: videoName, video_index: index + 1, format: 'reel' });
                reelPlayTracked = true;
            }
        }, { once: false });

        // Click on frame (not sound btn) = toggle pause/play manually
        frame?.addEventListener('click', (e) => {
            if (e.target.closest('.reel__sound')) return;
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
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

    // --- TYPING ANIMATION (hero slogan) ---
    const sloganEl = document.querySelector('.hero__slogan');
    if (sloganEl && !prefersReducedMotion) {
        const text = sloganEl.textContent;
        sloganEl.textContent = '';
        sloganEl.classList.add('typing');
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        sloganEl.appendChild(cursor);

        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                const node = document.createTextNode(text[i]);
                sloganEl.insertBefore(node, cursor);
                i++;
                const delay = text[i - 1] === ' ' ? 40 : 55 + Math.random() * 30;
                setTimeout(typeChar, delay);
            } else {
                setTimeout(() => cursor.classList.add('typing-cursor--done'), 2000);
            }
        };
        setTimeout(typeChar, 1800);
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

    // --- HERO MOUSE PARALLAX (desktop) ---
    const heroSection = document.querySelector('.hero');
    const heroSlideshow = document.querySelector('.hero__slideshow');
    if (heroSection && heroSlideshow && !prefersReducedMotion && window.matchMedia('(hover: hover) and (min-width: 1025px)').matches) {
        let parallaxRaf = null;
        heroSection.addEventListener('mousemove', (e) => {
            if (parallaxRaf) return;
            parallaxRaf = requestAnimationFrame(() => {
                const rect = heroSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                heroSlideshow.style.transform = `perspective(1200px) rotateY(${x * 2.5}deg) rotateX(${y * -2}deg) scale(1.02)`;
                parallaxRaf = null;
            });
        });
        heroSection.addEventListener('mouseleave', () => {
            heroSlideshow.style.transform = '';
        });
    }

    // --- PAPER PLANE CURSOR TRAIL (desktop only) ---
    const isDesktopTrail = window.matchMedia('(hover: hover) and (min-width: 1025px)').matches;
    if (isDesktopTrail && !prefersReducedMotion) {
        const trailContainer = document.createElement('div');
        trailContainer.className = 'plane-trail-container';
        document.body.appendChild(trailContainer);

        let lastPlaneTime = 0;
        let lastX = 0, lastY = 0;
        const PLANE_INTERVAL = 140; // ms between planes

        const planeSvg = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>`;

        document.addEventListener('mousemove', (e) => {
            const now = performance.now();
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (now - lastPlaneTime < PLANE_INTERVAL || distance < 20) return;

            lastPlaneTime = now;
            lastX = e.clientX;
            lastY = e.clientY;

            const plane = document.createElement('div');
            plane.className = 'plane-trail';
            plane.innerHTML = planeSvg;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            plane.style.left = `${e.clientX}px`;
            plane.style.top = `${e.clientY}px`;
            plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            trailContainer.appendChild(plane);

            setTimeout(() => plane.remove(), 900);
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

    // ========================================
    // WHATSAPP CONTEXTUAL — mensaje según sección visible
    // ========================================
    const WA_PHONE = '573147908555';
    const WA_BASE = `https://wa.me/${WA_PHONE}?text=`;

    const sectionMessages = {
        'inicio': 'Hola, vi Expovacaciones Cali 2026 y me interesa asistir. ¿Me das más información?',
        'sobre': 'Hola, quiero información sobre el evento Expovacaciones del 22-24 de Mayo en Chipichape.',
        'destinos': 'Hola, vi los destinos de Expovacaciones y me interesan los paquetes turísticos. ¿Pueden asesorarme?',
        'reels': 'Hola, vi los videos de Expovacaciones y me gustaría más información sobre los destinos.',
        'valle': 'Hola, me interesa conocer más sobre los destinos del Valle del Cauca en Expovacaciones.',
        'galeria': 'Hola, después de ver la galería de Expovacaciones quiero asistir. ¿Cómo me registro?',
        'expositores': 'Hola, quiero ver el listado de expositores de Expovacaciones 2026.',
        'ser-expositor': 'Hola, me interesa participar como expositor en Expovacaciones Cali 2026. ¿Tienen información?',
        'como-llegar': 'Hola, ¿cómo llego a Chipichape para Expovacaciones 2026?',
        'faq': 'Hola, tengo dudas sobre Expovacaciones Cali 2026. ¿Pueden ayudarme?',
        'contacto': 'Hola, quiero recibir información de Expovacaciones Cali 2026.'
    };

    let currentSection = 'inicio';

    function getCurrentSectionMessage() {
        return sectionMessages[currentSection] || sectionMessages['inicio'];
    }

    function buildWaUrl() {
        return WA_BASE + encodeURIComponent(getCurrentSectionMessage());
    }

    function updateWaLinks() {
        const url = buildWaUrl();
        document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
            a.href = url;
        });
    }

    // Detectar sección visible con IntersectionObserver
    const trackedSections = ['inicio', 'sobre', 'destinos', 'reels', 'valle', 'galeria',
                              'expositores', 'ser-expositor', 'como-llegar', 'faq', 'contacto'];
    const sectionEls = trackedSections
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if (sectionEls.length && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    currentSection = entry.target.id;
                    updateWaLinks();
                }
            });
        }, { threshold: [0.3, 0.5] });

        sectionEls.forEach(el => sectionObserver.observe(el));
    }

    // Inicializar links con mensaje default
    updateWaLinks();

    // ========================================
    // STICKY CTA INTELIGENTE — texto cambia según sección
    // ========================================
    const stickyCtaBtn = document.querySelector('.sticky-cta__primary span');
    if (stickyCtaBtn) {
        const stickyTexts = {
            'inicio': 'Quiero ir',
            'sobre': 'Quiero ir',
            'destinos': 'Ver destinos',
            'reels': 'Quiero ir',
            'valle': 'Explorar Valle',
            'galeria': 'Quiero ir',
            'expositores': 'Ver expositores',
            'ser-expositor': 'Ser expositor',
            'como-llegar': 'Cómo llegar',
            'faq': 'Quiero ir',
            'contacto': 'Quiero ir'
        };

        const updateStickyText = () => {
            const newText = stickyTexts[currentSection] || 'Quiero ir';
            if (stickyCtaBtn.textContent !== newText) {
                stickyCtaBtn.textContent = newText;
            }
        };

        // Re-update on section change
        if (sectionEls.length && 'IntersectionObserver' in window) {
            const stickyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        updateStickyText();
                    }
                });
            }, { threshold: [0.3] });
            sectionEls.forEach(el => stickyObserver.observe(el));
        }
    }

    // ========================================
    // FAQ TABS — filtrar por categoría
    // ========================================
    const faqTabs = document.querySelectorAll('.faq__tab');
    const faqTabItems = document.querySelectorAll('.faq__item');
    if (faqTabs.length && faqTabItems.length) {
        faqTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const cat = tab.dataset.faqCat;
                faqTabs.forEach(t => {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');

                faqTabItems.forEach(item => {
                    if (cat === 'all' || item.dataset.faqCat === cat) {
                        item.classList.remove('is-hidden');
                    } else {
                        item.classList.add('is-hidden');
                    }
                });
                track('faq_filter', { category: cat });
            });
        });
    }

    // SPLASH LOADER — manejado por script inline en index.html
    // (ver bloque <script> después de #splashLoader)

    // ========================================
    // ACTIVE NAV INDICATOR — resalta sección visible
    // ========================================
    const headerNavLinks = document.querySelectorAll('.header__nav .nav-link[href^="#"]');
    if (headerNavLinks.length && 'IntersectionObserver' in window) {
        const sectionMap = new Map();
        headerNavLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) sectionMap.set(target, link);
        });

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const link = sectionMap.get(entry.target);
                if (!link) return;
                if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                    headerNavLinks.forEach(l => l.classList.remove('is-active'));
                    link.classList.add('is-active');
                }
            });
        }, { threshold: [0.4] });

        sectionMap.forEach((_, target) => navObserver.observe(target));
    }

    // ========================================
    // PROGRESS SCROLL BAR LATERAL
    // ========================================
    const verticalProgressBar = document.createElement('div');
    verticalProgressBar.className = 'scroll-progress-vertical';
    verticalProgressBar.innerHTML = '<div class="scroll-progress-vertical__fill"></div>';
    document.body.appendChild(verticalProgressBar);
    const verticalProgressFill = verticalProgressBar.querySelector('.scroll-progress-vertical__fill');

    let vProgressTicking = false;
    const updateVerticalProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const pct = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
        verticalProgressFill.style.height = `${pct}%`;
        vProgressTicking = false;
    };
    window.addEventListener('scroll', () => {
        if (!vProgressTicking) {
            requestAnimationFrame(updateVerticalProgress);
            vProgressTicking = true;
        }
    }, { passive: true });

    // ========================================
    // SOCIAL PROOF NOTIFICATIONS (FOMO)
    // ========================================
    const socialProofEl = document.getElementById('socialProof');
    if (socialProofEl) {
        const proofs = [
            { name: 'Camila', initials: 'CM', color: '#a8c435', action: 'reservó su lugar', time: 'hace 5 min', city: 'Cali' },
            { name: 'Andrés', initials: 'AR', color: '#5aa03d', action: 'pidió info de San Andrés', time: 'hace 8 min', city: 'Palmira' },
            { name: 'Valentina', initials: 'VL', color: '#f5d020', action: 'agendó cita con asesor', time: 'hace 12 min', city: 'Cali' },
            { name: 'Juan David', initials: 'JD', color: '#e8a317', action: 'cotizó paquete a Cancún', time: 'hace 15 min', city: 'Tuluá' },
            { name: 'María', initials: 'MA', color: '#a8c435', action: 'apartó su entrada', time: 'hace 18 min', city: 'Cali' },
            { name: 'Sofía', initials: 'SF', color: '#5aa03d', action: 'reservó plan familiar', time: 'hace 22 min', city: 'Buga' },
            { name: 'Carlos', initials: 'CR', color: '#c89b1d', action: 'reservó tour al Valle', time: 'hace 25 min', city: 'Yumbo' },
            { name: 'Daniela', initials: 'DA', color: '#a8c435', action: 'recibió descuento exclusivo', time: 'hace 28 min', city: 'Cali' },
            { name: 'Felipe', initials: 'FE', color: '#5aa03d', action: 'agendó visita al evento', time: 'hace 32 min', city: 'Palmira' },
            { name: 'Laura', initials: 'LR', color: '#f5d020', action: 'cotizó luna de miel', time: 'hace 35 min', city: 'Cali' },
        ];

        let idx = 0;
        let proofTimer = null;

        const renderProof = (p) => {
            return `
                <div class="social-proof__card">
                    <button type="button" class="social-proof__close" aria-label="Cerrar">×</button>
                    <div class="social-proof__avatar" style="background: linear-gradient(135deg, ${p.color}, #c89b1d);">${p.initials}</div>
                    <div class="social-proof__body">
                        <p class="social-proof__text"><strong>${p.name}</strong> ${p.action}</p>
                        <p class="social-proof__meta">${p.city} · ${p.time}</p>
                    </div>
                </div>
            `;
        };

        const showProof = () => {
            const p = proofs[idx % proofs.length];
            idx++;
            socialProofEl.innerHTML = renderProof(p);
            const card = socialProofEl.querySelector('.social-proof__card');
            requestAnimationFrame(() => card?.classList.add('is-visible'));
            const close = socialProofEl.querySelector('.social-proof__close');
            close?.addEventListener('click', () => {
                card?.classList.remove('is-visible');
                clearTimeout(proofTimer);
                socialProofEl.innerHTML = '';
            });
            // Auto-hide después de 6s
            setTimeout(() => {
                card?.classList.remove('is-visible');
                setTimeout(() => { socialProofEl.innerHTML = ''; }, 400);
            }, 6000);
        };

        // Empezar después de 8s (que el user explore primero)
        setTimeout(() => {
            showProof();
            proofTimer = setInterval(showProof, 18000);
        }, 8000);
    }

    // ========================================
    // MAGNETIC BUTTONS — el botón sigue al cursor
    // ========================================
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        const magneticEls = document.querySelectorAll('.btn-hero-main, .valle__cta, .gallery__cta, .form-submit, .nav-link--cta, .announcement-bar__cta');
        magneticEls.forEach(el => {
            const strength = 0.25;
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // ========================================
    // SPLIT TEXT REVEAL — letras hero aparecen con stagger
    // ========================================
    if (!prefersReducedMotion) {
        const heroTitleLines = document.querySelectorAll('.hero__title--mockup .hero__title-line, .hero__title--mockup .hero__title-script--big');
        let totalDelay = 0;
        heroTitleLines.forEach(line => {
            const text = line.textContent;
            const wrapper = document.createElement('span');
            wrapper.className = 'split-text';
            wrapper.setAttribute('aria-label', text);
            line.textContent = '';
            text.split('').forEach((ch) => {
                const span = document.createElement('span');
                span.className = 'split-char';
                span.style.animationDelay = `${totalDelay}s`;
                span.textContent = ch === ' ' ? '\u00A0' : ch;
                span.setAttribute('aria-hidden', 'true');
                wrapper.appendChild(span);
                totalDelay += 0.025;
            });
            line.appendChild(wrapper);
        });
    }

    // ========================================
    // ANIMATED COUNTERS — números stats al entrar viewport
    // ========================================
    const animatedNumbers = document.querySelectorAll('.gallery__stat-number, .event-stats-bar__number');
    const animateCounter = (el) => {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(\+?)$/);
        if (!match) return; // Skip non-numeric like "Miles"
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const duration = 1500;
        const start = performance.now();
        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window && animatedNumbers.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = '1';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        animatedNumbers.forEach(el => counterObserver.observe(el));
    }

    // ========================================
    // CONFETTI on QUIERO IR click
    // ========================================
    const heroQuieroBtn = document.querySelector('.btn-hero-main');
    if (heroQuieroBtn && typeof confetti === 'function') {
        heroQuieroBtn.addEventListener('click', () => {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.7 },
                colors: ['#a8c435', '#f5d020', '#5aa03d', '#e8a317', '#ffffff']
            });
        });
    }

    // ========================================
    // EXIT-INTENT MODAL
    // ========================================
    const exitModal = document.getElementById('exitIntentModal');
    if (exitModal && !sessionStorage.getItem('exitIntentShown')) {
        const exitModalClose = document.getElementById('exitIntentClose');
        const exitModalCta = exitModal.querySelector('.exit-modal__cta');
        let exitTriggered = false;

        const showExitModal = () => {
            if (exitTriggered) return;
            exitTriggered = true;
            sessionStorage.setItem('exitIntentShown', '1');
            exitModal.classList.add('is-open');
            exitModal.setAttribute('aria-hidden', 'false');
            track('exit_intent_shown', {});
        };

        const closeExitModal = () => {
            exitModal.classList.remove('is-open');
            exitModal.setAttribute('aria-hidden', 'true');
        };

        // Trigger on mouseleave hacia top (desktop)
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && window.scrollY > 300) {
                showExitModal();
            }
        });

        // Trigger on mobile: scroll up rápido después de scroll down
        let lastScroll = window.scrollY;
        let scrollUpCount = 0;
        window.addEventListener('scroll', () => {
            const cur = window.scrollY;
            if (cur < lastScroll - 50 && cur > 800) {
                scrollUpCount++;
                if (scrollUpCount >= 2) showExitModal();
            }
            lastScroll = cur;
        }, { passive: true });

        exitModalClose?.addEventListener('click', closeExitModal);
        exitModal.querySelector('.exit-modal__backdrop')?.addEventListener('click', closeExitModal);
        exitModalCta?.addEventListener('click', () => {
            track('exit_intent_cta_click', {});
            closeExitModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && exitModal.classList.contains('is-open')) {
                closeExitModal();
            }
        });
    }
});
