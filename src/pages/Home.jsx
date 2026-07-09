import React from 'react';
import Hero           from '../components/home/Hero';
import Marquee        from '../components/home/Marquee';
import About          from '../components/home/About';
import SouthIndianStyles from '../components/home/SouthIndianStyles';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs    from '../components/home/WhyChooseUs';
import Services       from '../components/home/Services';
import Process        from '../components/home/Process';
import Testimonials   from '../components/home/Testimonials';
import CTA            from '../components/home/CTA';

/**
 * Home page — single-scroll experience.
 * Order matches the spec: Hero → trust strip → About → South Indian Styles →
 * Featured Products → Why Choose Us → Services → Process → Stats → Testimonials → CTA
 */
const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
