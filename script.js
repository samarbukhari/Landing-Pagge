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
