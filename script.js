// Simple interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Projects dropdown functionality
    const projectsContainer = document.querySelector('.dropdown-container');
    const projectsLink = document.getElementById('projects-link');
    const projectsText = document.getElementById('projects-text');
    const projectsDropdown = document.getElementById('projects-dropdown');
    let closeTimeout;
    
    // Only set up projects dropdown if elements exist (index page only)
    if (projectsText && projectsContainer && projectsDropdown) {
        // Open dropdown on hover over the Projects text only
        projectsText.addEventListener('mouseenter', function() {
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
    }

    // Writing carousel functionality
    const writingButton = document.getElementById('writing-button');
    const writingCarousel = document.getElementById('writing-carousel');
    const carouselContent = document.querySelector('.carousel-content');
    const prevButton = document.getElementById('prev-writing');
    const nextButton = document.getElementById('next-writing');
    
    // ============================================
    // WRITING POSTS - ADD YOUR POSTS HERE
    // ============================================
    // To add a new post, copy this format and fill it in:
    // {
    //     title: "Your Post Title",
    //     date: "January 15, 2024",  // Optional
    //     excerpt: "Brief description...",  // Optional
    //     link: "https://example.com/post"  // Optional: makes title clickable
    // },
    //
    // Example:
    const writingPosts = [
        // {
        //     title: "My First Blog Post",
        //     date: "January 15, 2024",
        //     excerpt: "This is a brief description of what the post is about...",
        //     link: "https://example.com/post"
        // },
        // Add your posts below (remove the // to activate them):
    ];
    
    let currentPostIndex = 0;
    
    // Only set up writing carousel if elements exist (index page only)
    if (writingButton && writingCarousel && carouselContent) {
        // Function to render current post
        function renderPost() {
            if (writingPosts.length === 0) {
                carouselContent.innerHTML = `
                    <div class="carousel-item">
                        <div class="carousel-header">
                            <button class="carousel-nav" id="prev-writing" style="visibility: hidden;">←</button>
                            <div class="carousel-text">
                                <h3>No writing posts yet</h3>
                                <p>Add posts in script.js</p>
                            </div>
                            <button class="carousel-nav" id="next-writing" style="visibility: hidden;">→</button>
                        </div>
                    </div>
                `;
                return;
            }
            
            const post = writingPosts[currentPostIndex];
            const postHTML = post.link 
                ? `<a href="${post.link}" target="_blank" style="text-decoration: none; color: inherit;">${post.title}</a>`
                : post.title;
            
            carouselContent.innerHTML = `
                <div class="carousel-item">
                    <div class="carousel-header">
                        <button class="carousel-nav" id="prev-writing">←</button>
                        <div class="carousel-text">
                            <h3>${postHTML}</h3>
                            ${post.date ? `<p>${post.date}</p>` : ''}
                            ${post.excerpt ? `<p style="margin-top: 0.5rem; font-size: 0.9rem;">${post.excerpt}</p>` : ''}
                        </div>
                        <button class="carousel-nav" id="next-writing">→</button>
                    </div>
                </div>
            `;
            
            // Re-attach event listeners
            document.getElementById('prev-writing').addEventListener('click', showPreviousPost);
            document.getElementById('next-writing').addEventListener('click', showNextPost);
        }
        
        // Navigation functions
        function showNextPost() {
            if (writingPosts.length === 0) return;
            currentPostIndex = (currentPostIndex + 1) % writingPosts.length;
            renderPost();
        }
        
        function showPreviousPost() {
            if (writingPosts.length === 0) return;
            currentPostIndex = (currentPostIndex - 1 + writingPosts.length) % writingPosts.length;
            renderPost();
        }
        
        // Toggle carousel
        writingButton.addEventListener('click', function() {
            writingCarousel.classList.toggle('open');
        });
        
        // Initialize carousel
        renderPost();
    }

    // ============================================
    // INVENTIONS - ADD YOUR INVENTIONS HERE
    // ============================================
    // To add a new invention, copy this format and fill it in:
    // {
    //     title: "Invention Name",
    //     description: "Detailed description of the invention and the problem it solves...",
    //     date: "January 15, 2024",  // Optional
    //     category: "Technology",  // Optional
    //     image: "images/invention-photo.jpg"  // Optional: path to image file (appears at bottom of post)
    // },
    //
    // Example:
    const inventions = [
         {
            title: "Roof Sprinkler",
             description: "A kit of mostly available and modified smaller inventions that can deliver water spraying from your roof, to the entire perimeter of your house, keeping all the natural fuel that surrounds your house, when fire is on its way to your house. ",
             date: "First thought of this Jan of 25, when the fires were ripping through CA. Still thinking about it now, in December of 25.",
            category: "Home Protection",
            image: "images/roof-sprinkler.jpg"  // Add your image file path here
        },
    
    ];

    // Render inventions on inventions page
    function renderInventions() {
        const inventionsList = document.querySelector('.inventions-list');
        if (!inventionsList) return; // Only run on inventions page
        
        if (inventions.length === 0) {
            inventionsList.innerHTML = `
                <div class="no-inventions">
                    <p>No inventions yet</p>
                </div>
            `;
            return;
        }
        
        inventionsList.innerHTML = inventions.map(invention => `
            <div class="invention-item">
                <h2 class="invention-title">${invention.title}</h2>
                ${invention.category ? `<span class="invention-category">${invention.category}</span>` : ''}
                ${invention.date ? `<p class="invention-date">${invention.date}</p>` : ''}
                <p class="invention-description">${invention.description}</p>
                ${invention.image ? `<img src="${invention.image}" alt="${invention.title}" class="invention-image">` : ''}
            </div>
        `).join('');
    }
    
    // Initialize inventions
    renderInventions();

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
