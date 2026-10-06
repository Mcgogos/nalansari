"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navigation.module.css';

const navLinks: { labelKey: any; href: string }[] = [
  { labelKey: 'nav.services', href: '#pilates' },
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
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" className={styles.nsLogo}>
            {/* N – outline: mustard stroke, black fill */}
            <text x="4" y="96"
              fontFamily="'Inter', system-ui, sans-serif"
              fontSize="100"
              fontWeight="700"
              fill="#0A0A0A"
              stroke="#D4A72C"
              strokeWidth="5"
            >N</text>
            {/* S – fully solid mustard */}
            <text x="100" y="96"
              fontFamily="'Inter', system-ui, sans-serif"
              fontSize="100"
              fontWeight="700"
              fill="#D4A72C"
            >S</text>
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${styles.navLink}`}>
              {t(link.labelKey)}
            </Link>
          ))}
          <Link href="#planla" className={styles.ctaButton}>
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
          href="#planla" 
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
