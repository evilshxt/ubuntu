import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class VisionPage {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometry = null;
        this.material = null;
        this.wireframe = null;
        this.canvas = null;
        this.animationId = null;
        this.isDarkMode = false;
        
        this.init();
    }

    init() {
        // Initialize dark mode
        this.initDarkMode();
        
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
        
        // Initialize Three.js
        this.initThreeJS();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Start animation loop
        this.animate();
    }

    initDarkMode() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
        
        // Apply theme
        this.applyTheme();
        
        // Setup theme toggle buttons
        this.setupThemeToggle();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        
        // Update theme toggle icons
        this.updateThemeIcons();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        
        // Update Three.js material if it exists
        if (this.material) {
            this.updateThreeJSTheme();
        }
    }

    updateThemeIcons() {
        // Desktop icons
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        
        // Mobile icons
        const mobileSunIcon = document.getElementById('mobile-sun-icon');
        const mobileMoonIcon = document.getElementById('mobile-moon-icon');
        
        if (this.isDarkMode) {
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

    initThreeJS() {
        this.canvas = document.getElementById('three-canvas');
        if (!this.canvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.canvas.clientWidth / this.canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create wireframe geometry (decahedron approximation using icosahedron)
        this.geometry = new THREE.IcosahedronGeometry(2, 0);
        
        // Create material
        this.createMaterial();
        
        // Create wireframe mesh
        this.wireframe = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.wireframe);

        // Add subtle ambient lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);

       // Handle window resize
       this.handleResize();
   }

   createMaterial() {
       const color = this.isDarkMode ? 0x10b981 : 0x059669; // Green colors
       this.material = new THREE.MeshBasicMaterial({
           color: color,
           wireframe: true,
           transparent: true,
           opacity: 0.6
       });
   }

   updateThreeJSTheme() {
       const color = this.isDarkMode ? 0x10b981 : 0x059669;
       this.material.color.setHex(color);
   }

   initScrollAnimations() {
       // Hero section animations
       gsap.fromTo('.hero-title', {
           y: 100,
           opacity: 0
       }, {
           y: 0,
           opacity: 1,
           duration: 1,
           ease: 'power2.out'
       });

       // Policy cards stagger animation
       gsap.fromTo('.policy-card', {
           y: 50,
           opacity: 0
       }, {
           y: 0,
           opacity: 1,
           duration: 0.8,
           stagger: 0.1,
           ease: 'power2.out',
           scrollTrigger: {
               trigger: '.policy-grid',
               start: 'top 80%',
               end: 'bottom 20%',
               toggleActions: 'play none none reverse'
           }
       });

       // Wireframe rotation on scroll
       ScrollTrigger.create({
           trigger: 'body',
           start: 'top top',
           end: 'bottom bottom',
           scrub: true,
           onUpdate: (self) => {
               if (this.wireframe) {
                   this.wireframe.rotation.y = self.progress * Math.PI * 2;
                   this.wireframe.rotation.x = self.progress * Math.PI;
               }
           }
       });
   }

   initEventListeners() {
       // Mobile menu toggle
       const mobileMenuButton = document.getElementById('mobile-menu-button');
       const mobileMenu = document.getElementById('mobile-menu');
       const hamburgerIcon = document.getElementById('hamburger-icon');
       const closeIcon = document.getElementById('close-icon');

       if (mobileMenuButton && mobileMenu) {
           mobileMenuButton.addEventListener('click', () => {
               const isHidden = mobileMenu.classList.contains('hidden');
               
               if (isHidden) {
                   mobileMenu.classList.remove('hidden');
                   hamburgerIcon?.classList.add('hidden');
                   closeIcon?.classList.remove('hidden');
               } else {
                   mobileMenu.classList.add('hidden');
                   hamburgerIcon?.classList.remove('hidden');
                   closeIcon?.classList.add('hidden');
               }
           });
       }

       // Smooth scrolling for anchor links
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           anchor.addEventListener('click', function (e) {
               e.preventDefault();
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                   target.scrollIntoView({
                       behavior: 'smooth',
                       block: 'start'
                   });
               }
           });
       });

       // Button interactions
       this.initButtonAnimations();

       // Window resize handler
       window.addEventListener('resize', () => this.handleResize());
   }

   initButtonAnimations() {
       // Add hover animations to buttons
       const buttons = document.querySelectorAll('button, .btn');
       
       buttons.forEach(button => {
           button.addEventListener('mouseenter', () => {
               gsap.to(button, {
                   scale: 1.05,
                   duration: 0.2,
                   ease: 'power2.out'
               });
           });

           button.addEventListener('mouseleave', () => {
               gsap.to(button, {
                   scale: 1,
                   duration: 0.2,
                   ease: 'power2.out'
               });
           });
       });
   }

   handleResize() {
       if (!this.camera || !this.renderer || !this.canvas) return;

       // Update camera aspect ratio
       this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
       this.camera.updateProjectionMatrix();

       // Update renderer size
       this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
       this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   }

   animate() {
       this.animationId = requestAnimationFrame(() => this.animate());

       if (this.wireframe) {
           // Gentle rotation animation
           this.wireframe.rotation.x += 0.005;
           this.wireframe.rotation.y += 0.01;
           
           // Gentle floating animation
           this.wireframe.position.y = Math.sin(Date.now() * 0.001) * 0.2;
       }

       if (this.renderer && this.scene && this.camera) {
           this.renderer.render(this.scene, this.camera);
       }
   }

   destroy() {
       // Clean up Three.js resources
       if (this.animationId) {
           cancelAnimationFrame(this.animationId);
       }

       if (this.geometry) {
           this.geometry.dispose();
       }

       if (this.material) {
           this.material.dispose();
       }

       if (this.renderer) {
           this.renderer.dispose();
       }

       // Clean up GSAP
       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
   }
}

// Initialize the vision page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
   new VisionPage();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
   if (window.visionPage) {
       window.visionPage.destroy();
   }
});