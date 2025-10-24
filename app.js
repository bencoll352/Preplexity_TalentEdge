// State management using JavaScript variables (no localStorage)
let currentSlide = 1;
const totalSlides = 15;

// DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');

// Initialize presentation
function init() {
    updateSlideDisplay();
    updateNavigationButtons();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            goToNextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            goToPreviousSlide();
        }
    }
}

// Update slide display
function updateSlideDisplay() {
    slides.forEach((slide, index) => {
        if (index + 1 === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update counter
    slideCounter.textContent = `${currentSlide}/${totalSlides}`;
}

// Update navigation button states
function updateNavigationButtons() {
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

// Navigate to next slide
function goToNextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideDisplay();
        updateNavigationButtons();
    }
}

// Navigate to previous slide
function goToPreviousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideDisplay();
        updateNavigationButtons();
    }
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goToNextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        currentSlide = 1;
        updateSlideDisplay();
        updateNavigationButtons();
    } else if (e.key === 'End') {
        e.preventDefault();
        currentSlide = totalSlides;
        updateSlideDisplay();
        updateNavigationButtons();
    }
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', goToPreviousSlide);
nextBtn.addEventListener('click', goToNextSlide);

// Initialize on page load
init();