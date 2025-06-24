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
});
