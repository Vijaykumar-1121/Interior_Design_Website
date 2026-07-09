import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Magnetic from '../ui/Magnetic';
import ConsultationForm from '../ui/ConsultationForm';
import styles from './CTA.module.css';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What is your typical design process?",
    a: "We start with a comprehensive consultation to understand your vision, followed by concept development, 3D visualizations, material selection, and finally, flawless execution."
  },
  {
    q: "Do you handle both residential and commercial?",
    a: "Yes. From luxurious private villas to premium corporate offices and boutique hospitality spaces, our expertise spans across all premium sectors."
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scale. A single room redesign may take 4-6 weeks, while a full bespoke villa can take 6-12 months from concept to final handover."
  },
  {
    q: "Do you provide custom furniture?",
    a: "Absolutely. We design and manufacture bespoke furniture tailored specifically to your space, ensuring perfect harmony with the overall architectural vision."
  }
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqHeader} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`}>+</span>
      </button>
      <div className={`${styles.faqBodyWrap} ${open ? styles.faqBodyWrapOpen : ''}`}>
        <div className={styles.faqBody}>
          <div className={styles.faqBodyInner}>{a}</div>
        </div>
      </div>
    </div>
  );
};

const CTA = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title: dramatic scale + fade entrance */
      gsap.fromTo(titleRef.current,
        { scale: 0.92, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
        }
      );

      /* Image parallax upward */
      gsap.to(`.${styles.bgImg}`, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      {/* Full-bleed background with deep overlay */}
      <div className={styles.bg}>
        <img
          className={styles.bgImg}
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=85&w=1920&auto=format&fit=crop"
          alt="Traditional pooja room interior design"
          aria-hidden="true"
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={`container ${styles.content}`}>
        
        <div className={styles.leftCol}>
          <p className={styles.eyebrow}>Let's Create Together</p>
          <h2 ref={titleRef} className={styles.title}>
            Ready to<br />
            <span className={styles.titleAccent}>Transform</span><br />
            Your Space?
          </h2>
          <p className={styles.sub}>
            Share your vision with us — schedule a complimentary consultation to begin your journey toward exceptional design.
          </p>
          <Magnetic strength={12}>
            <Button variant="primary" onClick={() => setFormOpen(true)}>
              Start a Conversation <ArrowRight size={14} />
            </Button>
          </Magnetic>
        </div>

        <div className={styles.faqCol}>
          <h3 className={styles.faqTitle}>FAQs</h3>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default CTA;
