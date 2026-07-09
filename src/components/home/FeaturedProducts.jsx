import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import styles from './FeaturedProducts.module.css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.card}`);

      /* Each card slides up with stagger — no scale to avoid blurry text */
      gsap.fromTo(cards,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
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
    <section ref={sectionRef} className={styles.section}>
      <div className="container">

        {/* Header: left heading, right CTA */}
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Curated Collection"
            title="Signature Pieces"
            subtitle="Discover handcrafted furniture and decor that exemplify timeless elegance and exceptional craftsmanship."
          />
          <div className={styles.headerCta}>
            <Button variant="outlineGold" to="/products">
              Explore Collection <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        {/* 4-column grid */}
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <article key={product.id} className={styles.card}>

              {/* Image — portrait 3:4 ratio */}
              <div className={styles.imageWrap}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  loading="lazy"
                />
                {/* Hover overlay — full-height gradient + CTA */}
                <div className={styles.overlay}>
                  <button onClick={() => window.dispatchEvent(new Event('openConsultationForm'))} className={styles.overlayBtn}>
                    View Details <ArrowRight size={13} />
                  </button>
                </div>
                {/* Category badge */}
                <span className={styles.badge}>{product.category}</span>
              </div>

              {/* Card info */}
              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.desc}>{product.description}</p>
                <p className={styles.price}>{product.price}</p>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
