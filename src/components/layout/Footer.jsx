import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mail, Phone, Share2, Rss, AtSign } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      {/* Gradient top accent */}
      <div className={styles.topAccent} />

      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <img src="/images/logo1.png" alt="VJ Interiors" className={styles.logoImg} />
            <div className={styles.logoTextGroup}>
              <span className={styles.logoText}>
                VJ<span className={styles.logoDot}>.</span>Interiors
              </span>
              <span className={styles.logoTagline}>మీ కలల ఇల్లు మా బాధ్యత!</span>
            </div>
          </Link>
          <p className={styles.tagline}>
            Crafting exceptional, timeless interiors that embody sophistication and reflect the distinctive lifestyle of those who inhabit them.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram"  className={styles.socialLink}><AtSign size={15} /></a>
            <a href="#" aria-label="Facebook"   className={styles.socialLink}><Share2 size={15} /></a>
            <a href="#" aria-label="Newsletter" className={styles.socialLink}><Rss    size={15} /></a>
          </div>
        </div>

        {/* Explore */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Explore</h4>
          <ul className={styles.linkList}>
            {[['Home', '/'], ['Products', '/products'], ['Services', '/#services'], ['Process', '/#process']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className={styles.footerLink}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Contact</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={12} className={styles.contactIcon} />
              <span>University Road,<br />Neerukonda, Mangalagiri 522503</span>
            </li>
            <li>
              <Mail size={12} className={styles.contactIcon} />
              <a href="mailto:test@vjinteriors.com" className={styles.footerLink}>test@vjinteriors.com</a>
            </li>
            <li>
              <Phone size={12} className={styles.contactIcon} />
              <a href="tel:+9199887766510" className={styles.footerLink}>+91 99887766510</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Newsletter</h4>
          <p className={styles.newsletterText}>
            Exclusive design insights, project highlights, and curated inspiration delivered to your inbox.
          </p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.emailInput}
              aria-label="Email"
            />
            <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            &copy; {year} VJ Interiors. All rights reserved.
          </p>
          <p className={styles.credit}>Vijaykumar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
