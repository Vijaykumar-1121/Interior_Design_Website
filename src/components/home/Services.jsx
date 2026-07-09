import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 1,
    title: 'Space Planning',
    description: 'We transform your architectural footprint into a functional sanctuary, optimizing every square inch for comfort and elegance.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    tag: 'Architecture',
  },
  {
    id: 2,
    title: 'Custom Furniture',
    description: 'Bespoke curation of artisanal pieces designed to complement your unique architectural narrative and personal style.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    tag: 'Artisanal',
  },
  {
    id: 3,
    title: 'Residential Renovation',
    description: 'Comprehensive structural overhauls that blend timeless design principles with modern luxury for your home.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    tag: 'Transformation',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark parallax
      gsap.to(watermarkRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Images slow pan (parallax)
      const images = gsap.utils.toArray(`.${styles.image}`);
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Reveal animation for articles
      const articles = gsap.utils.toArray(`.${styles.article}`);
      articles.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services">
      {/* Massive Background Watermark */}
      <div className={styles.watermarkWrap}>
        <h2 ref={watermarkRef} className={styles.watermark}>SERVICES</h2>
      </div>

      <div className="container">
        <div className={styles.headerWrap}>
          <SectionHeading
            eyebrow="Our Expertise"
            title={<>Our<br />Services</>}
            subtitle="Comprehensive design solutions tailored to your vision and lifestyle."
          />
        </div>

        <div className={styles.magazineSpread}>
          {/* Left Masterpiece (Index 0) */}
          <div className={styles.masterpiece}>
            <article className={styles.article}>
              <div className={styles.imageFrameMaster}>
                <img
                  src={SERVICES[0].image}
                  alt={SERVICES[0].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{SERVICES[0].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{SERVICES[0].title}</h3>
                <p className={styles.description}>{SERVICES[0].description}</p>
                <button onClick={() => window.dispatchEvent(new Event('openConsultationForm'))} className={styles.link}>
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </article>
          </div>

          {/* Right Accents (Index 1 & 2) */}
          <div className={styles.accents}>
            <article className={`${styles.article} ${styles.accentTop}`}>
              <div className={styles.imageFrameAccent}>
                <img
                  src={SERVICES[1].image}
                  alt={SERVICES[1].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{SERVICES[1].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{SERVICES[1].title}</h3>
                <p className={styles.description}>{SERVICES[1].description}</p>
                <button onClick={() => window.dispatchEvent(new Event('openConsultationForm'))} className={styles.link}>
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </article>

            <article className={`${styles.article} ${styles.accentBottom}`}>
              <div className={styles.imageFrameAccentAlt}>
                <img
                  src={SERVICES[2].image}
                  alt={SERVICES[2].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{SERVICES[2].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{SERVICES[2].title}</h3>
                <p className={styles.description}>{SERVICES[2].description}</p>
                <button onClick={() => window.dispatchEvent(new Event('openConsultationForm'))} className={styles.link}>
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
