// Import necessary libraries (these would be from your npm installations)
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import Typed from 'typed.js';

// Import Firebase configuration from your local keys.js file
import { firebaseConfig } from './keys.js';

// Firebase imports (assuming you have these from npm)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'firebase/database';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Global variables
let scene, camera, renderer, particles;
let isDarkMode = false;
let currentUsername = '';
let typedInstance;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTheme();
    initializeAnimations();
    initializeThreeJS();
    initializeTypedJS();
    initializeScrollAnimations();
    initializeMessaging();
    initializeEventListeners();
    
    console.log('Campaign website initialized successfully!');
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }
    });
}

function toggleTheme() {
    if (isDarkMode) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    isDarkMode = true;
    
    // Animate theme toggle button
    gsap.to('#theme-toggle', {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function enableLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    isDarkMode = false;
    
    // Animate theme toggle button
    gsap.to('#theme-toggle', {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
}

// Initialize AOS (Animate On Scroll)
function initializeAnimations() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100,
    });
}

// Three.js Background Animation
function initializeThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    createParticleSystem();
    
    // Camera position
    camera.position.z = 5;
    
    // Animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticleSystem() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Green color variations
    const greenColors = [
        new THREE.Color(0x00ff99),
        new THREE.Color(0x10b981),
        new THREE.Color(0x059669),
        new THREE.Color(0x065f46)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random positions
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
        
        // Random green colors
        const color = greenColors[Math.floor(Math.random() * greenColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        // Gentle floating motion
        const time = Date.now() * 0.001;
        particles.position.y = Math.sin(time) * 0.1;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Typed.js Animation
function initializeTypedJS() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    typedInstance = new Typed('#typed-text', {
        strings: ['Prepared', 'Proven', 'Progressive'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
    });
}

// GSAP ScrollTrigger Animations
function initializeScrollAnimations() {
    // Hero section parallax
    gsap.to('#hero', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Feature cards stagger animation
    gsap.fromTo('.feature-card', 
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#features',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Gallery items horizontal scroll
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                x: 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: '#gallery-preview',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Testimonial cards animation
    gsap.fromTo('.testimonial-card',
        {
            scale: 0.8,
            opacity: 0,
            y: 50
        },
        {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#testimonials',
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Section titles animation
    gsap.utils.toArray('section h2').forEach(title => {
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Messaging System
function initializeMessaging() {
    // Check if user has a saved username
    const savedUsername = localStorage.getItem('campaignUsername');
    if (savedUsername) {
        currentUsername = savedUsername;
        showChatInterface();
        loadMessages();
    } else {
        showUsernameSetup();
    }
    
    // Set username event
    document.getElementById('set-username')?.addEventListener('click', setUsername);
    
    // Send message events
    document.getElementById('send-message')?.addEventListener('click', sendMessage);
    document.getElementById('message-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function showUsernameSetup() {
    const setupDiv = document.getElementById('username-setup');
    const chatDiv = document.getElementById('chat-interface');
    
    if (setupDiv) setupDiv.classList.remove('hidden');
    if (chatDiv) chatDiv.classList.add('hidden');
}

function showChatInterface() {
    const setupDiv = document.getElementById('username-setup');
    const chatDiv = document.getElementById('chat-interface');
    
    if (setupDiv) setupDiv.classList.add('hidden');
    if (chatDiv) chatDiv.classList.remove('hidden');
}

function setUsername() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput?.value.trim();
    
    if (username && username.length >= 2) {
        currentUsername = username;
        localStorage.setItem('campaignUsername', username);
        showChatInterface();
        loadMessages();
        
        // Animate transition
        gsap.to('#username-setup', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                showChatInterface();
                gsap.fromTo('#chat-interface', 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
            }
        });
    } else {
        alert('Please enter a username with at least 2 characters.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput?.value.trim();
    
    if (message && currentUsername) {
        const messageData = {
            username: currentUsername,
            message: message,
            timestamp: serverTimestamp()
        };
        
        // Send to Firebase
        const messagesRef = ref(database, 'messages');
        push(messagesRef, messageData)
            .then(() => {
                messageInput.value = '';
                // Scroll to bottom
                scrollToBottom();
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
            });
    }
}

function loadMessages() {
    const messagesRef = ref(database, 'messages');
    
    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        displayMessages(messages);
    }, (error) => {
        console.error('Error loading messages:', error);
    });
}

function displayMessages(messages) {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (messages) {
        const messageArray = Object.entries(messages).map(([key, value]) => ({
            id: key,
            ...value
        }));
        
        // Sort by timestamp
        messageArray.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
                return a.timestamp - b.timestamp;
            }
            return 0;
        });
        
        messageArray.forEach(message => {
            createMessageElement(message);
        });
        
        scrollToBottom();
    }
}

function createMessageElement(message) {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-item';
    
    const isOwn = message.username === currentUsername;
    
    const bubbleClass = isOwn ? 'message-bubble message-own' : 'message-bubble message-other';
    const alignClass = isOwn ? 'flex justify-end' : 'flex justify-start';
    
    // Format timestamp
    let timeString = '';
    if (message.timestamp) {
        const date = new Date(message.timestamp);
        timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    messageDiv.innerHTML = `
        <div class="${alignClass}">
            <div class="max-w-xs lg:max-w-md">
                ${!isOwn ? `<div class="message-info">${message.username} • ${timeString}</div>` : ''}
                <div class="${bubbleClass}">
                    ${message.message}
                </div>
                ${isOwn ? `<div class="message-info text-right">${timeString}</div>` : ''}
            </div>
        </div>
    `;
    
    container.appendChild(messageDiv);
    
    // Animate message appearance
    gsap.fromTo(messageDiv, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
}

function scrollToBottom() {
    const container = document.getElementById('messages-container');
    if (container) {
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header if any
        
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: offsetTop, autoKill: false },
            ease: 'power2.out'
        });
    }
}

// Additional Event Listeners
function initializeEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target.id);
            }
        });
    });
    
    // CTA button animations
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Quick access cards hover effects
    document.querySelectorAll('.quick-card').forEach(card => {
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
    
    // Feature cards hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Gallery items hover effects
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Social links hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.2,
                rotation: 360,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('#video .relative');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // Animate click feedback
            gsap.to(videoPlaceholder, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
            
            // Here you would normally load and play the actual video
            console.log('Video placeholder clicked - implement video loading here');
        });
    }
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        // ESC key closes modals or resets states
        if (e.key === 'Escape') {
            // Handle any open modals or overlays
            console.log('Escape key pressed');
        }
        
        // Tab navigation enhancements
        if (e.key === 'Tab') {
            // Add visual focus indicators
            document.body.classList.add('using-keyboard');
        }
    });
    
    // Mouse usage detection
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Intersection Observer for scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger custom animations for specific elements
                if (entry.target.classList.contains('animate-counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Performance optimization - pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause heavy animations
            if (typedInstance) {
                typedInstance.stop();
            }
        } else {
            // Resume animations
            if (typedInstance) {
                typedInstance.start();
            }
        }
    });
}

// Helper function for counter animations
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target') || '0');
    const duration = parseInt(element.getAttribute('data-duration') || '2000');
    
    gsap.to({ value: 0 }, {
        value: target,
        duration: duration / 1000,
        ease: 'power2.out',
        onUpdate: function() {
            element.textContent = Math.round(this.targets()[0].value);
        }
    });
}

// Error handling for Firebase and other external services
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    
    // Handle specific errors gracefully
    if (e.error && e.error.message.includes('Firebase')) {
        console.warn('Firebase error detected - messaging may be unavailable');
        // Show fallback UI or message
        const chatInterface = document.getElementById('chat-interface');
        if (chatInterface) {
            chatInterface.innerHTML = `
                <div class="text-center p-8 text-gray-500">
                    <i class="ph ph-warning-circle text-4xl mb-4"></i>
                    <p>Chat is temporarily unavailable. Please try again later.</p>
                </div>
            `;
        }
    }
});

// Cleanup function for when page is unloaded
window.addEventListener('beforeunload', () => {
    // Clean up Three.js resources
    if (renderer) {
        renderer.dispose();
    }
    
    if (scene) {
        scene.clear();
    }
    
    // Clean up GSAP animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Clean up Typed.js
    if (typedInstance) {
        typedInstance.destroy();
    }
    
    console.log('Campaign website cleanup completed');
});

// Export functions for testing or external use
export {
    scrollToSection,
    toggleTheme,
    sendMessage,
    initializeTheme,
    initializeAnimations
};