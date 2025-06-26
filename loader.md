I want you to generate a full animated loading screen using only vanilla JS (with modules) and the following libraries (already installed via npm): 

- three
- gsap
- gsap/ScrollTrigger

🟢 The theme is minimalist and green (#00ff99) with a clean, modern tech campaign vibe. No GLTF models. Just use native Three.js geometry.

Here’s exactly what I want:

1. **Background**: Matrix-style code stream (you can fake this with a full-screen `<canvas>` using raw JS or a prebuilt Matrix rain effect). Dark gray/black background with green rain.

2. **Centerpiece**: 
   - A rotating wireframe decahedron (dodecahedron is fine too).
   - It should pulse slightly (scale or glow) as it rotates.
   - Stroke color should be bright green.

3. **Text Overlay**:
   - “Washington for SRC 2025” centered beneath the 3D object.
   - Underneath that, smaller text: “Loading the Vision…”
   - Fonts should be modern sans-serif (`Orbitron`, `Poppins`, or system default is fine).

4. **Loading Animation**:
   - A green stroke or circular progress ring fills up over 3-4 seconds.
   - Once filled, trigger a GSAP animation to:
     - Fade out the loader.
     - Zoom in the “Washington for SRC 2025” text.
     - Reveal the main site (i.e., simulate a page transition).

5. **GSAP**:
   - Use GSAP for all transitions.
   - Integrate `ScrollTrigger`, but defer its activation until the loader ends (to prep for later sections).

6. **General requirements**:
   - Fully responsive.
   - All in one page: HTML, CSS (or Tailwind utility classes), JS (modules).
   - No React or frameworks.
   - Don’t use any external Three.js models — only built-in geometry.
   - Keep it performance-optimized and clean.
   - Disable scrolling during loader.

Output the complete working code (HTML + JS) in one go. Use proper module imports for `three`, `gsap`, and `ScrollTrigger`. Include helpful code comments.
It should be responsive using tailwind css, which has been imported vua thje css tyesheet already, you can add some custom styles as needed, after the loader runs, it should redirect to a page called main.html, it should run for 5 seconds
Make the 3D object respond subtly to mouse movement. subtle buh noticeable, split into 3 fuiles, html css and js, and dont forget, no cdns except that for custom icons maybe phospher werb for more nice looks, anf also maybe a font to match this vie and kill it