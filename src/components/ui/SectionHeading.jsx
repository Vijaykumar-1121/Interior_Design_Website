import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import styles from './SectionHeading.module.css';

/**
 * SectionHeading — reusable section title block.
 * Animates in via Framer Motion once in view.
 *
 * Props:
 *   eyebrow  — small uppercase label above the title
 *   title    — main heading (supports JSX for <br /> etc.)
 *   subtitle — optional paragraph below
 *   centered — boolean, centres text
 *   light    — boolean, uses dark text (for ivory bg sections)
 */
const SectionHeading = ({ eyebrow, title, subtitle, centered = false, light = false, className }) => {
  const ref = useRef(null);
  // Trigger once when the element enters the viewport
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div
      ref={ref}
      className={clsx(
        styles.wrapper,
        centered && styles.centered,
        light && styles.light,
        className
      )}
    >
      {eyebrow && (
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
