document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const homeScreen = document.getElementById('home-screen');
    const backBtn = document.getElementById('back-to-welcome');
    const scene = document.querySelector('.scene');

    const pageHome = document.getElementById('page-home');
    const pageArtist = document.getElementById('page-artist');
    const pageCollection = document.getElementById('page-collection');
    const pagePosters = document.getElementById('page-posters');
    const pageRunway = document.getElementById('page-runway');
    const pageRecap = document.getElementById('page-recap');
    const pageStage = document.getElementById('page-stage');
    const pageMoments = document.getElementById('page-moments');
    const pageBooking = document.getElementById('page-booking');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerLogo = document.querySelector('.header-logo');
    const jumpToArtistBtn = document.getElementById('jump-to-artist');
    const hintText = jumpToArtistBtn ? jumpToArtistBtn.querySelector('.hint-text') : null;
    const backToHeroBtn = document.getElementById('btn-back-to-hero');
    const jumpToCollectionBtn = document.getElementById('btn-jump-to-collection');
    const backToArtistBtn = document.getElementById('btn-back-to-artist');
    const jumpToRunwayBtn = document.getElementById('btn-jump-to-runway');
    const backToCollectionBtn = document.getElementById('btn-back-to-collection');
    const jumpToRecapBtn = document.getElementById('btn-jump-to-recap');
    const recapToRunwayBtn = document.getElementById('btn-recap-to-runway');
    const recapToStageBtn = document.getElementById('btn-recap-to-stage');
    const backToRecapBtn = document.getElementById('btn-back-to-recap');
    const stageToHomeBtn = document.getElementById('btn-stage-to-home');
    const stageToMomentsBtn = document.getElementById('btn-stage-to-moments');
    const momentsToStageBtn = document.getElementById('btn-moments-to-stage');
    const momentsToHomeBtn = document.getElementById('btn-moments-to-home');
    const momentsToPostersBtn = document.getElementById('btn-moments-to-posters');
    const postersToMomentsBtn = document.getElementById('btn-posters-to-moments');
    const postersToBookingBtn = document.getElementById('btn-posters-to-booking');
    const bookingToPostersBtn = document.getElementById('btn-booking-to-posters');
    const bookingToHomeBtn = document.getElementById('btn-booking-to-home');
    const bookingForm = document.getElementById('booking-inquiry-form');
    const bookingStatusMsg = document.getElementById('booking-status-msg');
    const backToHomeBtn = document.getElementById('btn-back-to-home');
    const collectionPosterFrame = document.getElementById('collection-poster-frame');
    const recapMainVideo = document.getElementById('recap-main-video');
    const momentsLightbox = document.getElementById('moments-lightbox');
    const momentsLightboxVideo = document.getElementById('moments-lightbox-video');
    const postersLightbox = document.getElementById('posters-lightbox');
    
    let currentPage = 'home';
    let isTransitioning = false;
    let resumeRunwayPhysics = null;
    let startTypewriterLoop = () => {};

    function switchPage(pageId) {
        if (!pageId || isTransitioning) return;
        if (pageId === currentPage) return;

        const previousPage = currentPage;
        isTransitioning = true;
        currentPage = pageId;

        // If navigating away from recap page, pause main video
        if (pageId !== 'recap' && recapMainVideo && !recapMainVideo.paused) {
            recapMainVideo.pause();
        }

        // If navigating away from moments page, close lightbox and pause video
        if (pageId !== 'moments') {
            if (momentsLightboxVideo) {
                momentsLightboxVideo.pause();
                momentsLightboxVideo.src = '';
            }
            if (momentsLightbox) {
                momentsLightbox.classList.remove('active');
            }
            if (pageMoments) {
                pageMoments.style.overflow = '';
                const playingPreviews = pageMoments.querySelectorAll('video.moment-preview-video');
                playingPreviews.forEach(v => {
                    if (!v.paused) {
                        v.pause();
                        v.currentTime = 1.0;
                    }
                });
                const playingCards = pageMoments.querySelectorAll('.moment-card.is-playing');
                playingCards.forEach(c => c.classList.remove('is-playing'));
            }
        }

        // If navigating away from posters page, close posters lightbox
        if (pageId !== 'posters') {
            if (postersLightbox) {
                postersLightbox.classList.remove('active');
            }
        }

        // Reset classes on all pages
        if (pageHome) pageHome.classList.remove('page-prev', 'active');
        if (pageArtist) pageArtist.classList.remove('page-prev', 'active');
        if (pageCollection) pageCollection.classList.remove('page-prev', 'active');
        if (pagePosters) pagePosters.classList.remove('page-prev', 'active');
        if (pageRunway) pageRunway.classList.remove('page-prev', 'active');
        if (pageRecap) pageRecap.classList.remove('page-prev', 'active');
        if (pageStage) pageStage.classList.remove('page-prev', 'active');
        if (pageMoments) pageMoments.classList.remove('page-prev', 'active');
        if (pageBooking) pageBooking.classList.remove('page-prev', 'active');

        if (pageId === 'home') {
            if (pageHome) pageHome.classList.add('active');
        } else if (pageId === 'artist') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) {
                pageArtist.classList.add('active');
                pageArtist.scrollTop = 0;
            }
        } else if (pageId === 'collection') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) {
                pageCollection.classList.add('active');
                if (previousPage === 'runway') {
                    const setBottom = () => {
                        pageCollection.scrollTop = Math.max(0, pageCollection.scrollHeight - pageCollection.clientHeight - 10);
                    };
                    setBottom();
                    requestAnimationFrame(setBottom);
                    setTimeout(setBottom, 50);
                } else {
                    pageCollection.scrollTop = 0;
                }
            }
        } else if (pageId === 'runway') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) {
                pageRunway.classList.add('active');
                pageRunway.scrollTop = 0;
            }
        } else if (pageId === 'recap') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) {
                pageRecap.classList.add('active');
                if (previousPage === 'stage') {
                    const setBottom = () => {
                        pageRecap.scrollTop = Math.max(0, pageRecap.scrollHeight - pageRecap.clientHeight - 10);
                    };
                    setBottom();
                    requestAnimationFrame(setBottom);
                    setTimeout(setBottom, 50);
                } else {
                    pageRecap.scrollTop = 0;
                }
            }
        } else if (pageId === 'stage') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) pageRecap.classList.add('page-prev');
            if (pageStage) {
                pageStage.classList.add('active');
                if (previousPage === 'moments') {
                    const setBottom = () => {
                        pageStage.scrollTop = Math.max(0, pageStage.scrollHeight - pageStage.clientHeight - 10);
                    };
                    setBottom();
                    requestAnimationFrame(setBottom);
                    setTimeout(setBottom, 50);
                } else {
                    pageStage.scrollTop = 0;
                }
            }
        } else if (pageId === 'moments') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) pageRecap.classList.add('page-prev');
            if (pageStage) pageStage.classList.add('page-prev');
            if (pageMoments) {
                pageMoments.classList.add('active');
                if (previousPage === 'posters') {
                    const setBottom = () => {
                        pageMoments.scrollTop = Math.max(0, pageMoments.scrollHeight - pageMoments.clientHeight - 10);
                    };
                    setBottom();
                    requestAnimationFrame(setBottom);
                    setTimeout(setBottom, 50);
                } else {
                    pageMoments.scrollTop = 0;
                }
            }
        } else if (pageId === 'posters') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) pageRecap.classList.add('page-prev');
            if (pageStage) pageStage.classList.add('page-prev');
            if (pageMoments) pageMoments.classList.add('page-prev');
            if (pagePosters) {
                pagePosters.classList.add('active');
                if (previousPage === 'booking') {
                    const setBottom = () => {
                        pagePosters.scrollTop = Math.max(0, pagePosters.scrollHeight - pagePosters.clientHeight - 10);
                    };
                    setBottom();
                    requestAnimationFrame(setBottom);
                    setTimeout(setBottom, 50);
                } else {
                    pagePosters.scrollTop = 0;
                }
            }
        } else if (pageId === 'booking') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) pageRecap.classList.add('page-prev');
            if (pageStage) pageStage.classList.add('page-prev');
            if (pageMoments) pageMoments.classList.add('page-prev');
            if (pagePosters) pagePosters.classList.add('page-prev');
            if (pageBooking) {
                pageBooking.classList.add('active');
                pageBooking.scrollTop = 0;
            }
        }

        // Update Nav Links
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === pageId) {
                link.classList.add('active');
                if (link.scrollIntoView) {
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                link.classList.remove('active');
            }
        });

        if (pageId === 'runway' && resumeRunwayPhysics) {
            resumeRunwayPhysics();
        }
        if (pageId === 'home') {
            startTypewriterLoop();
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 750);
    }

    // Nav link click listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (target === 'home' || target === 'artist' || target === 'collection' || target === 'posters' || target === 'runway' || target === 'recap' || target === 'stage' || target === 'moments' || target === 'booking') {
                e.preventDefault();
                switchPage(target);
            }
        });
    });

    if (headerLogo) {
        headerLogo.style.cursor = 'pointer';
        headerLogo.addEventListener('click', () => switchPage('home'));
    }

    if (jumpToArtistBtn) {
        jumpToArtistBtn.addEventListener('click', () => switchPage('artist'));
    }

    if (backToHeroBtn) {
        backToHeroBtn.addEventListener('click', () => switchPage('home'));
    }

    if (jumpToCollectionBtn) {
        jumpToCollectionBtn.addEventListener('click', () => switchPage('collection'));
    }

    if (backToArtistBtn) {
        backToArtistBtn.addEventListener('click', () => switchPage('artist'));
    }

    if (jumpToRunwayBtn) {
        jumpToRunwayBtn.addEventListener('click', () => switchPage('runway'));
    }

    if (backToCollectionBtn) {
        backToCollectionBtn.addEventListener('click', () => switchPage('collection'));
    }

    if (jumpToRecapBtn) {
        jumpToRecapBtn.addEventListener('click', () => switchPage('recap'));
    }

    if (recapToRunwayBtn) {
        recapToRunwayBtn.addEventListener('click', () => switchPage('runway'));
    }

    if (recapToStageBtn) {
        recapToStageBtn.addEventListener('click', () => switchPage('stage'));
    }

    if (backToRecapBtn) {
        backToRecapBtn.addEventListener('click', () => switchPage('recap'));
    }

    if (stageToHomeBtn) {
        stageToHomeBtn.addEventListener('click', () => switchPage('home'));
    }

    if (stageToMomentsBtn) {
        stageToMomentsBtn.addEventListener('click', () => switchPage('moments'));
    }

    if (momentsToStageBtn) {
        momentsToStageBtn.addEventListener('click', () => switchPage('stage'));
    }

    if (momentsToPostersBtn) {
        momentsToPostersBtn.addEventListener('click', () => switchPage('posters'));
    }

    if (momentsToHomeBtn) {
        momentsToHomeBtn.addEventListener('click', () => switchPage('home'));
    }

    if (postersToMomentsBtn) {
        postersToMomentsBtn.addEventListener('click', () => switchPage('moments'));
    }

    if (postersToBookingBtn) {
        postersToBookingBtn.addEventListener('click', () => switchPage('booking'));
    }

    if (bookingToPostersBtn) {
        bookingToPostersBtn.addEventListener('click', () => switchPage('posters'));
    }

    if (bookingToHomeBtn) {
        bookingToHomeBtn.addEventListener('click', () => switchPage('home'));
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => switchPage('home'));
    }

    // 1. Enter Site Handler
    function enterSite() {
        if (welcomeScreen.classList.contains('leaving') || homeScreen.classList.contains('visible')) return;
        if (enterBtn) enterBtn.style.pointerEvents = 'none';
        welcomeScreen.classList.add('leaving');
        
        setTimeout(() => {
            homeScreen.classList.add('visible');
            currentPage = 'home';
            if (pageHome) {
                pageHome.classList.add('active');
                pageHome.classList.remove('page-prev');
            }
            if (pageArtist) pageArtist.classList.remove('active', 'page-prev');
            if (pageCollection) pageCollection.classList.remove('active', 'page-prev');
            if (pageRunway) pageRunway.classList.remove('active', 'page-prev');
            if (pageRecap) pageRecap.classList.remove('active', 'page-prev');
            if (pageStage) pageStage.classList.remove('active', 'page-prev');
        }, 800);
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', enterSite);
    }

    // 2. Back button click transition
    backBtn.addEventListener('click', () => {
        homeScreen.classList.remove('visible');
        welcomeScreen.classList.remove('leaving');
        setTimeout(() => {
            if (enterBtn) enterBtn.style.pointerEvents = 'auto';
        }, 1200);
    });

    const homeStage = document.querySelector('.home-stage');
    const decorLines = document.querySelectorAll('.decor-line');
    const brandWordmark = document.getElementById('brand-footer-wordmark');
    const brandTextSpan = brandWordmark ? brandWordmark.querySelector('.brand-big-text') : null;
    const brandFullText = brandTextSpan ? (brandTextSpan.getAttribute('data-text') || 'SININE') : 'SININE';
    const scrollHint = document.querySelector('.home-scroll-hint');

    // -------------------------------------------------------------
    // 3. High-Performance Multi-Page Navigation & Scroll Engine
    // -------------------------------------------------------------
    const PAGE_SEQUENCE = [
        { id: 'home', el: pageHome },
        { id: 'artist', el: pageArtist },
        { id: 'collection', el: pageCollection },
        { id: 'runway', el: pageRunway },
        { id: 'recap', el: pageRecap },
        { id: 'stage', el: pageStage },
        { id: 'moments', el: pageMoments },
        { id: 'posters', el: pagePosters },
        { id: 'booking', el: pageBooking }
    ];

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let lastTouchY = 0;
    let overscrollAccumulator = 0;

    // Fast boundary check helpers (Generous thresholds for effortless navigation)
    function isScrolledToBottom(el) {
        if (!el) return true;
        if (el.id === 'page-runway') return true;
        return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 30);
    }

    function isScrolledToTop(el) {
        if (!el) return true;
        if (el.id === 'page-runway') return true;
        return el.scrollTop <= 15;
    }

    // Mouse Wheel Scroll Listener (Desktop / Trackpad - Light 25px threshold)
    window.addEventListener('wheel', (e) => {
        if (!homeScreen.classList.contains('visible')) {
            if (e.deltaY > 10) enterSite();
            return;
        }

        if (isTransitioning) return;

        if (currentPage === 'home') {
            if (e.deltaY > 0) {
                if (targetScrollProgress < 1.0) {
                    targetScrollProgress = Math.min(1.0, targetScrollProgress + e.deltaY * 0.0016);
                    startTypewriterLoop();
                } else if (targetScrollProgress >= 0.96) {
                    overscrollAccumulator += e.deltaY;
                    if (overscrollAccumulator > 25) {
                        overscrollAccumulator = 0;
                        switchPage('artist');
                    }
                }
            } else if (e.deltaY < 0) {
                targetScrollProgress = Math.max(0, targetScrollProgress + e.deltaY * 0.0016);
                startTypewriterLoop();
                overscrollAccumulator = 0;
            }
            return;
        }

        const currentIdx = PAGE_SEQUENCE.findIndex(p => p.id === currentPage);
        if (currentIdx === -1) return;
        const currentEl = PAGE_SEQUENCE[currentIdx].el;

        if (e.deltaY < 0 && isScrolledToTop(currentEl)) {
            overscrollAccumulator += Math.abs(e.deltaY);
            if (overscrollAccumulator > 25) {
                overscrollAccumulator = 0;
                if (currentIdx > 0) {
                    switchPage(PAGE_SEQUENCE[currentIdx - 1].id);
                }
            }
        } else if (e.deltaY > 0 && isScrolledToBottom(currentEl)) {
            overscrollAccumulator += e.deltaY;
            if (overscrollAccumulator > 25) {
                overscrollAccumulator = 0;
                if (currentIdx < PAGE_SEQUENCE.length - 1) {
                    switchPage(PAGE_SEQUENCE[currentIdx + 1].id);
                }
            }
        } else {
            overscrollAccumulator = 0;
        }
    }, { passive: true });

    // Touch Handling for Mobile (120Hz Native Smooth Scrolling + Ultra-Light Gentle Swipe Transitions)
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            lastTouchY = touchStartY;
            touchStartTime = performance.now();
            overscrollAccumulator = 0;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isTransitioning || e.touches.length === 0) return;

        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const delta = lastTouchY - touchY;
        lastTouchY = touchY;

        // If the gesture has noticeable horizontal movement, do NOT accumulate vertical page-switch overscroll
        if (Math.abs(touchX - touchStartX) > Math.abs(touchY - touchStartY) * 0.9) {
            overscrollAccumulator = 0;
            return;
        }

        if (!homeScreen.classList.contains('visible')) {
            if (delta > 20) enterSite();
            return;
        }

        if (currentPage === 'home') {
            if (delta > 0) {
                if (targetScrollProgress < 1.0) {
                    targetScrollProgress = Math.min(1.0, targetScrollProgress + delta * 0.0035);
                    startTypewriterLoop();
                } else if (targetScrollProgress >= 0.96) {
                    overscrollAccumulator += delta;
                    if (overscrollAccumulator > 35) {
                        overscrollAccumulator = 0;
                        switchPage('artist');
                    }
                }
            } else if (delta < 0) {
                targetScrollProgress = Math.max(0, targetScrollProgress + delta * 0.0035);
                startTypewriterLoop();
                overscrollAccumulator = 0;
            }
            return;
        }

        const currentIdx = PAGE_SEQUENCE.findIndex(p => p.id === currentPage);
        if (currentIdx === -1) return;
        const currentEl = PAGE_SEQUENCE[currentIdx].el;

        // Only switch pages with deliberate vertical overscroll (> 50px)
        if (delta > 0 && isScrolledToBottom(currentEl)) {
            overscrollAccumulator += delta;
            if (overscrollAccumulator > 50) {
                overscrollAccumulator = 0;
                if (currentIdx < PAGE_SEQUENCE.length - 1) {
                    switchPage(PAGE_SEQUENCE[currentIdx + 1].id);
                }
            }
        }
        else if (delta < 0 && isScrolledToTop(currentEl)) {
            overscrollAccumulator += Math.abs(delta);
            if (overscrollAccumulator > 50) {
                overscrollAccumulator = 0;
                if (currentIdx > 0) {
                    switchPage(PAGE_SEQUENCE[currentIdx - 1].id);
                }
            }
        } else {
            overscrollAccumulator = 0;
        }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isTransitioning || e.changedTouches.length === 0) return;
        if (currentPage === 'home') return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const totalDeltaY = touchStartY - touchEndY;
        const totalDeltaX = touchStartX - touchEndX;

        // Require clear vertical intent: vertical distance must be significantly larger than horizontal
        if (Math.abs(totalDeltaY) < Math.abs(totalDeltaX) * 1.5) return;

        const currentIdx = PAGE_SEQUENCE.findIndex(p => p.id === currentPage);
        if (currentIdx === -1) return;
        const currentEl = PAGE_SEQUENCE[currentIdx].el;

        // Intentional swipe at boundary
        if (totalDeltaY > 40 && isScrolledToBottom(currentEl)) {
            if (currentIdx < PAGE_SEQUENCE.length - 1) {
                switchPage(PAGE_SEQUENCE[currentIdx + 1].id);
            }
        }
        else if (totalDeltaY < -40 && isScrolledToTop(currentEl)) {
            if (currentIdx > 0) {
                switchPage(PAGE_SEQUENCE[currentIdx - 1].id);
            }
        }
    }, { passive: true });

    // -------------------------------------------------------------
    // Typewriter Animation Engine (Pre-cached & Sleeping when idle)
    // -------------------------------------------------------------
    const cachedDecorLines = Array.from(decorLines).map(line => ({
        el: line,
        index: parseInt(line.getAttribute('data-line'), 10) || 0,
        textSpan: line.querySelector('.decor-text'),
        fullText: line.querySelector('.decor-text')?.getAttribute('data-text') || '',
        currentCount: -1
    }));

    let lastBrandCount = -1;
    let isTypewriterRunning = false;

    function renderTypewriterFrames(progress) {
        cachedDecorLines.forEach((item) => {
            const lineStart = 0.04 + item.index * 0.16;
            const lineEnd = lineStart + 0.14;

            if (progress < lineStart) {
                if (item.currentCount !== 0) {
                    item.el.classList.remove('active', 'typing');
                    if (item.textSpan) item.textSpan.textContent = '';
                    item.currentCount = 0;
                }
            } else if (progress >= lineStart && progress < lineEnd) {
                const progressInLine = (progress - lineStart) / (lineEnd - lineStart);
                const charCount = Math.floor(progressInLine * (item.fullText.length + 1));
                if (charCount <= 0) {
                    if (item.currentCount !== 0) {
                        item.el.classList.remove('active', 'typing');
                        if (item.textSpan) item.textSpan.textContent = '';
                        item.currentCount = 0;
                    }
                } else if (charCount !== item.currentCount) {
                    item.el.classList.add('active', 'typing');
                    if (item.textSpan) item.textSpan.textContent = item.fullText.slice(0, charCount);
                    item.currentCount = charCount;
                }
            } else {
                if (item.currentCount !== item.fullText.length) {
                    item.el.classList.add('active');
                    item.el.classList.remove('typing');
                    if (item.textSpan) item.textSpan.textContent = item.fullText;
                    item.currentCount = item.fullText.length;
                }
            }
        });

        if (brandWordmark && brandTextSpan) {
            const brandStart = 0.70;
            const brandEnd = 0.96;

            if (progress < brandStart) {
                if (lastBrandCount !== 0) {
                    brandWordmark.classList.remove('active', 'typing');
                    brandTextSpan.textContent = '';
                    lastBrandCount = 0;
                }
            } else if (progress >= brandStart && progress < brandEnd) {
                const progressInBrand = (progress - brandStart) / (brandEnd - brandStart);
                const charCount = Math.floor(progressInBrand * (brandFullText.length + 1));
                if (charCount <= 0) {
                    if (lastBrandCount !== 0) {
                        brandWordmark.classList.remove('active', 'typing');
                        brandTextSpan.textContent = '';
                        lastBrandCount = 0;
                    }
                } else if (charCount !== lastBrandCount) {
                    brandWordmark.classList.add('active', 'typing');
                    brandTextSpan.textContent = brandFullText.slice(0, charCount);
                    lastBrandCount = charCount;
                }
            } else {
                if (lastBrandCount !== brandFullText.length) {
                    brandWordmark.classList.add('active');
                    brandWordmark.classList.remove('typing');
                    brandTextSpan.textContent = brandFullText;
                    lastBrandCount = brandFullText.length;
                }
            }
        }

        if (scrollHint) {
            if (progress >= 0.95) {
                scrollHint.classList.add('ready-to-slide');
                scrollHint.classList.remove('faded');
                if (hintText) hintText.textContent = 'SCROLL TO SLIDE UP // ARTIST INFO ↓';
            } else if (progress > 0.08) {
                scrollHint.classList.remove('ready-to-slide');
                scrollHint.classList.add('faded');
                if (hintText) hintText.textContent = 'SCROLL TO REVEAL';
            } else {
                scrollHint.classList.remove('ready-to-slide', 'faded');
                if (hintText) hintText.textContent = 'SCROLL TO REVEAL';
            }
        }
    }

    function updateTypewriter() {
        if (!homeScreen.classList.contains('visible') || currentPage !== 'home') {
            isTypewriterRunning = false;
            return;
        }

        const diff = targetScrollProgress - currentScrollProgress;
        if (Math.abs(diff) > 0.0005) {
            currentScrollProgress += diff * 0.085;
            renderTypewriterFrames(currentScrollProgress);
            requestAnimationFrame(updateTypewriter);
        } else {
            currentScrollProgress = targetScrollProgress;
            renderTypewriterFrames(currentScrollProgress);
            isTypewriterRunning = false;
        }
    }

    startTypewriterLoop = function() {
        if (!isTypewriterRunning && currentPage === 'home') {
            isTypewriterRunning = true;
            requestAnimationFrame(updateTypewriter);
        }
    };

    renderTypewriterFrames(0);

    // -------------------------------------------------------------
    // 4. Premium 3D Mouse Parallax Effect
    // -------------------------------------------------------------
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const sceneContainer = document.querySelector('.scene-container');
        if (sceneContainer) {
            sceneContainer.style.perspective = '1200px';
        }
        
        if (scene) {
            scene.style.transformStyle = 'preserve-3d';
            scene.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        const showcaseContainer = document.querySelector('.home-stage-container');
        if (showcaseContainer) {
            showcaseContainer.style.perspective = '1200px';
        }
        if (homeStage) {
            homeStage.style.transformStyle = 'preserve-3d';
            homeStage.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        const portraitFrame = document.querySelector('.portrait-frame');
        if (portraitFrame) {
            portraitFrame.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        const collectionFrame = document.getElementById('collection-poster-frame');
        if (collectionFrame) {
            collectionFrame.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        document.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            const mouseX = (e.clientX - width / 2) / (width / 2);
            const mouseY = (e.clientY - height / 2) / (height / 2);

            // Parallax for Welcome Screen
            if (!welcomeScreen.classList.contains('leaving') && scene) {
                const rotateY = mouseX * 12;
                const rotateX = -mouseY * 12;
                scene.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }

            // Parallax for Homepage Stage (when on home page)
            if (homeScreen.classList.contains('visible') && currentPage === 'home' && homeStage) {
                const rotateY = mouseX * 6;
                const rotateX = -mouseY * 6;
                homeStage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }

            // Subtle 3D tilt for artist portrait on artist page
            if (homeScreen.classList.contains('visible') && currentPage === 'artist' && portraitFrame) {
                const tiltY = mouseX * 8;
                const tiltX = -mouseY * 8;
                portraitFrame.style.transform = `perspective(1000px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(1.02)`;
            }

            // Subtle 3D tilt for collection poster on collection page
            if (homeScreen.classList.contains('visible') && currentPage === 'collection' && collectionPosterFrame) {
                const tiltY = mouseX * 8;
                const tiltX = -mouseY * 8;
                collectionPosterFrame.style.transform = `perspective(1000px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(1.02)`;
            }
        });

        document.addEventListener('mouseleave', () => {
            if (!welcomeScreen.classList.contains('leaving') && scene) {
                scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
            if (homeStage) {
                homeStage.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
            if (portraitFrame) {
                portraitFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            }
            if (collectionPosterFrame) {
                collectionPosterFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            }
        });
    }

    // Initialize 3D Cyber Cylinder Lookbook
    initCylinderLookbook();

    // -------------------------------------------------------------
    // 7. 3D CYBER CYLINDER CAROUSEL ENGINE (LOOKBOOK 360°)
    // -------------------------------------------------------------
    function initCylinderLookbook() {
        const cylinderRing = document.getElementById('cylinder-ring');
        const cylinderStage = document.getElementById('cylinder-stage-container');
        const ambientGlow = document.getElementById('cylinder-ambient-glow');
        const counterEl = document.getElementById('cylinder-counter');
        const titleEl = document.getElementById('hud-look-title');
        const tagsEl = document.getElementById('hud-look-tags');
        const paginationEl = document.getElementById('cylinder-pagination');
        const prevBtn = document.getElementById('cylinder-prev');
        const nextBtn = document.getElementById('cylinder-next');

        if (!cylinderRing || !cylinderStage) return;

        const LOOKS = [
            {
                id: 'look-01',
                index: '01',
                title: 'CHROME GRAVITY',
                badge: 'SPECIMEN #01',
                tags: ['SPECIMEN 01', 'TORUS FLUID', 'AVANT-GARDE STREET'],
                thumbImg: 'assets/collection/look_01_chrome_opt.jpg',
                fullImg: 'assets/collection/look_01_chrome.png',
                accentColor: '#e2e8f0',
                glowColor: 'rgba(226, 232, 240, 0.4)',
                desc: 'Khối kim loại lỏng (liquid mirror chrome) phi trọng lực uốn lượn quanh cơ thể, kết hợp áo khoác phao đen bóng và quần cargo thụng hồng tro, định hình diện mạo tương lai phi thực tế.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Oversized Cropped Puffer & Wide Modular Cargo' },
                    { label: 'ELEMENT', val: 'Floating Liquid Mirror Torus Ring' },
                    { label: 'PALETTE', val: 'Obsidian Black / Soft Mauve / Liquid Platinum' },
                    { label: 'FREQUENCY', val: '99.8 MHz // SONIC RESONANCE' }
                ]
            },
            {
                id: 'look-02',
                index: '02',
                title: 'DARK BIKER & THORNS',
                badge: 'SPECIMEN #02',
                tags: ['SPECIMEN 02', 'CYBER THORNS', 'NEO-GOTHIC REBEL'],
                thumbImg: 'assets/collection/look_02_thorns_opt.jpg',
                fullImg: 'assets/collection/look_02_thorns.png',
                accentColor: '#c084fc',
                glowColor: 'rgba(192, 132, 252, 0.45)',
                desc: 'Khí chất nổi loạn và kiên cường biểu hiện qua áo da biker nhiều khóa kéo kim loại, bao bọc bởi quầng hào quang gai nhọn hắc ám như một bức khiên phòng thủ cơ học.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Double-Zip Heavy Moto Armor' },
                    { label: 'ELEMENT', val: '360° Organic Chrome Barbed Vine Halo' },
                    { label: 'PALETTE', val: 'Deep Jet Leather / Stark White / Chrome Spike' },
                    { label: 'FREQUENCY', val: '104.2 MHz // HIGH-GAIN OVERDRIVE' }
                ]
            },
            {
                id: 'look-03',
                index: '03',
                title: 'GENESIS CHAMBER',
                badge: 'SPECIMEN #03',
                tags: ['SPECIMEN 03', 'CRYO POD', 'EXTRATERRESTRIAL COUTURE'],
                thumbImg: 'assets/collection/look_03_cryopod_opt.jpg',
                fullImg: 'assets/collection/look_03_cryopod.png',
                accentColor: '#fbbf24',
                glowColor: 'rgba(251, 191, 36, 0.4)',
                desc: 'Khoang ấp nở du hành vũ trụ giữa hoang mạc ngoại hành tinh. Bộ trang phục phao đơn sắc trắng tuyết với các đường bó dây viền tượng trưng cho sự tái sinh tinh khôi.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Sculptural Cryo-Down Capsule Suit' },
                    { label: 'ELEMENT', val: 'Reinforced Glass Cryogenic Pod with Fluid Conduit' },
                    { label: 'PALETTE', val: 'Alabaster White / Desert Amber / Titanium Glass' },
                    { label: 'FREQUENCY', val: '88.4 MHz // DEEP SPACE CARRIER' }
                ]
            },
            {
                id: 'look-04',
                index: '04',
                title: 'STREET SURRENDER',
                badge: 'SPECIMEN #04',
                tags: ['SPECIMEN 04', 'SURRENDER', 'URBAN GRAFFITI POSTER'],
                thumbImg: 'assets/collection/look_04_surrender_opt.jpg',
                fullImg: 'assets/collection/look_04_surrender.png',
                accentColor: '#f97316',
                glowColor: 'rgba(249, 115, 22, 0.5)',
                desc: 'Năng lượng đường phố phóng khoáng với áo khoác gió cam rực rỡ phong cách Stussy, phông nền xanh da trời sáng và typographic graffiti thô mộc đầy nhiệt huyết tuổi trẻ.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Relaxed Ripstop Track Jacket' },
                    { label: 'ELEMENT', val: 'Raw Hand-drawn Graffiti & High-Gloss Street Decal' },
                    { label: 'PALETTE', val: 'Blaze Orange / Vivid Sky Blue / Chalk Stencil' },
                    { label: 'FREQUENCY', val: '107.5 MHz // METROPOLIS PULSE' }
                ]
            },
            {
                id: 'look-05',
                index: '05',
                title: 'FROST ARMOR',
                badge: 'SPECIMEN #05',
                tags: ['SPECIMEN 05', 'CYAN MATRIX', 'CYBERNETIC SUB-ZERO'],
                thumbImg: 'assets/collection/look_05_frost_opt.jpg',
                fullImg: 'assets/collection/look_05_frost.png',
                accentColor: '#38bdf8',
                glowColor: 'rgba(56, 189, 248, 0.5)',
                desc: 'Thiết kế áo phao cổ dựng cao cực đại che kín khuôn mặt với túi hộp tiện ích mô-đun EAG và phụ kiện kim loại vi mạch vắt ngang sóng mũi, kiến tạo vẻ đẹp lạnh lùng bí ẩn.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Extreme-Volume Sub-Zero Down Parka' },
                    { label: 'ELEMENT', val: 'EAG Modular Utility Pouches & Cyber Bridge Jewelry' },
                    { label: 'PALETTE', val: 'Glacier Blue / Deep Midnight Mist / Cyber Silver' },
                    { label: 'FREQUENCY', val: '92.0 MHz // CRYO TRANSMISSION' }
                ]
            },
            {
                id: 'look-06',
                index: '06',
                title: 'KINETIC PULSE',
                badge: 'SPECIMEN #06',
                tags: ['SPECIMEN 06', 'NEON LIME', 'RAW KINETIC DANCEWEAR'],
                thumbImg: 'assets/collection/look_06_kinetic_opt.jpg',
                fullImg: 'assets/collection/look_06_kinetic.png',
                accentColor: '#a3e635',
                glowColor: 'rgba(163, 230, 53, 0.5)',
                desc: 'Vũ đạo không trọng lực kết hợp áo khoác hoa văn chần bông xám tro cùng điểm nhấn xanh neon chói lọi ở thắt lưng, kính tốc độ và giày bốt cao su tương lai.',
                specs: [
                    { label: 'SILHOUETTE', val: 'Embossed Jacquard Bomber & Wide Technical Trousers' },
                    { label: 'ELEMENT', val: 'Acid Lime Cyber Boots, Speed Shades & Industrial Belt' },
                    { label: 'PALETTE', val: 'Mono Ash Grey / Ink Black / Acid Lime Neon' },
                    { label: 'FREQUENCY', val: '99.8 MHz // KINETIC BREAKTHROUGH' }
                ]
            }
        ];

        const itemCount = LOOKS.length;
        const angleStep = 360 / itemCount; // 60 deg
        let radius = window.innerWidth <= 768 ? 200 : 340;

        let currentAngle = 0;
        let targetAngle = 0;
        let dragVelocity = 0;
        let isDragging = false;
        let startX = 0;
        let lastDragX = 0;
        let lastDragTime = 0;
        let activeIndex = 0;
        let hasMoved = false;
        let dragSamples = [];

        // Generate Cards & Pagination
        cylinderRing.innerHTML = '';
        if (paginationEl) paginationEl.innerHTML = '';

        const cardElements = LOOKS.map((look, i) => {
            const card = document.createElement('div');
            card.className = `cylinder-card ${i === 0 ? 'is-active' : ''}`;
            card.setAttribute('data-index', i);
            card.style.setProperty('--card-accent', look.accentColor);
            card.style.setProperty('--card-glow', look.glowColor);

            card.innerHTML = `
                <div class="card-dim-mask"></div>
                <div class="card-top-badge">${look.badge}</div>
                <img src="${look.thumbImg}" alt="${look.title}" loading="lazy" />
                <div class="card-hologram-line"></div>
            `;

            // Card click listener (rotates cylinder to the clicked look)
            card.addEventListener('click', () => {
                if (hasMoved) return; // Ignore click if user was dragging
                if (i !== activeIndex) {
                    rotateToIndex(i);
                }
            });

            cylinderRing.appendChild(card);

            // Pagination dot
            if (paginationEl) {
                const dot = document.createElement('button');
                dot.className = `cylinder-dot ${i === 0 ? 'is-active' : ''}`;
                dot.setAttribute('aria-label', `Xem Look ${i + 1}`);
                dot.style.setProperty('--dot-accent', look.accentColor);
                dot.style.setProperty('--dot-glow', look.glowColor);
                dot.addEventListener('click', () => rotateToIndex(i));
                paginationEl.appendChild(dot);
            }

            return card;
        });

        const dots = paginationEl ? paginationEl.querySelectorAll('.cylinder-dot') : [];

        function updateRadius() {
            radius = window.innerWidth <= 768 ? 200 : 340;
            cardElements.forEach((card, i) => {
                const cardAngle = i * angleStep;
                card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
            });
        }

        updateRadius();
        window.addEventListener('resize', updateRadius);

        // Update HUD display
        function updateHUD(index) {
            activeIndex = index;
            const look = LOOKS[index];
            if (!look) return;

            if (counterEl) counterEl.textContent = `${look.index} / 0${itemCount}`;
            if (titleEl) {
                titleEl.textContent = look.title;
                titleEl.style.textShadow = `0 0 25px ${look.glowColor}`;
            }

            if (tagsEl) {
                tagsEl.innerHTML = look.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
            }

            if (ambientGlow) {
                ambientGlow.style.setProperty('--glow-color', look.glowColor);
            }

            // Update card active classes
            cardElements.forEach((c, i) => {
                if (i === index) {
                    c.classList.add('is-active');
                } else {
                    c.classList.remove('is-active');
                }
            });

            // Update dots
            dots.forEach((d, i) => {
                if (i === index) {
                    d.classList.add('is-active');
                } else {
                    d.classList.remove('is-active');
                }
            });
        }

        // Calculate nearest index from currentAngle
        function getNearestIndex(angle) {
            let normalized = (-angle) % 360;
            if (normalized < 0) normalized += 360;
            let idx = Math.round(normalized / angleStep) % itemCount;
            return idx;
        }

        let isRunwayLoopRunning = false;
        function ensureRunwayLoop() {
            if (!isRunwayLoopRunning && currentPage === 'runway') {
                isRunwayLoopRunning = true;
                requestAnimationFrame(renderLoop);
            }
        }
        resumeRunwayPhysics = ensureRunwayLoop;

        // Rotate to specific look index
        function rotateToIndex(targetIdx) {
            let currentNearest = getNearestIndex(targetAngle);
            let diff = targetIdx - currentNearest;
            // Shortest path logic (-3 to +3)
            if (diff > itemCount / 2) diff -= itemCount;
            if (diff < -itemCount / 2) diff += itemCount;
            targetAngle -= diff * angleStep;
            dragVelocity = 0;
            ensureRunwayLoop();
        }

        // Animation Physics Loop (60/120fps Silky Smooth Decoupled Engine)
        function renderLoop() {
            if (currentPage !== 'runway') {
                isRunwayLoopRunning = false;
                return;
            }

            if (isDragging) {
                // Responsive gentle lerp following the finger/pointer
                currentAngle += (targetAngle - currentAngle) * 0.38;
            } else {
                if (Math.abs(dragVelocity) > 0.05) {
                    targetAngle += dragVelocity;
                    currentAngle += (targetAngle - currentAngle) * 0.42;
                    dragVelocity *= 0.935; // smooth damping
                } else {
                    dragVelocity = 0;
                    // Magnetic snapping to targetAngle
                    const nearestSnap = Math.round(targetAngle / angleStep) * angleStep;
                    targetAngle = nearestSnap;
                    const diff = targetAngle - currentAngle;
                    if (Math.abs(diff) < 0.03) {
                        currentAngle = targetAngle;
                    } else {
                        currentAngle += diff * 0.16;
                    }
                }
            }

            // Hardware-accelerated 3D transform
            cylinderRing.style.transform = `translate3d(0, 0, 0) rotateY(${currentAngle}deg)`;

            const currentActive = getNearestIndex(currentAngle);
            if (currentActive !== activeIndex) {
                updateHUD(currentActive);
            }

            if (isDragging || Math.abs(dragVelocity) > 0.05 || Math.abs(targetAngle - currentAngle) > 0.02) {
                requestAnimationFrame(renderLoop);
            } else {
                isRunwayLoopRunning = false;
            }
        }

        updateHUD(0);

        // Drag handlers (Decoupled Touch & Mouse with rolling average velocity)
        function onDragStart(clientX) {
            isDragging = true;
            hasMoved = false;
            startX = clientX;
            lastDragX = clientX;
            lastDragTime = performance.now();
            dragSamples = [];
            dragVelocity = 0;
            ensureRunwayLoop();
        }

        function onDragMove(clientX) {
            if (!isDragging) return;
            const now = performance.now();
            const deltaX = clientX - lastDragX;
            if (Math.abs(clientX - startX) > 4) {
                hasMoved = true;
            }

            const dt = Math.max(1, now - lastDragTime);
            const sensitivity = window.innerWidth <= 768 ? 0.34 : 0.26;

            targetAngle += deltaX * sensitivity;

            // Collect samples for rolling average velocity
            dragSamples.push({ deltaX, dt });
            if (dragSamples.length > 5) dragSamples.shift();

            lastDragX = clientX;
            lastDragTime = now;
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;

            // Calculate smoothed release momentum
            if (dragSamples.length > 0) {
                let totalDelta = 0;
                let totalTime = 0;
                for (let i = 0; i < dragSamples.length; i++) {
                    totalDelta += dragSamples[i].deltaX;
                    totalTime += dragSamples[i].dt;
                }
                const sensitivity = window.innerWidth <= 768 ? 0.34 : 0.26;
                const avgSpeed = (totalDelta / Math.max(16, totalTime)) * 16;
                dragVelocity = avgSpeed * sensitivity * 0.95;
            } else {
                dragVelocity = 0;
            }

            // Clamp max velocity
            if (dragVelocity > 12) dragVelocity = 12;
            if (dragVelocity < -12) dragVelocity = -12;
        }

        // Mouse Events on Stage
        cylinderStage.addEventListener('mousedown', (e) => {
            if (e.target.closest('.cylinder-nav-btn')) return;
            onDragStart(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                onDragMove(e.clientX);
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) onDragEnd();
        });

        // Touch Events on Stage (Mobile Optimized)
        let touchStartY = 0;
        cylinderStage.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                if (e.target.closest('.cylinder-nav-btn')) return;
                touchStartY = e.touches[0].clientY;
                onDragStart(e.touches[0].clientX);
            }
        }, { passive: true });

        cylinderStage.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length > 0) {
                const currentTouchY = e.touches[0].clientY;
                const currentTouchX = e.touches[0].clientX;
                const diffX = Math.abs(currentTouchX - startX);
                const diffY = Math.abs(currentTouchY - touchStartY);

                // Lock horizontal swipe to prevent page scroll jitter
                if (diffX > diffY && diffX > 4) {
                    if (e.cancelable) e.preventDefault();
                }
                onDragMove(currentTouchX);
            }
        }, { passive: false });

        cylinderStage.addEventListener('touchend', () => {
            if (isDragging) onDragEnd();
        }, { passive: true });

        // Navigation Buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                targetAngle += angleStep;
                dragVelocity = 0;
                ensureRunwayLoop();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                targetAngle -= angleStep;
                dragVelocity = 0;
                ensureRunwayLoop();
            });
        }

        // Keyboard Arrow Navigation
        window.addEventListener('keydown', (e) => {
            if (currentPage !== 'runway') return;
            if (e.key === 'ArrowLeft') {
                targetAngle += angleStep;
                dragVelocity = 0;
                ensureRunwayLoop();
            } else if (e.key === 'ArrowRight') {
                targetAngle -= angleStep;
                dragVelocity = 0;
                ensureRunwayLoop();
            }
        });
    }

    // -------------------------------------------------------------
    // 6. PAGE 5: LIVE STAGE & MC SININE ARCHIVE LOGIC
    // -------------------------------------------------------------
    function initStageGallery() {
        const stageGrid = document.getElementById('stage-bento-grid');
        const filterBar = document.getElementById('stage-filter-bar');
        const filterBtns = filterBar ? filterBar.querySelectorAll('.stage-filter-btn') : [];
        const ambientGlow = document.getElementById('stage-ambient-glow');
        const counterPill = document.getElementById('stage-counter-pill');

        // Lightbox Elements
        const lightbox = document.getElementById('stage-lightbox');
        const lightboxBackdrop = document.getElementById('lightbox-backdrop');
        const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
        const lightboxPrevBtn = document.getElementById('lightbox-prev');
        const lightboxNextBtn = document.getElementById('lightbox-next');
        const lightboxImg = document.getElementById('lightbox-main-img');
        const lightboxBadge = document.getElementById('lightbox-badge');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCounter = document.getElementById('lightbox-counter');
        const lightboxCaption = document.getElementById('lightbox-caption-text');
        const lightboxSpecsRow = document.getElementById('lightbox-specs-row');
        const lightboxFilmstrip = document.getElementById('lightbox-filmstrip');
        const lightboxViewport = document.getElementById('lightbox-viewport');

        if (!stageGrid) return;

        const STAGE_PHOTOS = [
            {
                        "id": "stage-1",
                        "index": "01",
                        "filename": "stage_21.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_21.jpg",
                        "fullPath": "assets/stage/full/stage_21.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "INFINITY STAGE // ILLUMINATION",
                        "subtitle": "Khoảnh khắc bùng nổ năng lượng trên bục DJ trung tâm, khuấy động hàng ngàn khán giả trong đại sảnh Metropolis.",
                        "category": "highlight",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        }
            },
            {
                        "id": "stage-2",
                        "index": "02",
                        "filename": "stage_24.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_24.jpg",
                        "fullPath": "assets/stage/full/stage_24.jpg",
                        "width": 1277,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.665,
                        "title": "THE FINALE ECHO // MONOCHROME",
                        "subtitle": "Bức chân dung đen trắng kinh điển bắt trọn cử chỉ tay micro uy lực và phong thái tiên phong của MC SININE.",
                        "category": "portrait",
                        "accentColor": "#ffffff",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1277 x 1920 HD"
                        }
            },
            {
                        "filename": "stage_26.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "NEO ARENA // SPECTRAL HORIZON",
                        "subtitle": "Góc nhìn bao quát toàn bộ đại sảnh Metropolis rực sáng trong biển ánh sáng neon đa sắc.",
                        "category": "wide",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-3",
                        "index": "03",
                        "thumbPath": "assets/stage/thumbs/stage_26.jpg",
                        "fullPath": "assets/stage/full/stage_26.jpg"
            },
            {
                        "id": "stage-4",
                        "index": "04",
                        "filename": "stage_01.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_01.jpg",
                        "fullPath": "assets/stage/full/stage_01.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "SONIC APEX // VOLTAGE PULSE",
                        "subtitle": "Live performance spotlight with sonic aura & dynamic laser grid",
                        "category": "highlight",
                        "accentColor": "#f97316",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        }
            },
            {
                        "id": "stage-5",
                        "index": "05",
                        "filename": "stage_02.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_02.jpg",
                        "fullPath": "assets/stage/full/stage_02.jpg",
                        "width": 1279,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.666,
                        "title": "CYBER RHAPSODY // SPOTLIGHT",
                        "subtitle": "Intimate stage portrait capturing the electric avant-garde energy",
                        "category": "portrait",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1279 x 1920 HD"
                        }
            },
            {
                        "filename": "stage_27.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "title": "CROWD RESONANCE // SYNTH WAVE",
                        "subtitle": "Khung cảnh đại khán trường đồng thanh hòa nhịp cùng năng lượng sân khấu đỉnh cao.",
                        "category": "wide",
                        "accentColor": "#a3e635",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        },
                        "id": "stage-6",
                        "index": "06",
                        "thumbPath": "assets/stage/thumbs/stage_27.jpg",
                        "fullPath": "assets/stage/full/stage_27.jpg"
            },
            {
                        "id": "stage-7",
                        "index": "07",
                        "filename": "stage_03.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_03.jpg",
                        "fullPath": "assets/stage/full/stage_03.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "KINETIC CROWD // RESONANCE",
                        "subtitle": "Panoramic crowd wave synchronizing with 99.8 MHz sub-bass pulse",
                        "category": "wide",
                        "accentColor": "#a3e635",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
            },
            {
                        "id": "stage-8",
                        "index": "08",
                        "filename": "stage_04.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_04.jpg",
                        "fullPath": "assets/stage/full/stage_04.jpg",
                        "width": 1279,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.666,
                        "title": "THE ELECTRIC GAZE",
                        "subtitle": "Striking MC Sinine presence under directional strobe illumination",
                        "category": "portrait",
                        "accentColor": "#e11d48",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1279 x 1920 HD"
                        }
            },
            {
                        "id": "stage-9",
                        "index": "09",
                        "filename": "stage_05.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_05.jpg",
                        "fullPath": "assets/stage/full/stage_05.jpg",
                        "width": 1920,
                        "height": 1277,
                        "isVertical": false,
                        "aspectRatio": 1.504,
                        "title": "LASER CANOPY // SOUNDWAVE",
                        "subtitle": "Grand arena laser beams cutting through synthetic fog",
                        "category": "highlight",
                        "accentColor": "#a855f7",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1277 HD"
                        }
            },
            {
                        "filename": "stage_28.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "CYBER DOMAIN // ILLUMINATED",
                        "subtitle": "Không gian trình diễn đa chiều với hệ thống ánh sáng chuyển động nhịp nhàng.",
                        "category": "wide",
                        "accentColor": "#f97316",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-10",
                        "index": "10",
                        "thumbPath": "assets/stage/thumbs/stage_28.jpg",
                        "fullPath": "assets/stage/full/stage_28.jpg"
            },
            {
                        "filename": "stage_29.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "METROPOLIS HORIZON // CLIMAX",
                        "subtitle": "Bức tranh toàn cảnh sân khấu hội tụ hàng ngàn khán giả trong đêm trình diễn đặc biệt.",
                        "category": "wide",
                        "accentColor": "#06b6d4",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-11",
                        "index": "11",
                        "thumbPath": "assets/stage/thumbs/stage_29.jpg",
                        "fullPath": "assets/stage/full/stage_29.jpg"
            },
            {
                        "id": "stage-12",
                        "index": "12",
                        "filename": "stage_09.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_09.jpg",
                        "fullPath": "assets/stage/full/stage_09.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "AMPLIFIED VISION",
                        "subtitle": "Wide-angle perspective of the cybernetic stage setup",
                        "category": "wide",
                        "accentColor": "#f97316",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
            },
            {
                        "id": "stage-13",
                        "index": "13",
                        "filename": "stage_10.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_10.jpg",
                        "fullPath": "assets/stage/full/stage_10.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "BASS OVERDRIVE // IMPACT",
                        "subtitle": "Bass reverberation vibrating across the main arena floor",
                        "category": "wide",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
            },
            {
                        "id": "stage-14",
                        "index": "14",
                        "filename": "stage_12.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_12.jpg",
                        "fullPath": "assets/stage/full/stage_12.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "CHROMATIC FLARE",
                        "subtitle": "Prismatic lens flare refracting stage beam arrays",
                        "category": "wide",
                        "accentColor": "#e11d48",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
            },
            {
                        "filename": "stage_30.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "LASER ARCHITECTURE // VAST VIBE",
                        "subtitle": "Dải laser quét rộng khắp không gian tạo nên bầu không khí âm nhạc tương lai choáng ngợp.",
                        "category": "highlight",
                        "accentColor": "#ec4899",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-15",
                        "index": "15",
                        "thumbPath": "assets/stage/thumbs/stage_30.jpg",
                        "fullPath": "assets/stage/full/stage_30.jpg"
            },
            {
                        "id": "stage-16",
                        "index": "16",
                        "filename": "stage_14.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_14.jpg",
                        "fullPath": "assets/stage/full/stage_14.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "NIGHT CYBERNETICS",
                        "subtitle": "Midnight frequency broadcast through heavy cyber synth",
                        "category": "wide",
                        "accentColor": "#06b6d4",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        }
            },
            {
                        "id": "stage-17",
                        "index": "17",
                        "filename": "stage_17.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_17.jpg",
                        "fullPath": "assets/stage/full/stage_17.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "RAW ENERGY // UNLEASHED",
                        "subtitle": "Raw uncompromised vocal delivery at peak crescendo",
                        "category": "highlight",
                        "accentColor": "#f97316",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        }
            },
            {
                        "id": "stage-18",
                        "index": "18",
                        "filename": "stage_18.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_18.jpg",
                        "fullPath": "assets/stage/full/stage_18.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "DIGITAL REVOLUTION",
                        "subtitle": "Future-forward live entertainment architecture in action",
                        "category": "wide",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        }
            },
            {
                        "filename": "stage_32.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "SONIC GALAXY // PANORAMA",
                        "subtitle": "Hiệu ứng ánh sáng phối hợp nhịp nhàng biến toàn bộ khán phòng thành một vũ trụ âm thanh rực rỡ.",
                        "category": "wide",
                        "accentColor": "#38bdf8",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-19",
                        "index": "19",
                        "thumbPath": "assets/stage/thumbs/stage_32.jpg",
                        "fullPath": "assets/stage/full/stage_32.jpg"
            },
            {
                        "id": "stage-20",
                        "index": "20",
                        "filename": "stage_19.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_19.jpg",
                        "fullPath": "assets/stage/full/stage_19.jpg",
                        "width": 1920,
                        "height": 1080,
                        "isVertical": false,
                        "aspectRatio": 1.778,
                        "title": "TRANSCENDENT MOMENT",
                        "subtitle": "Emotional peak as thousands illuminate the stadium",
                        "category": "wide",
                        "accentColor": "#a3e635",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1080 HD"
                        }
            },
            {
                        "id": "stage-21",
                        "index": "21",
                        "filename": "stage_22.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_22.jpg",
                        "fullPath": "assets/stage/full/stage_22.jpg",
                        "width": 1280,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.667,
                        "title": "CYBER HYPERDRIVE",
                        "subtitle": "Hyper-kinetic velocity captured in a split second",
                        "category": "portrait",
                        "accentColor": "#06b6d4",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1280 x 1920 HD"
                        }
            },
            {
                        "filename": "stage_34.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "title": "INFINITE NIGHT // ENERGY GRID",
                        "subtitle": "Góc nhìn toàn cảnh ngoạn mục khép lại những phút giây thăng hoa bất tận của đêm diễn.",
                        "category": "wide",
                        "accentColor": "#a855f7",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        },
                        "id": "stage-22",
                        "index": "22",
                        "thumbPath": "assets/stage/thumbs/stage_34.jpg",
                        "fullPath": "assets/stage/full/stage_34.jpg"
            }
];

        let currentLightboxIndex = 0;
        let cardElements = [];

        // Generate Bento Cards
        stageGrid.innerHTML = '';
        STAGE_PHOTOS.forEach((photo, idx) => {
            const card = document.createElement('div');
            
            let orientationClass = photo.isVertical ? 'is-portrait' : 'is-landscape';
            if (photo.category === 'highlight') {
                orientationClass += ' is-highlight';
            }

            card.className = `stage-card ${orientationClass}`;
            card.setAttribute('data-id', photo.id);
            card.setAttribute('data-index', idx);
            card.setAttribute('data-category', photo.category);
            card.setAttribute('data-vertical', photo.isVertical ? 'true' : 'false');
            card.style.setProperty('--card-accent', photo.accentColor);
            card.style.setProperty('--card-glow', `${photo.accentColor}55`);

            card.innerHTML = `
                <div class="stage-card-media">
                    <img class="stage-card-img" src="${photo.thumbPath}" alt="${photo.title}" loading="lazy" />
                    <div class="stage-card-vignette"></div>
                </div>

                <div class="card-corner top-left"></div>
                <div class="card-corner top-right"></div>
                <div class="card-corner bottom-left"></div>
                <div class="card-corner bottom-right"></div>

                <div class="stage-card-info">
                    <h3 class="stage-card-title">${photo.title}</h3>
                </div>
            `;

            card.addEventListener('click', () => {
                openLightbox(idx);
            });

            stageGrid.appendChild(card);
            cardElements.push(card);
        });

        // Generate Filmstrip Thumbs
        if (lightboxFilmstrip) {
            lightboxFilmstrip.innerHTML = '';
            STAGE_PHOTOS.forEach((photo, idx) => {
                const thumbBtn = document.createElement('button');
                thumbBtn.className = `lightbox-film-thumb ${idx === 0 ? 'is-active' : ''}`;
                thumbBtn.setAttribute('aria-label', `Xem ảnh ${photo.index}`);
                thumbBtn.innerHTML = `<img src="${photo.thumbPath}" alt="${photo.title}" loading="lazy" />`;
                thumbBtn.addEventListener('click', () => openLightbox(idx));
                lightboxFilmstrip.appendChild(thumbBtn);
            });
        }

        const filmThumbs = lightboxFilmstrip ? lightboxFilmstrip.querySelectorAll('.lightbox-film-thumb') : [];

        // Filter Functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                let visibleCount = 0;
                cardElements.forEach((card, i) => {
                    const photo = STAGE_PHOTOS[i];
                    let match = false;
                    if (filter === 'all') match = true;
                    else if (filter === 'portrait' && photo.isVertical) match = true;
                    else if (filter === 'wide' && !photo.isVertical) match = true;
                    else if (filter === 'highlight' && photo.category === 'highlight') match = true;

                    if (match) {
                        card.classList.remove('is-hidden-filter');
                        visibleCount++;
                    } else {
                        card.classList.add('is-hidden-filter');
                    }
                });

                if (counterPill) {
                    counterPill.textContent = `${visibleCount} KHOẢNH KHẮC SÂN KHẤU`;
                }
            });
        });

        // Lightbox Open / Close / Update
        function openLightbox(index) {
            if (index < 0) index = STAGE_PHOTOS.length - 1;
            if (index >= STAGE_PHOTOS.length) index = 0;
            currentLightboxIndex = index;

            const photo = STAGE_PHOTOS[index];
            if (!photo || !lightbox) return;

            if (lightboxImg) {
                lightboxImg.style.opacity = '0.3';
                lightboxImg.style.transform = 'scale(0.97)';
                lightboxImg.src = photo.fullPath;
                lightboxImg.onload = () => {
                    lightboxImg.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                };
            }

            if (lightboxBadge) {
                lightboxBadge.textContent = `// SPECIMEN #${photo.index} // ${photo.isVertical ? 'PORTRAIT' : 'WIDE'}`;
                lightboxBadge.style.color = photo.accentColor;
                lightboxBadge.style.borderColor = `${photo.accentColor}66`;
            }

            if (lightboxTitle) {
                lightboxTitle.textContent = photo.title;
            }

            if (lightboxCounter) {
                lightboxCounter.textContent = `${photo.index} / ${STAGE_PHOTOS.length}`;
            }

            if (lightboxCaption) {
                lightboxCaption.textContent = photo.subtitle;
            }

            if (lightboxSpecsRow) {
                lightboxSpecsRow.innerHTML = `
                    <span>VENUE: ${photo.specs.venue}</span>
                    <span>•</span>
                    <span>FREQ: ${photo.specs.freq}</span>
                    <span>•</span>
                    <span>RES: ${photo.specs.resolution}</span>
                `;
            }

            // Update Filmstrip
            filmThumbs.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('is-active');
                    thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } else {
                    thumb.classList.remove('is-active');
                }
            });

            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function nextPhoto() {
            openLightbox(currentLightboxIndex + 1);
        }

        function prevPhoto() {
            openLightbox(currentLightboxIndex - 1);
        }

        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextPhoto);
        if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevPhoto);

        // Keyboard Navigation for Lightbox
        window.addEventListener('keydown', (e) => {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
        });

        // Touch Swipe Gestures in Lightbox (Mobile Friendly)
        let lbTouchStartX = 0;
        let lbTouchStartY = 0;

        if (lightboxViewport) {
            lightboxViewport.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    lbTouchStartX = e.touches[0].clientX;
                    lbTouchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            lightboxViewport.addEventListener('touchend', (e) => {
                if (e.changedTouches.length > 0) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const deltaX = touchEndX - lbTouchStartX;
                    const deltaY = touchEndY - lbTouchStartY;

                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                        if (deltaX < 0) {
                            nextPhoto(); // Swipe left
                        } else {
                            prevPhoto(); // Swipe right
                        }
                    }
                }
            }, { passive: true });
        }
    }

    // -------------------------------------------------------------
    // RECAP VIDEO SHOWCASE CONTROLLER
    // -------------------------------------------------------------
    function initRecapShowcase() {
        const recapPlayer = document.getElementById('recap-main-video');
        const playerBadge = document.getElementById('recap-player-badge');
        const playerTitle = document.getElementById('recap-player-title');
        const playerDesc = document.getElementById('recap-player-desc');
        const playlistCards = document.querySelectorAll('.recap-item-card');

        if (!recapPlayer || playlistCards.length === 0) return;

        const LOCAL_FALLBACKS = {
            'recap_vtnl.mp4': '/optimized_videos/recap_vtnl.mp4',
            'recap_short_1.mp4': '/optimized_videos/recap_short_1.mp4',
            'recap_dam_cuoi.mp4': '/optimized_videos/recap_dam_cuoi.mp4',
            'Sinine_recap.mp4': '/optimized_videos/recap_sinine.mp4'
        };

        // Automatic fallback if remote R2 stream fails
        recapPlayer.addEventListener('error', () => {
            const currentSrc = recapPlayer.currentSrc || recapPlayer.src || '';
            for (const [key, fallbackPath] of Object.entries(LOCAL_FALLBACKS)) {
                if (currentSrc.includes(key) && !currentSrc.includes('/optimized_videos/')) {
                    console.warn(`[Recap] Remote stream error, falling back to local: ${fallbackPath}`);
                    recapPlayer.src = fallbackPath;
                    recapPlayer.load();
                    recapPlayer.play().catch(() => {});
                    break;
                }
            }
        });

        // Playlist preview videos error fallback
        const previewVideos = document.querySelectorAll('.recap-item-preview video');
        previewVideos.forEach(v => {
            v.addEventListener('error', () => {
                const src = v.currentSrc || v.src || '';
                for (const [key, fallbackPath] of Object.entries(LOCAL_FALLBACKS)) {
                    if (src.includes(key) && !src.includes('/optimized_videos/')) {
                        v.src = `${fallbackPath}#t=1.0`;
                        v.load();
                        break;
                    }
                }
            });
        });

        playlistCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.getAttribute('data-video-src');
                const badge = card.getAttribute('data-badge');
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');

                // Update active playlist card state
                playlistCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Update Player Details
                if (playerBadge && badge) playerBadge.textContent = badge;
                if (playerTitle && title) playerTitle.textContent = title;
                if (playerDesc && desc) playerDesc.textContent = desc;

                // Update Video Source & Play
                if (videoSrc) {
                    recapPlayer.src = videoSrc;
                    recapPlayer.load();
                    recapPlayer.play().catch(err => {
                        console.log('Autoplay policy caught, user can tap play button:', err);
                    });
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 7. PAGE 7: MC SININE MOMENTS & SHORT REELS GALLERY LOGIC
    // -------------------------------------------------------------
    function initMomentsGallery() {
        const grid = document.getElementById('moments-grid');
        const filterBar = document.getElementById('moments-filter-bar');
        const filterBtns = filterBar ? filterBar.querySelectorAll('.moments-filter-btn') : [];

        // Lightbox elements
        const lightbox = document.getElementById('moments-lightbox');
        const backdrop = document.getElementById('moments-lightbox-backdrop');
        const closeBtn = document.getElementById('moments-lightbox-close-btn');
        const prevBtn = document.getElementById('moments-lightbox-prev');
        const nextBtn = document.getElementById('moments-lightbox-next');
        const lightboxVideo = document.getElementById('moments-lightbox-video');
        const badgeEl = document.getElementById('moments-lightbox-badge');
        const titleEl = document.getElementById('moments-lightbox-title');
        const counterEl = document.getElementById('moments-lightbox-counter');

        if (!grid) return;

        const MOMENTS_DATA = [
            { id: "m-01", index: "01", filename: "IMG_8255.mp4", isVertical: false, duration: "00:57", title: "HORIZON AUDITORIUM // LIVE", tag: "WIDE PANORAMA", category: "horizontal", subtitle: "Khung cảnh đại khán trường đồng thanh hòa nhịp cùng năng lượng sân khấu đỉnh cao." },
            { id: "m-02", index: "02", filename: "1IV7JRFQH_3SELQ7.mp4", isVertical: true, duration: "00:48", title: "STAGE HYPE // CROWD SHOUT", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-03", index: "03", filename: "dji_mimo_20251224_233904_0_1766594721238_video.mp4", isVertical: true, duration: "01:33", title: "CINEMATIC REEL // MC SININE", tag: "CINEMATIC", category: "vertical" },
            { id: "m-04", index: "04", filename: "IMG_1763.mp4", isVertical: true, duration: "00:57", title: "LASER BEAM MOMENT // MC FOCUS", tag: "VISUAL LIGHT", category: "vertical" },
            { id: "m-05", index: "05", filename: "IMG_7073.mp4", isVertical: true, duration: "01:21", title: "MIDNIGHT ANTHEM // MAIN STAGE", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-06", index: "06", filename: "IMG_9891.mp4", isVertical: true, duration: "00:35", title: "SOUNDWAVE SURGE // LIVE SHOT", tag: "LIVE STAGE", category: "vertical" }
        ];

        const BASE_R2_URL = "https://pub-f02c9f1287b6454cba085755015617e1.r2.dev/moment/sinine%20moment%201/";

        let filteredItems = [...MOMENTS_DATA];
        let currentModalIndex = 0;
        let currentActiveInlineCard = null;
        let scrollObserver = null;

        function stopAllInlineVideos(exceptCard = null) {
            const playingCards = grid.querySelectorAll('.moment-card.is-inline-playing');
            playingCards.forEach(c => {
                if (c !== exceptCard) {
                    const v = c.querySelector('.moment-preview-video');
                    if (v) {
                        v.pause();
                        v.muted = true;
                    }
                    c.classList.remove('is-inline-playing');
                }
            });
            if (!exceptCard) {
                currentActiveInlineCard = null;
            }
        }

        function toggleInlinePlayback(card, video) {
            if (!video) return;

            const isCurrentlyPlaying = card.classList.contains('is-inline-playing') && !video.paused;

            if (isCurrentlyPlaying) {
                video.pause();
                card.classList.remove('is-inline-playing');
                currentActiveInlineCard = null;
            } else {
                stopAllInlineVideos(card);

                currentActiveInlineCard = card;
                card.classList.add('is-inline-playing');
                video.muted = false;
                video.volume = 1.0;
                video.play().catch(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                });
            }
        }

        function renderCards() {
            grid.innerHTML = '';

            filteredItems.forEach((item, fIndex) => {
                const card = document.createElement('div');
                card.className = `moment-card ${item.isVertical ? 'is-vertical' : 'is-horizontal'}`;
                card.setAttribute('data-id', item.id);
                card.setAttribute('data-category', item.category);

                const videoUrl = `${BASE_R2_URL}${encodeURIComponent(item.filename)}`;

                card.innerHTML = `
                    <div class="moment-video-container">
                        <video class="moment-preview-video" preload="metadata" muted playsinline loop src="${videoUrl}#t=1.0"></video>
                        <div class="moment-card-overlay">
                            <div class="moment-top-row">
                                <span class="moment-duration-pill">
                                    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                    ${item.duration}
                                </span>
                                <button class="moment-expand-btn" title="Xem toàn màn hình" aria-label="Phóng to">
                                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                </button>
                            </div>
                            <div class="moment-play-btn">
                                <svg viewBox="0 0 24 24" width="${item.isVertical ? '22' : '28'}" height="${item.isVertical ? '22' : '28'}" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"/></svg>
                            </div>
                            <div class="moment-bottom-row">
                                <h4 class="moment-title">${item.title}</h4>
                            </div>
                        </div>
                    </div>
                `;

                const previewVideo = card.querySelector('.moment-preview-video');

                // When video naturally ends or loops, reset state if needed
                previewVideo.addEventListener('ended', () => {
                    card.classList.remove('is-inline-playing');
                    if (currentActiveInlineCard === card) {
                        currentActiveInlineCard = null;
                    }
                });

                // Expand button clicks -> Fullscreen Lightbox
                const expandBtn = card.querySelector('.moment-expand-btn');
                if (expandBtn) {
                    expandBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openModal(fIndex);
                    });
                }

                // Card click -> In-place play/pause with audio
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.moment-expand-btn')) return;
                    toggleInlinePlayback(card, previewVideo);
                });

                // Desktop hover preview (silent) when not playing inline
                card.addEventListener('mouseenter', () => {
                    if (!card.classList.contains('is-inline-playing') && window.innerWidth > 768) {
                        card.classList.add('is-playing');
                        previewVideo.muted = true;
                        previewVideo.play().catch(() => {});
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (!card.classList.contains('is-inline-playing') && window.innerWidth > 768) {
                        card.classList.remove('is-playing');
                        previewVideo.pause();
                        previewVideo.currentTime = 1.0;
                    }
                });

                grid.appendChild(card);
            });

            setupMobileScrollObserver();
        }

        // Auto pause inline playback when user scrolls away
        function setupMobileScrollObserver() {
            if (scrollObserver) {
                scrollObserver.disconnect();
            }

            const cards = grid.querySelectorAll('.moment-card');
            if (cards.length === 0) return;

            scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const card = entry.target;
                    const video = card.querySelector('.moment-preview-video');
                    if (!video) return;

                    if (!entry.isIntersecting && card.classList.contains('is-inline-playing')) {
                        video.pause();
                        video.muted = true;
                        card.classList.remove('is-inline-playing');
                        if (currentActiveInlineCard === card) {
                            currentActiveInlineCard = null;
                        }
                    }
                });
            }, {
                root: null,
                threshold: 0.15
            });

            cards.forEach(c => scrollObserver.observe(c));
        }

        function openModal(index) {
            currentModalIndex = index;
            const item = filteredItems[currentModalIndex];
            if (!item || !lightbox || !lightboxVideo) return;

            stopAllInlineVideos();

            const videoUrl = `${BASE_R2_URL}${encodeURIComponent(item.filename)}`;
            
            if (badgeEl) badgeEl.textContent = `// REEL #${item.index}`;
            if (titleEl) titleEl.textContent = item.title;
            if (counterEl) counterEl.textContent = `${item.index} / ${String(MOMENTS_DATA.length).padStart(2, '0')}`;

            lightboxVideo.src = videoUrl;
            lightboxVideo.load();
            lightbox.classList.add('active');
            if (pageMoments) pageMoments.style.overflow = 'hidden';

            lightboxVideo.play().catch(e => {
                console.log('Video play caught:', e);
            });
        }

        function closeModal() {
            if (!lightbox || !lightboxVideo) return;
            lightbox.classList.remove('active');
            lightboxVideo.pause();
            lightboxVideo.src = '';
            if (pageMoments) pageMoments.style.overflow = '';
        }

        function nextVideo() {
            if (filteredItems.length === 0) return;
            const nextIdx = (currentModalIndex + 1) % filteredItems.length;
            openModal(nextIdx);
        }

        function prevVideo() {
            if (filteredItems.length === 0) return;
            const prevIdx = (currentModalIndex - 1 + filteredItems.length) % filteredItems.length;
            openModal(prevIdx);
        }

        // Modal Controls
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
        if (nextBtn) nextBtn.addEventListener('click', nextVideo);
        if (prevBtn) prevBtn.addEventListener('click', prevVideo);

        // Keyboard Navigation
        window.addEventListener('keydown', (e) => {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextVideo();
            if (e.key === 'ArrowLeft') prevVideo();
        });

        // Touch swipe navigation for mobile Lightbox
        let touchStartX = 0;
        let touchStartY = 0;

        if (lightbox) {
            lightbox.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            lightbox.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                    const diffX = e.changedTouches[0].clientX - touchStartX;
                    const diffY = e.changedTouches[0].clientY - touchStartY;
                    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX < 0) {
                            nextVideo(); // Swipe left -> Next
                        } else {
                            prevVideo(); // Swipe right -> Prev
                        }
                    }
                }
            }, { passive: true });
        }

        // Filter Controls
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (filter === 'all') {
                    filteredItems = [...MOMENTS_DATA];
                } else if (filter === 'vertical') {
                    filteredItems = MOMENTS_DATA.filter(m => m.isVertical);
                } else if (filter === 'horizontal') {
                    filteredItems = MOMENTS_DATA.filter(m => !m.isVertical);
                }

                renderCards();
            });
        });

        renderCards();
    }

    // -------------------------------------------------------------
    // Page 8: Booking System Initialization
    // -------------------------------------------------------------
    function initBookingSystem() {
        if (!bookingForm) return;

        const GOOGLE_SCRIPT_BOOKING_URL = "https://script.google.com/macros/s/AKfycby6LhJnZFh-cjkEIDlkI8rqrrqb3wbYFILC7GygHDSXduGOCSfr6wi6irP4yZbiEHU9dQ/exec";

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('booking-name')?.value.trim();
            const phone = document.getElementById('booking-phone')?.value.trim();
            const email = document.getElementById('booking-email')?.value.trim();
            const eventTypeSelect = document.getElementById('booking-event-type');
            const eventType = eventTypeSelect?.options[eventTypeSelect.selectedIndex]?.text || '';
            const date = document.getElementById('booking-date')?.value.trim() || 'Chưa xác định';
            const venue = document.getElementById('booking-venue')?.value.trim() || 'Chưa cung cấp';
            const message = document.getElementById('booking-message')?.value.trim() || 'Không có ghi chú thêm';

            if (!name || !phone || !email || !eventTypeSelect?.value) {
                if (bookingStatusMsg) {
                    bookingStatusMsg.className = 'form-status-msg error';
                    bookingStatusMsg.innerHTML = '⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc (*): Họ tên, Số điện thoại, Email và Loại hình sự kiện.';
                    bookingStatusMsg.style.display = 'block';
                }
                return;
            }

            // Create submit state
            const submitBtn = document.getElementById('btn-submit-booking');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.innerHTML = '<span class="btn-text">Đang gửi thông tin...</span>';
            }

            // Gửi dữ liệu đồng thời vào Google Sheet và bắn Email về Mcsininewst@gmail.com
            const payload = {
                name,
                phone,
                email,
                eventType,
                date,
                venue,
                message
            };

            fetch(GOOGLE_SCRIPT_BOOKING_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnHtml;
                }

                if (bookingStatusMsg) {
                    bookingStatusMsg.className = 'form-status-msg success';
                    bookingStatusMsg.innerHTML = `
                        <div style="font-weight: 700; font-size: 1rem; color: #fb923c; margin-bottom: 8px;">
                            ✓ Đã gửi yêu cầu đặt lịch thành công!
                        </div>
                        <div style="font-size: 0.92rem; color: rgba(255, 255, 255, 0.88); line-height: 1.6;">
                            Cảm ơn <strong>${name}</strong>. Ban quản lý của MC Sinine đã nhận được thông tin sự kiện [<strong>${eventType}</strong>] và sẽ liên hệ lại qua số điện thoại <strong>${phone}</strong> / email <strong>${email}</strong> trong thời gian sớm nhất.
                        </div>
                    `;
                    bookingStatusMsg.style.display = 'block';
                }

                bookingForm.reset();
            })
            .catch((error) => {
                console.error('Error submitting booking:', error);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnHtml;
                }
                if (bookingStatusMsg) {
                    bookingStatusMsg.className = 'form-status-msg error';
                    bookingStatusMsg.innerHTML = '⚠️ Có lỗi xảy ra trong quá trình gửi yêu cầu. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Điện thoại.';
                    bookingStatusMsg.style.display = 'block';
                }
            });
        });
    }

    // -------------------------------------------------------------
    // POSTERS ARCHIVE LOGIC & LIGHTBOX
    // -------------------------------------------------------------
    function initPostersGallery() {
        const postersGrid = document.getElementById('posters-grid');
        const filterBar = document.getElementById('posters-filter-bar');
        const filterBtns = filterBar ? filterBar.querySelectorAll('.posters-filter-btn') : [];
        const counterPill = document.getElementById('posters-counter-pill');

        const lightbox = document.getElementById('posters-lightbox');
        const lightboxBackdrop = document.getElementById('posters-lightbox-backdrop');
        const lightboxCloseBtn = document.getElementById('posters-lightbox-close-btn');
        const lightboxPrevBtn = document.getElementById('posters-lightbox-prev');
        const lightboxNextBtn = document.getElementById('posters-lightbox-next');
        const lightboxImg = document.getElementById('posters-lightbox-main-img');
        const lightboxBadge = document.getElementById('posters-lightbox-badge');
        const lightboxTitle = document.getElementById('posters-lightbox-title');
        const lightboxCounter = document.getElementById('posters-lightbox-counter');
        const lightboxCaption = document.getElementById('posters-lightbox-caption-text');
        const lightboxSpecsRow = document.getElementById('posters-lightbox-specs-row');
        const lightboxFilmstrip = document.getElementById('posters-lightbox-filmstrip');
        const downloadBtn = document.getElementById('posters-download-btn');

        if (!postersGrid) return;

        const POSTERS_DATA = [
            {
                id: "poster-tiger-16",
                index: "01",
                title: "TIGER CRYSTAL // ICY NIGHT",
                category: "brand",
                categoryLabel: "EVENT & BRAND",
                badge: "16.07 // TIGER CRYSTAL",
                date: "16/07",
                brand: "Tiger Crystal x MC SiNine",
                description: "Chiến dịch Tiger Crystal bùng nổ năng lượng băng tuyết sảng khoái và ánh sáng thành phố đêm rực rỡ cùng phong cách leather jacket quyền lực của MC SININE.",
                thumb: "assets/posters/thumbs/16.7.jpg",
                full: "assets/posters/16.7.png",
                accentColor: "#f59e0b",
                glowColor: "rgba(245, 158, 11, 0.4)",
                specs: {
                    brand: "TIGER CRYSTAL",
                    date: "16 / 07",
                    resolution: "1856 x 2304 HD",
                    concept: "ICY METROPOLIS"
                }
            },
            {
                id: "poster-tiger-18",
                index: "02",
                title: "TIGER CRYSTAL // GOLDEN FROST",
                category: "brand",
                categoryLabel: "EVENT & BRAND",
                badge: "18.07 // TIGER CRYSTAL",
                date: "18/07",
                brand: "Tiger Crystal x MC SiNine",
                description: "Visual phong cách White Techwear trẻ trung, tinh tế kết hợp chai bia Tiger Crystal mát lạnh cùng ánh hoàng hôn vàng rực rỡ.",
                thumb: "assets/posters/thumbs/18.7.jpg",
                full: "assets/posters/18.7.png",
                accentColor: "#38bdf8",
                glowColor: "rgba(56, 189, 248, 0.4)",
                specs: {
                    brand: "TIGER CRYSTAL",
                    date: "18 / 07",
                    resolution: "1856 x 2304 HD",
                    concept: "GOLDEN FROST"
                }
            },
            {
                id: "poster-heineken-wonderland",
                index: "03",
                title: "WELCOME TO WONDERLAND // HEINEKEN",
                category: "brand",
                categoryLabel: "EVENT & BRAND",
                badge: "25.07 // HEINEKEN",
                date: "25/07",
                brand: "Heineken x MC SiNine & S-Lady",
                description: "Đại tiệc âm nhạc nhiệt đới Heineken tại 88 Beer Garden Vũng Tàu quy tụ dàn người đẹp S-Lady và MC SiNine trong không gian xanh neon cuốn hút.",
                thumb: "assets/posters/thumbs/IMG_2223.jpg",
                full: "assets/posters/IMG_2223.JPG",
                accentColor: "#22c55e",
                glowColor: "rgba(34, 197, 94, 0.4)",
                specs: {
                    brand: "HEINEKEN // 88 BEER GARDEN",
                    date: "25 / 07",
                    resolution: "2048 x 2560 HD",
                    concept: "TROPICAL WONDERLAND"
                }
            },
            {
                id: "poster-y2k-prom",
                index: "04",
                title: "WESTSIDE TEAM // RETRO Y2K PARTY",
                category: "editorial",
                categoryLabel: "EDITORIAL & FASHION",
                badge: "RETRO Y2K // ZÔ DỨT CẠN",
                date: "SPECIAL NIGHT",
                brand: "Westside Team x Zô Dứt Cạn",
                description: "Thiết kế đồ họa phá cách mang hơi hướng Y2K Cyberpunk đường phố với giao diện retro pop-up windows, graffiti và nhịp đập âm thanh sống động.",
                thumb: "assets/posters/thumbs/IMG_1400.jpg",
                full: "assets/posters/IMG_1400.JPG",
                accentColor: "#00f0ff",
                glowColor: "rgba(0, 240, 255, 0.4)",
                specs: {
                    series: "WESTSIDE TEAM ARCHIVE",
                    style: "RETRO Y2K CYBER",
                    resolution: "1856 x 2304 HD",
                    location: "NINH KIỀU // CẦN THƠ"
                }
            },
            {
                id: "poster-westside-black",
                index: "05",
                title: "WESTSIDE // LIFESTYLE FOOTBALL (BLACK)",
                category: "editorial",
                categoryLabel: "EDITORIAL & FASHION",
                badge: "EDITORIAL // LUXURY TECHWEAR",
                date: "ARCHIVE 2026",
                brand: "Westside x MC SiNine",
                description: "Ấn phẩm Editorial thời trang Sporty Luxury: MC SiNine trong trang phục da đen bóng bẩy, gậy bóng chày và bảng thông số chiến thuật bóng đá.",
                thumb: "assets/posters/thumbs/Si Nine 1.jpg",
                full: "assets/posters/Si Nine 1.png",
                accentColor: "#eab308",
                glowColor: "rgba(234, 179, 8, 0.4)",
                specs: {
                    series: "WESTSIDE LIFESTYLE",
                    palette: "BLACK & EMERALD",
                    resolution: "1856 x 2304 HD",
                    concept: "TACTICAL FASHION"
                }
            },
            {
                id: "poster-westside-white",
                index: "06",
                title: "WESTSIDE // LIFESTYLE FOOTBALL (WHITE)",
                category: "editorial",
                categoryLabel: "EDITORIAL & FASHION",
                badge: "EDITORIAL // MONOCHROME WHITE",
                date: "ARCHIVE 2026",
                brand: "Westside x MC SiNine",
                description: "Visual tạp chí Monochrome trắng tinh tế: Set đồ techwear trắng cùng gậy bóng chày trên vai, khẳng định bản lĩnh tiên phong và thần thái cuốn hút.",
                thumb: "assets/posters/thumbs/Si Nine 2.jpg",
                full: "assets/posters/Si Nine 2.png",
                accentColor: "#ffffff",
                glowColor: "rgba(255, 255, 255, 0.35)",
                specs: {
                    series: "WESTSIDE LIFESTYLE",
                    palette: "PURE WHITE & STEEL",
                    resolution: "1856 x 2304 HD",
                    concept: "AVANT-GARDE STREET"
                }
            },
            {
                id: "poster-worldcup-fanzone",
                index: "07",
                title: "WORLD CUP SEASON // STADIUM FAN ZONE",
                category: "special",
                categoryLabel: "SPECIAL EDITION",
                badge: "WORLD CUP // FAN ZONE",
                date: "WORLD CUP NIGHT",
                brand: "MC SiNine x Westside Team",
                description: "Bầu không khí lễ hội bóng đá đỉnh cao tại Fan Zone khán đài sân vận động rực lửa dưới ánh đèn pha và pháo hoa rực rỡ.",
                thumb: "assets/posters/thumbs/Si Nine.jpg",
                full: "assets/posters/Si Nine.png",
                accentColor: "#fb923c",
                glowColor: "rgba(251, 146, 60, 0.4)",
                specs: {
                    theme: "WORLD CUP CELEBRATION",
                    lighting: "STADIUM ILLUMINATION",
                    resolution: "1856 x 2304 HD",
                    energy: "MAXIMUM HYPE"
                }
            }
        ];

        let activeFilter = 'all';
        let currentPosterIndex = 0;
        let filteredPosters = [...POSTERS_DATA];

        // Render Poster Cards
        function renderPosters() {
            postersGrid.innerHTML = '';
            filteredPosters = activeFilter === 'all'
                ? [...POSTERS_DATA]
                : POSTERS_DATA.filter(p => p.category === activeFilter);

            filteredPosters.forEach((poster, idx) => {
                const card = document.createElement('div');
                card.className = 'poster-card';
                card.dataset.id = poster.id;
                card.dataset.index = idx;
                card.style.setProperty('--poster-accent', poster.accentColor);
                card.style.setProperty('--poster-glow', poster.glowColor);

                card.innerHTML = `
                    <div class="poster-card-media">
                        <img class="poster-card-img" src="${poster.thumb}" alt="${poster.title}" loading="lazy" />
                    </div>
                `;

                // Interactive 3D tilt effect on mouse movement
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -7;
                    const rotateY = ((x - centerX) / centerX) * 7;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });

                // Click to open lightbox
                card.addEventListener('click', () => {
                    openPostersLightbox(idx);
                });

                postersGrid.appendChild(card);
            });

            if (counterPill) {
                counterPill.textContent = `${filteredPosters.length.toString().padStart(2, '0')} IMPRESSIONS`;
            }
        }

        // Filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter || 'all';
                renderPosters();
            });
        });

        // Lightbox Logic
        function openPostersLightbox(index) {
            currentPosterIndex = index;
            updateLightboxContent();
            renderFilmstrip();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePostersLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightboxContent() {
            const poster = filteredPosters[currentPosterIndex];
            if (!poster) return;

            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = poster.full;
                lightboxImg.alt = poster.title;
                lightboxImg.onload = () => {
                    lightboxImg.style.opacity = '1';
                };
            }, 100);

            if (lightboxBadge) lightboxBadge.textContent = `// POSTER ARCHIVE 0${poster.index}`;
            if (lightboxTitle) lightboxTitle.textContent = poster.title;
            if (lightboxCounter) lightboxCounter.textContent = `${(currentPosterIndex + 1).toString().padStart(2, '0')} / ${filteredPosters.length.toString().padStart(2, '0')}`;
            if (lightboxCaption) lightboxCaption.textContent = poster.description;

            if (downloadBtn) {
                downloadBtn.href = poster.full;
                downloadBtn.setAttribute('download', `${poster.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`);
            }

            if (lightboxSpecsRow) {
                lightboxSpecsRow.innerHTML = Object.entries(poster.specs).map(([k, v]) => `
                    <div class="posters-lightbox-spec-item">${k.toUpperCase()}: <span>${v}</span></div>
                `).join('');
            }

            // Update filmstrip active state
            const thumbs = lightboxFilmstrip ? lightboxFilmstrip.querySelectorAll('.posters-filmstrip-thumb') : [];
            thumbs.forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === currentPosterIndex);
            });
        }

        function renderFilmstrip() {
            if (!lightboxFilmstrip) return;
            lightboxFilmstrip.innerHTML = '';
            filteredPosters.forEach((p, idx) => {
                const thumb = document.createElement('div');
                thumb.className = `posters-filmstrip-thumb ${idx === currentPosterIndex ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${p.thumb}" alt="${p.title}" />`;
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentPosterIndex = idx;
                    updateLightboxContent();
                });
                lightboxFilmstrip.appendChild(thumb);
            });
        }

        function nextPoster() {
            currentPosterIndex = (currentPosterIndex + 1) % filteredPosters.length;
            updateLightboxContent();
        }

        function prevPoster() {
            currentPosterIndex = (currentPosterIndex - 1 + filteredPosters.length) % filteredPosters.length;
            updateLightboxContent();
        }

        if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closePostersLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closePostersLightbox);
        if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextPoster(); });
        if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevPoster(); });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closePostersLightbox();
            if (e.key === 'ArrowRight') nextPoster();
            if (e.key === 'ArrowLeft') prevPoster();
        });

        // Initialize Render
        renderPosters();
    }

    // Initialize all components
    initPostersGallery();
    initRecapShowcase();
    initStageGallery();
    initMomentsGallery();
    initBookingSystem();
});
