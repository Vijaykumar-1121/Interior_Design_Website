import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProductGrid from '../components/products/ProductGrid';
import styles from './Products.module.css';

/**
 * Products page — richer hero with background image, full product grid below.
 */
const Products = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    /* Hero text entrance stagger */
    gsap.fromTo(
      Array.from(heroRef.current.children),
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95, stagger: 0.08, ease: 'expo.out', delay: 0.15 }
    );
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Hero with background image ────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="/images/pooja_room_contemporary.png"
            alt=""
            className={styles.heroBgImg}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`} ref={heroRef}>
          <span className={styles.eyebrow}>Curated Furniture &amp; Décor</span>
          <h1 className={styles.title}>The Collection</h1>
          <p className={styles.sub}>
            Every piece is selected for its craftsmanship, material quality, and the way it
            elevates a room — not merely fills it.
          </p>
        </div>
      </div>

      {/* ── Product grid ──────────────────────────────── */}
      <div className={`container ${styles.gridArea}`}>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Products;
