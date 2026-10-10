"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navigation.module.css';

const navLinks: { labelKey: any; href: string }[] = [
  { labelKey: 'nav.services', href: '#services' },
  { labelKey: 'nav.schedule', href: '#schedule' },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.trainers', href: '#trainers' },
];

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        
        {/* Brand Logo with Georgia 900 Circular Badge */}
        <Link href="/" className={styles.logoLink} onClick={closeMenu}>
          <div className={styles.nsCircularBadge} aria-label="NS Logo">
            <span className={styles.letterN}>N</span>
            <span className={styles.letterS}>S</span>
          </div>
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTitle}>NALAN SARI</span>
            <span className={styles.brandSubtitle}>PILATES & FITNESS</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${styles.navLink}`}>
              {t(link.labelKey)}
            </Link>
          ))}
          <Link href="#ucretsiz-deneme" className={styles.ctaButton}>
            {t('nav.book')} <ArrowRight size={16} />
          </Link>
          
          <div className={styles.langToggle}>
            <button 
              className={`${styles.langBtn} ${language === 'tr' ? styles.active : ''}`}
              onClick={() => setLanguage('tr')}
            >TR</button>
            <span className={styles.langDivider}>|</span>
            <button 
              className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >EN</button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div 
          className={`${styles.mobileMenuBtn} ${menuOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <Link 
          href="#ucretsiz-deneme" 
          className={styles.ctaButton} 
          style={{ marginTop: '2rem' }}
          onClick={closeMenu}
        >
          {t('nav.book')} <ArrowRight size={16} />
        </Link>
        
        <div className={styles.langToggle}>
          <button 
            className={`${styles.langBtn} ${language === 'tr' ? styles.active : ''}`}
            onClick={() => { setLanguage('tr'); closeMenu(); }}
          >TR</button>
          <span className={styles.langDivider}>|</span>
          <button 
            className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
            onClick={() => { setLanguage('en'); closeMenu(); }}
          >EN</button>
        </div>
      </div>
    </nav>
  );
}
