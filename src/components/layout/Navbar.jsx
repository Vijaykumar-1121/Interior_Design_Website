import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import clsx from 'clsx';
import Button from '../ui/Button';
import ConsultationForm from '../ui/ConsultationForm';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About Us', path: '/#about' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/#services' },
  { label: 'Contact',  path: '/#footer' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const headerRef = useRef(null);
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Listen for custom event to open form from anywhere
    const handleOpenForm = () => setFormOpen(true);
    window.addEventListener('openConsultationForm', handleOpenForm);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('openConsultationForm', handleOpenForm);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.25 }
    );
  }, []);

  const onHero = isHome && !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(styles.header, scrolled && styles.scrolled)}
        style={{ opacity: 0 }}
      >
        <div className={clsx('container', styles.inner)}>
          {/* Logo */}
          <Link to="/" className={clsx(styles.logo, onHero && styles.onHero)}>
            <div className={styles.logoWrap}>
              <img src="/images/logo1.png" alt="VJ Interiors" className={styles.logoImg} />
              <div className={styles.logoTextGroup}>
                <span className={styles.logoText}>
                  VJ<span className={styles.logoDot}>.</span>Interiors
                </span>
                <span className={styles.logoTagline}>మీ కలల ఇల్లు మా బాధ్యత!</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Main">
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, path }) => {
                const active = location.pathname === path;
                return (
                  <li key={label}>
                    <Link
                      to={path}
                      className={clsx(
                        styles.navLink,
                        onHero && styles.onHero,
                        active && styles.active
                      )}
                    >
                      {label}
                      <span className={styles.underline} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Desktop CTA */}
            <Button 
              variant="outlineGold" 
              className={styles.desktopCta}
              onClick={() => setFormOpen(true)}
            >
              Book Consultation
            </Button>
          </nav>

          {/* Hamburger */}
          <button
            className={clsx(styles.hamburger, onHero && styles.onHero)}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  ><X size={20} /></motion.span>
                : <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  ><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)'   }}
            exit={{ clipPath:   'inset(0 0 100% 0)'  }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className={styles.mobileNavList}>
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link to={path} className={styles.mobileNavLink}>
                      <span className={styles.mobileNum}>0{i + 1}</span>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Form Modal */}
      <ConsultationForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default Navbar;
