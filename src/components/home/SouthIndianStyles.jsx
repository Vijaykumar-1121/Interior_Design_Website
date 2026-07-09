import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import styles from './SouthIndianStyles.module.css';

gsap.registerPlugin(ScrollTrigger);

const DESIGNS = [
  {
    id: 1,
    title: 'Traditional Pooja Room',
    description: 'Sacred spaces designed with authentic South Indian aesthetics, featuring traditional wooden carvings and divine imagery.',
    image: '/images/pooja_room_traditional.png',
    tag: 'Spiritual',
  },
  {
    id: 2,
    title: 'South Indian Living',
    description: 'Elegant blend of traditional elements with modern comfort, showcasing cultural heritage through design.',
    image: '/images/pooja_room_living.png',
    tag: 'Heritage',
  },
  {
    id: 3,
    title: 'Contemporary Space',
    description: 'Modern interpretation of traditional pooja rooms with Lord Venkateswara as the focal point.',
    image: '/images/pooja_room_contemporary.png',
    tag: 'Divine',
  },
];

const SouthIndianStyles = () => {
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
    <section ref={sectionRef} className={styles.section} id="sacred-spaces">
      {/* Massive Background Watermark */}
      <div className={styles.watermarkWrap}>
        <h2 ref={watermarkRef} className={styles.watermark}>SACRED</h2>
      </div>

      <div className="container">
        <div className={styles.headerWrap}>
          <SectionHeading
            eyebrow="Cultural Heritage"
            title={<>South Indian<br />Design Excellence</>}
            subtitle="Honoring tradition with contemporary elegance — spaces that reflect our rich cultural heritage and spiritual values."
          />
        </div>

        <div className={styles.magazineSpread}>
          {/* Left Masterpiece (Index 0) */}
          <div className={styles.masterpiece}>
            <article className={styles.article}>
              <div className={styles.imageFrameMaster}>
                <img
                  src={DESIGNS[0].image}
                  alt={DESIGNS[0].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{DESIGNS[0].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{DESIGNS[0].title}</h3>
                <p className={styles.description}>{DESIGNS[0].description}</p>
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
                  src={DESIGNS[1].image}
                  alt={DESIGNS[1].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{DESIGNS[1].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{DESIGNS[1].title}</h3>
                <p className={styles.description}>{DESIGNS[1].description}</p>
                <button onClick={() => window.dispatchEvent(new Event('openConsultationForm'))} className={styles.link}>
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </article>

            <article className={`${styles.article} ${styles.accentBottom}`}>
              <div className={styles.imageFrameAccentAlt}>
                <img
                  src={DESIGNS[2].image}
                  alt={DESIGNS[2].title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.tag}>{DESIGNS[2].tag}</div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{DESIGNS[2].title}</h3>
                <p className={styles.description}>{DESIGNS[2].description}</p>
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

export default SouthIndianStyles;
