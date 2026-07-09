import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, HeartHandshake, Lightbulb, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import styles from './WhyChooseUs.module.css';

gsap.registerPlugin(ScrollTrigger);

const VALUE_PROPS = [
  {
    num: '01',
    Icon: Award,
    title: 'Award-Winning Design',
    body: 'Internationally recognized for our innovative approach to luxury interiors, with features in leading design publications across Asia.',
  },
  {
    num: '02',
    Icon: HeartHandshake,
    title: 'Client-Centric Approach',
    body: 'Your vision is our blueprint. We collaborate closely to ensure every detail reflects your personality and lifestyle preferences.',
  },
  {
    num: '03',
    Icon: Lightbulb,
    title: 'Innovative Excellence',
    body: 'Blending cutting-edge design trends with timeless craftsmanship to create spaces that remain elegant for decades.',
  },
  {
    num: '04',
    Icon: Clock,
    title: 'Timely Execution',
    body: 'Precision project management and transparent communication ensure your dream space is delivered on schedule, every time.',
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.bentoCard}`);
      gsap.fromTo(cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="why-us">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The VJ Interiors Difference"
          subtitle="Four commitments that define every project we take on."
          centered
        />

        <div className={styles.bentoGrid}>
          {VALUE_PROPS.map(({ num, Icon, title, body }, idx) => (
            <div key={num} className={`${styles.bentoCard} ${idx === 0 ? styles.featuredCard : ''}`}>
              <div className={styles.cardInner}>
                {/* Ghost number */}
                <span className={styles.cardNum} aria-hidden="true">{num}</span>
                {/* Icon */}
                <div className={styles.iconWrap}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardBody}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
