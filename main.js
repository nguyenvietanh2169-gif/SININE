document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const homeScreen = document.getElementById('home-screen');
    const backBtn = document.getElementById('back-to-welcome');
    const scene = document.querySelector('.scene');

    // 1. Enter Button click transition
    enterBtn.addEventListener('click', () => {
        // Disable button to prevent double clicks during animation
        enterBtn.style.pointerEvents = 'none';
        
        // Start leaving animation for welcome screen
        welcomeScreen.classList.add('leaving');
        
        // Smoothly show homepage slightly before welcome screen fully fades out
        setTimeout(() => {
            homeScreen.classList.add('visible');
        }, 800); // 800ms offset for seamless cinematic cross-fade layering (matching the slower transition)
    });

    // 2. Back button click transition (for testing and review)
    backBtn.addEventListener('click', () => {
        // Hide homepage
        homeScreen.classList.remove('visible');
        
        // Show welcome screen
        welcomeScreen.classList.remove('leaving');
        
        // Re-enable enter button pointer events
        setTimeout(() => {
            enterBtn.style.pointerEvents = 'auto';
        }, 1200); // match transition duration
    });

    // 3. Premium 3D Mouse Parallax Effect
    // Only apply on non-touch desktop devices for performance and usability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && scene) {
        // Add perspective styling to container
        const sceneContainer = document.querySelector('.scene-container');
        if (sceneContainer) {
            sceneContainer.style.perspective = '1200px';
        }
        
        scene.style.transformStyle = 'preserve-3d';
        scene.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

        document.addEventListener('mousemove', (e) => {
            // Stop parallax if welcome screen is already swiped out
            if (welcomeScreen.classList.contains('leaving')) {
                scene.style.transform = '';
                return;
            }

            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Normalized values between -1 and 1
            const mouseX = (e.clientX - width / 2) / (width / 2);
            const mouseY = (e.clientY - height / 2) / (height / 2);

            // Calculate rotation angles (max 12 degrees)
            const rotateY = mouseX * 12;
            const rotateX = -mouseY * 12;

            // Apply 3D rotation to the entire scene collage
            scene.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        // Reset scene orientation when mouse leaves screen
        document.addEventListener('mouseleave', () => {
            if (!welcomeScreen.classList.contains('leaving')) {
                scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    }
});
