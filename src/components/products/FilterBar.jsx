import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const CATEGORIES = ['All', 'Living Room', 'Dining', 'Bedroom', 'Office', 'Kitchen', 'Decor', 'Lighting'];

/**
 * FilterBar — pill-style category filter.
 */
const FilterBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.bar} role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`${styles.pill} ${activeCategory === cat ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat)}
          aria-pressed={activeCategory === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
