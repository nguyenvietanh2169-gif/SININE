document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const homeScreen = document.getElementById('home-screen');
    const backBtn = document.getElementById('back-to-welcome');
    const scene = document.querySelector('.scene');

    // Page Switching Management (Page 1: Home, Page 2: Artist, Page 3: Collection, Page 4: 360° Runway)
    const pageHome = document.getElementById('page-home');
    const pageArtist = document.getElementById('page-artist');
    const pageCollection = document.getElementById('page-collection');
    const pageRunway = document.getElementById('page-runway');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerLogo = document.querySelector('.header-logo');
    const jumpToArtistBtn = document.getElementById('jump-to-artist');
    const hintText = jumpToArtistBtn ? jumpToArtistBtn.querySelector('.hint-text') : null;
    const backToHeroBtn = document.getElementById('btn-back-to-hero');
    const jumpToCollectionBtn = document.getElementById('btn-jump-to-collection');
    const backToArtistBtn = document.getElementById('btn-back-to-artist');
    const jumpToRunwayBtn = document.getElementById('btn-jump-to-runway');
    const backToCollectionBtn = document.getElementById('btn-back-to-collection');
    const backToHomeBtn = document.getElementById('btn-back-to-home');
    const collectionPosterFrame = document.getElementById('collection-poster-frame');
    
    let currentPage = 'home';
    let isTransitioning = false;

    function switchPage(pageId) {
        if (!pageId || isTransitioning) return;
        if (pageId === currentPage) return;

        isTransitioning = true;
        currentPage = pageId;

        // Reset classes on all pages
        if (pageHome) pageHome.classList.remove('page-prev', 'active');
        if (pageArtist) pageArtist.classList.remove('page-prev', 'active');
        if (pageCollection) pageCollection.classList.remove('page-prev', 'active');
        if (pageRunway) pageRunway.classList.remove('page-prev', 'active');

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
            if (target === 'home' || target === 'artist' || target === 'collection' || target === 'runway') {
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
});
