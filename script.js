// Simple interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Projects dropdown functionality
    const projectsContainer = document.querySelector('.dropdown-container');
    const projectsLink = document.getElementById('projects-link');
    const projectsDropdown = document.getElementById('projects-dropdown');
    let closeTimeout;
    
    // Open dropdown on hover
    projectsContainer.addEventListener('mouseenter', function() {
        clearTimeout(closeTimeout);
        projectsContainer.classList.add('open');
    });
    
    // Delay closing when leaving the container
    projectsContainer.addEventListener('mouseleave', function() {
        closeTimeout = setTimeout(function() {
            projectsContainer.classList.remove('open');
        }, 300); // 300ms delay before closing
    });
    
    // Keep dropdown open when hovering over the dropdown itself
    projectsDropdown.addEventListener('mouseenter', function() {
        clearTimeout(closeTimeout);
        projectsContainer.classList.add('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!projectsContainer.contains(e.target)) {
            projectsContainer.classList.remove('open');
        }
    });

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
