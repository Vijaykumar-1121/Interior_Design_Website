# VJ Interiors — Frontend Architecture

VJ Interiors is a high-performance, animation-rich frontend application designed for a luxury interior design studio. The architecture prioritizes a seamless user experience, fluid animations, and a strict, maintainable design system built on modern web standards.

---

## Architecture & Technology Stack

The application is built using a modern React toolchain, emphasizing component isolation, CSS performance, and hardware-accelerated animations.

- **Core Framework**: React 18, utilizing functional components and hooks for state and lifecycle management.
- **Build Tool**: Vite, selected for ultra-fast HMR and optimized production bundling via Rollup.
- **Routing**: React Router DOM for seamless client-side navigation.
- **Styling**: CSS Modules ensuring scoped, collision-free styling, combined with a comprehensive CSS Variables (Custom Properties) design system.
- **Iconography**: Lucide React for consistent, lightweight SVG icons.

### Animation Infrastructure
- **GSAP (GreenSock)**: Drives complex scroll-linked timelines, parallax effects, and staggered DOM reveals.
- **ScrollTrigger**: GSAP plugin used to orchestrate entrance animations based on precise viewport intersections.
- **Framer Motion**: Handles physics-based micro-interactions, spring animations, and layout transitions.
- **Lenis**: Provides custom smooth scrolling mechanics, normalizing scroll behavior across browsers and enabling perfectly synced ScrollTrigger effects.

---

## Project Structure

The repository follows a scalable, feature-based directory structure:

```text
src/
├── components/          # React components organized by page/domain
│   ├── home/            # Modular sections for the landing page
│   ├── layout/          # Global layout wrappers (Navbar, Footer)
│   ├── products/        # Product grid, filtering, and card components
│   └── ui/              # Reusable UI primitives (Buttons, Inputs, Modals)
├── data/                # Static JSON payloads (Product inventory, etc.)
├── pages/               # Top-level route components (Home, Products)
├── styles/              # Global CSS, resets, and design tokens
│   ├── variables.css    # Centralized design system variables
│   └── global.css       # CSS resets and body typography
├── App.jsx              # Application root and route definitions
└── main.jsx             # React DOM entry point
```

---

## Design System

The application relies on a strict design system defined in `src/styles/variables.css`. No hardcoded values (magic numbers) are used in component styles.

- **Typography**: 
  - **Display**: *Cormorant Garamond* for high-contrast, editorial headings.
  - **Body**: *Inter* for highly legible UI and paragraph text.
  - Fluid typography is implemented using CSS `clamp()` functions to ensure perfect scaling from mobile to ultra-wide displays.
- **Color Palette**: Built around a deep charcoal base (`#0a0908`) with warm ivory (`#ede8db`) and brass/gold accents (`#c8a05a`).
- **Spacing & Layout**: A unified spacing scale (`--sp-1` through `--sp-40`) drives all margins, padding, and grid gaps.

---

## Performance & Optimization

- **Asset Delivery**: All heavy imagery is served via high-performance CDNs (e.g., Unsplash) with optimized query parameters (`q=85`, `w=1920`) and native lazy loading.
- **CSS Modularity**: The use of CSS Modules ensures that only the CSS required for the rendered components is injected into the DOM, minimizing render-blocking resources.
- **Animation Performance**: All continuous animations (parallax, transforms, opacity) are strictly bound to hardware-accelerated CSS properties to maintain a locked 60fps experience.

---

## Setup & Deployment

### Local Development

1. Ensure Node.js (v18+) is installed.
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:5173`.

### Production Build

To generate an optimized production bundle:
```bash
npm run build
```
The output will be generated in the `/dist` directory, ready to be served by any static hosting provider.

### Deployment (Vercel / Netlify)

The project requires zero additional configuration for modern PaaS providers. 
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

## Browser Support & Responsiveness

The application is fully responsive and tested across standard viewport breakpoints:
- **Desktop**: 1440px+
- **Laptop**: 1024px – 1439px
- **Tablet**: 768px – 1023px
- **Mobile**: < 768px

Layouts dynamically reflow using CSS Grid, and navigation gracefully degrades to a framer-motion powered drawer menu on touch devices.

---
© VJ Interiors Engineering
