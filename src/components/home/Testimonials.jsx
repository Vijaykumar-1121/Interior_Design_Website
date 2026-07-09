import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: "VJ Interiors transformed our vision into reality with extraordinary precision. Their ability to blend aesthetics with functionality created a home that truly reflects our lifestyle and aspirations.",
    name: 'Priya & Arjun Mehta',
    title: 'Luxury Residence, South Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "The attention to detail is unparalleled. Every element, from the lighting design to the material selection, demonstrates their mastery of creating spaces that inspire and elevate daily living.",
    name: 'Rohan Singhania',
    title: 'Penthouse Client, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "Working with VJ Interiors was a seamless experience. Their team's professionalism, creativity, and commitment to excellence transformed our office into a space that inspires innovation and productivity.",
    name: 'Neha Kapoor',
    title: 'CEO, Studio Kapoor, Pune',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "From initial consultation to final delivery, the process exceeded our expectations. Their design philosophy created a villa that harmoniously blends luxury with the natural beauty of Goa.",
    name: 'Vikram & Sanya Iyer',
    title: 'Villa Project, Goa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "VJ Interiors created a kitchen that's both a masterpiece and highly functional. Their innovative design solutions and premium material selection have made it the heart of our home.",
    name: 'Deepa Nair',
    title: 'Residential Client, Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
];

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Our Clients Say"
          centered
        />
      </div>

      <div className={styles.scrollWrapper}>
        <div className={styles.track}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div key={idx} className={styles.card}>
              <span className={styles.bigQuote} aria-hidden="true">"</span>
              <blockquote className={styles.quote}>
                {t.quote}
              </blockquote>

              <div className={styles.author}>
                <img src={t.avatar} alt={t.name} className={styles.avatar} />
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.role}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
