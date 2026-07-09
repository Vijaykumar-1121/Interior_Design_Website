import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './ProductCard.module.css';

/**
 * ProductCard — used in both ProductGrid (full page) and FeaturedProducts (home).
 *
 * When a `variants` prop is passed in, the root element becomes a motion.article
 * so the parent container's staggerChildren animation applies.
 */
const ProductCard = ({ product, variants }) => {
  const content = (
    <>
      {/* ── Image ──────────────────────────────────────── */}
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.badge}>{product.category}</span>

      </div>

      {/* ── Info ───────────────────────────────────────── */}
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <p className={styles.price}>{product.price}</p>
      </div>
    </>
  );

  /* Animated variant (used inside motion-parent grid for stagger) */
  if (variants) {
    return (
      <motion.article variants={variants} className={styles.card}>
        {content}
      </motion.article>
    );
  }

  return <article className={styles.card}>{content}</article>;
};

export default ProductCard;
