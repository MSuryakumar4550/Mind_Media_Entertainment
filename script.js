document.addEventListener('DOMContentLoaded', function() {
    
    gsap.registerPlugin(Flip);

// Example usage
const state = Flip.getState(".project-item"); // save current state
// change layout or class
document.querySelector(".projects-grid").classList.toggle("expanded");
Flip.from(state, {
  duration: 0.8,
  ease: "power1.inOut"
});
    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // --- Video Modal ---
    const projectItems = document.querySelectorAll('.project-item');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeModal = document.getElementById('closeModal');

    if (videoModal && videoPlayer && closeModal) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                if (videoId) {
                    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    videoModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const hideModal = () => {
            videoModal.classList.remove('show');
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        };

        closeModal.addEventListener('click', hideModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) hideModal();
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.main-nav a');

    if (sections.length > 0 && allNavLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 85)) {
                    current = section.getAttribute('id');
                }
            });

            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- Reveal elements on scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // --- Testimonial Carousel (Infinite Loop Animation) ---
    const testimonials = document.querySelectorAll('.testimonial');
    const carousel = document.getElementById('testimonial-carousel');
    let currentIndex = 0;
    let isTransitioning = false;

    if (testimonials.length > 0 && carousel) {
        // Clone first and last testimonials for seamless loop
        const firstClone = testimonials[0].cloneNode(true);
        const lastClone = testimonials[testimonials.length - 1].cloneNode(true);
        
        carousel.appendChild(firstClone);
        carousel.insertBefore(lastClone, testimonials[0]);

        // Adjust initial position to account for the cloned last slide
        carousel.style.transform = `translateX(-100%)`;
        currentIndex = 0;

        function showTestimonial(index) {
            isTransitioning = true;
            carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Move to the target slide (offset by 1 due to cloned last slide)
            carousel.style.transform = `translateX(-${(index + 1) * 100}%)`;
            currentIndex = index;
        }

        // Handle seamless loop when reaching clones
        carousel.addEventListener('transitionend', () => {
            isTransitioning = false;
            const total = testimonials.length;

            // If we're at the cloned first slide (after last real slide)
            if (currentIndex >= total) {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(-100%)`;
            }

            // If we're at the cloned last slide (before first real slide)
            if (currentIndex < 0) {
                carousel.style.transition = 'none';
                currentIndex = total - 1;
                carousel.style.transform = `translateX(-${total * 100}%)`;
            }
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            if (!isTransitioning) {
                showTestimonial(currentIndex + 1);
            }
        }, 5000);

        // Initialize first testimonial
        setTimeout(() => {
            showTestimonial(0);
        }, 100);
    }

    
});