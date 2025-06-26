I'm building a vision page for a campaign website called "Washington for SRC 2025".

⚠️ I already have a personal HTML boilerplate used across all pages that includes:
- A custom Tailwind setup via `@import './assets.css'`
- Three custom fonts (`LogoFont`, `Stylish1`, `Stylish2`)
- A responsive navbar and footer
- No CDN usage (only npm libraries or fonts I already included)
- A stripped-down JS boilerplate (no theme toggle or extra logic yet)

📦 The following npm libraries are already installed and available:
- `three`
- `gsap` with ScrollTrigger
- `aos`
- `typed.js`
- `phosphor-icons` for icons

---

🔧 I want you to generate **three separate files** to build the `vision.html` page:

1. `vision.html`
   - Do NOT include head, navbar, or footer — those are already in my boilerplate.
   - Generate only the `<main>` content section.
   - Use semantic HTML5 and Tailwind classes.
   - Section structure should include:
     - Hero/banner with a heading and slogan
     - Mission & Vision blocks with icons
     - Key Policy Focus Areas (6 cards with icons and blurbs)
     - Smooth layout and good spacing
     - Optional bottom quote or CTA

2. `vision.css`
   - Only include styles not handled by Tailwind
   - Assume Tailwind and fonts are already imported via `assets.css`
   - Add optional tweaks like `canvas`, transitions, etc.

3. `vision.js`
   - Reimplement dark/light theme toggle using localStorage
   - Use `AOS` for scroll animations
   - Use `Three.js` to create a subtle rotating shape in the hero background (like a wireframe decahedron)
   - Add fluid/responsive Three.js behavior
   - Add support for mobile resizing

---

🎯 Design Goals:
- Green-accented campaign theme (use `#00ff99` as primary)
- Use icons extensively with Phosphor icon classes
- Typography: Use `LogoFont` for big titles, `Stylish1` and `Stylish2` for variation
- Fluid text scaling, padding, and spacing using Tailwind best practices
- Dark mode support with a toggle (Moon/Sun) that persists via localStorage
- Ensure animations are smooth and refined with GSAP/AOS where needed

Please output clean and maintainable code, organized into the three files (`vision.html`, `vision.css`, and `vision.js`). Assume I'm going to drop them into my existing boilerplate structure.
