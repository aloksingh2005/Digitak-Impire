document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero CTA Button Animation
    const primaryCta = document.querySelector('.cta-button.primary');
    if (primaryCta) {
        primaryCta.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    icon.style.transform = 'translateX(0)';
                }, 300);
            }
        });

        primaryCta.addEventListener('click', function() {
            // Show a micro-interaction
            this.classList.add('pulse');
            
            // Navigate to services section
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                window.scrollTo({
                    top: servicesSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Remove the pulse class after animation completes
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    }

    // Secondary CTA button handler
    const secondaryCta = document.querySelector('.cta-button.secondary');
    if (secondaryCta) {
        secondaryCta.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Simple validation
            if (nameInput.value && emailInput.value && messageInput.value) {
                // Show success toast
                showToast('Message sent successfully! We\'ll be in touch soon.');
                contactForm.reset();
                
                // Add a success animation to the submit button
                const submitBtn = contactForm.querySelector('.submit-button');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent';
                submitBtn.style.backgroundColor = '#10b981';  // Success green color
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            } else {
                showToast('Please fill in all fields.');
            }
        });
    }

    // Add Active Class to Nav Links on Scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Add Animation on Scroll with Intersection Observer
    const elementsToAnimate = [
        '.hero-text', 
        '.hero-image',
        '.service-card', 
        '.payment-badge',
        '.about-image',
        '.about-text',
        '.contact-form-container'
    ];
    
    const elements = [];
    elementsToAnimate.forEach(selector => {
        const elems = document.querySelectorAll(selector);
        elems.forEach(el => elements.push(el));
    });
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('service-card')) {
                    // Add a staggered delay for service cards
                    const index = Array.from(document.querySelectorAll('.service-card')).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('slide-up');
                    }, index * 100);
                } else {
                    entry.target.classList.add('fade-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate hero elements immediately
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) heroText.classList.add('fade-in');
        
        setTimeout(() => {
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) heroImage.classList.add('fade-in');
        }, 400);
    }, 300);
    
    // Mouse move effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const shapes = document.querySelectorAll('.shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                // Different movement intensity for each shape
                const factor = (index + 1) * 20;
                shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }
    
    // Toast Message Function
    function showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.querySelector('.toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.classList.add('toast');
            document.body.appendChild(toast);
        }
        
        // Set message and show toast
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Add CSS for animations and toast
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: var(--text-color);
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .pulse {
            animation: pulse 0.6s;
        }
        
        .service-card, .payment-badge, .about-image, .about-text, .contact-form-container, .hero-text, .hero-image {
            opacity: 0;
        }
        
        .fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        
        .slide-up {
            animation: slideUp 0.8s ease-out forwards;
        }
        
        @keyframes grow {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
}); 