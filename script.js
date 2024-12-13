// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay after content loads
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => loadingOverlay.remove(), 500);
    }, 1000);
});

// Smooth scrolling with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    lastScroll = currentScroll;
});

// Scroll animations for elements
const scrollElements = document.querySelectorAll('.feature-card, .testimonial-card, .cta');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animate', 'active');
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animations
handleScrollAnimation();

// Enhanced feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection.getBoundingClientRect().bottom > 0) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Enhanced CTA button interaction
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.pageX - button.offsetLeft;
        const y = e.pageY - button.offsetTop;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your interest!';
        successMessage.style.position = 'fixed';
        successMessage.style.top = '20px';
        successMessage.style.right = '20px';
        successMessage.style.padding = '15px 25px';
        successMessage.style.background = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.borderRadius = '4px';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateX(100%)';
        successMessage.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(successMessage);
        
        // Show message with animation
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove message after delay
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateX(100%)';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    });
});

// Add intersection observer for testimonials
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    testimonialObserver.observe(card);
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight);
        progressBar.style.transform = `scaleX(${scrolled})`;
    });
};

// Enhanced loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Create and show loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Preload images
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            // All images loaded, remove overlay
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => loadingOverlay.remove(), 500);
                // Initialize other animations
                initializeAnimations();
            }, 500);
        }
    };

    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Handle error cases
        }
    });

    // Create scroll progress indicator
    createScrollProgress();
});

// Initialize all animations
const initializeAnimations = () => {
    // Animate hero section elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    heroContent.style.opacity = '0';
    heroImage.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroImage.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroImage.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
        heroImage.style.transform = 'translateX(0)';
    }, 100);

    // Initialize statistics counter
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Adjust speed here
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        updateCount();
    });
};

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Add active state to navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Enhanced navbar interaction
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let isNavbarVisible = true;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.transform = 'translateY(0)';
        isNavbarVisible = true;
    } else if (currentScroll > lastScroll && isNavbarVisible) {
        // Scrolling down & navbar is visible
        navbar.style.transform = 'translateY(-100%)';
        isNavbarVisible = false;
    } else if (currentScroll < lastScroll && !isNavbarVisible) {
        // Scrolling up & navbar is hidden
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        isNavbarVisible = true;
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuIcon.querySelector('i').classList.toggle('fa-bars');
    mobileMenuIcon.querySelector('i').classList.toggle('fa-times');
});

// Enhanced feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1) rotate(10deg)';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (heroSection.getBoundingClientRect().bottom > 0) {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Enhanced CTA button interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.pageX - button.offsetLeft;
        const y = e.pageY - button.offsetTop;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
        
        // Show success message with enhanced styling
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Thank you for your interest!</span>
        `;
        
        Object.assign(successMessage.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(successMessage);
        
        // Show message with animation
        requestAnimationFrame(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateX(0)';
        });
        
        // Remove message after delay
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateX(100%)';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial-card, .cta, .hero-stats, .section-header').forEach(element => {
    observer.observe(element);
});

// Add smooth reveal animation to floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
    }, 1000 + (index * 200));
});

// Mobile Menu Functionality
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

function toggleMenu() {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuIcon.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuIcon.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

mobileMenuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Hide navbar on scroll down, show on scroll up
function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
        // Scrolling down & menu is closed
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}

// Throttle scroll event
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: targetPosition - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});
