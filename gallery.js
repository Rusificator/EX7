// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const currentPage = document.querySelector('.current-page');
    const totalPages = document.querySelector('.total-pages');
    
    let currentSlide = 0;
    const slidesCount = slides.length;
    
    // Calculate slides per view based on screen width
    function getSlidesPerView() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Calculate total pages
    function calculateTotalPages() {
        const slidesPerView = getSlidesPerView();
        return Math.ceil(slidesCount / slidesPerView);
    }
    
    // Update pager and button states
    function updatePager() {
        const slidesPerView = getSlidesPerView();
        const totalPagesCount = calculateTotalPages();
        const currentPageNum = Math.floor(currentSlide / slidesPerView) + 1;
        
        currentPage.textContent = currentPageNum;
        totalPages.textContent = totalPagesCount;
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= slidesCount - slidesPerView;
    }
    
    // Show current slide
    function showSlide() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentSlide * slideWidth;
        
        gallerySlider.style.transform = `translateX(${translateX}%)`;
        updatePager();
    }
    
    // Next slide
    function nextSlide() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = slidesCount - slidesPerView;
        
        if (currentSlide < maxSlide) {
            currentSlide += slidesPerView;
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
        }
        showSlide();
    }
    
    // Previous slide
    function prevSlide() {
        const slidesPerView = getSlidesPerView();
        
        if (currentSlide > 0) {
            currentSlide -= slidesPerView;
            if (currentSlide < 0) {
                currentSlide = 0;
            }
        }
        showSlide();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const slidesPerView = getSlidesPerView();
            // Adjust current slide if it's out of bounds after resize
            const maxSlide = slidesCount - slidesPerView;
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
            showSlide();
        }, 250);
    });
    
    // Initialize
    updatePager();
    showSlide();
});