import { gsap } from 'gsap';
import AOS from 'aos';

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Delay GSAP to prevent AOS + GSAP clash
    setTimeout(() => {
        const heroTimeline = gsap.timeline();
        heroTimeline.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }).from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5').from('.floating-badge', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.5').from('.cta-button, .secondary-button', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4');
    }, 100); // Delay to allow AOS to initialize first

    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
            opacity: 1,
            duration: 2,
            delay: index * 0.3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    });

    // Testimonial hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Value cards hover effects
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.value-icon'), {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.value-icon'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Theme toggle support for both desktop and mobile
    const themeToggles = [
        document.getElementById('theme-toggle'),
        document.getElementById('mobile-theme-toggle')
    ];

    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const html = document.documentElement;
                html.classList.toggle('dark');
                localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
                updateThemeIcons();
            });
        }
    });

    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcons();

    function updateThemeIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        const toggleIcons = [
            { sun: 'sun-icon', moon: 'moon-icon' },
            { sun: 'mobile-sun-icon', moon: 'mobile-moon-icon' }
        ];

        toggleIcons.forEach(({ sun, moon }) => {
            document.getElementById(sun)?.classList.toggle('hidden', !isDark);
            document.getElementById(moon)?.classList.toggle('hidden', isDark);
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            const isOpen = menu.classList.toggle('hidden');

            document.getElementById('hamburger-icon')?.classList.toggle('hidden', !isOpen);
            document.getElementById('close-icon')?.classList.toggle('hidden', isOpen);
        });
    }

    // Simple and Reliable Accordion Functionality
    function initializeAccordion() {
        const infoboxSections = document.querySelectorAll('.infobox-section');
        
        infoboxSections.forEach((section, index) => {
            const title = section.querySelector('.infobox-section-title');
            const content = section.querySelector('.infobox-fields');
            const icon = section.querySelector('.accordion-icon');
            
            if (!title || !content || !icon) return;
            
            // Set initial state
            const isMobile = window.innerWidth <= 768;
            const isFirstSection = index === 0;
            
            if (isMobile) {
                // Mobile: first section open, others closed
                if (isFirstSection) {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(-90deg)';
                }
            } else {
                // Desktop: all sections open
                content.style.display = 'block';
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Add smooth animations to the onclick function
            title.addEventListener('click', function(e) {
                // Let the onclick handler work, but add smooth animation
                setTimeout(() => {
                    if (content.style.display === 'block') {
                        gsap.fromTo(content, {
                            height: 0,
                            opacity: 0
                        }, {
                            height: 'auto',
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }, 10);
            });
        });
    }

    // Initialize accordion
    initializeAccordion();
    console.log('Accordion initialized! Total sections:', document.querySelectorAll('.infobox-section').length);
    
    // Re-initialize on window resize to handle mobile/desktop transitions
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('Window resized, reinitializing accordion...');
            initializeAccordion();
        }, 250);
    });
    
    // Also initialize on orientation change for mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            console.log('Orientation changed, reinitializing accordion...');
            initializeAccordion();
        }, 500);
    });

    // Add hover effects for infobox sections
    const infoboxSections = document.querySelectorAll('.infobox-section');
    infoboxSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            gsap.to(section, {
                backgroundColor: 'rgba(34, 197, 94, 0.05)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        section.addEventListener('mouseleave', () => {
            gsap.to(section, {
                backgroundColor: 'transparent',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
});
