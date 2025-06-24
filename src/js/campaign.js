// Campaign Page JavaScript
import * as THREE from 'three';
import AOS from 'aos';

class CampaignPage {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.animationId = null;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.initThemeToggle();
        this.initAOS();
        this.initThreeJSBackground();
        this.initGalleryFilters();
        this.initLightbox();
        this.initMobileMenu();
        this.initScrollEffects();
        this.initParallax();
    }

    // Theme Toggle Functionality
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

        // Get theme from localStorage or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme on page load
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
            this.updateThemeIcons(true);
        } else {
            document.documentElement.classList.remove('dark');
            this.updateThemeIcons(false);
        }

        // Theme toggle handlers
        const toggleTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                this.updateThemeIcons(false);
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                this.updateThemeIcons(true);
            }
        };

        themeToggle?.addEventListener('click', toggleTheme);
        mobileThemeToggle?.addEventListener('click', toggleTheme);
    }

    updateThemeIcons(isDark) {
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        const mobileSunIcon = document.getElementById('mobile-sun-icon');
        const mobileMoonIcon = document.getElementById('mobile-moon-icon');

        if (isDark) {
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
            mobileSunIcon?.classList.remove('hidden');
            mobileMoonIcon?.classList.add('hidden');
        } else {
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
            mobileSunIcon?.classList.add('hidden');
            mobileMoonIcon?.classList.remove('hidden');
        }
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Three.js Background Animation
    initThreeJSBackground() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particle system
        this.createParticleSystem();

        // Camera position
        this.camera.position.z = 5;

        // Start animation
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticleSystem() {
        const particleCount = 150;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Green color variations
            colors[i * 3] = 0.1 + Math.random() * 0.3; // Red
            colors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // Green
            colors[i * 3 + 2] = 0.2 + Math.random() * 0.3; // Blue
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Gallery Filter System
    initGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterGallery(filter, filterButtons, galleryItems);
            });
        });
    }

    filterGallery(filter, filterButtons, galleryItems) {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Filter items with animation
        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                // Show item
                setTimeout(() => {
                    item.classList.remove('filtered-out');
                    item.style.display = 'block';
                }, index * 50);
            } else {
                // Hide item
                item.classList.add('filtered-out');
                setTimeout(() => {
                    if (item.classList.contains('filtered-out')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });

        this.currentFilter = filter;
    }

    // Lightbox Modal System
    initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxContent = document.getElementById('lightbox-content');
        const closeLightbox = document.getElementById('close-lightbox');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item, lightboxModal, lightboxContent);
            });
        });

        // Close lightbox
        closeLightbox?.addEventListener('click', () => {
            this.closeLightbox(lightboxModal);
        });

        // Close on backdrop click
        lightboxModal?.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                this.closeLightbox(lightboxModal);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
                this.closeLightbox(lightboxModal);
            }
        });
    }

    openLightbox(item, modal, content) {
        const title = item.querySelector('h3')?.textContent || 'Gallery Item';
        const category = item.getAttribute('data-category');
        const img = item.querySelector('img');
        const iconElement = item.querySelector('i');

        // Create lightbox content
        let lightboxHTML = '';
        
        if (img) {
            // If there's an actual image
            lightboxHTML = `
                <div class="p-6">
                    <img src="${img.src}" alt="${title}" class="w-full h-auto max-h-[70vh] object-contain rounded-lg">
                    <div class="mt-6">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${title}</h2>
                        <p class="text-gray-600 dark:text-gray-400 capitalize">Category: ${category}</p>
                    </div>
                </div>
            `;
        } else {
            // Placeholder content with enhanced styling
            const iconClass = iconElement?.className || 'ph ph-image';
            lightboxHTML = `
                <div class="p-8 text-center">
                    <div class="mb-6">
                        <i class="${iconClass} text-8xl text-green-600 dark:text-green-400 mb-4"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">${title}</h2>
                    <p class="text-gray-600 dark:text-gray-400 capitalize mb-6">Category: ${category}</p>
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <p class="text-gray-700 dark:text-gray-300">
                            This is a placeholder for campaign materials. 
                            Actual images and content will be added as the campaign progresses.
                        </p>
                    </div>
                </div>
            `;
        }

        content.innerHTML = lightboxHTML;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    // Mobile Menu Toggle
    initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');

        mobileMenuButton?.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    // Scroll Effects
    initScrollEffects() {
        let lastScrollY = window.scrollY;
        const nav = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide/show navigation based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav?.classList.add('-translate-y-full');
            } else {
                nav?.classList.remove('-translate-y-full');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Parallax Effect
    initParallax() {
        const heroSection = document.querySelector('section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSection) {
                heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }

    // Search/Filter functionality
    initSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search gallery...';
        searchInput.className = 'w-full max-w-md mx-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
        
        const filterContainer = document.querySelector('.flex.flex-wrap.justify-center');
        if (filterContainer) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'w-full flex justify-center mb-6';
            searchContainer.appendChild(searchInput);
            filterContainer.parentNode.insertBefore(searchContainer, filterContainer);
        }

        searchInput.addEventListener('input', (e) => {
            this.searchGallery(e.target.value);
        });
    }

    searchGallery(searchTerm) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const category = item.getAttribute('data-category').toLowerCase();
            const shouldShow = title.includes(searchTerm.toLowerCase()) || 
                             category.includes(searchTerm.toLowerCase()) ||
                             searchTerm === '';

            if (shouldShow && (this.currentFilter === 'all' || item.getAttribute('data-category') === this.currentFilter)) {
                item.style.display = 'block';
                item.classList.remove('filtered-out');
            } else {
                item.style.display = 'none';
                item.classList.add('filtered-out');
            }
        });
    }

    // Cleanup method
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        window.removeEventListener('resize', this.onWindowResize);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const campaignPage = new CampaignPage();
    
    // Expose to global scope for debugging
    window.campaignPage = campaignPage;
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.campaignPage) {
        // Pause animations when page is hidden
        if (window.campaignPage.animationId) {
            cancelAnimationFrame(window.campaignPage.animationId);
        }
    } else if (window.campaignPage) {
        // Resume animations when page is visible
        window.campaignPage.animate();
    }
});