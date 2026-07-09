import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic — wraps any child and gives it a magnetic pull towards the cursor.
 * Used on buttons and interactive elements for a premium micro-interaction feel.
 *
 * strength: how many px the element shifts (default 18).
 */
const Magnetic = ({ children, strength = 18 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs make the snap-back feel fluid, not instant
  const springCfg = { stiffness: 200, damping: 20, mass: 0.5 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    // Offset from element centre, normalised to –1…1
    const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
