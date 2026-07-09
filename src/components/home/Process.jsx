import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Consultation',
    body: 'In-depth discussion to understand your vision, lifestyle preferences, and functional requirements. We establish clear objectives and budget parameters.',
  },
  {
    num: '02',
    title: 'Concept Development',
    body: 'Curated mood boards, premium material selections, and photorealistic 3D visualizations that bring your space to life before construction begins.',
  },
  {
    num: '03',
    title: 'Precision Execution',
    body: 'Seamless coordination of master craftsmen, contractors, and suppliers. Rigorous quality control at every milestone ensures flawless implementation.',
  },
  {
    num: '04',
    title: 'Final Delivery',
    body: 'Complete styling and finishing touches. We present your transformed space, ensuring every detail exceeds expectations and reflects your vision perfectly.',
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  /* Framer scroll progress drives the vertical line */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.65', 'end 0.55'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray(`.${styles.step}`);
      steps.forEach((step, i) => {
        /* Alternating: even steps slide from left, odd from right */
        const fromX = i % 2 === 0 ? -45 : 45;
        gsap.fromTo(step,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 82%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="process">
      <div className="container">
        <SectionHeading
          eyebrow="Our Process"
          title="How We Work"
          subtitle="Four clear phases — from first conversation to final reveal."
          centered
        />

        <div className={styles.timeline}>
          {/* Static track line */}
          <div className={styles.lineBg}>
            {/* Animated fill line */}
            <motion.div className={styles.lineActive} style={{ height: lineHeight }} />
          </div>

          <div className={styles.steps}>
            {STEPS.map(({ num, title, body }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={styles.stepRow}>
                  {/* Left half */}
                  <div className={styles.half}>
                    {isLeft && (
                      <div className={`${styles.step} ${styles.stepLeft}`}>
                        <h3 className={styles.stepTitle}>{title}</h3>
                        <p className={styles.stepBody}>{body}</p>
                      </div>
                    )}
                  </div>

                  {/* Centre node */}
                  <div className={styles.nodeWrap}>
                    <div className={styles.node}>{num}</div>
                  </div>

                  {/* Right half */}
                  <div className={styles.half}>
                    {!isLeft && (
                      <div className={`${styles.step} ${styles.stepRight}`}>
                        <h3 className={styles.stepTitle}>{title}</h3>
                        <p className={styles.stepBody}>{body}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
