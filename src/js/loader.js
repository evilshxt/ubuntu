// Import required libraries (assuming they're installed via npm)
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.12.2';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap@3.12.2/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

class LoadingScreen {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.decahedron = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        
        this.loadingProgress = 0;
        this.isLoading = true;
        
        this.init();
    }
    
    init() {
        // Disable scrolling during loading
        document.body.style.overflow = 'hidden';
        
        // Initialize Matrix background
        this.initMatrixRain();
        
        // Initialize Three.js scene
        this.initThreeJS();
        
        // Initialize mouse tracking
        this.initMouseTracking();
        
        // Start loading animation
        this.startLoadingAnimation();
        
        // Start render loop
        this.animate();
    }
    
    initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Matrix rain characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        const charArray = chars.split('');
        
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const drawMatrix = () => {
            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = '#00ff99';
            ctx.font = `${fontSize}px 'Orbitron', monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                ctx.fillText(text, x, y);
                
                // Reset drop when it reaches bottom
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        };
        
        // Matrix animation interval
        setInterval(drawMatrix, 35);
    }
    
    initThreeJS() {
        const canvas = document.getElementById('three-canvas');
        
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Create wireframe decahedron (dodecahedron)
        const geometry = new THREE.DodecahedronGeometry(1.5, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff99,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.decahedron = new THREE.Mesh(geometry, material);
        this.scene.add(this.decahedron);
        
        // Add subtle ambient light
        const ambientLight = new THREE.AmbientLight(0x00ff99, 0.3);
        this.scene.add(ambientLight);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    initMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            // Normalize mouse position to -1 to 1 range
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // Calculate target rotations based on mouse position
            this.targetRotationX = this.mouseY * 0.2;
            this.targetRotationY = this.mouseX * 0.2;
        });
    }
    
    startLoadingAnimation() {
        const progressRing = document.getElementById('progress-ring');
        const progressText = document.getElementById('progress-text');
        const circumference = 2 * Math.PI * 40; // radius = 40
        
        // Set initial state
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = circumference;
        
        // Animate progress over 5 seconds
        const duration = 5000; // 5 seconds
        const startTime = Date.now();
        
        const updateProgress = () => {
            if (!this.isLoading) return;
            
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Update progress ring
            const offset = circumference - (progress * circumference);
            progressRing.style.strokeDashoffset = offset;
            
            // Update percentage text
            const percentage = Math.floor(progress * 100);
            progressText.textContent = `${percentage}%`;
            
            // Update internal progress
            this.loadingProgress = progress;
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                this.completeLoading();
            }
        };
        
        updateProgress();
    }
    
    completeLoading() {
        this.isLoading = false;
        
        // GSAP timeline for completion animation
        const tl = gsap.timeline();
        
        // Pulse the decahedron
        tl.to(this.decahedron.scale, {
            duration: 0.3,
            x: 1.3,
            y: 1.3,
            z: 1.3,
            ease: "power2.out"
        })
        .to(this.decahedron.scale, {
            duration: 0.3,
            x: 1,
            y: 1,
            z: 1,
            ease: "power2.out"
        })
        
        // Fade out loader elements
        .to('#progress-ring, #progress-text, #subtitle, .ph', {
            duration: 0.5,
            opacity: 0,
            y: -20,
            ease: "power2.inOut"
        }, "-=0.2")
        
        // Scale up and glow the main title
        .to('#main-title', {
            duration: 1,
            scale: 1.2,
            textShadow: '0 0 20px #00ff99, 0 0 40px #00ff99',
            ease: "power2.out"
        })
        
        // Zoom the decahedron and fade everything out
        .to(this.decahedron.scale, {
            duration: 1.5,
            x: 3,
            y: 3,
            z: 3,
            ease: "power2.inOut"
        }, "-=0.5")
        .to(this.decahedron.material, {
            duration: 1,
            opacity: 0,
            ease: "power2.inOut"
        }, "-=1")
        .to('#main-title', {
            duration: 1,
            opacity: 0,
            scale: 2,
            ease: "power2.inOut"
        }, "-=0.8")
        .to('#loader', {
            duration: 0.8,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
                // Redirect to main.html or show main content
                this.redirectToMain();
            }
        });
    }
    
    redirectToMain() {
        // Enable scrolling
        document.body.style.overflow = '';
        
        // Redirect to main.html after a brief delay for smooth transition
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 200);
    }
    
    animate() {
        if (!this.isLoading && this.decahedron.material.opacity <= 0) {
            return; // Stop animation when loading is complete
        }
        
        requestAnimationFrame(() => this.animate());
        
        if (this.decahedron) {
            // Smooth mouse following
            this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
            this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;
            
            // Auto rotation
            this.decahedron.rotation.x += 0.005 + this.currentRotationX;
            this.decahedron.rotation.y += 0.01 + this.currentRotationY;
            
            // Subtle pulsing effect
            const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 1;
            this.decahedron.scale.setScalar(pulse);
            
            // Update material opacity for glow effect
            if (this.isLoading) {
                const glowIntensity = Math.sin(Date.now() * 0.005) * 0.2 + 0.8;
                this.decahedron.material.opacity = glowIntensity;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize loading screen when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

// Additional GSAP animations for enhanced experience
gsap.set("#main-title", { y: 30, opacity: 0 });
gsap.set("#subtitle", { y: 20, opacity: 0 });
gsap.set(".ph", { scale: 0, opacity: 0 });

// Animate in the initial elements
gsap.timeline()
    .to("#main-title", {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        delay: 0.5
    })
    .to("#subtitle", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out"
    }, "-=0.3")
    .to(".ph", {
        duration: 0.5,
        scale: 1,
        opacity: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.2");