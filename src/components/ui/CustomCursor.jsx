import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

/**
 * CustomCursor — a trailing ring cursor with a blend-mode effect.
 * Hidden automatically on touch devices via CSS.
 */
const CustomCursor = () => {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const isHovering = useRef(false);

  // Spring config: ring follows with a slight lag for elegance
  const spring = { stiffness: 350, damping: 28, mass: 0.6 };
  const sx = useSpring(cursorX, spring);
  const sy = useSpring(cursorY, spring);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      document.body.classList.toggle('cursor-hover', !!el);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={styles.cursor}
      style={{
        translateX: sx,
        translateY: sy,
        // Keep the ring centred on the actual cursor point
        x: '-50%',
        y: '-50%',
      }}
    />
  );
};

export default CustomCursor;
