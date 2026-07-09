import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Button.module.css';

/**
 * Button — works as a <button> or a React Router <Link>.
 *
 * variants:
 *   primary     — filled ivory on dark bg
 *   outline     — transparent with ivory border (dark bg context)
 *   outlineGold — transparent with brass border
 *   ghost       — underline-only text link
 */
const Button = ({ children, variant = 'primary', to, href, onClick, className, type = 'button' }) => {
  const cls = clsx(styles.btn, styles[variant], className);

  const inner = (
    <span className={styles.inner}>
      {children}
      {/* Hover fill layer — slides up from bottom */}
      <span className={styles.fill} aria-hidden="true" />
    </span>
  );

  // External or anchor link
  if (href) {
    const isAnchor = href.startsWith('#');
    return (
      <motion.a
        href={href}
        target={isAnchor ? undefined : "_blank"}
        rel={isAnchor ? undefined : "noopener noreferrer"}
        className={cls}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    );
  }

  // Internal router link
  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
        <Link to={to} className={cls}>{inner}</Link>
      </motion.div>
    );
  }

  // Plain button
  return (
    <motion.button
      type={type}
      className={cls}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
};

export default Button;
