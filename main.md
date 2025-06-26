<!-- Video Section -->
<div class="video-container">
  <video controls poster="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/w_1280,h_720,c_fill/YOUR_PUBLIC_ID.jpg">
    <source src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/f_auto/YOUR_PUBLIC_ID.mp4" type="video/mp4">
    <source src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/f_auto/YOUR_PUBLIC_ID.webm" type="video/webm">
    Your browser does not support HTML5 video.
  </video>
</div>

/* Import custom assets */
@import './assets.css';

/* Root Variables */
:root {
  --primary-green: #10b981;
  --primary-emerald: #059669;
  --dark-green: #065f46;
  --light-green: #d1fae5;
  --accent-green: #34d399;
  
  --text-primary-light: #111827;
  --text-secondary-light: #6b7280;
  --text-muted-light: #9ca3af;
  
  --text-primary-dark: #f9fafb;
  --text-secondary-dark: #d1d5db;
  --text-muted-dark: #9ca3af;
  
  --bg-primary-light: #ffffff;
  --bg-secondary-light: #f9fafb;
  --bg-tertiary-light: #f3f4f6;
  
  --bg-primary-dark: #111827;
  --bg-secondary-dark: #1f2937;
  --bg-tertiary-dark: #374151;
  
  --border-light: #e5e7eb;
  --border-dark: #4b5563;
  
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-dark: rgba(0, 0, 0, 0.3);
  
  --gradient-primary: linear-gradient(135deg, var(--primary-green), var(--primary-emerald));
  --gradient-secondary: linear-gradient(135deg, var(--accent-green), var(--primary-green));
  --gradient-hero: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
}

/* Dark mode variables */
html.dark {
  --text-primary: var(--text-primary-dark);
  --text-secondary: var(--text-secondary-dark);
  --text-muted: var(--text-muted-dark);
  --bg-primary: var(--bg-primary-dark);
  --bg-secondary: var(--bg-secondary-dark);
  --bg-tertiary: var(--bg-tertiary-dark);
  --border-color: var(--border-dark);
  --shadow-color: var(--shadow-dark);
}

/* Light mode variables */
html:not(.dark) {
  --text-primary: var(--text-primary-light);
  --text-secondary: var(--text-secondary-light);
  --text-muted: var(--text-muted-light);
  --bg-primary: var(--bg-primary-light);
  --bg-secondary: var(--bg-secondary-light);
  --bg-tertiary: var(--bg-tertiary-light);
  --border-color: var(--border-light);
  --shadow-color: var(--shadow-light);
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all 0.3s ease;
  overflow-x: hidden;
}

/* Fluid Typography with Minimum Sizes */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem); /* Min: 2rem, Preferred: 5vw, Max: 3.5rem */
}

h2 {
  font-size: clamp(1.75rem, 4vw, 3rem);
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
}

h4 {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
}

p, li, a {
  font-size: clamp(1rem, 2vw, 1.1rem); /* Minimum 1rem ensures readability */
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

/* Layout Sections */
section {
  padding: 3rem 1rem;
}

@media (min-width: 768px) {
  section {
    padding: 4rem 1.5rem;
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Theme Toggle */
#theme-toggle {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow-color);
}

#theme-toggle:hover {
  transform: scale(1.1);
}

#theme-toggle i {
  font-size: 1.5rem;
}

/* Hero Section */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

#hero h1 {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

#hero .cta-button {
  margin-top: 2rem;
}

/* About Section */
#about .grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 1024px) {
  #about .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Quick Access Cards */
#quick-access {
  background: var(--bg-secondary);
}

#quick-access .grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.quick-card {
  transition: transform 0.3s ease;
}

.quick-card:hover {
  transform: translateY(-5px);
}

/* Features Section */
#features .grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.feature-card {
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-color);
}

/* Gallery Section */
#gallery-preview {
  background: var(--bg-secondary);
}

.gallery-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
}

.gallery-item {
  flex: 0 0 280px;
  height: 200px;
  scroll-snap-align: start;
}

/* Video Section */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 25px var(--shadow-color);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Testimonials Section */
#testimonials {
  background: var(--bg-secondary);
}

#testimonials .grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.testimonial-card {
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: 1rem;
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* Messaging Section - Completely Refactored */
#messaging {
  padding: 3rem 1rem;
}

.chat-container {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 5px 20px var(--shadow-color);
}

.chat-header {
  padding: 1rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
}

#messages-container {
  height: 400px;
  padding: 1rem;
  overflow-y: auto;
  background: var(--bg-secondary);
}

.message-item {
  margin-bottom: 0.75rem;
  animation: messageIn 0.2s ease-out forwards;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
  font-size: 1rem;
  line-height: 1.4;
}

.message-own {
  background: var(--gradient-primary);
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 0.25rem;
}

.message-other {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  margin-right: auto;
  border-bottom-left-radius: 0.25rem;
}

.message-info {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0.25rem 0.5rem;
}

.message-input-container {
  display: flex;
  padding: 1rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

#message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  margin-right: 0.75rem;
  font-size: 1rem;
}

#send-message {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

#send-message:hover {
  transform: scale(1.05);
}

/* Username Setup */
#username-setup {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 1rem;
  text-align: center;
}

#username-input {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
}

/* Footer */
footer {
  background: var(--bg-primary-dark);
  color: white;
  padding: 3rem 1rem;
}

footer .grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  footer .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary-dark);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-green);
  transform: translateY(-3px);
}

/* Animations */
@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  section {
    padding: 2rem 1rem;
  }
  
  #messages-container {
    height: 300px;
  }
  
  .message-bubble {
    max-width: 90%;
    padding: 0.6rem 0.9rem;
  }
  
  .feature-card, .testimonial-card {
    padding: 1.5rem;
  }
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.hidden {
  display: none;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px var(--shadow-color);
}

/* Custom Font Classes */
.logo-font {
  font-family: 'LogoFont', 'Orbitron', sans-serif;
  font-weight: 700;
}

.stylish-font {
  font-family: 'Stylish1', 'Inter', sans-serif;
  font-style: italic;
}