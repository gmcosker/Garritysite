// Simple interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Writing carousel toggle
    const writingButton = document.getElementById('writing-button');
    const writingCarousel = document.getElementById('writing-carousel');
    
    writingButton.addEventListener('click', function() {
        writingCarousel.classList.toggle('open');
    });

    // Smooth page transitions
    const container = document.querySelector('.container');
    container.classList.add('page-transition');
    
    setTimeout(() => {
        container.classList.add('loaded');
    }, 100);

    // Add some subtle animations
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});
