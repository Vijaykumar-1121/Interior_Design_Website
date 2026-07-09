import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ value, suffix = '', label, delay = 0 }) => {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 65, damping: 28 });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => mv.set(value), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, value, mv, delay]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.floor(v)));
  }, [spring]);

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.statNum}>
        {display}
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  );
};

const STATS = [
  { value: 500,  suffix: '+', label: 'Projects Delivered', delay: 0    },
  { value: 15,   suffix: '+', label: 'Years of Expertise', delay: 0.08 },
  { value: 98,   suffix: '%', label: 'Client Satisfaction', delay: 0.16 },
  { value: 34,   suffix: '',  label: 'Design Awards',       delay: 0.24 },
];

const About = () => {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Image parallax */
      gsap.fromTo(imgRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className={`container ${styles.inner}`}>
        
        {/* ── Top Row (3 columns) ──────────────────────── */}
        <div className={styles.topRow}>
          
          <div className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=900&auto=format&fit=crop"
                alt="Bedroom Interior"
                className={styles.img}
              />
            </div>
          </div>

          <div className={styles.titleCol}>
            <p className={styles.eyebrow}>ABOUT US</p>
            <h2 className={styles.title}>
              WE'RE<br />COMMITTED TO<br />TURNING YOUR<br />VISION INTO<br />REALITY
            </h2>
          </div>

          <div ref={textRef} className={styles.textCol}>
            <p className={styles.body}>
              We create spaces that are not only visually stunning but also functional and uniquely yours. Whether it's a private residence or a commercial space, our interior design services are tailored to bring your vision to life with style and precision.
            </p>
            
            <div className={styles.signatureWrap}>
              {/* Decorative signature SVG */}
              <svg className={styles.signatureSvg} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 65 C 10 40, 10 20, 30 20 C 50 20, 70 45, 50 70 C 35 85, 20 70, 40 40 L 75 40 M 70 50 C 80 20, 95 10, 105 45 C 115 70, 90 75, 110 50 C 120 40, 140 40, 160 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 125 35 L 125 55 M 115 45 L 135 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className={styles.signatureName}>VIJAYKUMAR</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Row (4 columns) ───────────────────── */}
        <div className={styles.bottomRow}>
          {STATS.map((s) => (
            <AnimatedCounter key={s.label} {...s} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
