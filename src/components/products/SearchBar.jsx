import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

/**
 * SearchBar — live filtering input.
 */
const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className={styles.wrap}>
    <Search size={16} className={styles.icon} />
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products…"
      className={styles.input}
      aria-label="Search products"
    />
  </div>
);

export default SearchBar;
