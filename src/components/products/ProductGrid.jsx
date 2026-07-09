import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import FilterBar   from './FilterBar';
import SearchBar   from './SearchBar';
import styles from './ProductGrid.module.css';

/**
 * Stagger animation config.
 * container triggers staggerChildren on mount (animate="visible").
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.wrapper}>
      {/* ── Controls bar ──────────────────────────────────── */}
      <div className={styles.controls}>
        <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      {/* ── Count row ─────────────────────────────────────── */}
      <p className={styles.count}>{filteredProducts.length} pieces</p>

      {/* ── Staggered grid ────────────────────────────────── */}
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductGrid;
