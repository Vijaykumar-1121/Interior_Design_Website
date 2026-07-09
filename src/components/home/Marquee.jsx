import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Marquee.module.css';

gsap.registerPlugin(ScrollTrigger);

/* Trusted partners & prestigious clients */
const ITEMS = [
  'L&T Realty',
  'EMAAR',
  'Kalpataru',
  'Lodha Group',
  'Prestige Estates',
  'Adarsh Developers',
  'Sobha Limited',
  'Brigade Group',
  'Godrej Properties',
  'Tata Housing',
];

const Marquee = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    // Infinite scrolling marquee via GSAP — wraps seamlessly
    const tl = gsap.to(trackRef.current, {
      xPercent: -50,   // we render the list twice so –50% = one full loop
      ease: 'none',
      duration: 30,    // slower, more premium feel
      repeat: -1,
    });

    // Speed up slightly when the user scrolls fast
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const v = Math.abs(self.getVelocity());
        const ts = 1 + v / 600;
        gsap.to(tl, {
          timeScale: Math.min(ts, 3.5),
          duration: 0.2,
          overwrite: true,
          onComplete: () => gsap.to(tl, { timeScale: 1, duration: 1.2 }),
        });
      },
    });

    return () => tl.kill();
  }, []);

  const doubled = [...ITEMS, ...ITEMS]; // render twice for seamless loop

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Trusted by Leading Developers</p>
      </div>
      <div className={styles.marqueeWrap}>
        <div className={styles.track} ref={trackRef}>
          {doubled.map((item, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.bullet} />
              <span className={styles.text}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
