import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import Button from '../ui/Button';
import Magnetic from '../ui/Magnetic';
import styles from './Hero.module.css';

/**
 * Hero — fullscreen editorial opening.
 *
 * Animation sequence (GSAP timeline on mount):
 *  1. Hero fades up from black
 *  2. Ambient orbs fade in (subtle glow)
 *  3. Eyebrow strip slides down
 *  4. Title words clip-reveal upward with stagger
 *  5. Meta row fades up
 *  6. Scroll cue: line grows then label fades, loops bounce
 */
const Hero = () => {
  const sectionRef   = useRef(null);
  const orb1Ref      = useRef(null);
  const orb2Ref      = useRef(null);
  const titleRef     = useRef(null);
  const metaRef      = useRef(null);
  const scrollLineRef= useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      /* 1 — Hero appears */
      gsap.set(sectionRef.current, { opacity: 0 });
      tl.to(sectionRef.current, { opacity: 1, duration: 1.4, delay: 0.1 });

      /* 2 — Ambient orbs glow in */
      tl.to([orb1Ref.current, orb2Ref.current],
        { opacity: 1, duration: 2.5, stagger: 0.4, ease: 'power1.out' }, '-=1.0');

      /* 3 — Title word reveal: clip from bottom */
      const words = titleRef.current.querySelectorAll('[data-word]');
      gsap.set(words, { yPercent: 130, opacity: 0 });
      tl.to(words,
        { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.055, ease: 'expo.out' },
        '-=1.8');

      /* 4 — Meta row */
      gsap.set(metaRef.current, { y: 24 });
      tl.to(metaRef.current,
        { opacity: 1, y: 0, duration: 1.1 }, '-=1.0');

      /* 5 — Scroll cue: line grows then label text visible */
      gsap.set(scrollLineRef.current, { scaleX: 0 });
      tl.to(scrollLineRef.current,
        { scaleX: 1, duration: 0.8, ease: 'expo.out' }, '-=0.4');

      /* Infinite bounce of the scroll cue */
      gsap.to(scrollCueRef.current, {
        x: 8, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Title lines — mix roman and italic for editorial contrast */
  const lines = [
    { text: 'Luxury',    italic: false },
    { text: 'Interiors', italic: true  },
    { text: 'Redefined', italic: false },
  ];

  return (
    <section ref={sectionRef} className={styles.hero} style={{ opacity: 0 }}>

      {/* ── Background ─────────────────────────────────── */}
      <div className={styles.bgImage}>
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1920&auto=format&fit=crop"
          alt="Luxury South Indian style living space"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      {/* ── Ambient glow orbs ──────────────────────────── */}
      <div ref={orb1Ref} className={`${styles.orb} ${styles.orb1}`} />
      <div ref={orb2Ref} className={`${styles.orb} ${styles.orb2}`} />

      {/* ── Bottom horizontal rule ─────────────────────── */}
      <div className={styles.rule} />

      {/* ── Content ────────────────────────────────────── */}
      <div className={`container ${styles.content}`}>

        {/* Giant display title */}
        <div className={styles.titleWrap}>
          <h1 ref={titleRef} className={styles.title}>
            {lines.map((line, i) => (
              <span key={i} className={styles.lineWrap}>
                {line.text.split(' ').map((word, wi) => (
                  <span
                    key={wi}
                    data-word
                    className={`${styles.word} ${line.italic ? styles.titleItalic : ''}`}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom meta: description + CTA */}
        <div ref={metaRef} className={styles.meta}>
          <p className={styles.subtitle}>
            Where architectural excellence meets timeless design — transforming spaces into 
            extraordinary living experiences through masterful craftsmanship and uncompromising attention to detail.
          </p>

          <div className={styles.ctaGroup}>
            <Magnetic strength={14}>
              <Button variant="primary" href="#services">
                Our Services <ArrowRight size={14} />
              </Button>
            </Magnetic>
            {/* Scroll cue lives here, right-aligned with CTA */}
            <div ref={scrollCueRef} className={styles.scrollCue}>
              <span ref={scrollLineRef} className={styles.scrollLine} />
              Scroll to discover
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
