import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home             from './pages/Home';
import Products         from './pages/Products';
import Navbar           from './components/layout/Navbar';
import Footer           from './components/layout/Footer';
import CustomCursor     from './components/ui/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

/* ── Scroll-to-top on every route change ───────────────── */
const ScrollReset = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Small timeout ensures the DOM has updated before finding the element
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 10);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

/* ── Inner app — Lenis lives here so it has access to the DOM ── */
const AppContent = () => {
  useEffect(() => {
    /* Lenis: buttery smooth inertia scroll */
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    /* Keep GSAP ScrollTrigger in sync with Lenis scroll position */
    lenis.on('scroll', ScrollTrigger.update);

    /* Drive Lenis via GSAP's ticker for perfect frame alignment */
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Custom cursor — hidden automatically on touch devices via CSS */}
      <CustomCursor />

      <Navbar />

      <main>
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/products"         element={<Products />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollReset />
    <AppContent />
  </BrowserRouter>
);

export default App;
