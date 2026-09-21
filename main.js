document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const homeScreen = document.getElementById('home-screen');
    const backBtn = document.getElementById('back-to-welcome');
    const scene = document.querySelector('.scene');

    // Page Switching Management (Page 1: Home, Page 2: Artist, Page 3: Collection, Page 4: 360° Runway, Page 5: Video Recap, Page 6: Live Stage, Page 7: Moments)
    const pageHome = document.getElementById('page-home');
    const pageArtist = document.getElementById('page-artist');
    const pageCollection = document.getElementById('page-collection');
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
    const momentsToBookingBtn = document.getElementById('btn-moments-to-booking');
    const bookingToMomentsBtn = document.getElementById('btn-booking-to-moments');
    const bookingToHomeBtn = document.getElementById('btn-booking-to-home');
    const bookingForm = document.getElementById('booking-inquiry-form');
    const bookingStatusMsg = document.getElementById('booking-status-msg');
    const backToHomeBtn = document.getElementById('btn-back-to-home');
    const collectionPosterFrame = document.getElementById('collection-poster-frame');
    const recapMainVideo = document.getElementById('recap-main-video');
    const momentsLightbox = document.getElementById('moments-lightbox');
    const momentsLightboxVideo = document.getElementById('moments-lightbox-video');
    
    let currentPage = 'home';
    let isTransitioning = false;

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
            }
        }

        // Reset classes on all pages
        if (pageHome) pageHome.classList.remove('page-prev', 'active');
        if (pageArtist) pageArtist.classList.remove('page-prev', 'active');
        if (pageCollection) pageCollection.classList.remove('page-prev', 'active');
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
                pageCollection.scrollTop = 0;
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
                    // Seamlessly stay at the bottom of the stage photos
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
                if (previousPage === 'booking') {
                    // Seamlessly stay at the bottom of moments grid
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
        } else if (pageId === 'booking') {
            if (pageHome) pageHome.classList.add('page-prev');
            if (pageArtist) pageArtist.classList.add('page-prev');
            if (pageCollection) pageCollection.classList.add('page-prev');
            if (pageRunway) pageRunway.classList.add('page-prev');
            if (pageRecap) pageRecap.classList.add('page-prev');
            if (pageStage) pageStage.classList.add('page-prev');
            if (pageMoments) pageMoments.classList.add('page-prev');
            if (pageBooking) {
                pageBooking.classList.add('active');
                pageBooking.scrollTop = 0;
            }
        }

        // Update Nav Links
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 1200);
    }

    // Nav link click listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (target === 'home' || target === 'artist' || target === 'collection' || target === 'runway' || target === 'recap' || target === 'stage' || target === 'moments' || target === 'booking') {
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

    if (momentsToBookingBtn) {
        momentsToBookingBtn.addEventListener('click', () => switchPage('booking'));
    }

    if (momentsToHomeBtn) {
        momentsToHomeBtn.addEventListener('click', () => switchPage('home'));
    }

    if (bookingToMomentsBtn) {
        bookingToMomentsBtn.addEventListener('click', () => switchPage('moments'));
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
    // 3. Scroll-Driven Multi-Page Navigation Engine
    // -------------------------------------------------------------
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let lastTouchY = 0;
    let overscrollAccumulator = 0;

    // Helper: Check if container is scrolled to bottom
    function isScrolledToBottom(el) {
        if (!el) return true;
        return el.scrollTop + el.clientHeight >= el.scrollHeight - 15;
    }

    // Helper: Check if container is scrolled to top
    function isScrolledToTop(el) {
        if (!el) return true;
        return el.scrollTop <= 5;
    }

    // Mouse Wheel Scroll Listener
    window.addEventListener('wheel', (e) => {
        // If on Welcome Screen, any downward scroll enters the main site
        if (!homeScreen.classList.contains('visible')) {
            if (e.deltaY > 10) {
                enterSite();
            }
            return;
        }

        if (isTransitioning) return;

        if (currentPage === 'home') {
            if (e.deltaY > 0) {
                // Scrolling down on home page
                if (targetScrollProgress < 1.0) {
                    targetScrollProgress += e.deltaY * 0.0016;
                    targetScrollProgress = Math.min(1.0, targetScrollProgress);
                } else if (targetScrollProgress >= 0.95) {
                    overscrollAccumulator += e.deltaY;
                    if (overscrollAccumulator > 60) {
                        overscrollAccumulator = 0;
                        switchPage('artist');
                    }
                }
            } else if (e.deltaY < 0) {
                // Scrolling up on home page
                targetScrollProgress += e.deltaY * 0.0016;
                targetScrollProgress = Math.max(0, targetScrollProgress);
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'artist') {
            // In Artist Page:
            if (e.deltaY < 0 && isScrolledToTop(pageArtist)) {
                // Scrolling up at top -> return to Home
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('home');
                }
            } else if (e.deltaY > 0 && isScrolledToBottom(pageArtist)) {
                // Scrolling down at bottom -> advance to Collection (Page 3)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('collection');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'collection') {
            // In Collection Page (Page 3):
            if (e.deltaY < 0 && isScrolledToTop(pageCollection)) {
                // Scrolling up at top -> return to Artist (Page 2)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('artist');
                }
            } else if (e.deltaY > 0 && isScrolledToBottom(pageCollection)) {
                // Scrolling down at bottom -> advance to 360° Runway (Page 4)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('runway');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'runway') {
            // In 360° Runway Page (Page 4):
            if (e.deltaY < 0 && isScrolledToTop(pageRunway)) {
                // Scrolling up at top -> return to Collection (Page 3)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('collection');
                }
            } else if (e.deltaY > 0) {
                // Scrolling down -> advance to Video Recap (Page 5)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('recap');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'recap') {
            // In Video Recap Page (Page 5):
            if (e.deltaY < 0 && isScrolledToTop(pageRecap)) {
                // Scrolling up at top -> return to Runway (Page 4)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('runway');
                }
            } else if (e.deltaY > 0 && isScrolledToBottom(pageRecap)) {
                // Scrolling down at bottom -> advance to Live Stage (Page 6)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('stage');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'stage') {
            // In Live Stage Page (Page 6):
            if (e.deltaY < 0 && isScrolledToTop(pageStage)) {
                // Scrolling up at top -> return to Video Recap (Page 5)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('recap');
                }
            } else if (e.deltaY > 0 && isScrolledToBottom(pageStage)) {
                // Scrolling down at bottom -> advance to Moments (Page 7)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('moments');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'moments') {
            // In Moments Page (Page 7):
            if (e.deltaY < 0 && isScrolledToTop(pageMoments)) {
                // Scrolling up at top -> return to Live Stage (Page 6)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('stage');
                }
            } else if (e.deltaY > 0 && isScrolledToBottom(pageMoments)) {
                // Scrolling down at bottom -> advance to Booking (Page 8)
                overscrollAccumulator += e.deltaY;
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('booking');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'booking') {
            // In Booking Page (Page 8):
            if (e.deltaY < 0 && isScrolledToTop(pageBooking)) {
                // Scrolling up at top -> return to Moments (Page 7)
                overscrollAccumulator += Math.abs(e.deltaY);
                if (overscrollAccumulator > 60) {
                    overscrollAccumulator = 0;
                    switchPage('moments');
                }
            } else {
                overscrollAccumulator = 0;
            }
        }
    }, { passive: true });

    // Touch Swipe Scroll for Mobile
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            lastTouchY = e.touches[0].clientY;
            overscrollAccumulator = 0;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isTransitioning || e.touches.length === 0) return;

        const touchY = e.touches[0].clientY;
        const delta = lastTouchY - touchY;
        lastTouchY = touchY;

        // If on Welcome Screen, swiping up enters main site
        if (!homeScreen.classList.contains('visible')) {
            if (delta > 20) {
                enterSite();
            }
            return;
        }

        if (currentPage === 'home') {
            // Lock browser pull-to-refresh on home
            if (e.cancelable) {
                e.preventDefault();
            }

            if (delta > 0) {
                // Swiping up (moving forward)
                if (targetScrollProgress < 1.0) {
                    targetScrollProgress += delta * 0.0035;
                    targetScrollProgress = Math.min(1.0, targetScrollProgress);
                } else if (targetScrollProgress >= 0.95) {
                    overscrollAccumulator += delta;
                    if (overscrollAccumulator > 40) {
                        overscrollAccumulator = 0;
                        switchPage('artist');
                    }
                }
            } else if (delta < 0) {
                // Swiping down (moving backward)
                targetScrollProgress += delta * 0.0035;
                targetScrollProgress = Math.max(0, targetScrollProgress);
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'artist') {
            if (delta < 0 && isScrolledToTop(pageArtist)) {
                // Swiping down at top -> return to Home
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('home');
                }
            } else if (delta > 0 && isScrolledToBottom(pageArtist)) {
                // Swiping up at bottom -> advance to Collection (Page 3)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('collection');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'collection') {
            if (delta < 0 && isScrolledToTop(pageCollection)) {
                // Swiping down at top -> return to Artist (Page 2)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('artist');
                }
            } else if (delta > 0 && isScrolledToBottom(pageCollection)) {
                // Swiping up at bottom -> advance to 360° Runway (Page 4)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('runway');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'runway') {
            if (delta < 0 && isScrolledToTop(pageRunway)) {
                // Swiping down at top -> return to Collection (Page 3)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('collection');
                }
            } else if (delta > 0) {
                // Swiping up at bottom of runway -> advance to Recap (Page 5)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('recap');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'recap') {
            if (delta < 0 && isScrolledToTop(pageRecap)) {
                // Swiping down at top -> return to Runway (Page 4)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('runway');
                }
            } else if (delta > 0 && isScrolledToBottom(pageRecap)) {
                // Swiping up at bottom -> advance to Live Stage (Page 6)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('stage');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'stage') {
            if (delta < 0 && isScrolledToTop(pageStage)) {
                // Swiping down at top -> return to Recap (Page 5)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('recap');
                }
            } else if (delta > 0 && isScrolledToBottom(pageStage)) {
                // Swiping up at bottom -> advance to Moments (Page 7)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('moments');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'moments') {
            if (delta < 0 && isScrolledToTop(pageMoments)) {
                // Swiping down at top -> return to Live Stage (Page 6)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('stage');
                }
            } else if (delta > 0 && isScrolledToBottom(pageMoments)) {
                // Swiping up at bottom -> advance to Booking (Page 8)
                overscrollAccumulator += delta;
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('booking');
                }
            } else {
                overscrollAccumulator = 0;
            }
        } else if (currentPage === 'booking') {
            if (delta < 0 && isScrolledToTop(pageBooking)) {
                // Swiping down at top -> return to Moments (Page 7)
                overscrollAccumulator += Math.abs(delta);
                if (overscrollAccumulator > 40) {
                    overscrollAccumulator = 0;
                    switchPage('moments');
                }
            } else {
                overscrollAccumulator = 0;
            }
        }
    }, { passive: false });

    // Typewriter Animation Loop
    function updateTypewriter() {
        if (homeScreen.classList.contains('visible')) {
            // Apple-like gentle damping
            currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.065;

            // 1. Reveal Decor Lines 0 to 3 sequentially
            decorLines.forEach((line) => {
                const lineIndex = parseInt(line.getAttribute('data-line'), 10) || 0;
                const textSpan = line.querySelector('.decor-text');
                if (!textSpan) return;
                
                const fullText = textSpan.getAttribute('data-text') || '';
                const lineStart = 0.04 + lineIndex * 0.16;
                const lineEnd = lineStart + 0.14;

                if (currentScrollProgress < lineStart) {
                    line.classList.remove('active', 'typing');
                    textSpan.textContent = '';
                } else if (currentScrollProgress >= lineStart && currentScrollProgress < lineEnd) {
                    const progressInLine = (currentScrollProgress - lineStart) / (lineEnd - lineStart);
                    const charCount = Math.floor(progressInLine * (fullText.length + 1));
                    if (charCount <= 0) {
                        line.classList.remove('active', 'typing');
                        textSpan.textContent = '';
                    } else {
                        line.classList.add('active', 'typing');
                        textSpan.textContent = fullText.slice(0, charCount);
                    }
                } else {
                    line.classList.add('active');
                    line.classList.remove('typing');
                    textSpan.textContent = fullText;
                }
            });

            // 2. Reveal Giant SININE Wordmark as the FINAL step (0.70 to 0.96)
            if (brandWordmark && brandTextSpan) {
                const brandStart = 0.70;
                const brandEnd = 0.96;

                if (currentScrollProgress < brandStart) {
                    brandWordmark.classList.remove('active', 'typing');
                    brandTextSpan.textContent = '';
                } else if (currentScrollProgress >= brandStart && currentScrollProgress < brandEnd) {
                    const progressInBrand = (currentScrollProgress - brandStart) / (brandEnd - brandStart);
                    const charCount = Math.floor(progressInBrand * (brandFullText.length + 1));
                    if (charCount <= 0) {
                        brandWordmark.classList.remove('active', 'typing');
                        brandTextSpan.textContent = '';
                    } else {
                        brandWordmark.classList.add('active', 'typing');
                        brandTextSpan.textContent = brandFullText.slice(0, charCount);
                    }
                } else {
                    brandWordmark.classList.add('active');
                    brandWordmark.classList.remove('typing');
                    brandTextSpan.textContent = brandFullText;
                }
            }

            // 3. Dynamic Scroll Hint Behavior
            if (scrollHint) {
                if (currentScrollProgress >= 0.95) {
                    scrollHint.classList.add('ready-to-slide');
                    scrollHint.classList.remove('faded');
                    if (hintText) hintText.textContent = 'SCROLL TO SLIDE UP // ARTIST INFO ↓';
                } else if (currentScrollProgress > 0.08) {
                    scrollHint.classList.remove('ready-to-slide');
                    scrollHint.classList.add('faded');
                    if (hintText) hintText.textContent = 'SCROLL TO REVEAL';
                } else {
                    scrollHint.classList.remove('ready-to-slide', 'faded');
                    if (hintText) hintText.textContent = 'SCROLL TO REVEAL';
                }
            }
        }
        requestAnimationFrame(updateTypewriter);
    }
    updateTypewriter();

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

        // Rotate to specific look index
        function rotateToIndex(targetIdx) {
            let currentNearest = getNearestIndex(targetAngle);
            let diff = targetIdx - currentNearest;
            // Shortest path logic (-3 to +3)
            if (diff > itemCount / 2) diff -= itemCount;
            if (diff < -itemCount / 2) diff += itemCount;
            targetAngle -= diff * angleStep;
            dragVelocity = 0;
        }

        // Animation Physics Loop (60/120fps Silky Smooth Decoupled Engine)
        function renderLoop() {
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

            requestAnimationFrame(renderLoop);
        }

        requestAnimationFrame(renderLoop);
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
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                targetAngle -= angleStep;
                dragVelocity = 0;
            });
        }

        // Keyboard Arrow Navigation
        window.addEventListener('keydown', (e) => {
            if (currentPage !== 'runway') return;
            if (e.key === 'ArrowLeft') {
                targetAngle += angleStep;
                dragVelocity = 0;
            } else if (e.key === 'ArrowRight') {
                targetAngle -= angleStep;
                dragVelocity = 0;
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
                        "filename": "stage_13.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_13.jpg",
                        "fullPath": "assets/stage/full/stage_13.jpg",
                        "width": 1279,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.666,
                        "title": "KINETIC PULSE // MC SININE",
                        "subtitle": "Cận cảnh thần thái MC SININE trong trang phục dạ kẻ Avant-Garde và kính vàng độc bản làm chủ nhịp điệu sân khấu.",
                        "category": "portrait",
                        "accentColor": "#ffaa25",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1279 x 1920 HD"
                        }
            },
            {
                        "id": "stage-2",
                        "index": "02",
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
                        "filename": "stage_25.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "PANORAMIC APEX // STAGE VORTEX",
                        "subtitle": "Toàn cảnh sân khấu góc rộng bao trọn không gian ánh sáng laser và màn hình LED đại cảnh.",
                        "category": "wide",
                        "accentColor": "#ffaa25",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-3",
                        "index": "03",
                        "thumbPath": "assets/stage/thumbs/stage_25.jpg",
                        "fullPath": "assets/stage/full/stage_25.jpg"
            },
            {
                        "id": "stage-4",
                        "index": "04",
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
                        "id": "stage-5",
                        "index": "05",
                        "filename": "stage_07.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_07.jpg",
                        "fullPath": "assets/stage/full/stage_07.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "NEO-TOKYO VIBE // LIVE SET",
                        "subtitle": "Đội hình trình diễn vũ đạo và âm nhạc đương đại rực sáng dưới luồng laser xanh neon sắc sảo.",
                        "category": "wide",
                        "accentColor": "#a3e635",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
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
                        "id": "stage-6",
                        "index": "06",
                        "thumbPath": "assets/stage/thumbs/stage_26.jpg",
                        "fullPath": "assets/stage/full/stage_26.jpg"
            },
            {
                        "id": "stage-7",
                        "index": "07",
                        "filename": "stage_11.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_11.jpg",
                        "fullPath": "assets/stage/full/stage_11.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "STAGE ASCENSION // CLIMAX 18:13",
                        "subtitle": "Thời khắc đếm ngược đỉnh cao khi toàn bộ nghệ sĩ cùng giơ tay hòa chung nhịp đập với biển khán giả cuồng nhiệt.",
                        "category": "highlight",
                        "accentColor": "#f43f5e",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
            },
            {
                        "id": "stage-8",
                        "index": "08",
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
                        "id": "stage-9",
                        "index": "09",
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
                        "id": "stage-10",
                        "index": "10",
                        "thumbPath": "assets/stage/thumbs/stage_27.jpg",
                        "fullPath": "assets/stage/full/stage_27.jpg"
            },
            {
                        "id": "stage-11",
                        "index": "11",
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
                        "id": "stage-12",
                        "index": "12",
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
                        "id": "stage-13",
                        "index": "13",
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
                        "id": "stage-14",
                        "index": "14",
                        "thumbPath": "assets/stage/thumbs/stage_28.jpg",
                        "fullPath": "assets/stage/full/stage_28.jpg"
            },
            {
                        "id": "stage-15",
                        "index": "15",
                        "filename": "stage_06.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_06.jpg",
                        "fullPath": "assets/stage/full/stage_06.jpg",
                        "width": 1920,
                        "height": 1277,
                        "isVertical": false,
                        "aspectRatio": 1.504,
                        "title": "HIGH FREQUENCY COMMAND",
                        "subtitle": "Vocal command driving thousands in rhythmic unison",
                        "category": "wide",
                        "accentColor": "#06b6d4",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1277 HD"
                        }
            },
            {
                        "id": "stage-16",
                        "index": "16",
                        "filename": "stage_08.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_08.jpg",
                        "fullPath": "assets/stage/full/stage_08.jpg",
                        "width": 1920,
                        "height": 1279,
                        "isVertical": false,
                        "aspectRatio": 1.501,
                        "title": "MIC FLUIDITY // FLOW MATRIX",
                        "subtitle": "Sculptural posture and flawless microphone handling",
                        "category": "wide",
                        "accentColor": "#eab308",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1279 HD"
                        }
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
                        "id": "stage-17",
                        "index": "17",
                        "thumbPath": "assets/stage/thumbs/stage_29.jpg",
                        "fullPath": "assets/stage/full/stage_29.jpg"
            },
            {
                        "id": "stage-18",
                        "index": "18",
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
                        "id": "stage-19",
                        "index": "19",
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
                        "id": "stage-20",
                        "index": "20",
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
                        "id": "stage-21",
                        "index": "21",
                        "thumbPath": "assets/stage/thumbs/stage_30.jpg",
                        "fullPath": "assets/stage/full/stage_30.jpg"
            },
            {
                        "id": "stage-22",
                        "index": "22",
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
                        "id": "stage-23",
                        "index": "23",
                        "filename": "stage_15.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_15.jpg",
                        "fullPath": "assets/stage/full/stage_15.jpg",
                        "width": 1280,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.667,
                        "title": "ULTRAVIOLET ECHO",
                        "subtitle": "Ultraviolet wash highlighting cyber metallic accessories",
                        "category": "highlight",
                        "accentColor": "#ec4899",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1280 x 1920 HD"
                        }
            },
            {
                        "filename": "stage_31.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "MASS RESONANCE // 99.8 MHz",
                        "subtitle": "Góc rộng bắt trọn sự cuồng nhiệt và năng lượng bùng nổ từ hàng ghế khán giả tới tâm điểm sân khấu.",
                        "category": "wide",
                        "accentColor": "#eab308",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-24",
                        "index": "24",
                        "thumbPath": "assets/stage/thumbs/stage_31.jpg",
                        "fullPath": "assets/stage/full/stage_31.jpg"
            },
            {
                        "id": "stage-25",
                        "index": "25",
                        "filename": "stage_16.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_16.jpg",
                        "fullPath": "assets/stage/full/stage_16.jpg",
                        "width": 1280,
                        "height": 1920,
                        "isVertical": true,
                        "aspectRatio": 0.667,
                        "title": "MONOCHROME VOLT",
                        "subtitle": "High contrast silhouette framed by massive LED graphics",
                        "category": "portrait",
                        "accentColor": "#eab308",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1280 x 1920 HD"
                        }
            },
            {
                        "id": "stage-26",
                        "index": "26",
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
                        "id": "stage-27",
                        "index": "27",
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
                        "id": "stage-28",
                        "index": "28",
                        "thumbPath": "assets/stage/thumbs/stage_32.jpg",
                        "fullPath": "assets/stage/full/stage_32.jpg"
            },
            {
                        "id": "stage-29",
                        "index": "29",
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
                        "id": "stage-30",
                        "index": "30",
                        "filename": "stage_20.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_20.jpg",
                        "fullPath": "assets/stage/full/stage_20.jpg",
                        "width": 1920,
                        "height": 1277,
                        "isVertical": false,
                        "aspectRatio": 1.504,
                        "title": "METROPOLIS BEAT",
                        "subtitle": "Urban sonic architecture echoing through metropolitan night",
                        "category": "wide",
                        "accentColor": "#e11d48",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1277 HD"
                        }
            },
            {
                        "filename": "stage_33.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "title": "GRAND SPECTACLE // PULSE",
                        "subtitle": "Toàn cảnh khoảnh khắc thăng hoa cao trào khi toàn bộ hệ thống pháo sáng và visual kích hoạt.",
                        "category": "highlight",
                        "accentColor": "#e11d48",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
                        },
                        "id": "stage-31",
                        "index": "31",
                        "thumbPath": "assets/stage/thumbs/stage_33.jpg",
                        "fullPath": "assets/stage/full/stage_33.jpg"
            },
            {
                        "id": "stage-32",
                        "index": "32",
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
                        "id": "stage-33",
                        "index": "33",
                        "filename": "stage_23.jpg",
                        "thumbPath": "assets/stage/thumbs/stage_23.jpg",
                        "fullPath": "assets/stage/full/stage_23.jpg",
                        "width": 1920,
                        "height": 1280,
                        "isVertical": false,
                        "aspectRatio": 1.5,
                        "title": "ATMOSPHERIC CLIMAX",
                        "subtitle": "Atmospheric crescendo with full-spectrum stage lasers",
                        "category": "highlight",
                        "accentColor": "#ec4899",
                        "specs": {
                                    "venue": "METROPOLIS ARENA // STAGE 01",
                                    "freq": "99.8 MHz VOLTAGE",
                                    "resolution": "1920 x 1280 HD"
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
                        "id": "stage-34",
                        "index": "34",
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
            { id: "m-01", index: "01", filename: "1IV7JRFQH_3SELQ7.mp4", isVertical: true, duration: "00:48", title: "STAGE HYPE // CROWD SHOUT", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-02", index: "02", filename: "32d2dcb7efbe47e6ace669fae7737f2c.mp4", isVertical: true, duration: "00:25", title: "DYNAMIC BEAT DROP // MC SININE", tag: "STAGE ENERGY", category: "vertical" },
            { id: "m-03", index: "03", filename: "6f4b94c8432247f8b53a819d38d64295.mp4", isVertical: true, duration: "01:05", title: "NIGHT ARENA // CROWD ENERGY", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-04", index: "04", filename: "IMG_1758.mp4", isVertical: true, duration: "01:17", title: "METROPOLIS PULSE // LIVE VOCAL", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-05", index: "05", filename: "IMG_1761.mp4", isVertical: true, duration: "00:53", title: "CYBER WAVE // FLOW & RHYTHM", tag: "STAGE FLOW", category: "vertical" },
            { id: "m-06", index: "06", filename: "IMG_1763.mp4", isVertical: true, duration: "00:57", title: "LASER BEAM MOMENT // MC FOCUS", tag: "VISUAL LIGHT", category: "vertical" },
            { id: "m-07", index: "07", filename: "IMG_2138.mp4", isVertical: false, duration: "00:52", title: "PANORAMA STAGE // FULL VENUE", tag: "WIDE STAGE", category: "horizontal" },
            { id: "m-08", index: "08", filename: "IMG_3527.mp4", isVertical: false, duration: "00:21", title: "WIDE ARENA BASS DROP", tag: "WIDE STAGE", category: "horizontal" },
            { id: "m-09", index: "09", filename: "IMG_3576.mp4", isVertical: true, duration: "00:23", title: "STAGE SPOTLIGHT // CLOSE-UP", tag: "SOLO SHOT", category: "vertical" },
            { id: "m-10", index: "10", filename: "IMG_3807.mp4", isVertical: false, duration: "01:40", title: "FESTIVAL HIGHLIGHT // WIDE REEL", tag: "WIDE STAGE", category: "horizontal" },
            { id: "m-11", index: "11", filename: "IMG_3927.mp4", isVertical: true, duration: "01:02", title: "ELECTRIC ATMOSPHERE // MC POWER", tag: "STAGE ENERGY", category: "vertical" },
            { id: "m-12", index: "12", filename: "IMG_4372.mp4", isVertical: true, duration: "00:53", title: "CROWD CHANT // SOUND MATRIX", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-13", index: "13", filename: "IMG_4561.mp4", isVertical: true, duration: "01:09", title: "CLIMAX PERFORMANCE // MC SININE", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-14", index: "14", filename: "IMG_4618.mp4", isVertical: true, duration: "00:34", title: "NEON GLOW // RHYTHMIC ACCENT", tag: "STAGE ENERGY", category: "vertical" },
            { id: "m-15", index: "15", filename: "IMG_4620.mp4", isVertical: true, duration: "00:24", title: "BASSLINE VIBRATION // HYPE", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-16", index: "16", filename: "IMG_7073.mp4", isVertical: true, duration: "01:21", title: "MIDNIGHT ANTHEM // MAIN STAGE", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-17", index: "17", filename: "IMG_8255.mp4", isVertical: false, duration: "00:57", title: "HORIZON AUDITORIUM // LIVE", tag: "WIDE STAGE", category: "horizontal" },
            { id: "m-18", index: "18", filename: "IMG_8255_1.mp4", isVertical: true, duration: "01:27", title: "AVANT-GARDE FLOW // VOCAL SET", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-19", index: "19", filename: "IMG_8263.mp4", isVertical: true, duration: "00:31", title: "STAGE PYRO & LASER RUN", tag: "VISUAL LIGHT", category: "vertical" },
            { id: "m-20", index: "20", filename: "IMG_9784.mp4", isVertical: true, duration: "00:13", title: "HYPER QUICK IMPACT", tag: "QUICK CUT", category: "vertical" },
            { id: "m-21", index: "21", filename: "IMG_9785.mp4", isVertical: true, duration: "00:26", title: "KINETIC MOTION // MC VERSE", tag: "STAGE ENERGY", category: "vertical" },
            { id: "m-22", index: "22", filename: "IMG_9891.mp4", isVertical: true, duration: "00:35", title: "SOUNDWAVE SURGE // LIVE SHOT", tag: "LIVE STAGE", category: "vertical" },
            { id: "m-23", index: "23", filename: "IMG_9892.mp4", isVertical: true, duration: "00:24", title: "AUDIENCE CELEBRATION", tag: "CROWD & HYPE", category: "vertical" },
            { id: "m-24", index: "24", filename: "dji_mimo_20251224_233904_0_1766594721238_video.mp4", isVertical: true, duration: "01:33", title: "CINEMATIC REEL // MC SININE", tag: "CINEMATIC", category: "vertical" },
            { id: "m-25", index: "25", filename: "f621555d1183408aaf9941348c40f812.mp4", isVertical: true, duration: "00:14", title: "RAPID FIRE // BEAT ACCENT", tag: "STAGE ENERGY", category: "vertical" },
            { id: "m-26", index: "26", filename: "quality_restoration_20250517164841130.mp4", isVertical: true, duration: "00:38", title: "RESTORED MASTER CUT // FINALE", tag: "SPECIAL CUT", category: "vertical" }
        ];

        const BASE_R2_URL = "https://pub-f02c9f1287b6454cba085755015617e1.r2.dev/moment/sinine%20moment%201/";

        let filteredItems = [...MOMENTS_DATA];
        let currentModalIndex = 0;

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
                                <span class="moment-index-badge">// ${item.index}</span>
                                <span class="moment-duration-pill">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                    ${item.duration}
                                </span>
                            </div>
                            <div class="moment-play-btn">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"/></svg>
                            </div>
                            <div class="moment-bottom-row">
                                <h4 class="moment-title">${item.title}</h4>
                                <span class="moment-tag">${item.tag}</span>
                            </div>
                        </div>
                    </div>
                `;

                const previewVideo = card.querySelector('.moment-preview-video');

                // Hover preview play
                card.addEventListener('mouseenter', () => {
                    if (previewVideo && previewVideo.paused) {
                        previewVideo.play().catch(() => {});
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (previewVideo && !previewVideo.paused) {
                        previewVideo.pause();
                        previewVideo.currentTime = 1.0;
                    }
                });

                // Click to open modal
                card.addEventListener('click', () => {
                    openModal(fIndex);
                });

                grid.appendChild(card);
            });
        }

        function openModal(index) {
            currentModalIndex = index;
            const item = filteredItems[currentModalIndex];
            if (!item || !lightbox || !lightboxVideo) return;

            const videoUrl = `${BASE_R2_URL}${encodeURIComponent(item.filename)}`;
            
            if (badgeEl) badgeEl.textContent = `// REEL #${item.index}`;
            if (titleEl) titleEl.textContent = item.title;
            if (counterEl) counterEl.textContent = `${item.index} / ${MOMENTS_DATA.length}`;

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

    // Initialize all components
    initRecapShowcase();
    initStageGallery();
    initMomentsGallery();
    initBookingSystem();
});
